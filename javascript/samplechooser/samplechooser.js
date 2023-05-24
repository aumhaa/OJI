//last edit 052323

autowatch = 1;

inlets = 1;
outlets = 1;

var script = this;
script._name = jsarguments[0];

var uid = jsarguments[1];
var unique = jsarguments[1];

aumhaa = require('_base');
var FORCELOAD = true;
var DEBUG = true;
var VIEW_DEVICEDICT = false;
aumhaa.init(this);

var APIUtility = require('aumhaa_LiveAPI_util').APIUtility;

var finder;
var mod;
var found_mod;
var mod_finder;
var Mod = ModComponent.bind(script);
var ModProxy = ModProxyComponent.bind(script);
var this_device_id = 0;

var USE_DEVICE = false;

var USE_GLOBAL_LINKING = false;
var INIT_GLOBAL = true;
var aumhaaGlobal = new Global('aumhaaGlobal');

if((!aumhaaGlobal.sampleChooser)||(INIT_GLOBAL)){
	debug('making sampleChooser global');
	aumhaaGlobal.sampleChooser = {};
}


var compatible_relays = [];
var check_relays = false;
var drumrack_output_note = 0;
var drumrack_input_note = 0;


var Alive = false;

var colors = {OFF : 0, WHITE : 1, YELLOW : 2, CYAN : 3, MAGENTA : 4, RED : 5, GREEN : 6, BLUE : 7};
var PushColors = {OFF : 0, WHITE : 1, YELLOW : 2, CYAN : 3, MAGENTA : 4, RED : 5, GREEN : 6, BLUE : 7};

var AUDITION_NOTE = 60;
var AUDITION_VELOCITY = 127;
var AUDITION_DURATION = 200;
var AUTODETECT_PARENT_DEVICE_INSTEAD_OF_NEXT_DEVICE = true;
var USE_RELAY_FOR_AUDITION = false;

var DEVICE_TYPES = ['InstrumentGroupDevice','DrumGroupDevice','MidiEffectGroupDevice','Operator','UltraAnalog','OriginalSimpler','MultiSampler','LoungeLizard','StringStudio','Collision','InstrumentImpulse','NoDevice','Other'];
var DRUMCHOOSER_BANKS = {};
for(var i in DEVICE_TYPES){
	DRUMCHOOSER_BANKS[DEVICE_TYPES[i]] = [['Transpose', 'Mod_Chain_Vol', 'Filter Freq', 'Filter Res', 'Shaper Amt', 'Filter Type', 'Ve Release', 'Detune']];
}

var DEFAULT_NAMES = [];
for(var i=0;i<128;i++){
	DEFAULT_NAMES.push(i);
}

function anything(){
	debug('anything:', messagename, arrayfromargs(arguments));
}

function note_in(){}

function init(){
	debug('init', script._name);
	mod = new ModProxy(script, ['Send', 'SendDirect', 'restart']);


	setup_tasks();
	setup_translations();
	setup_colors();
	setup_patchers();
	setup_controls();
	setup_dict();
	setup_editor();
	setup_components();
	setup_parameter_controls();
	if(USE_DEVICE){
		setup_device();
	}
	setup_modes();
	setup_listeners();
	setup_storage();
	if(USE_GLOBAL_LINKING){
		setup_global_link();
	}
	else{
		set_global_gate(1);
	}
	setup_tests();
	deprivatize_script_functions(script);

	update_background();

	found_mod = new Mod(script, 'samplechooser', unique, false);
	// found_mod.debug = debug;
	mod_finder = new LiveAPI(mod_callback, 'this_device');
	found_mod.assign_api(mod_finder);

	Alive = true;
}

function dissolve(){
	try{
		mod.restart.cancel();
	}
	catch(error){}
	if(USE_GLOBAL_LINKING){
		dissolve_global_link();
	}
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
	setup_device();
	_redetect_adjacent_rack();
	KeyButtons[0]._send_text('Fav');
	KeyButtons[2]._send_text('<-');
	KeyButtons[3]._send_text('->');
}

function setup_tasks(){
	script['tasks'] = new TaskServer(script, 100);
}

function setup_translations(){}

function setup_colors(){}

function setup_patchers(){
	//this collects all named objects in the main patcher and makes them members of the root script
	find_patcher_objects(script, this.patcher, get_patcher_script_names(this.patcher));
}

