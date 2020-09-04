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

// FileTreeComponent.prototype.refresh = function(){
//   /**refreshes current UI elements with current dir data*/
//   debug('REFRESH!!!');
//   // debug('current_root:', this.current_parent_node.name);
//   // this.refresh_browser_pane();
//
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
//   // debug('FileTree child_node:', current_dir.name);
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


// FileTreeComponent.prototype.old_select_parent = function(index, item){
//   /**input from left browser pane*/
//   // debug('FileTree.select_parent:', index, item);
//   this.new_select_parent(index, item);
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
//         // this.create_primary_node(this.current_parent_node.path);
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
// FileTreeComponent.prototype.old_open_parent = function(index, item){
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
// FileTreeComponent.prototype.old_select_child = function(index, item){
//   /**input from right browser pane*/
//   // debug('FileTree.select_child:', index, item);
//   this.new_select_child(index, item);
//   if(index!=undefined){
//     if(this.child_list.length){
//       var entry = this.child_list[index];
//       if(entry.type == 'folder'){
//         this.current_child_node = undefined;
//         this.current_parent_node = entry;
//         fileInfo.select_file(undefined);
//         // this.create_primary_node(this.current_parent_node.path);
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
// FileTreeComponent.prototype.old_open_child = function(index, item){
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
// FileTreeComponent.prototype.old_find_file = function(path){
//   /**used primarily by selected file from filter window*/
//   // debug('FileTree.find_file:', path);
//   if(path){
//     var root = this._treeobj.parent;
//     var parents = path.toString().replace(root, '').split('/');
//     var ft_obj = retrieve_child(this._treeobj, parents);
//     // debug('found obj:', ft_obj.name, 'parents:', parents);
//     if(parents&&ft_obj){
//       this.current_parent_node = retrieve_parent(this._treeobj, ft_obj.parents);
//       // debug('new current_parent_node is:', this.current_parent_node);
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
// FileTreeComponent.prototype.refresh_parent_path = function(){
//   var node = this.current_parent_path;
//   if((node)&&(node.name!='root')){
//     this.current_parent_path = retrieve_child(this._browser_tree, node.parents.concat([node.name]));
//   }
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
// FileTreeComponent.prototype.update_libraryObj = function(node){
//   for(var i in node.children){
//     var child_node = node.children[i];
//     if(child_node.type=='file'){
//       libraryObj[child_node.path] = {tags:[].concat(child_node.tags), shortname:child_node.name};
//     }
//     this.update_libraryObj(child_node);
//   }
// }

// FileTreeComponent.prototype.old_find_folder = function(path){
//   /**used primarily by selected file from filter window*/
//   debug('FileTree.find_folder:', path, library_directory);
//   path = path ? path : library_directory;
//   if(path){
//     var parents = parents_from_path(path);
//     fileInfo.select_file(undefined);
//     var new_path = pathJoin([library_directory, parents.slice(1).join('/')]);
//     if(this.current_root!=new_path){
//       this._current_root._value = new_path;
//       this.create_primary_node(new_path);
//     }
//     this.current_parent_path = this._browser_tree.children[basename(path)];
//     this.refresh_browser_pane();
//     this.refresh_editor();
//     this.refresh_mira();
//   }
//   this.refresh();
// }

