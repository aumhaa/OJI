//aumhaa 010320 aumhaa@gmail.com

const maxApi = require('max-api');
const fs = require('fs');
const path = require('path');
const util = require('util');
const xattr = require('../node_dependencies/node_modules/fs-xattr');
const open = require('../node_dependencies/node_modules/open');
const xmljs = require('../node_dependencies/node_modules/xml-js');
const { exec } = require("child_process");

function arrayfromargs(){
	return Array.prototype.slice.call(arguments, 0);
}

Debug = function(){
	var args = arrayfromargs.apply(this, arguments);
	for(var i in args){
		if(args[i] instanceof Array){
			args[i] = args[i].join(' ');
		}
	}
	args = args.join(' ');
	maxApi.post(args + '\n');
}

const DEBUG = true;
const debug = DEBUG&&Debug?Debug:function(){}

const VALID_FILE_TYPES = ['.aupreset', '.adg', '.adv', '.wav', '.aif'];
const namespace = 'com.aumhaa.Tag';
const prefFile_prefix = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + "/.local/share");
const prefFile_path = prefFile_prefix + '/com.aumhaa.preset_tagger_preferences.json';
const default_prefs = {preferences:{path:''}};

//utility
const updateDict = async (id, updatePath, updateValue) => {
	if (!id) throw makeError("Missing name for setDict request. Please make sure you provide a (valid) name.", ERROR_CODES.INVALID_PARAMETERS);
	if (!updatePath) throw makeError("Missing path value for updateDict request.", ERROR_CODES.INVALID_PARAMETERS);

	await maxApi.updateDict(id, updatePath, updateValue);
	//maxApi.outlet('js', 'refresh_chooser');
}

const setDict = async(id, value) => {
	return await maxApi.setDict(id, value);
}

