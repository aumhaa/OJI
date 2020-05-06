//aumhaa 010320 aumhaa@gmail.com

const maxApi = require('max-api');
const fs = require('fs');
const path = require('path');
const util = require('util');
const xattr = require('../node_dependencies/node_modules/fs-xattr');
const open = require('../node_dependencies/node_modules/open');
const xmljs = require('../node_dependencies/node_modules/xml-js');

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
	//args = args.join(' ');
	maxApi.post(args + '\n');
}
const DEBUG = false;
const debug = DEBUG&&Debug?Debug:function(){}

const VALID_FILE_TYPES = ['.aupreset', '.adg', '.adv', '.wav', '.aif'];
const namespace = 'com.aumhaa.Tag';
var library_dir = '';
var selected_file = undefined;
var selected_tag = [];
var library_data = {};
var file_tree = {};
let watcher = {close: () => {} };
const prefFile_prefix = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + "/.local/share");
const prefFile_path = prefFile_prefix + '/com.aumhaa.preset_tagger_preferences.json';
const default_prefs = {preferences:{path:''}};

let libraryDictId = "library";
try {
  let libraryDict = maxApi.getDict(libraryDictId);
	//debug('library dict init handled');
}
catch (err) {
	debug('library dict init error', err);
}

let filetreeDictId = "filetree";
try {
  let filetreeDict = maxApi.getDict(filetreeDictId);
}
catch (err) {
	debug('filetree dict init error', err);
}

