autowatch = 1;
outlets = 3;

var unique = jsarguments[1];

aumhaa = require('_base');
util = require('aumhaa_util');

var FORCELOAD = true;
var DEBUG = true;

aumhaa.init(this);
var script = this;

var Alive = false;
var _name = jsarguments[0];
var dbg = new DebugNamespace(script._name+' samplerproto=>').debug;
var VELOCITY_SENS = false;

var finder;
// var mod;
// var found_mod;
// var mod_finder;
// var Mod = ModComponent.bind(script);
// var ModProxy = ModProxyComponent.bind(script);

var selected_note = 60;
var is_recording = false;
var is_erasing = false;
var is_selecting = true;

var poly_map = [];
var samples = [];
var sample_map = [];

var EQUAL_TEMPERAMENT = [1, 1.0595, 1.1225, 1.1892, 1.2599, 1.3348, 1.4142, 1.4983, 1.5874, 1.6818, 1.7818, 1.8897];
var HARMONIC_SERIES = [1, 1.0909, 1.125, 1.2, 1.25, 1.3333, 1.4, 1.5, 1.6, 1.6667, 1.75, 1.8333];
var TUNING = EQUAL_TEMPERAMENT;

// for(var i = 0;i<128;i++){
//   sample_map[i] = {sample:-1, prev_sample:-1, prev_repitch:-1};
// }

var buf = new Buffer('sample0');

function anything(){}

function init(){
  debug('init', this._name);
  finder = new LiveAPI();
  setup_tasks();
  setup_patcher();
  // setup_buffer();
  setup_controls();
  setup_modes();
  init_sampler();
  // deprivatize_script_functions(script);
  // setup_mod();
  setup_tests();
  Alive=true;
}

function setup_tasks(){
	script['tasks'] = new TaskServer(script, 20);
}

function setup_patcher(){
	find_patcher_objects(script, this.patcher, get_patcher_script_names(this.patcher));
  record_button.message('set', is_recording);
  erase_button.message('set', is_erasing);
  select_button.message('set', is_selecting);
}

function setup_controls(){
  // var make_gui_send_function = function(patcher_object, message_header){
	// 	if(message_header.length == 2){
	// 		var func = function(value){
	// 			//value = value==undefined ? 0 : value;
	// 			//var message = message_header.push(value);
	// 			//debug('sending gui button:', 'header is:', message_header, 'value is:', value, 'message is:', [message_header[0], message_header[1], value]);
	// 			//#message = message_header.concat([value]);
	// 			patcher_object.message.apply(patcher_object, [message_header[0], message_header[1], value]);
	// 		}
	// 	}
	// 	return func;
	// }

  script.controls = [];
  controls.low_note_display = new GUIButton('LowNoteDisplay', {jsObj: this.patcher.getnamed('low_note_display')});
  controls.high_note_display = new GUIButton('HighNoteDisplay', {jsObj: this.patcher.getnamed('high_note_display')});
  controls.selected_note_display = new GUIButton('SelectedNoteDisplay', {jsObj: this.patcher.getnamed('selected_note_display')});
  controls.record_button = new GUIButton('RecordButton', {jsObj: this.patcher.getnamed('record_button')});
  controls.erase_button = new GUIButton('EraseButton', {jsObj: this.patcher.getnamed('erase_button')});
  controls.select_button = new GUIButton('SelectButton', {jsObj: this.patcher.getnamed('select_button')});
  controls.start_time_display = new GUIButton('StartTimeDisplay', {jsObj: this.patcher.getnamed('start_time_display')});
  controls.end_time_display = new GUIButton('EndTimeDisplay', {jsObj: this.patcher.getnamed('end_time_display')});
  controls.repitch_display = new GUIButton('RepitchDisplay', {jsObj: this.patcher.getnamed('repitch_display')});

}

function setup_modes(){
  //Page 1:  mainPage
  script['mainPage'] = new Page('mainPage');
  mainPage.enter_mode = function(){
    debug('mainPage entered');
    controls.record_button.set_target(_record_button_in);
    controls.erase_button.set_target(_erase_button_in);
    controls.select_button.set_target(_select_button_in);
    controls.selected_note_display.set_target(_select_note_in);
    controls.repitch_display.set_target(_repitch_in);
    controls.start_time_display.set_target(_start_time_in);
    controls.end_time_display.set_target(_end_time_in);
  }
  mainPage.exit_mode = function(){
    debug('mainPage exited');
  }
  mainPage.update_mode = function(){
    debug('mainPage updated');
  }
  mainPage.enter_mode();
}

function setup_tests(){
  // low_note_button.add_listener(function(obj){debug(obj._name, obj._value)});
  // debug('test:', samples[0].patcher_objs.base_note.getvalueof())
}

