autowatch = 1;

aumhaa = require('_base');
var ROLI = require('ROLI');
var FORCELOAD = false;
var DEBUG = false;
aumhaa.init(this);
var script = this;

var finder;
var mod;
var mod_finder;

var Mod = ModComponent.bind(script);

var unique = jsarguments[1];

var Alive = false;
var drumMatrix;
var main_modes;
var trackView;
var pset_id = 0;
var name_listener;
var device_name = '';
var NOTE_DURATION = '8n';
var PreInitVars = {'dc_pset':undefined, 'pgm':undefined};
var guiPads = [];
var guiKeys = [];
var guiKeys2 = [];
var guiShift, guiAlt;
var alted = false;
var shifted = false;
var selected = false;

var selectedPortOutput = undefined;

var OUTPUT_VELOCITY = 127;

var DEVICE_TYPES = ['InstrumentGroupDevice','DrumGroupDevice','MidiEffectGroupDevice','Operator','UltraAnalog','OriginalSimpler','MultiSampler','LoungeLizard','StringStudio','Collision','InstrumentImpulse','NoDevice'];

var DRUMCHOOSER_BANKS = {};
for(var i in DEVICE_TYPES)
{
	DRUMCHOOSER_BANKS[DEVICE_TYPES[i]] = [['Transpose', 'Mod_Chain_Vol', 'Filter Freq', 'Filter Res', 'Shaper Amt', 'Filter Type', 'Ve Release', 'Detune']];
}

//var DRUMCHOOSER_BANKS = {'MultiSampler':[['Transpose', 'Mod_Chain_Vol', 'Filter Freq', 'Filter Res', 'Shaper Amt', 'Filter Type', 'Ve Release', 'Detune']]};
									//['Mod_Chain_Vol_0', 'Mod_Chain_Vol_1', 'Mod_Chain_Vol_2', 'Mod_Chain_Vol_3']]};
var TRANS = [48, 49, 50, 51, 44, 45, 46, 47, 40, 41, 42, 43, 36, 37, 38, 39];

var ACTIVATE_NEWLY_SELECTED_LAYER = false;
var ARM_NEW_TRACK_EXPLICITLY = true;

if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (obj, fromIndex) {
    if (fromIndex == null) {
        fromIndex = 0;
    } else if (fromIndex < 0) {
        fromIndex = Math.max(0, this.length + fromIndex);
    }
    for (var i = fromIndex, j = this.length; i < j; i++) {
        if (this[i] === obj)
            return i;
    }
    return -1;
  };
}

function inArray(arr,obj) {
    return (arr.indexOf(obj) != -1);
}


function init()
{
	debug('drumchooser 1218 init');

	if(precheck())
	{
		mod = new Mod(script, 'drumchooser', unique, false);
		//mod.debug = debug;
		mod_finder = new LiveAPI(mod_callback, 'this_device');
		mod.assign_api(mod_finder);
	}
}

function precheck()
{
	var READY = true;
	var TRANS = [48, 49, 50, 51, 44, 45, 46, 47, 40, 41, 42, 43, 36, 37, 38, 39]
	if((!finder)||(!finder.id))
	{
		finder = new LiveAPI(callback, 'this_device');
		debug('this set id is', finder.id);
	}
	try
	{
		if(finder.id!==0)
		{
			finder.goto('this_device');
			var this_device_id = Math.floor(finder.id);
			finder.goto('canonical_parent');
			//finder.goto('view');
			debug('devices:', finder.get('devices'));
			var device_ids = finder.get('devices').filter(function(element){return element !== 'id';})
			var this_device_index = device_ids.indexOf(this_device_id);
			if((this_device_index>-1)&&(device_ids[this_device_index+1]))
			{
				var drumpads = [];
				debug('found drumrack....');
				finder.goto('devices', this_device_index+1);
				var root_id = Math.floor(finder.id);
				//debug('id is:', finder.id);
				for(var i=0;i<16;i++)
				{
					//drumPadCheck(TRANS[i], finder.id, {'index':i});
					var pad_num = TRANS[i];
					debug('checking drumpad:', i, pad_num);
					finder.id = Math.floor(root_id);
					finder.goto('drum_pads', pad_num);
					if(finder.id == 0)
					{
						post('drumpad', pad_num, 'cannot be found in adjacent device, aborting...');
						READY = false;
						break;
					}
					finder.id = Math.floor(root_id);
					finder.goto('chains', 0, 'devices', 0);
					var device_id = Math.floor(finder.id);
					if(finder.id == 0)
					{
						post('Cannot find device for drumpad', pad_num, ', aborting...');
						READY = false;
						break;
					}
					finder.goto('view');
					if(finder.id == 0)
					{
						post('Cannot find device.view for drumpad', pad_num, ', aborting...');
						READY = false;
						break;
					}
					else
					{
						//debug('children:', finder.children);
						var children = finder.children;
						if(!inArray(children, 'selected_chain'))
						{
							post('Drumpad', pad_num, 'cannot lock to the selected_chain property, aborting...');
							READY = false;
							break;
						}
						finder.id = device_id;
						if(finder.get('parameters').filter(function(element){return element !== 'id';}).length<2)
						{
							post('Drumpad', pad_num, ' device is missing a suitable parameter to lock to for changing voices, aborting...');
							READY = false;
						}
					}
				}
			}
			else
			{
				post('No Adjacent DrumRack found.');
			}
		}
	}
	catch(error)
	{
		READY = false;
	}
	return READY;
}

function mod_callback(args)
{
	if((args[0]=='value')&&(args[1]!='bang'))
	{
		//debug('mod callback:', args);
		if(args[1] in script)
		{
			//debug(script[args[1]]);
			script[args[1]].apply(script, args.slice(2));
		}
		if(args[1]=='disconnect')
		{
			mod.restart.schedule(3000);
		}
	}
}

function alive(val)
{
	//Alive = val>0;
	initialize(val);
}

function initialize(val)
{
	if(val>0)
	{
		debug('drumchooser initialize.');
		setup_tasks();
		setup_translations();
		setup_colors();
		setup_patcher();
		setup_api();
    setup_dict();
		setup_controls();
		setup_device();
		setup_external_input();
		setup_gridGUI();
		setup_notifiers();
		setup_modes();
		setup_pset_id();
		test_stuff();
		deprivatize_script_functions(this);
		load_PreInitVars();
		tasks.addTask(init_selection, [], 2);
		//mod.SendDirect('Forward', 'reevaluate_device');
	}
}

