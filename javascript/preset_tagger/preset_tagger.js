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
var FORCELOAD = false;
var DEBUG = false;
var NODE_DEBUG = false;
var SHOW_DICTS = false;
var EDITOR_OPEN = false;
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
var libraryObj = {};
var nodeScriptInitialized = false;

var finder;
var mod;
var found_mod;
var mod_finder;
var Mod = ModComponent.bind(script);
var ModProxy = ModProxyComponent.bind(script);

var BROWSERXSIZE = 796;
var BROWSERYSIZE = 360;
var MULTITAG_DELAY = 3000;

function anything(){}

function init(){
  debug('init', this._name);
  finder = new LiveAPI();
  setup_tasks();
  setup_library();
  setup_patcher();
  setup_browser();
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
  restart_button.hidden = 1;
  if(SHOW_DICTS){
    this.patcher.getnamed('library').message('edit');
    this.patcher.getnamed('filetree').message('edit');
  }
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
  script['editor'] = new FloatingWindowModule('Editor', {
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
  script['browserInput'] = function(){
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
                                                      debug:false,
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
    restart_button.hidden = 0;
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
  FileTree.find_file('/Users/amounra/Music/Ableton/User Library/Presets/Audio Effects/Audio Effect Rack Test/@d_12 Instrument FX 043020.adg');
  debug('tags:', fileInfo.active_tags);
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
    return NSProxy.asyncCall('init_from_js');
  }).then(function(path){
    return node_script_initialized(path);
  }).catch(function(err){
    debug('NSProxy setup error:', err.message);
    util.report_error(err);
    if(err.message=='no library path'){
      select_library_button.message(1);
      node_script_initialized();
    };
  });
}

function node_script_initialized(libdir_from_nodescript){
  // debug('node_script_initialized:', libdir_from_nodescript);
  nodeScriptInitialized = true;
  library_directory = libdir_from_nodescript;
  debug('NSProxy init finished');
  deprivatize_script_functions(script);
  library_directory&&activate();
}

function activate(){
  debug('activate');
  library_updated();
  TagFilter.clear_filter();
  restart_button.hidden = 1;
  editor.lock();
  if(EDITOR_OPEN){
    editor.open();
    EditorButton.message(1);
  };
  Alive = true;
  DEBUG&&setup_tests();
}


/** called from nodescript instance when it starts its update*/
function on_file_changed(){
  if(!fileInfo._needs_to_update){
    fileInfo.report_update(true);
    scan_library();
  }
}

/** called from nodescript instance when it finishes its update*/
function library_updated(){
  // debug('library_updated triggered...');
  libraryObj = util.dict_to_jsobj(libraryDict);
  FileTree.update_files();
  TagFilter.refresh();
  FileTagger.refresh();
  fileInfo.update();

  if(SHOW_DICTS){
    // this.patcher.getnamed('library').message('wclose');
    // this.patcher.getnamed('library').message('edit');
    this.patcher.getnamed('filetree').message('wclose');
    this.patcher.getnamed('filetree').message('edit');
  };
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
  });
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
	this.add_bound_properties(this, ['init_parent_node', 'input', 'select_parent',
   'select_child', 'open_child', '_parentChooser', '_filesChooser', '_treeobj',
   'current_parent_node', 'current_child_node', '_dict', '_treeobj',
   'empty_child_node', 'parent_list', 'child_list', 'selected_parent_path',
   'selected_child_path', 'Defer', 'miraDefer', 'find_file', '_miraParentChooser',
   '_miraFilesChooser', '_always_select_first_item']);
	FileTreeComponent.super_.call(this, name, args);
  this._treeobj = util.dict_to_jsobj(this._dict);
  this.current_parent_node = this._treeobj;
  this.current_child_node = undefined;
  this.parent_list = [];
  this.child_list = [];
  this._always_select_first_item = true;
  // this.selected_parent_path = undefined;
  // this.selected_child_path = undefined;
}

