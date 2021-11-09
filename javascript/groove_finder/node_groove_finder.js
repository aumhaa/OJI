//aumhaa 010320 aumhaa@gmail.com

const maxApi = require('max-api');
const fs = require('fs');
const util = require('util');
const path = require('path');
const stream = require('stream');
const xml2js = require('../node_dependencies/node_modules/xml2js');
const xmljs = require('../node_dependencies/node_modules/xml-js');
const zlib = require('zlib');

function arrayfromargs(){
	return Array.prototype.slice.call(arguments, 0);
}

function Debug(){
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


let inputFileDir = path.join(__dirname, 'Grooves');
let inputFileName = path.join(inputFileDir, 'Groove.agr');

let extractToDir = path.join(__dirname, 'unpacked');
let extractToFileName = path.join(extractToDir, 'Groove.xml');

const dictId = "GrooveLibrary";
const GrooveLibrary = maxApi.getDict(dictId);

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

const unpack_notes = (obj) => {
	var new_notes = [];
	//debug("notes is:", obj, typeof obj);
	if(typeof obj == "object"){
		for(var mNEvent in obj){
			for(var num in obj[mNEvent]){
				if(obj[mNEvent][num]._attributes.IsEnabled=='true'){
					new_notes.push(obj[mNEvent][num]._attributes.Time);
				}
			}
		}
	}
	return new_notes;
}

const unpack_velocities = (obj) => {
	var new_velocities = [];
	//debug("notes is:", obj, typeof obj);
	if(typeof obj == "object"){
		for(var mNEvent in obj){
			for(var num in obj[mNEvent]){
				if(obj[mNEvent][num]._attributes.IsEnabled=='true'){
					new_velocities.push(obj[mNEvent][num]._attributes.Velocity);
				}
			}
		}
	}
	return new_velocities;
}

class NodeGrooveFinderModule {
  constructor() {
    let self = this;
		this._name = 'NodeGrooveFinderModule';
	}

	init_from_js = async() => {
		debug('init_from_js', this._name);
		// this.parse_files().then((res)=>{
		// 	debug('success:', JSON.stringify(res));
		// 	return res
		// }).catch((e)=>{
		// 	debug('failure:', e);
		// 	return e
		// })
		return await this.parse_files();
		// return true;
	}

	unpack_file =  async() => {
		const readstream = fs.createReadStream(inputFileName);
		const writeStream = fs.createWriteStream(extractToFileName);
		//const Unzip = zlib.createGunzip();
		readstream.pipe(zlib.createGunzip()).pipe(writeStream);
	}

	unpack_files =  async() => {
		const directoryFiles = fs.readdirSync(inputFileDir);
		directoryFiles.forEach(filename => {
			//debug('filename:', filename);
			//debug('ext:', filename.slice(-3));
			if(filename.slice(-4)=='.agr'){
			  const readstream = fs.createReadStream(path.join(inputFileDir, filename));
			  const writeStream = fs.createWriteStream(path.join(extractToDir, (filename.slice(0,-3) + 'xml')));
				try{
			  	readstream.pipe(zlib.createGunzip()).pipe(writeStream);
				}
				catch(err){
					debug('error:', err, filename);
				}
			}
		});
	}

	// parse_files =  async()  =>{
	// 	parse_files().then((res)=>{
	// 		return res
	// 	}).catch((e)=>{
	// 		return e
	// 	})
	// }

	parse_files = async() => {
		let unpackedFiles = fs.readdirSync(extractToDir);
		let GLib = {};

		unpackedFiles.forEach(filename => {
			if(filename.slice(-4)=='.xml'){
				var newData = fs.readFileSync(path.join(extractToDir, filename), 'utf8');
				var result = xmljs.xml2json(newData, {compact: true, spaces: 3});
				var obj = JSON.parse(result);
				// debug(util.inspect(obj, false, null));
				var clip_name = obj.Ableton.Groove.Clip.Value.MidiClip.Name._attributes.Value;
				var loop_start = obj.Ableton.Groove.Clip.Value.MidiClip.Loop.LoopStart._attributes.Value;
				var loop_end = obj.Ableton.Groove.Clip.Value.MidiClip.Loop.LoopEnd._attributes.Value;
				var start_relative = obj.Ableton.Groove.Clip.Value.MidiClip.Loop.StartRelative._attributes.Value;
				var loop_on = obj.Ableton.Groove.Clip.Value.MidiClip.Loop.LoopOn._attributes.Value;
				var out_marker = obj.Ableton.Groove.Clip.Value.MidiClip.Loop.OutMarker._attributes.Value;
				var hidden_loop_start = obj.Ableton.Groove.Clip.Value.MidiClip.Loop.HiddenLoopStart._attributes.Value;
				var hidden_loop_end = obj.Ableton.Groove.Clip.Value.MidiClip.Loop.HiddenLoopEnd._attributes.Value;
				//var time_signature_numerator = obj.Ableton.Groove.Clip.Value.MidiClip.TimeSignature.TimeSignatures.RemotableTimeSignature.Numerator._attributes.Value;
				//var time_signature_denomiator = obj.Ableton.Groove.Clip.Value.MidiClip.TimeSignature.TimeSignatures.RemotableTimeSignature.Denominator._attributes.Value;
				//var time_signature_time = obj.Ableton.Groove.Clip.Value.MidiClip.TimeSignature.TimeSignatures.RemotableTimeSignature.Time._attributes.Value;
				try{
					var notes = obj.Ableton.Groove.Clip.Value.MidiClip.Notes.KeyTracks.KeyTrack.Notes;
				}
				catch(err){
					debug(filename, err);
					return false;
				}
				//debug(clip_name, loop_start, loop_end, start_relative, loop_on, out_marker, hidden_loop_start, hidden_loop_end); //time_signature_numerator, time_signature_denomiator, time_signature_time);
				var unpacked_notes = unpack_notes(notes);
				var unpacked_velocities = unpack_velocities(notes);
				// debug(unpacked_notes);
				// debug(unpacked_velocities);
				GLib[filename] = {notes:unpacked_notes, velocities:unpacked_velocities};
			}
		});
		// maxApi.setDict(dictId, GLib);
		const ret = await maxApi.setDict(dictId, GLib);
		//maxApi.outlet('js', 'update_library');
		debug('returning now...');
		return ret;
	}

	set_inputFileName = async(newInputFileName) => {
		inputFileName = newInputFileName;
		debug('newInputFileName:', newInputFileName);
		return true
	}
}

let script = new NodeGrooveFinderModule();


// const parse_files = async() => {
// 	let unpackedFiles = fs.readdirSync(extractToDir);
// 	let GLib = {};
//
// 	unpackedFiles.forEach(filename => {
// 		if(filename.slice(-4)=='.xml'){
// 			var newData = fs.readFileSync(path.join(extractToDir, filename), 'utf8');
// 			var result = xmljs.xml2json(newData, {compact: true, spaces: 3});
// 			var obj = JSON.parse(result);
// 			// debug(util.inspect(obj, false, null));
// 			var clip_name = obj.Ableton.Groove.Clip.Value.MidiClip.Name._attributes.Value;
// 			var loop_start = obj.Ableton.Groove.Clip.Value.MidiClip.Loop.LoopStart._attributes.Value;
// 			var loop_end = obj.Ableton.Groove.Clip.Value.MidiClip.Loop.LoopEnd._attributes.Value;
// 			var start_relative = obj.Ableton.Groove.Clip.Value.MidiClip.Loop.StartRelative._attributes.Value;
// 			var loop_on = obj.Ableton.Groove.Clip.Value.MidiClip.Loop.LoopOn._attributes.Value;
// 			var out_marker = obj.Ableton.Groove.Clip.Value.MidiClip.Loop.OutMarker._attributes.Value;
// 			var hidden_loop_start = obj.Ableton.Groove.Clip.Value.MidiClip.Loop.HiddenLoopStart._attributes.Value;
// 			var hidden_loop_end = obj.Ableton.Groove.Clip.Value.MidiClip.Loop.HiddenLoopEnd._attributes.Value;
// 			//var time_signature_numerator = obj.Ableton.Groove.Clip.Value.MidiClip.TimeSignature.TimeSignatures.RemotableTimeSignature.Numerator._attributes.Value;
// 			//var time_signature_denomiator = obj.Ableton.Groove.Clip.Value.MidiClip.TimeSignature.TimeSignatures.RemotableTimeSignature.Denominator._attributes.Value;
// 			//var time_signature_time = obj.Ableton.Groove.Clip.Value.MidiClip.TimeSignature.TimeSignatures.RemotableTimeSignature.Time._attributes.Value;
// 			try{
// 				var notes = obj.Ableton.Groove.Clip.Value.MidiClip.Notes.KeyTracks.KeyTrack.Notes;
// 			}
// 			catch(err){
// 				debug(filename, err);
// 				return false;
// 			}
// 			//debug(clip_name, loop_start, loop_end, start_relative, loop_on, out_marker, hidden_loop_start, hidden_loop_end); //time_signature_numerator, time_signature_denomiator, time_signature_time);
// 			var unpacked_notes = unpack_notes(notes);
// 			var unpacked_velocities = unpack_velocities(notes);
// 			// debug(unpacked_notes);
// 			// debug(unpacked_velocities);
// 			GLib[filename] = {notes:unpacked_notes, velocities:unpacked_velocities};
// 		}
// 	});
// 	// maxApi.setDict(dictId, GLib);
// 	const ret = await maxApi.setDict(dictId, GLib);
// 	//maxApi.outlet('js', 'update_library');
// 	debug('returning now...');
// 	return ret;
// }
