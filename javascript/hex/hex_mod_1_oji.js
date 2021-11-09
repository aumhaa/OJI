//Hexadecimal
//by amounra
//aumhaa@gmail.com --- http://www.aumhaa.com


/*
This patch is the evolution of the binary mod;  The majority of the functionality for the entire patch
can be modified in this js or the accompanying poly~ object, "steppr_wheel", without ever opening
the actual containing patch in the m4l editor (this was crucial for speeding up the development process).
Because of this, the functionality of the patch can be radically altered merely by modifying the
poly~ or adding some lines of code in to this js.  As an example, the poly~ used as the base for
this patch is only a slightly modified version of the "binary" mod (from Monomodular), and the
majority of processes in this script are maintained between both versions.
*/

/*
It should be noted that many of the processes used in "binary" are still available
yet unused in this script, offering some excellent prospects for the future
development of this mod.
*/

autowatch = 1;

outlets = 4;
inlets = 5;

aumhaa = require('_base');
var FORCELOAD = true;
var DEBUG = true;
aumhaa.init(this);

var util = require('aumhaa_util');
include('hex_tests');
include('hex_device_banks_new');
// var PresetComponent = require('aumhaa_preset_component').PresetComponent;

var NEW_DEBUG = false;
var DEBUG_LCD = false;
var DEBUG_PTR = false;
var DEBUG_STEP = false;
var DEBUG_BLINK = false;
var DEBUG_REC = false;
var DEBUG_LOCK = false;
var DEBUGANYTHING = false;
var SHOW_POLYSELECTOR = true;
var SHOW_STORAGE = false;
var MOD_DEBUG = false;

var newdebug = (NEW_DEBUG&&Debug) ? Debug : function(){};
var debuglcd = (DEBUG_LCD&&Debug) ? Debug : function(){};
var debugptr = (DEBUG_PTR&&Debug) ? Debug :function(){};
var debugstep = (DEBUG_STEP&&Debug) ? Debug : function(){};
var debugblink = (DEBUG_BLINK&&Debug) ? Debug : function(){};
var debugrec = (DEBUG_REC&&Debug) ? Debug : function(){};
var debuganything = (DEBUGANYTHING&&Debug) ? Debug : function(){};

var finder;
var mod;
var mod_finder;

var unique = jsarguments[1];

/*
This array contains the scripting names of objects in the top level patcher.
To include a new object to be addressed in this script, it's only necessary to
add its name to this array.  It can then be addressed as a direct variable.
*/
var Vars = ['poly', 'pipe', 'selected_filter', 'step', 'storepattr', 'storage',
	'preset_selector', 'padgui', 'padmodegui', 'keygui', 'keymodegui', 'repeatgui',
	'rotleftgui', 'rotrightgui', 'notevaluesgui', 'notetypegui', 'stepmodegui',
	'keymodeadv', 'Groove', 'Random', 'Channel', 'Mode', 'PolyOffset', 'BaseTime',
	'timeupgui', 'timedngui', 'pitchupgui', 'pitchdngui', 'transposegui', 'playgui',
	'recgui', 'directiongui', 'lockgui','lockgui', 'Speed','Speed1', 'Speed2', 'Speed3',
	'Speed4', 'Speed5', 'Speed6', 'Speed7', 'Speed8', 'Speed9', 'Speed10', 'Speed11',
	'Speed12', 'Speed13', 'Speed14', 'Speed15', 'Speed16','Adjust1', 'Adjust2', 'Adjust3',
	'Adjust4', 'Adjust5', 'Adjust6', 'Adjust7', 'Adjust8', 'Adjust9', 'Adjust10', 'Adjust11',
	'Adjust12', 'Adjust13', 'Adjust14', 'Adjust15', 'Adjust16', 'rotgate',
	'transport_change', 'midiout', 'BaseGross', 'BassFine', 'SpeedGross',
	'SpeedFine'];

/*
This array contains the scripting names of pattr-linked objects in each of the polys.
To include a new object to be addressed in the poly, it's only necessary to add
its name to this array.  It can then be addressed as part[poly number].obj[its scripting name].
*/

var Objs = {'pattern':{'Name':'pattern', 'Type':'list', 'pattr':'pattern'},
			'duration':{'Name':'duration', 'Type':'list', 'pattr':'duration'},
			'velocity':{'Name':'velocity', 'Type':'list', 'pattr':'velocity'},
			'note':{'Name':'note', 'Type':'list', 'pattr':'note'},
			'behavior':{'Name':'behavior', 'Type':'list', 'pattr':'behavior'},
			'rulebends':{'Name':'rulebends', 'Type':'list', 'pattr':'rulebends'},
			'mode':{'Name':'mode', 'Type':'int', 'pattr':'mode'},
			'polyenable':{'Name':'polyenable', 'Type':'int', 'pattr':'polyenable'},
			'swing':{'Name':'swing', 'Type':'float', 'pattr':'swingpattr'},
			'steps':{'Name':'steps', 'Type':'int', 'pattr':'stepspattr'},
			'channel':{'Name':'channel', 'Type':'int', 'pattr':'hidden'},
			'direction':{'Name':'direction', 'Type':'int', 'pattr':'directionpattr'},
			'nudge':{'Name':'nudge', 'Type':'int', 'pattr':'nudgepattr'},
			'noteoffset':{'Name':'noteoffset', 'Type':'int', 'pattr':'hidden'},
			'random':{'Name':'random', 'Type':'float', 'pattr':'randompattr'},
			'polyoffset':{'Name':'polyoffset', 'Type':'int', 'pattr':'polyoffsetpattr'},
			'repeatenable':{'Name':'repeatenable', 'Type':'int', 'pattr':'object'},
			'polyplay':{'Name':'polyplay', 'Type':'int', 'pattr':'object'},
			'notevalues':{'Name':'notevalues', 'Type':'int', 'pattr':'notevaluepattr'},
			'notetype':{'Name':'notetype', 'Type':'int', 'pattr':'notetypepattr'},
			'quantize':{'Name':'quantize', 'Type':'int', 'pattr':'hidden'},
			'active':{'Name':'active', 'Type':'int', 'pattr':'active'},
			'offset':{'Name':'offset', 'Type':'int', 'pattr':'hidden'},
			'addnote':{'Name':'addnote', 'Type':'int', 'pattr':'object'},
			'patterncoll':{'Name':'patterncoll', 'Type':'list', 'pattr':'object'},
			'last_trigger':{'Name':'last_trigger', 'Type':'bang', 'pattr':'object'},
			'clutch':{'Name':'clutch', 'Type':'int', 'pattr':'object'},
			'restart':{'Name':'restart', 'Type':'bang', 'pattr':'object'},
			'repeat':{'Name':'repeat', 'Type':'int', 'pattr':'hidden'},
			'restartcount':{'Name':'restartcount', 'Type':'int', 'pattr':'object'},
			'basetime':{'Name':'basetime', 'Type':'int', 'pattr':'basetimepattr'},
			'timedivisor':{'Name':'timedivisor', 'Type':'int', 'pattr':'timedivisorpattr'},
			'nexttime':{'Name':'nexttime', 'Type':'set', 'pattr':'object'},
			'behavior_enable':{'Name':'behavior_enable', 'Type':'int', 'pattr':'hidden'},
			'resync':{'Name':'resync', 'Type':'bang', 'pattr':'object'},
			};

/*			'phasor':{'Name':'phasor', 'Type':'float', 'pattr':'object'},
			'phasor_free':{'Name':'phasor_free', 'Type':'float', 'pattr':'object'},
			'ticks':{'Name':'ticks', 'Type':'float', 'pattr':'hidden'},
*/

var colors = util.colors;
var main_colors = {OFF : 0, WHITE : 1, CYAN : 2, MAGENTA : 3, RED : 4, BLUE : 5, YELLOW : 6, GREEN : 7};
var Modes=[4, 2, 3, 5, 1];
var RemotePModes=[0, 1, 4];
var Funcs = ['stepNote', 'stepVel', 'stepDur', 'stepExtra1', 'stepExtra2'];
var default_pattern = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var default_step_pattern = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var default_duration = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];
var default_note = [[1, 0, 0, 0, 0, 0, 0, 0],
	[1, 0, 0, 0, 0, 0, 0, 0],
	[1, 0, 0, 0, 0, 0, 0, 0],
	[1, 0, 0, 0, 0, 0, 0, 0],
	[1, 0, 0, 0, 0, 0, 0, 0],
	[1, 0, 0, 0, 0, 0, 0, 0],
	[1, 0, 0, 0, 0, 0, 0, 0],
	[1, 0, 0, 0, 0, 0, 0, 0],
	[1, 0, 0, 0, 0, 0, 0, 0],
	[1, 0, 0, 0, 0, 0, 0, 0],
	[1, 0, 0, 0, 0, 0, 0, 0],
	[1, 0, 0, 0, 0, 0, 0, 0],
	[1, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[1, 0, 0, 0, 0, 0, 0, 0],
	[1, 0, 0, 0, 0, 0, 0, 0]];
var default_velocity = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
var empty = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];
var modes = [[0, 2, 4, 5, 7, 9, 11, 12],
	[0, 2, 3, 5, 7, 9, 10, 12],
	[0, 1, 3, 5, 7, 8, 10, 12],
	[0, 2, 4, 6, 7, 9, 11, 12],
	[0, 2, 4, 5, 7, 9, 10, 12],
	[0, 2, 3, 5, 7, 8, 10, 12],
	[0, 1, 3, 5, 6, 8, 10, 12]];
var Colors = [0, 1, 2, 3, 4, 5, 6, 127];
var StepColors = [127, 3, 3, 3, 127, 3, 3, 3, 127, 3, 3, 3, 127, 3, 3, 3 ];
var SelectColors = [1, 5, 4, 6];
var AddColors = [5, 6];
var Blinks=[-1, 2];
var modColor = 5;
var TVEL_COLORS = [1,2,3,4];
var BEHAVE_COLORS = [0, 1, 2, 3, 4, 5, 6, 127];
var TIMES = {'1':0, '2':1, '4':2, '8':3, '16':4, '32':5, '64':6, '128':7};
var ACCENTS = [1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4];
var ACCENT_VALS = [63, 87, 111, 127];
var TRANS = {0:[[1, 1], [1, 2], [1, 4], [1, 8], [1, 16], [1, 32], [1, 64], [1, 128]],
				1:[[3, 2], [3, 4], [3, 8], [3, 16], [3, 32], [3, 64], [3, 128], [1, 128]],
				2:[[2, 3], [1, 3], [1, 6], [1, 12], [1, 24], [1, 48], [1, 96], [1, 128]]};
var ENC_COLORS = [5, 5, 127, 127, 6, 1, 2, 2];
var MODE_COLORS = [2, 5, 1, 3, 6, 4, 7, 2];


/*
Naming the js instance as script allows us to create scoped variables
(properties of js.this) without specifically declaring them with var
during the course of the session. This allows dynamic creation of
objects without worrying about declaring them beforehand as globals
presumably gc() should be able to do its job when the patch closes, or
if the variables are redclared.	 I'd love to know if this works the
way I think it does.
*/

var script = this;
var autoclip;

var part =[];

//var live_set;
//var song_tempo = 120;

var KEYMODES = ['mute', 'length', 'behaviour', 'single preset', 'global preset', 'polyrec', 'polyplay', 'accent'];
var PADMODES = ['select', 'add', 'mute', 'preset', 'global', 'freewheel', 'play'];
var STEPMODES = ['active', 'velocity', 'duration', 'rulebends', 'pitch'];
var GRIDMODES = ['hex', 'tr256', 'polygome', 'cafe', 'none', 'none', 'none', 'behaviour'];
var CODECMODES = ['velocity', 'duration', 'behaviour', 'pitch'];

var Alive=false;
var step_mode = 0;
var pad_mode = 0;
var key_mode = 0;
var grid_mode = 0;
var codec_mode = 0;
var solo_mode = 0;
var last_mode = 1;
var last_key_mode = 0;
var last_pad_mode = 0;
var locked = 0;
var shifted = false;
//var play_mode = 0;

var selected;
var presets = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
var devices = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var drumgroup_is_present = false;
var preset = 1;
var last_mask = 0;
var global_offset = 0;
var global_chain_offset = 0;
var pad_invoked_key_mode = 3;
var timing_immediate = 0;
var transpose_steps = 1;
var record_enabled = 0;
var play_enabled = 0;
var randomize_global = 0;
var last_blink = 0;
var rot_length = 16;
var step_value = [];
var key_pressed = -1;
var pad_pressed = -1;
var grid_pressed = -1;
var current_step = 0;
var autoclip;
var dirty = 0;
var keymodeenables = [0, 1, 2, 3, 4, 5, 6, 7];
var padmodeenables = [0, 1, 2, 3, 4, 5];

//new props
var sel_vel = 0;
var altVal = 0;
var ColNOTE = 1;
var RowNOTE = 2;
var curSteps = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var edit_preset = 1;
var btn_press1 = 0;
var btn_press2 = 0;
var last_mutes = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
var boing_pattern = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var Tvel = 2;
var rec_enabled = 0;
var behavegraph = [];
for(var i=0;i<7;i++){
	behavegraph[i]=[];
	for(var j=0;j<8;j++){
		behavegraph[i][j]=0;
	}
}

var current_rule = 0;
var handlers = [];
var codec_handler = false;

//var Protos = require('protos');
var ControlRegistry;
var GridButtons;
var KeyButtons;
var Grid;
var Keys;

/*
///////////////////////////////////////////
///// script initialization routines //////
///////////////////////////////////////////
*/

/*
VERY IMPORTANT!! : This code utilizes a naming convention for private functions:  any function
preceeded by an underscore is considered private, but will have a public function reference
assigned to it AFTER the script has received an initiallization call from mod.js.  That means that any
function that shouldn't be accessed before initialization can be created as a private function without
the need to use an internal testing routine to find out whether the script has init()ed.

Example:

If we create _private_function(), and before init a call from max comes in to private_function(), that call
will be funneled to anything().	 After init(), however, all calls to private_function() will be forwarded to
_private_function().

Note:  It is best to only address these private functions by their actual names in the script, since calling aliased
names will not be routed to anything().
*/

//var Mod = ModComponent.bind(script);
var Mod = ModComponent;
var ModProxy = ModProxyComponent

function init(){
	debug('hex init');
	mod = new ModProxy(script, ['Send', 'SendDirect', 'restart']);
	found_mod = new Mod(script, 'hex', unique, false);
	if(MOD_DEBUG){found_mod.debug = debug;}
	mod_finder = new LiveAPI(mod_callback, 'this_device');
	found_mod.assign_api(mod_finder);

	setup_translations();
	setup_colors();
	setup_patchers();
	setup_controls();
	setup_presets();
	setup_parts();
	setup_hex();
	setup_scales();
	init_device();
	setup_modes();
	setup_tests();
	deprivatize_script_functions(this);

	Alive = 1;
	clear_surface();


	storage.message('recall', 1);
	rotgate.message('int', 1);
	messnamed(unique+'ColNOTE', ColNOTE);
	messnamed(unique+'RowNOTE', RowNOTE);
	this.patcher.getnamed('polyselector').hidden = Math.abs(SHOW_POLYSELECTOR-1);
	if(SHOW_STORAGE){
		this.patcher.getnamed('storage').message('clientwindow');
		this.patcher.getnamed('storage').message('storagewindow');
	}
	post("Hex initialized.\n");
}

function mod_callback(args){
	if((args[0]=='value')&&(args[1]!='bang')){
		//debug('mod callback:', args);
		if(args[1] in script){
			//debug(script[args[1]]);
			script[args[1]].apply(script, args.slice(2));
		}
		if(args[1]=='disconnect'){
			mod.restart.schedule(3000);
		}
	}
}

function active_handlers(){
	handlers = arrayfromargs(arguments);
	codec_handler = false;
	for(var i in handlers){
		if(handlers[i]=='CodecModHandler'){
			codec_handler = true;
		}
	}
}

function alive(val){
	initialize(val);
}

//called when mod.js is finished loading for the first time
function initialize(val){
	if(val>0){
		mod = found_mod;
	}
}

