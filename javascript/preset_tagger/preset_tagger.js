autowatch = 1;

/**TODO:
Rewrite db logic so that only filename is needed instead of full file path
Figure out exception protocol for filenames with apostrophes
Add pref settings for quicktab names
Add pref setting for Live.app name (for opening presets via node.open())
Implement a scheme for finding the correct preview file for presets.
Random button on Commander.
*/

var unique = jsarguments[1];

aumhaa = require('_base');
util = require('aumhaa_util');


var MaxColors = {OFF : [0, 0, 0], WHITE : [1, 1, 1], YELLOW: [1, 1, 0], CYAN: [0, 1, 1], MAGENTA: [1, 0, 1], RED: [1, 0, 0], GREEN: [0, 1, 0], BLUE: [0, 0, 1]};

//util.inject(this, util);
var FORCELOAD = false;
var DEBUG = false;
var NODE_DEBUG = false;
var SHOW_TREE_DICT = false;
var SHOW_LIB_DICT = false;
var SHOW_SNAPSHOT_DICT = false;
var EDITOR_OPEN = false;
var BATCH_OPEN = false;
var MOD_DEBUG = false;
var EDITOR_FLOAT = true;
var INITIAL_FILTER_MODE = true;

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
var prefFile_prefix = '~/Library/Preferences';
var prefFile_path = prefFile_prefix + '/com.aumhaa.preset_tagger_preferences.json';
var dbFile_path = prefFile_prefix + '/com.aumhaa.preset_tagger_DB';  //irregular...check it further down if you change it
var default_prefs = {preferences:{path:''}};
var preferences = {preferences:{path:''}};
var library_directory = undefined;
var library_base = undefined;
var libraryObj = {};
var previewObj = {};
var testLibraryData = {};
var filetreeDict = new Dict('filetree');
var snapshotDict = new Dict('snapshot');
var filesDict = new Dict();
var parentDict = new Dict();
var nodeScriptInitialized = false;
var suppress_rescan = false;  //currently this is set in batch operations, but its not observed anywhere.
var VALID_FILE_TYPES = ['.aupreset', '.adg', '.adv', '.wav', '.aif', '.json'];
var VALID_MAX_FILE_TYPES = ['AUps', '.adg', '.adv', '.wav', '.aif', '.json'];
var QUICKTAB_NAMES = ['BS', 'PD', 'LD', 'PL', 'SAMPLE', '-', '-', '-'];
// var SQLITE_DB_NAME = './PresetTaggerDB';

var finder;
var mod;
var found_mod;
var mod_finder;
var Mod = ModComponent.bind(script);
var ModProxy = ModProxyComponent.bind(script);

// var BROWSERXSIZE = 796;
// var BROWSERYSIZE = 360;
var BROWSERXSIZE = 796;
var BROWSERYSIZE = 826;
var BATCHXSIZE = 203;
var BATCHYSIZE  = 550;
var PREFSXSIZE = 100;
var PREFSYSIZE  = 200;
var SEARCHXSIZE = 500;
var SEARCHYSIZE  = 80;
var MULTITAG_DELAY = 250;
var MAX_MIRA_DROPDOWN_LENGTH = 1000;
var MAX_FILE_LIST_LENGTH = 10000;

function anything(){}

function init(){
  debug('init', this._name);
  finder = new LiveAPI();
  setup_tasks();
  setup_library();
  setup_patcher();
  setup_tagDB();
  setup_browser();
  setup_batch_editor();
  setup_preferences();
  setup_search_window();
  setup_fileinfo();
  setup_filetree();
  setup_filetagger();
  setup_tagfilter();
  setup_tagchooser();
  setup_filterchooser();
  setup_targetchooser();
  setup_preview();
  setup_favorites();
  setup_randomizer();
  setup_controls();
  setup_modes();
  setup_mainfx_button();
  setup_tagmode_button();
  setup_audition_button();
  setup_quicktabs();
  setup_mod();
  setup_preference_file();
  NODE_DEBUG&&node_debug.front();
  //editor._floatToggle.receive(1);
  setup_nodescript();
  // initialize_nodescript();
  deprivatize_script_functions(script);  /**this is needed for _grid, _key, etc mod funcs */
  library_directory&&activate();
  setup_tests();
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
  script.prefs_patcher = this.patcher.getnamed('modPT_preferences');
  script.batch_patcher = this.patcher.getnamed('batch_editor');
  script.current_selected_file = browser_patcher.subpatcher().getnamed('current_selected_file');
  script.selected_file_tags = browser_patcher.subpatcher().getnamed('selected_file_tags');
  script.tag_buffer_display = browser_patcher.subpatcher().getnamed('tag_buffer_display');
  script.libPath = this.patcher.getnamed('libPath');
  script.EditorButton = this.patcher.getnamed('Editor');
  script.BatchButton = this.patcher.getnamed('BatchButton');
  script.PrefsButton = this.patcher.getnamed('PrefsButton');
  script.ParentBackButton = browser_patcher.subpatcher().getnamed('parent_back_button');
  script.ChildrenBackButton = browser_patcher.subpatcher().getnamed('children_back_button');
  script.mira_gate = this.patcher.getnamed('mira_gate');
  script.node_debug = this.patcher.getnamed('node_debug');
  script.restart_button = this.patcher.getnamed('restart_button');
  script.select_library_button = this.patcher.getnamed('select_library_button');
  script.preview_button = browser_patcher.subpatcher().getnamed('preview_button');
  script.bufferObj = this.patcher.getnamed('preview_buffer');
  script.playObj = this.patcher.getnamed('preview_play');
  script.waveform = browser_patcher.subpatcher().getnamed('waveform');
  script.favorites_pattr = this.patcher.getnamed('favorites');
  script.textFilter = browser_patcher.subpatcher().getnamed('textFilter');
  script.search_window = this.patcher.getnamed('search_window');
  script.snapshotDictObj = this.patcher.getnamed('snapshotDict');
  script.sqliteWindow = this.patcher.getnamed('sqliteWindow');
  script.sqliteDisplay = sqliteWindow.subpatcher().getnamed('sqliteDisplay');
  script.quicktabs = [];
  for(var i=0; i<8; i++){
    quicktabs[i] = browser_patcher.subpatcher().getnamed('quicktab['+i+']');
    quicktabs[i].message('text', QUICKTAB_NAMES[i]);
  }

  restart_button.hidden = 0;
  restart_button.message('text', 'LOADING');

  show_lib_dict();
  show_tree_dict();
  //need to zero out all input and feedback windows here so there's no confusion while patching
}

