autowatch = 1;

/**TODO:
*  All control elements need to be abstracted so that messages sent to remote
*  client are handled by the same object as those going to elements in the main
*  patcher.
*  Somekind of async server/client for Commander integration.
*/

aumhaa = require('_base');
var util = require('aumhaa_util');
util.inject(this, util);
var FORCELOAD = true;
var DEBUG = true;
var NODE_DEBUG = true;
var SHOW_DICTS = false;
var EDITOR_OPEN = true;
aumhaa.init(this);
var script = this;

var Alive = false;
var _name = jsarguments[0];
var dbg = new DebugNamespace(script._name+' async=>').debug;
var finder;
var selected_tags = [];
var tag_buffer = '';
var selected_file = null;
var library_directory = undefined;
var found_tags = [];
var hash_list = {};
var filtered_hash_list = {};
var last_found_tags = [];
var filter_mode_value = 0;
var libraryObj = {};
var nodeScriptInitialized = false;
var selection_mode_value = false;

var BROWSERXSIZE = 780;
var BROWSERYSIZE = 530;


function init(){
  debug('init', this._name);
  finder = new LiveAPI();
  setup_tasks();
  setup_library();
  setup_patcher();
  setup_browser();
  setup_filetree();
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
  script.file_chooser = browser_patcher.subpatcher().getnamed('filechooser');
  script.tag_chooser = browser_patcher.subpatcher().getnamed('tagchooser');
  script.current_selected_file = browser_patcher.subpatcher().getnamed('current_selected_file');
  script.selected_file_tags = browser_patcher.subpatcher().getnamed('selected_file_tags');
  script.select_pipe = browser_patcher.subpatcher().getnamed('select_pipe');
  script.tag_buffer_display = browser_patcher.subpatcher().getnamed('tag_buffer_display');
  script.libPath = this.patcher.getnamed('libPath');
  script.parentChooser = browser_patcher.subpatcher().getnamed('parent_chooser');
  script.filesChooser = browser_patcher.subpatcher().getnamed('files_chooser');
  script.filetreeDefer = browser_patcher.subpatcher().getnamed('filetreeDeferLow');
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
  var obj = browser_patcher;
	var pcontrol = this.patcher.getnamed('editor_pcontrol');
	var thispatcher = obj.subpatcher().getnamed('thispatcher');
	var window_position = obj.subpatcher().getnamed('window_position');
  script['editor'] = new FloatingWindowModule('Editor', {'window_position':window_position, 'thispatcher':thispatcher, 'pcontrol':pcontrol, 'obj':obj, 'sizeX':BROWSERXSIZE, 'sizeY':BROWSERYSIZE, 'nominimize':true, 'nozoom':false, 'noclose':true, 'nogrow':true, 'notitle':false, 'float':false});
  script['browserInput'] = function(){
    var args = arrayfromargs(arguments);
    if(args[0]=='close'){
      EditorButton.message('set', 0);
    }
    try{
      editor[args[0]].apply(editor, args.slice(1));
    }
    catch(err){
      debug('editor input error:', err.message);
      debug('--line:', err.lineNumber);
      debug('--stack:', err.stack);
    }
  }
}

function setup_filetree(){
  script.filetreeDict = new Dict('filetree');
  script['FileTree'] = new FileTreeComponent('FileTree', {browser:browser_patcher,
                                                          dict:filetreeDict,
                                                          parentChooser:parentChooser,
                                                          filesChooser:filesChooser,
                                                          // miraParentChooser:mira_parentChooser,
                                                          // miraFilesChooser:mira_filesChooser,
                                                          Defer:filetreeDefer,
                                                          // miraDefer:mira_filetreeDefer
                                                        });
  script['toFileTree'] = FileTree.input;
  //FileTree._init;
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
  clear_filter();
  restart_button.hidden = 1;
  editor.lock();
  if(EDITOR_OPEN){
    editor.open();
    EditorButton.message(1);
  };
  Alive = true;
  // setup_tests();
}

function library_updated(){
  //selected_file = null;
  debug('library_updated');
  refresh_chooser();
  FileTree.update_files();
  selected_file!=null&&selected_file!=undefined&&FileTree.find_file(selected_file);
  //this.patcher.getnamed('library').message('edit');
  if(SHOW_DICTS){
    this.patcher.getnamed('filetree').message('wclose');
    this.patcher.getnamed('filetree').message('edit');
  };
  debug('library updated finished');
  // FileTree.find_file(selected_file);
}

