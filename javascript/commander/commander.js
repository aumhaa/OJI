autowatch = 1;
outlets = 2;


aumhaa = require('_base');
var util = require('aumhaa_util');
util.inject(this, util);
var api_util = require('aumhaa_LiveAPI_util');


var Alive = false;
var _name = jsarguments[0];
var finder;
var control_surface;
var return_value;
var control_names = [];
var controls = {};
var EXCLUDED = ['control', 'control_names', 'done'];
var control_surface_type = jsarguments[1]||'None';

var FORCELOAD = false;
var DEBUG = true;
var SHOW_DICTS = false;
var VIEW_DEVICE = false;
aumhaa.init(this);
var script = this;


if(typeof(String.prototype.trim) === "undefined")
{
	String.prototype.trim = function()
	{
		return String(this).replace(/^\s+|\s+$/g, '');
	}
}

control_names = [
								"arm_selected",
								"mute_selected",
								"solo_selected",
								"fire_next_clip",
								"fire_prev_clip",
								"stop_clip",
								"stop_all_clips",
								"select_playing_clip",
								"new_scene",
								"arm_kill",
								"mute_kill",
								"solo_kill",
								"mute_flip",
								"arm_excl",
								"mute_excl",
								"solo_excl",
								"toggle_autoarm",
								"toggle_clip_detail",
								"create_audio_track",
								"create_midi_track",
								"undo",
								"redo",
								"toggle_detail_clip_loop",
								"select_first_armed_track",
								"fire_next_clip_abs",
								"fire_prev_clip_abs",
								"fire_next_armed",
								"fire_all_armed",
								"prev_track",
								"next_track",
								"play",
								"stop",
								"bank_track_left",
								"bank_track_right",
								"track_select[0]",
								"track_select[1]",
								"track_select[2]",
								"track_select[3]",
								"track_select[4]",
								"track_select[5]",
								"track_select[6]",
								"track_select[7]",
								"place_holder",
								"metro_toggle",
								"record",
								"bank_device_left",
								"bank_device_right",
								"device_select[0]",
								"device_select[1]",
								"device_select[2]",
								"device_select[3]",
								"device_select[4]",
								"device_select[5]",
								"device_select[6]",
								"device_select[7]",
								"track[0]",
								"track[1]",
								"track[2]",
								"track[3]",
								"track[4]",
								"track[5]",
								"track[6]",
								"track[7]"];

// "volume_slider",
// "enter",
// "dir_left",
// "dir_up",
// "dir_right",
// "dir_down",


function init(){
  debug('init', this._name);
  finder = new LiveAPI();
  setup_tasks();
  setup_patcher();
	setup_apiUtil();
  init_m4l_component();
  Alive = true;
	messnamed('from_commander', 'update_remote_display');
}

function continue_init(){
  setup_session_ring();
	setup_mixer();
	setup_device_controls();
	setup_device_navigation();
	control_surface.call('refresh_state');
}

function setup_tasks(){
	script['tasks'] = new TaskServer(script, 20);
}

function setup_patcher(){
	// var sub = this.patcher.getnamed('commander_parameter_controls').subpatcher();
	var sub = this.patcher;
	script.controls = {};
	find_patcher_objects(controls, this.patcher, get_patcher_script_names(this.patcher));
	//find_patcher_objects(controls, sub, control_names.slice(46));
	script.track_select_buttons = [];
	script.device_select_buttons = [];
	for(var i=0;i<8;i++){
		track_select_buttons.push(controls['track_select['+i+']']);
		device_select_buttons.push(controls['device_select['+i+']']);
	}
	for(var i=0;i<8;i++){
		device_select_buttons.push(controls['track['+i+']']);
	}
	debug('device_select_buttons:', device_select_buttons.length);
	script.paramDial = [];
	script.paramName = [];
	script.paramValue = [];
	for(var i = 0;i<16;i++){
		paramName[i] = this.patcher.getnamed('name['+i+']');
		paramValue[i] = this.patcher.getnamed('value['+i+']');
		paramDial[i] = this.patcher.getnamed('paramDial['+i+']');
	}
	script.volume_slider = this.patcher.getnamed('volume_slider');
	script.cue = this.patcher.getnamed('cue');
	VIEW_DEVICE&&sub.front();
}

function setup_apiUtil(){
	script.apiUtil = new api_util.APIUtility();
}

function setup_session_ring(){
  var path = control_surface.path;
  var session_ring_callback = function(args){
		if((args[0]=='offsets')&&(args[1]!='id')){
	    outlet(0, 'session_offset', args);
			// debug('session_ring_callback:', args);
		}
  }
  // debug('path:', path);
  script.session_ring = new LiveAPI(session_ring_callback, path);
  // session_ring.goto('components', 1);
	apiUtil.set_component_by_type(session_ring, 'UtilSessionRingComponent');
	if(session_ring.id != 0){
	  session_ring.property = 'offsets';
	}
  //debug(session_ring.get('name'));
}