function setup_tagDB(){
  //initialize the DB file in case it doesn't exist, because SQLite object can't write a new file.
  var found = false;
	var f = new Folder(prefFile_prefix);
	while(!f.end){
		f.next();
		if(f.filename=='com.aumhaa.preset_tagger_DB'){
			found = true;
		}
	}
  f.close();
	if(!found){
		var text = this.patcher.newdefault(300, 300, "text");
		text.message('write', dbFile_path);
    this.patcher.remove(text);
	}

  script.tagDB = new TagDatabase('TagDatabase', {window:sqliteWindow, display:sqliteDisplay});
  script.restore_snapshot = tagDB.restore_snapshot;
  script.merge_snapshot = tagDB.merge_snapshot;
  script.save_snapshot = tagDB.save_snapshot;
  script.prune = tagDB.prune;
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

  script.quicktab_controls = [];
  for(var i in quicktabs){
    quicktab_controls[i] = new SpecialGUITextButton(i,
      {jsObj:quicktabs[i],
        index:i,
        onValue: [200, 0, 20],
        offValue: [25, 25, 25],
    });
  };

  var obj = browser_patcher;
	var window_position = obj.subpatcher().getnamed('window_position');
  script.editor = new FloatingWindowModule('Editor', {
    'window_position':window_position,
    'obj':obj,
    'sizeX':BROWSERXSIZE,
    'sizeY':BROWSERYSIZE,
    'nominimize':true,
    'nozoom':false,
    'noclose':true,
    'nogrow':true,
    'notitle':false,
    'float':EDITOR_FLOAT
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
  var window_position = obj.subpatcher().getnamed('window_position');
  script.batchEditor = new FloatingWindowModule('BatchEditor', {
    'window_position':window_position,
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

function setup_preferences(){
  var obj = prefs_patcher;
  var window_position =  obj.subpatcher().getnamed('window_position');
  script.prefsWindow = new FloatingWindowModule('PrefsWindow', {
    'window_position':window_position,
    'obj':obj,
    'sizeX':PREFSXSIZE,
    'sizeY':PREFSYSIZE,
    'nominimize':true,
    'nozoom':false,
    'noclose':true,
    'nogrow':true,
    'notitle':false,
    'float':false
  });
  prefsWindow.lock();
  // debug('prefsWindow.lock');
  script['prefsInput'] = function(){
    var args = arrayfromargs(arguments);
    if(args[0]=='close'){
      PrefsButton.message('set', 0);
    }
    try{
      prefsWindow[args[0]].apply(prefsWindow, args.slice(1));
    }
    catch(err){
      util.report_error(err);
    }
  }
}

function setup_search_window(){
  var obj = search_window;
  var window_position =  obj.subpatcher().getnamed('window_position');
  var textedit = obj.subpatcher().getnamed('textedit');
  script.searchWindow = new FloatingWindowModule('SearchWindow', {
    'window_position':window_position,
    'obj':obj,
    'sizeX':SEARCHXSIZE,
    'sizeY':SEARCHYSIZE,
    'nominimize':true,
    'nozoom':false,
    'noclose':true,
    'nogrow':true,
    'notitle':true,
    'float':true,
    'textedit':textedit
  });
  searchWindow.lock();
  // debug('searchWindow.lock');
  script['searchWindowInput'] = function(){
    var args = arrayfromargs(arguments);
    if(args[0]=='texteditInput'){
      debug('textedit_IN', args);
      textFilter.message('set', args.slice(1));
      textFilter.message('bang');
      searchWindow.close();
    }
    else{
      try{
        searchWindow[args[0]].apply(prefsWindow, args.slice(1));
      }
      catch(err){
        util.report_error(err);
      }
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
    debug('file_chooser input:', obj, obj._value, obj._doublepressed);100000
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
  script.previewPlayer = new PreviewPlayerComponent('PreviewPlayer', {waveform:waveform, bufferObj:bufferObj, playObj:playObj});
  script.toPreviewPlayer = previewPlayer.input;
}

function setup_favorites(){
  script.faves = new FavoritesComponent('Favorites', {pattr:favorites_pattr});
  faves._favorites.add_listener(tag_chooser._refresh);
}

function setup_randomizer(){
  script.randomizer = new RandomizerComponent('Randomizer', {tagFilter:'tagFilter', fileNameFilter:'fileNameFilter'});
  script.toRandomizer = randomizer.input;
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
  if(MOD_DEBUG){
    found_mod.debug = debug;
  }
  var mod_callback = function(args){
  	if((args[0]=='value')&&(args[1]!='bang'))
  	{
  		debug('mod callback:', args);
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
  // editor.unlock();
  // for(var i in quicktab_controls){
  //   quicktab_controls[i].add_listener(function(obj){debug('quicktab:', obj._value)});
  //
  // }
  // quicktab_radio.add_listener(function(obj){debug('radio:', obj._value)});
  // searchWindow.open();
  // var res = sqlite.exec("SELECT * FROM filenames", sqliteResult);
  // debug('result is:', res);
  // var len = sqliteResult.numrecords();
  // for(var i=0;i<len;i++){
  //   debug('item is:', sqliteResult.value(2, i), sqliteResult.value(1, i));
  // }
  // scan_library_internal(library_directory);
  // tagDB.update_all();
  // load_preferences();
  // tagDB.prune();
  // debug(JSON.stringify(previewObj));
  // debug('previewObj:', JSON.stringify(previewObj));
  // tagDB._db.open(SQLITE_DB_NAME, 1);
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
    randomizer.RandomControl.set_control(KeyButtons[4]);
    mainFxButton.set_control(KeyButtons[2]);
    tagModeButton.set_control(KeyButtons[6]);
    KeyButtons[0]._send_text('<');
    KeyButtons[1]._send_text('>');
	}
	selectPage.exit_mode = function()
	{
    //TagFilter._filterMode.set_control();
    TagFilter.ClearFilter.set_control();
    Randomizer.RandomControl.set_control();
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

function setup_audition_button(){
  ShiftButton.add_listener(function(){Audition();});
}

function setup_quicktabs(){
  script.quicktabs = new QuicktabComponent('Quicktabs', {radio_buttons_raw:quicktab_controls, QUICKTAB_NAMES:QUICKTAB_NAMES, tag_filter:TagFilter, tag_chooser:tag_chooser});
}

function setup_preference_file(){
  nodeScriptInitialized = true;
  load_preferences();
  library_directory = preferences.preferences.path;
  library_base = library_directory.split(basename(library_directory))[0];
}

function setup_nodescript(){
  // debug('setup_nodescript');
  script['NSProxy'] = new NodeScriptProxy('NSProxy', {obj:node_script,
                                                      cabled:false,
                                                      debug:NODE_DEBUG,
                                                      debugTypes:['error']});
  script['asyncResolve'] = NSProxy.asyncResolve;
  script['nodeDump'] = NSProxy.nodeDump;
  script['toNSProxy'] = NSProxy.receive;

  var initialize_nodescript = function(){
    NSProxy.initialize().then(function(res){
      debug('SCRIPT', 'success', JSON.stringify(res));
      NSProxy.asyncCall('set_library', library_directory).then(function(){
        debug('returned from set_library');
      }).catch(function(err){
        debug('NSProxy set_library error:', err.message);
        util.report_error(err);
        if(err.message=='no library path'){
          select_library_button.message(1);
        };
      });
    }).catch(function(e){
      util.report_error(e);
    });
  };

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
    // restart_button.hidden = 0;
    // restart_button.message('text', 'RESTART');
  }

  NSProxy.addTerminationCallback(on_nodescript_terminated);
  initialize_nodescript();
}

function activate(){
  debug('activate');
  library_changed();
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



/** These functions are called directly from Nodescript **/
/** called from nodescript instance when it starts its update*/
function on_file_changed(){
  if(!fileInfo._needs_to_update){
    fileInfo.report_update(true);
    library_changed();
  }
}

//this needs to be updated in node script to send the full filepath
/** this function recieves a request from node to
reload only the specific file that has changed*/
function on_specific_file_changed(){
  var args = arrayfromargs(arguments);
  var filename = args[0];
  var tags = args.slice(1);
  debug('on_specific_file_changed', filename, 'tags:', tags, typeof tags);
  // if(libraryObj[filename]){
  //   libraryObj[filename].tags = tags;
  // }
  if(!fileInfo._needs_to_update){
    fileInfo.report_update(true);
    // FileTree.update_file(filename);
    FileTree.update_files();
    TagFilter.refresh();
    FileTagger.refresh();
    fileInfo.update();
  }
  show_lib_dict();
  show_tree_dict();
  fileInfo.report_update(false);
}

/** called from nodescript instance when it finishes its update*/
function library_changed(){
  debug('library_changed triggered...');
  tagDB.rebuild_libraryObj();
  FileTree.update_files();
  TagFilter.refresh();
  FileTagger.refresh();
  fileInfo.update();

  show_lib_dict();
  show_tree_dict();

  // debug('...library_updated finished');
  fileInfo.report_update(false);
}



/** These function are called directly from Commander **/
/** inter-maxpat message from top pane of commander device */
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
        // debug('sending command....');
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

/** called on commander load?  */
function update_remote_display(){
  FileTree.refresh_mira();
  // refresh_tagchooser();
  TagFilter.redraw_tagchooser();
  messnamed('from_preset_tagger', 'and_or', 'set', TagFilter.filter_mode_value);
}



//convenience functions from patcher
function unlock_editor(){
  editor.unlock();
}

function restart(){
  init();
}


//FileTreeComponent
function scan_library(){
  library_changed();
}

//FileTreeComponent
function set_library(){
  var args = arrayfromargs(arguments);
  debug('set_library:', args);
  preferences.preferences.path = args[0];
  library_directory = args[0];
  library_base = library_directory.split(basename(library_directory))[0];
  //clear the selected file
  fileInfo.clear_selected_file();
  //reset the filetree to the root folder
  FileTree.current_parent_node = undefined;
  FileTree.current_child_node = undefined;
  FileTree.init_nodes();
  FileTree.select_folder(library_directory);
  //set filewatcher
  NSProxy.asyncCall('set_library', args[0]).then(function(res){
    debug('SET_LIBRARY response:', res);
  }).catch(function(e){
    util.report_error(e);
  })
  if(!Alive){
    activate();
  }
  else {
    library_changed();
  }
}

//FileTreeComponent
function set_global_path(){
  save_preferences();
}



//SHOW_LIB_DICT turns this on
function show_lib_dict(){
  SHOW_LIB_DICT&& this.patcher.getnamed('library').message('wclose');
  SHOW_LIB_DICT&& this.patcher.getnamed('library').message('edit');
}

//SHOW_TREE_DICT turns this on
function show_tree_dict(){
  SHOW_TREE_DICT&&this.patcher.getnamed('filetree').message('wclose');
  SHOW_TREE_DICT&&this.patcher.getnamed('filetree').message('edit');
}



function TagDatabase(name, args){
  var self = this;
  this.add_bound_properties(this, [
    '_db',
    '_result',
    'libraryData',
    'snapshotDict',
    'merge_snapshot',
    'restore_snapshot',
    'save_snapshot',
    'scan_folder',
    'scan_file',
    'scan_preview_file',
    'scan_preview_folder'
  ]);
  this.libraryData = {};
  this.snapshotDict = new Dict('snapshot');
  this._db = new SQLite;
  this._result = new SQLResult;
  this._db.open(dbFile_path, 1);
  this._db.exec('CREATE TABLE IF NOT EXISTS filenames (filename TEXT PRIMARY KEY, tags TEXT, shortname TEXT)', this._result);
  TagDatabase.super_.call(this, name, args);
  // this._window.front();
}

inherits(TagDatabase, EventEmitter);

TagDatabase.prototype.close = function(){
  this._db.close();
}

TagDatabase.prototype.set_tags = function(filename, tags){
  // debug('tagDB set_tags:', filename, tags);
  if((tags=='')||(tags==[])||(tags==undefined)){
    this.clear_tags(filename);
  }
  else{
    libraryObj[filename].tags = tags;
    var shortname = libraryObj[filename].shortname;
    this._db.exec("INSERT OR REPLACE into filenames (filename, tags, shortname) VALUES ('"+filename+"', '"+tags+"', '"+shortname+"')", this._result);
  }
}

TagDatabase.prototype.apply_tag = function(filename, tags){
  // debug('tagDB apply_tag:', filename, tags);
  if(libraryObj[filename]){
    var stored_tags = [].concat(libraryObj[filename].tags);
    debug('tags are:', tags, stored_tags);
    var tag_buf = [].concat(tags);
		var new_tags = [];
    var shortname = libraryObj[filename].shortname;
		for(var i in tag_buf){
			if(stored_tags.indexOf(tag_buf[i])==-1){
				new_tags.push(tag_buf[i]);
			}
		}
		new_tags = stored_tags.concat(new_tags);
    libraryObj[filename].tags = new_tags;
    this._db.exec("INSERT OR REPLACE into filenames (filename, tags, shortname) VALUES ('"+filename+"', '"+new_tags+"', '"+shortname+"')", this._result);
  }
}

TagDatabase.prototype.remove_tag = function(filename, tags){
  // debug('tagDB remove_tag:', filename, tags);
  if(libraryObj[filename]){
    var stored_tags = [].concat(libraryObj[filename].tags);
    debug('tags are:', tags, stored_tags);
    var tag_buf = [].concat(tags);
  	var new_tags = [];
    var shortname = libraryObj[filename].shortname;
		for(var i in stored_tags){
			var index = tag_buf.indexOf(stored_tags[i]);
			if(index==-1){
				new_tags.push(stored_tags[i]);
			}
		}
    new_tags = [].concat(new_tags);
    libraryObj[filename].tags = new_tags;
    if(new_tags.length){
      this._db.exec("INSERT OR REPLACE into filenames (filename, tags, shortname) VALUES ('"+filename+"', '"+new_tags+"', '"+shortname+"')", this._result);
    }
    else{
      this._db.exec("DELETE FROM filenames WHERE filename = '"+filename+"'", this._result);
    }
  }
}

TagDatabase.prototype.clear_tags = function(filename){
  debug('tagDB clear_tags:', filename);
  if(libraryObj[filename]){
    libraryObj[filename].tags = [];
    this._db.exec("DELETE FROM filenames WHERE filename = '"+filename+"'", this._result);
  }
}

TagDatabase.prototype.set_folder_tags = function(filenames, tags){
  for(var i in filenames){
    this.apply_tag(filenames[i], tags);
  }
}

TagDatabase.prototype.remove_folder_tags = function(filenames, tags){
  for(var i in filenames){
    this.remove_tag(filenames[i], tags);
  }
}

TagDatabase.prototype.clear_folder_tags = function(filenames, tags){
  for(var i in filenames){
    this.clear_tags(filenames[i]);
  }
}

TagDatabase.prototype.restore_snapshot = function(filename){
  // /**restore a dict json to the current library, delets all entries and adds entries from json**/
	debug('restore_snapshot:', filename, typeof filename);
  snapshotDictObj.message('import', filename);
  SHOW_SNAPSHOT_DICT&&snapshotDictObj.edit();
  var snapshotContents = JSON.parse(snapshotDict.stringify());
  var libObj = snapshotContents.data;
  var libDir = library_directory;
  this._db.exec('DELETE FROM filenames', this._result);
  var file, tags, shortname;
	for(var item in libObj){
		file = libDir+item.toString();
    if(file.indexOf("'")==-1){
  		tags = [].concat(libObj[item].tags.toString().split(',')).filter(Boolean).sort();
      shortname = libObj[item].shortname;
      try{
        // this._db.exec("INSERT OR REPLACE INTO filenames(filename, tags, shortname) VALUES('"+file+"', '"+tags+"', '"+shortname+"')", this._result); // "ON CONFLICT(filename) DO UPDATE SET tags='"+tags+"')", this._result);
        this._db.exec("INSERT INTO filenames(filename, tags, shortname) VALUES('"+file+"','"+tags+"','"+shortname+"')", this._result); //" ON CONFLICT(filename) DO UPDATE SET tags='"+consolidated_tags+" WHERE TRUE );", this._result);
      }
      catch(e){
        debug('error:', e);
      }
  	}
  }
  library_changed();
}

TagDatabase.prototype.merge_snapshot = function(filename){
  // /**additively restore a dict json to the current library, merely adds new entries to existing db */

  var unique = function(item, index, array){
    return array.indexOf(item) == index;
  }

  debug('merge_snapshot:', filename, typeof filename);
  snapshotDictObj.message('import', filename);
  SHOW_SNAPSHOT_DICT&&snapshotDictObj.edit();
  var snapshotContents = JSON.parse(snapshotDict.stringify());
  var libObj = snapshotContents.data;
  var libDir = library_directory;
  var file, snapshot_tags, shortname, db_tags, consolidated_tags;
	for(var item in libObj){
  	file = libDir+item.toString(); //.replace("'", "\'");
    if(file.indexOf("'")==-1){
  		snapshot_tags = [].concat(libObj[item].tags.toString().split(',')).filter(Boolean).sort();
      shortname = libObj[item].shortname; //.replace("'", "\'");
      this._db.exec("SELECT * FROM filenames WHERE filename = '"+file+"'", this._result);
      db_tags = this._result.value(0, 1);
      db_tags = db_tags ? db_tags.toString().split(',') : [];
      consolidated_tags = db_tags.concat(snapshot_tags).filter(unique);
      // debug('db_tags:', db_tags, 'snapshot_tags:', snapshot_tags, 'consolidated_tags:', consolidated_tags);
      try{
        this._db.exec("INSERT OR REPLACE INTO filenames(filename, tags, shortname) VALUES('"+file+"','"+consolidated_tags+"','"+shortname+"')", this._result); //" ON CONFLICT(filename) DO UPDATE SET tags='"+consolidated_tags+" WHERE TRUE );", this._result);
      }
      catch(e){
        debug('error:', e);
      }
    }
	}
  library_changed();
}

TagDatabase.prototype.save_snapshot = function(){
  // var args = arrayfromargs(arguments);
  debug('save_snapshot'); //, args);
  var snapshotData = {};
  for(var i in libraryObj){
    //debug('entry:', i, JSON.stringify(libraryObj[i]));
    if((libraryObj[i].tags)&&(libraryObj[i].tags.length)&&(libraryObj[i].tags!=[""])){
      var name = i.replace(library_directory, '');
      snapshotData[name] = libraryObj[i];
    }
  }
  snapshotDict.parse(JSON.stringify({library_directory:library_directory, data:snapshotData}));
  snapshotDictObj.message('export');
}

TagDatabase.prototype.rebuild_libraryObj = function(){
  this.create_file_database_from_directory(library_directory);
  this.read_tags_from_database();
  // this.create_preview_database_from_directory();
}

TagDatabase.prototype.read_tags_from_database = function(){
  this._db.exec("SELECT * FROM filenames", this._result);
  var len = this._result.numrecords();
  for(var i=0;i<len;i++){
    // debug('filename:', this._result.value(0, i), this._result.value(2,i), this._result.value(1,i));
    var filepath = this._result.value(0, i);
    var tags = this._result.value(1,i).split(',');
    if((libraryObj[filepath])&&(tags!='')){
      libraryObj[filepath].tags = tags;
    }
  }
}

TagDatabase.prototype.create_file_database_from_directory = function(library_directory){
  libraryObj = {};
  previewObj = {};

  var folder = new Folder(library_directory);
  if((folder)&&(folder.pathname==library_directory)){
    debug('library_dir is:', library_directory);
    try{
      this.scan_folder(library_directory);
    }
    catch(e){
      debug('problem with tagDB.load_database_into_memory', e.message);
    }
  }
  else{
    debug('problem with tagDB.load_database_into_memory');
  }
  folder.close();
  previewObj.check = {filename:'fuck you'};
}

TagDatabase.prototype.scan_folder = function(dir_name){
  var f = new Folder(dir_name);
  while(!f.end){
    if(f.filetype == 'fold'){
      if(f.filename=='_Preview'){
        this.scan_preview_folder(pathJoin([f.pathname, f.filename]));
      }
      else{
        this.scan_folder(pathJoin([f.pathname, f.filename]));
      }
    }
    else if(VALID_FILE_TYPES.indexOf(f.extension)>-1){
      this.scan_file(pathJoin([f.pathname, f.filename]), f.filename);
    }
    f.next();
  }
  f.close();
}

TagDatabase.prototype.scan_file = function(file_name, shortname){
  libraryObj[file_name] = {tags:[], shortname:shortname, preview:''};
  // this._db.exec("INSERT INTO all_filenames(file_name, shortname) VALUES('"+file_name+"', '"+shortname+"')", this._result);
}

TagDatabase.prototype.scan_preview_folder = function(dir_name){
  // debug('_________________________________________________scan preview folder', dir_name);
  var f = new Folder(dir_name);
  // f.typelist = ['WAVE', 'AIFF'];
  var filename, shortname;
  while(!f.end){
    filename = pathJoin([f.pathname, f.filename]);
    if(f.filetype == 'fold'){
      this.scan_preview_folder(filename);
    }
    else if(['.wav', '.aif'].indexOf(f.extension)>-1){
      shortname = f.filename;
      this.scan_preview_file(filename, shortname);
    }
    f.next();
  }
  f.close();
}

TagDatabase.prototype.scan_preview_file = function(filename, shortname){
  // shortname = shortname.replace(/\.[^/.]+$/, "");
  //var new_shortname = shortname.substr(0, shortname.lastIndexOf('.')).split('[')[0].replace('Freeze ', ''); //.replace(/\.[^/.]+$/, "");
  var new_shortname = shortname.substr(0, shortname.lastIndexOf('.'))
  // debug('new_shortname:', new_shortname);
  // shortname = toString(shortname.split('[')[0]);
  // filename = toString(file_name);
  previewObj[new_shortname] = {filename:filename};
  // debug('preview:', file_name, shortname);
}

TagDatabase.prototype.prune = function(){
  //remove all filename entries that don't have tags assigned.
  this._db.exec('DELETE FROM filenames WHERE tags IS NULL', this._result);
  this._db.exec('DELETE FROM filenames WHERE tags = ""', this._result);
}

TagDatabase.prototype.update_all = function(){
  this._db.exec("SELECT * FROM filenames", this._result);

  var numfields = this._result.numfields();
  var numrecords = this._result.numrecords();
  var fieldnames = new Array(numfields);
  var values = new Array(numfields);

  this._display.message("clear", "all");
  this._display.message("cols", numfields);
  this._display.message("rows", numrecords + 1);    // rows +1 so we can create a header row

  for(var i=0; i<numfields; i++)
    this._display.message("set", i, 0, this._result.fieldname(i));

  this._update_window();
}

TagDatabase.prototype._update_window = function(){
  debug('_update_window');
  var numfields = this._result.numfields();
  var numrecords = this._result.numrecords();
  var fieldnames = new Array(numfields);
  var values = new Array(numfields);
  debug('numfields:', numfields, 'numrecords:', numrecords, 'fieldnames:', fieldnames, 'values:', values);

  for(var i=0; i<numrecords; i++){
    for(var j=0; j<numfields; j++){
      this._display.message("set", j, i+1, this._result.value(j, i));
    }
  }
}



function FavoritesComponent(name, args){
  this._favorites = new ArrayParameter(this._name+'_Favorites', {value:[]});
  this.add_bound_properties(this, ['_favorites',
    'toggle_favorite'
  ]);
  FavoritesComponent.super_.call(this, name, args);
  this._init.call(this);
}

util.inherits(FavoritesComponent, Bindable);

FavoritesComponent.prototype._init = function(){
  var favorites = [].concat(favorites_pattr.getvalueof());
  this._favorites._value = favorites;
  debug('faves value is:', this.favorites);
}

FavoritesComponent.prototype.__defineGetter__('favorites', function(){
  return this._favorites._value;
})

FavoritesComponent.prototype.toggle_favorite = function(tag){
  debug('toggle_favorite', tag);
  var current_favorites = this.favorites;
  var index = current_favorites.indexOf(tag);
  if(index>-1){
    current_favorites.splice(index, 1)
  }
  else{
    current_favorites.push(tag);
  }
  this._favorites.receive(current_favorites);
  favorites_pattr.message(current_favorites);
  debug('faves are now:', favorites_pattr.getvalueof());
}



function RandomizerComponent(name, args){
  var self = this;
  this.add_bound_properties(this, ['input', 'select_random_preset', 'ClearFilter']);
  this.RandomControl = new TextMomentaryParameter(this._name + '_RandomControl', {
    onValue:2,
    offValue:2,
    textOnValue:'Random',
    textOffValue:'Random'
  });
  this.RandomControl.add_listener(function(obj){obj._control._value&&self.select_random_preset();});
  RandomizerComponent.super_.call(this, name, args);
}

util.inherits(RandomizerComponent, Bindable);

RandomizerComponent.prototype.input = function(){
  var args = arrayfromargs(arguments);
  debug(this._name, 'input:', args);
  if(args[0] in this){
    this[args[0]].apply(this, args.slice(1));
  }
}

RandomizerComponent.prototype.select_random_preset = function(){
  debug('select_random_preset');
  var hashlist = TagFilter.filtered_files;
  var shortnames = Object.keys(hashlist);
  var len = shortnames.length;
  var randN = parseInt(Math.random()*len);
  var path = hashlist[shortnames[randN]].file;
  debug('file to open:', path);
  NSProxy.asyncCall('open_preset', path);
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

PreviewPlayerComponent.prototype.preview_current = function(){
  this._preview(fileInfo._filepath);
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
  debug('preview', obj._value);
  if(file!=''){
    var f = new File(file, 'read');
    var type = f.filetype;
    // var ext = f.extension;
    // debug('ext is:', ext, 'type:', type);
    f.close()
    if((type=='AIFF')||(type=='WAVE')){
      this._bufferObj.message('sizeinsamps', 20000);
      this._bufferObj.message('clear');
      this._bufferObj.message('read', file);
      this._playObj.message('start', 0, 200000, 200000);
    }
    else if(libraryObj[file]){
      debug('previewObj:', JSON.stringify(previewObj));
      var prev_shortname = libraryObj[file].shortname.substr(0, libraryObj[file].shortname.lastIndexOf('.'));
      debug('preview shortname', prev_shortname);
      var prevfile = previewObj[prev_shortname];
      debug('preview file', prevfile);
      if(prevfile){
        this._bufferObj.message('sizeinsamps', 20000);
        this._bufferObj.message('clear')
        this._bufferObj.message('read', prevfile.filename);
        this._playObj.message('start', 0, 200000, 200000);
      }
    }
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
  this._in_update = false;
  this.fileAccessButton = new MomentaryParameter(this._name + '_FileAccess', {value:0, onValue:5, offValue:1});
  this.add_bound_properties(this, ['_flush_changed_tags',
    'buffer_tags',
    '_flush_task',
    '_needs_to_update',
    'fileAccessButton',
    '_in_update',
    'report_update',
    'clear_selected_files'
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
  if(!this._in_update){
    if(filepath!=this.selected_file){
      debug('_filepath.set_value:', filepath, this.selected_file);
      this._filepath.set_value(filepath);
      // this._active_tags.set_value(filepath in libraryObj ? libraryObj[filepath].tags : []);
      this.update();
    }
  }
  else{
    this._filepath._value = filepath;
  }
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
  if(!this._in_update){
    var tags = this.active_tags;
    var path = this.selected_file;
    selected_file_tags.message('set', tags ? tags : '');
    current_selected_file.message('set', path ? '...'+path.slice(-58) : '');
  }
}

FileInfoComponent.prototype.report_update = function(val){
  this._in_update = val;
  if(this._in_update){
    debug('report_update true');
    current_selected_file.message('bgfillcolor', 1, 0, 0, 1);
    current_selected_file.message('set', 'ACCESSING FILES...');
    this.fileAccessButton.set_value(1);
  }
  else{
    debug('report_update false');
    current_selected_file.message('bgfillcolor', .2, .5, 1, 1);
    this.fileAccessButton.set_value(0);
    // this._filepath.notify();  //this was causing a double _preview.  Not sure what ill effects removing it will have.
    this.refresh();
  }
}

FileInfoComponent.prototype.clear_selected_file = function(){
  this._filepath._value = undefined;
  this._shortname._value = undefined;
  this._active_tags._value = [];
}


/**
*  Component deals with all file-structure browser navigation tasks.
*  Basically everything in the left two browser windows.
*/
function FileTreeComponent(name, args){
  var self = this;
	this.add_bound_properties(this, [
    'input',
    'select_parent',
    'open_parent',
    'select_child',
    'open_child',
    '_parentChooser',
    '_filesChooser',
    'current_parent_node',
    'current_child_node',
    '_dict',
    'parent_list',
    'child_list',
    'miraDefer',
    'find_file',
    'find_folder',
    '_miraParentChooser',
    '_miraFilesChooser',
    '_always_select_first_item',
    '_current_root',
    '_current_folder',
    'refresh',
    'refresh_editor',
    'refresh_mira',
    'selection_list_from_path',
    'push_lists',
    'init_nodes'
  ]);
  this._current_root = new MomentaryParameter(this._name+'_CurrentRoot', {value:undefined});
  this._current_folder = new MomentaryParameter(this._name+'_CurrentRoot', {value:undefined});
	FileTreeComponent.super_.call(this, name, args);
  this.current_parent_node = this._treeobj;
  this.current_child_node = undefined;
  this.parent_list = [];
  this.child_list = [];
  this._always_select_first_item = true;
  this._init();
}

util.inherits(FileTreeComponent, Bindable);

FileTreeComponent.prototype.__defineGetter__('current_root', function(){
  return this._current_root._value
})

FileTreeComponent.prototype.__defineGetter__('current_folder', function(){
  return this._current_folder._value
})

FileTreeComponent.prototype._init = function(args){
  debug('FileTreeComponent._init', this.current_parent_path);
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

FileTreeComponent.prototype.init_nodes = function(){
  if(library_directory){
    debug('init_nodes select_root', library_directory);
    this.select_root(library_directory);
    this.refresh_editor();
    this.refresh_mira();
  }
}

FileTreeComponent.prototype.update_files = function(){
  debug('FileTree.update_files');
  if(fileInfo.selected_file){
    this.find_file(fileInfo.selected_file);
  }
  else if(this.current_parent_node){
    this.find_folder(this.current_parent_node.path);
  }
  else{
    this.init_nodes();
  }
}

FileTreeComponent.prototype.update_file = function(file_name){
  debug('FileTree.update_file:', file_name);
  if(fileInfo.selected_file==file_name){
    this.find_file(file_name);
  }
}

FileTreeComponent.prototype.refresh_editor = function(){
  ParentBackButton.message('active', this.current_root != library_directory);
  this._parentChooser.clear();
  for(var i in this.parent_list){
    this._parentChooser.append(this.parent_list[i].name);
  }
  var selected_index = indexOfNodePath(this.parent_list, this.current_parent_node);
  this._parentChooser.set(selected_index > -1 ? selected_index : undefined);

  this._filesChooser.clear();
  for(var i in this.child_list){
    this._filesChooser.append(this.child_list[i].name);
  }
  var selected_index = indexOfNodePath(this.child_list, this.current_child_node);
  this._filesChooser.set(selected_index > -1 ? selected_index : undefined);
}

FileTreeComponent.prototype.refresh_mira = function(){
  mira_gate.message(0);
  messnamed('from_preset_tagger', 'back', 'active', this.current_root != library_directory);
  messnamed('from_preset_tagger', 'parent', 'clear');
  var found_parent_items = [];
  var found_child_items = [];
  for(var i in this.parent_list){
    // messnamed('from_preset_tagger', 'parent', 'append', this.parent_list[i].name);
    found_parent_items.push(this.parent_list[i].name);
  }
  parentDict.parse(JSON.stringify({items:found_parent_items}));
  messnamed('from_preset_tagger', 'parent', 'dictionary', parentDict.name);
  var selected_index = indexOfNodePath(this.parent_list, this.current_parent_node);
  if(selected_index>-1){
    // this._miraDefer.message('parent', 'set', selected_index);
    messnamed('from_preset_tagger_deferred', 'parent', 'set', selected_index);
  }
  var current_dir = this.current_parent_path ? this.current_parent_path : {name:'none', children:[], type:'root'};
  if(!TagFilter.selected_tags.length){
    messnamed('from_preset_tagger', 'files', 'clear');
    if(current_dir.path != library_directory){
      for(var i in this.child_list){
        // messnamed('from_preset_tagger', 'files', 'append', this.child_list[i].name);
        found_child_items.push(this.child_list[i].name);
      }
      filesDict.parse(JSON.stringify({items:found_child_items}));
      messnamed('from_preset_tagger', 'files', 'dictionary', filesDict.name);
      var selected_index = indexOfNodePath(this.child_list, this.current_child_node);
      selected_index  = selected_index >-1 ? selected_index : undefined;
      if(selected_index>-1){
        // this._miraDefer.message('files', 'set', selected_index);
        messnamed('from_preset_tagger_deferred', 'files', 'set', selected_index);
      }
    }
  }
  mira_gate.message(1);
}

FileTreeComponent.prototype.select_root = function(path){
  debug('select_root:', path);
  if(path != this._current_root._value){
    fileInfo.report_update(true);
    debug('current root is now:', path);
    // this.create_primary_node(path);
    this.parent_list = this.selection_list_from_path(path);
    //instead of this, there should be a isInDir() function.....
    if(path != library_directory){
      this.parent_list.push({name:'<==back', type:'back_command', path:path});
    }
    this._current_root.receive(path);
    fileInfo.report_update(false);
  }
}

FileTreeComponent.prototype.select_folder = function(path){
  debug('select_folder:', path);
  if(path != this._current_root._value){
    fileInfo.report_update(true);
    debug('current folder is now:', path);
    this.child_list = this.selection_list_from_path(path);
    this.push_lists();
    this._current_folder.receive(path);
    fileInfo.report_update(false);
  }
}

FileTreeComponent.prototype.select_parent = function(index, item){
  /**input from left browser pane*/
  debug('FileTree.select_parent:', index, item, this.parent_list.length);
  if(index!=undefined){
    if(this.parent_list.length){
      var entry = this.parent_list[index];
      var type = entry.type;
      if(type == 'folder'||type =='back_command'){
        this.find_folder(entry.path);
      }
      else if(type == 'file'){
        this.find_file(entry.path);
      }
    }
  }
}

FileTreeComponent.prototype.open_parent = function(index, item){
  /**double-click from left pane of browser*/
  // debug('FileTree.open_parent:', index, item);
  if(index!=undefined){
    if(this.parent_list.length){
      var entry = this.parent_list[index];
      var type = entry.type;
      if(type == 'file'){
        this.find_file(entry.path);
        NSProxy.asyncCall('open_preset', entry.path);
      }
      else{
        this.select_parent(index, item);
      }
    }
  }
}

FileTreeComponent.prototype.select_child = function(index, item){
  /**input from right browser pane*/
  debug('FileTree.select_child:', index, item);
  if(index!=undefined){
    if(this.child_list.length){
      var entry = this.child_list[index];
      // debug('entry is:', entry.name);
      var type = entry.type;
      if(type == 'folder'){
        this.find_folder(entry.path);
      }
      else if(type == 'file'){
        this.find_file(entry.path);
      }
    }
  }
}

FileTreeComponent.prototype.open_child = function(index, item){
  /**double-click from right pane of browser*/
  // debug('FileTree.open_child:', index, item);
  if(index!=undefined){
    var entry = this.child_list[index];
    var type = entry.type;
    if(type == 'folder'){
      this.find_folder(entry.path);
    }
    else if(type == 'file'){
      this.find_file(entry.path)
      NSProxy.asyncCall('open_preset', entry.path);
    }
  }
}

FileTreeComponent.prototype.find_folder = function(path){
  /**used in all instances to execute a change in folder focus*/
  debug('FileTree.find_folder:', path);
  if(path){
    fileInfo.select_file(undefined);
    var root = parentPath(path);
    debug('find_folder select_root');
    this.select_root(root);
    this.current_parent_node = this.parent_list[indexOfNodePath(this.parent_list, {name:basename(path)})];
    this.select_folder(path);
    this.current_child_node = undefined;
    this.refresh_editor();
    this.refresh_mira();
  }
  else{
    this.init_nodes();
  }
}

FileTreeComponent.prototype.find_file = function(path){
  /**used in all instances to execute a change in file focus*/
  debug('FileTree.find_file:', path);
  if(path){
    fileInfo.select_file(path);
    var parent = parentPath(path);
    var root = parentPath(parent);
    // debug('find_file select_root');
    this.select_root(root);
    this.current_parent_node = this.parent_list[indexOfNodePath(this.parent_list, {name:basename(parent)})];
    this.select_folder(parent);
    this.current_child_node = this.child_list[indexOfNodePath(this.child_list, {name:basename(path)})];
    this.refresh_editor();
    this.refresh_mira();
  }
}

FileTreeComponent.prototype.selection_list_from_path = function(directory){
	debug(this._name+'.selection_list_from_path:', directory);
  try{
    var tree = [];
    var f = new Folder(directory);
    var type, name, path, parent;
    while (!f.end) {
      type = f.filetype == 'fold' ? 'folder' : 'file';
    	if(type=='folder'|| VALID_FILE_TYPES.indexOf(f.extension)>-1){
        name = f.filename;
        path = pathJoin([f.pathname, f.filename]);
        // var parents = parents_from_path(path);
        parent = type == 'folder' ? directory.split(name)[0] : f.pathname;
  			tree.push({
          name: name,
      		path: path,
      		type: type,
      		parent: parent
        });
      }
      f.next();
     }
     f.close();
   }
   catch(e){
     debug('scan_folder fail:', util.report_error(e));
   }
   return tree
}

FileTreeComponent.prototype.refresh = function(){
  this.refresh_mira();
}

//this is mostly just to view data structures during development
FileTreeComponent.prototype.push_lists = function(){
  // this._dict.parse(JSON.stringify({parent_list:this.parent_list, child_list:this.child_list}));
  // show_tree_dict();
}


/**
*  Component deals with all tagging tasks.
*  Basically everything in right two windows of editor,
*  as well as all actions in the bottom section.
*/
function FileTaggerComponent(name, args){
  //deals with assigning tags to individual files or the contents of folders
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
    tagDB.set_tags(filepath, new_tags);
    TagFilter.refresh();
    fileInfo.update();
  //   return NSProxy.asyncCall('set_tags', filepath, new_tags);
  }
  // return Promise.reject(new Error('tag was not an array'));

}

FileTaggerComponent.prototype.set_tag = function(){
  //this is turned off for now, since there is no way to read part of a dict from node4max
  // FileTree.set_tags_internal(fileInfo.selected_file, this.tag_buffer);
  // return NSProxy.asyncCall('apply_tag', fileInfo.selected_file, this.tag_buffer);
  tagDB.apply_tag(fileInfo.selected_file, this.tag_buffer);
  TagFilter.refresh();
  fileInfo.update();
}

FileTaggerComponent.prototype.remove_tag = function(){
  //this is turned off for now, since there is no way to read part of a dict from node4max
  // FileTree.remove_tags_internal(fileInfo.selected_file, this.tag_buffer);
  // NSProxy.asyncCall('remove_tag', fileInfo.selected_file, this.tag_buffer);
  tagDB.remove_tag(fileInfo.selected_file, this.tag_buffer);
  TagFilter.refresh();
  fileInfo.update();
}

FileTaggerComponent.prototype.clear_tags = function(){
  //this is turned off for now, since there is no way to read part of a dict from node4max
  // FileTree.clear_tags_internal(FileInfo.selected_file);
  // NSProxy.asyncCall('clear_tags', fileInfo.selected_file);
  tagDB.clear_tags(fileInfo.selected_file);
  TagFilter.refresh();
  fileInfo.update();
}

FileTaggerComponent.prototype.set_folder_tags = function(){
  if(FileTree.current_parent_node.type == 'folder'){
    var filenames = recurse_folder(FileTree.current_parent_node.path, []);
    debug('filenames:', filenames);
    var tags = this.tag_buffer;
    tagDB.set_folder_tags(filenames, tags);
    TagFilter.refresh();
    fileInfo.update();
  }
}

FileTaggerComponent.prototype.remove_folder_tags = function(){
  if(FileTree.current_parent_node.type == 'folder'){
    var filenames = recurse_folder(FileTree.current_parent_node.path, []);
    var tags = this.tag_buffer;
    tagDB.remove_folder_tags(filenames, tags);
    TagFilter.refresh();
    fileInfo.update();
  }
}

FileTaggerComponent.prototype.clear_folder_tags = function(){
  if(FileTree.current_parent_node.type == 'folder'){
    var filenames = recurse_folder(FileTree.current_parent_node.path, []);
    tagDB.clear_folder_tags(filenames);
    TagFilter.refresh();
    fileInfo.update();
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
  // provides visible files for selection in far right chooser based on selected tag(s)
  var self = this;
  // this._selected_tags = [];
  this.hash_list = {};
  this.filtered_hash_list = {};
  this.found_tags = [];
  this.last_found_tags = [];
  this._selected_tags = new ArrayParameter(this._name + '_SelectedTags', {value:[]});
  this._tagList = new ArrayParameter(this._name + '_TagList', {value:[]});
  this._textFilter = new ParameterClass(this._name + '_TextFilter', {value:''});
  this._filterMode = new TextToggleParameter(this._name + '_FilterMode', {
    value:true,
    onValue:6,
    offValue:5,
    textOnValue:'OR',
    textOffValue:'AND'
  });
  this._showAllTags = new TextToggleParameter(this._name + '_ShowAllTags', {
    value:false,
    onValue:6,
    offValue:5,
    textOnValue:'AllTags',
    textOffValue:'ValidTags'
  });
  this.ClearFilter = new TextMomentaryParameter(this._name + '_ClearFilterControl', {
    onValue:2,
    offValue:2,
    textOnValue:'ClearFilter',
    textOffValue:'ClearFilter'
  });
  this.ClearFilter.add_listener(function(obj){obj._control._value&&self.clear_filter();});
  this.add_bound_properties(this, [
    'input',
    'refresh',
    '_filterMode',
    'refresh_filtered_chooser_selection',
    '_showAllTags',
    'last_found_tags',
    'found_tags',
    'update_mira_filter_mode_button',
    'set_text_filter'
  ]);
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

TagFilterComponent.prototype.__defineGetter__('show_all_value', function(){
  // debug('selected tags:', this._selected_tags);
  return this._showAllTags._value
});

TagFilterComponent.prototype.__defineGetter__('text_filter', function(){
  // debug('selected tags:', this._selected_tags);
  return this._textFilter._value
});

TagFilterComponent.prototype.__defineGetter__('filtered_files', function(){
  // debug('filtered_files:', this._fil);
  return this.filtered_hash_list;
});

TagFilterComponent.prototype._init = function(args){
  // debug('TagFilterComponent._init');
  this._selected_tags.add_listener(this.refresh);
  this._filterMode.add_listener(this.refresh);
  fileInfo._filepath.add_listener(this.refresh_filtered_chooser_selection);
  this._filterMode.on('NotifyTarget', this.update_mira_filter_mode_button);
  this._filterMode.update_control();
  this.update_mira_filter_mode_button();
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
  if(!this.selected_tags.length){
    FileTree.refresh_mira();
  }
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
    FileTree.refresh_mira();
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
  debug('display_filtered_files', this.selected_tags);
  mira_gate.message(0);
  file_chooser.clear();
  if(this.selected_tags.length>0){
    messnamed('from_preset_tagger', 'files', 'clear');
  }
  this.filtered_hash_list = {};
  var found_items = [];
  if(this.selected_tags.length){
    debug('display_filtered_files, selected_tags.length > 0');
    //OR//
    if(this.filter_mode_value){
      var entry = 0;
      var text_filter = this.text_filter;
      var text_regexp = new RegExp(text_filter, 'gi');
      var file, tags, shortname, j;
      for(var path in libraryObj){
        file = libraryObj[path];
        tags = [].concat(file.tags);
        shortname = file.shortname;
        for(j in tags){
          if(this.selected_tags.indexOf(tags[j])>-1){
            if(this.selected_tags.length>0){
              // messnamed('from_preset_tagger', 'files', 'append', shortname);
              // if((!text_filter)||(shortname.indexOf(text_filter)>-1
              // debug('filter:', JSON.stringify(shortname.match(text_regexp)));
              if((!text_filter)||(shortname.match(text_regexp))){
                this.filtered_hash_list[shortname] = {file:path, tags:tags, entry:entry};
                file_chooser.append(shortname);
                found_items.push(shortname);
              }
            }
            entry += 1;
            break;
          }
        }
      }
    }
    //AND//
    else{
      var text_filter = this.text_filter;
      var text_regexp = new RegExp(text_filter, 'gi');
      var file, tags, shortname, add, j;
      for(var path in libraryObj){
        file = libraryObj[path];
        tags = [].concat(file.tags);
        shortname = file.shortname;
        add = true;
        for(j in this.selected_tags){
          if(tags.indexOf(this.selected_tags[j])==-1){
            add = false;
            break;
          }
        }
        if(add){
          if(this.selected_tags.length>0){
            // messnamed('from_preset_tagger', 'files', 'append', shortname);
            // if((!text_filter)||(shortname.indexOf(text_filter)>-1)){
            // debug('filter:', JSON.stringify(shortname.match(text_regexp)));
            if((!text_filter)||(shortname.match(text_regexp))){
              this.filtered_hash_list[shortname] = {file:path, tags:tags, entry:entry};
              file_chooser.append(shortname);
              found_items.push(shortname);
            }
          }
        }
      }
    }
    if(found_items.length > MAX_MIRA_DROPDOWN_LENGTH){
      found_items = found_items.slice(0, MAX_MIRA_DROPDOWN_LENGTH);
    }
    filesDict.parse(JSON.stringify({items:found_items}));
    messnamed('from_preset_tagger', 'files', 'dictionary', filesDict.name);
  }
  //NONE//
  else{
    //this func was flooding the cellblock chooser with append() when the library is huge, so added a _set_contents_from_obj method to cellblock_chooser to try to deal with it
    var entry = 0;
    var text_filter = this.text_filter;
    var text_regexp = new RegExp(text_filter, 'gi');
    var path, file, tags, shortname;
    var file_chooser_list = [];
    for(path in libraryObj){
      file = libraryObj[path];
      tags = [].concat(file.tags).filter(util.isString);
      shortname = file.shortname;
      //debug(shortname, tags.length, tags);
      // if(tags.length==0){
        //don't add a duplicate entry
        if(!this.filtered_hash_list[shortname]){
          this.filtered_hash_list[shortname] = {file:path, tags:tags, entry:entry};
          if((!text_filter)||(shortname.match(text_regexp))){
            // file_chooser_list.push({value:shortname, _active:false});
            if(entry<MAX_FILE_LIST_LENGTH){  //original behavior before inroduction of _set_contents_from_obj
              file_chooser.append(shortname);
            }
            entry += 1;
          }
        }
      // }
    }
    // file_chooser.set_contents_from_obj(file_chooser_list);
    //this needs to be moved to a generalized spot....we need a notifier as a switch, possibly?
    FileTree.refresh_mira();
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
  // debug('last_found_tags:', this.last_found_tags);
  var hide_invalid_choices = ((!this.filter_mode_value) && (!this.show_all_value) && (this.selected_tags.length));
  // debug('hide_invalid_choices:', hide_invalid_choices);

  var selected_tags = this.selected_tags;
  var selected_tags_length = selected_tags.length;

  var valid_tags_from_file = function(file_tags){
    var present_tags = file_tags.filter(function(tag){
      return selected_tags.indexOf(tag) > -1;
    })
    return present_tags.length >= selected_tags_length ? file_tags : []
  }

  for(var i in libraryObj){
    var tags = [].concat(libraryObj[i].tags)
    tags = hide_invalid_choices ? valid_tags_from_file(tags) : tags;
    for(var t in tags){
      if((this.found_tags.indexOf(tags[t])==-1)&&(tags[t])){
        this.found_tags.push(tags[t]);
      }
    }
  }
  this.found_tags.sort();
  this._tagList.set_value(this.found_tags);
}

TagFilterComponent.prototype.update_mira_filter_mode_button = function(){
  debug('sending_mira_filter_mode_button value:', this.filter_mode_value);
  messnamed('from_preset_tagger', 'and_or', 'set', this.filter_mode_value);
}

TagFilterComponent.prototype.set_text_filter = function(text){
  debug(this._name+'set_text_filter', text);
  text = text == 'bang' ? undefined : text.toString();
  this._textFilter.receive(text);
  this.display_filtered_files();
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

// FilenameFilterComponent.prototype.display_filtered_files = function(){}

FilenameFilterComponent.prototype.update = function(){

}

FilenameFilterComponent.prototype.Apply = function(){
  debug('FilenameFilter.Apply()');
  var filenames = [];
  var tags = [].concat(this.tag_buffer);
  for(var shortname in this.filtered_hash_list){
    filenames.push(this.filtered_hash_list[shortname].file);
  }
  debug('filenames:', filenames);
  tagDB.set_folder_tags(filenames, tags);
  TagFilter.refresh();
  fileInfo.update();
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

FilenameFilterComponent.prototype.convert_tagnames = function(oldtag, newtag){
  // debug(this._name+'.convert_tagnames:', oldtag, newtag);
  var filenames = [];
  for(var path in libraryObj){
    var file = libraryObj[path];
    var tags = [].concat(file.tags);
    if(tags.indexOf(oldtag)>-1){
      filenames.push(path);
    }
  }
  // debug('filenames:', filenames);
  tagDB.remove_folder_tags(filenames, oldtag);
  tagDB.set_folder_tags(filenames, newtag);
  TagFilter.refresh();
  fileInfo.update();
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
    tag&&this._toggle_tag(tag);
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
  this._obj.message('cols', 3);
  this._obj.message('col', 0, 'width', 150);
  this._obj.message('grid', 1);
  this._obj.message('col', 1, 'width', 15);
  this._obj.message('col', 1, 'jus', 0);
  this._obj.message('col', 2, 'width', 30);
  this._obj.message('col', 2, 'jus', 0);
}

SpecialCellBlockChooserComponent.prototype.input = function(col, row, item){
  if(col==1){
    if(this._contents[row]){
      debug('SpecialCellBlockChooserComponent.input.fave:', row, item);
      // this.set_tag.set_value(this._contents[row].value);
      faves.toggle_favorite(this._contents[row].value);
    }
  }
  else if(col==2){
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
      this._obj.message('set', 2, parseInt(i), val);
    }
  }
  if(Alive){
    var current_faves = faves.favorites;
    for(var i in this._contents){
      var is_marked = current_faves.indexOf(this._contents[i].value)>-1;
      var val = is_marked ? 'F' : ' ';
      this._obj.message('set', 1, parseInt(i), val);
    }
  }
}

SpecialCellBlockChooserComponent.prototype.append = function(){
  var args = arrayfromargs(arguments);
  SpecialCellBlockChooserComponent.super_.prototype.append.apply(this, args);
  this._obj.message('col', 2, 'width', this._contents.length>this._row_height ? 12 : 30);
}

SpecialCellBlockChooserComponent.prototype.set_active_tag_notifier = function(obj){
  if(this._active_tag_notifier){
    this._active_tag_notifier.remove_listener(this._refresh);
  }
  this._active_tag_notifier = obj;
  this._active_tag_notifier.add_listener(this._refresh);
}



function SpecialGUITextButton(name, args){
  SpecialGUITextButton.super_.call(this, name, args);
}

inherits(SpecialGUITextButton, GUITextButton);

SpecialGUITextButton.prototype.set = function(value){
  if(this._jsObj){
    // debug(this._name + '._send:', value, this._color_attribute, value ? this._on_color : this._off_color);
    // var val = value in this._skin ? this._skin[value] : this._skin_array.length > value ? this._skin_array[value] : value;
    this._jsObj.setattr(this._color_attribute, value ? this._on_color : this._off_color);
  }
}



function QuicktabRadioComponent(name, minimum, maximum, initial, callback, onValue, offValue, args){
  QuicktabRadioComponent.super_.call(this, name, minimum, maximum, initial, callback, onValue, offValue, args);
}

inherits(QuicktabRadioComponent, RadioComponent);

QuicktabRadioComponent.prototype.update_controls_group = function(button_group){
	// debug('update_controls_group', button_group, JSON.stringify(button_group));
	for(var i in button_group){
		var button = button_group[i];
		if(button){
			// button.send(button_group.indexOf(button) + this._min ==this._value ? this._onValue : this._offValue);
      if(button_group.indexOf(button) + this._min == this._value){
        button.turn_on();
      }
      else{
        button.turn_off();
      }
		}
	}
}



function QuicktabComponent(name, args){
  var self = this;
  this.radio_component = new QuicktabRadioComponent('QuicktabRadioComponent', 0, 7, -1, {}, MaxColors.RED, MaxColors.OFF, {});
  this.add_bound_properties(this, [
    'radio_component',
    '_on_button_pushed',
    '_QUICKTAB_NAMES',
    '_tag_filter',
    '_tag_chooser',
    '_update_radio_component'
  ]);
  QuicktabComponent.super_.call(this, name, args);
  this.radio_component.set_controls(this._radio_buttons_raw);
  this.radio_component.set_target(this._on_button_pushed)
  this._tag_filter._selected_tags.add_listener(this._update_radio_component);

}

inherits(QuicktabComponent, EventEmitter);

QuicktabComponent.prototype._on_button_pushed = function(obj){
  // debug(this._name+'on_button_pushed:', obj._value);
  if(obj._value>-1){
    this._tag_filter._selected_tags.set_value([QUICKTAB_NAMES[obj._value]]);
    tag_chooser._refresh();
  }
}

QuicktabComponent.prototype._update_radio_component = function(){
  // debug(this._name+'update_radio_component');
  var new_val = -1;
  var fval = this._tag_filter.selected_tags;
  if(fval.length==1){
    new_val = QUICKTAB_NAMES.indexOf(fval.join(''));
  }
  this.radio_component._value = new_val;
  this.radio_component.update_controls();
}



//Remote key functions//
function Random(){
  debug('Random');
  randomizer.select_random_preset();
}

function Audition(){
  debug('Audition');
  previewPlayer.preview_current();
}

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
  // debug('OpenPreset');
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

function Prefs(val){
  if(Alive){
    if(prefsWindow){
      if(val){
        prefsWindow.open();
      }
      else{
        prefsWindow.close();
      }
    }
  }
}

function Search(){
  searchWindow.open();
  search_window.front();
  search_window.subpatcher().getnamed('textedit').message('select');
}

function dissolve(){
  if(mod){mod.dissolve();}
  if(found_mod){found_mod.dissolve();}
  tagDB.close();
  // for(var p in this){
  //   this[p] = null;
  //   delete this[p];
  // }
}


function parentPath(path){
  return path.substring(0, path.lastIndexOf(basename(path)))
}

function indexOfNodePath(arr, path){
  // debug('indexOfNodePath: path:', path);
  var ret = -1;
  if(arr&&path&&path.name){
    var arr_names = arr.map(function(obj){return obj.name});
    // debug('path name:', path.name, 'arr names:', arr_names);
    var name = path.name;
    // ret = arr.reduce(function(acc, obj, index){
    //   var result = acc + parseInt(Math.floor(obj.name == name)*(index+1));
    //   // debug('result:', obj.name, name, result);
    //   return result
    // }, 0) -1;
    ret = arr_names.indexOf(name);
  }
  // debug('index is:', ret, 'ran:', (arr&&path&&path.name));
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

function recurse_folder(path, paths){
  // debug('recurse_folder', path);
  var f = new Folder(path);
  while(!f.end){
    if(f.filetype == 'fold'){
      paths = recurse_folder(pathJoin([f.pathname, f.filename]), paths);
    }
    else{
      paths.push(pathJoin([f.pathname, f.filename]));
    }
    f.next();
  }
  f.close();
  return paths
}

function parents_from_path(path){
  path = path ? path : library_directory;
  return path == library_directory ? [] : path.replace(library_base, '').replace(basename(path), '').split('/').slice(0, -1).filter(function(i){return i!=''});
}

function endsWith(str, char){
  if(str){
    return str[str.length-1] == char
  }
  return false
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

function old_recurse_folder(parentNode, paths){
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


function load_preferences(){
  var prefFile = prefFile_path;
  var prefDict = new Dict();
  prefDict.import_json(prefFile);
  preferences = JSON.parse(prefDict.stringify());
  if(!preferences.preferences){
    preferences = {preferences:{path:'~/Music/Ableton/User Library/'}};
  }
}

function save_preferences(prefs){
  var prefFile = prefFile_path;
  var prefDict = new Dict();
  prefDict.parse(JSON.stringify(preferences));
  prefDict.export_json(prefFile);
}


function notifydeleted(){
  debug('notifydeleted');
  dissolve();
}

forceload(this);
