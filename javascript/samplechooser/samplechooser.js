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

var Alive = false;

var colors = {OFF : 0, WHITE : 1, YELLOW : 2, CYAN : 3, MAGENTA : 4, RED : 5, GREEN : 6, BLUE : 7};
var PushColors = {OFF : 0, WHITE : 1, YELLOW : 2, CYAN : 3, MAGENTA : 4, RED : 5, GREEN : 6, BLUE : 7};

var AUDITION_NOTE = 60;

function anything(){
	debug('anything:', messagename, arrayfromargs(arguments));
}

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
	setup_modes();
	setup_listeners();
	setup_storage();
	setup_global_link();
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
		KeysControlRegistry.register_control(id, KeyButtons[id]);
		Keys.add_control(id, 0, KeyButtons[id]);
	}

	script['_grid'] = function(x, y, val){GridControlRegistry.receive(x+(y*8), val);}
	script['_key'] = function(num, val){KeysControlRegistry.receive(num, val);}
	script['_shift'] = function(val){ShiftButton.receive(val);}
	script['_alt'] = function(val){AltButton.receive(val);}
	script['_IN_layer'] = function(val){LayerDial.receive(val);}
}

function setup_dict(){
	script['dict'] = new Dict(dict_obj.getattr('name'));
}

function setup_components(){
	layerChooser = new PagedRadioComponent('LayerChooser', 0, 64, 0, undefined, 1, 5, {'play_callback':audition});
	rackDevice = new RackDevice('RackDevice');
	rackDevice.set_layerChooser(layerChooser);
	layerChooser.set_target(rackDevice.set_parameter_value);
}

function setup_modes(){
	//Page 1:  mainPage
	script['mainPage'] = new Page('mainPage');
	mainPage.enter_mode = function()
	{
		debug('mainPage entered');
		layerChooser.set_controls(Grid);
		layerChooser.activeLayer.set_control(LayerDial);
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
	//layerChooser.add_listener(update_layerDial);
}

function setup_storage(){}

function setup_global_link(){}




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

function _redetect_adjacent_rack(){
	rackDevice.detect_next_device_in_track();
}

function audition(obj){
	debug('audition...');
	obj._value||outlet(0, AUDITION_NOTE, 127, '4n');
}




function PagedRadioComponent(name, minimum, maximum, initial, callback, onValue, offValue, args){
	this._faveValue = 30;
  this._faveValue2 = 60;
  this._faveOffValue = 80;
  this._faveOffValue2 = 100;
  this._page_offset = new ToggledParameter(this._name + '_PageOffset', {'onValue':50, 'offValue':40, 'value':0})
	this._page_offset.set_target(this._page_offset_callback.bind(this));
	this._page_length = 64;
	this._play_callback = undefined;
	this.activeLayer = new RangedParameter('activeLayer', 64);
	this.activeLayer.set_target(this.activeLayer_callback.bind(this));
	this._rackDevice = undefined;
	//this._favorites = dict.getkeys().indexof('favorites')>-1 ? dict.get('favorites') : [];
	this._favorites = [];
	this.add_bound_properties(this, ['activeLayer', 'activeLayer_callback', 'next_favorite', 'previous_favorite', '_Callback', 'update_controls', '_page_offset_callback', 'increase_value', 'decrease_value', '_parent', '_faveValue', '_faveValue2', '_faveOffValue', '_faveOffValue2']);

	PagedRadioComponent.super_.call(this, name, minimum, maximum, initial, callback, onValue, offValue, args);

}

inherits(PagedRadioComponent, RadioComponent);

PagedRadioComponent.prototype.activeLayer_callback = function(obj){
	var val = obj._value;
	if(val!=this._value){
		this.set_value(val);
		if(this._play_callback){
			this._play_callback({'value':0});
		}
	}
}

PagedRadioComponent.prototype._Callback = function(obj){
	debug('PagedRadioComponent._Callback:', obj._name);
	if(this._play_callback)
	{
		this._play_callback(obj);
	}
	if(obj._value)
	{
		var val = this._buttons.indexOf(obj) + (this._page_offset._value*this._page_length);
    if(!AltButton.pressed())
    {
  		debug('PagedRadio:', obj, obj._value, val, this._page_offset._value, '*', this._page_length);
  		this.set_value(val);
  		if(this._apiObj){this._apiObj.set('value', val);}
			debug('PagedRadio:', this._value);
    }
    else
    {
      debug('faves:', this._favorites, this._favorites.indexOf(val));
      if(this._favorites.indexOf(val)>-1)
      {
        debug('in there, removing...', this._favorites.indexOf(val));
        this._favorites.splice(this._favorites.indexOf(val), 1);
      }
      else
      {
        this._favorites.push(val);
      }
      dict.replace('favorites', this._favorites);
      this.update_controls();
      //debug('faves:', this._parent._favorites);
    }
	}
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
	update_layerDial();

}

PagedRadioComponent.prototype._page_offset_callback = function(obj){
	this.update_controls();
}

PagedRadioComponent.prototype.increase_value = function(){
	this.receive(this._value + 1);
	if(this._apiObj){this._apiObj.set('value', this._value);}
	if(this._play_callback)
	{
		this._play_callback();
	}
}

PagedRadioComponent.prototype.decrease_value = function(){
	this.receive(this._value - 1);
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


function RackDevice(name, args){
	var self = this;
	this._device_id = 0;
	this._api_device = new LiveAPI(this._device_callback.bind(this), 'this_device');
	this._api_parameter = new LiveAPI(this._parameter_callback.bind(this), 'this_device');
	this._layerChooser = undefined;
	this.add_bound_properties(this, ['_layerChooser', '_device_id', '_api_device', '_api_parameter', 'set_parameter_value', 'set_layerChooser', 'detect_next_device_in_track']);
	RackDevice.super_.call(this, name, args);
	this._initialize();
}

inherits(RackDevice, Bindable);

RackDevice.prototype._initialize = function(){
	debug('RackMacro._initialize');
	this.detect_next_device_in_track();
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
			}
		}
		else{
			post('No Adjacent Rack Device found.');
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
forceload(this);
