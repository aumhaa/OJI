autowatch = 1;

aumhaa = require('_base');
util = require('aumhaa_util');
var FORCELOAD = true;
var DEBUG = true;

aumhaa.init(this);
var script = this;
script._name = jsarguments[0];
var finder;
var note_data = [];
var length = 0;
var sorted_note_data = [];


function init() {
  debug('init', this._name);
  finder = new LiveAPI();
  setup_tasks();
  setup_patcher();
}

function setup_tasks(){
	script.tasks = new TaskServer(script, 50);
}

function setup_patcher(){
	util.find_patcher_objects(script, patcher, util.get_patcher_script_names(patcher));
}

function select_clip(){
	get_currently_selected_clip_contents();
}

function get_currently_selected_clip_contents() {
  debug('starting...');
  finder.goto('live_set view detail_clip');
  //debug('id is:', finder.id);
  //length = finder.call('length');
  //get_notes, beginning time, beginning pitch, end time, end pitch
  note_data = array_from_get_notes(finder.call('get_notes', 0, 0, 32, 128));
  debug('note_data:', note_data);
  output_note_data(note_data);
}

function output_note_data(data){
  outlet(0, 'erase',  'all');
  for(var i in data){
    var pitch = data[i][0];
    var time = data[i][1];
    var duration = data[i][2];
    var velocity = data[i][3];
    var mute = data[i][4];
    debug('pitch:', pitch, 'time:', time, 'duration:', duration, 'velocity:', velocity, 'mute:', mute);
    if(!mute){
      outlet(0, 'add', 1, time/4, 144, pitch, velocity);
      outlet(0, 'add', 1, (time/4)+(duration/4), 144, pitch, 0);
    }
  }
  outlet(0, 'play', 1);
}

function array_from_get_notes(get_notes_array) {
  //return is notes:num, note: pitch, time, duration, velocity, mute (for len notes)
  var item;
  var result = [];
  // debug('get_notes:');
  if ((get_notes_array[0] == 'notes') && (get_notes_array[1] > 0)) {
    while (get_notes_array.length > 0) {
      item = get_notes_array.splice(0, 1);
      // debug('item:', item, get_notes_array);
      if (item == 'note') {
        // get_notes_array.splice(0, 1);
        result.push(get_notes_array.splice(0, 5));
      }
    }
  }
  return result;
}

function sort_note_array(data) {
  //debug('sort_note_array:', data)
  var result = [];
  for (var i in data) {
    var index = 0;
    for (var j in result) {
      if (result[j][0] > data[i][0]) {
        break;
      }
      index += 1;
    }
    result.splice(index, 0, [data[i][0], data[i][2]]);
  }
  //debug('sorted_note_array:', result);
  return result;
}


forceload(this);
