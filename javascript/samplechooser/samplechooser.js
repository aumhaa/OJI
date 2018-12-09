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
	script['tasks'] = new TaskServer(script, 150);
}

function setup_translations(){}

function setup_colors(){}

function setup_patchers(){
	//this collects all named objects in the main patcher and makes them members of the root script
	find_patcher_objects(script, patcher, get_patcher_script_names(patcher));

	/*
	for(var i = 0;i < 64;i++)
	{
		pads[i] = new ZoneClass(i+1, this.patcher.getnamed('poly').subpatcher(i), 'Zone_'+i);
	}
	for(var i = 0;i < 64;i++)
	{
		miraPads[i] = this.patcher.getnamed('mira_grid').subpatcher().getnamed('cell['+i+']');
	}
	for(var i = 0;i < 8;i++)
	{
		miraKeys[i] = this.patcher.getnamed('mira_grid').subpatcher().getnamed('key['+i+']');
	}
	miraShift = this.patcher.getnamed('mira_grid').subpatcher().getnamed('shift');
	miraAlt = this.patcher.getnamed('mira_grid').subpatcher().getnamed('alt');
	*/

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
			grid[x][y] = new ButtonClass(x, y, id, 'Cell_'+id, make_send_func('grid', 'value', x, y));
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
	MainModes.mode_cycle_value.owner = MainModes;
	MainModes.add_mode(0, mainPage);
	//MainModes.set_mode_cycle_button();
}

function setup_listeners(){}

function setup_storage(){}

function setup_global_link(){}





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


forceload(this);
