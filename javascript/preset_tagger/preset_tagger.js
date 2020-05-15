autowatch = 1;

/**TODO:
*  All control elements need to be abstracted so that messages sent to remote
*  client are handled by the same object as those going to elements in the main
*  patcher.
*  Somekind of async server/client for Commander integration.
*/

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

var BROWSERXSIZE = 780;
var BROWSERYSIZE = 375;

function anything(){}

function init(){
  debug('init', this._name);
  finder = new LiveAPI();
  setup_tasks();
  setup_library();
  setup_patcher();
  setup_browser();
  setup_filetree();
  setup_filetagger();
  setup_tagfilter();
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

  script.tag_chooser = new CellBlockChooserComponent('TagChooser', {
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
    debug('file_chooser input:', obj, obj._value);
    FileTagger.input.apply(FileTagger, ['chooser_single'].concat(obj._value));
  });
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

function setup_tests(){
  debug('setup_tests');
  // NSProxy.asyncCall('test_function', 'blah', true)
  // .then(function(res){
  //   debug('test_function success', res)})
  // ['catch'](function(e){
  //   debug('test_function failure', e.message);
  // });
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
  // setup_tests();
}


/** called from nodescript instance...should be made into a listener*/
function library_updated(){
  //selected_file = null;
  debug('library_updated triggered...');
  libraryObj = util.dict_to_jsobj(libraryDict);
  //refresh_chooser();
  FileTree.update_files();
  TagFilter.refresh();
  FileTagger.refresh();
  FileTagger.selected_file!=null&&FileTagger.selected_file!=undefined&&FileTree.find_file(FileTagger.selected_file);
  if(SHOW_DICTS){
    // this.patcher.getnamed('library').message('wclose');
    // this.patcher.getnamed('library').message('edit');
    this.patcher.getnamed('filetree').message('wclose');
    this.patcher.getnamed('filetree').message('edit');
  };
  debug('...library_updated finished');
  // FileTree.find_file(selected_file);
}

//this is too much....belongs to a bunch of crap.
function refresh_chooser(){
  debug('js refresh_chooser!');
  // libraryObj = dict_to_jsobj(libraryDict);  // moved this to library_updated()
  // display_filtered_files();
  // refresh_filtered_chooser_selection();
  // refresh_tagchooser();
  // display_selected_file_tags(selected_file);
  TagFilter.refresh();
  FileTagger.refresh();
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
        TagFilter.filter_mode(args[1]);
        break;
      case 'clear_filter':
        TagFilter.clear_filter();
        break;
      case 'selection_mode':
        FileTagger.selection_mode(args[1]);
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
   '_miraFilesChooser']);
	FileTreeComponent.super_.call(this, name, args);
  this._treeobj = util.dict_to_jsobj(this._dict);
  //treeobj = dict_to_jsobj(this._dict);
  this.current_parent_node = this._treeobj;
  this.current_child_node = null;
  this.parent_list = [];
  this.child_list = [];
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

//used to make sure that when refreshing, some undefined vars don't cause exception in this.refresh
FileTreeComponent.prototype.init_parent_node = function(){
  if((!this.current_parent_node)||(!this._treeobj.name)){
    debug('FileTree.init_parent_node', !this.current_parent_node, this._treeobj.name);
    this.current_parent_node = this._treeobj.children[Object.keys(this._treeobj.children)];
  }
}