function setup_mixer(){
	var path = control_surface.path;
	var track_names_callback = function(args){
			// debug('track_names_callback:', args.length, args);
		 if((args[0]=='track_names')&&(args[1]!='id')){
			 //outlet(0, 'track_names', args);
			 // debug('track_names_callback2:', args.length, args);
			 for(var i=0;i<8;i++){
				 track_select_buttons[i].message('text', args[i+1] ? args[i+1] : '');
			 }
		 }
	}
	script.track_names = new LiveAPI(track_names_callback, path);
	apiUtil.set_component_by_type(track_names, 'UtilMixerComponent');
	if(track_names.id != 0){
		track_names.property = 'track_names';
		var names = track_names.get('track_names');
		for(var i=0;i<8;i++){
			track_select_buttons[i].message('text', names[i] ? names[i] : '');
		}
	}
	//debug('track_names:', track_names.id);

	var selected_strip_volume_callback = function(args){
			// debug('cue_volume_callback:', args.length, args);
			if((args[0]=='normalized_parameter_value')&&(args[1]!='id')){
				volume_slider.message('set', args[1]);
		}
	}
	script.selected_strip_volume = new LiveAPI(selected_strip_volume_callback, path);
	apiUtil.set_control_by_name(selected_strip_volume, 'Fader');
	if(selected_strip_volume.id != 0){
		selected_strip_volume.property = 'normalized_parameter_value';
		volume_slider.message('set', selected_strip_volume.get('normalized_parameter_value'));
	}

	var cue_volume_callback = function(args){
			// debug('cue_volume_callback:', args.length, args);
			if((args[0]=='normalized_parameter_value')&&(args[1]!='id')){
				cue.message('set', args[1]);
		}
	}
	script.cue_volume = new LiveAPI(cue_volume_callback, path);
	apiUtil.set_control_by_name(cue_volume, 'Dial');
	if(cue_volume.id != 0){
		cue_volume.property = 'normalized_parameter_value';
		cue.message('set', cue_volume.get('normalized_parameter_value'));
	}

}

function setup_device_controls(){
	var path = control_surface.path;

	var device_name_callback = function(args){
		if((args[0]=='device_name')&&(args[1]!='id')){
		 	debug('device_name:', args.length, args);
			this.patcher.getnamed('device_name').message('set', args[1])
		}
	}
	script.device_name = new LiveAPI(device_name_callback, path);
	apiUtil.set_component_by_type(device_name, 'UtilDeviceComponent');
	if(device_name.id != 0){
		device_name.property = 'device_name';
		//debug('get device_name:', device_name.get('device_name'));
	}

	var parameter_names_callback = function(args){
		if(args[0]=='current_parameter_names'){
		 	// debug('parameter_names_callback:', args.length, args);
			for(var i=0;i<16;i++){
				paramName[i].message('set', args[i+1]);
			}
		}
	}
	script.parameter_names = new LiveAPI(parameter_names_callback, path);
	apiUtil.set_component_by_type(parameter_names, 'UtilDeviceParameterComponent');
	if(parameter_names.id != 0){
		parameter_names.property = 'current_parameter_names';
		// debug('get names:', parameter_names.get('current_parameter_names'));
	}

	var parameter_values_callback = function(args){
		 if(args[0]=='current_parameters'){
		 	// debug('parameter_values_callback:', args.length, args);
			for(var i=0;i<16;i++){
				paramValue[i].message('set', args[i+1]);
			}
		}
	}
	script.parameter_values = new LiveAPI(parameter_values_callback, path);
	apiUtil.set_component_by_type(parameter_values, 'UtilDeviceParameterComponent');
	if(parameter_values.id != 0){
		parameter_values.property = 'current_parameters';
		// debug('get values:', parameter_names.get('current_parameters'));
	}

	var make_parameter_value_callback = function(i){
		var parameter_proxy_callback = function(args){
			if((args[0]=='normalized_value')&&(args[1]!='id')){
				// debug('parameter_proxy_callback', i, args[1]);
				if(paramDial[i]){
					paramDial[i].message('set', args[1]);
				}
			}
		}
		return parameter_proxy_callback;
	}
	script.parameter_proxy = [];
	for(var i = 0;i < 16; i ++){
		var parameter_proxy_callback = make_parameter_value_callback(i);
		parameter_proxy[i] = new LiveAPI(parameter_proxy_callback, path);
		apiUtil.set_component_by_name(parameter_proxy[i], 'ParameterProxy_'+i);
		if(parameter_proxy[i].id != 0){
			parameter_proxy[i].property = 'normalized_value';
			//debug('get value:', parameter_proxy.get('parameter_value'));
		}
	}
}

