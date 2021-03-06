autowatch = 1;

/**TODO:
*  All control elements need to be abstracted so that messages sent to remote
*  client are handled by the same object as those going to elements in the main
*  patcher.
*  Somekind of async server/client for Commander integration.
*/

var unique = jsarguments[1];

aumhaa = require('_base');
util = require('aumhaa_util');
//util.inject(this, util);
var FORCELOAD = true;
var DEBUG = true;
var NODE_DEBUG = false;
var SHOW_TREE_DICT = false;
var SHOW_LIB_DICT = false;
var EDITOR_OPEN = true;
var BATCH_OPEN = false;
aumhaa.init(this);
var script = this;

Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});

var Alive = false;
var _name = jsarguments[0];
var dbg = new DebugNamespace(script._name+' async=>').debug;
var finder;
var library_directory = undefined;
var library_base = undefined;
var libraryObj = {};
var filetreeDict = new Dict('filetree');
var nodeScriptInitialized = false;
var suppress_rescan = false;
var VALID_FILE_TYPES = ['.aupreset', '.adg', '.adv', '.wav', '.aif', '.json'];

var finder;
var mod;
var found_mod;
var mod_finder;
var Mod = ModComponent.bind(script);
var ModProxy = ModProxyComponent.bind(script);

var BROWSERXSIZE = 796;
var BROWSERYSIZE = 360;
var BATCHXSIZE = 203;
var BATCHYSIZE  = 480;
var MULTITAG_DELAY = 250;

function anything(){}

function init(){
  debug('init', this._name);
  finder = new LiveAPI();
  setup_tasks();
  setup_library();
  setup_patcher();
  setup_browser();
  setup_batch_editor();
  setup_fileinfo();
  setup_filetree();
  setup_filetagger();
  setup_tagfilter();
  setup_tagchooser();
  setup_filterchooser();
  setup_targetchooser();
  setup_preview();
  setup_controls();
  setup_modes();
  setup_mainfx_button();
  setup_tagmode_button();
  setup_mod();
  setup_nodescript();
  NODE_DEBUG&&node_debug.front();
  //editor._floatToggle.receive(1);
  initialize_nodescript();
}

function setup_tasks(){
	script['tasks'] = new TaskServer(script, 20);
}

function setup_library(){
  script.libraryDict = new Dict('library');
}

function setup_patcher(){
  script.node_script = this.patcher.getnamed('node_script');
  script.browser_patcher = this.patcher.getnamed('browser');
  script.current_selected_file = browser_patcher.subpatcher().getnamed('current_selected_file');
  script.selected_file_tags = browser_patcher.subpatcher().getnamed('selected_file_tags');
  script.tag_buffer_display = browser_patcher.subpatcher().getnamed('tag_buffer_display');
  script.libPath = this.patcher.getnamed('libPath');
  script.EditorButton = this.patcher.getnamed('Editor');
  script.ParentBackButton = browser_patcher.subpatcher().getnamed('parent_back_button');
  script.ChildrenBackButton = browser_patcher.subpatcher().getnamed('children_back_button');
  script.mira_gate = this.patcher.getnamed('mira_gate');
  script.node_debug = this.patcher.getnamed('node_debug');
  script.restart_button = this.patcher.getnamed('restart_button');
  script.select_library_button = this.patcher.getnamed('select_library_button');
  script.preview_button = browser_patcher.subpatcher().getnamed('preview_button');
  script.bufferObj = this.patcher.getnamed('preview_buffer');
  script.playObj = this.patcher.getnamed('preview_play');
  script.sfplayObj = this.patcher.getnamed('preview_sfplay');
  script.waveform = browser_patcher.subpatcher().getnamed('waveform');
  script.BatchButton = this.patcher.getnamed('BatchButton');
  script.batch_patcher = this.patcher.getnamed('batch_editor');
  restart_button.hidden = 0;
  restart_button.message('text', 'LOADING');

  show_lib_dict();
  show_tree_dict();
  //need to zero out all input and feedback windows here so there's no confusion while patching
}

function setup_browser(){
  script.parentChooser = new CellBlockChooserComponent('ParentChooser', {
    obj:browser_patcher.subpatcher().getnamed('parent_chooser'),
    row_height:16,
    multiSelect:false,
    reselect:true
  });
  script.toParentChooser = parentChooser.input;

  script.childChooser = new CellBlockChooserComponent('ChildChooser', {
    obj:browser_patcher.subpatcher().getnamed('child_chooser'),
    row_height:16,
    multiSelect:false,
    reselect:true
  });
  script.toChildChooser = childChooser.input;

  script.file_chooser = new CellBlockChooserComponent('FileChooser', {
    obj:browser_patcher.subpatcher().getnamed('filechooser'),
    row_height:16,
    multiSelect:false,
    reselect:true
  });
  script.toFileChooser = file_chooser.input;

  script.tag_chooser = new SpecialCellBlockChooserComponent('TagChooser', {
    obj:browser_patcher.subpatcher().getnamed('tagchooser'),
    row_height:16,
    multiSelect:true
  });
  script.toTagChooser = tag_chooser.input;

  var obj = browser_patcher;
	var pcontrol = this.patcher.getnamed('editor_pcontrol');
	var thispatcher = obj.subpatcher().getnamed('thispatcher');
	var window_position = obj.subpatcher().getnamed('window_position');
  script.editor = new FloatingWindowModule('Editor', {
    'window_position':window_position,
    'thispatcher':thispatcher,
    'pcontrol':pcontrol,
    'obj':obj,
    'sizeX':BROWSERXSIZE,
    'sizeY':BROWSERYSIZE,
    'nominimize':true,
    'nozoom':false,
    'noclose':true,
    'nogrow':true,
    'notitle':false,
    'float':false
  });
  editor.lock();
  script.browserInput = function(){
    var args = arrayfromargs(arguments);
    if(args[0]=='close'){
      EditorButton.message('set', 0);
    }
    try{
      editor[args[0]].apply(editor, args.slice(1));
    }
    catch(err){
      util.report_error(err);
    }
  }
}

function setup_batch_editor(){
  var obj = batch_patcher;

  script.batch_display = new CellBlockChooserComponent('BatchDisplay', {
    obj:obj.subpatcher().getnamed('batch_display'),
    row_height:16,
    multiSelect:false,
    reselect:true
  });
  script.toBatchDisplay = batch_display.input;

  var search_filter_text = obj.subpatcher().getnamed('filefilter');
  var tag_buffer_text = obj.subpatcher().getnamed('tagbuffer');
  var recursive_toggle = obj.subpatcher().getnamed('batch_recursive_toggle');
  var pcontrol = this.patcher.getnamed('batch_editor_pcontrol');
  var thispatcher = obj.subpatcher().getnamed('thispatcher');
  var window_position=  obj.subpatcher().getnamed('window_position');
  script.batchEditor = new FloatingWindowModule('BatchEditor', {
    'window_position':window_position,
    'thispatcher':thispatcher,
    'pcontrol':pcontrol,
    'obj':obj,
    'sizeX':BATCHXSIZE,
    'sizeY':BATCHYSIZE,
    'nominimize':true,
    'nozoom':false,
    'noclose':true,
    'nogrow':true,
    'notitle':false,
    'float':false,
    'batch_display':batch_display
  });
  batchEditor.lock();
  script['batchInput'] = function(){
    var args = arrayfromargs(arguments);
    if(args[0]=='close'){
      BatchButton.message('set', 0);
    }
    try{
      batchEditor[args[0]].apply(batchEditor, args.slice(1));
    }
    catch(err){
      util.report_error(err);
    }
  }
  script.FilenameFilter = new FilenameFilterComponent('FilenameFilter', {
    batch_display:batch_display,
    search_filter_text:search_filter_text,
    tag_buffer_text:tag_buffer_text,
    recursive_toggle_button:recursive_toggle
  });
  script.toFilenameFilter = FilenameFilter.input;

  batch_display.set_target(function(obj){
    debug('batch_display input:', obj, obj._value);
    if(obj._doublepressed){
      FilenameFilter.input.apply(FilenameFilter, ['select_file'].concat(obj._value));
    } else {
      FilenameFilter.input.apply(FilenameFilter, ['select_file'].concat(obj._value));
    }
  });
}

function setup_fileinfo(){
  fileInfo = new FileInfoComponent('FileInfoComponent', {});
  // fileInfo._active_tags.add_listener(tag_chooser.set_marked);
  tag_chooser.set_active_tag_notifier(fileInfo._active_tags);

}

function setup_filetree(){
  script.filetreeDict = new Dict('filetree');
  script['FileTree'] = new FileTreeComponent('FileTree', {
    browser:browser_patcher,
    dict:filetreeDict,
    parentChooser:parentChooser,
    filesChooser:childChooser,
    // Defer:filetreeDefer,
  });
  script['toFileTree'] = FileTree.input;
  parentChooser.set_target(function(obj){
    // debug('parentChooser input:', obj, obj._value);
    if(obj._doublepressed){
      FileTree.input.apply(FileTree, ['open_parent'].concat(obj._value));
    } else {
      FileTree.input.apply(FileTree, ['select_parent'].concat(obj._value));
    }
  });
  childChooser.set_target(function(obj){
    if(obj._doublepressed){
      // debug('childChooser input:', obj, obj._value);
      FileTree.input.apply(FileTree, ['open_child'].concat(obj._value));
    } else {
      FileTree.input.apply(FileTree, ['select_child'].concat(obj._value));
    }
  });
  //FileTree._init;
}

function setup_filetagger(){
  script['FileTagger'] = new FileTaggerComponent('FileTagger', {
  });
  script['toFileTagger'] = FileTagger.input;
  file_chooser.set_target(function(obj){
    debug('file_chooser input:', obj, obj._value, obj._doublepressed);
    if(obj._doublepressed){
      FileTagger.input.apply(FileTagger, ['chooser_double'].concat(obj._value));
    } else {
      FileTagger.input.apply(FileTagger, ['chooser_single'].concat(obj._value));
    }
  });
  tag_chooser.set_tag.add_listener(FileTagger.toggle_tag_listener);
}

function setup_tagfilter(){
  script['TagFilter'] = new TagFilterComponent('TagFilter', {
  });
  script['toTagFilter'] = TagFilter.input;
  tag_chooser.set_target(function(obj){
    debug('tag_chooser input:', obj, obj._value);
    TagFilter.input.apply(TagFilter, ['tag_selection'].concat(obj._value));
  });
}

function setup_tagchooser(){
  script.tagChooser = new AssignTagDisplayComponent('TagChooser', {});
}

function setup_filterchooser(){
  script.filterChooser = new FilterTagDisplayComponent('FilterChooser', {onValue:6, offValue:3});
}

function setup_targetchooser(){
  script.targetChooser = new TargetChooserComponent('TargetChooser', {onValue:6, offValue:3});
  TagFilter.on('FilteredHashListUpdated', targetChooser.set_target_choices);
}

function setup_preview(){
  this.previewPlayer = new PreviewPlayerComponent('PreviewPlayer', {waveform:waveform, bufferObj:bufferObj, playObj:playObj, sfplayObj:sfplayObj});
  script.toPreviewPlayer = previewPlayer.input;
}

function setup_mod(){
  var init_callback = function(val){
    debug('mod.init_callback');
    if(val){
       mod = found_mod;
       MainModes.change_mode(2);
       MainModes.set_mode_cycle_button(KeyButtons[7]);
    }
  }
  mod = new ModProxy(script, ['Send', 'SendDirect', 'restart']);
  found_mod = new Mod(script, script._name, unique, false, {'name':'PT', 'init_callback':init_callback});
	// found_mod.debug = debug;
  var mod_callback = function(args){
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
	mod_finder = new LiveAPI(mod_callback, 'this_device');
	found_mod.assign_api(mod_finder);
}

function setup_nodescript(){
  // debug('setup_nodescript');
  script['NSProxy'] = new NodeScriptProxy('NSProxy', {obj:node_script,
                                                      cabled:false,
                                                      debug:NODE_DEBUG,
                                                      debugTyes:['error']});
  script['asyncResolve'] = NSProxy.asyncResolve;
  script['nodeDump'] = NSProxy.nodeDump;
  script['toNSProxy'] = NSProxy.receive;

  var restart_task = new Task(initialize_nodescript, this);
  var on_nodescript_terminated = function () {
    debug('on_nodescript_terminated');
    // restart_task.schedule(1000);
    Alive = false;
    nodeScriptInitialized = true;
    EditorButton.message(0);
    editor.close();
    BatchButton.message(0);
    batchEditor.close();
    restart_button.hidden = 0;
    restart_button.message('text', 'RESTART');
  }

  NSProxy.addTerminationCallback(on_nodescript_terminated);
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
		KeysControlRegistry.register_control(id, KeyButtons[id]);
		Keys.add_control(id, 0, KeyButtons[id]);
	}

	//script['DetentDial'] = new ControlClass(0, 'DetentDial', {'_send':make_send_func('detent_dial', 'value')});


	script['_grid'] = function(x, y, val){GridControlRegistry.receive(x+(y*8), val);}
	script['_key'] = function(num, val){KeysControlRegistry.receive(num, val);}
	script['_shift'] = function(val){ShiftButton.receive(val);}
	script['_alt'] = function(val){AltButton.receive(val);}
}

function setup_tests(){
  debug('setup_tests');
  // NSProxy.asyncCall('test_function', 'blah', true)
  // .then(function(res){
  //   debug('test_function success', res)})
  // ['catch'](function(e){
  //   debug('test_function failure', e.message);
  // });
  // FileTree.find_file('/Users/amounra/Music/Ableton/User Library/Presets/Audio Effects/Audio Effect Rack Test/@d_12 Instrument FX 043020.adg');
  // debug('tags:', fileInfo.active_tags);
}