function setup_translations(){
	//Notes
	/*Here we set up some translation assignments and send them to the Python ModClient.
	Each translation add_translation assignment has a name, a target, a group, and possibly some arguments.
	Translations can be enabled individually using their name/target combinations, or an entire group can be enabled en masse.
	There are not currently provisions to dynamically change translations or group assignments once they are made.*/

	/*Batch translations can be handled by creating alias controls with initial arguments so that when the batch command is sent
	the argument(s) precede the values being sent.	They are treated the same as the rest of the group regarding their
	enabled state, and calls will be ignored to them when they are disabled.  Thus, to send a column command to an address:
	'add_translation', 'alias_name', 'address', 'target_group', n.
	Then, to invoke this translation, we'd call:
	'receive_translation', 'alias_name', 'column', nn.
	This would cause all leds on the column[n] to be lit with color[nn].

	It's important to note that using batch_row/column calls will wrap to the next column/row, whereas column/row commands will
	only effect their actual physical row on the controller.*/

	//Ohm stuff:
	for(var i = 0;i < 16; i++){
		mod.Send( 'add_translation', 'pads_'+i, 'grid', 'ohm_pads', i%8, Math.floor(i/8));
		mod.Send( 'add_translation', 'keys_'+i, 'grid', 'ohm_keys', i%8, (i < 8 ? 2 : 3));
		mod.Send( 'add_translation', 'keys2_'+i, 'grid', 'ohm_keys2', i%8, (i < 8 ? 4 : 5));
	}
	mod.Send( 'add_translation', 'pads_batch', 'grid', 'ohm_pads', 0);
	mod.Send( 'add_translation', 'keys_batch', 'grid', 'ohm_keys', 2);
	mod.Send( 'add_translation', 'keys_batch_fold', 'grid', 'ohm_keys', 2, 8);
	mod.Send( 'add_translation', 'keys2_batch', 'grid', 'ohm_keys2', 4);
	mod.Send( 'add_translation', 'keys2_batch_fold', 'grid', 'ohm_keys2', 4, 8);
	for(var i=0;i<8;i++){
		mod.Send( 'add_translation', 'buttons_'+i, 'grid', 'ohm_buttons', i, 6);
		mod.Send( 'add_translation', 'extras_'+i, 'grid', 'ohm_extras', i, 7);
	}
	mod.Send( 'add_translation', 'buttons_batch', 'grid', 'ohm_buttons', 6);
	mod.Send( 'add_translation', 'extras_batch', 'grid', 'ohm_extras', 7);

	//Base stuff:
	for(var i = 0;i < 16;i++){
		mod.Send( 'add_translation', 'pads_'+i, 'base_grid', 'base_pads', i%8, Math.floor(i/8));
		mod.Send( 'add_translation', 'keys_'+i, 'base_grid', 'base_keys', i%8, Math.floor(i/8));
		mod.Send( 'add_translation', 'keys2_'+i, 'base_grid', 'base_keys2', i%8, Math.floor(i/8)+2);
	}
	mod.Send( 'add_translation', 'pads_batch', 'base_grid', 'base_pads', 0);
	mod.Send( 'add_translation', 'keys_batch', 'base_grid', 'base_keys', 0);
	mod.Send( 'add_translation', 'keys_batch_fold', 'base_grid', 'base_keys', 0, 8);
	mod.Send( 'add_translation', 'keys2_batch', 'base_grid', 'base_keys2', 2);
	mod.Send( 'add_translation', 'keys2_batch_fold', 'base_grid', 'base_keys2', 2, 8);
	mod.Send( 'enable_translation_group', 'base_keys', 0);

	for(var i=0;i<8;i++){
		mod.Send( 'add_translation', 'buttons_'+i, 'base_grid', 'base_buttons', i, 2);
		mod.Send( 'add_translation', 'extras_'+i, 'base_grid', 'base_extras', i, 3);
	}
	mod.Send( 'add_translation', 'buttons_batch', 'base_grid', 'base_buttons', 2);
	mod.Send( 'add_translation', 'extras_batch', 'base_grid', 'base_extras', 3);
	mod.Send( 'enable_translation_group', 'base_buttons', 0);
	mod.Send( 'enable_translation_group', 'base_extras',  0);

	//Code stuff:
	for(var i = 0;i < 16;i++){
		mod.Send( 'add_translation', 'pads_'+i, 'code_grid', 'code_pads', i%8, Math.floor(i/8));
		//mod.Send( 'add_translation', 'keys_'+i, 'code_grid', 'code_keys', i%8, Math.floor(i/8));
		mod.Send( 'add_translation', 'keys2_'+i, 'code_grid', 'code_keys2', i%8, Math.floor(i/8)+2);
	}
	mod.Send( 'add_translation', 'pads_batch', 'code_grid', 'code_pads', 0);
	//mod.Send( 'add_translation', 'keys_batch', 'code_grid', 'code_keys', 0);
	//mod.Send( 'add_translation', 'keys_batch_fold', 'code_grid', 'code_keys', 0, 8);
	mod.Send( 'add_translation', 'keys2_batch', 'code_grid', 'code_keys2', 2);
	mod.Send( 'add_translation', 'keys2_batch_fold', 'code_grid', 'code_keys', 2, 8);
	mod.Send( 'enable_translation_group', 'code_keys', 0);

	for(var i=0;i<8;i++){
		mod.Send( 'add_translation', 'buttons_'+i, 'code_grid', 'code_buttons', i, 2);
		mod.Send( 'add_translation', 'extras_'+i, 'code_grid', 'code_extras', i, 3);
	}
	mod.Send( 'add_translation', 'buttons_batch', 'code_grid', 'code_buttons', 2);
	mod.Send( 'add_translation', 'extras_batch', 'code_grid', 'code_extras', 3);
	mod.Send( 'enable_translation_group', 'code_buttons', 0);
	mod.Send( 'enable_translation_group', 'code_extras',  0);

	//CNTRLR stuff:
	for(var i = 0;i < 16;i++){
		mod.Send( 'add_translation', 'pads_'+i, 'cntrlr_grid', 'cntrlr_pads', i%4, Math.floor(i/4));
		mod.Send( 'add_translation', 'keys_'+i, 'cntrlr_key', 'cntrlr_keys', i, 0);
		mod.Send( 'add_translation', 'keys2_'+i, 'cntrlr_key', 'cntrlr_keys2', i, 1);
	}
	mod.Send( 'add_translation', 'pads_batch', 'cntrlr_grid', 'cntrlr_pads', 0);
	mod.Send( 'add_translation', 'keys_batch', 'cntrlr_key', 'cntrlr_keys', 0);
	mod.Send( 'add_translation', 'keys_batch_fold', 'cntrlr_key', 'cntrlr_keys', 0, 16);
	mod.Send( 'add_translation', 'keys2_batch', 'cntrlr_key', 'cntrlr_keys2', 1);
	mod.Send( 'add_translation', 'keys2_batch_fold', 'cntrlr_key', 'cntrlr_keys', 1, 16);
	for(var i=0;i<8;i++){
		mod.Send( 'add_translation', 'buttons_'+i, 'cntrlr_encoder_button_grid', 'cntrlr_buttons', i);
		mod.Send( 'add_translation', 'extras_'+i, 'cntrlr_encoder_button_grid', 'cntrlr_extras', i);
	}
	mod.Send( 'add_translation', 'buttons_batch', 'cntrlr_encoder_button_grid', 'cntrlr_buttons');
	mod.Send( 'add_translation', 'extras_batch', 'cntrlr_encoder_button_grid', 'cntrlr_extras');

}

function setup_colors(){
	mod.Send( 'fill_color_map', 'Monochrome', 0, 1, 1, 1, 8, 1);
}

function setup_tasks(){
	script['Tasks'] = new TaskServer('TaskServer');
}

function setup_patchers(){
	util.find_patcher_objects(script, patcher, Vars);
	script.rulemap = this.patcher.getnamed('settings').subpatcher().getnamed('rulemap');
	this.patcher.getnamed('poly').message('target', 0);
	selected_filter.message('offset', 1);
	autoclip = new LiveAPI(function(){}, 'live_set');
	step.message('int', 1);
	messnamed(unique+'restart', 1);
	transport_change.message('set', -1);
	//selected = part[0];
}

function setup_controls(){

	var make_send_func = function(){
		var args = arrayfromargs(arguments);
		if(args.length == 4){
			var func = function(value){
				//debug('value:', args, value);
				//debug('args:', args, args instanceof Array);
				mod.Send(args[0], args[1], args[2], args[3], value);
			}
		}
		else{
			var func = function(value){
				//debug('value:', args, value);
				mod.Send(args[0], args[1], args[2], value);
			}
		}
		return func;
	}

	var make_gui_send_function = function(patcher_object, message_header){
		if(message_header.length == 2){
			var func = function(value){
				//value = value==undefined ? 0 : value;
				//var message = message_header.push(value);
				//debug('sending gui button:', 'header is:', message_header, 'value is:', value, 'message is:', [message_header[0], message_header[1], value]);
				//#message = message_header.concat([value]);
				patcher_object.message.apply(patcher_object, [message_header[0], message_header[1], value]);
			}
		}
		return func;
	}

	script['Grid'] = new GridClass(16, 16, 'Grid');
	script['Keys'] = new GridClass(8, 1, 'Keys');

	script['GridComboButtons'] = [];
	script['KeyComboButtons'] = [];
	for(var x=0;x<16;x++){
		GridComboButtons[x] = [];
		for(var y=0;y<16;y++){
			var id = x+(y*16);
			GridComboButtons[x][y] = new MultiControlClass(id, 'GridComboButton_'+id);
			Grid.add_control(x, y, GridComboButtons[x][y]);
		}
	}

	script['GridControlRegistry'] = new ControlRegistry('GridRegistry');
	script['KeysControlRegistry'] = new ControlRegistry('KeysRegistry');
	script['GridButtons'] = [];
	script['KeyButtons'] = [];

	for(var x=0;x<16;x++){
		GridButtons[x] = [];
		for(var y=0;y<16;y++){
			var id = x+(y*16);
			GridButtons[x][y] = new ButtonClass(id, 'Button_'+id, make_send_func('grid', 'value', x, y));
			GridControlRegistry.register_control(id, GridButtons[x][y]);
			GridComboButtons[x][y].add_control(GridButtons[x][y]);
		}
	}
	for(var id=0;id<8;id++){
		KeyButtons[id] = new ButtonClass(id, 'Key_'+id, make_send_func('key', 'value', id));
		KeysControlRegistry.register_control(id, KeyButtons[id]);
		Keys.add_control(id, 0, KeyButtons[id]);
	}
	script['ShiftButton'] = new ButtonClass('shift', 'Shift', function(){});
	script['AltButton'] = new ButtonClass('alt', 'Alt', function(){});

	script['GuiPadsControlRegistry'] = new ControlRegistry('GuiGridControlRegistry');
	script['GuiKeysControlRegistry'] = new ControlRegistry('GuiKeysControlRegistry');
	script['GuiPads'] = [];
	script['GuiKeys'] = [];
	for(var i=0;i<16;i++){
		var x = i%4;
		var y = Math.floor(i/4);
		GuiPads[i] = new GUIButton('guiPads_'+i);
		GuiPads[i].set_send_function(make_gui_send_function(padgui, [x, y]));
		GuiPadsControlRegistry.register_control(i, GuiPads[i]);
		GridComboButtons[i%8][(Math.floor(i/8))].add_control(GuiPads[i]);
		GuiKeys[i] = new GUIButton('guiKeys_'+i);
		GuiKeys[i].set_send_function(make_gui_send_function(keygui, [i, 0]));
		GuiKeysControlRegistry.register_control(i, GuiKeys[i]);
		GridComboButtons[i%8][(Math.floor(i/8))+2].add_control(GuiKeys[i]);
	}

	// for(var x=0;x<16;x++){
	// 	for(var y=0;y<16;y++){
	// 		Grid.add_control(x, y, GridComboButtons[x][y]);
	// 	}
	// }
	script['_grid'] = function(x, y, val){GridControlRegistry.receive(x+(y*16), val);}
 	script['_key'] = function(num, val){KeysControlRegistry.receive(num, val);}
	script['_shift'] = function(val){ShiftButton.receive(val);}
	script['_alt'] = function(val){AltButton.receive(val);}
	script['_padgui_in'] = function(num, val){GuiPadsControlRegistry.receive(num, 1);}
	script['_keygui_in'] = function(num, val){GuiKeysControlRegistry.receive(num, 1);}

}

function setup_presets(){
	script['presetComponent'] = new HexPresetComponent('PresetComponent', storage, storage);
}

function setup_parts(){
	for(var y = 0; y < 16; y++){
		script['poly.'+(y+1)+'::pattern'] = make_pset_edit_input(y);
		script['poly.'+(y+1)+'::velocity'] = make_tvel_edit_input(y);
	}
	for(var i = 0; i < 16; i++){
		part[i] = new Part('Part_'+i, i);
		script['Speed'+(i+1)].message('set', part[i].obj.timedivisor.getvalueof());
	}
	selected = part[0]; //to be removed after top-layer var is no longer needed
}

function setup_hex(){
	script['HexEditor'] = new HexEditorModule('HexEditorModule', part, presetComponent);
}

function setup_scales(){
	script['Scales'] = new HexScalesClass('HexScales', {'colors':main_colors, 'KEYCOLORS':[main_colors.BLUE, main_colors.CYAN, main_colors.MAGENTA, main_colors.RED, main_colors.GREEN, main_colors.GREEN, main_colors.GREEN, main_colors.GREEN]});
}

function setup_modes(){
	//Page 1:  mainPage
	script['mainPage'] = new ModeSwitchablePage('mainPage');
	mainPage.enter_mode = function(){
		debug('mainPage entered');
		HexEditor.assign_grid(Grid);
		HexEditor.assign_keys(KeyButtons);
		mainPage.set_shift_button(ShiftButton);
		mainPage.set_alt_button(AltButton);
		mod.set_legacy(0);
		//mod.Send( 'receive_device', 'set_mod_device_bank', selected.channel>0 ? 1 : drumgroup_is_present ? 0 : 1);
	}
	mainPage.exit_mode = function(){
		HexEditor.assign_grid();
		HexEditor.assign_keys();
		mainPage.set_alt_button();
		mainPage.set_shift_button();
		debug('mainPage exited');
	}
	mainPage.update_mode = function(){
		debug('mainPage updated');
		if((mainPage._shifted)&&(mainPage._alted)){
			debug('mainPage._moded');
		}
		else if(mainPage._shifted){
			debug('mainPage._shifted');
			// mod.Send( 'receive_device', 'set_mod_device_bank', selected.channel>4 ? 5 : drumgroup_is_present ? 4 : 5);
			mod.Send( 'receive_device', 'set_mod_device_bank', 4);
		}
		else if(mainPage._alted){
			debug('mainPage._alted');
		}
		else{
			mainPage.enter_mode();
		}
		update_input_gate();
	}

	// script["MainModes"] = new PageStack(1, 'MainModes'); //{'task_server':tasks, 'behaviour':CyclePageStackBehaviour}); //, {'behaviour':DefaultPageStackBehaviourWithModeShift});
	//MainModes.mode_cycle_value.owner = MainModes;
	// MainModes.add_mode(0, mainPage);
	//MainModes.add_mode(1, chordPage);
	//MainModes.add_mode(2, modPage);
	//MainModes.set_mode_buttons([KeyButtons[6], KeyButtons[7]]);  //KeyButtons[4],
	// MainModes.set_mode_cycle_button(KeyButtons[7]);
	// MainModes.change_mode(0);
	mainPage.enter_mode();
}

function setup_tests(){
	 //debug('setup_tests');
	 //preset_tests();
	 //HexEditor.selectedPart.add_listener(parameter_tests);
}



part_defaults = {'n': 'part', 'num':i, 'nudge':0, 'offset':0, 'channel':0, 'len':16,
	'start':0, 'jitter':0, 'active':1, 'swing':.5, 'lock':1, 'ticks':480, 'notevalues':3,
	'notetype':0, 'pushed':0, 'direction':0, 'noteoffset':i, 'root':i, 'octave':0,
	'add':0, 'quantize':1, 'repeat':6, 'clutch':1, 'random':0, 'note':i, 'steps':15,
	'mode':0, 'polyenable':0, 'polyoffset':36, 'mode':0,'hold':0,'held':[],'triggered':[],
	'recdirty':0, 'timedivisor':16, 'basetime':1, 'behavior_enable':1};
//'speed':480,'notevalue':'4n'

function MaxObjectProxy(parent_part, obj, obj_entry){
	var self = this;
	this.add_bound_properties(this, ['_parent', '_obj', '_name', '_pattr_type',
		'_msg_type', 'get', 'set', '_set_hidden', '_set_bang', '_set_msg_type',
		'_set_msg_pset', '_set_type', '_part_num']);
	this._parent = parent_part;
	this._obj = obj;
	this._name = obj_entry.Name;
	this._pattr_type = obj_entry.pattr;
	this._msg_type = obj_entry.Type;
	this._part_num = parent_part.num;
	if(!obj.understands('getvalueof')){
		this.get = function(){return};
	}
	this.set = this._pattr_type == 'hidden' ? this._set_hidden.bind(this) :
		this._pattr_type == 'object' ?
			this._msg_type == 'bang' ? this._set_bang.bind(this) :
				this._set_msg_type.bind(this) : this._set_msg_pset.bind(this);
	MaxObjectProxy.super_.call(this, obj_entry.Name);
}

util.inherits(MaxObjectProxy, Bindable);

MaxObjectProxy.prototype._set_hidden = function(val){
	debug('set_hidden', val);
	if(val!=undefined){
		this._parent[this._name] = val;
		this._obj.message(this._msg_type, val);
	}
}

MaxObjectProxy.prototype._set_bang = function(val){
	debug('set_bang', val);
	if(val!=undefined){
		this._obj.message('bang');
	}
}

MaxObjectProxy.prototype._set_msg_type = function(val){
	debug('set_msg_type', val);
	if(val!=undefined){
		this._parent[this._name] = val;
		this._obj.message(this._msg_type, val);
	}
}

MaxObjectProxy.prototype._set_msg_pset = function(val, pset){
	if(val!=undefined){
		var num = this._part_num;
		if(!pset){
			pset = presetComponent.current_single(num);
			this._parent[this._name] = val;
			this._obj.message(this._msg_type, val);
		}
		debug('storing', this._name, 'in', this._pattr_type, 'at', pset, 'with', val);
		storage.setstoredvalue('poly.'+(num+1)+'::'+this._pattr_type, pset, val);
	}
}