//editor functions
function set_tag_filter(){
  var tags = [].concat(arrayfromargs(arguments));
  selected_tags = tags[0]=='bang'?[]:tags;
  refresh_chooser();
}

function set_tag_buffer(){
  var tags = arrayfromargs(arguments);
  // debug('set_tag_buffer:', tags);
  tag_buffer = tags[0]=='bang' ? '' : tags;
  //outlet(0, 'select_tag', tags[0]);
  display_tag_buffer(tag_buffer);
  NSProxy.asyncCall('select_tag', tag_buffer);
}

function display_tag_buffer(tag){
  // debug('display_tag_buffer', tag);
  tag_buffer_display.message('set', tag ? tag : '');
  // mira_tag_buffer_display.message('set', tag ? tag : '');
}

function refresh_chooser(){
  debug('js refresh_chooser!');
  libraryObj = dict_to_jsobj(libraryDict);
  display_filtered_files();
  refresh_filtered_chooser_selection();
  refresh_tagchooser();
  display_selected_file_tags(selected_file);
}

function refresh_chooser_selection(){
  debug('selected_file:', selected_file == null ? 'null' : selected_file);
  if((selected_file!='')&&(selected_file!=null)){
    // var selected_shortname = libraryDict.get(selected_file+'::shortname');
    var selected_shortname = libraryObj.shortname;
    if(selected_shortname in hash_list){
      var entry = parseInt(hash_list[selected_shortname].entry);
      select_pipe.message(entry);
      // mira_select_pipe.message(entry);
      if(selected_tags.length){
        messnamed('from_preset_tagger_deferred', 'files', 'entry');
      }
    }
  }
}