function init_selection()
{
  Alive = true;
	drumMatrix.select_pad(drumMatrix._drumpads[12]);
}

function setup_tasks()
{
	script['tasks'] = new TaskServer(script, 300);
}

function setup_translations()
{}

function setup_colors()
{
	mod.Send( 'set_color_map', 'RGB', 0, 8, 16, 24, 32, 40, 48, 56, 64, 72);
	script['PALETTE'] = ROLI.PALETTE;
	script['colors'] = {OFF : 0, WHITE : 1, YELLOW : 2, CYAN : 3, MAGENTA : 4, RED : 5, GREEN : 6, BLUE : 7};
	script['PushColors'] = {OFF : 0, WHITE : 1, YELLOW : 2, CYAN : 3, MAGENTA : 4, RED : 5, GREEN : 6, BLUE : 7};
}

function setup_controls()
{
	//debug('setup controls!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');


	var make_grid_send_func = function()
	{
		var args = arrayfromargs(arguments);
		var func = function(value)
		{
			mod.Send(args[0], args[1], args[2], args[3], value);
			var COLOR = PALETTE[value<0?0:value];
			guiPads[args[2] + (args[3]*8)].message('bgcolor', COLOR[0], COLOR[1], COLOR[2], COLOR[3]);
			//miraPads[args[2] + (args[3]*8)].message('text', '');
		}
		return func;
	}

	var make_key_send_func = function()
	{
		var args = arrayfromargs(arguments);
		var func = function(value)
		{
			mod.Send(args[0], args[1], args[2], value);
			var COLOR = PALETTE[value<0?0:value];
			guiKeys[args[2]].message('bgcolor', COLOR[0], COLOR[1], COLOR[2], 1);
		}
		return func;
	}

	var make_key2_send_func = function()
	{
		var args = arrayfromargs(arguments);
		var func = function(value)
		{
			mod.Send(args[0], args[1], args[2], value);
			var COLOR = PALETTE[value<0?0:value];
			guiKeys2[args[2]].message('bgcolor', COLOR[0], COLOR[1], COLOR[2], 1);
		}
		return func;
	}

	script['GridControlRegistry'] = new ControlRegistry('GridRegistry');
	script['GridButtons'] = [];
	script['Grid'] = new GridClass(8, 8, 'Grid');
	for(var x=0;x<8;x++)
	{
		GridButtons[x] = [];
		for(var y=0;y<8;y++)
		{
			var id = x+(y*8);
			GridButtons[x][y] = new ButtonClass(id, 'Button_'+id, make_grid_send_func('grid', 'value', x, y));
			GridControlRegistry.register_control(id, GridButtons[x][y]);
			Grid.add_control(x, y, GridButtons[x][y]);
		}
	}

	script['KeyControlRegistry'] = new ControlRegistry('KeyRegistry');
	script['KeyButtons'] = [];
	for(var id=0;id<8;id++)
	{
		KeyButtons[id] = new ButtonClass(id, 'Key_'+id, make_key_send_func('key', 'value', id));
		KeyControlRegistry.register_control(id, KeyButtons[id]);
	}

	script['Key2ControlRegistry'] = new ControlRegistry('Key2Registry');
	script['Key2Buttons'] = [];
	for(var id=0;id<8;id++)
	{
		Key2Buttons[id] = new ButtonClass(id, 'Key2_'+id, make_key2_send_func('key2', 'value', id));
		Key2ControlRegistry.register_control(id, Key2Buttons[id]);
	}

  script['ExternalInputRegistry'] = new ControlRegistry('ExternalInputRegistry');
	script['ExternalInput'] = [];
	script['ExternalGrid'] = new GridClass(4, 4, 'ExternalGrid');
	for(var x=0;x<4;x++)
	{
		ExternalInput[x] = [];
		for(var y=0;y<4;y++)
		{
			var id = x+(y*4);
			ExternalInput[x][y] = new ButtonClass(id, 'ExternalInput_'+id, function(){});
			ExternalInputRegistry.register_control(TRANS[id], ExternalInput[x][y]);
			ExternalGrid.add_control(x, y, ExternalInput[x][y]);
		}
	}

	script['DialControlRegistry'] = new ControlRegistry('DialRegistry')
	script['DetentDial'] = new ControlClass(0, 'DetentDial', make_send_func('detent_dial', 'value'));
	DialControlRegistry.register_control(0, DetentDial);

	script['_grid'] = function(x, y, val){GridControlRegistry.receive(x+(y*8), val);}
	script['_key'] = function(x, val){KeyControlRegistry.receive(x, val);}
	script['_key2'] = function(x, val){Key2ControlRegistry.receive(x, val);}
	script['_detent_dial'] = function(val){DialControlRegistry.receive(0, val);}
  script['_external_in'] = function(x, val){ExternalInputRegistry.receive(x, val);}

  script['ModifierRegistry'] = new ControlRegistry('ModifierRegistry');
  script['SelectButton'] = new ButtonClass(0, 'SelectButton', function(){});
  ModifierRegistry.register_control(0, SelectButton);
  script['_select'] = function(val){ModifierRegistry.receive(0, val);}


	script['_gui_GridOutput'] = function(x, y, val){
		_grid(x, y, 100);
		_grid(x, y, 0);
	}
	script['_gui_KeyOutput'] = function(x, y, val){
		debug('_gui_KeyOutput', x, y, val)
		if(y){
			_key2(x, 100);
			_key2(x, 0);
		}
		else{
			_key(x, 100);
			_key(x, 0);
		}
	}
	script['_gui_ShiftOutput'] = _shift;
	script['_gui_AltOutput'] = _alt;

  //script['select_button'] = new ButtonClass(0, 'SelectButton', make_send_func('shift', 'value'));

}