function setup_modes(){

	//Page 1:  tagPage
	script.tagPage = new Page('tagPage');
	tagPage.enter_mode = function()
	{
		debug('tagPage entered');
    KeyButtons[0]._send_text('<');
    KeyButtons[1]._send_text('>');
    KeyButtons[6]._send_text('FileAccess');
    mainFxButton.set_control(KeyButtons[2]);
    tagChooser.offset.set_inc_dec_buttons(KeyButtons[1], KeyButtons[0]);
    tagChooser.assign_grid(Grid);
    fileInfo.fileAccessButton.set_control(KeyButtons[6]);
	}
	tagPage.exit_mode = function()
	{
    fileInfo.fileAccessButton.set_control();
    tagChooser.offset.set_inc_dec_buttons();
    tagChooser.assign_grid();
    KeyButtons[0]._send_text(' ');
    KeyButtons[1]._send_text(' ');
    KeyButtons[6]._send_text(' ');
		debug('tagPage exited');
	}
	tagPage.update_mode = function()
	{
		debug('tagPage updated');
		if(tagPage._shifted)
		{
			debug('tagPage._shifted');
		}
		else if(mainPage._alted)
		{
			debug('tagPage._alted');
		}
		else
		{
			tagPage.enter_mode();
		}
	}

  //Page 2:  filterPage
	script.filterPage = new Page('filterPage');
	filterPage.enter_mode = function()
	{
		debug('filterPage entered');
    filterChooser.assign_grid(Grid);
    filterChooser.offset.set_inc_dec_buttons(KeyButtons[1], KeyButtons[0]);
    TagFilter._filterMode.set_control(KeyButtons[5]);
    mainFxButton.set_control(KeyButtons[2]);
    TagFilter.ClearFilter.set_control(KeyButtons[3]);
    tagModeButton.set_control(KeyButtons[6]);
    KeyButtons[0]._send_text('<');
    KeyButtons[1]._send_text('>');
	}
	filterPage.exit_mode = function()
	{
    TagFilter._filterMode.set_control();
    TagFilter.ClearFilter.set_control();
    filterChooser.offset.set_inc_dec_buttons();
    mainFxButton.set_control();
    tagModeButton.set_control();
    filterChooser.assign_grid();
    KeyButtons[0]._send_text(' ');
    KeyButtons[1]._send_text(' ');
    KeyButtons[5]._send_text(' ');
		debug('filterPage exited');
	}
	filterPage.update_mode = function()
	{
		debug('filterPage updated');
		if(filterPage._shifted)
		{
			debug('filterPage._shifted');
		}
		else if(filterPage._alted)
		{
			debug('filterPage._alted');
		}
		else
		{
			filterPage.enter_mode();
		}
	}

  //Page 2:  selectPage
	script.selectPage = new Page('selectPage');
  selectPage.enter_mode = function()
	{
		debug('selectPage entered');
    targetChooser.assign_grid(Grid);
    targetChooser.offset.set_inc_dec_buttons(KeyButtons[1], KeyButtons[0]);
    //TagFilter._filterMode.set_control(KeyButtons[6]);
    TagFilter.ClearFilter.set_control(KeyButtons[3]);
    mainFxButton.set_control(KeyButtons[2]);
    tagModeButton.set_control(KeyButtons[6]);
    KeyButtons[0]._send_text('<');
    KeyButtons[1]._send_text('>');
	}
	selectPage.exit_mode = function()
	{
    //TagFilter._filterMode.set_control();
    TagFilter.ClearFilter.set_control();
    targetChooser.offset.set_inc_dec_buttons();
    mainFxButton.set_control();
    tagModeButton.set_control();
    targetChooser.assign_grid();
    KeyButtons[0]._send_text(' ');
    KeyButtons[1]._send_text(' ');
    //KeyButtons[6]._send_text(' ');
		debug('selectPage exited');
	}
	filterPage.update_mode = function()
	{
		debug('selectPage updated');
		if(selectPage._shifted)
		{
			debug('selectPage._shifted');
		}
		else if(selectPage._alted)
		{
			debug('selectPage._alted');
		}
		else
		{
			selectPage.enter_mode();
		}
	}

	script.MainModes = new SpecialPageStack(3, 'MainMode', {
    mode_colors:[2,4,6],
    mode_labels:['TagMode', 'FilterMode', 'SelectMode']
  });
	MainModes.add_mode(0, tagPage);
  MainModes.add_mode(1, filterPage);
  MainModes.add_mode(2, selectPage);
  MainModes.add_listener(function(obj){
    debug('new mode is:', obj._value);
  });
  MainModes.mode_cycle_value = function(button){
    if(button.pressed()){
      MainModes.change_mode(MainModes._value == 1 ? 2 : 1);
    }
    MainModes.notify();
  }
}

function setup_mainfx_button(){
  script.mainFxButton = new TextMomentaryParameter('MainFXButton', {
    value:0,
    onValue:1,
    offValue:0,
    textOnValue:'mainfx',
    textOffValue:'mainfx'
  });
  mainFxButton.add_listener(function(obj){
    //debug('MainFXButton.pressed');
    if(obj._control.pressed()){
      TagFilter.clear_filter();
      if(TagFilter.tag_list.indexOf('mainfx')>-1){
        debug('setting mainfx');
        TagFilter._selected_tags.receive(['mainfx']);
        MainModes.change_mode(2);
      }
    }
  });
}

function setup_tagmode_button(){
  script.tagModeButton = new TextMomentaryParameter('TagModeButton', {
    value:0,
    onValue:1,
    offValue:0,
    textOnValue:'TagMode',
    textOffValue:'TagMode'
  });
  tagModeButton.add_listener(function(obj){
    debug('TagMode.pressed');
    if(obj._control.pressed()){
      MainModes.change_mode(0);
    }
  });
}



function initialize_nodescript(){
  NSProxy.initialize().then(function(res){
    debug('SCRIPT', 'success', JSON.stringify(res));
    NSProxy.asyncCall('init_from_js').then(function(path){
      debug('returned from init_from_js', path);
      node_script_initialized(path);
    }).catch(function(err){
      debug('NSProxy setup error:', err.message);
      util.report_error(err);
      if(err.message=='no library path'){
        select_library_button.message(1);
        node_script_initialized();
      };
    });
  }).catch(function(e){
    util.report_error(e);
  });
}

function node_script_initialized(libdir_from_nodescript){
  debug('node_script_initialized:', libdir_from_nodescript);
  nodeScriptInitialized = true;
  library_directory = libdir_from_nodescript;
  library_base = library_directory.split(basename(library_directory))[0];
  debug('NSProxy init finished');
  // deprivatize_script_functions(script);
  library_directory&&activate();
}

function activate(){
  debug('activate');
  library_updated();
  // TagFilter.clear_filter();
  restart_button.hidden = 1;
  if(EDITOR_OPEN){
    editor.open();
    EditorButton.message(1);
  };
  if(BATCH_OPEN){
    batchEditor.open();
    BatchButton.message(1);
  };
  Alive = true;
  DEBUG&&setup_tests();
}


/** called from nodescript instance when it starts its update*/
function on_file_changed(){
  if(!fileInfo._needs_to_update){
    fileInfo.report_update(true);
    // scan_library();
    refresh_libraryObj();
  }
}

/** this function recieves a request from node to
reload only the specific file that has changed*/
function on_specific_file_changed(){
  var args = arrayfromargs(arguments);
  var filename = args[0];
  var tags = args.slice(1);
  debug('on_specific_file_changed', filename, 'tags:', tags, typeof tags);
  if(libraryObj[filename]){
    libraryObj[filename].tags = tags;
  }
  if(!fileInfo._needs_to_update){
    fileInfo.report_update(true);
    FileTree.update_file(filename);
    TagFilter.refresh();
    FileTagger.refresh();
    fileInfo.update();
  }
  show_lib_dict();
  show_tree_dict();
  fileInfo.report_update(false);
}

/** called from nodescript instance when it finishes its update*/
function library_updated(){
  debug('library_updated triggered...');
  libraryObj = dict_to_jsobj(libraryDict);
  FileTree.update_files();
  TagFilter.refresh();
  FileTagger.refresh();
  fileInfo.update();

  show_lib_dict();
  show_tree_dict();

  // debug('...library_updated finished');
  fileInfo.report_update(false);
}

/** called from nodescript instance when it finishes its update*/
function library_updated_light(){
  debug('library_updated_light triggered...');
  libraryObj = dict_to_jsobj(libraryDict);
  TagFilter.refresh();
  FileTagger.refresh();
  fileInfo.update();

  show_lib_dict();
  show_tree_dict();

  // debug('...library_updated finished');
  fileInfo.report_update(false);
}



function from_commander(){
  var args = arrayfromargs(arguments);
  debug('from_commander:', args);
  if(Alive){
    switch(args[0]){
      case 'toFileTree':
        if(args[1]=='select_parent'){
          FileTree.input.apply(FileTree, args.slice(1));
        }
        else if(args[1]=='chooser'){
          if(TagFilter.selected_tags.length){
            if(FileTagger.selection_mode_value==false){
              FileTagger.chooser_single.apply(FileTagger, args.slice(2));
            }
            else{
              FileTagger.chooser_double.apply(FileTagger, args.slice(2));
            }
          }
          else{
            if(FileTagger.selection_mode_value==false){
              FileTree.select_child.apply(FileTree, args.slice(2));
            }
            else{
              FileTree.open_child.apply(FileTree, args.slice(2));
            }
          }
        }
        break;
      case 'tag_selection':
        debug('tag_selection:', args.slice());
        TagFilter.tag_selection_from_commander.apply(TagFilter, args.slice());
        break;
      case 'filter_mode':
        TagFilter._filterMode.set_value(args[1]);
        break;
      case 'clear_filter':
        TagFilter.clear_filter();
        break;
      case 'selection_mode':
        FileTagger.set_selection_mode(args[1]);
        break;
      case 'update_remote_display':
        debug('sending command....');
        update_remote_display();
        break;
      // case 'Next':
      //   Next();
      //   break;
      // case 'Prev':
      //   Prev();
      //   break;
      case 'OpenPreset':
        OpenPreset();
        break;
    }
  }
}

function update_remote_display(){
  // debug()
  FileTree.refresh();
  // refresh_tagchooser();
  TagFilter.redraw_tagchooser();
  messnamed('from_preset_tagger', 'and_or', 'set', TagFilter.filter_mode_value);
}

function unlock_editor(){
  editor.unlock();
}

function restart(){
  init();
}



//FileTreeComponent
function scan_library(){
  NSProxy.asyncCall('scan_library').then(function(res){
    library_updated();
  }).catch(function(e){
    debug('scan_library error:', e.message);
  })
}

function refresh_libraryObj(){
  NSProxy.asyncCall('scan_library').then(function(res){
    library_updated_light();
  }).catch(function(e){
    debug('scan_library error:', e.message);
  })
}

//FileTreeComponent
function set_library(){
  var args = arrayfromargs(arguments);
  debug('set_library:', args);
  NSProxy.asyncCall('set_library', args).then(function(res){
    debug('SET_LIBRARY response:', res);
    if(!Alive){
      activate();
    }
    else {
      library_updated();
    }
  }).catch(function(e){
    util.report_error(e);
  })
}

//FileTreeComponent
function restore_snapshot(){
  var args = arrayfromargs(arguments);
  debug('restore_snapshot:', args);
  NSProxy.asyncCall('restore_snapshot', args).then(function(res){
    debug('restore_snapshot response:', res);
    library_updated();
  });
}

//FileTreeComponent
function set_global_path(){
  // debug('set_global_path');
  NSProxy.asyncCall('set_global_path').then(function(res){
    debug('new global path is::', res);
  }).catch(function(e){
    debug('set_global_path error:', e.message);
  });
}

function show_lib_dict(){
  SHOW_LIB_DICT&& this.patcher.getnamed('library').message('wclose');
  SHOW_LIB_DICT&& this.patcher.getnamed('library').message('edit');
}

function show_tree_dict(){
  SHOW_TREE_DICT&&this.patcher.getnamed('filetree').message('wclose');
  SHOW_TREE_DICT&&this.patcher.getnamed('filetree').message('edit');
}



function PreviewPlayerComponent(name, args){
  var self = this;
  this._waveform = undefined;
  this._bufferObj = undefined;
  this._playObj = undefined;
  this._sfplayObj = undefined;
  this._togglePreview = new ToggledParameter(this._name + '_Toggle', {value:0, onValue:1,offValue:7});
  this.add_bound_properties(this, ['_waveform', '_preview', 'preview', 'input', '_playObj', '_bufferObj', '_sfplayObj']);
  PreviewPlayerComponent.super_.call(this, name, args);
  this._init.call(this);
}

util.inherits(PreviewPlayerComponent, Bindable);

PreviewPlayerComponent.prototype._init = function(){
  this._waveform.gridcolor = [0, 0, 0, 1];
  preview_button.message('bgcolor', [.2, .2, .2, 1]);
}

PreviewPlayerComponent.prototype.input = function(){
  var args = arrayfromargs(arguments);
  debug(this._name, 'input:', args);
  if(args[0] in this){
    this[args[0]].apply(this, args.slice(1));
  }
}

PreviewPlayerComponent.prototype.preview = function(filename){
  this._togglePreview._Callback({_value:1});
  if(this._togglePreview._value){
    fileInfo._filepath.add_listener(this._preview);
    this._preview(fileInfo._filepath);
    preview_button.message('bgcolor', [0, .2, .8, 1]);
    editor._sizeY = BROWSERYSIZE+102;
    editor.lock();
  }
  else{
    fileInfo._filepath.remove_listener(this._preview);
    preview_button.message('bgcolor', [.2, .2, .2, 1]);
    editor._sizeY = BROWSERYSIZE;
    editor.lock();
  }
}

PreviewPlayerComponent.prototype._preview = function(obj){
  var file = fileInfo.selected_file;
  // debug('preview', obj._value);
  var f = new File(file, 'read');
  var type = f.filetype;
  f.close()
  if((type=='AIFF')||(type=='WAVE')){
    this._bufferObj.message('sizeinsamps', 20000);
    this._bufferObj.message('read', file);
    //this._bufferObj.message('open');
    // this._sfplayObj.message('open', file);
    this._playObj.message('start', 0, 200000, 200000);
    // this._sfplayObj.message('seek', 0, 20000);
  }
}