FileTreeComponent.prototype.update_files = function(){
  // debug('FileTree.update_files');
  this._treeobj = util.dict_to_jsobj(filetreeDict);
  this.refresh_parent_node();
  this.init_parent_node();
  // this.refresh_child_node();
  this.refresh();
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
    selected_index  = selected_index >-1 ? selected_index : 0;
    if(selected_index>-1){
      this._filesChooser.set(selected_index);
      // this._miraDefer.message('files', 'set', selected_index);
      if(!TagFilter.selected_tags.length>0){
        messnamed('from_preset_tagger_deferred', 'files', 'set', selected_index);
      }
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
        this.refresh();
      }
      else if(entry.type == 'file'){
        var parent_node = retrieve_parent(this._treeobj, entry.parents);
        if(this.current_parent_node.type == 'root'){
          this.current_child_node = entry;
          FileTagger._selected_file = entry.path;
          FileTagger.display_selected_file(entry.path);
          FileTagger.display_selected_file_tags(entry.path);
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
          FileTagger._selected_file = entry.path;
          // NSProxy.asyncCall('select_file', entry.path);
          FileTagger.display_selected_file(entry.path);
          FileTagger.display_selected_file_tags(entry.path);
          NSProxy.asyncCall('open_preset', entry.path);
        }
        else{
          this.current_child_node = entry;
          this.current_parent_node = parent_node;
          this.refresh();
        }
      }
      else if(entry.type == 'back_command'){
        this.current_child_node = null;
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
  debug('FileTree.select_child:', index, item);
  if(index!=undefined){
    if(this.child_list.length){
      var entry = this.child_list[index];
      if(entry.type == 'folder'){
        this.current_child_node = null;
        this.current_parent_node = entry;
        this.refresh();
        FileTagger.display_selected_file();
        FileTagger.display_selected_file_tags();

      }
      else if(entry.type == 'file'){
        this.current_child_node = entry;
        FileTagger._selected_file = entry.path;
        FileTagger.display_selected_file(entry.path);
        FileTagger.display_selected_file_tags(entry.path);
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
      this.current_child_node = null;
      this.current_parent_node = entry;
      this.refresh();
      FileTagger.display_selected_file();
      FileTagger.display_selected_file_tags();

    }
    else if(entry.type == 'file'){
      this.current_child_node = entry;
      FileTagger.display_selected_file(entry.path);
      FileTagger.display_selected_file_tags(entry.path);
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
    }
    this.refresh();
  }
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
  //debug('retrieve_child', obj, parents);
  //parents = [].concat(parents);
  if((!parents)||(!parents.length)){
    //debug('returning null');
    return null
  }
  parents = [].concat(parents);
  var new_obj = obj.children[parents.shift()];
  if(parents.length){
    new_obj = retrieve_child(new_obj, parents);
  }
  return new_obj;
}


//this is here because something is overwriting the aumhaa.util export
function dict_to_jsobj(dict) {
	if (dict == null) return null;
	var o = new Object();
	var keys = dict.getkeys();
	if (keys == null || keys.length == 0) return null;

	if (keys instanceof Array) {
		for (var i = 0; i < keys.length; i++)
		{
			var value = dict.get(keys[i]);

			if (value && value instanceof Dict) {
				value = dict_to_jsobj(value);
			}
			o[keys[i]] = value;
		}
	} else {
		var value = dict.get(keys);

		if (value && value instanceof Dict) {
			value = dict_to_jsobj(value);
		}
		o[keys] = value;
	}

	return o;
}



/**
*  Component deals with all tagging tasks.
*  Basically everything in right two windows,
*  as well as all actions in the bottom section.
*/
function FileTaggerComponent(name, args){
  var self = this;
  this._selected_file = undefined;
  this._tag_buffer = [];
  this.selection_mode_value = false;
  this.add_bound_properties(this, [
    'input',
    'set_tag_buffer',
    'refresh',
  ]);
  FileTaggerComponent.super_.call(this, name, args);
  this._init.apply(this);
}

util.inherits(FileTaggerComponent, Bindable);

FileTaggerComponent.prototype.__defineGetter__('selected_file', function(){
  return this._selected_file;
})

FileTaggerComponent.prototype.__defineGetter__('tag_buffer', function(){
  return this._tag_buffer;
})

FileTaggerComponent.prototype._init = function(args){
  debug('FileTaggerComponent._init');
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
  this.display_selected_file(this.selected_file);
  this.display_selected_file_tags(this.selected_file);
}

FileTaggerComponent.prototype.set_tag_buffer = function(){
  var tags = arrayfromargs(arguments);
  this._tag_buffer = tags[0]=='bang' ? '' : tags;
  this.display_tag_buffer(this.tag_buffer);
}

FileTaggerComponent.prototype.display_tag_buffer = function(tag) {
  tag_buffer_display.message('set', tag ? tag : '');
}

FileTaggerComponent.prototype.display_selected_file = function(path){
  current_selected_file.message('set', path ? '...'+path.slice(-50) : '');
}

FileTaggerComponent.prototype.display_selected_file_tags = function(path){
  if((typeof path == 'string')&&(path in libraryObj)){
    var tags = libraryObj[path].tags;
    selected_file_tags.message('set', tags ? tags : '');
  }
  else{
    debug('can\'t display tags for path:', path, 'not in libraryObj');
  }
}

FileTaggerComponent.prototype.set_tag = function(){
  NSProxy.asyncCall('apply_tag', this.selected_file, this.tag_buffer);
}

FileTaggerComponent.prototype.remove_tag = function(){
  NSProxy.asyncCall('remove_tag', this.selected_file, this.tag_buffer);
}

FileTaggerComponent.prototype.clear_tags = function(){
  NSProxy.asyncCall('clear_tags', this.selected_file);
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
  NSProxy.asyncCall('reveal_preset', this.selected_file);
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

FileTaggerComponent.prototype.selection_mode = function(val){
  debug('val', val, Boolean(val));
  selection_mode_value = Boolean(val);
}

FileTaggerComponent.prototype.chooser_single = function(index, shortname){
  debug('chooser_single:', index, shortname);
  // var path = selected_tags.length ? filtered_hash_list[shortname].file : hash_list[shortname].file;
  var path = TagFilter.filtered_hash_list[shortname].file;
  this._selected_file = path;
  this.display_selected_file(path);
  this.display_selected_file_tags(path);
  FileTree.find_file(path);
}

FileTaggerComponent.prototype.chooser_double = function(index, shortname){
  // debug('chooser_double', index, shortname);
  var path = this.selected_tags.length ? TagFilter.filtered_hash_list[shortname].file : TagFilter.hash_list[shortname].file;
  NSProxy.asyncCall('open_preset', path);
}



/**
*  Component deals with all tagging tasks.
*  Basically everything in right two windows,
*  as well as all actions in the bottom section.
*/
function TagFilterComponent(name, args){
  var self = this;
  this._selected_tags = [];
  this.hash_list = {};
  this.filtered_hash_list = {};
  this.filter_mode_value = true;
  this.found_tags = [];
  this.last_found_tags = [];
  this.add_bound_properties(this, ['input']);
  TagFilterComponent.super_.call(this, name, args);
  this._init.apply(this);
}

util.inherits(TagFilterComponent, Bindable);

TagFilterComponent.prototype.__defineGetter__('selected_tags', function(){
  // debug('selected tags:', this._selected_tags);
  return this._selected_tags
})

TagFilterComponent.prototype._init = function(args){
  debug('TagFilterComponent._init');
}

TagFilterComponent.prototype.refresh = function(){
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

//this is probably left-over from non-multi tag selection
TagFilterComponent.prototype.set_tag_filter = function(){
  var tags = [].concat(arrayfromargs(arguments));
  this._selected_tags = tags[0]=='bang'?[]:tags;
  this.refresh();
  // refresh_chooser();
}

TagFilterComponent.prototype.tag_selection = function(){
  var tags = arrayfromargs(arguments);
  debug('tag_selection:', tags, tags.length);
  this._selected_tags = tags[0]=='bang'?[]: tags[0] == 'selecteditems' ? tags.slice(1) : tags;
  this.refresh();
}

///this needs some special love
TagFilterComponent.prototype.tag_selection_from_commander = function(){
  var tags = arrayfromargs(arguments);
  debug('tag_selection_from_commander:', tags, tags.length);
  this._selected_tags = tags[0]=='bang'?[]: tags[0] == 'selecteditems' ? tags.slice(1) : tags.slice(1);
  if(!this.selected_tags.length){
    this.clear_filter();
    FileTree.refresh();
  }
  else{
    this.refresh();
  }
}

//uses nodeScriptInitialized to filter input, bound to be a better way
TagFilterComponent.prototype.filter_mode = function(val){
  this.filter_mode_value = !val;
  nodeScriptInitialized&&refresh_chooser();
}

TagFilterComponent.prototype.clear_filter = function(){
  this._selected_tags = [];
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
}

//not currently used
TagFilterComponent.prototype.refresh_chooser_selection = function(){
  var selected_file = FileTagger.selected_file;
  // debug('selected_file:', selected_file == null ? 'null' : selected_file);
  if((selected_file!='')&&(selected_file!=null)){
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
  var selected_file = FileTagger.selected_file;
  debug('selected_file:', selected_file == null ? 'null' : selected_file);
  if((selected_file!=undefined)&&(selected_file!=null)&&(selected_file in libraryObj)){
    var selected_shortname = libraryObj[selected_file].shortname;
    debug('selected_shortname', selected_shortname);
    if(selected_shortname in this.filtered_hash_list){
      var entry = parseInt(this.filtered_hash_list[selected_shortname].entry);;
      //select_pipe.message(entry);
      file_chooser.set(entry);
      if(this.selected_tags.length>0){
        messnamed('from_preset_tagger_deferred', 'files', 'set', entry);
      }
    }
  }
}

TagFilterComponent.prototype.refresh_tagchooser = function(){
  //debug('refresh_tagchooser:', found_tags);
  this.detect_found_tags();
  if(!this.last_found_tags.equals(this.found_tags)){
    mira_gate.message(0);
    tag_chooser.clear();
    messnamed('from_preset_tagger', 'filters', 'clear');
    for(var i in this.found_tags){
      tag_chooser.append(this.found_tags[i]);
      messnamed('from_preset_tagger', 'filters', 'append', this.found_tags[i]);
    }
    mira_gate.message(1);
  }
}

//this is more or less the same as refresh....why are there two funcs?
//appears to be due to commander, need to find out why.
TagFilterComponent.prototype.redraw_tagchooser = function(){
  mira_gate.message(0);
  tag_chooser.clear();
  messnamed('from_preset_tagger', 'filters', 'clear');
  for(var i in this.found_tags){
    tag_chooser.append(this.found_tags[i]);
    messnamed('from_preset_tagger', 'filters', 'append', this.found_tags[i]);
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
  NSProxy.asyncCall('open_preset', FileTagger.selected_file);
}

// function Next(){
//   FileTree.select_next();
// }
//
// function Prev(){
//   FileTree.select_previous();
// }




forceload(this);