function setup_patcher()
{
	script['makenote'] = this.patcher.getnamed('makenote');
	script['storage'] = this.patcher.getnamed('drumchooser_storage');
	script['pad_pattrs'] = new Array(16);
  script['dict_obj'] = this.patcher.getnamed('dict');
	script['MPD_Toggle_gui'] = this.patcher.getnamed('MPD_Toggle_gui');
	script['MPD_Gate'] = this.patcher.getnamed('MPD_Gate');
	for(var i=0;i<16;i++)
	{
		pad_pattrs[i] = this.patcher.getnamed('pad['+i+']');
	}
	for(var i = 0;i < 64;i++)
	{
		guiPads[i] = this.patcher.getnamed('grid_gui').subpatcher().getnamed('cell['+i+']');
	}
	for(var i = 0;i < 8;i++)
	{
		guiKeys[i] = this.patcher.getnamed('grid_gui').subpatcher().getnamed('key['+i+']');
		guiKeys2[i] = this.patcher.getnamed('grid_gui').subpatcher().getnamed('key2['+i+']');
	}
	guiShift = this.patcher.getnamed('grid_gui').subpatcher().getnamed('shift_toggle');
	guiAlt = this.patcher.getnamed('grid_gui').subpatcher().getnamed('alt_toggle');
}

function setup_api()
{}

function setup_dict()
{
  script['dict'] = new Dict(dict_obj.getattr('name'));
}

function setup_device()
{
	mod.Send('receive_device', 'set_mod_device_type', 'DrumChooser');
	mod.Send( 'receive_device', 'set_number_params', 8);
	detect_adjacent_drumrack();
	for(var dev_type in DRUMCHOOSER_BANKS)
	{
		for(var bank_num in DRUMCHOOSER_BANKS[dev_type])
		{
			mod.SendDirect('receive_device_proxy', 'set_bank_dict_entry', dev_type, bank_num, DRUMCHOOSER_BANKS[dev_type][bank_num]);
		}
		//mod.Send('receive_device_proxy', 'update_parameters');
	}
}

function setup_external_input()
{
	var callback = function(val)
	{
		debug('externalInput', val);
		MPD_Gate.message(externalInputToggle._value > 0);
		MPD_Toggle_gui.message('set', externalInputToggle._value > 0);
	}
	var current_toggle_state = MPD_Toggle_gui.getvalueof();
	script['externalInputToggle']=new ToggledParameter('External_Input_Toggle', {'callback':callback, 'onValue':4, 'offValue':0, 'value':current_toggle_state});

}

function setup_gridGUI()
{
	script['gridGUI_button']=this.patcher.getnamed('gridGUI_button');
	var obj = this.patcher.getnamed('grid_gui');
	var pcontrol = undefined;  //this.patcher.getnamed('gridGUI_pcontrol');
	var thispatcher = obj.subpatcher().getnamed('thispatcher');
	var window_position = obj.subpatcher().getnamed('window_position');
	script['gridGUI'] = new FloatingWindowModule('GridGUI', {'window_position':window_position, 'thispatcher':thispatcher, 'pcontrol':pcontrol, 'obj':obj, 'sizeX':373, 'sizeY':550, 'nominimize':true, 'nozoom':false, 'noclose':true, 'nogrow':true, 'notitle':false, 'float':true});
	script['gridGUI_close'] = function(val){
		gridGUI.close();
		gridGUI_button.message('set', 0);
	}
	gridGUI.lock();
	/*GUI = function(val){
		debug('_GUI:', val);
		val&&gridGUI.open()||gridGUI.close();
	}*/
	//gridGUI.open();
}

function setup_notifiers()
{

}

function setup_modes()
{
	if(drumMatrix!=undefined)
	{
		var main_Page = new Page('Main');
		main_Page.enter_mode = function()
		{
			drumMatrix.set_layer_buttons([Key2Buttons[4], Key2Buttons[5], Key2Buttons[6], Key2Buttons[7]]);
			drumMatrix.set_page_button(Key2Buttons[1]);
			drumMatrix.set_grid(Grid);
			drumMatrix.set_solo_button(Key2Buttons[2]);
			drumMatrix.set_mute_button(Key2Buttons[3]);
			drumMatrix._audition.set_control(Key2Buttons[0]);
			externalInputToggle.set_control(KeyButtons[7]);
      main_Page.set_shift_button(SelectButton);
		}
		main_Page.exit_mode = function()
		{
			drumMatrix.set_layer_buttons([undefined, undefined, undefined, undefined]);
			drumMatrix.set_page_button();
			drumMatrix.set_grid();
			drumMatrix.set_solo_button();
			drumMatrix._audition.set_control();
			main_Page.set_shift_button();
		}
		main_Page.update_mode = function()
		{
			debug('main_Page updated');
			if(main_Page._shift_button&&main_Page._shift_button.pressed())
			{
        debug('main_Page shifted');
        drumMatrix.set_external_grid(ExternalGrid);
			}
			else
			{
        debug('main_Page unshifted');
        drumMatrix.set_external_grid();
			}
		}
		main_Page._shiftValue = function(obj)
		{
			main_Page.update_mode();
		}


		main_modes = new PageStack(1, 'MainModes');
		main_modes.add_mode(0, main_Page);
		main_modes.change_mode(0, true);
	}
}

function callback()
{}

function make_send_func()
{
	var args = arrayfromargs(arguments);
	if(args.length == 4)
	{
		var func = function(value)
		{
			//debug('value:', args, value);
			//debug('args:', args, args instanceof Array);
			mod.Send(args[0], args[1], args[2], args[3], value);
		}
	}
	else
	{
		var func = function(value)
		{
			debug('value:', args, value);
			mod.Send(args[0], args[1], args[2], value);
		}
	}
	return func;
}

function make_gui_send_function(patcher_object, message_header)
{
	if(message_header.length == 2)
	{
		var func = function(value)
		{
			//value = value==undefined ? 0 : value;
			//var message = message_header.push(value);
			//debug('sending gui button:', 'header is:', message_header, 'value is:', value, 'message is:', [message_header[0], message_header[1], value]);
			//#message = message_header.concat([value]);
			patcher_object.message.apply(patcher_object, [message_header[0], message_header[1], value]);
		}
	}
	return func;
}

function test_stuff()
{
	//DetentDial.add_listener(function(obj){debug('detent_dial value:', obj._value);});
	//create_new_track();
}

