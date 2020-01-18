autowatch = 1;

aumhaa = require('_base');
var FORCELOAD = true;
var DEBUG = true;
aumhaa.init(this);
var script = this;


var _name = 'preset_tagger.js';
var finder;
var libraryDict = new Dict('library');
var selected_tags = [];
var tag_buffer = '';
var selected_file = '';
var library_directory = undefined;
var found_tags = [];
var hash_list = {};
var filtered_hash_list = {};
var last_found_tags = [];

function init() {
  debug('init', this._name);
  finder = new LiveAPI();
  setup_tasks();
  setup_library();
  setup_patcher();
  setup_nodescript();
  setup_editor();
  editor.lock();
  editor.open();
}

function setup_tasks(){
	script['tasks'] = new TaskServer(script, 20);
}

function setup_library(){
  script.library_dict = new Dict('library');
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
}

function setup_nodescript(){
  //node_script.message('script', 'start');
  outlet(0, 'script', 'start');
}

function setup_editor(){
  var obj = browser_patcher;
	var pcontrol = this.patcher.getnamed('editor_pcontrol');
	var thispatcher = obj.subpatcher().getnamed('thispatcher');
	var window_position = obj.subpatcher().getnamed('window_position');
  script['editor'] = new FloatingWindowModule('Editor', {'window_position':window_position, 'thispatcher':thispatcher, 'pcontrol':pcontrol, 'obj':obj, 'sizeX':500, 'sizeY':700, 'nominimize':true, 'nozoom':false, 'noclose':true, 'nogrow':true, 'notitle':false, 'float':true});
}

function nodescript_running(){
  //libPath.message('bang');
  library_directory = libPath.getvalueof();
  //debug('library_directory:', library_directory);
  outlet(0, 'select_library', library_directory);
}

function library_updated(){
  refresh_chooser();
}

function set_tag_filter(){
  var tags = [].concat(arrayfromargs(arguments));
  debug('set_tag_filter:', tags, tags.length);
  selected_tags = tags[0]=='bang'?[]:tags;
  debug('selected_tags:', selected_tags);
  refresh_chooser();
}

function set_tag_buffer(){
  var tags = arrayfromargs(arguments);
  debug('set_tag_buffer:', tags);
  tag_buffer = tags[0]=='bang' ? '' : tags;
  //node_script.message('select_tag', tags[0]);
  display_tag_buffer(tag_buffer);
  outlet(0, 'select_tag', tag_buffer);
}

function display_tag_buffer(tag){
  debug('display_tag_buffer', tag);
  tag_buffer_display.message('set', tag ? tag : '');
}

function refresh_chooser(){
  if(!selected_tags.length){
    //debug('selected_tags is empty')
    display_all_files();
    //tasks.addTask(refresh_chooser_selection, [], 1, false, 'refresh_chooser_selection');
    refresh_chooser_selection();
    refresh
  }
  else{
    display_filtered_files();
    //tasks.addTask(refresh_filtered_chooser_selection, [], 1, false, 'refresh_filtered_chooser_selection');
    refresh_filtered_chooser_selection();
  }
  refresh_tagchooser();
  display_selected_file_tags(selected_file);
}

function display_all_files(){
  file_chooser.message('clear');
  hash_list = {};
  found_tags = [];
  selected_file_tags.message('set', '');
  var file_list = [].concat(libraryDict.getkeys());
  //debug('file_list:', file_list);
  for(var i in file_list){
    var shortname = libraryDict.get(file_list[i]).get('shortname');
    var tags = [].concat(libraryDict.get(file_list[i]).get('tags'));
    hash_list[shortname] = {file:file_list[i], tags:tags, entry:i};
    file_chooser.append(shortname);
  }
}

function refresh_chooser_selection(){
  //debug(selected_file);
  if(selected_file!=''){
    //debug('selected_file:', selected_file);
    var selected_shortname = libraryDict.get(selected_file+'::shortname');
    //debug('selected_shortname', selected_shortname);
    if(selected_shortname in hash_list){
      var entry = parseInt(hash_list[selected_shortname].entry);
      //debug('entry:', entry, typeof entry);
      select_pipe.message(entry);
    }
  }
}