function init_sampler(){
  for(var i=0;i<128;i++){
    // outlet(2, 'name', 'sample'+i);
    // outlet(2, 'clear');
    outlet(2, 'name', 'sample'+i);
    outlet(2, 'clear');
    // buf.name = 'sample'+i;
    // debug('buf.length:', buf.length())
    sample_map[i] = {sample:-1, prev_sample:-1, repitch:1, start_time:0, end_time:0};
  }
  for(var i=0;i<128;i++){
    samples[i] = new Sample(poly_obj, i);
  }
  select_note(selected_note);
  outlet(0, 'adsr', 0, 0, 100, 0);
  outlet(0, 'maxvoices', 64);
}




function recalculate_pitch_map(){
  var last_sample = -1;
  for(var i=0;i<128;i++){
    map_data = sample_map[i];
    if(map_data.sample>-1){
      last_sample = map_data.sample;
    }
    else{
      // sample_map[i] = {sample:-1, prev_sample:last_sample, repitch:calculate_repitch(i, last_sample)};
      sample_map[i].sample = -1;
      sample_map[i].prev_sample = last_sample;
      sample_map[i].repitch = calculate_repitch(i, last_sample);
    }
  }
}

function reassign_start_end_times(note){
  sample_map[note].start_time = 0;
  var buf = new Buffer('sample'+note);
  var end_time = buf.length();
  sample_map[note].end_time = end_time;
  for(var i=note+1;i<128;i++){
    if(sample_map[i].sample==-1){
      sample_map[i].start_time = 0;
      sample_map[i].end_time = end_time;
    }
    else{
      break;
    }
  }
}

function simple_calculate_repitch(new_pitch, original_pitch){
  distance = (new_pitch-original_pitch)/12;
  return distance+1;
}

function calculate_repitch(new_pitch, original_pitch){
  distance = (new_pitch-original_pitch)%12;
  octave = Math.floor((new_pitch-original_pitch)/12);
  // debug('distance:', TUNING[distance], 'octave:', octave, 'resut:', TUNING[distance]*Math.pow(2, octave));
  return TUNING[distance]*Math.pow(2, octave)
}

function start_recording(note){
  outlet(2, 'name', 'sample'+note);
  outlet(2, 'clear');
  outlet(1, 0);
  outlet(1, 'set', 'sample'+note);
  outlet(1, 'reset');
  outlet(1, 1);
}

function end_recording(note){
  outlet(1, 0);
  var buffer = new Buffer('sample'+note);
  debug('buffer length:', buffer.length());
  sample_map[note] = {sample:note, prev_sample:note, repitch:1, start_time:0, end_time:buffer.length()};
  recalculate_pitch_map();
  reassign_start_end_times(note);
}

function erase_sample(note){
  outlet(2, 'name', 'sample'+note);
  outlet(2, 'clear');
  sample_map[note] = {sample:-1, prev_sample:-1, repitch:1, start_time:0, end_time:0};
  recalculate_pitch_map();

}

function play_sample(note, val){
  val = VELOCITY_SENS?127:val;
  var sample = sample_map[note].sample;
  if(sample > -1){
    // debug('playing:', 0, 0, sample, 20, 0, 1, val/127);
    var start_time = sample_map[note].start_time;
    var end_time = sample_map[note].end_time;
    var repitch = sample_map[note].repitch;
    outlet(0, 0, sample, start_time, end_time, repitch, val/127);

    // poly_obj.message()
  }
  else{
    var prev_sample = sample_map[note].prev_sample;
    var repitch = sample_map[note].repitch;
    var start_time = sample_map[note].start_time;
    var end_time = sample_map[note].end_time;
    if(prev_sample > -1){
      // debug('playing:', 0, 0, prev_sample, 20, 0, repitch, val/127);
      outlet(0, 0, prev_sample, start_time, end_time, repitch, val/127);
    }
  }
}

function stop_sample(note){
  var sample = sample_map[note].sample;
  if(sample > -1){
    outlet(0, 0, sample, 0, 0, 1, 0);
  }
  else{
    var prev_sample = sample_map[note].prev_sample;
    var repitch = sample_map[note].repitch;
    if(prev_sample > -1){
      outlet(0, 0, prev_sample, 0, 0, repitch, 0);
    }
  }
}

function sampler_note_on(note, velocity){
  var sample = sample_map[note].sample;
  var prev_sample = sample_map[note].prev_sample;
  sample_slot = sample > -1 ? sample : prev_sample > -1 ? prev_sample : -1;
  // debug('sample_slot:', sample_slot);
  if(sample_slot > -1){
    samples[sample_slot].note_on(note, velocity);
  }
}


function sampler_note_off(note){
  var sample = sample_map[note].sample;
  var prev_sample = sample_map[note].prev_sample;
  sample_slot = sample > -1 ? sample : prev_sample > -1 ? prev_sample : -1;
  if(sample_slot > -1){
    samples[sample_slot].note_off(note, 0);
  }
}