function FileInfoComponent(name, args){
  var self = this;
  this._shortname = new ParameterClass('Shortname', {value:undefined});
  this._filepath = new ParameterClass('SelectedFile', {value:undefined});
  this._active_tags = new ArrayParameter('Active_Tags', {value:[]});
  this._needs_to_update = false;
  this._obj = undefined;
  this._flush_task = new Task(this._flush_changed_tags, this);
  this.fileAccessButton = new MomentaryParameter(this._name + '_FileAccess', {value:0, onValue:5, offValue:1});
  this.add_bound_properties(this, ['_flush_changed_tags',
    'buffer_tags',
    '_flush_task',
    '_needs_to_update',
    'fileAccessButton'
  ]);
  FileInfoComponent.super_.call(this, name, args);
}

util.inherits(FileInfoComponent, Bindable);

FileInfoComponent.prototype._init = function(){

}

FileInfoComponent.prototype.__defineGetter__('selected_file', function(){
  return this._filepath._value;
})

FileInfoComponent.prototype.__defineGetter__('active_tags', function(){
  return this._active_tags._value
})

FileInfoComponent.prototype.__defineGetter__('shortname', function(){
  return this._shortname._value;
})

FileInfoComponent.prototype.buffer_tags = function(tags){
  // var tags = arrayfromargs(arguments);
  debug('buffer_tags:', tags);
  this._needs_to_update = true;
  if(this._flush_task.running){
    this._flush_task.cancel();
  }
  this._flush_task.schedule(MULTITAG_DELAY);
  this._active_tags.set_value(tags);
}

FileInfoComponent.prototype._flush_changed_tags = function(){
  this._needs_to_update = false;
  FileTagger.set_tags(this.selected_file, this.active_tags);
}

FileInfoComponent.prototype.select_file = function(filepath){
  this._needs_to_update&&this._flush_changed_tags();
  this._filepath.set_value(filepath);
  // this._active_tags.set_value(filepath in libraryObj ? libraryObj[filepath].tags : []);
  this.update();
}

FileInfoComponent.prototype.update = function(){
  //need to check to make sure the file is still valid
  this._active_tags.set_value(this.selected_file in libraryObj ? libraryObj[this.selected_file].tags : []);
  // #libraryObj_removal
  // var tags = FileTree.node_for_path(this.selected_file);
  // this._active_tags.set_value(tags?tags:[]);
  this.refresh();
}

FileInfoComponent.prototype.refresh = function(){
  var tags = this.active_tags;
  var path = this.selected_file;
  selected_file_tags.message('set', tags ? tags : '');
  current_selected_file.message('set', path ? '...'+path.slice(-58) : '');
}

FileInfoComponent.prototype.report_update = function(val){
  if(val){
    // debug('report_update true');
    current_selected_file.message('bgfillcolor', 1, 0, 0, 1);
    current_selected_file.message('set', 'ACCESSING FILES...');
    this.fileAccessButton.set_value(1);
  }
  else{
    // debug('report_update false');
    current_selected_file.message('bgfillcolor', .2, .5, 1, 1);
    this.fileAccessButton.set_value(0);
  }
}


/**
*  Component deals with all file-structure browser navigation tasks.
*  Basically everything in the left two browser windows.
*/
function FileTreeComponent(name, args){
  var self = this;
	this.add_bound_properties(this, [
    'init_parent_node',
    'input',
    'select_parent',
    'select_child',
    'open_child',
    '_parentChooser',
    '_filesChooser',
    '_treeobj',
    'current_parent_node',
    'current_child_node',
    '_dict',
    '_treeobj',
    'empty_child_node',
    'parent_list',
    'child_list',
    'selected_parent_path',
    'selected_child_path',
    'Defer',
    'miraDefer',
    'find_file',
    '_miraParentChooser',
    '_miraFilesChooser',
    '_always_select_first_item',
    'update_libraryObj',
    'scan_library',
    'scan_folder',
    '_browser_tree',
    'create_primary_node',
    'create_secondary_node',
    'refresh_browser_pane',
    '_current_root',
    'new_parent_list',
    'new_child_list',
    'new_select_parent',
    'new_select_child',
    'current_parent_path',
    'current_child_path',
    'refresh_editor',
    'refresh_mira'
  ]);
  this._current_root = new MomentaryParameter(this._name+'_CurrentRoot', {value:undefined});
	FileTreeComponent.super_.call(this, name, args);
  // this._treeobj = util.dict_to_jsobj(this._dict);
  this._treeobj = {name:'root',
    root:undefined,
    root_path:undefined,
    parents:[],
    parent: undefined,
    children:{}
  };
  this.current_parent_node = this._treeobj;
  this.current_child_node = undefined;
  this.current_parent_path = undefined;
  this.current_child_path = undefined;
  this._browser_tree = {};
  this.parent_list = [];
  this.child_list = [];
  this.new_parent_list = [];
  this.new_child_list = [];
  this._always_select_first_item = true;
  // this.selected_parent_path = undefined;
  // this.selected_child_path = undefined;
  this._init();
}

util.inherits(FileTreeComponent, Bindable);

FileTreeComponent.prototype.__defineGetter__('current_root', function(){
  return this._current_root._value
})

FileTreeComponent.prototype._init = function(args){
  debug('FileTreeComponent._init', this.current_parent_node);
  // this.init_parent_node();
  this._current_root.add_listener(this.refresh_browser_pane);
}

FileTreeComponent.prototype.input = function(){
  /**distributes input to Class instance to its available methods*/
  var args = arrayfromargs(arguments);
  //debug('FileTree.input:', args);
  try{
    this[args[0]].apply(this, args.slice(1));
  }
  catch(err){
    util.report_error(err);
  }
}

FileTreeComponent.prototype.init_parent_node = function(){
  //used to make sure that when refreshing, some undefined vars don't cause exception in this.refresh
  if((!this.current_parent_node)||(!this._treeobj.name)){
    // debug('FileTree.init_parent_node', !this.current_parent_node, this._treeobj.name);
    this.current_parent_node = this._treeobj.children[Object.keys(this._treeobj.children)];
  }
  this.init_parent_path();
}

FileTreeComponent.prototype.init_parent_path = function(){
  if((!this.current_parent_path)||(!this._browser_tree.name)){
    this.create_primary_node(library_directory);
    this.current_parent_path = this._browser_tree.children[Object.keys(this._browser_tree.children)];
  }
}

FileTreeComponent.prototype.update_files = function(){
  debug('FileTree.update_files');
  // this._treeobj = util.dict_to_jsobj(this._dict);
  this.scan_library();
  // this.update_libraryObj(this._treeobj);

  this.refresh_parent_node();
  this.init_parent_node();

  this._current_root._value = library_directory;
  this.create_primary_node(library_directory);
  this.refresh_parent_path();
  this.init_parent_path();

  this.find_file(fileInfo.selected_file);

  this._dict.parse(JSON.stringify(this._browser_tree));
}

FileTreeComponent.prototype.update_file = function(file_name){
  // debug('FileTree.update_file:', file_name);
  // libraryObj[file_name] = util.dict_to_jsobj(libraryDict.get(file_name));
  // debug('new obj:', JSON.stringify(libraryObj[file_name]));
  if(fileInfo.selected_file==file_name){
    debug('need to refresh fileInfo.selected_file...');
  }
}

FileTreeComponent.prototype.update_libraryObj = function(node){
  for(var i in node.children){
    var child_node = node.children[i];
    if(child_node.type=='file'){
      libraryObj[child_node.path] = {tags:[].concat(child_node.tags), shortname:child_node.name};
    }
    this.update_libraryObj(child_node);
  }
}

FileTreeComponent.prototype.refresh_browser_pane = function(obj){
  debug('current root is now:', this.current_root);
  this.create_primary_node(this.current_root);
  this._dict.parse(JSON.stringify(this._browser_tree));
  show_lib_dict();

  this.new_parent_list = [];
  for(var i in this._browser_tree.children){
    this.new_parent_list.push(this._browser_tree.children[i]);
  }
  // debug('new_parent_list:', JSON.stringify(this.new_parent_list));
  if(this.current_root != library_directory){
    this.new_parent_list.push({name:'<==back', type:'back_command', parents:[this.current_root]});
  }
  var selected_index = 0;
  if(this.current_parent_path){
    var parent_name = this.current_parent_path.name;
    selected_index = this.new_parent_list.reduce(function(acc, obj, index){
      return acc + Math.floor(obj.name == parent_name)*index
    }, 0);
    debug('parent_path is:', this.current_parent_path.name, 'parent path index is:', selected_index);
  }
  this.new_child_list = [];
  if(selected_index>-1){
    var selected_child_path = this.new_parent_list[selected_index];
    for(var i in selected_child_path.children){
      this.new_child_list.push(selected_child_path.children[i]);
    }
  }
  this.refresh_editor();
}

FileTreeComponent.prototype.refresh_editor = function(){
  ParentBackButton.message('active', this.current_root == library_directory);
  this._parentChooser.clear();
  for(var i in this.new_parent_list){
    this._parentChooser.append(this.new_parent_list[i].name);
  }
  var selected_index = indexOfNodePath(this.new_parent_list, this.current_parent_path);
  if(selected_index>-1){
    this._parentChooser.set(selected_index);
  }
  var current_dir = this.current_parent_path ? this.current_parent_path : {name:'none', children:[], type:'root'};
  debug('FileTree.refresh_editor() child_node:', current_dir.name);
  this._filesChooser.clear();
  if(current_dir.path != library_directory){
    for(var i in this.new_child_list){
      this._filesChooser.append(this.new_child_list[i].name);
    }
    var selected_index = indexOfNodePath(this.new_child_list, this.current_child_path);
    selected_index = selected_index >-1 ? selected_index : undefined;
    if(selected_index>-1){
      this._filesChooser.set(selected_index);
    }
    else{
      this._filesChooser.set();
    }
  }
  mira_gate.message(1);
}

FileTreeComponent.prototype.refresh_mira = function(){
  mira_gate.message(0);
  messnamed('from_preset_tagger', 'back', 'active', this.current_root = library_directory);
  messnamed('from_preset_tagger', 'parent', 'clear');
  for(var i in this.new_parent_list){
    messnamed('from_preset_tagger', 'parent', 'append', this.new_parent_list[i].name);
  }
  var selected_index = indexOfNodePath(this.new_parent_list, this.current_parent_path);
  if(selected_index>-1){
    // this._miraDefer.message('parent', 'set', selected_index);
    messnamed('from_preset_tagger_deferred', 'parent', 'set', selected_index);
  }
  if(!TagFilter.selected_tags.length>0){
    messnamed('from_preset_tagger', 'files', 'clear');
  }
  var current_dir = this.current_parent_node ? this.current_parent_node : {name:'none', children:[], type:'root'};
  if(current_dir.path != library_directory){
    for(var i in this.new_child_list){
      if(!TagFilter.selected_tags.length>0){
        messnamed('from_preset_tagger', 'files', 'append', this.child_list[i].name);
      }
    }
    var selected_index = indexOfNodePath(this.new_child_list, this.current_child_path);
    selected_index  = selected_index >-1 ? selected_index : undefined;
    if(selected_index>-1){
      // this._miraDefer.message('files', 'set', selected_index);
      if(!TagFilter.selected_tags.length>0){
        messnamed('from_preset_tagger_deferred', 'files', 'set', selected_index);
      }
    }
  }
}

FileTreeComponent.prototype.refresh = function(){
  /**refreshes current UI elements with current dir data*/
  debug('REFRESH!!!');
  // debug('current_root:', this.current_parent_node.name);
  // this.refresh_browser_pane();

  mira_gate.message(0);
  var current_root = retrieve_parent(this._treeobj, this.current_parent_node.parents);
  // debug('FileTree parent_node:', current_root.name);
  this.parent_list = [];
  for(var i in current_root.children){
    this.parent_list.push(current_root.children[i]);
  }
  if(current_root.type!='root'){
    this.parent_list.push({name:'<==back', type:'back_command', parents:[current_root]});
  }
  ParentBackButton.message('active', current_root.type!='root');
  messnamed('from_preset_tagger', 'back', 'active', current_root.type!='root');
  this._parentChooser.clear();
  messnamed('from_preset_tagger', 'parent', 'clear');
  for(var i in this.parent_list){
    this._parentChooser.append(this.parent_list[i].name);
    messnamed('from_preset_tagger', 'parent', 'append', this.parent_list[i].name);
  }
  var selected_index = this.parent_list.indexOf(this.current_parent_node);
  if(selected_index>-1){
    // debug('found selected parent');
    // this._Defer.message('parent', 'set', selected_index);
    this._parentChooser.set(selected_index);
    // this._miraDefer.message('parent', 'set', selected_index);
    messnamed('from_preset_tagger_deferred', 'parent', 'set', selected_index);
  }

  var current_dir = this.current_parent_node ? this.current_parent_node : {name:'none', children:[], type:root};
  // debug('FileTree child_node:', current_dir.name);
  this._filesChooser.clear();
  if(!TagFilter.selected_tags.length>0){
    messnamed('from_preset_tagger', 'files', 'clear');
  }
  if(current_dir.type != 'root'){
    this.child_list = [];

    for(var i in current_dir.children){
      this.child_list.push(current_dir.children[i]);
    }
    for(var i in this.child_list){
      this._filesChooser.append(this.child_list[i].name);
      if(!TagFilter.selected_tags.length>0){
        messnamed('from_preset_tagger', 'files', 'append', this.child_list[i].name);
      }
    }
    var selected_index = this.child_list.indexOf(this.current_child_node);
    selected_index  = selected_index >-1 ? selected_index : undefined;
    if(selected_index>-1){
      this._filesChooser.set(selected_index);
      // this._miraDefer.message('files', 'set', selected_index);
      if(!TagFilter.selected_tags.length>0){
        messnamed('from_preset_tagger_deferred', 'files', 'set', selected_index);
      }
    }
    else{
      this._filesChooser.set();
    }
  }
  mira_gate.message(1);
}

FileTreeComponent.prototype.refresh = function(){
  this.refresh_browser_pane();
}

FileTreeComponent.prototype.select_root = function(path){
  debug('select_root:', path);
  this._current_root.receive(path);
}

