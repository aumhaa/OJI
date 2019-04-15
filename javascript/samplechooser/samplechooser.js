autowatch = 1;

inlets = 1;
outlets = 1;

var script = this;
script._name = jsarguments[0];

var uid = jsarguments[1];
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
var compatible_relays = [];
var check_relays = false;
var drumrack_output_note = 0;
var drumrack_input_note = 0;

var Alive = false;

var colors = {OFF : 0, WHITE : 1, YELLOW : 2, CYAN : 3, MAGENTA : 4, RED : 5, GREEN : 6, BLUE : 7};
var PushColors = {OFF : 0, WHITE : 1, YELLOW : 2, CYAN : 3, MAGENTA : 4, RED : 5, GREEN : 6, BLUE : 7};

var AUDITION_NOTE = 60;
var AUTODETECT_PARENT_DEVICE_INSTEAD_OF_NEXT_DEVICE = true;
var USE_RELAY_FOR_AUDITION = true;

var DEVICE_TYPES = ['InstrumentGroupDevice','DrumGroupDevice','MidiEffectGroupDevice','Operator','UltraAnalog','OriginalSimpler','MultiSampler','LoungeLizard','StringStudio','Collision','InstrumentImpulse','NoDevice'];
var DRUMCHOOSER_BANKS = {};
for(var i in DEVICE_TYPES){
	DRUMCHOOSER_BANKS[DEVICE_TYPES[i]] = [['Transpose', 'Mod_Chain_Vol', 'Filter Freq', 'Filter Res', 'Shaper Amt', 'Filter Type', 'Ve Release', 'Detune']];
}

function anything(){
	debug('anything:', messagename, arrayfromargs(arguments));
}

function note_in(){}