function display_filtered_files(){
  //debug('display_filtered_files', selected_tags);
  mira_gate.message(0);
  file_chooser.message('clear');
  // mira_file_chooser.message('clear');
  if(selected_tags.length>0){
    messnamed('from_preset_tagger', 'files', 'clear');
  }
  filtered_hash_list = {};
  if(selected_tags.length){
    //OR//
    if(filter_mode_value){
      var entry = 0;
      for(var path in libraryObj){
        var file = libraryObj[path];
        var tags = [].concat(file.tags);
        var shortname = file.shortname;
        for(var j in tags){
          if(selected_tags.indexOf(tags[j])>-1){
            filtered_hash_list[shortname] = {file:path, tags:tags, entry:entry};
            file_chooser.append(shortname);
            // mira_file_chooser.append(shortname);
            if(selected_tags.length>0){
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
        for(var j in selected_tags){
          if(tags.indexOf(selected_tags[j])==-1){
            add = false;
            break;
          }
        }
        if(add){
          filtered_hash_list[shortname] = {file:path, tags:tags, entry:entry};
          file_chooser.append(shortname);
          // mira_file_chooser.append(shortname);
          if(selected_tags.length>0){
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
      var tags = [].concat(file.tags).filter(isString);
      var shortname = file.shortname;
      //debug(shortname, tags.length, tags);
      if(tags.length==0){
        filtered_hash_list[shortname] = {file:path, tags:tags, entry:entry};
        file_chooser.append(shortname);
        // mira_file_chooser.append(shortname);
        // if(selected_tags){
        //   messnamed('from_preset_tagger', 'files', 'append', shortname);
        // }
        entry += 1;
      }
    }
  }
  mira_gate.message(1);
}

function refresh_filtered_chooser_selection(){
  debug('selected_file:', selected_file == null ? 'null' : selected_file);
  if((selected_file!=undefined)&&(selected_file!=null)&&(selected_file in libraryObj)){
    var selected_shortname = libraryObj[selected_file].shortname;
    //debug('selected_shortname', selected_shortname);
    if(selected_shortname in filtered_hash_list){
      var entry = parseInt(filtered_hash_list[selected_shortname].entry);;
      select_pipe.message(entry);
      // mira_select_pipe.message(entry);
      if(selected_tags.length>0){
        messnamed('from_preset_tagger_deferred', 'files', 'set', entry);
      }
    }
  }
}

function refresh_tagchooser(){
  //debug('refresh_tagchooser:', found_tags);
  detect_found_tags();
  if(!last_found_tags.equals(found_tags)){
    mira_gate.message(0);
    tag_chooser.message('clear');
    // mira_tag_chooser.message('clear');
    messnamed('from_preset_tagger', 'filters', 'clear');
    for(var i in found_tags){
      tag_chooser.append(found_tags[i]);
      // mira_tag_chooser.append(found_tags[i]);
      messnamed('from_preset_tagger', 'filters', 'append', found_tags[i]);
    }
    mira_gate.message(1);
  }
}

function redraw_tagchooser(){
  mira_gate.message(0);
  tag_chooser.message('clear');
  // mira_tag_chooser.message('clear');
  messnamed('from_preset_tagger', 'filters', 'clear');
  for(var i in found_tags){
    tag_chooser.append(found_tags[i]);
    // mira_tag_chooser.append(found_tags[i]);
    messnamed('from_preset_tagger', 'filters', 'append', found_tags[i]);
    // debug('sending:', 'from_preset_tagger', 'filters', 'append', found_tags[i]);
  }
  mira_gate.message(0);
}

function detect_found_tags(){
  last_found_tags = found_tags.slice();
  found_tags = [];
  //debug('last_found_tags:', last_found_tags);
  for(var i in libraryObj){
    var tags = [].concat(libraryObj[i].tags);
    for(var t in tags){
      if((found_tags.indexOf(tags[t])==-1)&&(tags[t])){
        found_tags.push(tags[t]);
      }
    }
  }
}

function chooser_single(index, shortname){
  //debug('chooser_single:', index, shortname);
  // var path = selected_tags.length ? filtered_hash_list[shortname].file : hash_list[shortname].file;
  var path = filtered_hash_list[shortname].file;
  selected_file = path;
  NSProxy.asyncCall('select_file', path);
  display_selected_file(path);
  display_selected_file_tags(path);
  FileTree.find_file(path);
}

function display_selected_file(path){
  current_selected_file.message('set', path ? '...'+path.slice(-50) : '');
  // mira_current_selected_file.message('set', path ? path : '');
}

function display_selected_file_tags(path){
  debug("display_selected_file_tags:", path);
  // util.introspect_object(path, true);
  if((typeof path == 'string')&&(path in libraryObj)){
    //var tags = libraryDict.get(path+'::tags');
    var tags = libraryObj[path].tags;
    selected_file_tags.message('set', tags ? tags : '');
    // mira_selected_file_tags.message('set', tags ? tags : '');
  }
  else{
    debug('can\'t display tags for path:', path, 'not in libraryObj');
  }
}

function chooser_double(index, shortname){
  debug('chooser_double', index, shortname);
  var path = selected_tags.length ? filtered_hash_list[shortname].file : hash_list[shortname].file;
  // debug('chooser_double:', index, path);
  NSProxy.asyncCall('open_preset', path);
}

function set_tag(){
  NSProxy.asyncCall('apply_tag', selected_file, tag_buffer);
}

function remove_tag(){

  NSProxy.asyncCall('remove_tag', selected_file, tag_buffer);
}

function clear_tags(){

  NSProxy.asyncCall('clear_tags', selected_file);
}

function set_folder_tags(){
  FileTree.set_folder_tags();
}

function remove_folder_tags(){
  FileTree.remove_folder_tags();
}

function clear_folder_tags(){
  FileTree.clear_folder_tags();
}

function filter_mode(val){
  filter_mode_value = !val;
  nodeScriptInitialized&&refresh_chooser();
}

function scan_library(){
  NSProxy.asyncCall('scan_library').then(function(res){
    library_updated();
  }).catch(function(e){
    debug('scan_library error:', e.message);
  })
}

function tag_selection(){
  var tags = arrayfromargs(arguments);
  // debug('tag_selection:', tags, tags.length);
  selected_tags = tags[0]=='bang'?[]: tags[0] == 'selecteditems' ? tags.slice(1) : tags;
  refresh_chooser();
}

function tag_selection_from_commander(){
  var tags = arrayfromargs(arguments);
  debug('tag_selection_from_commander:', tags, tags.length);
  selected_tags = tags[0]=='bang'?[]: tags[0] == 'selecteditems' ? tags.slice(1) : tags.slice(1);
  debug('selected_tags:', selected_tags, selected_tags.length);
  if(!selected_tags.length){
    clear_filter();
  }
  else{
    refresh_chooser();
  }
}

function tag_next_selected(){
  debug('tag_next_selected');
  debug('selected_tags:', selected_tags);
  tag_buffer = selected_tags;
  display_tag_buffer(tag_buffer);
  NSProxy.asyncCall('select_tag', tag_buffer);
  set_tag();
}

function clear_filter(){
  selected_tags = [];
  redraw_tagchooser();
  refresh_chooser();
  FileTree.refresh();
}

function selection_mode(val){
  debug('val', val, Boolean(val));
  selection_mode_value = Boolean(val);
}

function from_commander(){
  var args = arrayfromargs(arguments);
  debug('from_commander:', args);
  switch(args[0]){
    case 'toFileTree':
      if(args[1]=='select_parent'){
        FileTree.input.apply(FileTree, args.slice(1));
      }
      else if(args[1]=='chooser'){
        if(selected_tags.length){
          if(selection_mode_value==false){
            chooser_single.apply(script, args.slice(2));
          }
          else{
            chooser_double.apply(script, args.slice(2));
          }
        }
        else{
          if(selection_mode_value==false){
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
      tag_selection_from_commander.apply(script, args.slice());
      break;
    case 'filter_mode':
      filter_mode(args[1]);
      break;
    case 'clear_filter':
      clear_filter();
      break;
    case 'selection_mode':
      selection_mode(args[1]);
      break;
    case 'update_remote_display':
      debug('sending command....');
      update_remote_display();
      break;
    case 'Next':
      Next();
      break;
    case 'Prev':
      Prev();
      break;
    case 'OpenPreset':
      OpenPreset();
      break;
  }
}

function update_remote_display(){
  debug()
  FileTree.refresh();
  // refresh_tagchooser();
  redraw_tagchooser();
  messnamed('from_preset_tagger', 'and_or', 'set', filter_mode_value);
}

function unlock_editor(){
  editor.unlock();
}

function restart(){
  init();
}

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

function restore_snapshot(){
  var args = arrayfromargs(arguments);
  debug('restore_snapshot:', args);
  NSProxy.asyncCall('restore_snapshot', args).then(function(res){
    debug('restore_snapshot response:', res);
    library_updated();
  });
}

function set_global_path(){
  // debug('set_global_path');
  NSProxy.asyncCall('set_global_path').then(function(res){
    debug('new global path is::', res);
  }).catch(function(e){
    debug('set_global_path error:', e.message);
  });
}



/**
*  Component deals with all tagging tasks.
*  Basically everything in right two windows,
*  as well as all actions in the bottom section.
*/
function TaggerComponent(name, args){
  this.add_bound_properties(this, []);
  TaggerComponent.super_.call(this, name, args);
}

util.inherits(TaggerComponent, Bindable);

TaggerComponent.prototype._init = function(args){
  debug('TaggerComponent._init', this.current_parent_node);
}

TaggerComponent.prototype.refresh = function(){

}

TaggerComponent.prototype.input = function(){
  var args = arrayfromargs(arguments);
  //debug('TaggerComponent.input:', args);
  try{
    this[args[0]].apply(this, args.slice(1));
  }
  catch(err){
    debug('input error:', err.message);
    debug('--line:', err.lineNumber);
    debug('--stack:', err.stack);
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
   '_miraFilesChooser']);
	FileTreeComponent.super_.call(this, name, args);
  this._treeobj = dict_to_jsobj(this._dict);
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

FileTreeComponent.prototype.init_parent_node = function(){
  if((!this.current_parent_node)||(!this._treeobj.name)){
    debug('FileTree.init_parent_node', !this.current_parent_node, this._treeobj.name);
    this.current_parent_node = this._treeobj.children[Object.keys(this._treeobj.children)];
  }
}

FileTreeComponent.prototype.update_files = function(){
  // debug('FileTree.update_files');
  this._treeobj = dict_to_jsobj(filetreeDict);
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
  // mira_ParentBackButton.message('active', current_root.type!='root');
  messnamed('from_preset_tagger', 'back', 'set', current_root.type!='root');
  this._parentChooser.message('clear');
  // this._miraParentChooser.message('clear');
  messnamed('from_preset_tagger', 'parent', 'clear');
  for(var i in this.parent_list){
    this._parentChooser.message('append', this.parent_list[i].name);
    // this._miraParentChooser.message('append', this.parent_list[i].name);
    messnamed('from_preset_tagger', 'parent', 'append', this.parent_list[i].name);
  }
  var selected_index = this.parent_list.indexOf(this.current_parent_node);
  if(selected_index>-1){
    // debug('found selected parent');
    this._Defer.message('parent', 'set', selected_index);
    // this._miraDefer.message('parent', 'set', selected_index);
    messnamed('from_preset_tagger_deferred', 'parent', 'set', selected_index);
  }

  var current_dir = this.current_parent_node ? this.current_parent_node : {name:'none', children:[], type:root};
  debug('FileTree child_node:', current_dir.name);
  //debug(util.introspect(current_dir, {deep:true, min_level:4, max_level:6}));
  //debug(JSON.stringify(current_dir));
  this._filesChooser.message('clear');
  // this._miraFilesChooser.message('clear');
  if(!selected_tags.length>0){
    messnamed('from_preset_tagger', 'files', 'clear');
  }
  if(current_dir.type != 'root'){
    this.child_list = [];

    for(var i in current_dir.children){
      this.child_list.push(current_dir.children[i]);
    }
    for(var i in this.child_list){
      this._filesChooser.message('append', this.child_list[i].name);
      // this._miraFilesChooser.message('append', this.child_list[i].name);
      if(!selected_tags.length>0){
        messnamed('from_preset_tagger', 'files', 'append', this.child_list[i].name);
      }
      // debug('append:', this.child_list[i].name);
    }
    var selected_index = this.child_list.indexOf(this.current_child_node);
    selected_index  = selected_index >-1 ? selected_index : 0;
    if(selected_index>-1){
      //debug('found selected child');
      this._Defer.message('files', 'set', selected_index);
      // this._miraDefer.message('files', 'set', selected_index);
      if(!selected_tags.length>0){
        messnamed('from_preset_tagger_deferred', 'files', 'set', selected_index);
      }
    }
  }
  mira_gate.message(1);
}

FileTreeComponent.prototype.input = function(){
  /**distributes input to Class instance to its available methods*/
  var args = arrayfromargs(arguments);
  //debug('FileTree.input:', args);
  try{
    this[args[0]].apply(this, args.slice(1));
  }
  catch(err){
    debug('input error:', err.message);
    debug('--line:', err.lineNumber);
    debug('--stack:', err.stack);
  }
}

FileTreeComponent.prototype.select_parent = function(index, item){
  /**input from left browser pane*/
  // debug('FileTree.select_parent:', index, item);
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
        selected_file = entry.path;
        NSProxy.asyncCall('select_file', entry.path);
        display_selected_file(entry.path);
        display_selected_file_tags(entry.path);
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

FileTreeComponent.prototype.open_parent = function(index, item){
  /**double-click from left pane of browser*/
  // debug('FileTree.open_parent:', index, item);
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
        selected_file = entry.path;
        NSProxy.asyncCall('select_file', entry.path);
        display_selected_file(entry.path);
        display_selected_file_tags(entry.path);
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

FileTreeComponent.prototype.select_child = function(index, item){
  /**input from right browser pane*/
  debug('FileTree.select_child:', index, item);
  if(this.child_list.length){
    var entry = this.child_list[index];
    if(entry.type == 'folder'){
      this.current_child_node = null;
      this.current_parent_node = entry;
      this.refresh();
      NSProxy.asyncCall('select_file');
      display_selected_file();
      display_selected_file_tags();

    }
    else if(entry.type == 'file'){
      this.current_child_node = entry;
      selected_file = entry.path;
      NSProxy.asyncCall('select_file', entry.path);
      display_selected_file(entry.path);
      display_selected_file_tags(entry.path);
    }
  }
  else{
    this.refresh();
  }
}

FileTreeComponent.prototype.open_child = function(index, item){
  /**double-click from right pane of browser*/
  // debug('FileTree.open_child:', index, item);
  var entry = this.child_list[index];
  if(entry.type == 'folder'){
    this.current_child_node = null;
    this.current_parent_node = entry;
    this.refresh();
    NSProxy.asyncCall('select_file');
    display_selected_file();
    display_selected_file_tags();

  }
  else if(entry.type == 'file'){
    this.current_child_node = entry;
    NSProxy.asyncCall('select_file', entry.path);
    display_selected_file(entry.path);
    display_selected_file_tags(entry.path);
    NSProxy.asyncCall('open_preset', entry.path);
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
  if(node.name!='root'){
    this.current_parent_node = retrieve_child(this._treeobj, node.parents.concat([node.name]));
  }
}

FileTreeComponent.prototype.refresh_child_node = function(){
  // var node = this.current_parent_node;
  // this.current_child_node = retrieve_child(this._treeobj, node.parents.concat([node.name]));
}

//These methods need to be made with asyncCall, rewritten in nodescript.
FileTreeComponent.prototype.set_folder_tags = function(){
  if(this.current_parent_node.type == 'folder'){
    NSProxy.asyncCall('apply_folder_tags', this.current_parent_node.path, tag_buffer);
  }
}

FileTreeComponent.prototype.remove_folder_tags = function(){
  if(this.current_parent_node.type == 'folder'){
    NSProxy.asyncCall('remove_folder_tags', this.current_parent_node.path, tag_buffer);
  }
}

FileTreeComponent.prototype.clear_folder_tags = function(){
  if(this.current_parent_node.type == 'folder'){
    NSProxy.asyncCall('clear_folder_tags', this.current_parent_node.path);
  }
}

//These methods don't work//
FileTreeComponent.prototype.select_previous = function(){
  //this method doesn't work
  // if(this.child_list.length){
  //   for(var i in this.child_list){
  //     if(this.child_list[i].path == selected_file){
  //       (i > 0)&&(this.select_child(i-1));
  //       break;
  //     }
  //   }
  // }
}

FileTreeComponent.prototype.select_next = function(){
  //this method doesn't work
  // if(this.child_list.length){
  //   for(var i in this.child_list){
  //     if(this.child_list[i].path == selected_file){
  //       (index < (this.child_list.length-1))&&(this.select_child(index+1));
  //       break;
  //     }
  //   }
  // }
}


//Remote key functions//
function AddTag(val){
  // debug('AddTag', val);
  set_tag();
}

function RemoveTag(val){
  // debug('RemoveTag', val);
  remove_tag();
}

function ClearAllTags(val){
  // debug('ClearAllTags', val);
  clear_tags();
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
  NSProxy.asyncCall('open_preset', selected_file);
}

function Next(){
  FileTree.select_next();
}

function Prev(){
  FileTree.select_previous();
}



forceload(this);



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

function fetchFromObject(obj, prop) {

    if(typeof obj === 'undefined') {
        return false;
    }

    var _index = prop.indexOf('.')
    if(_index > -1) {
        return fetchFromObject(obj[prop.substring(0, _index)], prop.substr(_index + 1));
    }

    return obj[prop];
}

function report_error(err){
  debug('--error:', err.message);
  debug('--line:', err.lineNumber);
  debug('--stack:', err.stack);
}

function isNumber(obj) {
  return obj !== undefined && typeof(obj) === 'number' && !isNaN(obj)
}

function isString(obj) {
  return obj !== undefined && typeof(obj) === 'string' && obj!== ''
}

//TEST_BUTTON
function AddTag(val){
  debug('TestButton', val);
  NSProxy.asyncCall('break_patch').then(function(res){
    debug('break_patch success:', res);
  }).catch(function(err){
    debug('break_patch error:', err.message);
  });
}
// function setup_nodescript(){
//   // debug('setup_nodescript');
//   script['NSProxy'] = new NodeScriptProxy('NSProxy', {script:script, obj:node_script, cabled:false, debug:true});
//   script['asyncResolve'] = NSProxy.asyncResolve;
//   script['nodeDump'] = NSProxy.nodeDump;
//   script['toNSProxy'] = NSProxy.receive;
//   NSProxy.initialize().then(function(res){
//       debug('SCRIPT', 'success', JSON.stringify(res));
//       NSProxy.asyncCall('init_from_js').then(function(path){
//         node_script_initialized(path);
//       },
//       function(e){
//         debug('NSProxy.init_from_js Error:', e);
//       });
//     },
//     function(err){
//       debug('SCRIPT', 'start error:', err.message);
//     }
//   );
// }

// // var VAL = 4;
// var testFunc = function(val){
//   debug('testFunc:', val);
//   var promise = new Promise(function(resolve, reject) {
//     var good = val < 5;
//     if(good){
//       debug('is good!');
//       resolve('in there:)');
//     }
//     else {
//       reject('not in there:(');
//     }
//   });
//   return promise
// };
//
// testFunc(6).then(function(res){
//   debug('res:', res);
// }, function(err){
//   debug('err:', err);
// });


//collect all dump output from node.script, start node.script when npm install finishes.
// function nodeLog(){
// 	var args = arrayfromargs(arguments);
// 	var status = dict_to_jsobj(statusDict);
// 	if(('args' in status)&&(status.args[0]=='install'))
// 	{
// 		if(status.status=='completed'){
// 			outlet(0, 'script', 'start');
// 		}
// 	}
// }