MaxObjectProxy.prototype.get = function(){
	this._parent_part[this._name] = this._obj.getvalueof();
}


///this is how we inject the data to the poly~ objects:
function make_funcs(part){
	var new_part = [];
	new_part.stepLoop = function(In, Out){
		debugstep('step Loop', In, Out);
		selected.nudge = In;
		selected.obj.nudge.message('set', selected.nudge);
		selected.obj.set.nudge(selected.nudge, presets[selected.num]);
		//selected.steps = Out - In;
		//selected.obj.steps.message('int', selected.steps);
		selected.obj.set.steps(Out - In);
		selected.obj.restart.message('bang');
		refresh_c_keys();
	}
	new_part.stepDir = function(step, val){
		debugstep('step Dir', step, val);
		//part.direction = val;
		//part.obj.direction.message('int', val);
		part.obj.set.direction(val);
	}
	new_part.stepNote = function(step, val){
		debugstep('step note', step, val);
		part.note[step] = val;
		part.obj.set.note(part.note);
	}
	new_part.stepVel = function(step, val){
		debugstep('step vel', step, val);
		part.velocity[step] = val;
		part.obj.set.velocity(part.velocity);
	}
	new_part.stepDur = function(step, val){
		debugstep('step dur', step, val);
		part.duration[step] = val;
		part.obj.set.duration(part.duration);
	}
	new_part.stepExtra1 = function(step, val){
		debugstep('step extra1', step, val);
		part.pattern[step] = val;
		part.obj.set.pattern(part.pattern);
		refresh_c_keys();
	}
	new_part.stepExtra2 = function(step, val){
		debugstep('step extra2', step, val);
		part.rulebends[step] = val;
		part.obj.set.rulebends(part.rulebends);
	}
	return new_part
}



function Part(name, index, args){
	var self = this;
	var poly_num = index;
	storage.message('priorty', 'poly.'+(poly_num+1), 'tickspattr', 10);
	storage.message('priorty', 'poly.'+(poly_num+1),  'notetypepattr', 11);
	storage.message('priorty', 'poly.'+(poly_num+1),  'notevaluepattr', 12);
	for(var i in part_defaults){
		this[i] = part_defaults[i];
	}
	this.num = parseInt(index);
	this.pattern = default_pattern.slice();
	this.edit_buffer = default_pattern.slice();
	this.edit_velocity = default_velocity.slice();
	this.step_pattern = default_step_pattern.slice();
	this.duration = default_duration.slice();
	this.velocity = default_velocity.slice();
	this.behavior = default_pattern.slice();
	this.rulebends = default_pattern.slice();
	this.note = default_pattern.slice();
	this.obj = [];
	this.proxy = {};
	this.obj.set = [];
	this.obj.get = [];
	for(var j in Objs){
		//debug(Objs[j].Name, '\n');
		this.obj[Objs[j].Name] = patcher.getnamed('poly').subpatcher(poly_num).getnamed(Objs[j].Name);
		this.obj.set[Objs[j].Name] = make_obj_setter(this, Objs[j]);
		this.obj.get[Objs[j].Name] = make_obj_getter(this, Objs[j]);
		this.proxy[Objs[j].Name] = new MaxObjectProxy(this, this.obj[Objs[j].Name], Objs[j])
	}
	this.funcs = make_funcs(this);
	this.add_bound_properties('init', 'num');
	Part.super_.call(this, name, args);
}

inherits(Part, Bindable);

Part.prototype.init = function(){
		this.obj.quantize.message('int', this.quantize);
		this.obj.active.message('int', this.active);
		this.obj.swing.message('float', this.swing);
		this.obj.ticks.message(this.ticks);
		//this.obj.phasor.lock = 1;
		this.obj.polyenable.message('int', this.polyenable);
		//this.obj.phasor.message('float', 0);
		this.obj.noteoffset.message('int', (this.octave *12) + this.root);
		this.obj.pattern.message('list', this.pattern);
		this.obj.note.message('list', this.note);
		this.obj.velocity.message('list', this.velocity);
		this.obj.duration.message('list', this.duration);
		this.obj.notetype.message('int', this.notetype);
		this.obj.notevalues.message('int', this.notevalues);
		this.obj.channel.message('int', this.channel);
		this.obj.behavior_enable.message('int', this.behavior_enable);
}



function HexEditorModule(name, parts, presets, args){
	var self = this;
	this._part = parts;
	this._presets = presets;
	this._grid = undefined;
	this._keys = undefined;
	this.colors = {OFF : 0, WHITE : 1, CYAN : 3, MAGENTA : 4, RED : 5, BLUE : 7, YELLOW : 2, GREEN : 6};
	this.add_bound_properties(this, ['_presets', 'on_selected_part_changed', 'colors',
		'update_grid', 'assign_grid', '_partSelector', '_part', '_grid', '_keys',
		'update_keys', 'assign_keys', 'increaseSpeed']);
	HexEditorModule.super_.call(this, name, args);
	this.__init();
	this.on_selected_part_changed({_value:1});
}

inherits(HexEditorModule, Bindable);

HexEditorModule.prototype.__init = function(){
	this.__init_grid_subs();
	this.__init_parameters();
	this.__init_components();
	this.__init_functions();
	this.__init_modes();
}

HexEditorModule.prototype.__init_grid_subs = function(){
	this._top_sub = new GridClass(8, 2, this._name+('_top_sub'));
	this._mid_sub = new GridClass(8, 2, this._name+('_mid_sub'));
	this._bottom_sub = new GridClass(8, 2, this._name+('_bottom_sub'));
	this._buttons_sub = new GridClass(8, 1, this._name+('_button_sub'));
	this._mode_sub = new GridClass(8, 1, this._name+('_mode_sub'));
	this._sub_grids = [this._top_sub, this._mid_sub, this._bottom_sub, this._buttons_sub, this._mode_sub];
}

HexEditorModule.prototype.__init_parameters = function(){
	//define all parameters that will be accessed by pointer here:
	this.behaviour = [];
	this.accent = [];
	this.step = [];
	for(var i=0;i<16;i++){
		this.behaviour[i] = new RangedButtonParameter(this._name + '_Behaviour_' + i, {'range':8, 'colors':[this.colors.OFF, this.colors.WHITE, this.colors.YELLOW, this.colors.CYAN, this.colors.MAGENTA, this.colors.RED, this.colors.GREEN, this.colors.BLUE]});
		this.accent[i] = new RangedButtonParameter(this._name + '_Accent_' + i, {'range':8, 'colors':[this.colors.OFF, this.colors.WHITE, this.colors.YELLOW, this.colors.CYAN]});
		this.step[i] = new ToggledParameter(this._name + '_Step_' + i, {'onValue': (i%4==0) ? this.colors.BLUE : this.colors.CYAN, 'offValue':this.colors.OFF});
	}
	this.behaviour_group = new ArrayParameterGroup('BehaviourGroup', this.behaviour, {'subject_attribute':'behavior'});
	this.accent_group = new ArrayParameterGroup('AccentGroup', this.accent, {'subject_attribute':'velocity'});
	this.step_group = new ArrayParameterGroup('StepGroup', this.step, {'subject_attribute':'pattern'});

	this._on_loop_selector_changed = function(obj){
		debug('NOT IMPLEMENTED _on_loop_region_changed:', obj._start_value, obj._end_value);
	}
	this.loopSelector = new HexDoubleSliderComponent(this._name + '_Loop_Region', 0, 15, 0, 15,
		this._on_loop_selector_changed, this.colors.RED, this.colors.MAGENTA, {'subject_attribute_a':'nudge',
			'subject_attribute_b':'steps'});

	this.noteValues = new HexRangedParameter(this._name + '_NoteValue', {'range':8,
		'subject_attribute':'notevalues'});

	this.noteType = new HexRangedParameter(this._name + '_NoteType', {'range':3,
		'subject_attribute':'notetype'});

	this._part_parameters = {'step_group':this.step_group,
		'behaviour_group':this.behaviour_group,
		'accent_group':this.accent_group,
		'loop_selector':this.loopSelector,
		'note_values':this.noteValues,
		'note_type':this.noteType
	};
}

HexEditorModule.prototype.__init_functions = function(){
	this.increaseSpeed = new SpecialMomentaryParameter('IncreaseSpeed', {'offValue':this.colors.RED,
		'onValue':this.colors.WHITE, 'callback':this._pointer.increase_speed.bind(this._pointer),
		'value':0});
	this.decreaseSpeed = new SpecialMomentaryParameter('DecreaseSpeed', {'offValue':this.colors.RED,
		'onValue':this.colors.WHITE, 'callback':this._pointer.decrease_speed.bind(this._pointer),
		'value':0});
	this.rotateRight = new SpecialMomentaryParameter('RotateRight', {'offValue':this.colors.BLUE,
		'onValue':this.colors.WHITE, 'callback':this._pointer.rotate_right.bind(this._pointer),
		'value':0});
	this.rotateLeft = new SpecialMomentaryParameter('RotateLeft', {'offValue':this.colors.BLUE,
		'onValue':this.colors.WHITE, 'callback':this._pointer.rotate_left.bind(this._pointer),
		'value':0});
	this.transposeUp = new SpecialMomentaryParameter('TransposeUp', {'offValue':this.colors.MAGENTA,
		'onValue':this.colors.WHITE, 'callback':this._pointer.transpose_up.bind(this._pointer),
		'value':0});
	this.transposeDown = new SpecialMomentaryParameter('TransposeDown', {'offValue':this.colors.MAGENTA,
		'onValue':this.colors.WHITE, 'callback':this._pointer.transpose_down.bind(this._pointer),
		'value':0});
}

HexEditorModule.prototype.__init_components = function(){
	//define pointer and other selectors that will access parameters here:
	this._presets._parent = this;

	this._pointer = new SequenceBufferComponent('SelectedPartBuffer', this, this._part, this._part_parameters);

	//this.selectedPart = new RadioComponent(this._name + '_Selected_Part', 0, 15, 0, self._on_part_number_changed, this.colors.RED, this.colors.WHITE);
	this.selectedPart = new SpecialRadioComponent(this._name + '_Selected_Part', 1, 16, 1,
		this.on_selected_part_changed, this.colors.RED, this.colors.WHITE);
	this.selectedPart.set_secondary_callback(presetComponent.copy_part.bind(presetComponent));

	this._on_selected_preset_changed = function(obj){this._presets.recall_single(this.selectedPart._value,
		obj._value);}.bind(this);
	this.selectedPreset = new SpecialRadioComponent(this._name + '_Selected_Preset', 1, 16, 1,
		this._on_selected_preset_changed, this.colors.WHITE, this.colors.CYAN);
	this.selectedPreset.set_secondary_callback(presetComponent.copy_single);
	this.selectedPreset.add_listener(this._pointer.on_selected_preset_changed.bind(this._pointer));

	this._on_global_preset_changed = function(obj){this._presets.recall_global(obj._value);}.bind(this);
	this.globalPreset = new SpecialRadioComponent(this._name + '_Global_Preset', 1, 16, 1,
		this._on_global_preset_changed, this.colors.WHITE, this.colors.GREEN);
	this.globalPreset.set_secondary_callback(presetComponent.copy_global);
	this.globalPreset.add_listener(this._pointer.on_selected_preset_changed.bind(this._pointer));

	this.mute = [];
	for(var i=0;i<16;i++){
		this.mute[i] = new SpecialToggledParameterClass(this._name + '_Mute_' + i,
			{'value':1, 'apiObj':this._part[i].proxy.active, 'onValue':this.colors.YELLOW,
			'offValue':this.colors.OFF});
	}
	this.mute_group = new ParameterGroup('MuteGroup', this.mute); //, {'subject_attribute':'active'});
}

HexEditorModule.prototype.__init_modes = function(){
	//make our pagestacks here:
	var self = this;
	var make_short_page = function(name, component, controls){
		var page = new Page(name);
		page.enter_mode = function(){component.set_controls(controls);}
		page.exit_mode = function(){component.set_controls();}
		return page;
	}

	var pad_select_Page = make_short_page('Select', this.selectedPart, this._top_sub);
	var pad_mute_Page = make_short_page('Mute', this.mute_group, this._top_sub);
	var pad_preset_Page = make_short_page('Preset', this.selectedPreset, this._top_sub);
	var pad_global_Page = make_short_page('Global', this.globalPreset, this._top_sub);

	this.pad_modes = new PageStack(8, 'PadModes');
	this.pad_modes.add_mode(0, pad_select_Page);
	// this.pad_modes.add_mode(1, pad_mute_Page);
	// this.pad_modes.add_mode(2, pad_preset_Page);
	// this.pad_modes.add_mode(3, pad_global_Page);
	this.pad_modes.change_mode(0);

	var key_select_Page = make_short_page('Select', this.selectedPart, this._mid_sub);
	var key_mute_Page = make_short_page('Mute', this.mute_group, this._mid_sub);
	var key_preset_Page = make_short_page('Preset', this.selectedPreset, this._mid_sub);
	var key_global_Page = make_short_page('Global', this.globalPreset, this._mid_sub);
	var key_behaviour_Page = make_short_page('Behaviour', this.behaviour_group, this._mid_sub);
	var key_accent_Page = make_short_page('Accent', this.accent_group, this._mid_sub);
	var key_length_Page = make_short_page('Length', this.loopSelector, this._mid_sub);

	this.key_modes = new PageStack(8, 'KeyModes');
	//this.key_modes.add_mode(0, key_select_Page);
	this.key_modes.add_mode(0, key_mute_Page);
	this.key_modes.add_mode(1, key_length_Page);
	this.key_modes.add_mode(2, key_behaviour_Page);
	this.key_modes.add_mode(3, key_accent_Page);
	this.key_modes.add_mode(6, key_preset_Page);
	this.key_modes.add_mode(7, key_global_Page);
	this.key_modes.change_mode(0);

	var static_step_Page = make_short_page('Step', this.step_group, this._bottom_sub);

	this.static_modes = new PageStack(1, 'StaticModes');
	this.static_modes.add_mode(0, static_step_Page);
	this.static_modes.change_mode(0);

	var function_Page = new Page('Functions');
	function_Page.enter_mode = function(){
		var momentary_buttons = self._buttons_sub.controls();
		self.increaseSpeed.set_control(momentary_buttons[1]);
		self.decreaseSpeed.set_control(momentary_buttons[0]);
		self.rotateRight.set_control(momentary_buttons[3]);
		self.rotateLeft.set_control(momentary_buttons[2]);
		self.transposeUp.set_control(momentary_buttons[5]);
		self.transposeDown.set_control(momentary_buttons[4]);
	}
	function_Page.exit_mode = function(){
		self.increaseSpeed.set_control();
		self.decreaseSpeed.set_control();
		self.rotateRight.set_control();
		self.rotateLeft.set_control();
		self.transposeUp.set_control();
		self.transposeDown.set_control();
	}

	this.function_modes = new PageStack(1, 'FunctionModes');
	this.function_modes.add_mode(0, function_Page);
	this.function_modes.change_mode(0);
}

HexEditorModule.prototype.assign_grid = function(grid){
	for(var sub in this._sub_grids){this._sub_grids[sub].clear_buttons();}
	this._grid = grid;
	if(this._grid){
		this._top_sub.sub_grid(this._grid, 0, 8, 0, 2);
		this._mid_sub.sub_grid(this._grid, 0, 8, 2, 4);
		this._bottom_sub.sub_grid(this._grid, 0, 8, 4, 6);
		this._buttons_sub.sub_grid(this._grid, 0, 8, 6, 7);
		this._mode_sub.sub_grid(this._grid, 0, 8, 7, 8);
	}
	this.update_grid();
}

HexEditorModule.prototype.assign_keys = function(keys){
	this._keys = keys;
	this.update_keys();
}

HexEditorModule.prototype.update_grid = function(){
	//debug('setting mode buttons', this._mode_sub.controls());


	this.pad_modes.set_mode_buttons(this._mode_sub.controls());
	//this.key_modes.set_mode_buttons(this._buttons_sub.controls());
	this.pad_modes.restore_mode();
	this.key_modes.restore_mode();
	this.static_modes.restore_mode();
	this.function_modes.restore_mode();
}

HexEditorModule.prototype.update_keys = function(){
	//debug('setting mode buttons', this._mode_sub.controls());
	this.key_modes.set_mode_buttons(this._keys);
}

HexEditorModule.prototype.on_selected_part_changed = function(obj){
	//debug('HexEditorModule.on_selected_part_changed()', obj._value);
	this._pointer.on_selected_part_changed(obj);
}


/*
pointer to the currently selected sequence (takes place of selected variable in
the original code).  Holds current seuqence data for selected voice and provides
methods for editing that data (i.e. pushing changes to pattrs that hold the data)
and synchronizing the output to all UI objects when on of those objects changes
a parameter of the sequence (i.e. to Max UI model, controller, and react)
*/