// FileTreeComponent.prototype.scan_library = function(){
//   var f = undefined;
//   try{
//     debug('library_directory:', library_directory);
// 		this._treeobj = {name:'root',
// 			root:basename(library_directory),
// 			root_path:library_directory,
// 			parents:[],
// 			parent: library_directory.replace(basename(library_directory)+'/', ''),
// 			children:{}
// 		};
//     this.scan_folder(library_directory, this._treeobj);
//     // this._dict.parse(JSON.stringify(this._treeobj));
//   }
//   catch(e){
//     debug('Folder not found', util.report_error(e));
//
//   }
// }
//
// FileTreeComponent.prototype.scan_folder = function(dir_name, filetree_node){
// 	// debug('scan_folder:', dir_name, typeof filetree_node);
//   try{
//     var f = new Folder(dir_name);
//     var shortname = basename(dir_name);
//     // debug('shortname is:', shortname);
//   	filetree_node.children[shortname] = {
//       name: shortname,
//   		path: f.pathname,
//   		type: dir_name == library_directory ? 'root':'folder',
//   		parents: parents_from_path(dir_name),
//   		parent: dir_name.split(shortname)[0],
//   		children:{}
//     };
//     while (!f.end) {
//     	if(f.filetype=='fold'){
//   			this.scan_folder(pathJoin([f.pathname, f.filename]), filetree_node.children[shortname]);
//   		}
//       else{
//         if(VALID_FILE_TYPES.indexOf(f.extension)>-1){
//           // debug('filename:', f.filename, 'extension:', f.extension);
//           var file_name = pathJoin([f.pathname, f.filename]);
//           var file_shortname = f.filename;
//           var tags = [];
//           try{
//             tags = libraryObj[file_name].tags;
//             if(tags == null || tags == ''){
//               tags = [];
//             }
//           }
//           catch(e){
//             debug('no libraryObj repr for:', file_name);
//           }
//           // var parents = file_name.replace(library_base, '').replace(file_shortname, '').split('/').filter(function(i){return i!=''});
//           // var parents = parents_from_path(file_name);
//           filetree_node.children[shortname].children[file_shortname] = {
//             name:file_shortname,
//   					path:file_name,
//             type:'file',
//   					parent:f.pathname,
//   					parents: parents_from_path(file_name),
//             tags: tags
//           };
//         }
//       }
//       f.next();
//      }
//      f.close();
//      // delete f
//    }
//    catch(e){
//      debug('scan_folder fail:', util.report_error(e));
//    }
// }
//
// FileTreeComponent.prototype.create_primary_node = function(dir_name){
// 	debug('create_primary_node:', dir_name);
//   dir_name = dir_name ? dir_name : library_directory;
//   // if(!endsWith(dir_name, '/')){
//   //   dir_name = dir_name + '/';
//   // }
//   try{
//     var f = new Folder(dir_name);
//     var shortname = basename(dir_name);
//     var parents = parents_from_path(dir_name);
//     this._browser_tree = {
//       name: shortname,
//   		path: f.pathname,
//   		type: 'root',
//   		parents: parents,
//   		parent: dir_name.split(shortname)[0],
//   		children:{}
//     };
//     while (!f.end) {
//     	if(f.filetype=='fold'){
//         var folder_shortname = f.filename;
//   			this._browser_tree.children[folder_shortname] = this.create_secondary_node(pathJoin([f.pathname, f.filename]));
//   		}
//       else{
//         if(VALID_FILE_TYPES.indexOf(f.extension)>-1){
//           // debug('filename:', f.filename, 'extension:', f.extension);
//           var file_name = pathJoin([f.pathname, f.filename]);
//           var file_shortname = f.filename;
//           var tags = [];
//           try{
//             tags = libraryObj[file_name].tags;
//             if(tags == null || tags == ''){
//               tags = [];
//             }
//           }
//           catch(e){
//             debug('no libraryObj repr for:', file_name);
//           }
//           // var parents = file_name.replace(library_base, '').replace(file_shortname, '').split('/').filter(function(i){return i!=''});
//           var parents = parents_from_path(file_name);
//           this._browser_tree.children[file_shortname] = {
//             name:file_shortname,
//   					path:file_name,
//             type:'file',
//   					parent:f.pathname,
//   					parents: parents,
//             tags: tags
//           };
//         }
//       }
//       f.next();
//      }
//      f.close();
//    }
//    catch(e){
//      debug('scan_folder fail:', util.report_error(e));
//    }
//    // this._dict.parse(JSON.stringify(this._browser_tree));
//    // show_tree_dict();
// }
//
// FileTreeComponent.prototype.create_secondary_node = function(dir_name){
// 	// debug('scan_folder:', dir_name, typeof filetree_node);
//   try{
//     var f = new Folder(dir_name);
//     var shortname = basename(dir_name);
//     // debug('shortname is:', shortname);
//   	var new_node = {
//       name: shortname,
//   		path: f.pathname,
//   		type: dir_name == library_directory ? 'root':'folder',
//   		parents: dir_name == library_directory ? [] : dir_name.replace(library_base, '').replace(shortname, '').split('/').slice(0, -1),
//   		parent: dir_name.split(shortname)[0],
//   		children:{}
//     };
//     while (!f.end) {
//     	if(f.filetype=='fold'){
//   			var folder_name = pathJoin([f.pathname, f.filename]);
//         var folder_shortname = basename(folder_name);
//       	new_node.children[folder_shortname] = {
//           name: folder_shortname,
//       		path: folder_name,
//       		type: 'folder',
//       		parents: folder_name.replace(library_base, '').replace(folder_shortname, '').split('/').filter(function(i){return i!=''}),
//       		parent: dir_name.split(folder_shortname)[0],
//         };
//   		}
//       else{
//         if(VALID_FILE_TYPES.indexOf(f.extension)>-1){
//           var file_name = pathJoin([f.pathname, f.filename]);
//           var file_shortname = f.filename;
//           var tags = [];
//           try{
//             tags = libraryObj[file_name].tags;
//             if(tags == null || tags == ''){
//               tags = [];
//             }
//           }
//           catch(e){
//             debug('no libraryObj repr for:', file_name);
//           }
//           var parents = file_name.replace(library_base, '').replace(file_shortname, '').split('/').filter(function(i){return i!=''});
//           new_node.children[file_shortname] = {
//             name:file_shortname,
//   					path:file_name,
//             type:'file',
//   					parent:f.pathname,
//   					parents: parents,
//             tags: tags
//           };
//         }
//       }
//       f.next();
//      }
//      f.close();
//      // delete f
//      return new_node
//    }
//    catch(e){
//      debug('scan_folder fail:', util.report_error(e));
//    }
//    return {}
// }

