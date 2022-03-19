//aumhaa 010320 aumhaa@gmail.com

const maxApi = require('max-api');
const fs = require('fs');
const path = require('path');
const util = require('util');
const { exec } = require("child_process");
const open = require('../node_dependencies/node_modules/open');

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
		this.library_dir = '';
		this.watcher = {close: () => {} };
		this.library_base = '';
		this.update_task = undefined;
		this.block_updates = false;
		this.flush_task = undefined;
		this.file_update_queue = [];
		this.MAX_UPDATE_THRESH = 10;
	}

  /**set library dir, assign watcher */
	set_library = async(dir) => {
		debug('set_library_internal', dir);
		if( (fs.existsSync(dir)) && (fs.lstatSync(dir).isDirectory()) ){
			await this.watcher.close();
			this.watcher = await fs.watch(dir, {recursive:true}, this.on_file_changed);
			return Promise.resolve('watcher installed');
		}
		return Promise.reject(new Error('invalid library path: ' + dir))
	}

	on_file_changed = (event, filename) => {
		// debug('on_file_changed');
		maxApi.outlet.apply(maxApi, ['js', 'on_specific_file_changed', filename]);
	}

	//open
	open_preset = async(filepath) => {
		debug('open_preset', filepath);
		return await open(filepath, {wait: true, app:LIVEAPP_PATH});
	}

	//reveal
	reveal_preset = async(filepath) => {
		// debug('reveal_preset', filepath);
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