function SequenceBufferComponent(name, parent, parts, part_parameters, args){
	var self = this;
	SequenceBufferComponent.super_.call(this, name, args);
	this._parent = parent;
	this._parts = parts;
	this._part_parameters = part_parameters;
	this.selected = parts[0];
	this.add_bound_properties(this, ['_part_parameters', '_parent', 'parts', 'selected',
		'on_selected_part_changed', 'on_selected_preset_changed', 'rotate_left', 'rotate_right',
		'increase_speed', 'decrease_speed', 'rotate_pattern', 'transpose_up', 'transpose_down']);
	//debug('SequenceBufferComponent()', this._parent._name);
}

util.inherits(SequenceBufferComponent, Bindable);

SequenceBufferComponent.prototype.on_selected_part_changed = function(obj){
	//debug('SequenceBufferComponent.on_selected_part_changed()', obj._value, this._parent._name);
	//update all gui elements (should be )
	this.selected = this._parts[obj._value-1];
	for(var param in this._part_parameters){
		//debug('updating:', param);
		this._part_parameters[param].set_subject(this.selected);
	}
	this._parent.selectedPreset._value = this._parent._presets._presets[obj._value-1];
	this._parent.selectedPreset.update_controls();


	//update device_component_class
	_select_chain(obj._value);
	//update live_step
	update_step();
	//not sure what this does
	selected_filter.message('offset', obj._value + 1);
}

SequenceBufferComponent.prototype.on_selected_preset_changed = function(obj){
	//debug('on_selected_preset_changed', this._name);
	for(var param in this._part_parameters){
		// debug('updating:', param);
		this._part_parameters[param]._update_from_pattr();
	}
}

SequenceBufferComponent.prototype.increase_speed = function(obj){
	debug('increase_speed');
		if(this.selected.notevalues<8){
			notevaluesgui.message('int', Math.max(Math.min(7, parseInt(this.selected.notevalues)-1), 0));
		}
		else{
			notevaluesgui.message('int', Math.floor(this.selected.timedivisor / this.selected.basetime).toString(2).length-1);
			notetypegui.message('set', 0);
		}
}

SequenceBufferComponent.prototype.decrease_speed = function(obj){
	debug('decrease_speed');
	if(this.selected.notevalues<8){
		notevaluesgui.message('int', Math.max(Math.min(7, parseInt(this.selected.notevalues)+1), 0));
	}
	else{
		notevaluesgui.message('int', Math.ceil(this.selected.timedivisor / this.selected.basetime).toString(2).length);
		notetypegui.message('set', 0);
	}
}

SequenceBufferComponent.prototype.rotate_left = function(obj){
	debug('.rotate_left');
	this.rotate_pattern(this.selected, rot_length, -1);
}

SequenceBufferComponent.prototype.rotate_right = function(obj){
	debug('rotate_right');
	this.rotate_pattern(this.selected, rot_length, 1);
}

SequenceBufferComponent.prototype.rotate_pattern = function(part, len, dir){
	//debug('rotate_pattern', len, dir, part._name);
	var bits = Math.ceil(16/len);
	var Out;
	var In;
	if(dir < 0){
		for(var i=0;i<bits;i++){
			Out = Math.min(parseInt((len*(i+1))-1), 15);
			In = len*i;
			part.pattern.splice(Out, 0, parseInt(part.pattern.splice(In, 1)));
			part.velocity.splice(Out, 0, parseInt(part.velocity.splice(In, 1)));
			part.duration.splice(Out, 0, parseInt(part.duration.splice(In, 1)));
			part.note.splice(Out, 0, parseInt(part.note.splice(In, 1)));
		}
	}
	else{
		for(var i=0;i<bits;i++){
			Out = len*i;
			In = Math.min(parseInt((len*(i+1))-1), 15);
			part.pattern.splice(Out, 0, parseInt(part.pattern.splice(In, 1)));
			part.velocity.splice(Out, 0, parseInt(part.velocity.splice(In, 1)));
			part.duration.splice(Out, 0, parseInt(part.duration.splice(In, 1)));
			part.note.splice(Out, 0, parseInt(part.note.splice(In, 1)));
		}
	}
	//var pset = this._parent_._presets._presets[part_num];
	part.proxy.pattern.set(part.pattern);
	part.proxy.velocity.set(part.velocity);
	part.proxy.duration.set(part.duration);
	part.proxy.note.set(part.note);
	//refresh_c_keys();
	this.on_selected_preset_changed();
}

SequenceBufferComponent.prototype.transpose_down = function(obj){
	debug('transpose_down');
}

SequenceBufferComponent.prototype.transpose_up = function(obj){
	debug('transpose_up');
}

SequenceBufferComponent.prototype.set_note = function(obj){
	debug('set_note');
}

SequenceBufferComponent.prototype.change_direction = function(obj){
	debug('change_direction');
}

SequenceBufferComponent.prototype.set_quantization_note = function(obj){
	debug('set_quantization_note');
}

SequenceBufferComponent.prototype.set_quantization_sub = function(obj){
	debug('set_quantization_sub');
}



function HexPresetComponent(name, storage, storage_menu, args){
	var self = this;
	this._presets = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
	this.add_bound_properties(this, ['_parent', '_presets', '_single_selector',
		'_global_selector', 'recall_single', 'recall_global', 'current_single',
		'copy_single', 'copy_global']);
	HexPresetComponent.super_.call(this, name, storage, storage_menu, args);
	this._init();
}

util.inherits(HexPresetComponent, PresetComponent);

HexPresetComponent.prototype._init = function(){
	this._single_selector = new SinglePresetSelector('SinglePresetSelector', this);
	this._global_selector = new GlobalPresetSelector('GlobalPresetSelector', this);
}

HexPresetComponent.prototype.recall_single = function(part, num){
	debug('_single:', part, num);
	this._single_selector.recall(part, num);
}

HexPresetComponent.prototype.recall_global = function(num){
	//debug('_global:', num);
	this._global_selector.recall(num);
}

HexPresetComponent.prototype.recall = function(part){
	for(var item in Objs){
		//post(Objs[item], typeof(selected[Objs[item]]), 'retrieving...\n');
		selected.obj.get[Objs[item].Name]();
	}
	selected.nudge = Math.floor(selected.obj.nudge.getvalueof());
	selected.steps = Math.floor(selected.obj.steps.getvalueof());
	selected.root = Math.floor(selected.obj.noteoffset.getvalueof()%12);
	selected.octave = Math.floor(selected.obj.noteoffset.getvalueof()/12);
	var i=15;do{
		part[i].active = part[i].obj.active.getvalueof();
		part[i].quantize = part[i].obj.quantize.getvalueof();
		part[i].pattern = part[i].obj.pattern.getvalueof();
		//script['Speed'+(i+1)].message('set', part[i].ticks);
		update_speed(part[i]);
	}while(i--);
}

HexPresetComponent.prototype.current_single = function(part_num){
	return this._presets[part_num];
}

HexPresetComponent.prototype.copy_single = function(source, dest){
	//this method currently depends on the data loaded in part.objs, not source input
	debug('copy_single', source, dest);
	var selected_part = this._parent.selectedPart._value;
	//this._storage.message('store', 'poly.'+(source), dest);
	this._storage.store('poly.'+(source), dest);
}

HexPresetComponent.prototype.copy_single_manually = function(src, dest){
	//this method copies values manually, but is much slower
	debug('copy_single_manually', src, dest);
	var selected_part = this._parent._part[this._parent.selectedPart._value];
	for(var index in Objs){
		if(['object','hidden'].indexOf(Objs[index].pattr)==-1){
			//debug('copying:', index, selected_part[index], dest);
			selected_part.proxy[index].set(selected_part[index], dest)
		}
	}
}

HexPresetComponent.prototype.copy_global = function(src, dest){
	debug('copy global preset', src, dest);
	this._storage.copy(src, dest);
	//storage.recall(dest);
}

HexPresetComponent.prototype.copy_part = function(src, dest){
	//this method copies values manually, but is much slower
	debug('copy_part', src, dest, this._parent);
	var selected_part = this._parent._part[src-1];
	debug('...');
	var destination_part = this._parent._part[dest-1];
	debug('parts:', selected_part._name, destination_part._name);
	for(var index in Objs){
		if(['object','hidden'].indexOf(Objs[index].pattr)==-1){
			debug('copying:', index, selected_part[index], dest);
			destination_part.proxy[index].set(selected_part[index]);
		}
	}
}

HexPresetComponent.prototype.clear_pattern = function(dest){
	//not tested
	/*for(var index in Objs)
	{
		//debug('clear', 'poly.'+(part.num+1)+'::'+Objs[index].pattr, dest, '\n');
		var type = Objs[index].pattr;
		var types = {'object':0, 'hidden':0};
		if(!(type in types))
		{
			part.obj.set[index](part[index], dest);
		}
	}*/
	var Part = dest;
	var pset = presets[Part.num];
	Part.obj.set.rulebends(default_pattern.slice());
	Part.obj.set.pattern(default_pattern.slice());
	Part.obj.set.behavior(default_pattern.slice());
	Part.obj.set.velocity(default_velocity.slice());
	Part.obj.set.duration(default_duration.slice());
	Part.obj.set.note(default_pattern.slice());
	Part.obj.set.basetime(1);
	Part.obj.set.timedivisor(4);
	Part.obj.set.notetype(0);
	Part.obj.set.notevalues(2);
	Part.obj.set.active(1);
	debug('clear_pattern', dest.num);
	//storage.copy('poly.'+(part.num+1), 16, dest.num+1);
	//storage.recall('poly.'+(part.num+1), dest.num+1);
}

HexPresetComponent.prototype.clear_global = function(dest){
	// not tested
	debug('clear_global', dest.num);
	storage.copy(16, dest.num+1);
	storage.recall(dest.num+1);
}

HexPresetComponent.prototype.read = function(){
	// called by pattrstorage when a file is read
	this._presets = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
	this._parent.selectedPreset._value = 1;
	this._parent.selectedPreset.update_controls();
	this._parent.globalPreset._value = 1;
	this._parent.globalPreset.update_controls();
	this._storage.message(1);
}



function SinglePresetSelector(name, parent, args){
	SinglePresetSelector.super_.call(this, name, parent, args);
}

util.inherits(SinglePresetSelector, PresetSelector);

SinglePresetSelector.prototype.recall = function(part, num){
	debug('SinglePresetSelector.recall()', 'recall', 'poly.'+(part), num);
	this._parent._presets[part-1] = num;
	this._parent._storage.message('recall', 'poly.'+(part), num);
	//debug('done');
}



function GlobalPresetSelector(name, parent, args){
	GlobalPresetSelector.super_.call(this, name, parent, args);
}

util.inherits(GlobalPresetSelector, PresetSelector);

GlobalPresetSelector.prototype.recall = function(num){
	for(var i in this._parent._presets){
		this._parent._presets[i] = num;
	}
	this._parent._storage.message('recall', num);
	//debug('GlobalPresetSelector.recall()');
}



function SpecialMomentaryParameter(name, args){
	SpecialMomentaryParameter.super_.call(this, name, args);
}

util.inherits(SpecialMomentaryParameter, MomentaryParameter);

SpecialMomentaryParameter.prototype.receive = function(value){
	this._value = value;
	this.update_control();
	if(this._value){
		this.notify();
	}
}



function SpecialToggledParameterClass(name, args){
	this.add_bound_properties(this, ['update_control']);
	SpecialToggledParameterClass.super_.call(this, name, args);
}

util.inherits(SpecialToggledParameterClass, ParameterClass);

SpecialToggledParameterClass.prototype._Callback = function(obj){
	//debug('_Callback...')
	if(obj._value){
		var val = Math.abs(this._value - 1);
		if(this._apiObj){
			//debug('SpecialToggledParameterClass._apiObj',this._action, val, this._onValue, this._offValue);
			this._apiObj.set(val);
		}
		this.receive(val);
	}
}

SpecialToggledParameterClass.prototype.update_single_control = function(control){
	if(control){control.send(this._value > 0 ? this._onValue : this._offValue);}
}



function ArrayParameterGroup(name, parameters, args){
	var self = this;
	ArrayParameterGroup.super_.call(this, name, args);
	this._parameters = parameters;
	this._value = new Array(this._parameters.length);
	for(var i in this._parameters){
		this._value[i]=this._parameters[i]._value;
	}
	this._subject = undefined;
	this.add_bound_properties(this, ['_update_from_pattr', 'set_subject', '_subject', '_value', 'receive', '_parameters', 'set_controls']);
	this.__init();
}

util.inherits(ArrayParameterGroup, ParameterClass);

ArrayParameterGroup.prototype.__init = function(){
	for(var i in this._parameters){
		this._parameters[i].add_listener(this.receive);
	}
}

ArrayParameterGroup.prototype.set_controls = function(controls){
	controls = isClass(controls, 'GridClass') ? controls.controls() : control instanceof Array ? controls : isClass(controls, 'NotifierClass') ? [controls] : [];
	for(var i=0;i<this._parameters.length;i++){
		var control = controls[i]?controls[i]:undefined;
		this._parameters[i].set_control(control);
	}
}

ArrayParameterGroup.prototype.receive = function(obj){
	var index = this._parameters.indexOf(obj);
	this._value[index] = obj._value;
	if(this._subject){
		//this._subject.obj.set[this._subject_attribute](this._value);
		this._subject.proxy[this._subject_attribute].set(this._value);
	}
	this.notify(this);
}

ArrayParameterGroup.prototype.set_subject = function(subj){
	//debug(this._name, '.set_subject()', subj);
	this._subject = subj;
	this._update_from_pattr();
}

ArrayParameterGroup.prototype._update_from_pattr = function(){
	//better to set all values, then update controls, since receive will be linked
	//to the update of step.
	//debug(this._name, '_update_from_pattr()');
	this._value = this._subject.obj[this._subject_attribute].getvalueof();
	for(var i in this._parameters){
		//this._parameters[i].set_value(this._value[i]);
		this._parameters[i]._value = this._value[i];
		this._parameters[i].update_control();
	}
}



function HexDoubleSliderComponent(name, minimum, maximum, initial_start, initial_end, callback, onValue, offValue, args){
	this.add_bound_properties(this, ['set_subject', '_update_from_pattr', '_subject_attribute_a',
		'_subject_attribute_b']);
	this._subject = undefined;
	HexDoubleSliderComponent.super_.call(this, name, minimum, maximum, initial_start, initial_end, callback, onValue, offValue, args);
}

util.inherits(HexDoubleSliderComponent, DoubleSliderComponent);

HexDoubleSliderComponent.prototype.set_start_value = function(obj){
	this.Super_().prototype.set_start_value.call(this, obj);
	if(this._subject){
		this._subject.proxy[this._subject_attribute_a].set(this._start_value);
	}
}

HexDoubleSliderComponent.prototype.set_end_value = function(obj){
	this.Super_().prototype.set_end_value.call(this, obj);
	if(this._subject){
		this._subject.proxy[this._subject_attribute_b].set(this._end_value);
	}
}

HexDoubleSliderComponent.prototype.set_subject = function(subj){
	//debug(this._name, '.set_subject()', subj);
	this._subject = subj;
	this._update_from_pattr();
}

HexDoubleSliderComponent.prototype._update_from_pattr = function(){
	//debug(this._name, '_update_from_pattr()');
	this._start_value = this._subject.obj[this._subject_attribute_a].getvalueof();
	this._end_value = this._subject.obj[this._subject_attribute_b].getvalueof();
	this.update_controls();
}



function HexRangedParameter(name, args){
	this.add_bound_properties(this, ['set_subject', '_update_from_pattr', '_subject_attribute']);
	this._subject = undefined;
	HexRangedParameter.super_.call(this, name, args);
}

util.inherits(HexRangedParameter, RangedParameter);

HexRangedParameter.prototype.receive = function(obj){
	this.Super_().prototype.receive.call(this, obj);
	if(this._subject){
		this._subject.proxy[this._subject_attribute].set(this._value);
	}
}

HexRangedParameter.prototype.set_subject = function(subj){
	//debug(this._name, '.set_subject()', subj);
	this._subject = subj;
	this._update_from_pattr();
}

HexRangedParameter.prototype._update_from_pattr = function(){
	//debug(this._name, '_update_from_pattr()');
	this._value = this._subject.obj[this._subject_attribute].getvalueof();
	this.update_control();
}



function SpeedParameter(name, args){
	var self = this;
	this._noteType = undefined;
	this._noteValues = undefined;
	this._baseTime = undefined;
	this._division = undefined;
	this._quantized = undefined;
	this._multiplier = undefined;
	//this.add_bound_properties(self, {'set_subject', '_update_from_pattr', '_subject_attribute'});
	SpeedParameter.super_.call(this, name, args);
}

util.inherits(SpeedParameter, RangedParameter);

SpeedParameter.prototype.receive = function(obj){
	this.Super_().prototype.receive.call(this, obj);
	// if(this._subject){
	// 	this._subject.proxy[this._subject_attribute].set(this._value);
	// }
}

SpeedParameter.prototype.set_subject = function(subj){
	//debug(this._name, '.set_subject()', subj);
	this._subject = subj;
	this._update_from_pattr();
}

SpeedParameter.prototype._update_from_pattr = function(){
	//debug(this._name, '_update_from_pattr()');
	// this._value = this._subject.obj[this._subject_attribute].getvalueof();
	this.update_control();
}






