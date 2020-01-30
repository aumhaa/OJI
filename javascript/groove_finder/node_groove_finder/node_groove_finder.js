//aumhaa 010320 aumhaa@gmail.com

const maxApi = require('max-api');
const fs = require('fs');
const zlib = require('zlib');
const path = require('path');
const stream = require('stream');
const util = require('util');
const xml2js = require('xml2js');
const xmljs = require('xml-js');

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

maxApi.addHandler('init_from_js', async() => {
	parse_files();
})

maxApi.addHandler('unpack_file', async() => {
		const readstream = fs.createReadStream(inputFileName);
		const writeStream = fs.createWriteStream(extractToFileName);
		//const Unzip = zlib.createGunzip();
		readstream.pipe(zlib.createGunzip()).pipe(writeStream);
})

maxApi.addHandler('unpack_files', async() => {

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
})

maxApi.addHandler('parse_files', () => {
	parse_files();
})

maxApi.addHandler('set_inputFileName', async(newInputFileName) => {
	inputFileName = newInputFileName;
	debug('newInputFileName:', newInputFileName);
})

const parse_files = () => {
	let unpackedFiles = fs.readdirSync(extractToDir);
	let GLib = {};

	unpackedFiles.forEach(filename => {
		if(filename.slice(-4)=='.xml'){
			var newData = fs.readFileSync(path.join(extractToDir, filename), 'utf8');
			var result = xmljs.xml2json(newData, {compact: true, spaces: 3});
			var obj = JSON.parse(result);
			//debug(util.inspect(obj, false, null));
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
				debug(err);
			}
			//debug(clip_name, loop_start, loop_end, start_relative, loop_on, out_marker, hidden_loop_start, hidden_loop_end); //time_signature_numerator, time_signature_denomiator, time_signature_time);
			var unpacked_notes = unpack_notes(notes);
			var unpacked_velocities = unpack_velocities(notes);
			// debug(unpacked_notes);
			// debug(unpacked_velocities);
			GLib[filename] = {notes:unpacked_notes, velocities:unpacked_velocities};
		}
	});
	maxApi.setDict(dictId, GLib);
	maxApi.outlet('js', 'update_library');
}

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

maxApi.outlet('js', 'nodescript_running');