// FileTreeComponent.prototype.refresh_browser_pane = function(obj){
//
//   this.new_parent_list = [];
//   for(var i in this._browser_tree.children){
//     this.new_parent_list.push(this._browser_tree.children[i]);
//   }
//   if(this.current_root != library_directory){
//     this.new_parent_list.push({name:'<==back', type:'back_command', parent:this.current_root});
//   }
//   //if there is no selected file, we need to rely on the last stored current_parent_path
//   var parent_index = -1;
//   if(fileInfo.selected_file){
//     var parents = parents_from_path(fileInfo.selected_file);
//     parent_index = indexOfNodePath(this.new_parent_list, {name:parents[Math.max(0, parents.length-1)]});
//     this.current_parent_path = parent_index > -1 ? this.new_parent_list[parent_index] : undefined;
//   }
//   else if(this.current_parent_path){
//     var parents = this.current_parent_path.parents;
//     parent_index = indexOfNodePath(this.new_parent_list, this.current_parent_path);
//   }
//   if(this.current_parent_path){
//     this.new_child_list = [];
//     if(parent_index>-1){
//       var selected_parent_node = this.new_parent_list[parent_index];
//       for(var i in selected_parent_node.children){
//         this.new_child_list.push(selected_parent_node.children[i]);
//       }
//     }
//   }
//   // var child_index = indexOfNodePath(this.new_child_list, {name:fileInfo.selected_file ? basename(fileInfo.selected_file) : undefined});
//   // this.current_child_path = child_index > -1 ? this.new_child_list[child_index] : undefined;
//   // debug('child_path is now:', child_index, this.current_child_path);
//   this.refresh_editor();
//   this.refresh_mira();
// }
//
// FileTreeComponent.prototype.refresh_browser_pane = function(obj){}
//
// FileTreeComponent.prototype.find_file = function(path){
//   /**used primarily by selected file from filter window*/
//   debug('FileTree.find_file:', path);
//   if(path){
//     var parents = parents_from_path(path);
//     fileInfo.select_file(path);
//     var new_path = pathJoin([library_directory, parents.slice(1, -1).join('/')]);
//     this.select_root(new_path);
//     var child_index = indexOfNodePath(this.child_list, {name:fileInfo.selected_file ? basename(fileInfo.selected_file) : undefined});
//     this.current_child_path = child_index > -1 ? this.child_list[child_index] : undefined;
//     debug('child_path is now:', child_index, this.current_child_path);
//     this.refresh_editor();
//     this.refresh_mira();
//   }
//   // this.refresh();
// }
