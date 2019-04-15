autowatch = 1;

inlets = 1;
outlets = 1;

var script = this;
script._name = jsarguments[0];

var unique = jsarguments[1];

aumhaa = require('_base');
var FORCELOAD = false;
var DEBUG = false;
aumhaa.init(this);

var finder;
var mod;
var found_mod;
var mod_finder;
var Mod = ModComponent.bind(script);
var ModProxy = ModProxyComponent.bind(script);

var INIT_GLOBAL = false;
var aumhaaGlobal = new Global('aumhaaGlobal');

if((!aumhaaGlobal.sampleChooser)||(INIT_GLOBAL)){
	debug('making sampleChooser global');
	aumhaaGlobal.sampleChooser = {};
}

var this_device_id = 0;
var this_track_id = 0;

var Alive = false;

var colors = {OFF : 0, WHITE : 1, YELLOW : 2, CYAN : 3, MAGENTA : 4, RED : 5, GREEN : 6, BLUE : 7};
var PushColors = {OFF : 0, WHITE : 1, YELLOW : 2, CYAN : 3, MAGENTA : 4, RED : 5, GREEN : 6, BLUE : 7};

function anything(){
	debug('anything:', messagename, arrayfromargs(arguments));
}

function note_in(){}

function init(){
	debug('init', script._name);
	/*mod = new ModProxy(script, ['Send', 'SendDirect', 'restart']);
	found_mod = new Mod(script, 'skin', unique, false);
	//mod.debug = debug;
	mod_finder = new LiveAPI(mod_callback, 'this_device');
	found_mod.assign_api(mod_finder);*/

	setup_tasks();
	setup_translations();
	setup_colors();
	setup_patchers();
	setup_controls();
	setup_dict();
	setup_components();
	setup_device();
	setup_modes();
	setup_listeners();
	setup_storage();
	setup_global_link();
  setup_tests();
	deprivatize_script_functions(this);

	Alive = true;
}

function mod_callback(args){
	if((args[0]=='value')&&(args[1]!='bang'))
	{
		//debug('mod callback:', args);
		if(args[1] in script)
		{
			script[args[1]].apply(script, args.slice(2));
		}
		if(args[1]=='disconnect')
		{
			debug('disconnect!');
			mod.restart.schedule(3000);
		}
	}
}

function alive(val){
	initialize(val);
}

function initialize(){
	mod = found_mod;
}

function setup_tasks(){
	script['tasks'] = new TaskServer(script, 100);
}

function setup_translations(){}

function setup_colors(){}

function setup_patchers(){
	//this collects all named objects in the main patcher and makes them members of the root script
	find_patcher_objects(script, patcher, get_patcher_script_names(patcher));
}

function setup_controls(){
	script['GridControlRegistry'] = new ControlRegistry('GridRegistry');
	script['KeysControlRegistry'] = new ControlRegistry('KeysRegistry');
	script['grid'] = [];
	script['raw_grid'] = [];
	script['KeyButtons'] = [];
	script['Grid'] = new GridClass(8, 8, 'Grid');
	script['Keys'] = new GridClass(8, 1, 'Keys');
	script['ShiftButton'] = new ButtonClass('shift', 'Shift', function(){});
	script['AltButton'] = new ButtonClass('alt', 'Alt', function(){});
	var make_send_func = function()
	{
		var args = arrayfromargs(arguments);
		if(args.length == 4)
		{
			var func = function(value, suppress_block)
			{
				//debug('sending:', args[0], args[1], args[2], args[3], value);
				mod.Send(args[0], args[1], args[2], args[3], value);
			}
		}
		else
		{
			var func = function(value)
			{
				//debug('value:', args, value);
				mod.Send(args[0], args[1], args[2], value);
			}
		}
		return func;
	}

	for(var x=0;x<8;x++)
	{
		grid[x] = [];
		for(var y=0;y<8;y++)
		{
			var id = x+(y*8);
			grid[x][y] = new ButtonClass(id, 'Cell_'+id, make_send_func('grid', 'value', x, y));
			raw_grid.push(grid[x][y]);
			GridControlRegistry.register_control(id, grid[x][y]);
			Grid.add_control(x, y, grid[x][y]);
		}
	}

	for(var id=0;id<8;id++)
	{
		KeyButtons[id] = new ButtonClass(id, 'Key_'+id, make_send_func('key', 'value', id));
		KeysControlRegistry.register_control(id, KeyButtons[id]);
		Keys.add_control(id, 0, KeyButtons[id]);
	}

	//script['DetentDial'] = new ControlClass(0, 'DetentDial', {'_send':make_send_func('detent_dial', 'value')});


	script['_grid'] = function(x, y, val){GridControlRegistry.receive(x+(y*8), val);}
	script['_key'] = function(num, val){KeysControlRegistry.receive(num, val);}
	script['_shift'] = function(val){ShiftButton.receive(val);}
	script['_alt'] = function(val){AltButton.receive(val);}

}

function setup_dict(){}

function setup_components(){
  script['finder'] = new LiveAPI(function(){}, 'this_device');
  this_device_id = parseInt(finder.id);
	this_track_id = track_id();
}

function setup_device(){}

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
	MainModes.mode_cycle_value.owner = MainModes;
	MainModes.add_mode(0, mainPage);
	//MainModes.set_mode_cycle_button();
	MainModes.change_mode(0);
}

function setup_listeners(){
}

function setup_storage(){}

function setup_global_link(){
	debug(this._name, 'setup_global_link');
  var glob = aumhaaGlobal.sampleChooser;
	if(!glob.relay_list){
		glob.relay_list = {};
  }
	glob.relay_list[unique] = this_track_id;

  for(var i in glob.chooser_list){
    glob.chooser_list[i].check_relays = true;
  }
	debug('done with link');
}

function setup_tests(){
  //introspect_global();
}

function introspect_global(){
	debug('introspect_global', aumhaaGlobal.sampleChooser, aumhaaGlobal.sampleChooser.length);
  for(var i in aumhaaGlobal.sampleChooser){
    debug('item:', i, aumhaaGlobal.sampleChooser[i]);
    for(var j in aumhaaGlobal.sampleChooser[i]){
      debug('subitem:', j, aumhaaGlobal.sampleChooser[i][j]);
    }
  }
}

function track_id(){
  id = this_device_id;
	finder.id = id;
	var recurse = function(id){
		if(id == 0){
			return 0;
		}
		finder.goto('canonical_parent');
		if(finder.type=='Track'){
			return parseInt(finder.id);
		}
		else{
			return recurse(id);
		}
	}
	return recurse(id);
}



forceload(this);