function setup_device_navigation(){
	var path = control_surface.path;
	var device_names_callback = function(args){
		if((args[0]=='item_names')&&(args[1]!='id')){
			debug('device_names_callback:', args.length, args);
			for(var i=0;i<16;i++){
				device_select_buttons[i].message('text', args[i+1] ? args[i+1] : '');
			}
		}
	}
	script.device_names = new LiveAPI(device_names_callback, path);
	apiUtil.set_component_by_type(device_names, 'DeviceNavigationComponent');
	if(device_names.id != 0){
		device_names.property = 'item_names';
		debug('get item_names:', device_names.get('item_names'));
	}
	debug('device_names:', device_names.id);
}

var COLORS = {white:[.7, .7, .7],
							off:[0, 0, 0],
							red:[.7, 0, 0],
							green:[0, .7, 0],
							blue:[0, 0, .7],
							cyan:[0, .7, .7],
							yellow:[.7, .7, 0],
							magenta:[.7, 0, .7]};

var color_order = [COLORS.white,COLORS.yellow,COLORS.cyan,COLORS.magenta,COLORS.red,COLORS.green,COLORS.blue];
var colors = [COLORS.off];
for(var i=0;i<127;i++){
	colors[i+1] = color_order[i%7];
}

function pipe_callback(args){
	//debug('args', args);
	if(args[1]=='midi'){
		//outlet(0, args.slice(1));
		if(args[2]==144){
			if(args[3] < 64){
				if(controls[control_names[args[3]]]){
					controls[control_names[args[3]]].message('activebgcolor', colors[args[4]]);
				}
			}
		}
	}
}

function init_m4l_component(){
	debug(script._name,  'init');
	finder = new LiveAPI(callback, 'control_surfaces');
	control_surface = new LiveAPI(pipe_callback, 'control_surfaces');
	var number_children = parseInt(finder.children[0]);
	debug('control_surfaces length:', number_children);
	for(var i=0;i<number_children;i++)
	{
		debug('Checking control surface #:', i);
		finder.goto('control_surfaces', i);
		control_surface.goto('control_surfaces', i);
		debug('looking for:', control_surface_type, 'type is:', finder.type);
		if(finder.type == control_surface_type)
		{
			debug('found corresponding control surface:', finder.type)
			var names = finder.call('get_control_names').filter(function(element){return EXCLUDED.indexOf(element)<0;}).slice(1);
			//debug('names:', names);
			for (var i in names)
			{
				// debug(i, 'name:', names[i]);
				var name = names[i];
				try
				{
					controls[names[i]] = 0;
				}
				catch(err)
				{
				}
			}
			control_surface.id = finder.id;
			control_surface.property = 'pipe';
			debug('control_surface is:', control_surface.path);
			deprivatize_script_functions(script);
			outlet(0, 'path', finder.path);
      continue_init();
			return;
		}
	}

}

function get_control_names(){
	for(var i in controls)
	{
		outlet(0, i);
	}
}

function make_callback(name){
	var callback = function(args)
	{
		debug('callback closure:', name, args);
		outlet(0, name, args);
	}
	return callback;
}

function _grab(name){

	debug('_grab:', name);
	if(controls[name]!=undefined)
	{
		if(controls[name]==0)
		{
			var control = finder.call('get_control', name);
			debug('control is:', control);
			var obj = new LiveAPI(make_callback(name), control);
			obj.property = 'value';
			controls[name] = obj;
			//debug('control:', obj.get('name'), obj.get('value'), obj.id);
			//debug('checking:', controls[name].get('name'), controls[name].get('value'));
			//controls[name].property = 'value';
		}
		//finder.call('grab_control', 'id', controls[name].id);
		finder.call('grab_control', name);
		//controls[name].property = 'value';

	}
	else
	{
		debug('Control name:', name, 'isnt registered.');
	}
}

function _release(name){
	if(controls[name]!=undefined)
	{
		if(controls[name]!=0)
		{
			controls[name].property = '';
			finder.call('release_control', 'id', controls[name].id);
		}
		else
		{
			debug('Control name:', name, 'hasnt been registered yet.  You need to grab it first.');
		}
	}
	else
	{
		debug('Control name:', name, 'isnt registered.');
	}
}

function _send_value(){
	var args = arrayfromargs(arguments)
	var obj = controls[args[0]]
	if((obj)&&(obj.property!=''))
	{
		debug('args', args.slice(1));
		obj.call('send_value', args[1], args[2], args[3]);
	}
}

function _call_function(){
	var args = arrayfromargs(arguments);
	func = args[0] ? args[0] : undefined;
	// debug('call_function:', func, 'args:', args);
	try
	{
		control_surface.call.apply(control_surface, args);
	}
	catch(err)
	{
		debug('_call_function error:', err, args);
	}
}

function callback(args){}

function anything(){}

function _from_parameter_controls(num, val){
	// debug('from_parameter_controls', num, val);
	parameter_proxy[num].call('set_value', val);
}

function _from_commander(){
	var args = arrayfromargs(arguments);
	//debug('from_commander:', args);
}

function _fader_value_in(val){
	selected_strip_volume.call('set_normalized_value', val);
}
function _cue_value_in(val){
	cue_volume.call('set_normalized_value', val);
}


forceload(this);