FileTreeComponent.prototype.select_parent = function(index, item){
  /**input from left browser pane*/
  // debug('FileTree.select_parent:', index, item);
  this.new_select_parent(index, item);
  if(index!=undefined){
    if(this.parent_list.length){
      var entry = this.parent_list[index];
      if(entry.type == 'folder'){
        this.current_parent_node = this.parent_list[index];
        this.current_child_node = undefined;
        fileInfo.select_file();
        this.refresh();
        // if(this._always_select_first_item){
        //   this.select_child(0);
        // }
      }
      else if(entry.type == 'file'){
        var parent_node = retrieve_parent(this._treeobj, entry.parents);
        if(this.current_parent_node.type == 'root'){
          this.current_child_node = entry;
          fileInfo.select_file(entry.path);
        }
        else{
          this.current_child_node = entry;
          this.current_parent_node = parent_node;
          this.refresh();
        }
      }
      else if(entry.type == 'back_command'){
        this.current_parent_node = entry.parents[0];
        this.current_child_node = undefined;
        fileInfo.select_file();
        // this.create_primary_node(this.current_parent_node.path);
        this.refresh();
        // if(this._always_select_first_item){
        //   this.select_child(0);
        // }
      }
    }
    else{
      this.refresh();
    }
  }
}

FileTreeComponent.prototype.new_select_parent = function(index, item){
  /**input from left browser pane*/
  debug('FileTree.new_select_parent:', index, item, this.new_parent_list.length);
  if(index!=undefined){
    if(this.new_parent_list.length){
      var entry = this.new_parent_list[index];
      debug('entry is:', entry.name);
      if(entry.type == 'folder'){
        this.current_parent_path = this.new_parent_list[index];
        this.current_child_path = undefined;
        this.select_root(this.current_parent_path.parent);
        fileInfo.select_file();
        this.refresh_browser_pane();
      }
      else if(entry.type == 'file'){
        var parent_node = retrieve_parent(this._browser_tree, entry.parents);
        // if(parent_node.path == library_directory){
        //   this.current_child_path = entry;
        //   this.select_root(library_directory);
        //   fileInfo.select_file(entry.path);
        // }
        // else{
        this.current_child_path = entry;
        this.current_parent_path = parent_node;
        this.select_root(this.current_parent_path.parent);
        this.refresh_browser_pane();
        // }
      }
      else if(entry.type == 'back_command'){
        this.current_parent_path = entry.parents[0];
        this.current_child_path = undefined;
        this.select_root(this.current_parent_path.parent);
        fileInfo.select_file();
        this.refresh_browser_pane();
      }
    }
    else{
      this.refresh_browser_pane();
    }
  }
}

FileTreeComponent.prototype.open_parent = function(index, item){
  /**double-click from left pane of browser*/
  // debug('FileTree.open_parent:', index, item);
  if(index!=undefined){
    if(this.parent_list.length){
      var entry = this.parent_list[index];
      if(entry.type == 'folder'){
        this.current_parent_node = this.parent_list[index];
        this.refresh();
      }
      else if(entry.type == 'file'){
        var parent_node = retrieve_parent(this._treeobj, entry.parents);
        if(this.current_parent_node.type == 'root'){
          this.current_child_node = entry;
          fileInfo.select_file(entry.path);
          NSProxy.asyncCall('open_preset', entry.path);
        }
        else{
          this.current_child_node = entry;
          this.current_parent_node = parent_node;
          this.refresh();
        }
      }
      else if(entry.type == 'back_command'){
        this.current_child_node = undefined;
        this.current_parent_node = entry.parents[0];
        this.refresh();
      }
    }
    else{
      this.refresh();
    }
  }
}

FileTreeComponent.prototype.select_child = function(index, item){
  /**input from right browser pane*/
  // debug('FileTree.select_child:', index, item);
  this.new_select_child(index, item);
  if(index!=undefined){
    if(this.child_list.length){
      var entry = this.child_list[index];
      if(entry.type == 'folder'){
        this.current_child_node = undefined;
        this.current_parent_node = entry;
        fileInfo.select_file(undefined);
        // this.create_primary_node(this.current_parent_node.path);
        this.refresh();
      }
      else if(entry.type == 'file'){
        this.current_child_node = entry;
        fileInfo.select_file(entry.path);
        this.refresh();
      }
    }
    else{
      this.refresh();
    }
  }
}

FileTreeComponent.prototype.new_select_child = function(index, item){
  /**input from right browser pane*/
  debug('FileTree.new_select_child:', index, item);
  if(index!=undefined){
    if(this.new_child_list.length){
      var entry = this.new_child_list[index];
      debug('entry is:', entry.name);
      if(entry.type == 'folder'){
        this.current_child_path = undefined;
        this.current_parent_path = entry;
        this.select_root(entry.parent);
        fileInfo.select_file(undefined);
        // this.create_primary_node(this.current_parent_node.path);
        this.refresh_browser_pane();
      }
      else if(entry.type == 'file'){
        this.current_child_path = entry;
        fileInfo.select_file(entry.path);
        this.refresh_browser_pane();
      }
    }
    else{
      this.refresh_browser_pane();
    }
  }
}

FileTreeComponent.prototype.open_child = function(index, item){
  /**double-click from right pane of browser*/
  // debug('FileTree.open_child:', index, item);
  if(index!=undefined){
    var entry = this.child_list[index];
    if(entry.type == 'folder'){
      this.current_child_node = undefined;
      this.current_parent_node = entry;
      this.refresh();
      fileInfo.select_file(undefined);

    }
    else if(entry.type == 'file'){
      this.current_child_node = entry;
      fileInfo.select_file(entry.path);
      NSProxy.asyncCall('open_preset', entry.path);
    }
  }
}

FileTreeComponent.prototype.find_file = function(path){
  /**used primarily by selected file from filter window*/
  // debug('FileTree.find_file:', path);
  if(path){
    var root = this._treeobj.parent;
    var parents = path.toString().replace(root, '').split('/');
    var ft_obj = retrieve_child(this._treeobj, parents);
    // debug('found obj:', ft_obj.name, 'parents:', parents);
    if(parents&&ft_obj){
      this.current_parent_node = retrieve_parent(this._treeobj, ft_obj.parents);
      // debug('new current_parent_node is:', this.current_parent_node);
      this.current_child_node = ft_obj;
      fileInfo.select_file(ft_obj.path);
    }
  }
  this.refresh();
}

FileTreeComponent.prototype.refresh_parent_node = function(){
  var node = this.current_parent_node;
  if((node)&&(node.name!='root')){
    this.current_parent_node = retrieve_child(this._treeobj, node.parents.concat([node.name]));
  }
}

FileTreeComponent.prototype.refresh_parent_path = function(){
  var node = this.current_parent_path;
  if((node)&&(node.name!='root')){
    this.current_parent_node = retrieve_child(this._browser_tree, node.parents.concat([node.name]));
  }
}

FileTreeComponent.prototype.node_for_path = function(path){
  debug('FileTree.node_for_path:', path);
  var node = undefined;
  if(path){
    var root = this._treeobj.parent;
    var parents = path.toString().replace(root, '').split('/');
    var ft_obj = retrieve_child(this._treeobj, parents);
    node = ft_obj;
  }
  return node
}

FileTreeComponent.prototype.parent_node_for_path = function(path){
  debug('FileTree.parent_node_for_path:', path);
  var node = undefined;
  if(path){
    var root = this._treeobj.parent;
    var parents = path.toString().replace(root, '').split('/');
    var ft_obj = retrieve_child(this._treeobj, parents);
    var parent_obj = retrieve_parent(this._treeobj, ft_obj.parents);
    node = parent_obj;
  }
  return node
}

FileTreeComponent.prototype.scan_library = function(){
  var f = undefined;
  try{
    debug('library_directory:', library_directory);
		this._treeobj = {name:'root',
			root:basename(library_directory),
			root_path:library_directory,
			parents:[],
			parent: library_directory.replace(basename(library_directory)+'/', ''),
			children:{}
		};
    this.scan_folder(library_directory, this._treeobj);
    // this._dict.parse(JSON.stringify(this._treeobj));
  }
  catch(e){
    debug('Folder not found', util.report_error(e));

  }
}

FileTreeComponent.prototype.scan_folder = function(dir_name, filetree_node){
	// debug('scan_folder:', dir_name, typeof filetree_node);
  try{
    var f = new Folder(dir_name);
    var shortname = basename(dir_name);
    // debug('shortname is:', shortname);
  	filetree_node.children[shortname] = {name: shortname,
  		path: f.pathname,
  		type: dir_name == library_directory ? 'root':'folder',
  		parents: dir_name == library_directory ? [] : dir_name.replace(library_base, '').replace(shortname, '').split('/').slice(0, -1),
  		parent: dir_name.split(shortname)[0],
  		children:{}
    };
    while (!f.end) {
    	if(f.filetype=='fold'){
  			this.scan_folder(pathJoin([f.pathname, f.filename]), filetree_node.children[shortname]);
  		}
      else{
        if(VALID_FILE_TYPES.indexOf(f.extension)>-1){
          // debug('filename:', f.filename, 'extension:', f.extension);
          var file_name = pathJoin([f.pathname, f.filename]);
          var file_shortname = f.filename;
          var tags = [];
          try{
            tags = libraryObj[file_name].tags;
            if(tags == null || tags == ''){
              tags = [];
            }
          }
          catch(e){
            debug('no libraryObj repr for:', file_name);
          }
          var parents = file_name.replace(library_base, '').replace(file_shortname, '').split('/').filter(function(i){return i!=''});
          filetree_node.children[shortname].children[file_shortname] = {
            name:file_shortname,
  					path:file_name,
            type:'file',
  					parent:f.pathname,
  					parents: parents,
            tags: tags
          };
        }
      }
      f.next();
     }
     f.close();
     // delete f
   }
   catch(e){
     debug('scan_folder fail:', util.report_error(e));
   }
}

FileTreeComponent.prototype.create_primary_node = function(dir_name){
	debug('create_primary_node:', dir_name);
  dir_name = dir_name ? dir_name : library_directory;
  try{
    var f = new Folder(dir_name);
    var shortname = basename(dir_name);
    // debug('shortname is:', shortname);
  	this._browser_tree = {
      name: shortname,
  		path: f.pathname,
  		type: 'root',
  		parents: dir_name == library_directory ? [] : dir_name.replace(library_base, '').replace(shortname, '').split('/').slice(0, -1),
  		parent: dir_name.split(shortname)[0],
  		children:{}
    };
    while (!f.end) {
    	if(f.filetype=='fold'){
        var folder_shortname = f.filename;
  			this._browser_tree.children[folder_shortname] = this.create_secondary_node(pathJoin([f.pathname, f.filename]));
  		}
      else{
        if(VALID_FILE_TYPES.indexOf(f.extension)>-1){
          // debug('filename:', f.filename, 'extension:', f.extension);
          var file_name = pathJoin([f.pathname, f.filename]);
          var file_shortname = f.filename;
          var tags = [];
          try{
            tags = libraryObj[file_name].tags;
            if(tags == null || tags == ''){
              tags = [];
            }
          }
          catch(e){
            debug('no libraryObj repr for:', file_name);
          }
          var parents = file_name.replace(library_base, '').replace(file_shortname, '').split('/').filter(function(i){return i!=''});
          this._browser_tree.children[file_shortname] = {
            name:file_shortname,
  					path:file_name,
            type:'file',
  					parent:f.pathname,
  					parents: parents,
            tags: tags
          };
        }
      }
      f.next();
     }
     f.close();
     // delete f
   }
   catch(e){
     debug('scan_folder fail:', util.report_error(e));
   }
}

FileTreeComponent.prototype.create_secondary_node = function(dir_name){
	// debug('scan_folder:', dir_name, typeof filetree_node);
  try{
    var f = new Folder(dir_name);
    var shortname = basename(dir_name);
    // debug('shortname is:', shortname);
  	var new_node = {
      name: shortname,
  		path: f.pathname,
  		type: dir_name == library_directory ? 'root':'folder',
  		parents: dir_name == library_directory ? [] : dir_name.replace(library_base, '').replace(shortname, '').split('/').slice(0, -1),
  		parent: dir_name.split(shortname)[0],
  		children:{}
    };
    while (!f.end) {
    	if(f.filetype=='fold'){
  			var folder_name = pathJoin([f.pathname, f.filename]);
        var folder_shortname = basename(folder_name);
      	new_node.children[folder_shortname] = {
          name: folder_shortname,
      		path: folder_name,
      		type: 'folder',
      		parents: folder_name.replace(library_base, '').replace(folder_shortname, '').split('/').filter(function(i){return i!=''}),
      		parent: dir_name.split(folder_shortname)[0],
        };
  		}
      else{
        if(VALID_FILE_TYPES.indexOf(f.extension)>-1){
          var file_name = pathJoin([f.pathname, f.filename]);
          var file_shortname = f.filename;
          var tags = [];
          try{
            tags = libraryObj[file_name].tags;
            if(tags == null || tags == ''){
              tags = [];
            }
          }
          catch(e){
            debug('no libraryObj repr for:', file_name);
          }
          var parents = file_name.replace(library_base, '').replace(file_shortname, '').split('/').filter(function(i){return i!=''});
          new_node.children[file_shortname] = {
            name:file_shortname,
  					path:file_name,
            type:'file',
  					parent:f.pathname,
  					parents: parents,
            tags: tags
          };
        }
      }
      f.next();
     }
     f.close();
     // delete f
     return new_node
   }
   catch(e){
     debug('scan_folder fail:', util.report_error(e));
   }
   return {}
}


function indexOfNodePath(arr, path){
  var ret = -1;
  if(arr&&path&&path.name){
    var name = path.name;
    ret = arr.reduce(function(acc, obj, index){
      return acc + Math.floor(obj.name == name)*(index+1);
    }, 0) -1;
  }
  return ret
}

function basename(path){
  // debug('basename:', path);
  var path_array = path.split('/');
  var len = path_array.length;
  if(path_array[len-1].length==0){
    return path_array[len-2];
  }
  return path_array[len-1];
}

function pathJoin(parts, sep){
   var separator = sep || '/';
   var replace   = new RegExp(separator+'{1,}', 'g');
   return parts.join(separator).replace(replace, separator);
}