/*
proxy for the LiveStep patcher.obj...will decode it's output and act as
intermediary after UI->SeqBuff->LiveStep.
Will also need a method to deal with incoming calls from pattrstorage when
a new preset is loaded.
*/
function LiveStepComponent(name, args){
	var self = this;
	this._step = undefined;
	this.add_bound_properties(this, []);
	LiveStepComponent.super_.call(this, name, args);
}

util.inherits(LiveStepComponent, Bindable);

//called to update data in live.step when changes are made to poly
LiveStepComponent.prototype.update_step = function(){
	//set_dirty(1);
	step_value = step.getvalueof();
	debugstep('update step: step_value', step_value.length, step_value);
	selected.nudge = parseInt(selected.obj.nudge.getvalueof());
	selected.steps = parseInt(selected.obj.steps.getvalueof());
	step_value[5] = Math.floor(selected.nudge);
	step_value[6] = Math.floor(selected.nudge) + Math.floor(selected.steps) + 1;
	selected.pattern = selected.obj.pattern.getvalueof();
	selected.velocity = selected.obj.velocity.getvalueof();
	selected.duration = selected.obj.duration.getvalueof();
	selected.behavior = selected.obj.behavior.getvalueof();
	selected.rulebends = selected.obj.rulebends.getvalueof();
	selected.note = selected.obj.note.getvalueof();
	var i=15;do{
		var s = 11 + (i*5);
		step_value[s] = selected.note[i];
		step_value[s + 1] = selected.velocity[i];
		step_value[s + 2] = selected.duration[i];
		step_value[s + 3] = selected.pattern[i];
		step_value[s + 4] = selected.rulebends[i];
	}while(i--);
	debugstep('to step', step_value.length, step_value);
	step.setvalueof(step_value);
}

LiveStepComponent.prototype.update_poly = function(){

	//set_dirty(1);
	var args = arrayfromargs(arguments);
	step_value = step.getvalueof();
	debugstep('update_poly, unmatching args', args);
	var i = args.length;do{
		if(args[i]>10){
			var index = args[i]-11;
			debugstep(args[i]);
			selected.funcs[Funcs[index%5]](Math.floor(index/5), step_value[index+11]);
		}
		else{
			switch(args[i]){
				case 5:
					selected.funcs.stepLoop(step_value[args[i]], step_value[args[i]+1]-1);
					break;
				case 6:
					selected.funcs.stepLoop(step_value[args[i]-1], step_value[args[i]]-1);
					break;
			}
		}
	}while(i--);
}



function SpecialRadioComponent(name, minimum, maximum, initial, callback, onValue, offValue, args){
	this._secondary_callback = function(){debug(this._name, ':secondary_callback not defined!');}
	this.add_bound_properties(this, ['_secondary_function', '_secondary_callback']);
	SpecialRadioComponent.super_.call(this, name, minimum, maximum, initial, callback, onValue, offValue, args);
}

util.inherits(SpecialRadioComponent, RadioComponent);

SpecialRadioComponent.prototype._Callback = function(obj){
	// debug('SpecialRadioComponent._Callback():', obj);
	if(obj._value){
		var cur = this._buttons[this._value-this._min];
		if((cur!=undefined)&&(cur.pressed())&&(cur != obj)){
			//debug('calling_secondary_function');
			this._secondary_function(obj);
		}
		else{
			var val = this._buttons.indexOf(obj) + this._min;
			this.set_value(val);
		}
	}
}

SpecialRadioComponent.prototype._secondary_function = function(obj){
	// debug('calling_secondary_callback');
	this._secondary_callback(this._value, this._buttons.indexOf(obj) + this._min);
}

SpecialRadioComponent.prototype.set_secondary_callback = function(callback){
	this._secondary_callback = callback;
}







function HexScalesClass(parameters, name, args){
	var self = this;
	this._colors = {OFF : 0, WHITE : 1, CYAN : 5, MAGENTA : 9, RED : 17, BLUE : 33, YELLOW : 65, GREEN : 127};
	this._current_scale = 'Major';
	this._grid = undefined;
	this._grid_function = function(){}
	this.width = function(){return  !this._grid ? 0 : this._grid.width();}
	this.height = function(){return !this._grid ? 0 : this._grid.height();}
	this._NOTENAMES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
	this.NOTENAMES = [];
	for(var i=0;i<128;i++){
		this.NOTENAMES[i]=(this._NOTENAMES[i%12] + ' ' + (Math.floor(i/12)-2) );
	}
	this.WHITEKEYS = {0:0, 2:2, 4:4, 5:5, 7:7, 9:9, 11:11, 12:12};
	this.NOTES = [24, 25, 26, 27, 28, 29, 30, 31, 16, 17, 18, 19, 20, 21, 22, 23, 8, 9, 10, 11, 12, 13, 14, 15, 0, 1, 2, 3, 4, 5, 6, 7];
	this.DRUMNOTES = [12, 13, 14, 15, 28, 29, 30, 31, 8, 9, 10, 11, 24, 25, 26, 27, 4, 5, 6, 7, 20, 21, 22, 23, 0, 1, 2, 3, 16, 17, 18, 19];
	this.SCALENOTES = [36, 38, 40, 41, 43, 45, 47, 48, 24, 26, 28, 29, 31, 33, 35, 36, 12, 14, 16, 17, 19, 21, 23, 24, 0, 2, 4, 5, 7, 9, 11, 12];
	this._KEYCOLORS = [this._colors.BLUE, this._colors.CYAN, this._colors.MAGENTA, this._colors.RED, this._colors.GREEN, this._colors.GREEN, this._colors.GREEN, this._colors.GREEN];
	this.SCALES = 	{'Chromatic':[0,1,2,3,4,5,6,7,8,9,10,11],
				'Major':[0,2,4,5,7,9,11],
				'Minor':[0,2,3,5,7,8,10],
				'Dorian':[0,2,3,5,7,9,10],
				'Mixolydian':[0,2,4,5,7,9,10],
				'Lydian':[0,2,4,6,7,9,11],
				'Phrygian':[0,1,3,5,7,8,10],
				'Locrian':[0,1,3,4,7,8,10],
				'Diminished':[0,1,3,4,6,7,9,10],
				'Whole-half':[0,2,3,5,6,8,9,11],
				'Whole Tone':[0,2,4,6,8,10],
				'Minor Blues':[0,3,5,6,7,10],
				'Minor Pentatonic':[0,3,5,7,10],
				'Major Pentatonic':[0,2,4,7,9],
				'Harmonic Minor':[0,2,3,5,7,8,11],
				'Melodic Minor':[0,2,3,5,7,9,11],
				'Dominant Sus':[0,2,5,7,9,10],
				'Super Locrian':[0,1,3,4,6,8,10],
				'Neopolitan Minor':[0,1,3,5,7,8,11],
				'Neopolitan Major':[0,1,3,5,7,9,11],
				'Enigmatic Minor':[0,1,3,6,7,10,11],
				'Enigmatic':[0,1,4,6,8,10,11],
				'Composite':[0,1,4,6,7,8,11],
				'Bebop Locrian':[0,2,3,5,6,8,10,11],
				'Bebop Dominant':[0,2,4,5,7,9,10,11],
				'Bebop Major':[0,2,4,5,7,8,9,11],
				'Bhairav':[0,1,4,5,7,8,11],
				'Hungarian Minor':[0,2,3,6,7,8,11],
				'Minor Gypsy':[0,1,4,5,7,8,10],
				'Persian':[0,1,4,5,6,8,11],
				'Hirojoshi':[0,2,3,7,8],
				'In-Sen':[0,1,5,7,10],
				'Iwato':[0,1,5,6,10],
				'Kumoi':[0,2,3,7,9],
				'Pelog':[0,1,3,4,7,8],
				'Spanish':[0,1,3,4,5,6,8,10]};
	this.SCALENAMES = [];
	var i = 0;
	for (var name in this.SCALES){this.SCALENAMES[i] = name;i++};
	this._noteMap = new Array(256);
	for(var i=0;i<256;i++){
		this._noteMap[i] = [];
	}
	this.DEFAULT_SCALE = 'Major';
	this.SPLIT_SCALES = {}; //{'DrumPad':1, 'Major':1};
	for(var param in parameters){
		self[param] = parameters[param];
	}
	this._vertOffset = new OffsetComponent(this._name + '_Vertical_Offset', 0, 119, 4, self._update, this._colors.MAGENTA);
	this._scaleOffset = new OffsetComponent(this._name + '_Scale_Offset', 0, self.SCALES.length, 3, self._update, this._colors.BLUE);
	this._noteOffset = new OffsetComponent(this._name + '_Note_Offset', 0, 119, 36, self._update, this._colors.CYAN);
	this._octaveOffset = new OffsetComponent(this._name + '_Note_Offset', 0, 119, 36, self._update, this._colors.YELLOW, this._colors.OFF, 12);
	HexScalesClass.super_.call(this, name, args);
}

inherits(HexScalesClass, Bindable)

HexScalesClass.prototype._button_press = function(button){
	if(button.pressed()){
		debug('button_press:', button._name);
		button.send(127);
	}
	else{
		debug('button_unpress:', button._name);
		button.send(button.scale_color);
	}
}

HexScalesClass.prototype._update = function(){
	this._update_request = false;
	this._noteMap = [];
	for(var i=0;i<128;i++){
		this._noteMap[i] = [];
	}
	if(this._grid instanceof GridClass){
		var width = this.width();
		var height = this.height();
		var offset = this._noteOffset._value;
		var vertoffset = this._vertOffset._value;
		var scale = this.SCALENAMES[this._scaleOffset._value];
		this._current_scale = scale;
		var scale_len = this.SCALES[scale].length;
		for(var column=0;column<width;column++){
			for(var row=0;row<height;row++){
				var note_pos = column + (Math.abs((height-1)-row))*parseInt(vertoffset);
				var note = offset + this.SCALES[scale][note_pos%scale_len] + (12*Math.floor(note_pos/scale_len));
				var button = this._grid.get_button(column, row);
				if(button){
					button.set_translation(note%127);
					this._noteMap[note%127].push(button);
					button.scale_color = this._KEYCOLORS[((note%12) in this.WHITEKEYS) + (((note_pos%scale_len)==0)*2)];
					button.send(button.scale_color);
				}
			}
		}
	}
}

HexScalesClass.prototype.set_grid_function = function(func){this.grid_function = func;}

HexScalesClass.prototype.assign_grid = function(grid){
	post('HexScalesClass assign grid', grid);
	if(this._grid instanceof GridClass){
		this._grid.clear_translations();
		this._grid.remove_listener(this._button_press);
	}
	this._grid = grid;
	if(this._grid instanceof GridClass){
		this._grid.add_listener(this._button_press);
		if(!(this._last_pressed_button instanceof Button)){
			this._last_pressed_button = this._grid.get_button(0, this._grid.height()-1);
		}
	}
	this._update();
}


/*
Make a closure to hold a callback from pattrstorage to use when requesting unloaded
preset data for editing in TR256 since this is the only place we use this call,
we can directly forward the data to the grid
*/

function make_pset_edit_input(num){
	var pset_edit_input = function(){
		var args = arrayfromargs(arguments);
		part[num].edit_buffer = args;
		//post('received input', num, args, '\n');
		//var x=(args.length-1);do{
		//	mod.Send( 'grid', x, num+2, args[x]);
		//}while(x--);
	}
	return pset_edit_input
}

/*
Make a closure to hold a callback from pattrstorage to use when requesting unloaded
preset data for editing in TR256 since this is the only place we use this call,
we can directly forward the data to the grid.
*/

function make_tvel_edit_input(num){
	var pset_tvel_input = function(){
		var args = arrayfromargs(arguments);
		//post('received velocities', num, args, '\n');
		var x=(args.length-1);do{
			mod.Send( 'grid', 'value', x, num+2, part[num].edit_buffer[x]*ACCENTS[Math.floor(args[x]/8)]);
		}while(x--);
	}
	return pset_tvel_input
}

//called by init to initialize state of polys
function init_poly(){
	//poly.message('target', 0);
	mod.Send( 'batch', 'c_grid', 0);
	grid_out('batch', 'grid', 0);
	for(var i=0;i<16;i++){
		part[i].init();
	}
	/*
		part[i].obj.quantize.message('int', part[i].quantize);
		part[i].obj.active.message('int', part[i].active);
		part[i].obj.swing.message('float', part[i].swing);
		part[i].obj.ticks.message(part[i].ticks);
		//part[i].obj.phasor.lock = 1;
		part[i].obj.polyenable.message('int', part[i].polyenable);
		//part[i].obj.phasor.message('float', 0);
		part[i].obj.noteoffset.message('int', (part[i].octave *12) + part[i].root);
		part[i].obj.pattern.message('list', part[i].pattern);
		part[i].obj.note.message('list', part[i].note);
		part[i].obj.velocity.message('list', part[i].velocity);
		part[i].obj.duration.message('list', part[i].duration);
		part[i].obj.notetype.message('int', part[i].notetype);
		part[i].obj.notevalues.message('int', part[i].notevalues);
		part[i].obj.channel.message('int', part[i].channel);
		part[i].obj.behavior_enable.message('int', part[i].behavior_enable);
		//update_note_pattr(part[i]);
	*/
}

//called by init to initialize state of gui objects
function _clear_surface(){
	//debug('clear_surface.');
	stepmodegui.message('int', 0);
}

/*
///////////////////////////
///	 display routines   ///
///////////////////////////
*/

function refresh_pads(){}
function refresh_c_keys(){}
function refresh_grid(){}
function refresh_keys(){}
function refresh_extras(){}
function refresh_adjusters(){}
function refresh_code_buttons(){}

/*
///////////////////////////////////
///// api callbacks and input /////
///////////////////////////////////
*/

//main input sorter for calls from mod.js
function anything(){
	var args = arrayfromargs(arguments);
	//if(DEBUGANYTHING){post('anything', messagename, arguments, '');}
	switch(messagename){
		case 'settingsgui':
			switch(args[0]){
				case 0:
					pad_invoked_key_mode = args[1];
					break;
				case 1:
					timing_immediate = args[1];
					break;
				case 2:
					global_chain_offset = args[1];
					break;
				case 4:
					transpose_steps = args[1];
					break;
				case 14:
					vals = args.slice(1, 9);
					keymodeenables = [];
					for(var i=0;i<8;i++){
						if(vals[i]){
							keymodeenables.push(i);
						}
					}
					debug('keymodeenables', keymodeenables);
					break;
				case 15:
					vals = args.slice(1, 8);
					padmodeenables = args.slice(1, 8);
					padmodeenables = [];
					for(var i=0;i<7;i++){
						if(vals[i]){
							padmodeenables.push(i);
						}
					}
					debug('padmodeenables', padmodeenables);
					break;
			}
			break;
		case 'guibuttons':
			switch(args[0]){
				case 10:
					pad_mode = args[1];
					break;
				case 11:
					key_mode = args[1];
					break;
				case 12:
					global_offset = (Math.max(Math.min(args[1], 96), 0));
					break;
				case 14:
					locked = args[1];
					break;
			}
			break;
		default:
			//debug('anything', messagename, args);
			break;
	}
}

function surface_offset(val){
	grid_offset = val;
}

//input sorter for patcher calls

//called by gui object, sets visible portion of live.step
function _mode(val){
	//debug('mode', val);
	step_mode = val;
	step.message('mode', Modes[step_mode]);
	switch(step_mode){
		default:
			mod.Send( 'code_encoder_grid', 'local', 0);
	}
	// refresh_code_buttons();
	// refresh_adjusters();
}

//from live.step
function _step_in(){
	var args = arrayfromargs(arguments);
	debugstep('step_in', args);
	switch(args[0]){
		case 0:
			break;
		case 1:
			break;
		case 2:
			switch(args[1]){
				case 'changed':
					var new_value = step.getvalueof();
					outlet(3, step_value);
					debugstep('old', step_value);
					outlet(2, new_value);
					break;
			}
		case 3:
			break;
	}
}

