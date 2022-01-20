autowatch = 1;

var unique = jsarguments[1];

aumhaa = require('_base');
util = require('aumhaa_util');
util.inject(this, util);
var api_util = require('aumhaa_LiveAPI_util');

var FORCELOAD = true;
var DEBUG = true;

var script = this;
aumhaa.init(this);

var Alive = false;
var _name = jsarguments[0];
var finder;

// var controls = {};
var util_control_surface_type = jsarguments[1]||'Util';
var twister_control_surface_type = jsarguments[1]||'Twister';

function anything(){}

function init(){
  debug('init', this._name);
  finder = new LiveAPI();
  setup_tasks();
  setup_apiUtil();
  setup_device_watcher();
  init_m4l_component();
  // setup_patcher();
}

function continue_init(){
	// setup_controls();
	// setup_device_navigation();
	// setup_listeners();
	// setup_tests();
  // setup_modes();
}

function setup_tasks(){
	script['tasks'] = new TaskServer(script, 20);
}

function setup_apiUtil(){
	script.apiUtil = new api_util.APIUtility();
}

function init_m4l_component(){
	debug(script._name,  'init');
  if(!finder){
	  finder = new LiveAPI(callback, 'id', 0);
  }
  finder.path = 'control_surfaces';
  util_control_surface_id =  apiUtil.find_control_surface(util_control_surface_type);
  if(util_control_surface_id!=0){
    finder.id = util_control_surface_id;
    debug('Util modhandleID', parseInt(this.finder.call('get_control_by_name', 'ModHandle')[1]));
    var modHandleId = parseInt(this.finder.call('get_control_by_name', 'ModHandle')[1]);
		if(modHandleId!=0){
	    util_control_surface = new LiveAPI(function(){}, 'id', modHandleId);
    }
  }
  twister_control_surface_id =  apiUtil.find_control_surface(twister_control_surface_type);
  if(twister_control_surface_id!=0){
    finder.id = twister_control_surface_id;
    debug('Twister modhandleID', parseInt(this.finder.call('get_control_by_name', 'ModHandle')[1]));
    var modHandleId = parseInt(this.finder.call('get_control_by_name', 'ModHandle')[1]);
    if(modHandleId!=0){
      twister_control_surface = new LiveAPI(function(){}, 'id', modHandleId);
    }
  }
  if(util_control_surface_id||twister_control_surface_id){
    continue_init();
    deprivatize_script_functions();
    return;
  }
}

function setup_device_navigation(){
	debug('setup_device_navigation');
	var path = control_surface.path;
	script.device_navigation = new LiveAPI(function(){}, path);
	apiUtil.set_component_by_type(device_navigation, 'DeviceNavigationComponent');
	// if(device_names.id != 0){
	// 	device_names.property = 'item_names';
	// 	debug('get item_names:', device_names.get('item_names'));
	// }
	debug('device_navigation:', device_navigation.id);
}

function setup_device_watcher(){
  if(!finder){
    finder = new LiveAPI(callback, 'id', 0);
  }
  finder.path = 'this_device';
  var this_device_id = parseInt(finder.id);
  // debug('this_device_id:', this_device_id);
  var this_track_id = apiUtil.track_from_id(this_device_id);
  this_device_obj = new LiveAPI(device_changed_callback, 'id', apiUtil.next_device(this_track_id, this_device_id));
  // debug('this_device_obj.id:', this_device_obj.id);
  // debug('NAME OF DEVICE:', apiUtil.device_name_from_id(parseInt(this_device_obj.id)));
  //TODO:  set observation by path instead of default behavior, but not sure what the xact property is....
}

function device_changed_callback(){
  var args = arrayfromargs(arguments);
  debug('device_changed_callback', args);
}

function callback(args){}

function set_device_bank(value){
  if(util_control_surface_id!=0){
    util_control_surface.call('change_device_bank', value, 'id', this_device_obj.id);
  }
  if(twister_control_surface_id!=0){
    twister_control_surface.call('change_device_bank', value, 'id', this_device_obj.id);
  }
}

function note_in(num, val){
  debug('note_in:', num, val);
  if((num>=36)&&(num<44)&&(val > 0)){
    var new_bank_number = parseInt(num - 36);
    set_device_bank(new_bank_number);
  }
}

forceload(this);