function setup_controls(){
	script['GridControlRegistry'] = new ControlRegistry('GridRegistry');
	script['KeysControlRegistry'] = new ControlRegistry('KeysRegistry');
	script['Keys2ControlRegistry'] = new ControlRegistry('Keys2Registry');
	script['grid'] = [];
	script['raw_grid'] = [];
	script['KeyButtons'] = [];
	script['Key2Buttons'] = [];
	script['Grid'] = new GridClass(8, 8, 'Grid');
	script['Keys'] = new GridClass(8, 1, 'Keys');
	script['Keys2'] = new GridClass(8, 1, 'Keys2');
	script['ShiftButton'] = new ButtonClass('shift', 'Shift', function(){});
	script['AltButton'] = new ButtonClass('alt', 'Alt', function(){});
	script['LayerDial'] = new GUI_Element('LayerDial'); // {'send':function(val){layer.message('set', val);} });
	var make_send_func = function()
	{
		var args = arrayfromargs(arguments);
		if(args.length == 4)
		{
			var func = function(value, suppress_block)
			{
				// (args[0]=='grid_text') && (debug('sending:', args[0], args[1], args[2], args[3], value));
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
			grid[x][y] = new ButtonClass(id, 'Cell_'+id, make_send_func('grid', 'value', x, y), {send_text:make_send_func('grid_text', 'value', x, y)});
			grid[x][y].add_bound_properties(grid[x][y], ['_send_text']);
			raw_grid.push(grid[x][y]);
			GridControlRegistry.register_control(id, grid[x][y]);
			Grid.add_control(x, y, grid[x][y]);
		}
	}

	for(var id=0;id<8;id++)
	{
		KeyButtons[id] = new ButtonClass(id, 'Key_'+id, make_send_func('key', 'value', id), {send_text:make_send_func('key_text', 'value', id)});
		Key2Buttons[id] = new ButtonClass(id, 'Key2_'+id, make_send_func('key2', 'value', id));
		KeysControlRegistry.register_control(id, KeyButtons[id]);
		Keys2ControlRegistry.register_control(id, Key2Buttons[id]);
		Keys.add_control(id, 0, KeyButtons[id]);
		Keys2.add_control(id, 0, Key2Buttons[id]);
	}

	//script['DetentDial'] = new ControlClass(0, 'DetentDial', {'_send':make_send_func('detent_dial', 'value')});


	script['_grid'] = function(x, y, val){GridControlRegistry.receive(x+(y*8), val);}
	script['_key'] = function(num, val){KeysControlRegistry.receive(num, val);}
	script['_key2'] = function(num, val){Keys2ControlRegistry.receive(num, val);}
	script['_shift'] = function(val){ShiftButton.receive(val);}
	script['_alt'] = function(val){AltButton.receive(val);}
	script['_IN_layer'] = function(val){LayerDial.receive(val);}
	//script['_detent_dial'] = function(val){DetentDial.receive(val);}
}

function setup_dict(){
	script['dict'] = new Dict(dict_obj.getattr('name'));
}

function setup_editor(){
	var obj = this.patcher.getnamed('editor');
	var pcontrol = this.patcher.getnamed('editor_pcontrol');
	var thispatcher = obj.subpatcher().getnamed('thispatcher');
	var window_position = obj.subpatcher().getnamed('window_position');
	//window_position = window_position.length ? window_position : [100, 100, 200, 400];
	//window_position = [100, 200, 200, 600];
	script['editorWindow'] = new EditorModule('Editor', {'window_position':window_position, 'thispatcher':thispatcher, 'pcontrol':pcontrol, 'obj':obj, 'sizeX':205, 'sizeY':420, 'nominimize':true, 'nozoom':false, 'noclose':true, 'nogrow':true, 'notitle':false, 'float':true});
	script['IN_editor'] = editorWindow.receive;
	editorWindow.lock();
	//editorWindow.open();
}

function setup_components(){
	var current_layer_value = layer.getvalueof();
	debug('current_layer_value', current_layer_value);
	script['layerChooser'] = new PagedRadioComponent('LayerChooser', 0, 128, current_layer_value, undefined, 1, 0, {'play_callback':audition});
	script['rackDevice'] = new RackDevice('RackDevice');
	rackDevice.set_layerChooser(layerChooser);
	layerChooser.set_target(rackDevice.set_parameter_value);
	//layerChooser.add_listener(update_cellblock_position);
	var finder = new LiveAPI(function(){}, 'this_device');
	script['apiUtil'] = new APIUtility(finder);
	var drumrack = apiUtil.container_from_id(apiUtil.container_from_id(apiUtil.container_id));
	drumrack_output_note = apiUtil.drum_output_note_from_drumchain(drumrack);
	drumrack_input_note = apiUtil.drum_input_note_from_drumchain(drumrack);
	script['favorite_toggle'] = new MomentaryParameter('FavoriteToggle');
	var favorite_callback = function(obj){
		_Favorite(obj._value);
	}
	favorite_toggle.set_target(favorite_callback);

	//messnamed(uid+'init', 'bang');
	//debug('just banged selected_device_patcher...');

	script['api_appointed_device'] = new LiveAPI(appointed_device_listener, 'live_set');
	api_appointed_device.property = 'appointed_device';

	//debug('id:', drumrack, apiUtil.name_from_id(drumrack));
	//debug('drumrack_input_note', drumrack_input_note);
}

function setup_parameter_controls(){
	//debug('making parameters');
	var obj = this.patcher.getnamed('parameter_controls');
	var pcontrol = this.patcher.getnamed('parameter_controls_pcontrol');
	var thispatcher = obj.subpatcher().getnamed('parameter_controls_thispatcher');
	var window_position = obj.subpatcher().getnamed('window_position');
	script['parameterWindow'] = new ParameterControlModule('ParameterControls', {'window_position':window_position, 'thispatcher':thispatcher, 'pcontrol':pcontrol, 'obj':obj, 'sizeX':500, 'sizeY':250, 'nominimize':true, 'nozoom':false, 'noclose':true, 'nogrow':true, 'notitle':false, 'float':true});
	script['IN_paramControl'] = parameterWindow.receive;
	script['lcd'] = parameterWindow._lcd;
	parameterWindow.lock();
	//parameterWindow.open();
}

function setup_device(){
	mod.Send('receive_device', 'set_mod_device_type', 'DrumChooser');
	mod.Send( 'receive_device', 'set_number_params', 16);
	//detect_adjacent_drumrack();
	debug('SETUP_DEVICE');
	for(var dev_type in DRUMCHOOSER_BANKS)
	{
		for(var bank_num in DRUMCHOOSER_BANKS[dev_type])
		{
			// debug('Sending bank:', dev_type, bank_num, DRUMCHOOSER_BANKS[dev_type][bank_num]);
			mod.SendDirect('receive_device_proxy', 'set_bank_dict_entry', dev_type, bank_num, DRUMCHOOSER_BANKS[dev_type][bank_num]);
		}
		//mod.Send('receive_device_proxy', 'update_parameters');
	}
}

function setup_modes(){
	//Page 1:  mainPage
	script['mainPage'] = new Page('mainPage');
	mainPage.enter_mode = function()
	{
		debug('mainPage entered');
		layerChooser.set_controls(Grid);
		layerChooser.activeLayer.set_control(LayerDial);
		layerChooser._page_offset.set_controls([KeyButtons[4], KeyButtons[5], KeyButtons[6], KeyButtons[7]]);
		layerChooser._nextButton.set_control(KeyButtons[3]);
		layerChooser._prevButton.set_control(KeyButtons[2]);
		favorite_toggle.set_control(KeyButtons[0]);
		KeyButtons[0]._send_text('Fav');  //this is also happening in initialize()
		KeyButtons[2]._send_text('<-');
		KeyButtons[3]._send_text('->');
		//layerChooser._detentDialValue.set_control(DetentDial);
	}
	mainPage.exit_mode = function()
	{
		layerChooser.set_controls();
		layerChooser.activeLayer.set_control();
		layerChooser._page_offset.set_controls();
		favorite_toggle.set_control();
		KeyButtons[0]._send_text('');
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
	//debug('track id:', track_id());
	// Grid.add_listener(function(x, y, val){debug('grid input:', x, y, val); });
}

function setup_storage(){}

function setup_global_link(){
	debug('setup_global_link');
	var glob = aumhaaGlobal.sampleChooser;
	if(!glob.chooser_list){
		glob.chooser_list = {};
	}
	glob.chooser_list[unique] = script;
	if(!glob.last_selected_instance){
		glob.last_selected_instance = 0;
	}
	debug('done with link');
	detect_compatible_relays();
}

function dissolve_global_link(){
	var glob = aumhaaGlobal.sampleChooser;
	try{
		delete glob.chooser_list[unique];
	}
	catch(e){
		report_error(e);
	}
	debug('chooser instance disolved');
}

//function dissolve_global_link(){}

function setup_tests(){
  //introspect_global();
	// layerChooser.update_controls();
	// debug("were setting the global_gate to 1 here in tests because some logic was removed due to new features of live and appointed device selection and consequently we disabled that portion of code which actually utilizes the global_gate");
	// set_global_gate(1);
}


function appointed_device_listener(args){
	debug('appointed_device_listener:', args);
	if((args[0]!='bang')&&(args[0]=='appointed_device')){
		if(args[2]==(this_device_id)){
			assign_last_selected_instance(args[2]);
		}
	}
}

//function appointed_device_listener(){}

function reevaluate_global_gate(){
	debug('gateLogic:', aumhaaGlobal.sampleChooser.last_selected, this_device_id);
	// set_global_gate(aumhaaGlobal.sampleChooser.last_selected == this_device_id ? 1 : 0);
	set_global_gate(aumhaaGlobal.sampleChooser.last_selected == this_device_id ? 1 : 1);
}

function assign_last_selected_instance(id){
	debug('assign_last_selected_instance:', id);
	var glob = aumhaaGlobal.sampleChooser;
	if(glob){
		if(glob.last_selected != id){
			glob.last_selected = id;
			for(var i in glob.chooser_list){
				glob.chooser_list[i].reevaluate_global_gate();
			}
		}
	}
}

function set_global_gate(val){
	debug('set_global_gate:', uid, val);
	global_gate.message(val);
}

function detect_compatible_relays(){
	//debug('detect_compatible_relays');
	check_relays = false;
	compatible_relays = [];
	var glob = aumhaaGlobal.sampleChooser;
	var this_track_id = track_id();
	for(var i in glob.relay_list){
		var id =  glob.relay_list[i];
		//debug('relay:', i, id);
		if(id==this_track_id){
				compatible_relays.push(i);
		}
	}
	//debug('compatible_relays:', compatible_relays)
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

function _detent_dial(val){
	layerChooser._detent_dial_callback({'_value':val})
}

function update_layerDial(){
	debug('update_layerDial', layer.getvalueof(), layerChooser._value);
	if(layer.getvalueof() != layerChooser._value){
		tasks.schedule(layerDial_update_callback, 'layerDial');
	}
}

function layerDial_update_callback(){
	debug('layerDial_update_callback');
	layer.message('set', layerChooser._value);
}

function set_audition_note(val){
	AUDITION_NOTE = Math.min(127, Math.max(0, val));
	audition({'_value':0});
}

function _redetect_adjacent_rack(){
	if(AUTODETECT_PARENT_DEVICE_INSTEAD_OF_NEXT_DEVICE){
		rackDevice.detect_containing_rack();
		rackDevice.detect_next_device_for_parameter_control();
	}
	else{
		rackDevice.detect_next_device_in_track();
	}
}

function audition(obj){
	if(obj){
		obj._value&&audition_destination(AUDITION_NOTE, AUDITION_VELOCITY, AUDITION_DURATION);
	}
	else{
		audition_destination(AUDITION_NOTE, AUDITION_VELOCITY, AUDITION_DURATION);
	}
}

function audition_destination(note, velocity, duration){
	if(USE_RELAY_FOR_AUDITION){
		if(check_relays){
			detect_compatible_relays();
		}
		for(var i in compatible_relays){
			var address = compatible_relays[i]+'audition_signal';
			messnamed(address, drumrack_input_note, velocity, duration);
		}
	}
	else{
		outlet(0, note, velocity, duration);
	}
}

function _Editor(val){
	if(val){
		editorWindow.open();
	}
	else{
		editorWindow.close();
	}
}

function _Parameters(val){
	if(val){
		parameterWindow.open();
	}
	else{
		parameterWindow.close();
	}
}

function _Audition(val){
	debug('Audition', val);
	if(val){
		audition({'_value':1});
	}
	audition_button.message('set', 0);
}

function _Inc(val){
	if(val){
		//layer.message(layer.getvalueof()+1);
		if(layerChooser.fave_skip._value){
			layerChooser.next_favorite();
		}
		else{
			layerChooser.increase_value();
		}
	}
	editorWindow.objs.inc_button.message('set', 0);
}

function _Dec(val){
	if(val){
		if(layerChooser.fave_skip._value){
			layerChooser.previous_favorite();
		}
		else{
			//layer.message(layer.getvalueof()-1);
			layerChooser.decrease_value();
		}
	}
	editorWindow.objs.dec_button.message('set', 0);
}

function _FaveInc(val){
	if(val){
		layerChooser.next_favorite();
	}
	editorWindow.objs.faveinc_button.message('set', 0);
}

function _FaveDec(val){
	if(val){
		layerChooser.previous_favorite();
	}
	editorWindow.objs.favedec_button.message('set', 0);
}

function _Favorite(val){
	debug('_Favorite:', val);
	if(val){
		layerChooser.toggle_favorite_status(layerChooser._value);
	}
	favorite_button.message('set', 0);
}

function _FaveSkip(val){
	layerChooser.fave_skip.set_value(val);
}

function update_background(){
	background_panel&&background_panel.message('bgfillcolor', layerChooser.is_favorite(layerChooser._value) ? [.5, 0, 0] : [.4, .4, .4]);
}


function _IN_textedit(){
	var args = arrayfromargs(arguments);
	debug('_IN_textedit', args);
	if(args[0]=='text'){
		var new_name = args.slice(1);
		debug('_IN_textedit', new_name);
		//cellblock.message('set', 0, layerChooser._value, new_name);
		layerChooser.set_current_name(new_name);
	}
}

function _IN_cellblock(){
	var args = arrayfromargs(arguments);
	debug('_IN_cellblock', args);
	if(args.length == 3){
		if(args[1]!=layerChooser._value){
			layerChooser.set_value(args[1]);
			audition({'_value':1});
		}
	}
}

function selected_device(val){
	//debug('selected_device:', val);
}


function auto_populate_names(){
	var names = [];

}


function PagedRadioComponent(name, minimum, maximum, initial, callback, onValue, offValue, args){
	this._faveValue = 5;
  this._faveValue1 = 5;
	this._faveValue2 = 5;
  this._faveValue3 = 5;
  this._faveOffValue = 4;
  this._faveOffValue1 = 4;
	this._faveOffValue2 = 4;
  this._faveOffValue3 = 4;
	this._onValue1 = 1;
	this._onValue2 = 1;
	this._onValue3 = 1;
	this._offValue1 = 0;
	this._offValue2 = 0;
	this._offValue3 = 0;
  // this._page_offset = new ToggledParameter(this._name + '_PageOffset', {'onValue':50, 'offValue':40, 'value':0});
	// this._page_offset.set_target(this._page_offset_callback.bind(this));
	// this._page_length = 64;
	this._page_offset = new RadioComponent(this._name + '_PageOffset', 0, 3, 0, undefined, 6, 1, {'onValue':6, 'offValue':1, 'value':0});
	this._page_offset.set_target(this._page_offset_callback.bind(this));
	this._page_length = 32;
  this.fave_skip = new ToggledParameter(this._name + '_FaveSkip', {'onValue':50, 'offValue':40, 'value':0});
	this._play_callback = undefined;
	this.activeLayer = new RangedParameter('activeLayer', 128);
	this.activeLayer.set_target(this.activeLayer_callback.bind(this));
	this.activeLayer.set_value()
	this._rackDevice = undefined;
	this._detentDialValue = new ParameterClass(this._name + '_detentDial');
	this._detentDialValue.set_target(this._detent_dial_callback.bind(this));
	this._nextButton = new MomentaryParameter(this._name + '_NextButton', {'onValue':1, 'offValue':0, 'value':0});
	this._nextButton.add_listener(function(obj){debug('next', obj._value);if(obj._value){this.increase_value();}}.bind(this));
	this._prevButton = new MomentaryParameter(this._name + '_PrevButton', {'onValue':1, 'offValue':0, 'value':0});
	this._prevButton.add_listener(function(obj){debug('prev', obj._value);if(obj._value){this.decrease_value();}}.bind(this));
	debug('keys:',dict.getkeys());
	debug('favorites:', dict.contains('favorites'));
	this._favorites = dict.contains('favorites') ? dict.get('favorites') : [];
	debug('favorites:', this._favorites);
	//this._favorites = this._favorites.length ? this._favorites : [];
	debug('names:', dict.contains('names'));
	this._names = dict.contains('names') ? dict.get('names') : DEFAULT_NAMES;
	debug('names are:', this._names);
	//this._names = this._names.length == 128 ? this._names : DEFAULT_NAMES;
	this.add_bound_properties(this, ['dependent_listener_callback',
	 																	'_names',
																		'store_names',
																		'set_current_name',
																		'update_names_display',
																		'_play_callback',
																		'_detent_dial_callback',
																		'toggle_favorite_status',
																		'is_favorite',
																		'activeLayer',
																		'activeLayer_callback',
																		'next_favorite',
																		'previous_favorite',
																		'_Callback',
																		'update_controls',
																		'_page_offset_callback',
																		'increase_value',
																		'decrease_value',
																		'_parent',
																		'_faveValue',
																		'_faveValue1',
																		'_faveOffValue',
																		'_faveOffValue1',
																		'_faveValue2',
																		'_faveValue3',
																		'_faveOffValue2',
																		'_faveOffValue3',
																		'_onValue1',
																		'_onValue2',
																		'_onValue3',
																		'_offValue1',
																		'_offValue2',
																		'_offValue3',
																		'_prevButton',
																		'_nextButton'
																	]);

	PagedRadioComponent.super_.call(this, name, minimum, maximum, initial, callback, onValue, offValue, args);
	this.add_listener(this.dependent_listener_callback);
	this.update_names_display();

}

inherits(PagedRadioComponent, RadioComponent);

PagedRadioComponent.prototype.dependent_listener_callback = function(obj){
		editorWindow.objs.cellblock.message('select', 0, obj._value);
		messnamed(unique+'cellblock_scroll', 'sync', 'click', 1, obj._value, 1, 1);
		editorWindow.objs.textedit.message('set', this._names[obj._value]);
		// rackDevice.update_controlled_parameters(this._value);
}

PagedRadioComponent.prototype.activeLayer_callback = function(obj){
	debug('activeLayer_callback', obj._value ? obj._value : 'no value attr', this._value, this._play_callback);
	var val = obj._value;
	if(val!=this._value){
		this.set_value(val);
		if(this._play_callback){
			this._play_callback({'_value':1});
		}
		//update_background();
		editorWindow.objs.cellblock.message('select', 0, this._value);
	}
}

PagedRadioComponent.prototype.is_favorite = function(num){
	return this._favorites.indexOf(num)>-1;
}

PagedRadioComponent.prototype._Callback = function(obj){
	debug('PagedRadioComponent._Callback:', obj._name);
	if(obj._value)
	{
		var val = this._buttons.indexOf(obj) + (this._page_offset._value*this._page_length);
    if(!AltButton.pressed())
    {
  		// debug('PagedRadio:', obj, obj._value, val, this._page_offset._value, '*', this._page_length);
  		this.set_value(val);
  		if(this._apiObj){this._apiObj.set('value', val);}
			// debug('PagedRadio:', this._value);
			if(this._play_callback)
			{
				this._play_callback(obj);
			}
    }
    else
    {
			this.toggle_favorite_status(val);
    }
	}
}

PagedRadioComponent.prototype.set_current_name = function(name){
	debug('PagedRadioComponent.prototype.set_current_name:', name);
	this._names[this._value] = name.join(' ');
	this.store_names();
	this.update_names_display();
}

PagedRadioComponent.prototype.store_names = function(){
	dict.replace('names', this._names);
	VIEW_DEVICEDICT&&dict_obj.message('wclose');
	VIEW_DEVICEDICT&&dict_obj.message('edit');
	this.update_controls();
}

PagedRadioComponent.prototype.update_names_display = function(){
	for(var i=0;i<this._names.length;i++){
		editorWindow.objs.cellblock.message('set', 0, i, this._names[i]);
		var fav = this.is_favorite(i);
		var bgcolor = fav ? [128, 0, 0] : [256, 256, 256];
		var fgcolor = fav ? [256, 256, 256] : [0, 0, 0];
		editorWindow.objs.cellblock.message('cell', 0, i, 'brgb', bgcolor);
		editorWindow.objs.cellblock.message('cell', 0, i, 'frgb', fgcolor);
		//grid.send_text((i%8), Math.floor(i/8), this._names[i]);
	}
}

PagedRadioComponent.prototype.toggle_favorite_status = function(num){
	//debug('faves:', this._favorites, this._favorites.indexOf(num));
	if(this._favorites.indexOf(num)>-1)
	{
		//debug('in there, removing...', this._favorites.indexOf(num));
		this._favorites.splice(this._favorites.indexOf(num), 1);
	}
	else
	{
		this._favorites.push(num);
	}
	dict.replace('favorites', this._favorites);
	this.update_controls();
	this.update_names_display();

	//update_background();
}

PagedRadioComponent.prototype.update_controls = function(){
  var faves = this._favorites;
  //debug('faves:', faves)
  var offset = Math.floor(this._page_offset._value*this._page_length);
	for(var i in this._page_offset._buttons){
		// debug('sending:', 'Page'+(i+1));
		var num = Math.floor(i)+1;
		this._page_offset._buttons[i]._send_text('Page '+num);
	}
	for(var i in this._buttons){
		if(this._buttons[i]){
			// debug('updating button:', i);

      var actual = parseInt(i) + offset;
			this._buttons[i]._send_text(this._names[actual]);
      //debug('indexOf:', actual, faves.indexOf(actual), 'this._value:', this._value);
			var is_selected = (this._buttons.indexOf(this._buttons[i])+offset)==this._value ;
      if(faves.indexOf(actual)>-1){
				//debug('value to send:', ((this._buttons.indexOf(this._buttons[i])+offset)==this._value ? this._page_offset._value ? this._faveValue2 : this._faveValue : this._page_offset._value ? this._faveOffValue2 : this._faveOffValue));
				// this._buttons[i].send((this._buttons.indexOf(this._buttons[i])+offset)==this._value ? this._page_offset._value ? this._faveValue2 : this._faveValue : this._page_offset._value ? this._faveOffValue2 : this._faveOffValue);
			  switch(this._page_offset._value){
					case 0:
						this._buttons[i].send(is_selected ? this._faveValue : this._faveOffValue);
						break;
					case 1:
						this._buttons[i].send(is_selected ? this._faveValue1 : this._faveOffValue1);
						break;
					case 2:
						this._buttons[i].send(is_selected ? this._faveValue2 : this._faveOffValue2);
						break;
					case 3:
						this._buttons[i].send(is_selected ? this._faveValue3 : this._faveOffValue3);
						break;
				}
			}
      else{
				//debug('value to send:', (this._buttons.indexOf(this._buttons[i])+offset)==this._value ? this._page_offset._value ? this._onValue2 : this._onValue : this._page_offset._value ? this._offValue2 : this._offValue);
        // this._buttons[i].send((this._buttons.indexOf(this._buttons[i])+offset)==this._value ? this._page_offset._value ? this._onValue2 : this._onValue : this._page_offset._value ? this._offValue2 : this._offValue);
				switch(this._page_offset._value){
					case 0:
						this._buttons[i].send(is_selected ? this._onValue : this._offValue);
						break;
					case 1:
						this._buttons[i].send(is_selected ? this._onValue1 : this._offValue1);
						break;
					case 2:
						this._buttons[i].send(is_selected ? this._onValue2 : this._offValue2);
						break;
					case 3:
						this._buttons[i].send(is_selected ? this._onValue3 : this._offValue3);
						break;
				}
      }
		}
	}
	update_layerDial();
	update_background();

}

PagedRadioComponent.prototype._page_offset_callback = function(obj){
	debug('offset:', this._page_offset._value);
	this.update_controls();
}

PagedRadioComponent.prototype.increase_value = function(){
	this.set_value(this._value + 1);
	if(this._apiObj){this._apiObj.set('value', this._value);}
	if(this._play_callback)
	{
		this._play_callback();
	}
}

PagedRadioComponent.prototype.decrease_value = function(){
	this.set_value(this._value - 1);
	if(this._apiObj){this._apiObj.set('value', this._value);}
	if(this._play_callback)
	{
		this._play_callback();
	}
}

PagedRadioComponent.prototype.next_favorite = function(){
	var cur_value = this._value;
	debug('next_favorite', cur_value);
	var faves = this._favorites.sort(function(a, b){return a-b});
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

		this.set_value(new_val);
		if(this._apiObj){this._apiObj.set('value', this._value);}
		if(this._play_callback)
		{
			this._play_callback();
		}
	}
}

PagedRadioComponent.prototype.previous_favorite = function(){
	var cur_value = this._value;
	debug('previous_favorite', cur_value);
	var faves = this._favorites.sort(function(a, b){return a-b});
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

		this.set_value(new_val);
		if(this._apiObj){this._apiObj.set('value', this._value);}
		if(this._play_callback)
		{
			this._play_callback();
		}
	}
}

PagedRadioComponent.prototype._detent_dial_callback = function(obj){
	debug(this._name, '_detent_dial_callback', obj._value);
	if(obj._value < 64)
	{
		if(!AltButton.pressed()){
			this.increase_value();
		}
		else{
			this.next_favorite();
		}

	}
	else
	{
		if(!AltButton.pressed()){
			this.decrease_value();
		}
		else{
			this.previous_favorite();
		}
	}
}



function RackDevice(name, args){
	var self = this;
	this._device_id = 0;
	this._api_device = new LiveAPI(this._device_callback.bind(this), 'this_device');
	this._api_parameter = new LiveAPI(this._parameter_callback.bind(this), 'this_device');
	this._layerChooser = undefined;
	this.add_bound_properties(this, ['detect_next_device_for_parameter_control', 'detect_containing_rack', 'get_device_in_chain', 'update_controlled_parameters', '_layerChooser', '_device_id', '_api_device', '_api_parameter', 'set_parameter_value', 'set_layerChooser', 'detect_next_device_in_track']);
	RackDevice.super_.call(this, name, args);
	this._initialize();
}

inherits(RackDevice, Bindable);

RackDevice.prototype._initialize = function(){
	debug('RackMacro._initialize');
	if(AUTODETECT_PARENT_DEVICE_INSTEAD_OF_NEXT_DEVICE){
		this.detect_containing_rack();
	}
	else{
		this.detect_next_device_in_track();
	}
}

RackDevice.prototype.detect_next_device_in_track = function(){
	if((!finder)||(!finder.id)){
		finder = new LiveAPI('this_device');
		debug('this set id is', finder.id);
	}
	if(finder.id!==0){
		finder.goto('this_device');
		this_device_id = Math.floor(finder.id);
		finder.goto('canonical_parent');
		debug('devices:', finder.get('devices'));
		var device_ids = finder.get('devices').filter(function(element){return element !== 'id';})
		var this_device_index = device_ids.indexOf(this_device_id);
		if((this_device_index>-1)&&(device_ids[this_device_index+1])){
			debug('found a device....');
			finder.goto('devices', this_device_index+1);
			// debug('type is:', finder.get('type'));
			if(finder.get('can_have_chains')!=0){
				debug('...and its a rack device');
				this._api_device.id = Math.floor(finder.id);
				finder.goto('parameters', 1);
				this._api_parameter.id = Math.floor(finder.id);
				this._api_parameter.property = 'value';
				mod.Send( 'send_explicit', 'receive_device_proxy', 'set_mod_device_parent', 'id',  this._api_device.id);
			}
		}
		else{
			this._api_parameter.id = 0;
			post('No Adjacent Rack Device found.');
		}
	}
}

RackDevice.prototype.detect_next_device_for_parameter_control = function(){
	debug('detect_next_device_for_parameter_control...');
	if((!finder)||(!finder.id)){
		finder = new LiveAPI('this_device');
		debug('this set id is', finder.id);
	}
	if(finder.id!==0){
		finder.goto('this_device');
		this_device_id = Math.floor(finder.id);
		finder.goto('canonical_parent');
		debug('devices:', finder.get('devices'));
		var device_ids = finder.get('devices').filter(function(element){return element !== 'id';})
		var this_device_index = device_ids.indexOf(this_device_id);
		if((this_device_index>-1)&&(device_ids[this_device_index+1])){
			debug('found a device....');
			finder.goto('devices', this_device_index+1);
			debug('sending dev id:', parseInt(finder.id));
			// mod.Send( 'send_explicit', 'receive_device_proxy', 'set_mod_device_parent', 'id',  parseInt(finder.id));
			mod.Send( 'send_explicit', 'receive_device_proxy', 'set_mod_device', 'id',  parseInt(finder.id));
		}
		else{
			post('No Adjacent Device found to control.');
		}
	}
}

RackDevice.prototype.detect_containing_rack = function(){
	if((!finder)||(!finder.id)){
		finder = new LiveAPI('this_device');
		debug('this set id is', finder.id);
	}
	if(finder.id!==0){
		finder.goto('this_device');
		this_device_id = Math.floor(finder.id);
		finder.goto('canonical_parent');
		finder.goto('canonical_parent');
		debug('type is:', finder.type);
		if((finder.type=="RackDevice")&&(finder.get('can_have_chains')!=0)){
			debug('found a container');
			this._api_device.id = Math.floor(finder.id);
			finder.goto('parameters', 1);
			this._api_parameter.id = Math.floor(finder.id);
			this._api_parameter.property = 'value';
			debug('finished with container...');

			//mod.Send( 'send_explicit', 'receive_device_proxy', 'set_mod_device_parent', 'id',  this._api_device.id);
		}
		else{
			post('No Containing Rack Device found.');
		}
		finder.id = this_device_id;
		finder.goto('canonical_parent');
		var device_ids = finder.get('devices').filter(function(element){return element !== 'id';})
		var this_device_index = device_ids.indexOf(this_device_id);
		if((this_device_index>-1)&&(device_ids[this_device_index+1])){
			debug('found a device....', device_ids[this_device_index+1]);
			//debug('sending dev id:', parseInt(finder.id));
			mod.Send( 'send_explicit', 'receive_device_proxy', 'set_mod_device_parent', 'id',  device_ids[this_device_index+1]);
		}
		else{
			post('No Adjacent Device found to control.');
		}
	}
}

RackDevice.prototype._device_callback = function(args){
	//debug('RackMacro._device_callback:', args);
}

RackDevice.prototype._parameter_callback = function(args){
	//debug('RackMacro._parameter_callback', args);
	if((args[0]=='value')&&(this._layerChooser!=undefined)&&(this._layerChooser._value!=args[1]))
	{
		this._layerChooser._value = args[1];
		this._layerChooser.update_controls();
	}
}

RackDevice.prototype.set_layerChooser = function(obj){
	this._layerChooser = obj;
}

RackDevice.prototype.set_parameter_value = function(obj){
	debug('RackDevice.prototype.set_parameter_value:', obj._value, this._api_parameter.id);
	if(this._api_parameter.id>0){
		this._api_parameter.set('value', obj._value);
	}
}

RackDevice.get_device_in_chain = function(num){
	debug('get_device_in_chain')
	//probably need to put some of the action from update_controlled_parameters() in here...

}

RackDevice.prototype.update_controlled_parameters = function(num){
	debug('update_controlled_parameters for chain:', num);
	//var device_id = this.get_device_in_chain(num);
	var id = -1;
	if(this._api_device.id){
		finder.id = Math.floor(this._api_device.id);
		var count = finder.getcount('chains');
		debug('chaincount is:', count);
		if(num<count){
			finder.goto('chains', num);
			id = Math.floor(finder.id);
		}
	}
	debug('id is:', id);
	mod.Send( 'send_explicit', 'receive_device_proxy', 'set_mod_device_chain', num);
	// mod.Send( 'push_name_display', 'value', 0, 'SelLayer');
	// mod.Send( 'push_name_display', 'value', 1, num);
	// mod.Send( 'push_name_display', 'value', 2, 'DeviceName');
	// mod.Send( 'push_name_display', 'value', 3, finder.get('name'));
	// KeyButtons[0]._send_text('SelLayer');
	// KeyButtons[1]._send_text(num);
	// KeyButtons[2]._send_text('DeviceName');
	// KeyButtons[3]._send_text(finder.get('name'));
}



function ParameterControlModule(name, args){
	//debug('making parameters');
	var self = this;
	this._controlsObjs = [];
	this._nameObjs = [];
	this._valueObjs = [];
	this._defs = [];
	this.add_bound_properties(this, ['_initialize', 'receive', 'controls', '_lcd']);
	ParameterControlModule.super_.call(this, name, args);
	this._initialize();
}

inherits(ParameterControlModule, FloatingWindowModule);

ParameterControlModule.prototype._initialize = function(){
	this._window_position = this._obj.subpatcher().getnamed('window_position');
	this._thispatcher = this._obj.subpatcher().getnamed('parameter_controls_thispatcher');
	var Encoders = ['Encoder_0', 'Encoder_1', 'Encoder_2', 'Encoder_3', 'Encoder_4', 'Encoder_5', 'Encoder_6', 'Encoder_7', 'Encoder_8', 'Encoder_9', 'Encoder_10', 'Encoder_11', 'Encoder_12', 'Encoder_13', 'Encoder_14', 'Encoder_15'];
	for(var i=0;i<16;i++){
		this._controlsObjs[Encoders[i]] = this._obj.subpatcher().getnamed('paramDial['+i+']');
		this._nameObjs[Encoders[i]] = this._obj.subpatcher().getnamed('name['+i+']');
		this._valueObjs[Encoders[i]] = this._obj.subpatcher().getnamed('value['+i+']');
	}
	this._nameObjs.device_name = this._obj.subpatcher().getnamed('device_name');
}

ParameterControlModule.prototype.receive = function(num, val){
	//debug(this._name, 'receive:', num, val);
	switch(num){
		case 'position':
			var args = arrayfromargs(arguments);
			//debug(this._name, 'setting window position:', args.slice(1));
			this._window_position.message('set', args.slice(1));
			break;
		case 'goto':
			//Device.hilight_current_device();
			break;
		case 'close':
			this.close();
			break;
		case 'float':
			//this.float();
			break;
		default:
			//debug('sending to params:', num, val);
			mod.Send('receive_device_proxy', 'set_mod_parameter_value', num, val);
			break;
	}
	/*
	if(num=='position'){
		var args = arrayfromargs(arguments);
		//debug(this._name, 'setting window position:', args.slice(1));
		this._window_position.message('set', args.slice(1));
	}
	else if(num=='goto'){
		//Device.hilight_current_device();
	}
	else{
		debug('sending to params:', num, val);
		mod.Send('receive_device_proxy', 'set_mod_parameter_value', num, val);
	}*/
}

ParameterControlModule.prototype._lcd = function(obj, type, val){
	//debug('lcd', obj, type, val, '\n');
	if((type=='lcd_name')&&(val!=undefined)){
		if(this._nameObjs[obj]){
			this._nameObjs[obj].message('set', val.replace(/_/g, ' '));
		}
	}
	else if((type == 'lcd_value')&&(val!=undefined)){
		if(this._valueObjs[obj]){
			this._valueObjs[obj].message('set', val.replace(/_/g, ' '));
		}
	}
	else if((type == 'encoder_value')&&(val!=undefined)){
		if(this._controlsObjs[obj]){
			this._controlsObjs[obj].message('set', val);
		}
	}
}


function EditorModule(name, args){
	//debug('making parameters');
	var self = this;
	this.add_bound_properties(this, ['_initialize', 'receive', 'objs']);
	EditorModule.super_.call(this, name, args);
	this.objs = {};
	find_patcher_objects(this.objs, this._obj.subpatcher(), get_patcher_script_names(this._obj.subpatcher()));
	this._initialize();
}

inherits(EditorModule, FloatingWindowModule);

EditorModule.prototype._initialize = function(){
	this._window_position = this._obj.subpatcher().getnamed('window_position');
	this._thispatcher = this._obj.subpatcher().getnamed('thispatcher');
}

EditorModule.prototype.receive = function(num, val){
	//debug(this._name, 'receive:', num, val);
	switch(num){
		case 'position':
			var args = arrayfromargs(arguments);
			//debug(this._name, 'setting window position:', args.slice(1));
			this._window_position.message('set', args.slice(1));
			break;
		case 'close':
			this.close();
			break;
		case 'float':
			//this.float();
			break;
		case 'IN_cellblock':
			var args = arrayfromargs(arguments);
			script._IN_cellblock.apply(script, args.slice(1));
			break;
		case 'IN_textedit':
			var args = arrayfromargs(arguments);
			script._IN_textedit.apply(script, args.slice(1));
			break;
		case 'set_audition_note':
			script.set_audition_note(val);
			break;
		case 'Inc':
			script._Inc(val);
			break;
		case 'Dec':
			script._Dec(val);
			break;
		case 'unlock':
			this.unlock();
			break;
		case 'populate':
			script.auto_populate_names();
			break;
		default:
			break;
	}
}




function Global_Proxy_Object(){

}



forceload(this);