//distributes input from gui button and menu elements
function _guibuttons(num, val){
	debug('gui_buttons', num, val);
	switch(num){
		//pad cycle
		case 0:
			//padmodegui.message('int', RemotePModes[Math.max((RemotePModes.indexOf(pad_mode)+1)%3, 0)]);
			if(padmodeenables.length){
				while(padmodeenables.indexOf(pad_mode)==-1){
					pad_mode = (pad_mode+1)%7;
				}
				padmodegui.message('int', padmodeenables[(padmodeenables.indexOf(pad_mode)+1)%padmodeenables.length]);
			}
			break;
		//key cycle
		case 1:
			//keymodegui.message('int', (key_mode+1)%8);
			if(keymodeenables.length){
				while(keymodeenables.indexOf(key_mode)==-1){
					key_mode = (key_mode+1)%8;
				}
				keymodegui.message('int', keymodeenables[(keymodeenables.indexOf(key_mode)+1)%keymodeenables.length]);
			}
			break;
		//rotate
		case 2:
			rotate_pattern(selected, rot_length, -1);
			break;
		//rotate
		case 3:
			rotate_pattern(selected, rot_length, 1);
			break;
		//time value
		case 4:
			selected.obj.set.notevalues(val);{
				selected.obj.set.basetime(TRANS[selected.notetype][val][0]);
				selected.obj.set.timedivisor(TRANS[selected.notetype][val][1]);
				if(timing_immediate){
					selected.obj.nexttime.message('bang');
				}
				BaseTime.message('set', TRANS[selected.notetype][val][0]);
				script['Speed'+(selected.num+1)].message('set', TRANS[selected.notetype][val][1]);
			}
			break;
		//note type
		case 5:
			selected.obj.set.notetype(val);
			var notevalues = selected.notevalues;
			if(notevalues < 8){
				selected.obj.set.basetime(TRANS[val][notevalues][0], presets[selected.num]);
				selected.obj.set.timedivisor(TRANS[val][notevalues][1], presets[selected.num]);
				if(timing_immediate){
					selected.obj.nexttime.message('bang');
				}
				BaseTime.message('set', TRANS[val][notevalues][0]);
			}
			break;
		//time up
		case 6:
			if(selected.notevalues<8){
				notevaluesgui.message('int', Math.max(Math.min(7, parseInt(selected.notevalues)-1), 0));
			}
			else{
				notevaluesgui.message('int', Math.floor(selected.timedivisor / selected.basetime).toString(2).length-1);
				notetypegui.message('set', 0);
			}
			break;
		//time down
		case 7:
			if(selected.notevalues<8){
				notevaluesgui.message('int', Math.max(Math.min(7, parseInt(selected.notevalues)+1), 0));
			}
			else{
				notevaluesgui.message('int', Math.ceil(selected.timedivisor / selected.basetime).toString(2).length);
				notetypegui.message('set', 0);
			}
			break;
		//transpose up
		case 8:
			change_transpose(Math.max(Math.min(global_offset - transpose_steps, 96), 0));
			break;
		//transpose down
		case 9:
			change_transpose(Math.max(Math.min(global_offset + transpose_steps, 96), 0));
			break;
		//pad mode menu
		case 10:
			change_pad_mode(val);
			break;
		//key mode menu
		case 11:
			change_key_mode(val);
			break;
		//transpose menu
		case 12:
			change_transpose(val);
			break;
		//direction menu
		case 13:
			//selected.direction = val;
			//selected.obj.direction.message('int', val);
			selected.obj.set.direction(val);
			break;
		//lock
		case 14:
			debug('lock', val);
			locked = val;
			break;
		//detect device
		case 15:
			detect_devices();
			break;
		//record
		case 16:
			record(val);
			break;
		//play
		case 17:
			play_enabled = val;
			locked = 1;
			break;
	}
}

//displays played notes on grid
function _blink(val){
	//if(DEBUG_BLINK){post('blink', val, '\n');}
	if(grid_mode == 0){
		mod.Send( 'receive_translation', 'keys2_'+last_mask, 'mask', -1);
		mod.Send( 'receive_translation', 'keys2_'+val, 'mask', 5);
	}
	last_mask = val;
}

//displays played notes on keys
function _vblink(num, val){
	debugblink('vblink', val);
	if(grid_mode == 0){
		if(key_mode==0){
			//mod.Send( 'mask', 'c_key', num, val);
			//grid_out('mask', 'key', num, val);
			mod.Send( 'receive_translation', 'keys_'+num, val);
		}
		//mod.Send( 'mask', 'c_grid', num%4, Math.floor(num/4), Blinks[Math.floor(val>0)]);
		//grid_out('mask', 'grid', num, val);
		mod.Send( 'receive_translation', 'pads_'+num, Blinks[Math.floor(val>0)]);
	}
}

//evaluate and distribute data recieved from the settings menu
function _settingsgui(num, val){
	args = arrayfromargs(arguments);
	num = args[0];
	val = args[1];
	switch(num){
		//select+hold option
		case 0:
			pad_invoked_key_mode = val;
			break;
		//immediate timing option
		case 1:
			timing_immediate = val;
			break;
		//global offset
		case 2:
			global_chain_offset = val;
			_select_chain(selected.num);
			break;
		//empty
		case 3:
			break;
		//transpose steps
		case 4:
			transpose_steps = val;
			break;
		//randomize pattern
		case 5:
			randomize_pattern(randomize_global);
			break;
		//randomize velocity
		case 6:
			randomize_velocity(randomize_global);
			break;
		//randomize duration
		case 7:
			randomize_duration(randomize_global);
			break;
		//randomize behavior
		case 8:
			randomize_behavior(randomize_global);
			break;
		//randomize rulebends
		case 9:
			randomize_rulebends(randomize_global);
			break;
		//full reset
		case 10:
			reset_data(randomize_global);
			break;
		//randomize global
		case 12:
			randomize_global = val;
			break;
		//randomize all
		case 11:
			randomize_pattern(randomize_global);
			randomize_velocity(randomize_global);
			randomize_duration(randomize_global);
			randomize_behavior(randomize_global);
			randomize_rulebends(randomize_global);
			break;
		//randomize rules
		case 13:
			randomize_rules();
			break;
		//keymode enables
		case 14:
			vals = args.slice(1, 9);
			keymodeenables = [];
			for(var i=0;i<8;i++){
				if(vals[i]){
					keymodeenables.push(i);
				}
			}
			debug('keymodeenables', keymodeenables);
			break;
		//padmode enables
		case 15:
			vals = args.slice(1, 8);
			padmodeenables = args.slice(1, 8);
			padmodeenables = [];
			for(var i=0;i<7;i++){
				if(vals[i]){
					padmodeenables.push(i);
				}
			}
			debug('padmodeenables', padmodeenables);
			break;
		//behavior enables
		case 16:
			vals = args.slice(1, 17);
			debug('behavior enables:', vals);
			for(var i=0;i<16;i++){
				if(vals[i+1]!=part[i].behavior_enable){
					debug('part', i, 'behavior enable, was', part[i].behavior_enable, ', setting:', vals[i+1]);
					part[i].behavior_enable = vals[i+1];
					part[i].obj.set.behavior(vals[i+1]);
				}
			}
	}
}

//evaluate and distribute data recieved from the behavior graph in the settings menu
function behavegraph_in(behave, bar, val){
	behavegraph[behave][bar] = val;
	if(grid_mode==7){
		mod.Send( 'grid', 'value', behave, bar, BEHAVE_COLORS[val]);
	}
}

//distribute MIDI remote control assignments to their destination
function _remote(num, val){
	switch(num<16){
		case 0:
			_c_grid(num%4, Math.floor(num/4), 1);
			break;
		case 1:
			_c_key(num-16, val);
			break;
	}
}

//distribute
function _receive_automation(num, val){
	if((play_enabled>0)&&(num>110)&&(val!==0)){
		num-=111;
		//if(DEBUG_REC){post('receive auto:', num, val, '\n');}
		if(val>9){
			presets[part[num].num] = val-10;
			//if(DEBUG_REC){post('preset change:', part[num].num+1, presets[part[num].num], '\n');}
			storage.message('recall', 'poly.'+(part[num].num+1), presets[part[num].num]);
		}
		else if(val>0){
			part[num].active = val-1;
			part[num].obj.active.message('int', part[num].active);
			if(pad_mode==2){
				refresh_pads();
			}
			if(key_mode==0){
				refresh_c_keys();
			}
		}
	}
}

function _grid_play(x, y, voice, val, poly){
	//var args = arrayfromargs(arguments);
	debug('_grid_play', x, y, voice, val, poly);
	switch(grid_mode){
		case 2:
			debug('sel:', selected.num, poly);
			if(altVal>0){
				if((voice==0)&&((poly-1)==selected.num)){
					mod.Send( 'grid', 'mask', Math.max(Math.min(x, 15), 0), Math.max(Math.min(y, 15), 0) + 1, val);
				}
			}
			else{
				if((voice>0)&&((poly-1)==selected.num)){
					mod.Send( 'grid', 'mask', Math.max(Math.min(x, 15), 0), Math.max(Math.min(y, 15), 0) + 1, val*voice);
				}
			}
			break;
	}
}


/*
///////////////////////////////
///// data syncronization /////
///////////////////////////////
*/

//called by pattr when it recalls a preset
//need to figure out how to deal with global preset loading....there's missing data doing things this way.
function _recall(){
		debugptr('_recall');
		for(var item in Objs){
			//post(Objs[item], typeof(selected[Objs[item]]), 'retrieving...\n');
			selected.obj.get[Objs[item].Name]();
		}
		selected.nudge = Math.floor(selected.obj.nudge.getvalueof());
		selected.steps = Math.floor(selected.obj.steps.getvalueof());
		selected.root = Math.floor(selected.obj.noteoffset.getvalueof()%12);
		selected.octave = Math.floor(selected.obj.noteoffset.getvalueof()/12);
		var i=15;do{
			part[i].active = part[i].obj.active.getvalueof();
			part[i].quantize = part[i].obj.quantize.getvalueof();
			part[i].pattern = part[i].obj.pattern.getvalueof();
			//script['Speed'+(i+1)].message('set', part[i].ticks);
			update_speed(part[i]);
		}while(i--);

		/*
		update_step();
		refresh_c_keys();
		refresh_pads();
		update_gui();
		if(key_mode>4){
			var i=7;do{
				mod.Send( 'cntrlr_encoder_grid', 'custom', i%4, Math.floor(i/4),  part[i+(8*(selected.num>7))].pattern);
			}while(i--);
			var i=15;do{
				mod.Send( 'code_encoder_grid', 'custom', i%8, Math.floor(i/8),  part[i].pattern);
			}while(i--);
		}
		*/
		//select_pattern(selected.num);
		//refresh_edit_view();
		//refresh_dials();
		//refresh_lcd();
}

//called by pattr when loading a xml preset file
function read(){
	presets = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
	preset = 1;
	storage.message(preset);
}

//called to update data in live.step when changes are made to poly
function update_step(){
	//set_dirty(1);
	step_value = step.getvalueof();
	debugstep('update step: step_value', step_value.length, step_value);
	selected.nudge = parseInt(selected.obj.nudge.getvalueof());
	selected.steps = parseInt(selected.obj.steps.getvalueof());
	step_value[5] = Math.floor(selected.nudge);
	step_value[6] = Math.floor(selected.nudge) + Math.floor(selected.steps) + 1;
	selected.pattern = selected.obj.pattern.getvalueof();
	selected.velocity = selected.obj.velocity.getvalueof();
	selected.duration = selected.obj.duration.getvalueof();
	selected.behavior = selected.obj.behavior.getvalueof();
	selected.rulebends = selected.obj.rulebends.getvalueof();
	selected.note = selected.obj.note.getvalueof();
	var i=15;do{
		var s = 11 + (i*5);
		step_value[s] = selected.note[i];
		step_value[s + 1] = selected.velocity[i];
		step_value[s + 2] = selected.duration[i];
		step_value[s + 3] = selected.pattern[i];
		step_value[s + 4] = selected.rulebends[i];
	}while(i--);
	debugstep('to step', step_value.length, step_value);
	step.setvalueof(step_value);
}

//called to update data in poly when changes are made in livestep
function update_poly(){
	//set_dirty(1);
	var args = arrayfromargs(arguments);
	step_value = step.getvalueof();
	debugstep('update_poly, unmatching args', args);
	var i = args.length;do{
		if(args[i]>10){
			var index = args[i]-11;
			debugstep(args[i]);
			selected.funcs[Funcs[index%5]](Math.floor(index/5), step_value[index+11]);
		}
		else{
			switch(args[i]){
				case 5:
					selected.funcs.stepLoop(step_value[args[i]], step_value[args[i]+1]-1);
					break;
				case 6:
					selected.funcs.stepLoop(step_value[args[i]-1], step_value[args[i]]-1);
					break;
			}
		}
	}while(i--);
}


/*
/////////////////////////
// internal processes  //
/////////////////////////
*/

function change_key_mode(){}
function change_pad_mode(){}
function change_grid_mode(){}
function change_step_mode(){}


function copy_pattern(src, dest){
	debug('copy pattern', src.num, dest.num);
	dest.obj.set.pattern(src.pattern);
}

function copy_preset(part, dest){
	//debug('preset: copy', 'poly.'+(part.num+1), presets[part.num], dest, '\n');
	for(var index in Objs){
		debug('copy', 'poly.'+(part.num+1)+'::'+Objs[index].pattr, presets[part.num], dest);
		var type = Objs[index].pattr;
		var types = {'object':0, 'hidden':0};
		if(!(type in types)){
			part.obj.set[index](part[index], dest);
		}
	}
	//storage.copy('poly.'+(part.num+1), presets[part.num], dest);
	//storage.recall('poly.'+(part.num+1), dest);
}

function copy_global_preset(src, dest){
	debug('copy global preset', 'copy', src, dest);
	storage.copy(src, dest);
	storage.recall(dest);
}

function clear_pattern(dest){
	/*for(var index in Objs)
	{
		//debug('clear', 'poly.'+(part.num+1)+'::'+Objs[index].pattr, dest, '\n');
		var type = Objs[index].pattr;
		var types = {'object':0, 'hidden':0};
		if(!(type in types))
		{
			part.obj.set[index](part[index], dest);
		}
	}*/
	var Part = dest;
	var pset = presets[Part.num];
	Part.obj.set.rulebends(default_pattern.slice());
	Part.obj.set.pattern(default_pattern.slice());
	Part.obj.set.behavior(default_pattern.slice());
	Part.obj.set.velocity(default_velocity.slice());
	Part.obj.set.duration(default_duration.slice());
	Part.obj.set.note(default_pattern.slice());
	Part.obj.set.basetime(1);
	Part.obj.set.timedivisor(4);
	Part.obj.set.notetype(0);
	Part.obj.set.notevalues(2);
	Part.obj.set.active(1);
	debug('clear_pattern', dest.num);
	//storage.copy('poly.'+(part.num+1), 16, dest.num+1);
	//storage.recall('poly.'+(part.num+1), dest.num+1);
}

function clear_global(dest){
	debug('clear_global', dest.num);
	storage.copy(16, dest.num+1);
	storage.recall(dest.num+1);
}

//reset all parts to play from top...quantized
function resync(){
	/*var i=15;do{
		part[i].obj.offset.message('int', 0);
	}while(i--);*/
	messnamed(unique+'resync', 'bang');
}

//reset all parts to play from top...quantized
function resync_single(selected){
	selected.obj.resync.message('bang');
}

//begin or end sequence play from poly_play poly~
function play_sequence(part, note, press){
	if(press>0){
		debug('play sequence', note);
		var trig = part.triggered.indexOf(note);
		//if the num wasn't already being held
		if(trig == -1){
			debug('decoded:', (note>>6)%16, note>>10);
			part.triggered.push(note);
			part.obj.polyplay.message('midinote', note, 1);
		}
		else{
			//find out if num has already been played
			var held = part.held.indexOf(note);
			if(held > -1){
				//remove from the held array since a new sequence has been triggered
				part.held.splice(held, 1);
				part.obj.polyplay.message('midinote', note, 0);
				var trig = part.triggered.indexOf(note);
				if(trig > -1){
					part.triggered.splice(trig, 1);
				}
			}
		}
	}
	else{
		if(part.hold == 0){
			var trig = part.triggered.indexOf(note);
			if(trig > -1){
				part.triggered.splice(trig, 1);
			}
			part.obj.polyplay.message('midinote', note, 0);
		}
		else{
			//add to the held array, so that when hold for part is turned off the note can be flushed
			part.held.push(note);
		}
		refresh_c_keys();
	}
}

//update the current global transposition to all polys
function change_transpose(val){
	if(selected.channel==0){
		debug('global_offset', val);
		global_offset = (Math.max(Math.min(val, 96), 0));
		transposegui.message('set', global_offset);
		for(var i = 0;i< 16;i++){
			//this isn't stored with a preset
			//part[i].obj.noteoffset.message('int', global_offset + i);
			part[i].obj.set.noteoffset(global_offset+i);
		}
		_select_chain(selected.num);
	}
}

//called from key_in, change the loopOut point and update it to live.step and poly
function change_Out(val){
	debug('change Out', val);
	selected.obj.set.steps(val-parseInt(selected.nudge));
	update_step();
	refresh_c_keys();
}

//called from key_in, change the loopIn point and update it to the live.step and poly
function change_In(val){
	debug('change In', val);
	var change = parseInt(selected.nudge) - val;
	selected.nudge = val;
	if(timing_immediate){
		selected.obj.set.nudge(selected.nudge);
		selected.steps += change;
		selected.obj.set.steps(selected.steps);
	}
	else{
		selected.obj.nudge.message('set', selected.nudge);
		selected.obj.set.nudge(selected.nudge, 0);
		//storage.setstoredvalue('poly.'+(selected.num+1)+'::nudgepattr', presets[selected.num], selected.nudge);
		selected.steps += change;
		selected.obj.set.steps(selected.steps);
		selected.obj.restart.message('bang');
	}
	update_step();
	refresh_c_keys();
}

//add a note from the pads to the appropriate poly, and trigger a message back from it
function add_note(part){
	debug('add_note', part.num);
	part.obj.addnote.message('bang');
	part.pattern[curSteps[part.num]]=1;
	part.obj.set.pattern(part.pattern);
	if((edit_preset == presets[part.num])&&(grid_mode==1)){
		storage.getstoredvalue('poly.'+(part.num+1)+'::pattern', edit_preset);
	}
	if(part==selected){
		step.message('extra1', 1, selected.pattern);
		step.message('zoom', 1, 1);
		refresh_c_keys();
		mod.Send( 'cntrlr_encoder_grid', 'custom', selected.num%4, Math.floor(selected.num/4)%2,  selected.pattern);
		mod.Send( 'code_encoder_grid', 'custom', selected.num%8, Math.floor(selected.num/8),  selected.pattern);
	}
}