function init(){
	debug('init', script._name);
	mod = new ModProxy(script, ['Send', 'SendDirect', 'restart']);
	found_mod = new Mod(script, 'skin', unique, false);
	//mod.debug = debug;
	mod_finder = new LiveAPI(mod_callback, 'this_device');
	found_mod.assign_api(mod_finder);

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

	update_background();

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

function setup_components(){
	script['layerChooser'] = new PagedRadioComponent('LayerChooser', 0, 128, 0, undefined, 1, 11, {'play_callback':audition});
	script['rackDevice'] = new RackDevice('RackDevice');
	rackDevice.set_layerChooser(layerChooser);
	layerChooser.set_target(rackDevice.set_parameter_value);
	script['apiUtil'] = new APIUtility();
	var drumrack = apiUtil.container_from_id(apiUtil.container_from_id(apiUtil.container_id));
	drumrack_output_note = apiUtil.drum_output_note_from_drumchain(drumrack);
	drumrack_input_note = apiUtil.drum_input_note_from_drumchain(drumrack);
	debug('id:', drumrack, apiUtil.name_from_id(drumrack));
	debug('drumrack_input_note', drumrack_input_note);
}

function setup_device(){
	mod.Send('receive_device', 'set_mod_device_type', 'DrumChooser');
	mod.Send( 'receive_device', 'set_number_params', 8);
	//detect_adjacent_drumrack();
	for(var dev_type in DRUMCHOOSER_BANKS)
	{
		for(var bank_num in DRUMCHOOSER_BANKS[dev_type])
		{
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
		layerChooser._page_offset.set_control(KeyButtons[7]);
		//layerChooser._detentDialValue.set_control(DetentDial);
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
	debug('track id:', track_id());
}

function setup_storage(){}

function setup_global_link(){
	debug('setup_global_link');
	var glob = aumhaaGlobal.sampleChooser;
	if(!glob.chooser_list){
		glob.chooser_list = {};
	}
	glob.chooser_list[unique] = script;
	debug('done with link');
	detect_compatible_relays();
}

function setup_tests(){
  //introspect_global();
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
	}
	else{
		rackDevice.detect_next_device_in_track();
	}
}

function audition(obj){
	if(obj){
		obj._value&&audition_destination(AUDITION_NOTE, 127, '4n');
	}
	else{
		audition_destination(AUDITION_NOTE, 127, '4n');
	}
}

function audition_destination(note, velocity, duration){
	if(USE_RELAY_FOR_AUDITION){
		if(check_relays){
			detect_compatible_relays();
		}
		for(var i in compatible_relays){
			var address = compatible_relays[i]+'audition_signal';
			messnamed(address, drumrack_input_note, 127, duration);
		}
	}
	else{
		outlet(0, note, velocity, duration);
	}
}

function _Audition(val){
	//debug('Audition', val);
	if(val){
		audition({'_value':1});
	}
	audition_button.message('set', 0);
}

function _Inc(val){
	if(val){
		//layer.message(layer.getvalueof()+1);
		layerChooser.increase_value();
	}
	inc_button.message('set', 0);
}

function _Dec(val){
	if(val){
		//layer.message(layer.getvalueof()-1);
		layerChooser.decrease_value();
	}
	dec_button.message('set', 0);
}

function _Favorite(val){
	if(val){
		layerChooser.toggle_favorite_status(layerChooser._value);
	}
	favorite_button.message('set', 0);
}

function update_background(){

	background_panel.message('bgfillcolor', layerChooser.is_favorite(layerChooser._value) ? [.5, 0, 0] : [.4, .4, .4]);
}



function PagedRadioComponent(name, minimum, maximum, initial, callback, onValue, offValue, args){
	this._faveValue = 30;
  this._faveValue2 = 60;
  this._faveOffValue = 80;
  this._faveOffValue2 = 100;
	this._onValue2 = 1;
	this._offValue2 = 23;
  this._page_offset = new ToggledParameter(this._name + '_PageOffset', {'onValue':50, 'offValue':40, 'value':0})
	this._page_offset.set_target(this._page_offset_callback.bind(this));
	this._page_length = 64;
	this._play_callback = undefined;
	this.activeLayer = new RangedParameter('activeLayer', 128);
	this.activeLayer.set_target(this.activeLayer_callback.bind(this));
	this._rackDevice = undefined;
	this._detentDialValue = new ParameterClass(this._name + '_detentDial');
	this._detentDialValue.set_target(this._detent_dial_callback.bind(this));
	//this._favorites = dict.getkeys().indexof('favorites')>-1 ? dict.get('favorites') : [];
	this._favorites = [];
	this.add_bound_properties(this, ['_play_callback', '_detent_dial_callback', 'toggle_favorite_status', 'is_favorite', 'activeLayer', 'activeLayer_callback', 'next_favorite', 'previous_favorite', '_Callback', 'update_controls', '_page_offset_callback', 'increase_value', 'decrease_value', '_parent', '_faveValue', '_faveValue2', '_faveOffValue', '_faveOffValue2']);

	PagedRadioComponent.super_.call(this, name, minimum, maximum, initial, callback, onValue, offValue, args);

}

inherits(PagedRadioComponent, RadioComponent);

PagedRadioComponent.prototype.activeLayer_callback = function(obj){
	debug('activeLayer_callback', obj._value ? obj._value : 'no value attr', this._value, this._play_callback);
	var val = obj._value;
	if(val!=this._value){
		this.set_value(val);
		if(this._play_callback){
			this._play_callback({'_value':1});
		}
		//update_background();
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
  		debug('PagedRadio:', obj, obj._value, val, this._page_offset._value, '*', this._page_length);
  		this.set_value(val);
  		if(this._apiObj){this._apiObj.set('value', val);}
			debug('PagedRadio:', this._value);
			if(this._play_callback)
			{
				this._play_callback(obj);
			}
			rackDevice.update_controlled_parameters(this._value);
    }
    else
    {
			this.toggle_favorite_status(val);
    }
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
	//update_background();
}

PagedRadioComponent.prototype.update_controls = function(){
  var faves = this._favorites;
  //debug('faves:', faves)
  var offset = Math.floor(this._page_offset._value*this._page_length);
	for(var i in this._buttons)
	{
		if(this._buttons[i])
		{
      var actual = parseInt(i) + offset;
      //debug('indexOf:', actual, faves.indexOf(actual), 'this._value:', this._value);
      if(faves.indexOf(actual)>-1)
      {
				//debug('value to send:', ((this._buttons.indexOf(this._buttons[i])+offset)==this._value ? this._page_offset._value ? this._faveValue2 : this._faveValue : this._page_offset._value ? this._faveOffValue2 : this._faveOffValue));
        this._buttons[i].send((this._buttons.indexOf(this._buttons[i])+offset)==this._value ? this._page_offset._value ? this._faveValue2 : this._faveValue : this._page_offset._value ? this._faveOffValue2 : this._faveOffValue);
      }
      else
      {
				//debug('value to send:', (this._buttons.indexOf(this._buttons[i])+offset)==this._value ? this._page_offset._value ? this._onValue2 : this._onValue : this._page_offset._value ? this._offValue2 : this._offValue);
        this._buttons[i].send((this._buttons.indexOf(this._buttons[i])+offset)==this._value ? this._page_offset._value ? this._onValue2 : this._onValue : this._page_offset._value ? this._offValue2 : this._offValue);
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

		this.receive(new_val);
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

		this.receive(new_val);
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
	this.add_bound_properties(this, ['detect_containing_rack', 'get_device_in_chain', 'update_controlled_parameters', '_layerChooser', '_device_id', '_api_device', '_api_parameter', 'set_parameter_value', 'set_layerChooser', 'detect_next_device_in_track']);
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
			post('No Adjacent Rack Device found.');
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
		if(finder.get('can_have_chains')!=0){
			debug('found a container');
			this._api_device.id = Math.floor(finder.id);
			finder.goto('parameters', 1);
			this._api_parameter.id = Math.floor(finder.id);
			this._api_parameter.property = 'value';
			mod.Send( 'send_explicit', 'receive_device_proxy', 'set_mod_device_parent', 'id',  this._api_device.id);
		}
		else{
			post('No Containing Rack Device found.');
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
	debug('RackDevice.prototype.set_parameter_value:', obj._value);
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
	mod.Send( 'push_name_display', 'value', 0, 'SelLayer');
	mod.Send( 'push_name_display', 'value', 1, num);
	mod.Send( 'push_name_display', 'value', 2, 'DeviceName');
	mod.Send( 'push_name_display', 'value', 3, finder.get('name'));
}


function APIUtility(){
	var self = this;
	this.finder = new LiveAPI(function(){}, 'this_device');
	this.device_id = parseInt(this.finder.id);
	this.container_id = parseInt(this.container_from_id(this.device_id));
}

APIUtility.prototype.track_from_id = function(id){
	this.finder.id = id;
	var recurse = function(id){
		if(id == 0){
			return 0;
		}
		this.finder.goto('canonical_parent');
		if(this.finder.type=='Track'){
			return parseInt(this.finder.id);
		}
		else{
			return recurse(id);
		}
	}
	return recurse(id);
}

APIUtility.prototype.container_from_id = function(id){
	this.finder.id = id;
	this.finder.goto('canonical_parent');
	return parseInt(this.finder.id);
}

APIUtility.prototype.previous_device = function(track, device){
	var device_id = device;
	this.finder.id = device;
	this.finder.goto('canonical_parent');
	if(!(this.finder.type=='Chain')){
		//debug('container is track')
		this.finder.id = track;
	}
	var devices = this.finder.get('devices').filter(function(element){return element !== 'id';});
	var index = devices.indexOf(device_id);
	if(index > 0){
		device_id = devices[index-1];
	}
	return device_id
}

APIUtility.prototype.next_device = function(track, device){
	var device_id = device;
	this.finder.id = device;
	this.finder.goto('canonical_parent');
	if(!(this.finder.type=='Chain')){
		//debug('container is track')
		this.finder.id = track;
	}
	var devices = this.finder.get('devices').filter(function(element){return element !== 'id';});
	var index = devices.indexOf(device_id);
	if(index < (devices.length-1)){
		device_id = devices[index+1];
	}
	return device_id
}

APIUtility.prototype.device_name_from_id = function(id){
	var new_name = 'None';
	this.finder.id = parseInt(id);
	if(id > 0){
		new_name = this.finder.get('name').slice(0,40);
		/*var new_name = [];
		new_name.unshift(this.finder.get('name'));
		this.finder.goto('canonical_parent');
		//this._this.finder.goto('canonical_parent');
		new_name.unshift(' || ');
		new_name.unshift(this.finder.get('name'));
		new_name = new_name.join('');
		new_name = new_name.slice(0, 40);*/
	}
	return new_name;
}

APIUtility.prototype.container_name_from_id = function(id){
	var new_name = 'None';
	this.finder.id = parseInt(id);
	if(id > 0){
		var new_name = this.finder.get('name').slice(0, 40);
	}
	return new_name;
}

APIUtility.prototype.name_from_id = function(id){
	var new_name = 'None';
	this.finder.id = parseInt(id);
	if(id > 0){
		var new_name = this.finder.get('name').slice(0, 40);
	}
	return new_name;
}

APIUtility.prototype.device_input_from_id = function(id){
	if(id==this_device_id){
		this.finder.id = parseInt(container_id);
		var new_name = [':Track Input'];
		new_name.unshift(this.finder.get('name'));
		new_name = new_name.join('');
		new_name = new_name.slice(0, 40);
		return new_name;
	}
	else{
		return device_name_from_id(id);
	}
}

APIUtility.prototype.device_output_from_id = function(id){
	if(id==this.device_id){
		this.finder.id = parseInt(this.container_id);
		var new_name = [':Track Output'];
		new_name.unshift(this.finder.get('name'));
		new_name = new_name.join('');
		new_name = new_name.slice(0, 40);
		return new_name;
	}
	else{
		return device_name_from_id(id);
	}
}

APIUtility.prototype.drum_output_note_from_drumchain = function(id){
	var note = undefined;
	this.finder.id = id;
	if(this.finder.type=='DrumChain'){
		note = this.finder.get('out_note')
	}
	debug('drum_note_from_chain', finder.path, note);
	return note;
}

APIUtility.prototype.drum_input_note_from_drumchain = function(id){
	var note = undefined;
	var drumchain_id = id;
	this.finder.id = drumchain_id;
	if(this.finder.type=='DrumChain'){
		this.finder.goto('canonical_parent');
		var drumrack_id = parseInt(this.finder.id);
		for(var i=0;i<127;i++){
			this.finder.id = drumrack_id;
			this.finder.goto('drum_pads', i);
			var count = this.finder.getcount('chains');
			//debug('count', count);
			if(count){
				var chains = this.finder.get('chains').filter(function(element){return element !== 'id';});
				//debug('chains', chains, drumrack_id);
				var index = chains.indexOf(drumchain_id);
				if((index >-1)||(chains==drumchain_id)){
					//debug('found chain!');
					note = this.finder.get('note');
					break;
				}
			}
		}
	}
	//debug('drum_note_from_chain', note);
	return note;
}

//draft
APIUtility.is_container = function(id){
	finder.id = id;
	var type = finder.type;
	return ['Track', 'Chain', 'DrumChain', 'RackDevice', 'DrumPad'].indexOf(type)>-1;
}

//draft
APIUtility.chain_ids_from_parent = function(id){
	var ids = [];
	finder.id = id;
	if(finder.get('can_have_chains')){
		ids = finder.get('chains').filter(function(element){return element !== 'id';});
	}
	return ids;
}

//draft
APIUtility.device_ids_from_parent = function(id){
	var ids = [];
	finder.id = id;
	ids = finder.get('devices').filter(function(element){return element !== 'id';});
	return ids;
}




forceload(this);