function retrieve_parent(obj, parents){
  //parents = [].concat(parents);
  if((!parents)||(!parents.length)){
    return obj.children[Object.keys(obj.children)[0]];
  }
  parents = [].concat(parents);
  // debug('here', obj.name, parents, typeof parents);
  var new_obj = obj.children[parents.shift()];
  if(parents.length){
    new_obj = retrieve_parent(new_obj, parents);
  }
  return new_obj;
}

function retrieve_child(obj, parents){
  // debug('retrieve_child', obj, parents);
  //parents = [].concat(parents);
  if((!parents)||(!parents.length)||(!obj)||(!obj.children)){
    //debug('returning null');
    return undefined
  }
  parents = [].concat(parents);
  var new_obj = obj.children[parents.shift()];
  if(parents.length){
    new_obj = retrieve_child(new_obj, parents);
  }
  return new_obj
}

function get_child_dict(dict, parents){
  var value = undefined;
  var parent = parents.shift();
  // debug('parent is:', parent);
  if (dict == null) return null;
  var keys = dict.getkeys();
  // debug('keys are:', keys);
  if(keys.indexOf('children'>-1)){
    dict = dict.get('children');
    keys = dict.getkeys();
    if((keys.indexOf(parent)>-1)||(keys==parent)){
      value = dict.get(parent);
      if (value && value instanceof Dict && parents.length) {
        value = get_child_dict(value, parents);
      }
    }
  }
  return value
}


/**
*  Component deals with all tagging tasks.
*  Basically everything in right two windows,
*  as well as all actions in the bottom section.
*/
function FileTaggerComponent(name, args){
  var self = this;
  this._tag_buffer = [];
  this.selection_mode_value = false;
  this.add_bound_properties(this, [
    'input',
    'set_tag_buffer',
    'refresh',
    'selection_mode_value',
    'toggle_tag',
    'toggle_tag_listener',
    'apply_tag_locally',
    'remove_tag_locally'
  ]);
  FileTaggerComponent.super_.call(this, name, args);
  this._init.apply(this);
}

util.inherits(FileTaggerComponent, Bindable);

FileTaggerComponent.prototype.__defineGetter__('tag_buffer', function(){
  return this._tag_buffer;
})

FileTaggerComponent.prototype._init = function(args){
  // debug('FileTaggerComponent._init');
}

FileTaggerComponent.prototype.input = function(){
  var args = arrayfromargs(arguments);
  debug('TaggerComponent.input:', args);
  try{
    this[args[0]].apply(this, args.slice(1));
  }
  catch(err){
    util.report_error(err);
  }
}

FileTaggerComponent.prototype.refresh = function(){
  this.display_tag_buffer(this.tag_buffer);
}

FileTaggerComponent.prototype.set_tag_buffer = function(){
  var tags = arrayfromargs(arguments);
  this._tag_buffer = tags[0]=='bang' ? '' : tags;
  this.display_tag_buffer(this.tag_buffer);
}

FileTaggerComponent.prototype.display_tag_buffer = function(tag) {
  tag_buffer_display.message('set', tag ? tag : '');
}

FileTaggerComponent.prototype.toggle_tag_listener = function(obj){
  //this is the target of the UI sidebar tagger
  debug('toggle_tag_listener', obj._value);
  this.toggle_tag(obj._value);
}

FileTaggerComponent.prototype.toggle_tag = function(stag){
  debug('FileTaggerComponent.prototype.toggle_tag:', stag, typeof stag);
  if(typeof stag == 'string'){
    //var active_tags = [].concat(fileInfo.active_tags);
    var active_tags = fileInfo.active_tags;
    var exists = Math.floor(active_tags.indexOf(stag)>-1);
    // debug('active_tags:', typeof active_tags, active_tags, 'exists:', exists);
    var actions = ['apply_tag_locally', 'remove_tag_locally'];
    var action = actions[exists];
    // debug(action ,index, actions, actions[1], actions[index]);
    // return NSProxy.asyncCall(action, fileInfo.selected_file, stag);
    this[action].call(this, stag);
    return Promise.resolve(true);
  }
  return Promise.reject(new Error('tag was not a string'));
}

FileTaggerComponent.prototype.apply_tag_locally = function(tag){
  // return NSProxy.asyncCall('apply_tag'', fileInfo.selected_file, tag);
  var active_tags = fileInfo.active_tags;
  var index = active_tags.indexOf(tag);
  // debug('apply_tag_locally', tag, 'active:', active_tags, index);
  if(index<0){
    active_tags.push(tag);
    fileInfo.buffer_tags(active_tags);
  }
}

FileTaggerComponent.prototype.remove_tag_locally = function(tag){
  // return NSProxy.asyncCall('remove_tag'', fileInfo.selected_file, tag);
  var active_tags = fileInfo.active_tags;
  var index = active_tags.indexOf(tag);
  // debug('remove_tag_locally', tag, 'active:', active_tags, index);
  if(index>-1){
    active_tags.splice(index, 1);
    debug('active_tags length:', active_tags, active_tags.length);
    fileInfo.buffer_tags(active_tags);
  }
}

FileTaggerComponent.prototype.set_tags = function(filepath, tags){
  if(util.isArray(tags)){
    //NSProxy will mar an empty array, so we need to set it to something it can use here
    var new_tags = tags.length ? tags : '';
    return NSProxy.asyncCall('set_tags', filepath, new_tags);
  }
  return Promise.reject(new Error('tag was not an array'));
}

FileTaggerComponent.prototype.set_tag = function(){
  //this is turned off for now, since there is no way to read part of a dict from node4max
  // FileTree.set_tags_internal(fileInfo.selected_file, this.tag_buffer);
  return NSProxy.asyncCall('apply_tag', fileInfo.selected_file, this.tag_buffer)
}

FileTaggerComponent.prototype.remove_tag = function(){
  //this is turned off for now, since there is no way to read part of a dict from node4max
  // FileTree.remove_tags_internal(fileInfo.selected_file, this.tag_buffer);
  NSProxy.asyncCall('remove_tag', fileInfo.selected_file, this.tag_buffer);
}

FileTaggerComponent.prototype.clear_tags = function(){
  //this is turned off for now, since there is no way to read part of a dict from node4max
  // FileTree.clear_tags_internal(FileInfo.selected_file);
  NSProxy.asyncCall('clear_tags', fileInfo.selected_file);
}

//this is done in-house now ;)
FileTaggerComponent.prototype.set_folder_tags = function(){
  // FileTree.set_folder_tags();
  if(FileTree.current_parent_node.type == 'folder'){
    NSProxy.asyncCall('apply_folder_tags', FileTree.current_parent_node.path, this.tag_buffer);
  }
}

FileTaggerComponent.prototype.set_folder_tags = function(){
  if(FileTree.current_parent_node.type == 'folder'){
    var filenames = recurse_folder(FileTree.current_parent_node, []);
    var tag = this.tag_buffer;
    // debug('filepaths are:', filenames);
    suppress_rescan = true;
    fileInfo.report_update(true);
    NSProxy.asyncCall('set_block_updates', 1).then(function(){
      Promise.each(filenames, function(filename) {
        return NSProxy.asyncCall('apply_tag', filename, tag).then(function(ret){
          // debug('success:', filename);
        })
      }).then(function(res){
        debug('done:', res);
        NSProxy.asyncCall('set_block_updates', 0);
        suppress_rescan = false;
        fileInfo.report_update(false);
        // on_file_changed();
        // refresh_libraryObj();
      })
    }).catch(function(e){
      NSProxy.asyncCall('set_block_updates', 0);
      // refresh_libraryObj();
    })
  }
}

//this is done in-house now ;)
FileTaggerComponent.prototype.remove_folder_tags = function(){
  // FileTree.remove_folder_tags();
  if(FileTree.current_parent_node.type == 'folder'){
    NSProxy.asyncCall('remove_folder_tags', FileTree.current_parent_node.path, this.tag_buffer);
  }
}

FileTaggerComponent.prototype.remove_folder_tags = function(){
  if(FileTree.current_parent_node.type == 'folder'){
    var filenames = recurse_folder(FileTree.current_parent_node, []);
    var tag = this.tag_buffer;
    // debug('filepaths are:', filenames);
    suppress_rescan = true;
    fileInfo.report_update(true);
    NSProxy.asyncCall('set_block_updates', 1).then(function(){
      Promise.each(filenames, function(filename) {
        return NSProxy.asyncCall('remove_tag', filename, tag).then(function(ret){
          // debug('success:', filename);
        })
      }).then(function(res){
        debug('done:', res);
        NSProxy.asyncCall('set_block_updates', 0);
        suppress_rescan = false;
        fileInfo.report_update(false);
        // on_file_changed();
        // refresh_libraryObj();
      })
    }).catch(function(e){
      NSProxy.asyncCall('set_block_updates', 0);
      // refresh_libraryObj();
    })
  }
}

//this is done in-house now ;)
FileTaggerComponent.prototype.clear_folder_tags = function(){
  // FileTree.clear_folder_tags();
  if(FileTree.current_parent_node.type == 'folder'){
    NSProxy.asyncCall('clear_folder_tags', FileTree.current_parent_node.path);
  }
}

FileTaggerComponent.prototype.clear_folder_tags = function(){
  if(FileTree.current_parent_node.type == 'folder'){
    var filenames = recurse_folder(FileTree.current_parent_node, []);
    var tag = this.tag_buffer;
    suppress_rescan = true;
    fileInfo.report_update(true);
    NSProxy.asyncCall('set_block_updates', 1).then(function(){
      Promise.each(filenames, function(filename) {
        return NSProxy.asyncCall('clear_tags', filename, tag).then(function(ret){
          // debug('success:', filename);
        })
      }).then(function(res){
        debug('done:', res);
        NSProxy.asyncCall('set_block_updates', 0);
        suppress_rescan = false;
        fileInfo.report_update(false);
        // on_file_changed();
        // refresh_libraryObj();
      })
    }).catch(function(e){
      NSProxy.asyncCall('set_block_updates', 0);
      // refresh_libraryObj();
    })
  }
}

FileTaggerComponent.prototype.reveal_in_finder = function(){
  NSProxy.asyncCall('reveal_preset', fileInfo.selected_file);
}

/**These three are for commander*/
FileTaggerComponent.prototype.tag_next_selected = function(){
  debug('tag_next_selected');
  debug('selected_tags:', TagFilter.selected_tags);
  this.tag_buffer = TagFilter.selected_tags;
  display_tag_buffer(this.tag_buffer);
  //NSProxy.asyncCall('select_tag', this.tag_buffer);
  this.set_tag();
}

FileTaggerComponent.prototype.set_selection_mode = function(val){
  this.selection_mode_value = Boolean(val);
}

FileTaggerComponent.prototype.chooser_single = function(index, shortname){
  debug('chooser_single:', index, shortname);
  // var path = selected_tags.length ? filtered_hash_list[shortname].file : hash_list[shortname].file;
  var path = TagFilter.filtered_hash_list[shortname].file;
  // fileInfo.select_file(path);
  FileTree.find_file(path);
}

FileTaggerComponent.prototype.chooser_double = function(index, shortname){
  debug('chooser_double', index, shortname, TagFilter.selected_tags, TagFilter.selected_tags.length);
  // var path = TagFilter.selected_tags.length ? TagFilter.filtered_hash_list[shortname].file : TagFilter.hash_list[shortname].file;
  var path = TagFilter.filtered_hash_list[shortname].file;
  NSProxy.asyncCall('open_preset', path);
}

function recurse_folder(parentNode, paths){
  // debug('recurse_folder', parentNode.name);
  for(var i in parentNode.children){
    //debug('here');
    var child = parentNode.children[i];
    if(child.type == 'folder'){
      paths = recurse_folder(child, paths);
    }
    else{
      paths.push(child.path);
    }
  }
  return paths
}


/**
*  Component deals with all tagging tasks.
*  Basically everything in right two windows,
*  as well as all actions in the bottom section.
*/
function TagFilterComponent(name, args){
  var self = this;
  // this._selected_tags = [];
  this.hash_list = {};
  this.filtered_hash_list = {};
  this.found_tags = [];
  this.last_found_tags = [];
  this._selected_tags = new ArrayParameter(this._name + '_SelectedTags', {value:[]});
  this._tagList = new ArrayParameter(this._name + '_TagList', {value:[]});
  this._filterMode = new TextToggleParameter(this._name + '_FilterMode', {
    value:true,
    onValue:6,
    offValue:5,
    textOnValue:'OR',
    textOffValue:'AND'
  });
  this.ClearFilter = new TextMomentaryParameter(this._name + '_ClearFilterControl', {
    onValue:2,
    offValue:2,
    textOnValue:'ClearFilter',
    textOffValue:'ClearFilter'
  });
  this.ClearFilter.add_listener(function(obj){obj._control._value&&self.clear_filter();});
  this.add_bound_properties(this, ['input', 'refresh', '_filterMode', 'refresh_filtered_chooser_selection']);
  TagFilterComponent.super_.call(this, name, args);
  this._init.apply(this);
}

util.inherits(TagFilterComponent, EventEmitter);

TagFilterComponent.prototype.__defineGetter__('selected_tags', function(){
  // debug('selected tags:', this._selected_tags);
  return this._selected_tags._value
});

TagFilterComponent.prototype.__defineGetter__('tag_list', function(){
  // debug('selected tags:', this._selected_tags);
  return this._tagList._value
});

TagFilterComponent.prototype.__defineGetter__('filter_mode_value', function(){
  // debug('selected tags:', this._selected_tags);
  return this._filterMode._value
});

TagFilterComponent.prototype._init = function(args){
  // debug('TagFilterComponent._init');
  this._selected_tags.add_listener(this.refresh);
  this._filterMode.add_listener(this.refresh);
  fileInfo._filepath.add_listener(this.refresh_filtered_chooser_selection);
}

TagFilterComponent.prototype.refresh = function(){
  // debug('TagFilterComponent.refresh');
  this.display_filtered_files();
  this.refresh_filtered_chooser_selection();
  this.refresh_tagchooser();
}

TagFilterComponent.prototype.input = function(){
  var args = arrayfromargs(arguments);
  //debug('TagFilterComponent.input:', args);
  try{
    this[args[0]].apply(this, args.slice(1));
  }
  catch(err){
    util.report_error(err);
  }
}

TagFilterComponent.prototype.filter_mode = function(val){
  this._filterMode.set_value(!val);
}