function play_note(part){
	debug('play_note', part.num);
	part.obj.addnote.message('bang');
}

//rotate the pattern based on the blocksize defined in the main patch
function rotate_pattern(part, len, dir){
	//post('rotate_pattern', len, dir, '\n');
	var bits = Math.ceil(16/len);
	var Out;
	var In;
	if(dir < 0){
		for(var i=0;i<bits;i++){
			Out = Math.min(parseInt((len*(i+1))-1), 15);
			In = len*i;
			part.pattern.splice(Out, 0, parseInt(part.pattern.splice(In, 1)));
			part.velocity.splice(Out, 0, parseInt(part.velocity.splice(In, 1)));
			part.duration.splice(Out, 0, parseInt(part.duration.splice(In, 1)));
			part.note.splice(Out, 0, parseInt(part.note.splice(In, 1)));
		}
	}
	else{
		for(var i=0;i<bits;i++){
			Out = len*i;
			In = Math.min(parseInt((len*(i+1))-1), 15);
			part.pattern.splice(Out, 0, parseInt(part.pattern.splice(In, 1)));
			part.velocity.splice(Out, 0, parseInt(part.velocity.splice(In, 1)));
			part.duration.splice(Out, 0, parseInt(part.duration.splice(In, 1)));
			part.note.splice(Out, 0, parseInt(part.note.splice(In, 1)));
		}
	}
	var pset = presets[part.num];
	part.obj.set.pattern(part.pattern);
	part.obj.set.velocity(part.velocity);
	part.obj.set.duration(part.duration);
	part.obj.set.note(part.note);
	update_step();
	refresh_c_keys();
}

//change the display on the CNTRLR encoder rings to reflect the current play position when in freewheel mode
function rotate_wheel(num, pos){
	if(codec_handler){
		var _num = num-1;
		mod.Send( 'code_encoder_grid', 'value', _num%8, Math.floor(_num/8), pos);
	}
	if(pad_mode==5){
		if((selected.num<8)&&(num<9)){
			var _num = num-1;
			if(grid_mode == 0){mod.Send( 'cntrlr_encoder_grid', 'value', _num%4, Math.floor(_num/4), pos);}
		}
		else if((selected.num>7)&&(num>8)){
			var _num = num-9;
			if(grid_mode == 0){mod.Send( 'cntrlr_encoder_grid', 'value', _num%4, Math.floor(_num/4), pos);}
		}
	}
	switch(grid_mode){
		case 0:
			//debug('rotate_wheel', num, pos, '\n');
			if((key_mode==5)&&(num==selected.num+1)){
				//post('current_step', num, pos, '\n');
				mod.Send( 'receive_translation', 'keys2_'+(selected.note[current_step]), 'mask', -1);
				mod.Send( 'receive_translation', 'keys2_'+(selected.note[pos]), 'mask', 5);
			}
			break;
		case 1:
			//tr256 mode
			var _num = num-1;
			if((_num<14)&&(preset==edit_preset)){
				mod.Send( 'grid', 'mask', curSteps[_num], _num+2, -1);
				mod.Send( 'grid', 'mask', pos, _num+2, 5+(_num==selected.num));
			}
			break;
		case 2:
			if(altVal>0){}
			break;
		case 3:
			//cafe mode
			//var pat = part[num-1].pattern.slice();
			var _num=num-1, Part = part[_num];
			//debug('cafe_pos', _num, Part.clutch)
			if(Part.clutch > 0){
				var i=15;do{
						mod.Send( 'grid', 'value', i, _num, Part.pattern[(pos+i)%16]);
				}while(i--);
			}
			break;
		case 4:
			//boingg mode
			var _num=num-1;
			if(part[_num].active>0){
				mod.Send( 'grid', 'mask', _num, curSteps[_num], -1);
				mod.Send( 'grid', 'mask', _num, pos, 1);
			}
			break;
		default:
			break;
	}
	current_step = pos;
	curSteps[num-1] = pos;
}

//synchronize two parts when holding down select while selecting another part
function sync_wheels(master, slave){
	debug('sync_wheels', master.num, slave.num);
	if(slave.lock != master.lock){
		slave.lock = master.lock;
		slave.obj.set.quantize(slave.lock);
		mod.Send( 'cntrlr_encoder_grid', 'green', slave.num%4, Math.floor(slave.num/4)%2,  slave.lock);
		if(codec_handler){mod.Send( 'code_encoder_grid', 'green', slave.num%8, Math.floor(slave.num/8),  slave.lock);}
	}
	/*switch(master.lock)
	{
		case 0:
			//slave.obj.set.ticks(master.ticks);
			break;
		case 1:
			slave.obj.set.notevalues(master.notevalues);
			slave.obj.set.notetype(master.notetype);
			break;
	}*/
	slave.obj.set.timedivisor(master.obj.timedivisor.getvalueof());
	slave.obj.set.basetime(master.obj.basetime.getvalueof());
	update_speed(slave);
}

//change the variables necessary to change the quantization status of a part
function change_lock_status(part, dir){
	//if(DEBUG_LOCK){post('change_lock_status', part.num, '\n');}
	if(dir==undefined){dir = 0;}
	if(part==selected){
		update_gui();
	}
	mod.Send( 'cntrlr_encoder_grid', 'green', part.num%4, Math.floor(part.num/4)%2,	 part.notevalues<8);
	mod.Send( 'code_encoder_grid', 'green', part.num%8, Math.floor(part.num/8), part.notevalues<8);
	update_speed(part);
}

//update the current value reflected on the invisible ui speed controls
function update_speed(part){
	part.notevalues = part.obj.notevalues.getvalueof();
	part.notetype = part.obj.notetype.getvalueof();
	debugptr('update_speed');
	//script['Speed'+(part.num+1)].message('set', part.obj.timedivisor.getvalueof());
}

//release any polyplay sequences from being held when the hold key is turned off
function release_held_sequences(part){
	//post('release held seqs', part.held, '\n');
	for(var i in part.held){
		part.obj.polyplay.message('midinote', part.held[i], 0);
		var trig = part.triggered.indexOf(part.held[i]);
		if(trig > -1){
			part.triggered.splice(trig, 1);
		}
	}
	part.held = [];
}

//change the hold state of the selected polyplay object
function poly_hold_toggle(){
	selected.hold = Math.abs(selected.hold-1);
	//mod.Send( 'c_button', 3, 2, selected.hold);
	//grid_out('default', 'button', 3, 2, selected.hold);
	if(grid_mode==0){mod.Send( 'receive_translation', 'buttons_'+6, 'value', selected.hold);}
	if(grid_mode==3){
		refresh_grid();
	}
	if(selected.hold<1){
		release_held_sequences(selected);
	}
}

//set the dirty flag so that parts sequence is saved when selecting a new part or preset
function set_dirty(val){
	dirty=val;
	post('dirty:', val);
}


/*	  automation	 */

//enable recording of preset changes and mutes to a live.clip
function record(val){
	if(val > 0){
		record_enabled = begin_record();
	}
	else{
		record_enabled = 0;
	}
	//if(DEBUG_REC){post('record_enabled', record_enabled, '\n');}
}

//check api for current clip and return confirmation of recording
function begin_record(){
	finder.goto('this_device');
	finder.goto('canonical_parent');
	var playing_slot_index = parseInt(finder.get('playing_slot_index'));
	//if(DEBUG_REC){post('playing_slot_index:', playing_slot_index, '\n');}
	if(playing_slot_index>=0){
		finder.goto('clip_slots', playing_slot_index, 'clip');
		autoclip.id = parseInt(finder.id);
	}
	return (parseInt(autoclip.id)>0);
}

//add automation steps directly to the attached Live clip
function add_automation(part, type, val){
	if(record_enabled){
		autoclip.call('select_all_notes');
		var notes = autoclip.call('get_selected_notes');
		var num = parseInt(notes[1]);
		switch(type){
			case 'mute':
				new_notes = notes.slice(2, -1).concat(['note', part.num+111, Math.round(autoclip.get('playing_position')*100)/100, .2, val+1, 0]);
				break;
			case 'preset':
				new_notes = notes.slice(2, -1).concat(['note', part.num+111, Math.round(autoclip.get('playing_position')*100)/100, .2, val+10, 0]);
				break;
		}
		//if(DEBUG_REC){post('notes:', new_notes, '\n');}
		finder.call('replace_selected_notes');
		finder.call('notes', num+1);
		for(var i = 0;i<new_notes.length;i+=6){
			finder.call('note', new_notes[i+1], new_notes[i+2]+.001, new_notes[i+3]+.001, new_notes[i+4], new_notes[i+5]);
		}
		finder.call('done');
		//if(DEBUG_REC){post('new_notes:', finder.call('get_selected_notes'), '\n');}
	}
}

function receive_record(note, val){
	if(grid_mode==1){
		if(val>0){
			var i=15;do{
				if(note==part[i].noteoffset){
					var Part=part[i], pat= Part.edit_buffer, cur_step=curSteps[i];
					Part.edit_buffer[cur_step] = 1;
					Part.pattern = Part.edit_buffer;
					Part.obj.pattern.message('list', Part.edit_buffer);
					Part.edit_velocity[cur_step] = val;
					Part.velocity = Part.edit_velocity;
					Part.obj.velocity.message('list', Part.edit_velocity);
					Part.recdirty=1;
					if(i<14){
						mod.Send( 'grid', 'value',	cur_step, i+2, ACCENTS[Math.floor(val/8)]);
					}
					if(i==selected.num){
						refresh_c_keys();
						step.message('velocity', 1, selected.velocity);
						step.message('extra1', 1, selected.pattern);
						step.message('zoom', 1, 1);
					}
				}
			}while(i--);
		}
	}
}

function set_record(val){
	rec_enabled=val;
	if(!rec_enabled){
		storage.message('store', preset);
	}
	this.patcher.getnamed('midiout').subpatcher().getnamed('recgate').message(rec_enabled);
}


/*	 settings		*/


//all of these do , pretty much what they say
function randomize_pattern(global){
	if(global>0){
		debug('global pattern random');
		var h=15;do{
			var i=15;do{
				var seq = [];
				var j=15;do{
					seq[j]=Math.round(Math.random());
				}while(j--);
				part[i].obj.set.pattern(seq, h+1);
			}while(i--);
		}while(h--);
	}
	else{
		var i=15;do{
			var j=15;do{
				part[i].pattern[j]=Math.round(Math.random());
			}while(j--);
			part[i].obj.set.pattern(part[i].pattern);
		}while(i--);
	}
	update_step();
	refresh_c_keys();
}

function randomize_notes(global){
	if(global>0){
		debug('global pattern random');
		var h=15;do{
			var i=15;do{
				var seq = [];
				var j=15;do{
					seq[j]=Math.round(Math.random()*16);
				}while(j--);
				part[i].obj.set.note(seq, h+1);
			}while(i--);
		}while(h--);
	}
	else{
		var i=15;do{
			var j=15;do{
				part[i].note[j]=Math.round(Math.random()*16);
			}while(j--);
			part[i].obj.set.note(part[i].note);
		}while(i--);
	}
	update_step();
	refresh_c_keys();
}

function randomize_velocity(global){
	if(global){
		var h=15;do{
			var i=15;do{
				var seq = [];
				var j=15;do{
					seq[j]=Math.round(Math.random()*127);
				}while(j--);
				part[i].obj.set.velocity(seq, h+1);
			}while(i--);
		}while(h--);
	}
	else{
		var i=15;do{
			var j=15;do{
				part[i].velocity[j]=Math.floor(Math.random()*127);
			}while(j--);
			part[i].obj.set.velocity(part[i].velocity);
		}while(i--);
	}
	update_step();
}

function randomize_duration(global){
	if(global){
		var h=15;do{
			var i=15;do{
				var seq = [];
				var j=15;do{
					seq[j]=Math.round(Math.random()*7);
				}while(j--);
				part[i].obj.set.duration(seq, h+1);
			}while(i--);
		}while(h--);
	}
	else{
		var i=15;do{
			var j=15;do{
				part[i].duration[j]=Math.floor(Math.random()*7);
			}while(j--);
			part[i].obj.set.duration(part[i].duration);
		}while(i--);
	}
	update_step();
}

function randomize_rulebends(global){
	if(global){
		var h=15;do{
			var i=15;do{
				var seq = [];
				var j=15;do{
					seq[j]=Math.round(Math.random()*15);
				}while(j--);
				part[i].obj.set.rulebends(seq, h+1);
			}while(i--);
		}while(h--);
	}
	else{
		var i=15;do{
			var j=15;do{
				part[i].rulebends[j]=Math.floor(Math.random()*15);
			}while(j--);
			part[i].obj.set.rulebends(part[i].rulebends);
		}while(i--);
	}
	update_step();
}

function randomize_behavior(global){
	if(global){
		var h=15;do{
			var i=15;do{
				var seq = [];
				var j=15;do{
					seq[j]=Math.round(Math.random()*7);
				}while(j--);;
				part[i].obj.set.behavior(seq, h+1);
			}while(i--);
		}while(h--);
	}
	else{
		var i=15;do{
			var j=15;do{
				part[i].behavior[j]=Math.round(Math.random()*7);
			}while(j--);
			part[i].obj.set.behavior(part[i].behavior);
		}while(i--);
	}
	if(key_mode == 2){
		refresh_c_keys();
	}
}

function randomize_rules(){
	var i=6;do{
		var j=7;do{
			rulemap.message(i, j, Math.round(Math.random()*7));
		}while(j--);
	}while(i--);
}

function reset_data(global){
	var i=15;do{
		var Part = part[i];
		var pset = presets[Part.num];
		Part.obj.set.rulebends(default_pattern.slice());
		Part.obj.set.pattern(default_pattern.slice());
		Part.obj.set.behavior(default_pattern.slice());
		Part.obj.set.velocity(default_velocity.slice());
		Part.obj.set.duration(default_duration.slice());
		Part.obj.set.note(default_pattern.slice());
		Part.obj.set.basetime(1);
		Part.obj.set.timedivisor(4);
		Part.obj.set.notetype(0);
		Part.obj.set.notevalues(2);
		Part.obj.set.active(1);
	}while(i--);
	if(global){
		var h=16;do{
			storage.message('store', h);
		}while(h--);
	}
	update_step();
	refresh_c_keys();
}

function init_storage(){
	debug('init_storage');
	var storage = this.patcher.getnamed('storage');
	var i=15;do{
		storage.setstoredvalue('poly.'+(i+1)+'::swingpattr', 1, .5);
		storage.setstoredvalue('poly.'+(i+1)+'::stepspattr', 1, 15);
		storage.setstoredvalue('poly.'+(i+1)+'::directionpattr', 1, 0);
		storage.setstoredvalue('poly.'+(i+1)+'::randompattr', 1, 0);
		storage.setstoredvalue('poly.'+(i+1)+'::nudgepattr', 1, 0);
		storage.setstoredvalue('poly.'+(i+1)+'::rulebends', 1, default_pattern.slice());
		storage.setstoredvalue('poly.'+(i+1)+'::pattern', 1, default_pattern.slice());
		storage.setstoredvalue('poly.'+(i+1)+'::behavior', 1, default_pattern.slice());
		storage.setstoredvalue('poly.'+(i+1)+'::velocity', 1, default_velocity.slice());
		storage.setstoredvalue('poly.'+(i+1)+'::duration', 1, default_duration.slice());
		storage.setstoredvalue('poly.'+(i+1)+'::note', 1, default_pattern.slice());
		storage.setstoredvalue('poly.'+(i+1)+'::basetimepattr', 1, 1);
		storage.setstoredvalue('poly.'+(i+1)+'::timedivisorpattr', 1, 4);
		storage.setstoredvalue('poly.'+(i+1)+'::notetypepattr', 1, 0);
		storage.setstoredvalue('poly.'+(i+1)+'::notevaluepattr', 1, 2);
		storage.setstoredvalue('poly.'+(i+1)+'::active', 1, 1)
		storage.setstoredvalue('poly.'+(i+1)+'::behavior_enable', 1, 1);
	}while(i--);
	storage.message(1);
	var h=16;do{
		storage.message('store', h);
	}while(h--);
	debug('done!');
}

//update gui elements to reflect current data
function update_gui(){
	debug('update_gui');
	directiongui.message('set', selected.obj.direction.getvalueof());
	notevaluesgui.message('set', selected.obj.notevalues.getvalueof());
	notetypegui.message('set', selected.obj.notetype.getvalueof());
	Random.message('set', selected.obj.random.getvalueof());
	Groove.message('set', (selected.obj.swing.getvalueof()*100)-50);
	Channel.message('set', selected.obj.channel.getvalueof());
	Mode.message('set', selected.obj.mode.getvalueof());
	BaseTime.message('set', selected.obj.basetime.getvalueof());
	PolyOffset.message('set', selected.obj.polyoffset.getvalueof());
	Speed.message('set', script['Speed'+(selected.num+1)].getvalueof());
	BaseGross.message('set', Math.floor(selected.obj.basetime.getvalueof()));
	BaseFine.message('set', selected.obj.basetime.getvalueof()%1);
	SpeedGross.message('set', Math.floor(selected.obj.timedivisor.getvalueof()));
	SpeedFine.message('set', selected.obj.timedivisor.getvalueof()%1);
	// if((pad_mode == 6)||(key_mode == 6)){
	// 	//mod.Send( 'c_button', 3, 2, selected.hold);
	// 	//grid_out('default', 'button', 3, 2, selected.hold);
	// 	mod.Send('receive_translation', 'buttons_'+6, selected.hold);
	// }
}

