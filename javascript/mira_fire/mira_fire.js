autowatch = 1;
outlets = 2;


aumhaa = require('_base');
var util = require('aumhaa_util');
util.inject(this, util);
var api_util = require('aumhaa_LiveAPI_util');


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

var Alive = false;
var _name = jsarguments[0];
var finder;
var control_surface;
var return_value;
var controls = {};


var FORCELOAD = true;
var DEBUG = true;

aumhaa.init(this);
var script = this;

var BUTTONMAP = [];
for(var i=0;i<32;i++){
	BUTTONMAP[i]=i;
}

BUTTONMAP[0]=44;
BUTTONMAP[1]=45;

if(typeof(String.prototype.trim) === "undefined")
{
	String.prototype.trim = function()
	{
		return String(this).replace(/^\s+|\s+$/g, '');
	}
}


function init(){
  debug('init', this._name);
  finder = new LiveAPI();
  setup_tasks();
  setup_patcher();
	setup_apiUtil();
  // init_m4l_component();
  Alive = true;
	messnamed('from_commander', 'update_remote_display');
}

function continue_init(){
	setup_controls();
	setup_listeners();
	setup_tests();
	// control_surface.call_script_function('refresh_state');
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
	//debug('device_select_buttons:', device_select_buttons.length);
}

function setup_apiUtil(){
	script.apiUtil = new api_util.APIUtility();
}

function setup_controls(){
	script['ControlRegistry'] = new ControlRegistry('ControlRegistry');
	script['grid'] = [];
	script['gridRaw'] = [];
	for(var x=0;x<32;x++){
		grid[x] = [];
		for(var y=0;y<8;y++){
			var index = x+(y*32);
			var id = index; // + 64;
 			gridRaw[index]= new Button(id, 'Button_'+index);
			Grid.add_control(x, y, gridRaw[index]);
			ControlRegistry.register_control((id), gridRaw[index]);
		}
	}
}

function setup_listeners(){

}

function setup_tests(){

}

function setup_modes(){
	//Page 1:  mainPage
	script['mainPage'] = new Page('mainPage');
	mainPage.enter_mode = function()
	{
		debug('mainPage entered');
	}
	mainPage.exit_mode = function()
	{
		debug('mainPage exited');
	}
	mainPage.update_mode = function()
	{
		debug('mainPage updated');
		if(mainPage._shifted)
		{
			debug('mainPage._shifted');
		}
		else if(mainPage._alted)
		{
			debug('mainPage._alted');
		}
		else
		{
			mainPage.enter_mode();
		}
	}
	script["MainModes"] = new PageStack(1, 'Main Mode');
	MainModes.add_mode(0, mainPage);
	//MainModes.set_mode_cycle_button();
	MainModes.change_mode(0);
}



function callback(args){}

function anything(){}

function NoteInput(nn, vel){
	debug('NoteInput:', nn, vel);
}

function CCInput(cc, val){
	debug('CCInput:', cc, val);
}

function SysexInput(){
	var args = arrayfromargs(arguments);
	debug('SysexInput:', args);
}

function ButtonsInput(num){
	debug('ButtonsInput:', num)
	outlet(0, 'note', BUTTONMAP[num], 127);
	outlet(0, 'note', BUTTONMAP[num], 0);
}

function livestep_out(){
	var vals = arrayfromargs(arguments);
	debug('livestep_out:',  vals);
}





forceload(this);