TagFilterComponent.prototype.tag_selection = function(){
  var tags = arrayfromargs(arguments);
  debug('tag_selection:', tags, tags.length);
  this._selected_tags.set_value(tags);  //this calls refresh
}

TagFilterComponent.prototype.tag_selection_from_commander = function(){
  var tags = arrayfromargs(arguments);
  debug('tag_selection_from_commander:', tags, tags.length);
  var new_selection = tags[0]=='bang'?[]: tags[0] == 'selecteditems' ? tags.slice(1) : tags.slice(1);
  this._selected_tags.set_value(new_selection);
  /** differs from the standard method above because of the way the second browser in
    commander does doubleduty between filtering and fileTree.*/
  if(!this.selected_tags.length){
    this.clear_filter();
    FileTree.refresh();
  }
  else{
    this.refresh();
  }
}

TagFilterComponent.prototype.clear_filter = function(){
  this._selected_tags.set_value([]);
  tag_chooser.set();
  // messnamed('from_preset_tagger', 'filters', 'clear_filter');
  this.refresh();
  // this.refresh_chooser();
  // FileTree.refresh();
}

TagFilterComponent.prototype.display_filtered_files = function(){
  //debug('display_filtered_files', selected_tags);
  mira_gate.message(0);
  file_chooser.clear();
  if(this.selected_tags.length>0){
    messnamed('from_preset_tagger', 'files', 'clear');
  }
  this.filtered_hash_list = {};
  if(this.selected_tags.length){
    //OR//
    if(this.filter_mode_value){
      var entry = 0;
      for(var path in libraryObj){
        var file = libraryObj[path];
        var tags = [].concat(file.tags);
        var shortname = file.shortname;
        for(var j in tags){
          if(this.selected_tags.indexOf(tags[j])>-1){
            this.filtered_hash_list[shortname] = {file:path, tags:tags, entry:entry};
            file_chooser.append(shortname);
            if(this.selected_tags.length>0){
              messnamed('from_preset_tagger', 'files', 'append', shortname);
            }
            entry += 1;
            break;
          }
        }
      }
    }
    //AND//
    else{
      for(var path in libraryObj){
        var file = libraryObj[path];
        var tags = [].concat(file.tags);
        var shortname = file.shortname;
        var add = true;
        for(var j in this.selected_tags){
          if(tags.indexOf(this.selected_tags[j])==-1){
            add = false;
            break;
          }
        }
        if(add){
          this.filtered_hash_list[shortname] = {file:path, tags:tags, entry:entry};
          file_chooser.append(shortname);
          if(this.selected_tags.length>0){
            messnamed('from_preset_tagger', 'files', 'append', shortname);
          }
        }
      }
    }
  }
  //NONE//
  else{
    var entry = 0;
    for(var path in libraryObj){
      var file = libraryObj[path];
      var tags = [].concat(file.tags).filter(util.isString);
      var shortname = file.shortname;
      //debug(shortname, tags.length, tags);
      if(tags.length==0){
        this.filtered_hash_list[shortname] = {file:path, tags:tags, entry:entry};
        file_chooser.append(shortname);
        entry += 1;
      }
    }
  }
  mira_gate.message(1);
  this.emit('FilteredHashListUpdated', this.filtered_hash_list);
}

//this shouldn't be needed anymore, since we only seem to be maintaining the filtered_hash_list now.
TagFilterComponent.prototype.refresh_chooser_selection = function(){
  //not currently used
  var selected_file = fileInfo.selected_file;
  // debug('selected_file:', selected_file);
  if((selected_file)&&(selected_file in libraryObj)){
    // var selected_shortname = libraryDict.get(selected_file+'::shortname');
    var selected_shortname = libraryObj[selected_file].shortname;
    if(selected_shortname in this.hash_list){
      var entry = parseInt(this.hash_list[selected_shortname].entry);
      file_chooser.set(entry);
      if(this.selected_tags.length){
        messnamed('from_preset_tagger_deferred', 'files', 'entry');
      }
    }
  }
}

TagFilterComponent.prototype.refresh_filtered_chooser_selection = function(){
  //update the currently selected item in the filter chooser pane
  var selected_file = fileInfo.selected_file;
  // debug('selected_file:', selected_file == null ? 'null' : selected_file);
  if((selected_file)&&(selected_file in libraryObj)){
    var selected_shortname = libraryObj[selected_file].shortname;
    if(selected_shortname in this.filtered_hash_list){
      var entry = parseInt(this.filtered_hash_list[selected_shortname].entry);;
      file_chooser.set(entry);
      //if filtering isn't enabled, we want to display this in the 2nd commander pane
      if(this.selected_tags.length>0){
        messnamed('from_preset_tagger_deferred', 'files', 'set', entry);
      }
    }
    else{
      file_chooser.set();
    }
  }
  else{
    file_chooser.set();
  }
}

TagFilterComponent.prototype.update = function(){
  //debug('TagFilterComponent.update()');
  this.detect_found_tags();
  // if(!this.last_found_tags.equals(this.found_tags)){
  //   this.redraw_tagchooser();
  // }
}

TagFilterComponent.prototype.refresh_tagchooser = function(){
  //debug('refresh_tagchooser:', found_tags);
  this.detect_found_tags();
  // if(!this.last_found_tags.equals(this.found_tags)){
    this.redraw_tagchooser();
    // mira_gate.message(0);
    // tag_chooser.clear();
    // messnamed('from_preset_tagger', 'filters', 'clear');
    // for(var i in this.found_tags){
    //   tag_chooser.append(this.found_tags[i]);
    //   messnamed('from_preset_tagger', 'filters', 'append', this.found_tags[i]);
    // }
    // mira_gate.message(1);
  // }
}

TagFilterComponent.prototype.redraw_tagchooser = function(){
  //repopulate the tag chooser box with current items
  mira_gate.message(0);
  tag_chooser.clear();
  messnamed('from_preset_tagger', 'filters', 'clear');
  for(var i in this.found_tags){
    found_tag = this.found_tags[i];
    tag_chooser.append(found_tag);
    messnamed('from_preset_tagger', 'filters', 'append', found_tag);
    if(this.selected_tags.indexOf(found_tag)>-1){
      tag_chooser.set(i);
      messnamed('from_preset_tagger', 'filters', 'set', i, 1);
    }
  }
  mira_gate.message(1);
}

TagFilterComponent.prototype.detect_found_tags = function(){
  this.last_found_tags = this.found_tags.slice();
  this.found_tags = [];
  //debug('last_found_tags:', last_found_tags);
  for(var i in libraryObj){
    var tags = [].concat(libraryObj[i].tags);
    for(var t in tags){
      if((this.found_tags.indexOf(tags[t])==-1)&&(tags[t])){
        this.found_tags.push(tags[t]);
      }
    }
  }
  this.found_tags.sort();
  this._tagList.set_value(this.found_tags);
}



function FilenameFilterComponent(name, args){
  var self = this;
  this.filtered_hash_list = {};
  this._search_filters = new ArrayParameter(this._name + '_SearchFilters', {value:[]});
  this._filtered_files = new ArrayParameter(this._name + '_FilteredFiles', {value:[]});
  this._tag_buffer = new ArrayParameter(this._name + '_TagBuffer', {value:[]});
  this._recursive_toggle = new ToggledParameter(this._name + '_RecursiveToggle', {value:false});
  this.add_bound_properties(this, [
    'input',
    'refresh',
    '_search_filters',
    '_filtered_files',
    '_tag_buffer',
    '_tag_buffer_text',
    '_search_filter_text',
    '_recursive_toggle',
    'refresh_filtered_chooser_selection',
    '_batch_display',
    'filtered_hash_list',
    'select_file'
  ]);
  TagFilterComponent.super_.call(this, name, args);
  this._init.apply(this);
}

util.inherits(FilenameFilterComponent, EventEmitter);

FilenameFilterComponent.prototype.__defineGetter__('filtered_files', function(){
  // debug('selected tags:', this._selected_tags);
  return this._filtered_files._value
});

FilenameFilterComponent.prototype.__defineGetter__('search_filters', function(){
  // debug('selected tags:', this._selected_tags);
  return this._search_filters._value
});

FilenameFilterComponent.prototype.__defineGetter__('tag_buffer', function(){
  // debug('selected tags:', this._selected_tags);
  return this._tag_buffer._value
});

FilenameFilterComponent.prototype.__defineGetter__('recursive_toggle', function(){
  // debug('selected tags:', this._selected_tags);
  return this._recursive_toggle._value
});

FilenameFilterComponent.prototype._init = function(args){
  // debug('TagFilterComponent._init');
  var self = this;
  this._search_filters.add_listener(this.refresh);
  this._search_filters.add_listener(function(){
    self._search_filter_text.message('set', self.search_filters.join(' '));
  });
  this._tag_buffer.add_listener(function(){
    self._tag_buffer_text.message('set', self.tag_buffer.join(' '));
  });
  this._recursive_toggle_button.message('set', 0);
  this._recursive_toggle.add_listener(this.refresh);
  this._search_filter_text.message('clear');
  this._tag_buffer_text.message('clear');
  // this._batch_display.add_listener(function(obj){
  //   //var args = arrayfromargs(arguments);
  //   debug('batch_display input:', obj);
  // })
}

FilenameFilterComponent.prototype.refresh = function(){
  debug('FilenameFilterComponent.refresh');
  this.display_filtered_files();
}

FilenameFilterComponent.prototype.input = function(){
  var args = arrayfromargs(arguments);
  // debug('FilenameFilterComponent.input:', args);
  try{
    this[args[0]].apply(this, args.slice(1));
  }
  catch(err){
    util.report_error(err);
  }
}

FilenameFilterComponent.prototype.set_filters = function(){
  var filters = arrayfromargs(arguments);
  debug('set_filters:', filters, filters.length);
  this._search_filters.set_value(filters);  //this calls refresh
}

FilenameFilterComponent.prototype.set_tag_buffer = function(){
  var buffer = arrayfromargs(arguments);
  debug('set_tag_buffer:', buffer, buffer.length);
  this._tag_buffer.set_value(buffer);  //this calls refresh
}

FilenameFilterComponent.prototype.Clear = function(){
  this.clear_filter();
  this.clear_tag_buffer();
}

FilenameFilterComponent.prototype.clear_filter = function(){
  this._search_filters.set_value([]);
  this.refresh();
}

FilenameFilterComponent.prototype.clear_tag_buffer = function(){
  this._tag_buffer.set_value([]);
  this.refresh();
}

FilenameFilterComponent.prototype.display_filtered_files = function(){
  debug('display_filtered_files', this.search_filters);
  var root_path = filetreeDict.get('root_path');
  var filters = this.search_filters;
  this.filtered_hash_list = {};
  batch_display.clear();
  if(filters.length){
    var entry = 0;
    for(var path in libraryObj){
      var file = libraryObj[path];
      var shortpath = path.replace(root_path, '');
      var shortname = file.shortname;
      for(var j in filters){
        var rgx = RegExp(filters[j], 'gi');
        var test_path = this.recursive_toggle ? shortpath : shortname;
        var ret = rgx.test(test_path);
        if(ret){
          this.filtered_hash_list[shortname] = {file:path, entry:entry};
          // debug(shortname, ret);
          batch_display.append(shortname);
          entry += 1;
          break;
        }
      }
    }
  }
  // this.emit('FilteredHashListUpdated', this.filtered_hash_list);
}

FilenameFilterComponent.prototype.update = function(){

}

FilenameFilterComponent.prototype.Apply = function(){
  debug('FilenameFilter.Apply()');
  var filenames = [];
  var tag = [].concat(this.tag_buffer).join(' ');
  for(var shortname in this.filtered_hash_list){
    filenames.push(this.filtered_hash_list[shortname].file);
  }
  fileInfo.report_update(true);
  suppress_rescan = true;
  NSProxy.asyncCall('set_block_updates', 1).then(function(){
    Promise.each(filenames, function(filename, index, arrayLength) {
      return NSProxy.asyncCall('apply_tag', filename, tag).then(function(ret){
        // debug('success:', filename, tag, ret);
      })
    }).then(function(res){
      debug('done:', res);
      suppress_rescan = false;
      // on_file_changed();
      // refresh_libraryObj();
    })
  }).catch(function(e){
    NSProxy.asyncCall('set_block_updates', 0);
    // refresh_libraryObj();
  })
}

FilenameFilterComponent.prototype.Recursive = function(val){
  debug('Recursive():', val);
  this._recursive_toggle.set_value(val);  //this calls refresh
}

FilenameFilterComponent.prototype.select_file = function(num, shortname){
  debug(this._name+'.select_file:', num, shortname);
  if(this.filtered_hash_list[shortname]){
    FileTree.find_file(this.filtered_hash_list[shortname].file);
  }
}



function TagDisplayComponent(name, args){
  var self = this;
  this._grid = undefined;
  this._tag_choices = [];
  this._active_tags = [];
  this._onValue = 2;
  this._offValue = 7;
  this.offset = new OffsetComponent(this._name + 'Offset', 0, 1, 0, undefined, 1, 0, 1, {
    value:0,
    onValue:1,
    offValue:0,
    tasks:tasks,
    scroll_delay:8,
    scroll_hold:true
  });
  this.add_bound_properties(this, ['_button_press',
    '_grid',
    '_tag_choices',
    '_active_tags',
    'offset',
    'set_active_tags',
    'set_tag_choices',
    '_toggle_tag',
    '_update'
  ]);
  TagDisplayComponent.super_.call(this, name, args);
  this._init.apply(this);
}

util.inherits(TagDisplayComponent, Bindable);

TagDisplayComponent.prototype._init = function(){
  // debug(this._name, 'init');
  this.offset.set_target(this._update);
}

TagDisplayComponent.prototype.set_tag_choices = function(obj){
  this._tag_choices = [].concat(obj._value);
  this.offset.set_range(0, this._tag_choices.length);
}

TagDisplayComponent.prototype.set_active_tags = function(obj){
  this._active_tags = [].concat(obj._value);
  this._update();
}