const break_patch = () => {
	let func = process.nextTick(function() {
		throw new Error;
	});
	return func
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

maxApi.addHandler('asyncJS', async(addy, func, ...args) => {
	debug('asyncJS:', addy, func, args);
	let response = new Promise(function(response, reject){
		if(!script[func]){
			//reject(new Error('No public function: '+func));
			throw new Error('No public function: ' + func.toString())
		}
		try{
			script[func].apply(script, args).then( (r) =>{
				response(r);
			}, (e) => {
				reject(e);
			});
		}
		catch(err){
			reject(err);
		}
	});
	response.then((r) => {
		debug('responding:', addy, r);
		maxApi.outlet('js', 'asyncResolve', addy, r);
	}).catch((e) => {
		// debug('rejecting:', addy, e);
		maxApi.outlet('js', 'asyncResolve', addy, 'ERROR', e.message);
	});
});

class PresetTagger {

	constructor() {
		let self = this;
		this._name = 'preset tagger';
		this.libraryDictId = "library";
		this.filetreeDictId = "filetree";
		//this is duplicated in resolve_library_path
		try {
		  this.libraryDict = maxApi.getDict(this.libraryDictId);
			debug('getting libraryDict');
			debugger;
		}
		catch (err) {
			debug('library dict init error', err.message);
		}
		try {
			debug('getting filetreeDict');
		  this.filetreeDict = maxApi.getDict(this.filetreeDictId);
		}
		catch (err) {
			debug('filetree dict init error', err.message);
		}

		this.library_dir = '';
		// this.filetreeDict = filetreeDict;
		// this.filetreeDictId = filetreeDictId;
		this.default_prefs = default_prefs;
		this.prefFile_path = prefFile_path;
		this.selected_file = undefined;
		this.selected_tag = [];
		this.library_data = {};
		this.file_tree = {};
		this.watcher = {close: () => {} };
		this.library_base = '';
		this.update_task = undefined;
		this.block_updates = false;
	}

	/** redundant, does the same as next func*/
	init_from_js = async () => {
		debug('init_from_js', this._name);
		return await this.resolve_library_path();
	}

	resolve_library_path = async() => {
		/**make sure that the libary paths are valid.
		*  populate dictionary elements.
		*  load prefs from prefs file.
		*/
		debug('resolve_library_path');
		let errors = [];
		try {
		  this.libraryDict = maxApi.getDict(this.libraryDictId);
		}
		catch (err) {
			debugger;
			debug('library dict init error', err);
			errors.push(err.message.toString());
		}
		try {
		  this.filetreeDict = maxApi.getDict(this.filetreeDictId);
		}
		catch (err) {
			debug('filetree dict init error', err);
			errors.push(err.message.toString());
		}
		// debug('prefFile_path:', prefFile_path);
		try{
			let obj = this.default_prefs;
			if( (fs.existsSync(this.prefFile_path)) && (fs.lstatSync(this.prefFile_path).isFile()) ){
				let newData = fs.readFileSync(this.prefFile_path, 'utf8');
				obj = JSON.parse(newData);
				debug('prefs are:', obj);
			}
			else{
				let newFile = JSON.stringify(this.default_prefs, null, 3);
				fs.writeFile(this.prefFile_path, newFile, function(err, data) {
					if (err) {debug(err);}
					else{debug('default preferences written!');}
				});
			}
			if( (fs.existsSync(obj.preferences.path)) && (fs.lstatSync(obj.preferences.path).isDirectory()) ){
				this.set_library_internal(obj.preferences.path);
			}
			else{
				return Promise.reject(new Error('no library path'));
			}
		}
		catch (err){
			debug('prefFile readstream creation error ', err);
			errors.push(err.message.toString());
			let newFile = JSON.stringify(this.default_prefs, null, 3);
			fs.writeFile(this.prefFile_path, newFile, function(err, data) {
				if (err) {debug(err);}
				else{debug('default preferences written!');}
			});
		}
		if(errors.length){
			return Promise.resolve(new Error(errors.join('...')));
		}
		return true
	}

	//redundant?
	init_prefs = async () => {
		/**  initialize the preferences from the prefs file
		*    duplicated in resolve library paths
		*/
		debug('prefFile_path:', this.prefFile_path);
		let obj = this.default_prefs;
		try{
			if( (fs.existsSync(this.prefFile_path)) && (fs.lstatSync(this.prefFile_path).isFile()) ){
				let newData = fs.readFileSync(this.prefFile_path, 'utf8');
				obj = JSON.parse(newData);
			}
			else{
				let newFile = JSON.stringify(this.default_prefs, null, 3);
				fs.writeFile(this.prefFile_path, newFile, function(err, data) {
					if (err) {debug(err);}
					else{debug('default preferences written!');}
				});
			}
			if( (fs.existsSync(obj.preferences.path)) && (fs.lstatSync(obj.preferences.path).isDirectory()) ){
				set_library_internal(obj.preferences.path);
			}
		}
		catch (err){
			debug('prefFile readstream creation error', err);
			return err
		}
		return obj.preferences.path
	}

	//not currently used
	writeFileTree = async () => {
		let newData = fs.readFileSync(this.prefFile_path);
		//let result = xmljs.xml2json(newData, {compact: true, spaces: 3});
		let obj = JSON.parse(newData);
		obj.preferences.fileTree = file_tree;
		//let newFile = xmljs.js2xml(obj, {compact: true, spaces: 3});
		let newFile = JSON.stringify(obj, null, 3);
		fs.writeFile(this.prefFile_path, newFile, function(err, data) {
			if (err) {
				return(err);
			}
			else{
				debug('FileTree written!');
			}
		});
		return true
	}

	/**method invoked by js instance to set library from patcher*/
	set_library = async(dir) => {
		return await this.set_library_internal(dir);
	}

  /**set library dir, scan it, assign watcher */
	set_library_internal = async(dir) => {
		debug('set_library_internal', dir);
		if( (fs.existsSync(dir)) && (fs.lstatSync(dir).isDirectory()) ){
			await this.watcher.close();
			this.library_dir = dir;
			this.library_base = dir.split(path.basename(dir))[0];
			this.scan_library();
			this.watcher = await fs.watch(dir, {recursive:true}, this.on_file_changed);
			return this.library_dir
		}
		return Promise.reject(new Error('invalid library path: ' + dir))
	}

	/**library watcher, paused on batch calls*/
	on_file_changed = (event, file_name) => {
		/** callback function for when file changes that is contained in the watched library*/
		let file_path = path.join(this.library_dir, file_name).toString();
		if( ((fs.existsSync(file_path)) &&
		(VALID_FILE_TYPES.indexOf(path.extname(file_path))>-1)) ||
		(event == 'rename') ){
			this.call_library_update();
		}
	}

	call_library_update = () => {
		if(this.update_task){
			clearTimeout(this.update_task);
		}
		this.update_task = setTimeout(() => {
			this.scan_library_internal().then(() => {
				maxApi.outlet('js', 'library_updated');
			})}, 10);
	}

	find_filetree_node = async(file_path) => {
		try{
			let relative_path = file_path.replace(path.basename(this.library_dir)+'/', '');
			let shortname = path.basename(file_path);
			let parents = relative_path.replace(shortname, '').split('/');
			let base = path.basename(this.library_dir);
			let node = this.file_tree.children[base];
			if(parents.length){
				parents.shift()
				for(var i in parents){
					if(node.children[parents[i]]){
						// debug('node:', node, 'parents[i]', i, parents[i]);
						node = node.children[parents[i]];
					}
				}
				// debug('node path:', node.path);
				return node
			}
		}
		catch(e){
			debug('find_filetree_node error:', e.message);
			return e
		}

	}

	/**combine with scan_library_internal and use await*/
	scan_library = async() => {
		// debug('scan_library');
		let ret = await this.scan_library_internal();
		return ret
	}

	scan_library_internal = async() => {
		if( (fs.existsSync(this.library_dir)) && (fs.lstatSync(this.library_dir).isDirectory()) ){
			// debug('this.library_dir is:', this.library_dir);
			maxApi.outlet('js', 'in_update');
			this.library_data = {};
			// setDict(this.libraryDictId, this.library_data);
			// this.setDict(this.libraryDictId, this.library_data);
			this.file_tree = {name:'root',
								root:path.basename(this.library_dir),
								root_path:this.library_dir,
								parents:[],
								parent: this.library_dir.replace(path.basename(this.library_dir)+'/', ''),
								children:{}};
			this.scan_folder(this.library_dir, this.file_tree);
			// setDict(this.libraryDictId, this.library_data);
			// setDict(this.filetreeDictId, this.file_tree);
			maxApi.setDict(this.filetreeDictId, this.file_tree);
			maxApi.setDict(this.libraryDictId, this.library_data);
			debug('returning from set_library_internal');
			return true;
		}
		return Promise.reject(new Error('scan failed, library dir is invalid'));
	}

	/**helper method for scan_library...combine*/
	scan_folder = async(dir_name, filetree_node) => {
		// debug('scan_folder:', dir_name, typeof filetree_node);
		let directoryFiles = fs.readdirSync(dir_name);
		let shortname = path.basename(dir_name);
		filetree_node.children[shortname] = {name: shortname,
																path: dir_name,
																type:dir_name == this.library_dir ? 'root':'folder',
																parents: dir_name == this.library_dir ? [] : dir_name.replace(this.library_base, '').replace(shortname, '').split('/').slice(0, -1),
																parent:dir_name.split(shortname)[0],
																children:{}};
		directoryFiles.forEach(filename => {
			let file_path = path.join(dir_name, filename).toString();
			if( (fs.existsSync(file_path)) && (fs.lstatSync(file_path).isDirectory()) ){
				this.scan_folder(file_path, filetree_node.children[shortname]);
			}
			else if( (fs.existsSync(file_path)) && (fs.lstatSync(file_path).isFile()) ){
				this.scan_file(file_path, filename, filetree_node.children[shortname]);
			}
		});
		return true
	}

	/**helper method for scan_library...combine*/
	scan_file = async(file_name, shortname, filetree_node) => {
		// debug('scan_file', file_name);
		if( (fs.existsSync(file_name)) && (VALID_FILE_TYPES.indexOf(path.extname(file_name))>-1)){
			let tags = [];
			let attrs = xattr.listSync(file_name);
			if(attrs.indexOf(namespace)>-1){
				tags = [].concat(xattr.getSync(file_name, namespace).toString('utf8').split(' '));
			}
			this.library_data[file_name] = {'tags':tags, 'shortname':shortname};
			filetree_node.children[shortname] = {name:shortname,
																path:file_name, type:'file',
																parent:file_name.split(shortname)[0],
																parents: file_name.replace(this.library_base, '').replace(shortname, '').split('/').slice(0, -1),
																tags: tags};
		}
		return true
	}

	/**restore a dict json to the current library*/
	restore_snapshot = async(filename) => {
		debug('restore_snapshot:', filename);
		if((filename!=undefined)&&(fs.existsSync(filename))&&(fs.lstatSync(filename).isFile())){
			let libObj = {};
			try{
				let snapshotData = fs.readFileSync(filename, 'utf8');
				libObj = JSON.parse(snapshotData);
				for(var item in libObj){
					let file = item;
					let tags = libObj[item].tags.join(' ').toString();
					// debug('file:', file, 'tags:', tags);
					if( (fs.existsSync(file)) && (fs.lstatSync(file).isFile()) ){
						xattr.setSync(file, namespace, tags);
					}
				}
				return await this.scan_library()  //.then( () => {
				// 	maxApi.outlet('js', 'refresh_chooser');
				// });
				//return true;
			}
			catch(err){
				debug('snapshot load error:', err);
				return(err);
			}
			//maxApi.setDict(libraryDictId, libObj);
			//libraryDict = maxApi.getDict(libraryDictId);
		}
	}

	/**store the lib_dir to the prefs file*/
	set_global_path = async(...a) => {
		debug('set_global_path', this.library_dir);
		let library_dir = this.library_dir;
		let obj = JSON.stringify(this.default_prefs, null, 3);
		//debug(JSON.stringify({blah:1, something:2, yo:3}));
		if( (fs.existsSync(library_dir)) && (fs.lstatSync(library_dir).isDirectory()) ){
			try{
				let newData = fs.readFileSync(this.prefFile_path, 'utf8');
				// debug('newData', newData);
				obj = JSON.parse(newData);
				// debug('obj', JSON.stringify(obj));
			}
			catch(e){
				debug('cant read prefs file, using defaults...');
			}
			obj.preferences.path = library_dir;
			let newFile = JSON.stringify(obj, null, 3);
			// debug('newFile', newFile);
			fs.writeFile(this.prefFile_path, newFile, 'utf8', function(err) {
				if (err) {
					return Promise.reject(err)
				}
			});
			return library_dir
		}
		return Promise.reject(new Error('invalid path'));
	}

	/**apply tag(s) to the target file*/
	apply_tag = async (target_file, ...tags) => {
		// debug('apply_tag:', target_file, tags);
		if( (target_file!=undefined) &&
		 (tags.length>0) &&
		 (fs.existsSync(target_file)) &&
		 (fs.lstatSync(target_file).isFile()) &&
	   	 (VALID_FILE_TYPES.indexOf(path.extname(target_file))>-1) ) {
			let attrs = xattr.listSync(target_file);
			// this needs to be a separate function, and should both ensure and flatten
			let tag_buf = [].concat(tags);
			if(attrs.indexOf(namespace)==-1){
				xattr.setSync(target_file, namespace, tag_buf.join(' '));
			}
			else{
				let tags = xattr.getSync(target_file, namespace).toString();
				let sep_tags = [].concat(tags.split(' '));
				let new_tags = [];
				for(var i in tag_buf){
					if(sep_tags.indexOf(tag_buf[i])==-1){
						new_tags.push(tag_buf[i]);
					}
				}
				new_tags = sep_tags.concat(new_tags).join(' ');
				xattr.setSync(target_file, namespace, new_tags);
			}
			return true
		}
		return Promise.reject(new Error('invalid path or tag'));
	}

	/**remove tag(s) from a target file*/
	remove_tag = async (target_file, ...tags) => {
		if( (target_file!=undefined) &&
		 (tags.length>0) &&
		 (fs.existsSync(target_file)) &&
		 (fs.lstatSync(target_file).isFile()) &&
		 (VALID_FILE_TYPES.indexOf(path.extname(target_file))>-1) ) {
			let attrs = xattr.listSync(target_file);
			// this needs to be a separate function, and should both ensure and flatten
			let tag_buf = [].concat(tags);
			if(attrs.indexOf(namespace)>-1){
				let tags = xattr.getSync(target_file, namespace).toString();
				let sep_tags = [].concat(tags.split(' '));
				let new_tags = [];
				for(let i in sep_tags){
					let index = tag_buf.indexOf(sep_tags[i]);
					if(index==-1){
						new_tags.push(sep_tags[i]);
					}
				}
				new_tags = new_tags.join(' ');
				xattr.setSync(target_file, namespace, new_tags);
			}
			return true
		}
		return Promise.reject(new Error('invalid path or tag'))
	}

	/**clear tag(s) from target file*/
	clear_tags = async(target_file) => {
		if( (target_file!=undefined) &&
		 (fs.existsSync(target_file)) &&
		 (fs.lstatSync(target_file).isFile()) &&
		 (xattr.listSync(target_file).indexOf(namespace)>-1) &&
		 (VALID_FILE_TYPES.indexOf(path.extname(target_file))>-1) ) {
			xattr.removeSync(target_file, namespace);
			return true
		}
		return Promise.reject(new Error('invalid path'))
	}

	/**set tags for all files contained in a target folder */
	apply_folder_tags = async(dir_name, ...tags) => {
		// debug('apply_folder_tags:', dir_name, tags);
		if( (tags.length > 0) &&
		 (fs.existsSync(dir_name)) &&
		 (fs.lstatSync(dir_name).isDirectory()) ) {
			// debug('set_folder_tags:', dir_name, tags);
			// this.block_updates = true;
			let directoryFiles = fs.readdirSync(dir_name);
			// this needs to be a separate function, and should both ensure and flatten
			let tag_buf = [].concat(tags);
			let file_actions = [];
			directoryFiles.forEach( target_file => {
				let file_path = path.join(dir_name, target_file).toString();
				let action = this.apply_tag.apply(this, [file_path].concat(tag_buf));
				file_actions.push(action);
			});

			Promise.all(file_actions).then( (res) =>{
				debug('response is:', res);
			}).catch((e) => {
				debug('apply_folder_tags error is:', e.message);
			}).finally(() => {
				debug('unblocking updates.');
				this.block_updates = false;
				// this.scan_library_internal();
			})
			// this.block_updates = false;
			debug('returning true');
			return true
		}
		return Promise.reject(new Error('invalid path or tag'));
	}

	/**remove tags for all files contained in a target folder */
	remove_folder_tags = (dir_name, ...tags) => {
		// debug('remove_folder_tags:', dir_name, tags, tags.length);
		if( (tags.length > 0) &&
			(fs.existsSync(dir_name)) &&
			(fs.lstatSync(dir_name).isDirectory()) ) {
			// this.block_updates = true;
			let directoryFiles = fs.readdirSync(dir_name);
			// this needs to be a separate function, and should both ensure and flatten
			let tag_buf = [].concat(tags);
			let file_actions = [];
			directoryFiles.forEach(target_file => {
				let file_path = path.join(dir_name, target_file).toString();
				let action = this.remove_tag.apply(this, [file_path].concat(tag_buf));
				file_actions.push(action);
			});

			Promise.all(file_actions).then( (res) =>{
				debug('response is:', res);
			}).catch((e) => {
				debug('remove_folder_tags error is:', e.message);
			}).finally(() => {
				debug('unblocking updates.');
				this.block_updates = false;
				// this.scan_library_internal();
			})
			return true
		}
		return Promise.reject(new Error('invalid path or tag'));
	}

	/**clear all tags for all files contained in a target folder */
	clear_folder_tags = async(dir_name) => {
		// debug('clear_folder_tags', dir_name);
		if( (fs.existsSync(dir_name)) &&
			(fs.lstatSync(dir_name).isDirectory()) ){
			// this.block_updates = true;
			let directoryFiles = fs.readdirSync(dir_name);
			let file_actions = [];
			directoryFiles.forEach( target_file => {
				let file_path = path.join(dir_name, target_file).toString();
				let action = this.clear_tags(file_path);
				file_actions.push(action);
			});

			Promise.all(file_actions).then( (res) =>{
				debug('response is:', res);
			}).catch((e) => {
				debug('clear_folder_tags error is:', e.message);
			}).finally(() => {
				debug('unblocking updates.');
				this.block_updates = false;
				// this.scan_library_internal();
			})
			return true
		}
		return Promise.reject(new Error('invalid path or tag'));
	}

	//open
	open_preset = async(filepath) => {
		// debug('open_preset', filepath);
		return await open(filepath, {wait: true, app:'/Applications/Ableton Live 10 Suite.app'});
	}

	//reveal
	reveal_preset = async(filepath) => {
		debug('reveal_preset', filepath);
		exec('open -R "' + filepath +'"', (err, stdout, stderr) => {
			if(err){
				debug('error:', err.message);
				return err
			}
			if(stderr){
				debug('stderr:', stderr);
				return stderr
			}
			return true
		});
	}


	//remove
	get_libdir = async() => {
		//needs to be changed to __getter__ item
		debug('getting libdir....', this.library_dir);
		return this.library_dir;
	}

	//remove and send with command
	select_file = async(file) => {
		if( (fs.existsSync(file)) && (fs.lstatSync(file).isFile()) ){
			debug('select_file', file);
			this.selected_file = file;
		}
	}

	/**remove and send tagbuffer with command
	*/
	select_tag = async(...args) => {
		debug('select_tag', args);
		this.selected_tag = [].concat(args);
	}

}

let script = new PresetTagger();



	// /**library watcher, paused on batch calls*/
	// *  there's something wrong with the way this method is gathering file info...when it tries to
	// *  write the FileTree dict, it's crashing Max/Live.
	// on_file_changed = (event, file_name) => {
	// 	/** callback function for when file changes that is contained in the watched library*/
	// 	// debug('on_file_changed:', event, file_name, 'block_updates:', this.block_updates);
	// 	if(!this.block_updates){
	// 		let file_path = path.join(this.library_dir, file_name).toString();
	// 		if( ((fs.existsSync(file_path)) &&
	// 		(VALID_FILE_TYPES.indexOf(path.extname(file_path))>-1)) ||
	// 		(event == 'rename') ){
	// 			// this.block_updates = true;
	// 			// debug('on_file_changed:', event, file_name);
	// 			this.rescan_file(file_name).then( () => {
	// 				maxApi.outlet('js', 'library_updated');
	// 			}).catch( (e) => {
	// 				debug('filewatch scan unsuccessful, scanning all instead...', e.message);
	// 				// this.scan_library_internal().then( () => {
	// 				// 	debug('scan internal finished, updating js library');
	// 				// 	maxApi.outlet('js', 'library_updated');
	// 				// });
	// 			}).finally(() =>{
	// 				// debug('unblocking updates');
	// 				this.block_updates = false;
	// 			})
	// 		}
	// 	}
	// }

	// /** This is use with on_file_changed, above, and is somehow causing problems */
	// rescan_file = async(file_name) => {
	// 	debug('rescan_file:', file_name);
	// 	let node = false;
	// 	try{
	// 		if( (VALID_FILE_TYPES.indexOf(path.extname(file_name))>-1) ){
	// 			//let shortname = path.basename(file_name);
	// 			this.find_filetree_node(file_name).then( (node) => {
	// 					// debug('going to scan folder:', node.path, node);
	// 					this.scan_folder(node.path, node).then(() => {
	// 						this.call_library_update();
	// 					})
	// 					// all setDict calls need to be queued and defered.
	// 					// setDict(this.libraryDictId, this.library_data);
	// 					// setDict(this.filetreeDictId, this.file_tree);
	// 					// this.call_library_update();
	// 			});
	// 			return true
	// 		}
	// 	}
	// 	catch(e){
	// 		debug('rescan_file error:', e.message);
	// 		return e
	// 	}
	// 	return false
	// }

	// /**set tags for all files contained in a target folder */
	// apply_folder_tags = async(dir_name, ...tags) => {
	// 	debug('apply_folder_tags:', dir_name, tags);
	// 	if( (tags.length > 0) &&
	// 	 (fs.existsSync(dir_name)) &&
	// 	 (fs.lstatSync(dir_name).isDirectory()) ) {
	// 		// debug('set_folder_tags:', dir_name, tags);
	// 		this.block_updates = true;
	// 		let directoryFiles = fs.readdirSync(dir_name);
	// 		let tag_buf = tags;
	// 		directoryFiles.forEach( target_file => {
	// 			let file_path = path.join(dir_name, target_file).toString();
	// 			// this.apply_tag(file_path, tag_buf);
	// 			// for some reason this crashes node.  Can't figure out why.
	// 			if( (file_path!=undefined) &&
	// 			 (tags.length>0) &&
	// 			 (fs.existsSync(file_path)) &&
	// 			 (fs.lstatSync(file_path).isFile()) &&
	// 			 (VALID_FILE_TYPES.indexOf(path.extname(file_path))>-1) ) {
	// 			   let attrs = xattr.listSync(file_path);
	// 			   if(attrs.indexOf(namespace)==-1){
	// 				   xattr.setSync(file_path, namespace, tag_buf.join(' '));
	// 			   }
	// 			   else{
	// 				   let tags = xattr.getSync(file_path, namespace).toString();
	// 				   let sep_tags = [].concat(tags.split(' '));
	// 				   let new_tags = [];
	// 				   for(var i in tag_buf){
	// 					   if(sep_tags.indexOf(tag_buf[i])==-1){
	// 						   new_tags.push(tag_buf[i]);
	// 					   }
	// 				   }
	// 				   new_tags = sep_tags.concat(new_tags).join(' ');
	// 				   xattr.setSync(file_path, namespace, new_tags);
	// 			   }
	// 		   }
	// 		});
	// 		this.block_updates = false;
	// 		return true
	// 	}
	// 	return Promise.reject(new Error('invalid path or tag'));
	// }

		// /**remove tags for all files contained in a target folder */
	// remove_folder_tags = (dir_name, ...tags) => {
	// 	// debug('remove_folder_tags:', dir_name, tags);
	// 	if( (tags.length > 0) &&
	// 	 (fs.existsSync(dir_name)) &&
	// 	 (fs.lstatSync(dir_name).isDirectory()) ) {
	// 		this.block_updates = true;
	// 		let directoryFiles = fs.readdirSync(dir_name);
	// 		let tag_buf = tags;
	// 		directoryFiles.forEach(target_file => {
	// 			let file_path = path.join(dir_name, target_file).toString();
	// 			// this.remove_tag(file_path, tag_buf);
	// 			if( (file_path!=undefined) &&
	// 			 (fs.existsSync(file_path)) &&
	// 			 (fs.lstatSync(file_path).isFile()) &&
	// 			 (VALID_FILE_TYPES.indexOf(path.extname(file_path))>-1) ) {
	// 			   let attrs = xattr.listSync(file_path);
	// 			   if(attrs.indexOf(namespace)>-1){
	// 				   let tags = xattr.getSync(file_path, namespace).toString();
	// 				   let sep_tags = [].concat(tags.split(' '));
	// 				   let new_tags = [];
	// 				   for(var i in sep_tags){
	// 					   var index = tag_buf.indexOf(sep_tags[i]);
	// 					   if(index==-1){
	// 						   new_tags.push(sep_tags[i]);
	// 					   }
	// 				   }
	// 				   new_tags = new_tags.join(' ');
	// 				   xattr.setSync(file_path, namespace, new_tags);
	// 			   }
	// 		   }
	// 		});
	// 		this.block_updates = false;
	// 		return true
	// 	}
	// 	return Promise.reject(new Error('invalid path or tag'));
	// }

		// /**clear all tags for all files contained in a target folder */
		// clear_folder_tags = async(dir_name) => {
		// 	// debug('clear_folder_tags', dir_name);
		// 	if( (fs.existsSync(dir_name)) &&
		// 	 (fs.lstatSync(dir_name).isDirectory()) ){
		// 		this.block_updates = true;
		// 		let directoryFiles = fs.readdirSync(dir_name);
		// 		directoryFiles.forEach( target_file => {
		// 			let file_path = path.join(dir_name, target_file).toString();
		// 			//this.clear_tags(file_path);
		// 			if( (file_path!=undefined) &&
		// 			 (fs.existsSync(file_path)) &&
		// 			 (fs.lstatSync(file_path).isFile()) &&
		// 			 (xattr.listSync(file_path).indexOf(namespace)>-1) &&
		// 			 (VALID_FILE_TYPES.indexOf(path.extname(file_path))>-1) ) {
		// 			   xattr.removeSync(file_path, namespace);
		// 			}
		// 		});
		// 		this.block_updates = false;
		// 		return true
		// 	}
		// 	return Promise.reject(new Error('invalid path or tag'));
		// }
