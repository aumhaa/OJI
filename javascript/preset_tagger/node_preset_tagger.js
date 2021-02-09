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

const DEBUG = false;
const debug = DEBUG&&Debug?Debug:function(){}

const VALID_FILE_TYPES = ['.aupreset', '.adg', '.adv', '.wav', '.aif', '.json'];
const LIVEAPP_PATH = '/Applications/Ableton Live 11 Suite.app';
const namespace = 'com.aumhaa.Tag';
const prefFile_prefix = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + "/.local/share");
const prefFile_path = prefFile_prefix + '/com.aumhaa.preset_tagger_preferences.json';
const default_prefs = {preferences:{path:''}};

//utility
const updateDict = async (id, updatePath, updateValue) => {
	if (!id) throw makeError("Missing name for setDict request. Please make sure you provide a (valid) name.", ERROR_CODES.INVALID_PARAMETERS);
	if (!updatePath) throw makeError("Missing path value for updateDict request.", ERROR_CODES.INVALID_PARAMETERS);

	let ret = await maxApi.updateDict(id, updatePath, updateValue);
	return ret
	//maxApi.outlet('js', 'refresh_chooser');
}

const setDict = async(id, value) => {
	// await maxApi.setDict(id, {});
	const ret = await maxApi.setDict(id, value);
	debug('setDict', ret);
	return ret
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

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

maxApi.addHandler('asyncJS', async(addy, func, ...args) => {
	// debug('asyncJS:', addy, func, args);
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
		// debug('responding:', addy, r);
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
		this.filetreeDictId = "filetree";
		this.libraryDictId = "library";
		//this is duplicated in resolve_library_path
		// try {
		// 	debug('getting filetreeDict');
		//   this.filetreeDict = maxApi.getDict(this.filetreeDictId);
		// }
		// catch (err) {
		// 	debug('filetree dict init error', err.message);
		// }
		this.filetreeDict = {};

		this.library_dir = '';
		this.default_prefs = default_prefs;
		this.prefFile_path = prefFile_path;
		this.selected_file = undefined;
		this.selected_tag = [];
		this.file_tree = {};
		this.library_data = {};
		this.watcher = {close: () => {} };
		this.library_base = '';
		this.update_task = undefined;
		this.block_updates = false;
		this.flush_task = undefined;
		this.file_update_queue = [];

		this.MAX_UPDATE_THRESH = 10;
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
		let ret_dir = false;
		// try {
		//   this.filetreeDict = maxApi.getDict(this.filetreeDictId);
		// }
		// catch (err) {
		// 	debug('filetree dict init error', err);
		// 	errors.push(err.message.toString());
		// }
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
				try{
					ret_dir = await this.set_library_internal(obj.preferences.path);
					debug('set_lib_internal:', ret_dir);
				}
				catch(e){
					debug('set_lib_internal error:', e.message);
				}
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
		return ret_dir  //this has to return the library_directory
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
			await this.scan_library();
			this.watcher = await fs.watch(dir, {recursive:true}, this.on_file_changed);
			return this.library_dir
		}
		return Promise.reject(new Error('invalid library path: ' + dir))
	}

	/**library watcher, paused on batch calls*/
	on_file_changed = (event, file_name) => {
		/** callback function for when file changes that is contained in the watched library*/
		if(!this.block_updates){
			let file_path = path.join(this.library_dir, file_name).toString();
			if( ((fs.existsSync(file_path)) &&
			(VALID_FILE_TYPES.indexOf(path.extname(file_path))>-1)) ||
			(event == 'rename') ){
				// this.call_library_update();
				// this.rescan_file(file_path);
				this.file_update_queue.push(file_path);
				let delay = this.file_update_queue.length > this.MAX_UPDATE_THRESH ? 500 : 20;
				if(this.flush_task){
					clearTimeout(this.flush_task);
				}
				this.flush_task = setTimeout(() => {
					this.flush_update_queue();
				}, delay);
			}
		}
	}

	flush_update_queue = async() => {
		debug('flush_update_queue');
		if(this.file_update_queue.length<this.MAX_UPDATE_THRESH){
			for(const index in this.file_update_queue){
				this.rescan_file(this.file_update_queue[index]);
			}
			this.file_update_queue = [];
		}
		else{
			this.call_library_update();
		}
	}

	rescan_file = async(file_name) => {
		// debug('rescan_file:', file_name);
		try{
				let old_tags = this.library_data[file_name].tags;
				let tags = [];
				let attrs = xattr.listSync(file_name);
				if(attrs.indexOf(namespace)>-1){
					tags = [].concat(xattr.getSync(file_name, namespace).toString('utf8').split(' ')).sort();
				}
				if(!arraysEqual(old_tags, tags)){
					// debug('calling rescan....', old_tags, old_tags.length, tags, tags.length, 'new tags, calling update');
					debug('rescan_file:', file_name, 'tags:', tags);
					let shortname = path.basename(file_name);
					await this.scan_file(file_name, shortname);
					this.notify_js_file_changed(file_name, this.library_data[file_name].tags);
					maxApi.outlet.apply(maxApi, ['dict', 'replace', file_name+'::tags'].concat(this.library_data[file_name].tags));
				}
				else{
					// debug('tags are the same, no need to call update');
					return true
				}
		}
		catch(e){
			debug('problem with rescan file, requesting js to update from its end');
			this.call_library_update();
		}
	}

	notify_js_file_changed = async(filename, tags) => {
		// maxApi.outlet('js', 'on_specific_file_changed', filename, tags);
		maxApi.outlet.apply(maxApi, ['js', 'on_specific_file_changed', filename].concat(tags));
	}

	/**we use this to tell js we need to update, it will call the update
	from there when it's ready as an async function*/
	call_library_update = () => {
		if(this.update_task){
			clearTimeout(this.update_task);
		}
		this.update_task = setTimeout(() => {
			this.file_update_queue = [];
			maxApi.outlet('js', 'on_file_changed');
		}, 20);
	}

	scan_library = async() => {
		// debug('scan_library');
		let ret = await this.scan_library_internal();
		return ret
	}

	scan_library_internal = async() => {
		this.library_data = {};
		if( (fs.existsSync(this.library_dir)) && (fs.lstatSync(this.library_dir).isDirectory()) ){
			debug('this.library_dir is:', this.library_dir);
			this.file_tree = {name:'root',
				root:path.basename(this.library_dir),
				root_path:this.library_dir,
				parents:[],
				parent: this.library_dir.replace(path.basename(this.library_dir)+'/', ''),
				children:{}
			};
			try{
				await this.scan_folder(this.library_dir, this.file_tree);
				debug('returned from scan...', this.filetreeDictId, this.file_tree);
			}
			catch(e){
				return Promise.reject(e)
			}
			try{
				// await setDict(this.filetreeDictId, this.file_tree);
				await setDict(this.libraryDictId, this.library_data);
				return true
			}
			catch(e){
				return Promise.reject(e)
			}
		}
		else{
			return Promise.reject(new Error('scan failed, library dir is invalid'));
		}
	}

	scan_folder = async(dir_name) => {
		// debug('scan_folder:', dir_name, typeof filetree_node);
		let directoryFiles = fs.readdirSync(dir_name);
		let shortname = path.basename(dir_name);
		for(const filename of directoryFiles){
			let file_path = path.join(dir_name, filename).toString();
			if( (fs.existsSync(file_path)) && (fs.lstatSync(file_path).isDirectory()) ){
				await this.scan_folder(file_path);
			}
			else if( (fs.existsSync(file_path)) && (fs.lstatSync(file_path).isFile()) ){
				await this.scan_file(file_path, filename);
			}
		}
		return true
	}

	scan_file = async(file_name, shortname) => {
		// debug('scan_file', file_name);
		if( (fs.existsSync(file_name)) && (VALID_FILE_TYPES.indexOf(path.extname(file_name))>-1)){
			let tags = [];
			let attrs = xattr.listSync(file_name);
			if(attrs.indexOf(namespace)>-1){
				tags = [].concat(xattr.getSync(file_name, namespace).toString('utf8').split(' ')).filter(Boolean).sort();
			}
			this.library_data[file_name] = {'tags':tags, 'shortname':shortname};
		}
		return true
	}

	/**restore a dict json to the current library*/
	restore_snapshot = async(filename) => {
		debug('restore_snapshot:', filename, typeof filename);
		if((filename!=undefined)&&(fs.existsSync(filename))&&(fs.lstatSync(filename).isFile())){
			let libObj = {};
			try{
				let snapshotData = fs.readFileSync(filename, 'utf8');
				let snapshotContents = JSON.parse(snapshotData);
				let libObj = snapshotContents.data;
				let libDir = this.library_dir;
				for(var item in libObj){
					let file = libDir+item.toString('utf8');
					let tags = [].concat(libObj[item].tags.toString('utf8').split(',')).filter(Boolean).sort();
					// debug('file:', file, typeof file, 'tags:', tags, typeof tags);
					if( (fs.existsSync(file)) && (fs.lstatSync(file).isFile()) ){
						xattr.setSync(file, namespace, tags.join(' '));
					}
				}
				return await this.scan_library()
			}
			catch(err){
				debug('snapshot load error:', err);
				return(err);
			}
		}
	}

	/**additively restore a dict json to the current library*/
	merge_snapshot = async(filename) => {
		debug('merge_snapshot:', filename, typeof filename);
		if((filename!=undefined)&&(fs.existsSync(filename))&&(fs.lstatSync(filename).isFile())){
			let libObj = {};
			try{
				let snapshotData = fs.readFileSync(filename, 'utf8');
				let snapshotContents = JSON.parse(snapshotData);
				let libObj = snapshotContents.data;
				let libDir = this.library_dir;
				for(var item in libObj){
					let file = libDir+item.toString('utf8');
					let tags = [].concat(libObj[item].tags.toString('utf8').split(',')).filter(Boolean).sort();
					let existing_tags = [];
					// debug('file:', file, typeof file, 'tags:', tags, typeof tags);
					if( (fs.existsSync(file)) && (fs.lstatSync(file).isFile()) ){
						let attrs = xattr.listSync(file);
						if(attrs.indexOf(namespace)>-1){
							let needs_update = false;
							existing_tags = [].concat(xattr.getSync(file, namespace).toString('utf8').split(' ')).filter(Boolean).sort();
							for(var i in tags){
								if(existing_tags.indexOf(tags[i])<0){
									// debug('found tag to add:', file, tags[i]);
									existing_tags.push(tags[i]);
									needs_update = true;
								}
							}
							if(needs_update){
								// debug('about to write:', existing_tags, needs_update);
								xattr.setSync(file, namespace, existing_tags.join(' '));
							}
						}
						else if(tags.length){
							xattr.setSync(file, namespace, tags.join(' '));
						}
					}
				}
				return await this.scan_library()  //.then( () => {
			}
			catch(err){
				debug('snapshot load error:', err);
				return(err);
			}
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

	/**set a files tags to a specific buffer*/
	set_tags = async (target_file, ...tags) => {
		// debug('apply_tag:', target_file, tags);
		if( (target_file!=undefined) &&
		 (tags.length>0) &&
		 (fs.existsSync(target_file)) &&
		 (fs.lstatSync(target_file).isFile()) &&
	   	 (VALID_FILE_TYPES.indexOf(path.extname(target_file))>-1) ) {
			let attrs = xattr.listSync(target_file);
			let tag_buf = [].concat(tags);
			xattr.setSync(target_file, namespace, tag_buf.join(' '));
			return true
		}
		return Promise.reject(new Error('invalid path or tag'));
	}

	/**apply tag(s) to the target file*/
	apply_tag = async (target_file, ...tags) => {
		debug('apply_tag:', target_file, tags);
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
			// debug('returning true...');
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

	//open
	open_preset = async(filepath) => {
		// debug('open_preset', filepath);
		return await open(filepath, {wait: true, app:LIVEAPP_PATH});
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

	set_block_updates = async(val) => {}

}

let script = new PresetTagger();
