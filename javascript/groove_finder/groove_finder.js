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
// var VIEW_DEVICEDICT = true;
// this._grooveDict = new DictModule('grooveLibrary', {'dict_name':'GrooveLibrary',
//		'obj':patcher.getnamed('GrooveLibrary'), 'VIEW_DEVICEDICT':VIEW_DEVICEDICT});

function init() {
  debug('init', this._name);
  finder = new LiveAPI();
  setup_tasks();
  setup_patcher();
  setup_nodescript();
}

function setup_tasks(){
	script.tasks = new TaskServer(script, 50);
}

function setup_patcher(){
	util.find_patcher_objects(script, patcher, util.get_patcher_script_names(patcher));
}

function setup_nodescript(){
  var running = nodescript.getattr('running');
  debug('setup_nodescript, running:', running);
  if(running>0){
    nodescript.message('init_from_js');
    //outlet(0, 'init_from_js');
  }
  else{
    //outlet(0, 'script', 'start');
    nodescript.message('script', 'start');
    tasks.addTask(check_running, {}, 20, true, 'check_running');
  }
}




function check_running(){
  var running = nodescript.getattr('running');
  if(running<1){
    //debug('nodescript not running');
    outlet(0, 'script', 'start');
  }
}

function nodescript_running(){
  debug('nodescript_running');
  tasks.removeTask(check_running, {}, 'check_running');
  nodescript.message('init_from_js');
}

function node_script_initialized(){
  debug('node_script_initialized');
  nodeScriptInitialized = true;
}

function node_script_not_initialized(){
  var args = arrayfromargs(arguments);
  debug('node_script_not_initialized:', args, typeof args);

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
  note_data = sort_note_array(array_from_get_notes(finder.call('get_notes', 0, 0, 32, 128)));
  debug('note_data:', note_data);
}

function display_seqbuf(){
  seqbuf.message('clear');
  for(var i in note_data){
    var note = note_data[i][0];
    var vel = note_data[i][1];
    if((vel>0)&&(note<64)){
      note = Math.round(note*16);
      seqbuf.message(note, 1);
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
  agrbuf.message('clear');
  var note_data = comparison_obj.note_data;
  for(var i in note_data){
    var note = note_data[i][0];
    var vel = note_data[i][1];
    if((vel>0)&&(note<64)){
      note = Math.round(note*16);
      agrbuf.message(note, 1);
    }
  }
}

var diff = function (a, b) { return Math.abs(a - b); }

forceload(this);