const init_prefs = async () => {
	debug('prefFile_path:', prefFile_path);
	let obj = default_prefs;
	try{
		if( (fs.existsSync(prefFile_path)) && (fs.lstatSync(prefFile_path).isFile()) ){
			let newData = fs.readFileSync(prefFile_path, 'utf8');
			obj = JSON.parse(newData);
		}
		else{
			let newFile = JSON.stringify(default_prefs, null, 3);
			fs.writeFile(prefFile_path, newFile, function(err, data) {
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
	}
}

const writeFileTree = async () => {
	let newData = fs.readFileSync(prefFile_path);
	//let result = xmljs.xml2json(newData, {compact: true, spaces: 3});
	let obj = JSON.parse(newData);
	obj.preferences.fileTree = file_tree;
	//let newFile = xmljs.js2xml(obj, {compact: true, spaces: 3});
	let newFile = JSON.stringify(obj, null, 3);
	fs.writeFile(prefFile_path, newFile, function(err, data) {
		if (err) {
			debug(err);
		}
		else{
			debug('FileTree written!');
		}
	});
}


maxApi.addHandler('select_file', async(file) => {
	//var new_file = file.split("Tome:").pop();
	if( (fs.existsSync(file)) && (fs.lstatSync(file).isFile()) ){
		debug('select_file', file);
		selected_file = file;
	}
});

maxApi.addHandler('select_tag', async(...args) => {
	debug('select_tag', args);
	selected_tag = [].concat(args);
});

maxApi.addHandler('list_tags', async() => {
	debug('list_tags', selected_file);
	if(selected_file!=undefined){
		var attrs = xattr.listSync(selected_file);
		if(attrs.indexOf(namespace)>-1){
			var tags = xattr.getSync(selected_file, namespace);
			//debug('tags:', tags);
		}
		else{
			debug('attr namespace doesn\'t exist at selected path');
		}
	}
});

maxApi.addHandler('set_tag', async(tag) => {
	//debug('set_tag');
	if( (fs.existsSync(selected_file)) && (fs.lstatSync(selected_file).isFile()) && (selected_tag!=undefined)){
		let attrs = xattr.listSync(selected_file);
		let tag_buf = selected_tag;
		//debug('set_tag', selected_file, tag_buf);
		if(attrs.indexOf(namespace)==-1){
			xattr.setSync(selected_file, namespace, tag_buf.join(' '));
		}
		else{
			let tags = xattr.getSync(selected_file, namespace).toString();
			let sep_tags = [].concat(tags.split(' '));
			let new_tags = [];
			for(var i in tag_buf){
				if(sep_tags.indexOf(tag_buf[i])==-1){
					new_tags.push(tag_buf[i]);
				}
			}
			new_tags = sep_tags.concat(new_tags).join(' ');
			xattr.setSync(selected_file, namespace, new_tags);
		}
		// scan_library();
		// maxApi.outlet('js', 'refresh_chooser');
	}
});

maxApi.addHandler('remove_tag', async(tag) => {
	if( (fs.existsSync(selected_file)) && (fs.lstatSync(selected_file).isFile()) ){
		let tag_buf = selected_tag;
		//debug('remove_tag', tag);
		let attrs = xattr.listSync(selected_file);
		if(attrs.indexOf(namespace)>-1){
			let tags = xattr.getSync(selected_file, namespace).toString();
			let sep_tags = [].concat(tags.split(' '));
			let new_tags = [];
			for(var i in sep_tags){
				var index = tag_buf.indexOf(sep_tags[i]);
				if(index==-1){
					new_tags.push(sep_tags[i]);
				}
			}
			new_tags = new_tags.join(' ');
			xattr.setSync(selected_file, namespace, new_tags);
		}
		// scan_library();
		// maxApi.outlet('js', 'refresh_chooser');
	}
});

maxApi.addHandler('clear_tags', async() => {
	//debug('clear_tags');
	if( (fs.existsSync(selected_file)) && (fs.lstatSync(selected_file).isFile()) && (xattr.listSync(selected_file).indexOf(namespace)>-1)){
		xattr.removeSync(selected_file, namespace);
		// scan_library();
	 	// maxApi.outlet('js', 'refresh_chooser');
	}
});

maxApi.addHandler('set_folder_tags', async(dir_name) => {
	if( (fs.existsSync(dir_name)) && (fs.lstatSync(dir_name).isDirectory()) && (selected_tag!=undefined)){
		let directoryFiles = fs.readdirSync(dir_name);
		directoryFiles.forEach(filename => {
			let file_path = path.join(dir_name, filename).toString();
			if( (fs.existsSync(file_path)) && (fs.lstatSync(file_path).isFile()) ){
				let attrs = xattr.listSync(file_path);
				let tag_buf = selected_tag;
				//debug('set_folder_tags', file_path, tag_buf);
				if(attrs.indexOf(namespace)==-1){
					xattr.setSync(file_path, namespace, tag_buf.join(' '));
				}
				else{
					let tags = xattr.getSync(file_path, namespace).toString();
					let sep_tags = [].concat(tags.split(' '));
					let new_tags = [];
					for(var i in tag_buf){
						if(sep_tags.indexOf(tag_buf[i])==-1){
							new_tags.push(tag_buf[i]);
						}
					}
					new_tags = sep_tags.concat(new_tags).join(' ');
					xattr.setSync(file_path, namespace, new_tags);
				}
			}
		})
		// scan_library();
	 	// maxApi.outlet('js', 'refresh_chooser');
	}
});

maxApi.addHandler('remove_folder_tags', async(dir_name) => {
	if( (fs.existsSync(dir_name)) && (fs.lstatSync(dir_name).isDirectory()) && (selected_tag!=undefined)){
		let directoryFiles = fs.readdirSync(dir_name);
		directoryFiles.forEach(filename => {
			let file_path = path.join(dir_name, filename).toString();
			if( (fs.existsSync(file_path)) && (fs.lstatSync(file_path).isFile()) ){
				let tag_buf = selected_tag;
				//debug('remove_tag', tag);
				let attrs = xattr.listSync(file_path);
				if(attrs.indexOf(namespace)>-1){
					let tags = xattr.getSync(file_path, namespace).toString();
					let sep_tags = [].concat(tags.split(' '));
					let new_tags = [];
					for(var i in sep_tags){
						var index = tag_buf.indexOf(sep_tags[i]);
						if(index==-1){
							new_tags.push(sep_tags[i]);
						}
					}
					new_tags = new_tags.join(' ');
					xattr.setSync(file_path, namespace, new_tags);
				}
			}
		})
		// scan_library();
	 	// maxApi.outlet('js', 'refresh_chooser');
	}
});

maxApi.addHandler('clear_folder_tags', async(dir_name) => {
	//debug('clear_tags');

	if( (fs.existsSync(dir_name)) && (fs.lstatSync(dir_name).isDirectory()) && (selected_tag!=undefined)){
		let directoryFiles = fs.readdirSync(dir_name);
		directoryFiles.forEach(filename => {
			let file_path = path.join(dir_name, filename).toString();
			if( (fs.existsSync(file_path)) && (fs.lstatSync(file_path).isFile()) && (xattr.listSync(file_path).indexOf(namespace)>-1)){
				xattr.removeSync(file_path, namespace);
			}
		})
		// scan_library();
	 	// maxApi.outlet('js', 'refresh_chooser');
	}
});

maxApi.addHandler('select_library', async(dir) => {
	debug('select_library', dir);
	if(dir){
		//dir = dir.split(':').pop();
		set_library(dir);
	}
});

maxApi.addHandler('scan_library', async() => {
	debug('scan_library');
	scan_library().then(maxApi.outlet('js', 'library_updated'));
});

maxApi.addHandler('set_global_path', async() => {
	debug('set_global_path');
	if( (fs.existsSync(library_dir)) && (fs.lstatSync(library_dir).isDirectory()) ){
		let newData = fs.readFileSync(prefFile_path);
		let obj = JSON.parse(newData);
		obj.preferences.path = library_dir;
		let newFile = JSON.stringify(obj, null, 3);
		fs.writeFile(prefFile_path, newFile, function(err, data) {
			if (err) {
				debug(err);
			}
			else{
				debug('written!');
			}
		});
	}
});

maxApi.addHandler('open_preset', async(filepath) => {
	debug('open_preset', filepath);
	await open(filepath, {wait: true, app:'/Applications/Ableton Live 10 Suite.app'});
});

maxApi.addHandler('init_from_js', async(filepath) => {
	debug('init_from_js');
	var errors = resolve_library_path();
	if(errors.length){
		maxApi.outlet('js', 'node_script_not_initialized', errors.toString());
	}
	else{
		maxApi.outlet('js', 'node_script_initialized', library_dir);
	}
});

maxApi.addHandler('restore_snapshot', async(filename) =>{
	restore_snapshot(filename);
});

const resolve_library_path = async() => {
	let errors = [];
	try {
	  const libraryDict = maxApi.getDict(libraryDictId);
	}
	catch (err) {
		debug('library dict init error', err);
		errors.push(err.message.toString());
	}
	try {
	  const filetreeDict = await maxApi.getDict(filetreeDictId);
	}
	catch (err) {
		debug('filetree dict init error', err);
		errors.push(err.message.toString());
	}
	// debug('prefFile_path:', prefFile_path);
	try{
		let obj = default_prefs;
		if( (fs.existsSync(prefFile_path)) && (fs.lstatSync(prefFile_path).isFile()) ){
			let newData = fs.readFileSync(prefFile_path, 'utf8');
			obj = JSON.parse(newData);
		}
		else{
			let newFile = JSON.stringify(default_prefs, null, 3);
			fs.writeFile(prefFile_path, newFile, function(err, data) {
				if (err) {debug(err);}
				else{debug('default preferences written!');}
			});
		}
		if( (fs.existsSync(obj.preferences.path)) && (fs.lstatSync(obj.preferences.path).isDirectory()) ){
			set_library_internal(obj.preferences.path);
		}
	}
	catch (err){
		debug('prefFile readstream creation error ', err);
		errors.push(err.message.toString());
	}
	return errors;
}

const set_library_internal = async(dir) => {
	debug('set_library_internal', dir);
	watcher.close();
	if( (fs.existsSync(dir)) && (fs.lstatSync(dir).isDirectory()) ){
		library_dir = dir;
		library_base = dir.split(path.basename(dir))[0];
		//debug('library_base:', library_base);
		scan_library();
		watcher = await fs.watch(dir, {recursive:true}, on_file_changed);
		// debug('installed fs.watch', watcher);
	}
}

const on_file_changed = (event, file_name) => {
	debug('on_file_changed:', event, file_name);
	let file_path = path.join(library_dir, file_name).toString();
	if( ((fs.existsSync(file_path)) && (VALID_FILE_TYPES.indexOf(path.extname(file_path))>-1)) || (event == 'rename') ){
		debug('scanning...');
		scan_library().then(maxApi.outlet('js', 'library_updated'));
	}
}

const set_library = async(dir) => {
	debug('set_library', dir);
	set_library_internal(dir);
	maxApi.outlet('js', 'library_updated');
}

const scan_library = async () => {
	if( (fs.existsSync(library_dir)) && (fs.lstatSync(library_dir).isDirectory()) ){
		library_data = {};
		setDict(libraryDictId, library_data);
		file_tree = {name:'root',
							root:path.basename(library_dir),
							root_path:library_dir,
							parents:[],
							parent: library_dir.replace(path.basename(library_dir)+'/', ''),
							children:{}};
		scan_folder(library_dir, file_tree);
		setDict(libraryDictId, library_data);
		setDict(filetreeDictId, file_tree);
	}
}

const scan_folder = (dir_name, filetree_node) => {
	// debug('scan_folder:', dir_name, typeof filetree_node);
	// debug('name:', filetree_node.name);
	let directoryFiles = fs.readdirSync(dir_name);
	let shortname = path.basename(dir_name);
	filetree_node.children[shortname] = {name: shortname,
															path: dir_name,
															type:dir_name == library_dir ? 'root':'folder',
															parents: dir_name == library_dir ? [] : dir_name.replace(library_base, '').replace(shortname, '').split('/').slice(0, -1),
															parent:dir_name.split(shortname)[0],
															children:{}};
	directoryFiles.forEach(filename => {
		let file_path = path.join(dir_name, filename).toString();
		if( (fs.existsSync(file_path)) && (fs.lstatSync(file_path).isDirectory()) ){
			scan_folder(file_path, filetree_node.children[shortname]);
		}
		else if( (fs.existsSync(file_path)) && (fs.lstatSync(file_path).isFile()) ){
			scan_file(file_path, filename, filetree_node.children[shortname]);
		}
	})
}

const scan_file = (file_name, shortname, filetree_node) => {
	//debug('scan_file', file_name);
	if( (fs.existsSync(file_name)) && (VALID_FILE_TYPES.indexOf(path.extname(file_name))>-1)){
		let tags = [];
		let attrs = xattr.listSync(file_name);
		if(attrs.indexOf(namespace)>-1){
			tags = [].concat(xattr.getSync(file_name, namespace).toString('utf8').split(' '));
		}
		library_data[file_name] = {'tags':tags, 'shortname':shortname};
		filetree_node.children[shortname] = {name:shortname,
															path:file_name, type:'file',
															parent:file_name.split(shortname)[0],
															parents: file_name.replace(library_base, '').replace(shortname, '').split('/').slice(0, -1),
															tags: tags};
	}
	// return filetree_node
}

const updateDict = async (id, updatePath, updateValue) => {
	if (!id) throw makeError("Missing name for setDict request. Please make sure you provide a (valid) name.", ERROR_CODES.INVALID_PARAMETERS);
	if (!updatePath) throw makeError("Missing path value for updateDict request.", ERROR_CODES.INVALID_PARAMETERS);

	await maxApi.updateDict(id, updatePath, updateValue);
	//maxApi.outlet('js', 'refresh_chooser');
}

const setDict = async(id, value) => {
	await maxApi.setDict(id, value);
}

const restore_snapshot = async(filename) => {
	debug('restore_snapshot:', filename);
	if((filename!=undefined)&&(fs.existsSync(filename))&&(fs.lstatSync(filename).isFile())){
		debug('here');
		let libObj = {};
		try{
			let snapshotData = fs.readFileSync(filename, 'utf8');
			libObj = JSON.parse(snapshotData);
			debug(libObj);
			for(var i in libObj){
				debug('item', i);
			}
		}
		catch(err){
			debug('snapshot load error:', err);
		}
		//maxApi.setDict(libraryDictId, libObj);
		//libraryDict = maxApi.getDict(libraryDictId);
		for(var item in libObj){
			let file = item;
			let tags = libObj[item].tags.join(' ').toString();
			debug('file:', file, 'tags:', tags);
			if( (fs.existsSync(file)) && (fs.lstatSync(file).isFile()) ){
				xattr.setSync(file, namespace, tags);
			}
		}
		scan_library();
		maxApi.outlet('js', 'refresh_chooser');
	}
}

const refresh_chooser = (val) => {
	debug('node refresh_chooser...', val);
	maxApi.outlet('js', 'refresh_chooser');
}


maxApi.outlet('js', 'nodescript_running');



// const updateDict = async (id, updatePath, updateValue) => {
// 	if (!id) throw makeError("Missing name for setDict request. Please make sure you provide a (valid) name.", ERROR_CODES.INVALID_PARAMETERS);
// 	if (!updatePath) throw makeError("Missing path value for updateDict request.", ERROR_CODES.INVALID_PARAMETERS);
//
// 	const dict = await maxApi.getDict(id);
// 	const newDict = loSet(dict, updatePath, updateValue);
// 	await maxApi.setDict(id, newDict);
//
// 	return newDict;
// };


// const scan_root = async (dir_name, filetree) => {
// 	let directoryFiles = fs.readdirSync(dir_name);
// 	let shortname = path.basename(dir_name);
// 	filetree.name = shortname;
// 	filetree.path = dir_name;
// 	filetree.type = 'root',
// 	// filetree.parents = dir_name.replace(library_base, '').replace(shortname, '').split('/').slice(0, -1),
// 	filetree.parents = [];
// 	filetree.parent = dir_name.split(shortname)[0],
// 	filetree.children = {};
// 	directoryFiles.forEach(filename => {
// 		let file_path = path.join(dir_name, filename).toString();
// 		if( (fs.existsSync(file_path)) && (fs.lstatSync(file_path).isDirectory()) ){
// 			scan_folder(file_path, filetree);
// 		}
// 		else if( (fs.existsSync(file_path)) && (fs.lstatSync(file_path).isFile()) ){
// 			scan_file(file_path, filename, filetree);
// 		}
// 	})
// }
