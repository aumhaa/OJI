autowatch = 1;

aumhaa = require('_base');
util = require('aumhaa_util');
var FORCELOAD = true;
var DEBUG = true;
aumhaa.init(this);
var script = this;


var _name = 'groove_finder.js';
var finder;
var note_data = [];
var sorted_note_data = [];
var grooveDict = new Dict("GrooveLibrary");
var intGrooveLibrary = {};
var nodeScriptInitialized = false;
var comparison_stats = [];
var comparison_data = {};
var clip_buffer = [];
var NODE_DEBUG =  true;
// var VIEW_DEVICEDICT = true;
// this._grooveDict = new DictModule('grooveLibrary', {'dict_name':'GrooveLibrary',
//		'obj':patcher.getnamed('GrooveLibrary'), 'VIEW_DEVICEDICT':VIEW_DEVICEDICT});


function init() {
  debug('init', this._name);
  finder = new LiveAPI();
  setup_tasks();
  setup_patcher();
  setup_viewer();
  setup_clipfollower();
  setup_nodescript();
  NODE_DEBUG&&node_debug.front();
  initialize_nodescript();
}

function setup_tasks(){
	script.tasks = new TaskServer(script, 50);
}

function setup_patcher(){
	util.find_patcher_objects(script, patcher, util.get_patcher_script_names(patcher));
}

function setup_viewer(){
  script.viewer = new ViewerClass('Viewer', {obj:viewer});
  viewer.initialize();
}

function setup_clipfollower(){
  this._clipfollower = new ClipFollowerComponent();
}

function setup_nodescript(){
  // debug('setup_nodescript');
  script['NSProxy'] = new NodeScriptProxy('NSProxy', {obj:nodescript,
                                                      cabled:false,
                                                      debug:NODE_DEBUG,
                                                      debugTypes:['error']});
  script['asyncResolve'] = NSProxy.asyncResolve;
  script['nodeDump'] = NSProxy.nodeDump;
  script['toNSProxy'] = NSProxy.receive;

  var restart_task = new Task(initialize_nodescript, this);
  var on_nodescript_terminated = function () {
    debug('on_nodescript_terminated');
    // restart_task.schedule(1000);
    Alive = false;
    nodeScriptInitialized = true;
    // restart_button.hidden = 0;
    // restart_button.message('text', 'RESTART');
  }

  NSProxy.addTerminationCallback(on_nodescript_terminated);
}

function initialize_nodescript(){
  debug('initialize_nodescript');
  NSProxy.initialize().then(function(res){
    debug('SCRIPT', 'success', JSON.stringify(res));
    NSProxy.asyncCall('init_from_js').then(function(path){
      debug('returned from init_from_js', path);
      node_script_initialized(path);
    }).catch(function(err){
      debug('NSProxy setup error:', err.message);
      util.report_error(err);
      if(err.message=='no library path'){
        // select_library_button.message(1);
        node_script_initialized();
      };
    });
  }).catch(function(e){
    util.report_error(e);
  });
}

function node_script_initialized(res){
  debug('node_script_initialized:', res);
  nodeScriptInitialized = true;
  debug('NSProxy init finished');
  util.deprivatize_script_functions(script);  /**this is needed for _grid, _key, etc mod funcs */
  res&&activate();
}

function activate(){
  debug('activate');
  Alive = true;
  // DEBUG&&setup_tests();
  update_library();
}


function select_clip(){
	get_currently_selected_clip_contents();
  compare_all();
  display_seqbuf();
  populate_chooser();
}

function get_currently_selected_clip_contents() {
  debug('starting...');
  finder.goto('live_set view detail_clip');
  //debug('id is:', finder.id);
  clip_buffer = array_from_get_notes(finder.call('get_notes', 0, 0, 32, 128));
  note_data = sort_note_array((clip_buffer));
  // debug('note_data:', note_data);
}

//untested
function set_currently_selected_clip_contents(new_contents){
  finder.goto('live_set view detail_clip');
  finder.call('set_notes');
  finder.call('notes', new_contents.length);
  for(var i in new_contents){
    finder.call('note', new_contents[i]);
  }
  finder.call('done');
}

//unfinished
function interpolate_clip_buffer_with_groove(clip_buffer, groove){
  var new_buffer = [];
  // var time_indexed_groove = groove.map

}

function display_seqbuf(){
  viewer.clear_seq();
  for(var i in note_data){
    var note = note_data[i][0];
    var vel = note_data[i][1];
    if((vel>0)&&(note<64)){
      viewer.draw_seq_note(note, vel);
    }
  }
}