TagDisplayComponent.prototype.assign_grid = function(grid){
	// debug(this._name, '.assign_grid:', grid);
	if(this._grid instanceof GridClass){
		this._grid.remove_listener(this._button_press);
	}
	this._grid = grid;
	if(this._grid instanceof GridClass){
		this._grid.add_listener(this._button_press);
	}
	this._update();
}

TagDisplayComponent.prototype._update = function(){
  // debug(this._name, '.update');
  if(this._grid){
    var active_tags = this._active_tags;
    var controls = this._grid.controls();
    for(var i in controls){
      var index = parseInt(i) + this.offset._value;
      controls[i]._send_text(this._tag_choices[index] ? this._tag_choices[index] : ' ');
      controls[i].send(this._tag_choices[index] ? active_tags.indexOf(this._tag_choices[index]) > -1 ? this._onValue : this._offValue : 0);
    }
  }
}

TagDisplayComponent.prototype._button_press = function(button){
	if(button.pressed()){
    var offset = this.offset._value;
    var controls = this._grid.controls();
    var index = controls.indexOf(button);
    var tag = this._tag_choices[index+offset];
    this._toggle_tag(tag);
	}
}

TagDisplayComponent.prototype._toggle_tag = function(tag){
  var new_tags = this._active_tags;
  var index = new_tags.indexOf(tag);
  if(index>-1){
    new_tags = new_tags.filter(function(val){
      return val!=tag
    });
  }
  else{
    new_tags.push(tag);
  }
  this.set_active_tags({_value:new_tags});
}



function AssignTagDisplayComponent(name, args){
  var self = this;
  this._in_update = false;
  this.add_bound_properties(this,
    ['_button_press',
    '_toggle_tag',
    'in_update'
  ]);
  AssignTagDisplayComponent.super_.call(this, name, args);
}

util.inherits(AssignTagDisplayComponent, TagDisplayComponent);

AssignTagDisplayComponent.prototype._init = function(){
  AssignTagDisplayComponent.super_.prototype._init.call(this);
  TagFilter._tagList.add_listener(this.set_tag_choices);
  fileInfo._active_tags.add_listener(this.set_active_tags);
}

AssignTagDisplayComponent.prototype._toggle_tag = function(tag){
  // debug('this._in_update', this._in_update);
  // if(!this._in_update){
  if(fileInfo.selected_file!=undefined){
    var self = this;
    this._in_update = true;
    AssignTagDisplayComponent.super_.prototype._toggle_tag.call(this, tag);
    FileTagger.toggle_tag(tag).then(function(res){
      self._in_update = false;
      debug('_toggle_tag response:', res);
    });
  }
}



function FilterTagDisplayComponent(name, args){
  var self = this;
  this._in_update = false;
  this.add_bound_properties(this,
    ['_button_press',
    '_toggle_tag',
  ]);
  FilterTagDisplayComponent.super_.call(this, name, args);
  fileInfo._active_tags.add_listener(this.set_active_tags);
}

util.inherits(FilterTagDisplayComponent, TagDisplayComponent);

FilterTagDisplayComponent.prototype._init = function(){
  FilterTagDisplayComponent.super_.prototype._init.call(this);
  TagFilter._tagList.add_listener(this.set_tag_choices);
  TagFilter._selected_tags.add_listener(this.set_active_tags);
}

FilterTagDisplayComponent.prototype._toggle_tag = function(tag){
  FilterTagDisplayComponent.super_.prototype._toggle_tag.call(this, tag);
  TagFilter._selected_tags.set_value(this._active_tags);
  // TagFilter.refresh();
}



function TargetChooserComponent(name, args){
  var self = this;
  this._grid = undefined;
  this._target_choices = [];
  this._selected_shortname = 'NOWAY';
  this._onValue = 2;
  this._offValue = 7;
  this.offset = new OffsetComponent(this._name + 'Offset', 0, 1, 0, undefined, 1, 0, 1, {
    value:0,
    onValue:1,
    offValue:0,
    tasks:tasks,
    scroll_delay:8,
    scroll_hold:true
  });
  this.add_bound_properties(this, ['_grid',
    'offset',
    '_onValue',
    '_offValue',
    '_target_choices',
    'set_target_choices',
    'set_selected_target',
    '_selected_shortname',
    '_button_press',
    '_update',
    'assign_grid',
    '_init'
  ]);
  TargetChooserComponent.super_.call(this, name, args);
  this._init.apply(this);
}

util.inherits(TargetChooserComponent, Bindable);

TargetChooserComponent.prototype._init = function(){
  this.offset.set_target(this._update);
}

TargetChooserComponent.prototype.assign_grid = function(grid){
	// debug(this._name, '.assign_grid:', grid);
	if(this._grid instanceof GridClass){
		this._grid.remove_listener(this._button_press);
	}
	this._grid = grid;
	if(this._grid instanceof GridClass){
		this._grid.add_listener(this._button_press);
	}
	this._update();
}

TargetChooserComponent.prototype._update = function(){
  // debug(this._name, '.update');
  if(this._grid){
    var controls = this._grid.controls();
    for(var i in controls){
      var index = parseInt(i) + this.offset._value;
      controls[i]._send_text(this._target_choices[index] ? this._target_choices[index] : ' ');
      controls[i].send(this._target_choices[index] ? this._target_choices[index] == this._selected_shortname ? this._onValue : this._offValue : 0);
    }
  }
}

TargetChooserComponent.prototype._button_press = function(button){
	if(button.pressed()){
    var offset = this.offset._value;
    var controls = this._grid.controls();
    var index = controls.indexOf(button);
    var target = this._target_choices[index+offset];
    this._select_target(index+offset, target);
	}
}

TargetChooserComponent.prototype._select_target = function(index, target){
  debug(this._name+'._select_target:', index, target);
  FileTagger.chooser_double(index, target);
}

TargetChooserComponent.prototype.set_target_choices = function(choices){
  // debug(this._name+'.set_target_choices:', choices);
  this._target_choices = [];
  for(var i in choices){
    this._target_choices.push(i);
  }
  this.offset.set_range(0, this._target_choices.length);
  this._update();
}

TargetChooserComponent.prototype.set_selected_target = function(target){
  debug(this._name+'.set_selected_target:', target);
}



function TextToggleParameter(name, args){
  var self = this;
  this._textOnValue = 'On';
  this._textOffValue = 'Off';
  this.add_bound_properties(this, []);
  TextToggleParameter.super_.call(this, name, args);
}

util.inherits(TextToggleParameter, ToggledParameter);

TextToggleParameter.prototype.set_control = function(control){
  if(this._control){
    this._control._send_text(' ');
  }
  TextToggleParameter.super_.prototype.set_control.call(this, control);
}

TextToggleParameter.prototype.update_control = function(value){
  TextToggleParameter.super_.prototype.update_control.call(this, value);
	if(this._control){
    this._control._send_text(this._value > 0 ? this._textOnValue : this._textOffValue);
  }
}



function TextMomentaryParameter(name, args){
  var self = this;
  this._textOnValue = 'On';
  this._textOffValue = 'Off';
  this.add_bound_properties(this, []);
  TextMomentaryParameter.super_.call(this, name, args);
}

util.inherits(TextMomentaryParameter, MomentaryParameter);

TextMomentaryParameter.prototype.set_control = function(control){
  if(this._control){
    this._control._send_text(' ');
  }
  TextMomentaryParameter.super_.prototype.set_control.call(this, control);
}

TextMomentaryParameter.prototype.update_control = function(value){
  TextMomentaryParameter.super_.prototype.update_control.call(this, value);
	if(this._control){
    this._control._send_text(this._value > 0 ? this._textOnValue : this._textOffValue);
  }
}



function TextModeClass(number_of_modes, name, args){
  this.require_dependencies(this, ['_mode_labels']);
  TextModeClass.super_.call(this, number_of_modes, name, args);
}

util.inherits(TextModeClass, ModeClass);

TextModeClass.prototype.update = function(){
  TextModeClass.super_.prototype.update.call(this);
  if(this.mode_cycle_button){
    this.mode_cycle_button._send_text(this._mode_labels[this._value] ? this._mode_labels[this._value] : ' ');
  }
}

TextModeClass.prototype.set_mode_buttons = function(buttons){
  TextModeClass.super_prototype.set_mode_buttons.call(this, buttons);
	for (var i in this.mode_buttons){
		this.mode_buttons[i]._send_text(this._mode_labels[i] ? this._mode_labels[i] : ' ');
	}
}



function SpecialPageStack(number_of_modes, name, args){
	this.add_bound_properties(this, ['current_page', 'restore_mode']);
	this._pages = new Array(number_of_modes);
	PageStack.super_.call(this, number_of_modes, name, args);
	this._value = -1;
}

util.inherits(SpecialPageStack, TextModeClass);

SpecialPageStack.prototype.add_mode = function(mode, page){
	if ((isClass(page, 'Page')) && (mode < this._mode_callbacks.length)){
		this._pages[mode] = page;
	}
	else{
		debug('Invalid add_mode assignment for', this._name, mode, ':', page);
	}
}

SpecialPageStack.prototype.change_mode = function(value, force){
	if((-1 < value)&&(value < this._mode_callbacks.length)){
		if((this._value != value)||(force)){
			this._pages[this._value]&&this._pages[this._value].exit_mode();
			this._value = value;
			this._pages[this._value]&&this._pages[this._value].enter_mode();
			this.update();
		}
	}
}

SpecialPageStack.prototype.current_page = function(){
	return this._pages[this.current_mode()];
}

SpecialPageStack.prototype.restore_mode = function(){
	this.change_mode(this._value, true);
}



function SpecialCellBlockChooserComponent(name, args){
  var self = this;
  this._active_tag_notifier = undefined;
  this.set_tag = new MomentaryParameter(this._name + 'SetTag', {value:0});
  this.add_bound_properties(this, ['_active_tag_notifier',
   '_refresh',
   'set_tag'
  ]);
  SpecialCellBlockChooserComponent.super_.call(this, name, args);
}

util.inherits(SpecialCellBlockChooserComponent, CellBlockChooserComponent);

SpecialCellBlockChooserComponent.prototype._init = function(){
  SpecialCellBlockChooserComponent.super_.prototype._init.call(this);
  this._obj.message('cols', 2);
  this._obj.message('col', 0, 'width', 165);
  this._obj.message('grid', 1);
  this._obj.message('col', 1, 'width', 30);
  this._obj.message('col', 1, 'jus', 0);
}

SpecialCellBlockChooserComponent.prototype.input = function(col, row, item){
  if(col==1){
    if(this._contents[row]){
      // debug('SpecialCellBlockChooserComponent.input.marker:', row, item);
      this.set_tag.set_value(this._contents[row].value);
    }
  }
  else{
    SpecialCellBlockChooserComponent.super_.prototype.input.call(this, col, row, item);
  }
}

SpecialCellBlockChooserComponent.prototype._refresh = function(){
  SpecialCellBlockChooserComponent.super_.prototype._refresh.call(this);
  if(this._active_tag_notifier){
    var marked = [].concat(this._active_tag_notifier._value);
    // debug('marked:', marked);
    for(var i in this._contents){
      var is_marked = marked.indexOf(this._contents[i].value)>-1;
      var val = is_marked ? 'X' : ' ';
      this._obj.message('set', 1, parseInt(i), val);
    }
  }
}

SpecialCellBlockChooserComponent.prototype.append = function(){
  var args = arrayfromargs(arguments);
  SpecialCellBlockChooserComponent.super_.prototype.append.apply(this, args);
  this._obj.message('col', 1, 'width', this._contents.length>this._row_height ? 12 : 30);
}

SpecialCellBlockChooserComponent.prototype.set_active_tag_notifier = function(obj){
  if(this._active_tag_notifier){
    this._active_tag_notifier.remove_listener(this._refresh);
  }
  this._active_tag_notifier = obj;
  this._active_tag_notifier.add_listener(this._refresh);
}



//Remote key functions//
function AddTag(val){
  // debug('AddTag', val);
  FileTagger.set_tag();
}

function RemoveTag(val){
  // debug('RemoveTag', val);
  FileTagger.remove_tag();
}

function ClearAllTags(val){
  // debug('ClearAllTags', val);
  FileTagger.clear_tags();
}

function Editor(val){
  // debug('Editor');
  if(Alive){
    if(editor){
      if(val){
        editor.open();
      }
      else{
        //var pos = editor._obj.subpatcher().wind.location;
        //debug('pos:', pos);
        editor.close();
      }
    }
  }
}

function OpenPreset(){
  debug('OpenPreset');
  NSProxy.asyncCall('open_preset', fileInfo.selected_file);
}

function Batch(val){
  if(Alive){
    if(batchEditor){
      if(val){
        batchEditor.open();
      }
      else{
        //var pos = editor._obj.subpatcher().wind.location;
        //debug('pos:', pos);
        batchEditor.close();
      }
    }
  }
}




forceload(this);