function detect_adjacent_drumrack()
{
	if((!finder)||(!finder.id))
	{
		finder = new LiveAPI(callback, 'this_device');
		debug('this set id is', finder.id);
	}
	if(finder.id!==0)
	{
		finder.goto('this_device');
		this_device_id = Math.floor(finder.id);
		finder.goto('canonical_parent');
		trackView = new LiveAPI(viewCallback, 'live_set');
		trackView.id = Math.floor(finder.id);
		trackView.goto('view');
		//debug('devices:', finder.get('devices'));
		var device_ids = finder.get('devices').filter(function(element){return element !== 'id';})
		var this_device_index = device_ids.indexOf(this_device_id);
		if((this_device_index>-1)&&(device_ids[this_device_index+1]))
		{
			var drumpads = [];
			//debug('found drumrack....');
			finder.goto('devices', this_device_index+1);
			//debug('id is:', finder.id);
			for(var i=0;i<16;i++)
			{
				try
				{
					drumpads[i] = new DrumPad(TRANS[i], finder.id, {'index':i});
				}
				catch(error)
				{
					debug(error, ', couldnt make DrumPad', i, TRANS[i]);
					//debug('drumpad id is:',  drumpads[i]._apiDrumpad.id);
				}
			}
			drumMatrix = new DrumMatrix(Math.floor(finder.id), drumpads);
		}
		else
		{
			post('No Adjacent DrumRack found.');
		}
	}
}

function setup_pset_id()
{
	if((!name_listener)||(!name_listener.id))
	{
		name_listener = new LiveAPI(name_callback, 'live_set', 'this_device');
		debug('this set id is', name_listener.id);
		name_listener.property = 'name';
	}
	device_name = name_listener.get('name').toString().split(' ');
	for(var i in device_name)
	{
		if(startsWith(device_name[i], '@id:'))
		{
			pset_id = device_name[i].split('@id:')[1];
			debug('________pset_id is:', pset_id);
			break;
		}
	}
}

function name_callback(args)
{
	debug('name_listener cb:', args[0], args[1]);
	if((args[0]=='name')&&(args[1]!=device_name))
	{
		setup_pset_id();
	}
}

function viewCallback()
{}

function _recall()
{
	debug('recall_preset');
	for(var i in drumMatrix._drumpads)
	{
		drumMatrix._drumpads[i].load_preset_data();
	}
}

function _dc_pset(num, pset)
{
	debug('receive dc_pset', num, pset);
	if(num==pset_id)
	{
		debug('updating preset to:', pset);
		script.patcher.getnamed('preset_number').message(Math.floor(pset));
	}

}

function _pgm_in(val)
{
	debug('updating preset to:', val+1, 'via pgm_in');
	script.patcher.getnamed('preset_number').message(Math.floor(val+1));
}

function anything()
{
	var args = arrayfromargs(messagename, arguments);
	switch(args[0])
	{
		case 'dc_pset':
			PreInitVars.dc_pset = [args[1], args[2]];
			break;
		case 'pgm_in':
			PreInitVars.pgm = args[1];
			break;
	}
}

function load_PreInitVars()
{
	if(PreInitVars.dc_pset!=undefined)
	{
		_dc_pset(PreInitVars.dc_pset[0], PreInitVars.dc_pset[1]);
	}
	if(PreInitVars.pgm!=undefined)
	{
		_pgm_in(PreInitVars.pgm);
	}
}

function _alt(val)
{
	alted = val > 0;
	debug('alted:', alted);
}

function _shift(val)
{
	shifted = val > 0;
	debug('shifted:', shifted);
}

function _trig_samp_left(val)
{
    drumMatrix._selected_pad._selectors[drumMatrix._selected_pad._selectedLayer._value].decrease_value();
}

function _trig_samp_right(val)
{
    drumMatrix._selected_pad._selectors[drumMatrix._selected_pad._selectedLayer._value].increase_value();
}

function _MPD_Toggle(val)
{
	debug('_MPD_Toggle', val);
	externalInputToggle



	.receive(val);
}

function _GUI(val)
{
	debug('_GUI:', val);
	val&&gridGUI.open()||gridGUI.close();
}

function find_root_track_id(obj)
{
	debug('find_root_track_id', obj.id);
	if(obj.id > 0)
	{
		if(obj.type == 'Track')
		{
			//var name = (obj.get('name'));
			//return name;
			return obj.id;
		}
		else
		{
			obj.goto('canonical_parent');
			return find_root_track_id(obj);
		}
	}
	else
	{
		return -1;
	}
}

function selected_port_output(port_name)
{
	var selectedPortOutput = port_name;
	debug('selectedPortOutput', selectedPortOutput);
}

function _create_new_track()
{
	finder.goto('this_device');
	var device_name = finder.get('name');
	var root_track_id = find_root_track_id(finder);
	finder.id = Math.floor(root_track_id);
	var root_track_name = finder.get('name');
	debug('root track is:', root_track_name);

	finder.id = Math.floor(drumMatrix._DrumRack_id);
	var drumrack_name = finder.get('name');
	debug('drumrack_name is:', drumrack_name, finder.type);



	debug('create_new_track');
	finder.path = 'live_set';
	finder.call('create_midi_track');
	finder.goto('view', 'selected_track');
	finder.set('name', '@drumAlias:'+drumrack_name);
	var output_routings = finder.get('output_routings');
	debug('output_routings:', output_routings);

	var input_routings = finder.get('input_routings');
	debug('input_routings', input_routings);


	/*
	var available_sub_routings = finder.get('available_output_routing_channels');
	debug('output_sub_routings:', available_sub_routings[0].length, available_sub_routings[0]);
	for(var i in available_sub_routings[0]){
		debug(i, available_sub_routings[0][i]);
	}
	*/

	finder.set('current_output_routing', root_track_name);

	for(var i in input_routings){
		//debug('input_routings', i, ':', input_routings[i]);
		if(input_routings[i].indexOf('Drumchooser')>-1){
			finder.set('current_input_routing', input_routings[i]);
			break;
		}
	}
	//finder.set('current_input_routing', selectedPortOutput);

	//var sub_routings = finder.get('available_output_routing_channels');
	/*for(var i in sub_routings){
		debug('entry:', i, sub_routings[i])
		for(var j in sub_routings[i]){
			debug('sub_entry:', j, sub_routings[i][j])
		}
	}*/

	var sub_routings = finder.get('output_sub_routings');
	debug('sub_routings:', sub_routings);

	finder.set('current_output_sub_routing', sub_routings[1]);
	//}
	ARM_NEW_TRACK_EXPLICITLY&&finder.set('arm', 1);
	debug('finished with create_new_track');
}