function select_note(note){
  selected_note = note;
  var buffer = -1;
  var sample = sample_map[selected_note].sample;
  var prev_sample = sample_map[selected_note].prev_sample;
  var repitch = sample_map[note].repitch;
  var start_time = sample_map[note].start_time;
  var end_time = sample_map[note].end_time;
  if(sample>-1){
    buffer = sample;
  }
  else{
    buffer = prev_sample;
  }
  controls.selected_note_display.set(selected_note);
  controls.start_time_display.set(start_time);
  controls.end_time_display.set(end_time);
  controls.repitch_display.set(repitch);
  waveform.message('set', 'sample'+buffer);
}


function load_file(filename){
  if(Alive){
    debug('load_file:', filename);
    var buf = new Buffer('sample'+selected_note);
    buf.send('read', filename);
    reassign_start_end_times(selected_note);
  }
}

function notein(note, val){
  // debug('notein', note, val);
  if(is_recording==1){
    if(val){
      start_recording(note);
    }
    else{
      end_recording(note);
    }
  }
  else if(is_erasing==1){
    if(val){
      erase_sample(note);
    }
  }
  else{
    if(val){
      play_sample(note, val);
      sampler_note_on(note, val);
    }
    else{
      stop_sample(note);
      sampler_note_off(note);
    }
  }
  if((is_selecting)&&(val>0)){
    select_note(note);
  }
}


function _record_button_in(obj){
  var value = obj._value;
  debug('_record_button_in:', value);
  if(is_recording){
    end_recording();
  }
  is_recording = controls.record_button._value;
  debug('is_recording:', is_recording);
  is_recording&&controls.erase_button.set(0);
}

function _erase_button_in(obj){
  // var value = obj._value;
  if(is_recording){
    end_recording();
  }
  is_erasing = controls.erase_button._value;
  is_erasing&&controls.record_button.set(0);
}

function _select_button_in(obj){
  // var value = obj._value;
  is_selecting = controls.select_button._value;
}

function _select_note_in(obj){
  var note = obj._value;
  select_note(note);
}

function _start_time_in(obj){
  var time = obj._value;
  // debug('start_time_in:', time);
  sample_map[selected_note].start_time = time;
}

function _end_time_in(obj){
  var time = obj._value;
  // debug('end_time_in:', time);
  sample_map[selected_note].end_time = time;
}

function _repitch_in(obj){
  var value = obj._value;
  // debug('repitch_in:', val);
  sample_map[selected_note].repitch = value;
}


function Sample(poly_obj, num){
  var self = this;
  this.poly = poly_obj;
  this.num = num;
  this.name = 'sample'+num;
  this.base_note = num;
  this.low_note = num;
  this.high_note = num;
  this.start_time = 0;
  this.end_time = 0;
  this.repitch = 0;
  this.patcher = poly_obj.subpatcher(num);
  this.patcher_objs = [];
  find_patcher_objects(this.patcher_objs, this.patcher, get_patcher_script_names(this.patcher));
  this.add_bound_properties(this,
    'note_on',
    'note_off',
    'set_base_note',
    'set_hi_note',
    'set_low_note',
    'set_start_time',
    'set_end_time',
    'set_attack',
    'set_decay',
    'set_sustain',
    'set_release'
  )
}


util.inherits(Sample, EventEmitter);

Sample.prototype.note_on = function(note, velocity){
  if(this.low_note<=this.base_note<=this.high_note){
    velocity = VELOCITY_SENS ? velocity/127 : 1;
    var repitch = calculate_repitch(note, this.base_note);
    this.poly.message('target', this.num)
    this.poly.message(0, this.name, this.start_time, this.end_time, repitch, velocity);
  }
}

Sample.prototype.note_off = function(note, velocity){
  if(this.low_note<=this.base_note<=this.high_note){
    velocity = 0;
    var repitch = calculate_repitch(note, this.base_note);
    this.poly.message('target', this.num)
    this.poly.message(0, this.name, this.start_time, this.end_time, repitch, velocity);
  }
}

Sample.prototype.set_base_note = function(note){
  this.base_note = note;
  this.patcher_objs.base_note.message('set', this.base_note);
}

Sample.prototype.set_low_note = function(note){
  this.low_note = note;
  this.patcher_objs.low_note.message('set', this.low_note);
}

Sample.prototype.set_high_note = function(note){
  this.high_note = note;
  this.patcher_objs.high_note.message('set', this.high_note);
}

Sample.prototype.set_start_time = function(time){
  this.start_time = time;
  this.patcher_objs.start_time.message('set', this.start_time);
}

Sample.prototype.set_end_time = function(time){
  this.end_time = time;
  this.patcher_objs.end_time.message('set', this.end_time);
}

Sample.prototype.set_attack = function(time){
  this.attack = time;
  this.patcher_objs.attack.message('set', this.attack);
}

Sample.prototype.set_decay = function(time){
  this.decay = time;
  this.patcher_objs.decay.message('set', this.decay);
}

Sample.prototype.set_sustain = function(time){
  this.sustain = time;
  this.patcher_objs.sustain.message('set', this.sustain);
}

Sample.prototype.set_release = function(time){
  this.release = time;
  this.patcher_objs.release.message('set', this.release);
}





forceload(this);