function display_filtered_files(){
  debug('display_filtered_files', selected_tags);
  file_chooser.message('clear');
  filtered_hash_list = {};
  var filtered_files = [];
  var file_list = [].concat(libraryDict.getkeys());
  var entry = 0;
  for(var i in file_list){
    var file = file_list[i];
    var tags = [].concat(libraryDict.get(file+'::tags'));
    var shortname = libraryDict.get(file+'::shortname');
    for(var j in tags){
      if(selected_tags.indexOf(tags[j])>-1){
        filtered_files.push(shortname);
        filtered_hash_list[shortname] = {file:file, tags:tags, entry:entry};
        entry += 1;
        break;
      }
    }
  }
  for(var i in filtered_files){
    var file = filtered_files[i];
    file_chooser.append(file);
  }
}

function refresh_filtered_chooser_selection(){
  //debug(selected_file);
  if(selected_file!=''){
    //debug('selected_file:', selected_file);
    var selected_shortname = libraryDict.get(selected_file+'::shortname');
    debug('selected_shortname', selected_shortname);
    if(selected_shortname in filtered_hash_list){
      var entry = parseInt(filtered_hash_list[selected_shortname].entry);
      //debug('entry:', entry, typeof entry);
      select_pipe.message(entry);
    }
  }
}

//problem with init, dict not defined before this is called
function refresh_tagchooser(){
  debug('refresh_tagchooser:', found_tags);
  detect_found_tags();
  if(!last_found_tags.equals(found_tags)){
    tag_chooser.message('clear');
    for(var i in found_tags){
      tag_chooser.append(found_tags[i]);
    }
  }
}

function redraw_tagchooser(){
  tag_chooser.message('clear');
  for(var i in found_tags){
    tag_chooser.append(found_tags[i]);
  }
}

function detect_found_tags(){
  last_found_tags = found_tags.slice();
  found_tags = [];
  //debug('last_found_tags:', last_found_tags);
  var file_list = [].concat(libraryDict.getkeys());
  for(var i in file_list){
    var tags = [].concat(libraryDict.get(file_list[i]+'::tags'));
    for(var t in tags){
      if((found_tags.indexOf(tags[t])==-1)&&(tags[t])){
        found_tags.push(tags[t]);
      }
    }
  }
}

function chooser_single(index, shortname){
  //debug('chooser_single:', index, path);
  //node_script.message('select_file', path);
  var path = selected_tags.length ? filtered_hash_list[shortname].file : hash_list[shortname].file;
  selected_file = path;
  outlet(0, 'select_file', path);
  display_selected_file(path);
  display_selected_file_tags(path);
  browse_file(path);
}

function display_selected_file(path){
  current_selected_file.message('set', path ? path : '');
}

function display_selected_file_tags(path){
  var tags = libraryDict.get(path+'::tags');
  selected_file_tags.message('set', tags ? tags : '');
}

function browse_file(path){
  var file = new File(path);
  var root = file.foldername.split('/');
  var parent = root[root.length-1];
  var parent_folder = root[root.length-2];
  debug('browse_file root', parent, parent_folder);
}

function chooser_double(index, shortname){
  var path = selected_tags.length ? filtered_hash_list[shortname].file : hash_list[shortname].file;
  debug('chooser_double:', index, path);
  outlet(0, 'open_preset', path);
}

function set_tag(){
  //node_script.message('set_tag');
  outlet(0, 'set_tag');
}

function remove_tag(){
  //node_script.message('remove_tag');
  outlet(0, 'remove_tag');
}

function clear_tags(){
  //node_script.message('clear_tags');
  outlet(0, 'clear_tags');
}

function scan_library(){
  outlet(0, 'scan_library');
}

function tag_selection(){
  var tags = arrayfromargs(arguments);
  debug('tag_selection:', tags, tags.length);
  selected_tags = tags[0]=='bang'?[]:tags;
  refresh_chooser();
}

function clear_filter(){
  selected_tags = [];
  redraw_tagchooser();
  refresh_chooser();
}

function AddTag(val){
  debug('AddTag', val);
  set_tag();
}

function RemoveTag(val){
  debug('RemoveTag', val);
  remove_tag();
}

function ClearAllTags(val){
  debug('ClearAllTags', val);
  clear_tags();
}

function Editor(val){
  debug('Editor');
  if(editor){
    if(val){
      editor.open();
    }
    else{
      editor.close();
    }
  }
}

function OpenPreset(){
  debug('OpenPreset');
  outlet(0, 'open_preset', selected_file);
}

function unlock_editor(){
  editor.unlock();
}


forceload(this);



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