function DrumMatrix(drumrack_id, drumpads, args)
{
	this.add_bound_properties(this, ['_externalgrid', 'set_external_grid', 'set_grid', 'update', 'grid_press', 'externalgrid_press', 'select_pad', 'set_layer_buttons', 'set_page_button', 'update_solo']);
	var self = this;
	this._drumpads = drumpads;
	this._drumgrid = new GridClass(4, 4, 'DrumGrid');
	this._layergrid = new GridClass(4, 1, 'LayerGrid');
	this._grid = undefined;
  this._externalgrid = undefined;
	this._layer_buttons = undefined;
	this._page_button = undefined;
	this._selected_pad = this._drumpads[12];
	DrumMatrix.super_.call(this, 'DrumMatrix', args);
	this._DrumRack_id = drumrack_id;
	this._apiDrumRack = new LiveAPI(this._apiDrumRackCallback.bind(this), 'live_set');
	this._apiDrumRack.id = Math.floor(drumrack_id);
	this._apiDrumRack.goto('view');
	this._audition = new ToggledParameter(this._name+'_AuditionButton', {'onValue':5, 'offValue':6, 'value':0});
	this._audition.set_target(this.update);
	this._mute = new ToggledParameter(this._name+'_MuteButton', {'onValue':10, 'offValue':11, 'value':0});
	this._mute.set_target(this.update);
	this._solo_button = undefined;
	this.select_pad(this._selected_pad);
	this._apiDrumRack.property = 'selected_drum_pad';
}

inherits(DrumMatrix, Bindable);

DrumMatrix.prototype._apiDrumRackCallback = function(args)
{
	//debug('_apiDrumRackCallback:', args);
	if(args[0] == 'selected_drum_pad')
	{
		debug('selected_drum_pad is:', args[1]);
	}
}

DrumMatrix.prototype.set_grid = function(grid)
{
	debug('DrumMatrix.set_grid:', grid);
	this._grid = grid;

	this.update();
}

DrumMatrix.prototype.set_external_grid = function(grid)
{
	debug('DrumMatrix.set_external_grid:', grid);
	this._externalgrid = grid;
	this.update();
}

DrumMatrix.prototype.update = function()
{
	for(var i in this._drumpads)
	{
		this._drumpads[i].set_control();
    this._drumpads[i].set_externalcontrol();
	}
	this._drumgrid.clear_buttons();
	this._layergrid.clear_buttons();
	this._selected_pad.set_sample_select_buttons();
	this._selected_pad._selectedLayer.set_controls();
	this._selected_pad.set_layer_mute_buttons();
	this._selected_pad.set_layer_select_buttons();
	this._selected_pad.set_page_button();
	this._selected_pad.set_solo_button();
	if(this._audition._value)
	{
		//debug('setting sample select buttons', this._grid);
		//this._solo.set_value(0);
		//this.update_solo();
		this._selected_pad.set_solo_button(this._solo_button);
		this._selected_pad.set_sample_select_buttons(this._grid);
		this._selected_pad.set_page_button(this._page_button);
		this._layergrid.add_control(0, 0, this._layer_buttons[0]);
		this._layergrid.add_control(1, 0, this._layer_buttons[1]);
		this._layergrid.add_control(2, 0, this._layer_buttons[2]);
		this._layergrid.add_control(3, 0, this._layer_buttons[3]);
		if(!this._mute._value)
		{
			this._selected_pad._selectedLayer.set_controls(this._layergrid);
		}
		else
		{
			this._selected_pad.set_layer_mute_buttons(this._layer_buttons);
		}
	}
	else
	{
		//this._solo.set_value(0);
		//this.update_solo()
		debug('setting drumgrid controls', this._drumgrid);
		if(this._grid)
		{
			this._drumgrid.sub_grid(this._grid, 0, 4, 4, 8);
			this._drumgrid.add_listener(this.grid_press);
		}
		var buttons = this._drumgrid.controls();
		for(var i in buttons)
		{
			this._drumpads[i].set_control(buttons[i]);
		}
		if(this._mute._value)
		{
			this._selected_pad.set_layer_mute_buttons(this._layer_buttons);
		}
		else
		{
			this._selected_pad.set_layer_select_buttons(this._layer_buttons);
		}
	}
  if(this._externalgrid)
  {
    debug('setting externalgrid', this._externalgrid)
    this._externalgrid.add_listener(this.externalgrid_press);
    /*var buttons = this._externalgrid.controls();
    for(var i in buttons)
    {
      this._drumpads[i].set_externalcontrol(buttons[i]);
    }*/
  }
}

DrumMatrix.prototype.externalgrid_press = function(obj)
{
	debug('externalgrid_press:', obj._name, obj._value);
	//if(obj._value){this.select_pad(obj);}
	if(obj._value)
	{
		var coords = this._externalgrid.button_coords(obj);
		debug('coords are:', coords);
		this.select_pad(this._drumpads[coords[0] + (coords[1]*4)]);
		this.update();
	}
}

DrumMatrix.prototype.grid_press = function(obj)
{
	debug('grid_press:', obj._name, obj._value);
	//if(obj._value){this.select_pad(obj);}
	if(obj._value)
	{
		var coords = this._drumgrid.button_coords(obj);
		debug('coords are:', coords);
		this.select_pad(this._drumpads[coords[0] + (coords[1]*4)]);
		this.update();
	}
}

DrumMatrix.prototype.select_pad = function(obj)
{
	//this._selected_pad._selectedLayer.remove_listener(this.
	debug('select_pad', obj._name);
	this._selected_pad = obj;
	for(var i in this._drumpads)
	{
		this._drumpads[i]._selected = obj == this._drumpads[i];
		this._drumpads[i].update_control();
		this._drumpads[i].update();
	}
	this._apiDrumRack.set('selected_drum_pad', 'id', Math.floor(this._selected_pad._apiDrumpad.id));

}

DrumMatrix.prototype.set_layer_buttons = function(buttons)
{
	this._layer_buttons = buttons;
}

DrumMatrix.prototype.set_page_button = function(button)
{
	this._page_button = button;
}

DrumMatrix.prototype.update_solo = function()
{
	//debug('update_solo', this._solo._value);
	for(var i in this._drumpads)
	{
		//this._drumpads[i]._solo_state = Math.floor(this._solo._value);
		this._drumpads[i].update_solo();
	}
}

DrumMatrix.prototype.set_solo_button = function(button)
{
	//this._solo.set_value(0);
	//this._selected_pad.solo_selected_layer(false);
	//this._solo.set_control(button);
	this._solo_button = button;
}

DrumMatrix.prototype.set_mute_button = function(button)
{
	this._mute.set_control(button);
}

DrumMatrix.prototype.set_mute_buttons = function(buttons)
{

}

DrumMatrix.prototype.set_select_buttons = function(buttons)
{

}