function array_from_get_notes(get_notes_array) {
  var item;
  var result = [];
  if ((get_notes_array[0] == 'notes') && (get_notes_array[1] > 0)) {
    while (get_notes_array.length > 0) {
      item = get_notes_array.splice(0, 1);
      //debug('item:', item, get_notes_array);
      if (item == 'note') {
        get_notes_array.splice(0, 1);
        result.push(get_notes_array.splice(0, 4));
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

function display_current_groove_library() {
  for (var agr in intGrooveLibrary) {
    debug('Groove file:', agr);
    debug('contents', intGrooveLibrary[agr].note_data_pairs);
  }
}

function update_library(){
	//debug('grooveDict:', typeof grooveDict, grooveDict.name, grooveDict.getkeys());
  intGrooveLibrary = util.dict_to_jsobj(grooveDict);
  for(var agr in intGrooveLibrary){
    var new_data = [];
    var notes = intGrooveLibrary[agr].notes;
    var velocities = intGrooveLibrary[agr].velocities;
		for (var i in notes) {
			new_data[i] = [notes[i], velocities[i]];
		}
    intGrooveLibrary[agr].name = agr;
    intGrooveLibrary[agr].note_data_pairs = new_data;
  }
  //display_current_groove_library();
}

function compare_all() {
  comparison_stats = [];
	update_library();

  for (var i in intGrooveLibrary) {
    comparison_stats.push(compare_grooves(note_data, intGrooveLibrary[i].note_data_pairs, intGrooveLibrary[i].name));
  }
  comparison_stats.sort(function(a, b){return a.mean - b.mean;});
  // for(var i in comparison_stats){
  //   comparison_data[comparison_stats[i].name] = comparison_stats
  // }
  populate_chooser();
}

function compare_grooves(clip_data, groove_data, name){
  var comparison_data = {'name':name, 'mean':0, 'difs':[], 'note_data':groove_data};
  var groove_notes = [];
	var position = 0;
  for (var i in groove_data) {
    groove_notes.push(groove_data[i][0]);
  }
	//debug('compare_grooves:\n clip_data:', clip_data, '\n groove_notes:', groove_notes);
  for (var i in clip_data) {
    var clip_note = clip_data[i][0];
		if(groove_data.length){
			var closest = groove_notes.reduce(function(prev, curr) {
				return (Math.abs(curr - clip_note) < Math.abs(prev - clip_note) ? curr : prev);
			});
		}
		var dif = diff(clip_note, closest);
		//debug('clip_note:', clip_note);
		//debug('closest:', closest);
		comparison_data.difs.push(dif);
  }
	var mean = getAvg(comparison_data.difs);
	comparison_data.mean = mean;
	//debug('mean:', mean);
	//debug(comparison_data.name, comparison_data.mean, comparison_data.difs);
	return comparison_data;
}

function getAvg(ar) {
	//debug('getAvg:', ar);
  var total = ar.reduce(function(acc, c){return acc + c}, 0);
	//debug('total:', total);
  return total / ar.length;
}

function populate_chooser(){
  agr_chooser.message('clear');
  for(var i in comparison_stats){
    agr_chooser.message('append', comparison_stats[i].name);
  }
}

function chooser_single(index, item){
  display_agrbuf(comparison_stats[index]);
}

function display_agrbuf(comparison_obj){
  var note_data = comparison_obj.note_data;
  viewer.clear_groove();
  for(var i in note_data){
    var note = note_data[i][0];
    var vel = note_data[i][1];
    if((vel>0)&&(note<64)){
      viewer.draw_groove_note(note, vel);
    }
  }
}

var diff = function (a, b) { return Math.abs(a - b); }


function ViewerClass(name, args){
  var self = this;
	this.add_bound_properties(this, [
    '_obj'
	]);
	ViewerClass.super_.call(this, name, args);
}

util.inherits(ViewerClass, EventEmitter);

ViewerClass.prototype.draw_seq_note = function(pos, vel){
  x = (1000/16)*pos;
  y = 0;
  x2 = 5;
  y2 = ((100/127)*vel);
  this._obj.message('set_source_rgba', 1, 0, 0, 1);
  this._obj.message('rectangle', x, y, x2, y2);
  this._obj.message('fill');
}

ViewerClass.prototype.draw_groove_note = function(pos, vel){
  x = (1000/16)*pos;
  y = 100;
  x2 = 5;
  y2 = ((100/127)*vel)+100;
  this._obj.message('set_source_rgba', 0, 0, 1, 1);
  this._obj.message('rectangle', x, y, x2, y2);
  this._obj.message('fill');
}

ViewerClass.prototype.initialize = function(){
  this._obj.message('set_source_rgba', 1, 1, 1, 1);
  this._obj.message('paint');
  this._obj.message('set_source_rgba', 0, 0, 0, 1);
  this._obj.message('identity_matrix');
  this._obj.message('move_to', 0, 0);
}

ViewerClass.prototype.clear_seq = function(){
  this._obj.message('set_source_rgba', 1, 1, 1, 1);
  this._obj.message('rectangle', 0, 0, 1000, 100);
  this._obj.message('fill');
}

ViewerClass.prototype.clear_groove = function(){
  this._obj.message('set_source_rgba', 1, 1, 1, 1);
  this._obj.message('rectangle', 0, 100, 1000, 100);
  this._obj.message('fill');
}


function ClipFollowerComponent(name, args){
  var self = this;
	this.add_bound_properties(this, [
    '_on_selected_track_changed'
	]);
  this._selected_track = new LiveAPI(this._on_selected_track_changed, 'live_set', 'view', 'selected_track');
  this._selected_track.property = 'playing_slot_index';
	ClipFollowerComponent.super_.call(this, name, args);
}

util.inherits(ClipFollowerComponent, EventEmitter);

ClipFollowerComponent.prototype.init = function(){

}

ClipFollowerComponent.prototype._on_selected_track_changed = function(val){
  debug('playing_slot_index is:', val);
  select_clip();
}

ClipFollowerComponent.prototype._on_selected_clipslot_changed = function(){

}




forceload(this);