// function FileTreeComponent(name, args){
// 	this.add_bound_properties(this, [
//     'init_parent_node',
//     'input',
//     'select_parent',
//     'select_child',
//     'open_child',
//     '_parentChooser',
//     '_filesChooser',
//     '_treeobj',
//     'current_parent_node',
//     'current_child_node',
//     '_dict',
//     '_treeobj',
//     'empty_child_node',
//     'parent_list',
//     'child_list',
//     'selected_parent_path',
//     'selected_child_path',
//     'Defer',
//     'miraDefer',
//     'find_file',
//     '_miraParentChooser',
//     '_miraFilesChooser',
//     '_always_select_first_item',
//     'update_libraryObj'
//   ]);
// 	FileTreeComponent.super_.call(this, name, args);
//   // this._treeobj = util.dict_to_jsobj(this._dict);
//   this._treeobj = {name:'root',
//     root:undefined,
//     root_path:undefined,
//     parents:[],
//     parent: undefined,
//     children:{}
//   };
//   this.current_parent_node = this._treeobj;
//   this.current_child_node = undefined;
//   this.parent_list = [];
//   this.child_list = [];
//   this._always_select_first_item = true;
//   // this.selected_parent_path = undefined;
//   // this.selected_child_path = undefined;
// }
//
// util.inherits(FileTreeComponent, Bindable);
//
// FileTreeComponent.prototype._init = function(args){
//   debug('FileTreeComponent._init', this.current_parent_node);
//   // this.init_parent_node();
// }
//
// FileTreeComponent.prototype.input = function(){
//   /**distributes input to Class instance to its available methods*/
//   var args = arrayfromargs(arguments);
//   //debug('FileTree.input:', args);
//   try{
//     this[args[0]].apply(this, args.slice(1));
//   }
//   catch(err){
//     util.report_error(err);
//   }
// }
//
// FileTreeComponent.prototype.init_parent_node = function(){
//   //used to make sure that when refreshing, some undefined vars don't cause exception in this.refresh
//   if((!this.current_parent_node)||(!this._treeobj.name)){
//     // debug('FileTree.init_parent_node', !this.current_parent_node, this._treeobj.name);
//     this.current_parent_node = this._treeobj.children[Object.keys(this._treeobj.children)];
//   }
// }
//
// FileTreeComponent.prototype.update_files = function(){
//   debug('FileTree.update_files');
//   this._treeobj = util.dict_to_jsobj(filetreeDict);
//   this.update_libraryObj(this._treeobj);
//   this.refresh_parent_node();
//   this.init_parent_node();
//   // this.refresh_child_node();
//   // this.refresh();
//   this.find_file(fileInfo.selected_file);
// }
//
// FileTreeComponent.prototype.update_files = function(){
//   debug('FileTree.update_files');
//   this._treeobj = util.dict_to_jsobj(this._dict);
//   this.update_libraryObj(this._treeobj);
//   this.refresh_parent_node();
//   this.init_parent_node();
//   this.find_file(fileInfo.selected_file);
// }
//
// FileTreeComponent.prototype.update_file = function(file_name){
//   debug('FileTree.update_file');
//   var root = this._treeobj.parent;
//   var parents = file_name.toString().replace(root, '').split('/');
//   var dictBranch = get_child_dict(filetreeDict, parents);
//   var newObj = util.dict_to_jsobj(dictBranch);
//   libraryObj[file_name] = {tags:[].concat(newObj.tags), shortname:newObj.name};
//   var parent_node = this.parent_node_for_path(file_name);
//   parent_node.children[newObj.name] = newObj;
//   parent_node = this.parent_node_for_path(file_name);
// }
//
// FileTreeComponent.prototype.update_libraryObj = function(node){
//   // count = count !=undefined ? count : 0;
//   for(var i in node.children){
//     var child_node = node.children[i];
//     if(child_node.type=='file'){
//       libraryObj[child_node.path] = {tags:[].concat(child_node.tags), shortname:child_node.name};
//       // if(count<50){
//       //   count+=1;
//       //   var debugNode = libraryObj[child_node.path];
//       //   debug('to libraryObj:', child_node.path, debugNode.shortname, debugNode.tags);
//       // }
//     }
//     this.update_libraryObj(child_node);
//   }
// }
//
// FileTreeComponent.prototype.refresh = function(){
//   /**refreshes current UI elements with current dir data*/
//   debug('REFRESH!!!');
//   // debug('current_root', this.current_parent_node.name);
//   mira_gate.message(0);
//   var current_root = retrieve_parent(this._treeobj, this.current_parent_node.parents);
//   // debug('FileTree parent_node:', current_root.name);
//   this.parent_list = [];
//   for(var i in current_root.children){
//     this.parent_list.push(current_root.children[i]);
//   }
//   if(current_root.type!='root'){
//     this.parent_list.push({name:'<==back', type:'back_command', parents:[current_root]});
//   }
//   ParentBackButton.message('active', current_root.type!='root');
//   messnamed('from_preset_tagger', 'back', 'active', current_root.type!='root');
//   this._parentChooser.clear();
//   messnamed('from_preset_tagger', 'parent', 'clear');
//   for(var i in this.parent_list){
//     this._parentChooser.append(this.parent_list[i].name);
//     messnamed('from_preset_tagger', 'parent', 'append', this.parent_list[i].name);
//   }
//   var selected_index = this.parent_list.indexOf(this.current_parent_node);
//   if(selected_index>-1){
//     // debug('found selected parent');
//     // this._Defer.message('parent', 'set', selected_index);
//     this._parentChooser.set(selected_index);
//     // this._miraDefer.message('parent', 'set', selected_index);
//     messnamed('from_preset_tagger_deferred', 'parent', 'set', selected_index);
//   }
//
//   var current_dir = this.current_parent_node ? this.current_parent_node : {name:'none', children:[], type:root};
//   debug('FileTree child_node:', current_dir.name);
//   this._filesChooser.clear();
//   if(!TagFilter.selected_tags.length>0){
//     messnamed('from_preset_tagger', 'files', 'clear');
//   }
//   if(current_dir.type != 'root'){
//     this.child_list = [];
//
//     for(var i in current_dir.children){
//       this.child_list.push(current_dir.children[i]);
//     }
//     for(var i in this.child_list){
//       this._filesChooser.append(this.child_list[i].name);
//       if(!TagFilter.selected_tags.length>0){
//         messnamed('from_preset_tagger', 'files', 'append', this.child_list[i].name);
//       }
//     }
//     var selected_index = this.child_list.indexOf(this.current_child_node);
//     selected_index  = selected_index >-1 ? selected_index : undefined;
//     if(selected_index>-1){
//       this._filesChooser.set(selected_index);
//       // this._miraDefer.message('files', 'set', selected_index);
//       if(!TagFilter.selected_tags.length>0){
//         messnamed('from_preset_tagger_deferred', 'files', 'set', selected_index);
//       }
//     }
//     else{
//       this._filesChooser.set();
//     }
//   }
//   mira_gate.message(1);
// }
//
// FileTreeComponent.prototype.select_parent = function(index, item){
//   /**input from left browser pane*/
//   // debug('FileTree.select_parent:', index, item);
//   if(index!=undefined){
//     if(this.parent_list.length){
//       var entry = this.parent_list[index];
//       if(entry.type == 'folder'){
//         this.current_parent_node = this.parent_list[index];
//         this.current_child_node = undefined;
//         fileInfo.select_file();
//         this.refresh();
//         // if(this._always_select_first_item){
//         //   this.select_child(0);
//         // }
//       }
//       else if(entry.type == 'file'){
//         var parent_node = retrieve_parent(this._treeobj, entry.parents);
//         if(this.current_parent_node.type == 'root'){
//           this.current_child_node = entry;
//           fileInfo.select_file(entry.path);
//         }
//         else{
//           this.current_child_node = entry;
//           this.current_parent_node = parent_node;
//           this.refresh();
//         }
//       }
//       else if(entry.type == 'back_command'){
//         this.current_parent_node = entry.parents[0];
//         this.current_child_node = undefined;
//         fileInfo.select_file();
//         this.refresh();
//         // if(this._always_select_first_item){
//         //   this.select_child(0);
//         // }
//       }
//     }
//     else{
//       this.refresh();
//     }
//   }
// }
//
// FileTreeComponent.prototype.open_parent = function(index, item){
//   /**double-click from left pane of browser*/
//   // debug('FileTree.open_parent:', index, item);
//   if(index!=undefined){
//     if(this.parent_list.length){
//       var entry = this.parent_list[index];
//       if(entry.type == 'folder'){
//         this.current_parent_node = this.parent_list[index];
//         this.refresh();
//       }
//       else if(entry.type == 'file'){
//         var parent_node = retrieve_parent(this._treeobj, entry.parents);
//         if(this.current_parent_node.type == 'root'){
//           this.current_child_node = entry;
//           fileInfo.select_file(entry.path);
//           NSProxy.asyncCall('open_preset', entry.path);
//         }
//         else{
//           this.current_child_node = entry;
//           this.current_parent_node = parent_node;
//           this.refresh();
//         }
//       }
//       else if(entry.type == 'back_command'){
//         this.current_child_node = undefined;
//         this.current_parent_node = entry.parents[0];
//         this.refresh();
//       }
//     }
//     else{
//       this.refresh();
//     }
//   }
// }
//
// FileTreeComponent.prototype.select_child = function(index, item){
//   /**input from right browser pane*/
//   // debug('FileTree.select_child:', index, item);
//   if(index!=undefined){
//     if(this.child_list.length){
//       var entry = this.child_list[index];
//       if(entry.type == 'folder'){
//         this.current_child_node = undefined;
//         this.current_parent_node = entry;
//         fileInfo.select_file(undefined);
//         this.refresh();
//       }
//       else if(entry.type == 'file'){
//         this.current_child_node = entry;
//         fileInfo.select_file(entry.path);
//         this.refresh();
//       }
//     }
//     else{
//       this.refresh();
//     }
//   }
// }
//
// FileTreeComponent.prototype.open_child = function(index, item){
//   /**double-click from right pane of browser*/
//   // debug('FileTree.open_child:', index, item);
//   if(index!=undefined){
//     var entry = this.child_list[index];
//     if(entry.type == 'folder'){
//       this.current_child_node = undefined;
//       this.current_parent_node = entry;
//       this.refresh();
//       fileInfo.select_file(undefined);
//
//     }
//     else if(entry.type == 'file'){
//       this.current_child_node = entry;
//       fileInfo.select_file(entry.path);
//       NSProxy.asyncCall('open_preset', entry.path);
//     }
//   }
// }
//
// FileTreeComponent.prototype.find_file = function(path){
//   /**used primarily by selected file from filter window*/
//   // debug('FileTree.find_file:', path);
//   if(path){
//     var root = this._treeobj.parent;
//     var parents = path.toString().replace(root, '').split('/');
//     var ft_obj = retrieve_child(this._treeobj, parents);
//     //debug('found obj:', ft_obj.name);
//     if(parents&&ft_obj){
//       this.current_parent_node = retrieve_parent(this._treeobj, ft_obj.parents);
//       this.current_child_node = ft_obj;
//       fileInfo.select_file(ft_obj.path);
//     }
//   }
//   this.refresh();
// }
//
// FileTreeComponent.prototype.refresh_parent_node = function(){
//   var node = this.current_parent_node;
//   if((node)&&(node.name!='root')){
//     this.current_parent_node = retrieve_child(this._treeobj, node.parents.concat([node.name]));
//   }
// }
//
// FileTreeComponent.prototype.refresh_child_node = function(){
//   // var node = this.current_parent_node;
//   // this.current_child_node = retrieve_child(this._treeobj, node.parents.concat([node.name]));
// }
//
// FileTreeComponent.prototype.node_for_path = function(path){
//   debug('FileTree.node_for_path:', path);
//   var node = undefined;
//   if(path){
//     var root = this._treeobj.parent;
//     var parents = path.toString().replace(root, '').split('/');
//     var ft_obj = retrieve_child(this._treeobj, parents);
//     node = ft_obj;
//   }
//   return node
// }
//
// FileTreeComponent.prototype.parent_node_for_path = function(path){
//   debug('FileTree.parent_node_for_path:', path);
//   var node = undefined;
//   if(path){
//     var root = this._treeobj.parent;
//     var parents = path.toString().replace(root, '').split('/');
//     var ft_obj = retrieve_child(this._treeobj, parents);
//     var parent_obj = retrieve_parent(this._treeobj, ft_obj.parents);
//     node = parent_obj;
//   }
//   return node
// }
//
// FileTreeComponent.prototype.set_tags_internal = function(path, tags){
//   //this is turned off for now, since there is no way to read part of a dict from node4max
//   var node = this.node_for_path(path);
//   var current_tags = [].concat(node.tags);
//   var new_tags = [].concat(tags);
//   for(var i in new_tags){
//     var tag = new_tags[i];
//     if(current_tags.indexOf(tag)==-1){
//       node.tags.push(tag);
//     }
//   }
//   libraryObj[node.name].tags = node.tags;
//   this.store_node_tags_to_Dict(node);
// }
//
// FileTreeComponent.prototype.remove_tags_internal = function(path, tags){
//   //this is turned off for now, since there is no way to read part of a dict from node4max
//   var node = this.node_for_path(path);
//   var current_tags = [].concat(node.tags);
//   var new_tags = [].concat(tags);
//   for(var i in new_tags){
//     var tag = new_tags[i];
//     var index = current_tags.indexOf(tag);
//     if(index>-1){
//       node.tags.splice(index);
//     }
//   }
//   libraryObj[node.name].tags = node.tags;
//   this.store_node_tags_to_Dict(node);
// }
//
// FileTreeComponent.prototype.clear_tags_internal = function(path){
//   //this is turned off for now, since there is no way to read part of a dict from node4max
//   var node = this.node_for_path(path);
//   node.tags = [];
//   libraryObj[node.name].tags = node.tags;
//   this.store_node_tags_to_Dict(node);
// }
//
// FileTreeComponent.prototype.store_node_tags_to_Dict = function(node){
//   //this is used by set/remove/clear_tags_internal
//   var dict = get_child_dict(this._dict, node.parents);
//   dict.set('tags', node.tags);
// }

// function on_specific_file_changed(filename){
//   debug('on_specific_file_changed', filename);
//   // if(!suppress_rescan){
//     if(!fileInfo._needs_to_update){
//       fileInfo.report_update(true);
//       FileTree.update_file(filename);
//       TagFilter.refresh();
//       FileTagger.refresh();
//       fileInfo.update();
//     }
//     // if(SHOW_DICTS){
//     SHOW_LIB_DICT&&this.patcher.getnamed('library').message('wclose');
//     SHOW_LIB_DICT&&this.patcher.getnamed('library').message('edit');
//     SHOW_TREE_DICT&&this.patcher.getnamed('filetree').message('wclose');
//     SHOW_TREE_DICT&&this.patcher.getnamed('filetree').message('edit');
//     // };
//     fileInfo.report_update(false);
//   // }
// }


// FileTreeComponent.prototype.update_file = function(file_name){
//   debug('FileTree.update_file');
//   var root = this._treeobj.parent;
//   var parents = file_name.toString().replace(root, '').split('/');
//   var dictBranch = get_child_dict(filetreeDict, parents);
//   var newObj = util.dict_to_jsobj(dictBranch);
//   libraryObj[file_name] = {tags:[].concat(newObj.tags), shortname:newObj.name};
//   var parent_node = this.parent_node_for_path(file_name);
//   parent_node.children[newObj.name] = newObj;
//   parent_node = this.parent_node_for_path(file_name);
// }