function DrumPad(num, root_id, args)
{
	//debug('making drumpad:', num, root_id);
	this.add_bound_properties(this, ['_listener', '_callback', '_Callback', 'update_control', 'set_sample_select_buttons', 'set_layer_mute_buttons', 'update_sample_select_buttons',
								'_selectors', '_mutes', 'audition_selected_sample', 'set_page_button', 'update_page_button', '_solo', 'set_solo_button',
								'update_preset_data', 'load_preset_data', 'set_externalcontrol', '_externalcontrol']);
	this._selected = false;
	this._selectedValue = 20;
	this._name = 'Drumpad'+num;
	this._note = num;
	this._solo_state = false;
	this._apiDrumpad = new LiveAPI(this._drumpad_callback.bind(this));
	this._apiDrumpad.id = Math.floor(root_id);
	this._apiDrumpad.goto('drum_pads', num);
  this._apiDrumpad.mode = 1;
  this._apiDrumpad.property = 'name';
	this._apiView = new LiveAPI(this._view_callback.bind(this));
	this._apiView.id = Math.floor(root_id)
	this._apiView.goto('chains', 0, 'devices', 0, 'view');
  this._apiView.mode = 1;
	this._apiView.property = 'selected_chain';
  this._chains = new LiveAPI(this._on_chains_changed);
  this._chains.id = Math.floor(root_id);
  this._chains.mode = 1;
  this._chains.property = 'chains';
	this._sample_select_buttons = undefined;
	this._page_button = undefined;
  this._externalcontrol = undefined;

	this._selectedLayer = new RadioComponent(this._name+'_SelectedLayer', 0, 3, 0, this.update.bind(this), 1, 127);

	this._solo = new ToggledParameter(this._name+'_SoloButton', {'onValue':7, 'offValue':3, 'value':0});
	this._solo.set_target(this.update_solo.bind(this));


	this._selectors = [];
	for(var i=0;i<4;i++)
	{
		this._selectors[i] = new PagedRadioComponent(this._name+'_Layer'+i+'_SampleSelector', 0, 127, 0, undefined, 35, 40, {'onValue2':4, 'offValue2':50, 'play_callback':this.audition_selected_sample.bind(this), 'parent_drumpad':this._apiDrumpad, 'parent':this});
		//this._selectors[i].set_target(this.audition_selected_sample.bind(this));
		this._selectors[i]._apiObj = new LiveAPI(function(args){if(args[0] == 'value'){this.set_value(args[1]);}}.bind(this._selectors[i]), 'live_set');
		this._selectors[i]._apiObj.id = Math.floor(this._apiDrumpad.id);
		this._selectors[i]._apiObj.goto('chains', 0, 'devices', 0, 'parameters', i+1);
		this._selectors[i]._apiObj.property = 'value';
    this._selectors[i].mode = 1;
	}
	this._mutes = [];
	for(var i=0;i<4;i++)
	{
		this._mutes[i] = new ToggledParameter(this._name+'_Layer'+i+'_Mute', {'onValue':1, 'offValue':2, 'apiAction':'mute'});
		this._mutes[i]._apiObj = new LiveAPI(function(args){if(args[0] == 'mute'){this.receive(args[1]);}}.bind(this._mutes[i]), 'live_set');
		this._mutes[i]._apiObj.id = Math.floor(this._apiDrumpad.id);
		this._mutes[i]._apiObj.goto('chains', 0, 'devices', 0, 'chains', i);
		this._mutes[i]._value = this._mutes[i]._apiObj.get('mute');
		this._mutes[i]._apiObj.property = 'mute';
    this._mutes[i].mode = 1;
	}
	this._solos = [];
	for(var i=0;i<4;i++)
	{
		this._solos[i] = new ToggledParameter(this._name+'_Layer'+i+'_Solo', {'onValue':1, 'offValue':2, 'apiAction':'solo'});
		this._solos[i]._apiObj = new LiveAPI(function(args){if(args[0] == 'solo'){this.receive(args[1]);}}.bind(this._solos[i]), 'live_set');
		this._solos[i]._apiObj.id = Math.floor(this._apiDrumpad.id);
		this._solos[i]._apiObj.goto('chains', 0, 'devices', 0, 'chains', i);
		this._solos[i]._value = this._solos[i]._apiObj.get('solo');
		this._solos[i]._apiObj.property = 'solo';
    this._solos[i].mode = 1;
	}
	this._devices = [];
	for(var i=0;i<4;i++)
	{
		this._devices[i] = new LiveAPI(function(){}.bind(this), 'live_set');
		this._devices[i].id = Math.floor(this._apiDrumpad.id);
		this._devices[i].goto('chains', 0, 'devices', 0, 'chains', i, 'devices', 0);
    this._devices[i].mode = 1;
	}
	args.onValue = 1;
	args.offValue = 127;
	args.value = 0;
	DrumPad.super_.call(this, this._name, args);

  this._favorites = dict.get('pads::pad_'+this._index);
  if(!this._favorites.length)
  {
    this._favorites = [];
  }
  //debug('faves:', this._favorites, this._favorites.length);

	this._preset = script.patcher.getnamed('pad['+this._index+']');
	for(var i=0;i<4;i++)
	{
		this._selectors[i].add_listener(this.update_preset_data.bind(this));
		this._mutes[i].add_listener(this.update_preset_data.bind(this));
	}
	this.load_preset_data();

}

inherits(DrumPad, MomentaryParameter);

DrumPad.prototype.set_externalcontrol = function(control)
{
	if (control instanceof(NotifierClass) || !control)
	{
		if(this._externalcontrol)
		{
			this._externalcontrol.remove_listener(this._Callback);
		}
		this._externalcontrol = control;
		if(this._externalcontrol)
		{
			this._externalcontrol.add_listener(this._Callback);
		}
	}
}

DrumPad.prototype._on_chains_changed = function(args)
{
  //debug('_on_chains_changed', args);
}

DrumPad.prototype.load_preset_data = function()
{
	var data = this._preset.getvalueof();
	//debug('index is:', this._index);
	//var data = script.patcher.getnamed('pad['+this._index+']').getvalueof();
	//debug(this._name, 'load_preset_data:', data);
	if(data.length == 8)
	{
		for(var i=0;i<4;i++)
		{
			//this._selectors[i].receive(data[i*2]);
			this._selectors[i]._apiObj.set('value', data[i*2]);
			//this._mutes[i].receive(data[(i*2)+1]);
			//debug('setting mute[',i,']:', Math.floor(data[(i*2)+1]));
			this._mutes[i]._apiObj.set('mute', Math.floor(data[(i*2)+1]));
		}
	}
}

