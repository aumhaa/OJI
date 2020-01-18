//aumhaa 010320 aumhaa@gmail.com

const maxApi = require('max-api');
const fs = require('fs');
const path = require('path');
const util = require('util');
const xattr = require('fs-xattr');
const open = require('open');
const xmljs = require('xml-js');


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
const DEBUG = true;
const debug = DEBUG&&Debug?Debug:function(){}

const VALID_FILE_TYPES = ['.aupreset', '.adg', '.adv'];
const namespace = 'com.aumhaa.Tag';
let library_dir = undefined;
let selected_file = undefined;
let selected_tag = [];
let library_data = {};
let prefFile_path = 'preferences.xml';


const libraryDictId = "library";
try {
  const libraryDict = maxApi.getDict(libraryDictId);
	debug('dict init handled');
}
catch (err) {
	debug('dict init error', err);
}

const init_prefs = async () => {
	try{
		let newData = fs.readFileSync(prefFile_path, 'utf8');
		let result = xmljs.xml2json(newData, {compact: true, spaces: 3});
		let obj = JSON.parse(result);
		debug('all done here...', obj.preferences.path._text);
		//debug(util.inspect(obj, false, null));
		set_library(obj.preferences.path._text);
	}
	catch (err){
		debug('prefFile readstream creation error', err);
	}
}


maxApi.addHandler('select_file', async(file) => {
	//var new_file = file.split("Tome:").pop();
	if( (fs.existsSync(file)) && (fs.lstatSync(file).isFile()) ){
		//debug('select_file', file);
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
	if( (fs.existsSync(selected_file)) && (fs.lstatSync(selected_file).isFile()) && (selected_tag!=undefined)){
		let attrs = xattr.listSync(selected_file);
		let tag_buf = selected_tag;
		debug('set_tag', selected_file, tag_buf);
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
		scan_library();
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
		scan_library();
	}
});

maxApi.addHandler('clear_tags', async() => {
	//debug('clear_tags');
	if( (fs.existsSync(selected_file)) && (fs.lstatSync(selected_file).isFile()) && (xattr.listSync(selected_file).indexOf(namespace)>-1)){
		xattr.removeSync(selected_file, namespace);
	}
	scan_library();
});

maxApi.addHandler('select_library', async(dir) => {
	debug('select_library', dir);
	if(dir){
		dir = dir.split(':').pop();
		set_library(dir);
	}
});

const set_library = async(dir) => {
	debug('set_library', dir);
	if( (fs.existsSync(dir)) && (fs.lstatSync(dir).isDirectory()) ){
		library_dir = dir;
		scan_library();
	}
}

maxApi.addHandler('scan_library', async() => {
	debug('scan_library');
	scan_library();
});

maxApi.addHandler('set_global_path', async() => {
	debug('set_global_path');
	if( (fs.existsSync(library_dir)) && (fs.lstatSync(library_dir).isDirectory()) ){
		let newData = fs.readFileSync(prefFile_path, 'utf8');
		let result = xmljs.xml2json(newData, {compact: true, spaces: 3});
		let obj = JSON.parse(result);
		obj.preferences.path._text = library_dir;
		let newFile = xmljs.js2xml(obj, {compact: true, spaces: 3});
		fs.writeFile('preferences.xml', newFile, function(err, data) {
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

function scan_library(){
	library_data = {};
	setDict(libraryDictId, library_data);
	maxApi.outlet('dictSet', 'clear');
	scan_folder(library_dir);
	setDict(libraryDictId, library_data);
	//maxApi.outlet('js', 'nodescript_running');
	maxApi.outlet('js', 'refresh_chooser');
}

function scan_folder(dir_name){
	//debug('scan_folder:', dir_name);
	let directoryFiles = fs.readdirSync(dir_name);
	//debug('dir files:', directoryFiles);
	directoryFiles.forEach(filename => {
		let file_path = path.join(dir_name, filename).toString();
		if( (fs.existsSync(file_path)) && (fs.lstatSync(file_path).isDirectory()) ){
			scan_folder(file_path);
		}
		else if( (fs.existsSync(file_path)) && (fs.lstatSync(file_path).isFile()) ){
			scan_file(file_path, filename);
		}
	})
}

function scan_file(file_name, shortname){
	//debug('scan_file', file_name);
	if( (fs.existsSync(file_name)) && (VALID_FILE_TYPES.indexOf(path.extname(file_name))>-1)){
		let tags = [];
		let attrs = xattr.listSync(file_name);
		if(attrs.indexOf(namespace)>-1){

			tags = xattr.getSync(file_name, namespace).toString('utf8');
			//debug('tags:', tags, shortname);
			if(tags.indexOf(' ')>-1){
				tags = tags.split(' ');
			}
			else{
				tags = [tags];
			}
		}
		library_data[file_name] = {'tags':tags, 'shortname':shortname};
	}
}

const updateDict = async (id, updatePath, updateValue) => {
	if (!id) throw makeError("Missing name for setDict request. Please make sure you provide a (valid) name.", ERROR_CODES.INVALID_PARAMETERS);
	if (!updatePath) throw makeError("Missing path value for updateDict request.", ERROR_CODES.INVALID_PARAMETERS);

	await maxApi.updateDict(id, updatePath, updateValue);
	//maxApi.outlet('js', 'refresh_chooser');
};

const setDict = async(id, value) => {
	await maxApi.setDict(id, value);
};


init_prefs();
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