util.inherits(FileTreeComponent, Bindable);

FileTreeComponent.prototype._init = function(args){
  debug('FileTreeComponent._init', this.current_parent_node);
  this.init_parent_node();
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
}

FileTreeComponent.prototype.update_files = function(){
  // debug('FileTree.update_files');
  this._treeobj = util.dict_to_jsobj(filetreeDict);
  this.refresh_parent_node();
  this.init_parent_node();
  // this.refresh_child_node();
  // this.refresh();
  this.find_file(fileInfo.selected_file);
}

FileTreeComponent.prototype.refresh = function(){
  /**refreshes current UI elements with current dir data*/
  debug('REFRESH!!!');
  // debug('current_root', this.current_parent_node.name);
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
  debug('FileTree child_node:', current_dir.name);
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

FileTreeComponent.prototype.select_parent = function(index, item){
  /**input from left browser pane*/
  // debug('FileTree.select_parent:', index, item);
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
  if(index!=undefined){
    if(this.child_list.length){
      var entry = this.child_list[index];
      if(entry.type == 'folder'){
        this.current_child_node = undefined;
        this.current_parent_node = entry;
        fileInfo.select_file(undefined);
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
    //debug('found obj:', ft_obj.name);
    if(parents&&ft_obj){
      this.current_parent_node = retrieve_parent(this._treeobj, ft_obj.parents);
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

FileTreeComponent.prototype.refresh_child_node = function(){
  // var node = this.current_parent_node;
  // this.current_child_node = retrieve_child(this._treeobj, node.parents.concat([node.name]));
}



function retrieve_parent(obj, parents){
  //parents = [].concat(parents);
  if((!parents)||(!parents.length)){
    return obj.children[Object.keys(obj.children)[0]];
  }
  parents = [].concat(parents);
  //debug('here', obj.name, parents, typeof parents);
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
}

FileTaggerComponent.prototype.set_tag = function(){
  return NSProxy.asyncCall('apply_tag', fileInfo.selected_file, this.tag_buffer);
}

FileTaggerComponent.prototype.remove_tag = function(){
  NSProxy.asyncCall('remove_tag', fileInfo.selected_file, this.tag_buffer);
}

FileTaggerComponent.prototype.clear_tags = function(){
  NSProxy.asyncCall('clear_tags', fileInfo.selected_file);
}

FileTaggerComponent.prototype.set_folder_tags = function(){
  // FileTree.set_folder_tags();
  if(FileTree.current_parent_node.type == 'folder'){
    NSProxy.asyncCall('apply_folder_tags', FileTree.current_parent_node.path, this.tag_buffer);
  }
}

FileTaggerComponent.prototype.remove_folder_tags = function(){
  // FileTree.remove_folder_tags();
  if(FileTree.current_parent_node.type == 'folder'){
    NSProxy.asyncCall('remove_folder_tags', FileTree.current_parent_node.path, this.tag_buffer);
  }
}

FileTaggerComponent.prototype.clear_folder_tags = function(){
  // FileTree.clear_folder_tags();
  if(FileTree.current_parent_node.type == 'folder'){
    NSProxy.asyncCall('clear_folder_tags', FileTree.current_parent_node.path);
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
  if(selected_file){
    // var selected_shortname = libraryDict.get(selected_file+'::shortname');
    var selected_shortname = libraryObj.shortname;
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
  debug(this._name+'.set_target_choices:', choices);
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





forceload(this);


//This object keeps track of how often an objects tags are changed,
//Sends them when a reasonable interval has gone by,
function TagSetBuffer(name, args){
  var self = this;
  this.add_bound_properties(this, []);
  TagSetBuffer.super_.call(this, name, args);
}

util.inherits(TagSetBuffer, Bindable);

TagSetBuffer.prototype._init = function(){}

TagSetBuffer.prototype._init = function(){}