DrumPad.prototype.update_preset_data = function()
{
	var data = [];
	for(var i=0;i<4;i++)
	{
		data.push(this._selectors[i]._value);
		data.push(this._mutes[i]._value);
	}
	//debug(this._name, 'update_preset_data', data);
	this._preset.setvalueof(data);
}

DrumPad.prototype.audition_selected_sample = function(obj)
{
	if(obj)
	{
		//debug('audition_selected_sample');
		outlet(0, this._note, obj._value);
	}
	else
	{
		makenote.message('list', this._note, OUTPUT_VELOCITY, NOTE_DURATION);
	}
}

DrumPad.prototype._drumpad_callback = function(args)
{
	//debug(this._name, '_drumpad_callback:', args);
  //introspect_object(this._apiDrumpad);
  if((args[0]=='name')&&(Alive))
  {
    //this.update();
    tasks.addTask(this.update.bind(this), [], 1);
  }

}

DrumPad.prototype._view_callback = function(args)
{
	//debug(this._name, '_view_callback', args);
}

DrumPad.prototype._Callback = function(obj)
{
	if(obj){outlet(0, this._note, obj._value ? OUTPUT_VELOCITY : 0);  this.receive(obj._value);}
}

DrumPad.prototype.update_control = function(){if(this._control){this._control.send(this._value ? this._onValue : this._selected ? this._selectedValue : this._offValue);}}

DrumPad.prototype.update = function(grid)
{
	this.update_sample_select_buttons();
	this.update_solo();
	if(this._selected)
	{

		//debug('id will be:', Math.floor(this._devices[this._selectedLayer._value].id));
		mod.Send( 'send_explicit', 'receive_device_proxy', 'set_mod_device_parent', 'id',  Math.floor(this._devices[this._selectedLayer._value].id));
		mod.Send( 'push_name_display', 'value', 0, 'SelLayer');
		mod.Send( 'push_value_display', 'value', 0, this._selectedLayer._value);
		mod.Send( 'push_name_display', 'value', 2, 'DeviceName');
		mod.Send( 'push_value_display', 'value', 2, this._devices[this._selectedLayer._value].get('name'));

		//the idea here is to set the currently viewed device in Live's GUI to the selected Layer's device....however, it disrupts selection of the correct Parameters on Push
		//this._apiView.set('selected_chain', 'id', Math.floor(this._solos[this._selectedLayer._value]._apiObj.id));

		DetentDial.set_target(this._detent_dial_callback.bind(this));

		if(alted)
		{
			finder.path = 'live_set view';
			finder.call('select_device', 'id', Math.floor(this._devices[this._selectedLayer._value].id));
		}

		ACTIVATE_NEWLY_SELECTED_LAYER&&this._mutes[this._selectedLayer._value].receive(127);

		//if(trackView){trackView.set('selected_device', this._devices[this._selectedLayer._value]);}
		/*for(var i in this._apiView)
		{
			debug('INFO:', i);
		}
		debug('INFO:', this._apiView.info);
		*/
	}
}

DrumPad.prototype.set_sample_select_buttons = function(grid)
{
	debug('set_sample_select_buttons:', grid);
	this._sample_select_buttons = grid;
	this.update_sample_select_buttons.apply(this);
}

DrumPad.prototype.set_page_button = function(button)
{
	this._page_button = button;
	this.update_page_button.apply(this);
}

DrumPad.prototype.set_layer_mute_buttons = function(buttons)
{
	for(var i=0;i<4;i++)
	{
		this._mutes[i].set_control();
		if(buttons)
		{
			this._mutes[i].set_control(buttons[i]);
		}
	}
}

DrumPad.prototype.set_layer_select_buttons = function(buttons)
{
	this._selectedLayer.set_controls(buttons);
}

DrumPad.prototype.update_sample_select_buttons = function()
{
	for(var i=0;i<4;i++)
	{
		this._selectors[i].set_controls();
		//debug('selector:', i, this._selectors[i]);
	}
	//debug('sample select buttons:', this._sample_select_buttons);//, this._selectedLayer._value);
	this._selectors[this._selectedLayer._value].set_controls(this._sample_select_buttons);
}

DrumPad.prototype._detent_dial_callback = function(obj)
{
	//debug(this._name, '_detent_dial_callback', obj._value, this._selectedLayer._value);
	if(obj._value < 64)
	{
		if(!alted){
			this._selectors[this._selectedLayer._value].increase_value();
		}
		else{
			this._selectors[this._selectedLayer._value].next_favorite();
		}

	}
	else
	{
		if(!alted){
			this._selectors[this._selectedLayer._value].decrease_value();
		}
		else{
			this._selectors[this._selectedLayer._value].previous_favorite();
		}
	}
}

DrumPad.prototype.update_page_button = function()
{
	for(var i=0;i<4;i++)
	{
		this._selectors[i]._page_offset.set_control();
	}
	this._selectors[this._selectedLayer._value]._page_offset.set_control(this._page_button);
}

DrumPad.prototype.update_solo = function()
{
	//debug(this._name, 'update_solo, solo state is:', Boolean(this._solo_state));
	if(this._solo._value)
	{
		if(this._selected)
		{
			//debug(this._name, 'is selected:', Boolean(this._selected));
			for(var i in this._solos)
			{
				this._solos[i]._apiObj.set('solo', Math.floor(i==this._selectedLayer._value));
			}
		}
		else
		{
			for(var i in this._solos)
			{
				this._solos[i]._apiObj.set('solo', 0);
			}
		}
	}
	else
	{
		//debug(this._name, 'is selected:', Boolean(this._selected));
		{
			for(var i in this._solos)
			{
				this._solos[i]._apiObj.set('solo', 0);
			}
		}
	}
}

DrumPad.prototype.set_solo_button = function(button)
{
	this._solo.set_value(0);
	this._solo.set_control(button);
}