//update the current bank assignment in Python
function update_bank(){
	if(codec_handler){
		mod.Send( 'code_encoder_grid', 'local', 0);
		var i=15;do{
			var x = i%8;
			var y = Math.floor(i/8);
			mod.Send( 'code_encoder_grid', 'mode', x, y, 4);
			mod.Send( 'code_encoder_grid', 'mode', x, y+2, 5);
			mod.Send( 'code_encoder_grid', 'custom', x, y, part[i].pattern);
			mod.Send( 'code_encoder_grid', 'green', x, y,	 part[i].lock);
		}while(i--);
	}
	switch(pad_mode){
		default:
			//mod.Send( 'receive_device', 'set_mod_device_bank', selected.channel>0);
			//mod.Send( 'set_device_bank', selected.channel>0);
			//mod.Send( 'receive_device', 'set_mod_device_bank', selected.channel>0 ? 1 : drumgroup_is_present ? 0 : 1);
			mod.Send( 'receive_device', 'set_mod_device_bank', selected.channel>0 ? 1 : drumgroup_is_present ? 0 : 1);
			mod.Send( 'cntrlr_encoder_grid', 'local', 1);

			/*var i=7;do{
				params[Encoders[i]].hidden = 0;
				params[Speeds[i]].hidden = 1;
				params[Speeds[i+8]].hidden = 1;
			}while(i--);*/
			break;
		case 5:
			mod.Send( 'receive_device', 'set_mod_device_bank', 2+(selected.num>7));
			mod.Send( 'cntrlr_encoder_grid', 'local', 0);
			var r = (selected.num>7)*8;
			var i=7;do{
				/*params[Encoders[i]].hidden = 1;
				params[Speeds[i]].hidden = selected.num>7;
				params[Speeds[i+8]].hidden = selected.num<8;*/
				var x = i%4;
				var y = Math.floor(i/4);
				mod.Send( 'cntrlr_encoder_grid', 'mode', x, y, 4);
				mod.Send( 'cntrlr_encoder_grid', 'custom', x, y, part[i+r].pattern);
				mod.Send( 'cntrlr_encoder_grid', 'green', x, y,	 part[i+r].lock);
			}while(i--);
			var i=3;do{
				mod.Send( 'cntrlr_encoder_grid', 'mode', i, 2,	5);
				mod.Send( 'cntrlr_encoder_grid', 'green', i, 2, 0);
			}while(i--);
			break;
	}
	rotgate.message('int', codec_handler||((pad_mode==5)||(key_mode==5)||(grid_mode==1)||(grid_mode==2)||(grid_mode==3)||(grid_mode==4)));
}

/*///////////////////////////
//	   Device Component	   //
//		  and LCD		   //
///////////////////////////*/

var pns=[];
var mps=[];
var found_device = 0;
var params = [];
var dials = [];

var Encoders = ['Encoder_0', 'Encoder_1', 'Encoder_2', 'Encoder_3', 'Encoder_4', 'Encoder_5', 'Encoder_6', 'Encoder_7', 'Encoder_8', 'Encoder_9', 'Encoder_10', 'Encoder_11'];
var Speeds = ['Speed1', 'Speed2', 'Speed3', 'Speed4', 'Speed5', 'Speed6', 'Speed7', 'Speed8', 'Speed9', 'Speed10', 'Speed11', 'Speed12', 'Speed13', 'Speed14', 'Speed15', 'Speed16'];
var Dials = ['Channel', 'Groove', 'Random', 'BaseTime', 'GlobSpeed', 'PolyOffset', 'Mode', 'RotSize', 'Speed'];
var Dial_Mappings = ['Encoder_8', 'Encoder_9', 'Encoder_10', 'Encoder_11', 'Encoder_11', 'Encoder_4', 'Encoder_5', 'Encoder_10', 'Encoder_6'];
Warning = ['missing', 'device', 'assignment', 'for', 'the', 'currently', 'selected', 'channel', ' ', ' ', ' ', ' '];

// called from init
function init_device(){
	mod.Send('receive_device', 'set_mod_device_type', 'Hex');
	mod.Send( 'receive_device', 'set_number_params', 16);
	for(var dev_type in HEX_BANKS){
		for(var bank_num in HEX_BANKS[dev_type]){
			mod.SendDirect('receive_device_proxy', 'set_bank_dict_entry', dev_type, bank_num, HEX_BANKS[dev_type][bank_num]);
		}
		//mod.Send('receive_device_proxy', 'update_parameters');
	}
	//debug('current parameters:', mod.Send('receive_device_proxy', 'current_parameters'));
	mod.Send('code_encoders_to_device', 'value', 1);
	mod.Send('create_alt_device_proxy', '_codec_device_proxy');
	for(var dev_type in CODEC_HEX_BANKS){
		for(var bank_num in CODEC_HEX_BANKS[dev_type]){
			mod.SendDirect('receive_alt_device_proxy', '_codec_device_proxy', 'set_bank_dict_entry', dev_type, bank_num, CODEC_HEX_BANKS[dev_type][bank_num]);
		}
	}
	mod.Send( 'receive_alt_device_proxy', '_codec_device_proxy', 'set_number_params', 32);
	mod.Send( 'receive_alt_device_proxy', '_codec_device_proxy', 'set_mod_device_bank', 0);
	mod.Send( 'receive_alt_device_proxy', '_codec_device_proxy', 'fill_parameters_from_device');
	mod.Send( 'receive_alt_device_proxy', '_codec_device_proxy', 'set_params_report_change', 0);
	mod.Send( 'receive_alt_device_proxy', '_codec_device_proxy', 'set_params_control_prefix', 'CodecEncoder');
	//mod.Send( 'receive_alt_device_proxy', '_codec_device_proxy', 'set_mod_device', 'id', );
	//debug('parameters from client property:', mod.finder.get('parameters'));
	finder = new LiveAPI(function(){}, 'this_device');
	pns['device_name']=this.patcher.getnamed('device_name');
	for(var i=0;i<12;i++){
		pns[Encoders[i]]=this.patcher.getnamed('pn'+(i+1));
		pns[Encoders[i]].message('text', ' ');
		mps[Encoders[i]]=this.patcher.getnamed('mp'+(i+1));
		mps[Encoders[i]].message('text', ' ');
		params[Encoders[i]]=this.patcher.getnamed(Encoders[i]);
		params[Encoders[i]].message('set', 0);
	}
	for(var i=0;i<8;i++){
		params[Speeds[i]] = this.patcher.getnamed(Speeds[i]);
		params[Speeds[i+8]] = this.patcher.getnamed(Speeds[i+8]);
	}
	for(var i=0;i<9;i++){
		params[Dials[i]]=this.patcher.getnamed(Dial_Mappings[i]);
		params[Dials[i]].message('set', 0);
	}
	detect_drumrack();
}

function detect_devices(){
	this.patcher.getnamed('devices').front();
}

function detect_drumrack(){
	//setup the initial API path:
	if(devices[0] > 0){
		devices[0] = check_device_id(devices[0], selected.channel);
	}
	if(devices[0] == 0){
		finder.goto('this_device');
		var this_id = parseInt(finder.id);
		finder.goto('canonical_parent');
		var track_id = parseInt(finder.id);
		var found_devices = finder.getcount('devices');
		for (var i=0;i<found_devices;i++){
			finder.id = track_id;
			finder.goto('devices', i);
			if(finder.get('class_name')=='DrumGroupDevice'){
				drumgroup_is_present = true;
				//debug("DrumRack found");
				devices[0] = parseInt(finder.id);
				//if(DEBUG){post('DrumRack found', devices[0], '\n');}
				break;
			}
		}
	}
	if(devices[0] == 0){
		showerror();
	}
	else{
		hideerror();
		_select_chain(selected.num)
		//report_drumrack_id();
	}
}

//called fram pattr that stores any device id that was selected by the user last session
function set_devices(){
	var ids = arrayfromargs(arguments);
	debug('set_devices', ids);
	devices = ids;
}

//find the appointed_device
function detect_device(channel){
	debug('select_device');
	finder.goto('live_set', 'appointed_device');
	debug('device id ==', finder.id);
	if(check_device_id(parseInt(finder.id), channel)>0){
		_select_chain(selected.num);
	}
	//this.patcher.getnamed('devices').wclose();
}

//check to make sure previous found_device is valid
function check_device_id(id, channel){
	var found = 0;
	debug('device_id', id);
	if(id>0){
		if(channel == 0){
			finder.id = id;
			if(finder.get('class_name')=='DrumGroupDevice'){
				drumgroup_is_present = true;
				found = parseInt(finder.id);
				debug('found at:', finder.get('name'));
			}
			else{
				finder.goto('canonical_parent');
				finder.goto('canonical_parent');
				if(finder.get('class_name')=='DrumGroupDevice'){
					drumgroup_is_present = true;
					found = parseInt(finder.id);
					debug('found at 2nd pass: ', finder.get('name'));
				}
			}
		}
		else{
			finder.id = id;
			found = parseInt(finder.id);
			debug('non-drumrack found at:', finder.get('name'));
		}
	}
	devices[channel] = found;
	this.patcher.getnamed('devices').subpatcher().getnamed('devices').message('list', devices);
	return found;
}

//send the current chain assignment to mod.js
function _select_chain(chain_num){
	//debug('select_chain', chain_num, selected.channel, devices[selected.channel]);
	if((selected.channel==0)&&(drumgroup_is_present)){
		//debug( 'send_explicit', 'receive_device_proxy', 'set_mod_device_parent', 'id', devices[selected.channel] );
		mod.Send( 'send_explicit', 'receive_device_proxy', 'set_mod_device_parent', 'id', devices[selected.channel]);
		mod.Send( 'receive_device_proxy', 'set_mod_drum_pad', Math.max(0, Math.min(chain_num + global_offset - global_chain_offset, 112)));
	}
	else{
		//debug( 'send_explicit', 'receive_device', 'set_mod_device_parent', 'id', devices[selected.channel], 1);
		mod.Send('send_explicit', 'receive_device_proxy', 'set_mod_device_parent', 'id', devices[selected.channel], 1);

	}
	//mod.Send( 'receive_device', 'refresh_lcd');
	if(devices[selected.channel]==0){
		showerror();
	}
	update_bank();
}

//sort calls to the internal LCD
function _lcd(obj, type, val){
	//post('new_lcd', obj, type, val, '\n');
	debuglcd('lcd', obj, type, val);
	if((type=='lcd_name')&&(val!=undefined)){
		if(pns[obj]){
			pns[obj].message('text', val.replace(/_/g, ' '));
		}
	}
	else if((type == 'lcd_value')&&(val!=undefined)){
		if(mps[obj]){
			mps[obj].message('text', val.replace(/_/g, ' '));
		}
	}
	else if((type == 'encoder_value')&&(val!=undefined)){
		if(params[obj]){
			params[obj].message('set', val);
		}
	}
}

//distribute gui knobs to their destinations
function _encoder(num, val){
	debug('encoder in', num, val);
	if(num<12){
		mod.Send( 'receive_device_proxy', 'set_mod_parameter_value', num, val);
	}
	else{
		switch(num){
			case 12:
				//neither are pattr linked
				//selected.channel = val;
				//selected.polyenable = selected.channel > 0;
				//selected.obj.polyenable.message('int', selected.polyenable);
				selected.obj.set.polyenable(val>0);
				//selected.obj.channel.message('int', selected.channel);
				selected.obj.set.channel(val);
				_select_chain(selected.num);
				break;
			case 13:
				//selected.swing = (val+50)/100;
				//selected.obj.swing.message('float', selected.swing);
				selected.obj.set.swing((val+50)/100);
				post('swing val', val);
				break;
			case 14:
				//selected.random = val;
				//selected.obj.random.message('float', selected.random);
				selected.obj.set.random(val);
				break;
			case 15:
				rot_length = val;
				break;
			case 16:
				//not pattr linked or exposed
				//selected.repeat = val;
				//selected.obj.repeat.message('int', selected.repeat);
				//selected.obj.set.repeat(val);
				selected.obj.set.basetime(val);
				break;
			case 17:
				//global speed
				break;
			case 18:
				//not pattr linked
				//selected.polyoffset = val;
				//selected.obj.polyoffset.message('int', selected.polyoffset);
				selected.obj.set.polyoffset(val);
				break;
			case 19:
				//selected.mode = val;
				//selected.obj.mode.message('int', selected.mode);
				selected.obj.set.mode(val);
				break;
			case 20:
				//repeat
				break;
			case 21:
				script['Speed'+(selected.num+1)].message('int', val);
				break;
		}
	}
}

//called from invisible ui controls that the MonoDeviceComponent latches to in 2nd/3rd bank indexes
function _speed(num, val){
	debug('speed', num, val);
	var new_time = 8, Part = part[num];
	if(TIMES[val]){
		new_time = TIMES[val+''];
	}
	if(new_time!=Part.notevalues){
		Part.obj.set.notevalues(new_time);
	}
	Part.obj.set.timedivisor(val);
	if(Part == selected){
		notevaluesgui.message('set', new_time);
	}
	Part.obj.nexttime.message('bang');
}


function _adjust(num, val){
	//debug('adjust', num, val, '\n');
	switch(STEPMODES[step_mode]){
		case 'rulebends':
			var value = Math.floor(val/8);
			if(selected.rulebends[num]!=value){
				selected.rulebends[num]=value;
				selected.obj.set.rulebends(selected.rulebends);
				step.message('extra2', num+1, value);
			}
			break;
		case 'velocity':
			var value = Math.floor(val/8);
			if(Math.floor(selected.velocity[num]/8)!=value){
				selected.velocity[num]=value*8;
				selected.obj.set.velocity(selected.velocity);
				step.message('velocity', num+1, value*8);
			}
			break;
		case 'duration':
			var value = Math.floor(val/16);
			if(selected.duration[num]!=value){
				selected.duration[num]=value;
				selected.obj.set.duration(selected.duration);
				step.message('duration', num+1, value);
			}
			break;
		case 'pitch':
			break;
	}
}

//called from visible ui elements and distributed to MonoDeviceComponent in 2nd/3rd bank indexes
function set_speed(num, val){
	debug('set_speed', num, val);
	script['Speed'+(num+1)].message('set', val);
	_speed(num, val);
}

//Used for UI warning. Uses the lcd objects to display an error message.
function showerror(){
	pns.device_name.message('text', 'Detect Instrument');
	for(var i=0;i<8;i++){
		pns[Encoders[i]].message('text', Warning[i]);
		mps[Encoders[i]].message('text', ' ');
	}
}

function showerror(){}

//Used for UI warning.	Uses the lcd objects to display an error message.
function hideerror(){
	//pns.device_name.message('text', 'Drumrack Found');
	for(var i=0;i<12;i++){
		pns[Encoders[i]].message('text', ' ');
	}
}

// make a closure to hold the setter function for any object in the poly patcher that is contained in the Objs dict
function make_obj_setter(part, obj){
	if(obj.pattr == 'hidden'){
		var setter = function(val){
			if(val!=undefined){
				//debug('setter hidden', obj.Name, val, '\n');
				var num = part.num;
				part[obj.Name] = val;
				part.obj[obj.Name].message(obj.Type, val);
			}
		}
	}
	else if(obj.pattr == 'object'){
		if(obj.Type == 'bang'){
			var setter = function(val){
				if(val!=undefined){
					//debug('setter bang\n');
					part[obj.Name].message('bang');
				}
			}
		}
		else{
			var setter = function(val){
				//debug('setter object\n');
				if(val!=undefined){
					part[obj.Name] = val;
					part.obj[obj.Name].message(obj.Type, val);
				}
			}
		}
	}
	else{
		var setter = function(val, pset){
			if(val!=undefined){
				//debug('setter pattr\n');
				var num = part.num;
				if(!pset){
					var pset = presets[num];
					part[obj.Name] = val;
					part.obj[obj.Name].message(obj.Type, val);
				}
				//debug('storing', obj.Name, 'in', obj.pattr, 'at', pset, 'with', val, '\n');
				storage.setstoredvalue('poly.'+(num+1)+'::'+obj.pattr, pset, val);
			}
		}
	}
	return setter;
}

// make a closure to hold the getter function for any object in the poly patcher that is contained in the Objs dict
function make_obj_getter(part, obj){
	if(part.obj[obj.Name].understands('getvalueof')){
		var getter = function(){
			part[obj.Name] = part.obj[obj.Name].getvalueof();
		}
	}
	else{
		var getter = function(){
			return;
		}
	}
	return getter;
}

function make_obj_setter(part, obj){
	return function(){};
}

function make_obj_getter(part, obj){
	return function(){};
}

forceload(this);