function PagedRadioComponent(name, minimum, maximum, initial, callback, onValue, offValue, args)
{
	this.add_bound_properties(this, ['next_favorite', 'previous_favorite', '_Callback', 'update_controls', '_page_offset_callback', 'increase_value', 'decrease_value', '_parent', '_faveValue', '_faveValue2', '_faveOffValue', '_faveOffValue2']);
  this._faveValue = 30;
  this._faveValue2 = 60;
  this._faveOffValue = 80;
  this._faveOffValue2 = 100;
  this._page_offset = new ToggledParameter(this._name + '_PageOffset', {'onValue':50, 'offValue':40, 'value':0})
	this._page_offset.set_target(this._page_offset_callback.bind(this));
	this._page_length = 64;
	this._play_callback = undefined;
	PagedRadioComponent.super_.call(this, name, minimum, maximum, initial, callback, onValue, offValue, args);
}

inherits(PagedRadioComponent, RadioComponent);

PagedRadioComponent.prototype._Callback = function(obj)
{
	if(this._play_callback)
	{
		this._play_callback(obj);
	}
	if(obj._value)
	{
		var val = this._buttons.indexOf(obj) + (this._page_offset._value*this._page_length);
    if(!alted)
    {
  		debug('PagedRadio:', obj, obj._value, val, this._page_offset._value, '*', this._page_length);
  		//this.set_value(val);
  		if(this._apiObj){this._apiObj.set('value', val);}
    }
    else
    {
      //debug('faves:', this._parent._favorites, this._parent._favorites.indexOf(val));
      if(this._parent._favorites.indexOf(val)>-1)
      {
        debug('in there, removing...', this._parent._favorites.indexOf(val));
        this._parent._favorites.splice(this._parent._favorites.indexOf(val), 1);
      }
      else
      {
        this._parent._favorites.push(val);
      }
      var pos = 'pads::pad_'+this._parent._index
      dict.replace(pos, this._parent._favorites);
      this.update_controls();
      //debug('faves:', this._parent._favorites);
    }
	}
}

PagedRadioComponent.prototype.update_controls = function()
{
  if(Alive)
  {
    var faves = this._parent._favorites;
    //debug('faves:', faves)
    var offset = Math.floor(this._page_offset._value*this._page_length);
  	for(var i in this._buttons)
  	{
  		if(this._buttons[i])
  		{
        var actual = parseInt(i) + offset;
        //debug('indexOf:', actual, faves.indexOf(actual));
        if(faves.indexOf(actual)>-1)
        {
          this._buttons[i].send((this._buttons.indexOf(this._buttons[i])+offset)==this._value ? this._page_offset._value ? this._faveValue2 : this._faveValue : this._page_offset._value ? this._faveOffValue2 : this._faveOffValue);
        }
        else
        {
          this._buttons[i].send((this._buttons.indexOf(this._buttons[i])+offset)==this._value ? this._page_offset._value ? this._onValue2 : this._onValue : this._page_offset._value ? this._offValue2 : this._offValue);
        }
  		}
  	}
  }
}

PagedRadioComponent.prototype._page_offset_callback = function(obj)
{
	this.update_controls();
}

PagedRadioComponent.prototype.increase_value = function()
{
	this.receive(this._value + 1);
	if(this._apiObj){this._apiObj.set('value', this._value);}
	if(this._play_callback)
	{
		this._play_callback();
	}
}

PagedRadioComponent.prototype.decrease_value = function()
{
	this.receive(this._value - 1);
	if(this._apiObj){this._apiObj.set('value', this._value);}
	if(this._play_callback)
	{
		this._play_callback();
	}
}

PagedRadioComponent.prototype.next_favorite = function()
{
	var cur_value = this._value;
	debug('next_favorite', cur_value);
	var faves = this._parent._favorites.sort(function(a, b){return a-b});
	debug('faves:', faves);
	if(faves.length>0)
	{
		var fave_index= faves.indexOf(cur_value);
		debug('fave_index:', fave_index);
		if(fave_index < 0){
			debug('fave_index < 0');
			var prev_closest_value = function(accum, val){
				debug('val:', val, 'accum:', accum, 'this._value:', cur_value);
				return val <= cur_value ? val : accum;
			}
			fave_index = faves.indexOf(faves.reduce(prev_closest_value, cur_value));
			debug('new fave_index:', fave_index);
		}
		var new_fave_index = Math.min(fave_index+1, faves.length-1);
		var new_val = faves[new_fave_index];
		debug('new_fave_index:', new_fave_index, 'new_val:', new_val);

		this.receive(new_val);
		if(this._apiObj){this._apiObj.set('value', this._value);}
		if(this._play_callback)
		{
			this._play_callback();
		}
	}
}

PagedRadioComponent.prototype.previous_favorite = function()
{
	var cur_value = this._value;
	debug('previous_favorite', cur_value);
	var faves = this._parent._favorites.sort(function(a, b){return a-b});
	debug('faves:', faves);
	if(faves.length>0)
	{
		var fave_index= faves.indexOf(cur_value);
		debug('fave_index:', fave_index);
		if(fave_index < 0){
			debug('fave_index < 0');
			var next_closest_value = function(accum, val){
				debug('val:', val, 'accum:', accum, 'this._value:', cur_value);
				return val >= cur_value ? val : accum;
			}
			fave_index = faves.indexOf(faves.reduceRight(next_closest_value, cur_value));
			debug('new fave_index:', fave_index);
		}
		var new_fave_index = Math.max(fave_index-1, 0);
		var new_val = faves[new_fave_index];
		debug('new_fave_index:', new_fave_index, 'new_val:', new_val);

		this.receive(new_val);
		if(this._apiObj){this._apiObj.set('value', this._value);}
		if(this._play_callback)
		{
			this._play_callback();
		}
	}
}

function SpecialToggledParameter(name, args)
{
	this.add_bound_properties(this, ['solo']);
	//this._pre_solo_value = true;
	SpecialToggledParameter.super_.call(this, name, args);
}

inherits(SpecialToggledParameter, ToggledParameter);

ToggledParameter.prototype.solo = function(solo_bool, layer_bool)
{
	if(solo_bool)
	{
		this._pre_solo_value = Math.floor(this._value);
		//this.receive(layer_bool*1);
		if(this._apiObj)
		{
			this._apiObj.set(this._apiAction, Math.floor(layer_bool));
		}
	}
	else
	{
		//this.receive(this._pre_solo_value);
		if(this._apiObj)
		{
			this._apiObj.set(this._apiAction, Math.floor(this._pre_solo_value));
		}
	}
}

ToggledParameter.prototype.unnsolo = function()
{
	if(this._apiObj)
	{
		this._apiObj.set(this._apiAction, Math.floor(this._pre_solo_value));
	}
}



forceload(this);
