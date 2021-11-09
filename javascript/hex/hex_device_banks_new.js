var SENDS_PAGE = [
	'ModDevice_Channel',
	'ModDevice_Groove',
	'ModDevice_Random',
	'ModDevice_BaseGross',
	'Mod_Chain_Send_0',
	'Mod_Chain_Send_1',
	'Mod_Chain_Send_2',
	'Mod_Chain_Send_3'
];

var HEX_SPEED_1 = [
	'ModDevice_Speed1',
	'ModDevice_Speed2',
	'ModDevice_Speed3',
	'ModDevice_Speed4',
	'ModDevice_Speed5',
	'ModDevice_Speed6',
	'ModDevice_Speed7',
	'ModDevice_Speed8',
];

var HEX_SPEED_2 = [
	'ModDevice_Speed9',
	'ModDevice_Speed10',
	'ModDevice_Speed11',
	'ModDevice_Speed12',
	'ModDevice_Speed13',
	'ModDevice_Speed14',
	'ModDevice_Speed15',
	'ModDevice_Speed16',
];

var SETTINGS_PAGE = [
	'ModDevice_BaseGross',
	'ModDevice_BaseFine',
	'ModDevice_SpeedGross',
	'ModDevice_SpeedFine',
	'ModDevice_Channel',
	'ModDevice_Mode',
	'ModDevice_PolyOffset',
	'None'
];

var INSTRUMENT_GROUP_DEVICE = [
	'Macro 1',
	'Macro 2',
	'Macro 3',
	'Macro 4',
	'Macro 5',
	'Macro 6',
	'ModDevice_SpeedGross',
	'Mod_Chain_Vol'
];

var DRUM_GROUP_DEVICE = [
	'Macro 1',
	'Macro 2',
	'Macro 3',
	'Macro 4',
	'Macro 5',
	'Macro 6',
	'ModDevice_SpeedGross',
	'Mod_Chain_Vol'
];

var MIDI_EFFECT_GROUP_DEVICE = [
	'Macro 1',
	'Macro 2',
	'Macro 3',
	'Macro 4',
	'Macro 5',
	'Macro 6',
	'ModDevice_SpeedGross',
	'Mod_Chain_Vol'
];

var OTHER = [
	'None',
	'None',
	'None',
	'None',
	'None',
	'None',
	'ModDevice_SpeedGross',
	'Mod_Chain_Vol'
];

var OPERATOR = [
	'Osc-A Level',
	'Osc-B Level',
	'Osc-C Level',
	'Osc-D Level',
	'Transpose',
	'Filter Freq',
	'ModDevice_SpeedGross',
	'Mod_Chain_Vol'
];

var ULTRA_ANALOG = [
	'AEG1 Attack',
	'AEG1 Decay',
	'AEG1 Sustain',
	'AEG1 Rel',
	'OSC1 Semi',
	'F1 Freq',
	'ModDevice_SpeedGross',
	'Mod_Chain_Vol'
];

var ORIGINAL_SIMPLER = [
	'Ve Attack',
	'Ve Decay',
	'Ve Sustain',
	'Ve Release',
	'Transpose',
	'Filter Freq',
	'ModDevice_SpeedGross',
	'Mod_Chain_Vol'
];

var MULTI_SAMPLER = [
	'Ve Attack',
	'Ve Decay',
	'Ve Sustain',
	'Ve Release',
	'Transpose',
	'Filter Freq',
	'ModDevice_SpeedGross',
	'Mod_Chain_Vol'
];

var LOUNGE_LIZARD = [
	'M Force',
	'F Release',
	'F Tone Decay',
	'F Tone Vol',
	'Semitone',
	'P Distance',
	'ModDevice_SpeedGross',
	'Mod_Chain_Vol'
];

var STRING_STUDIO = [
	'E Pos',
	'Exc ForceMassProt',
	'Exc FricStiff',
	'Exc Velocity',
	'Semitone',
	'Filter Freq',
	'ModDevice_SpeedGross',
	'Mod_Chain_Vol'
];

var COLLISION = [
	'Noise Attack',
	'Noise Decay',
	'Noise Sustain',
	'Noise Release',
	'Res 1 Tune',
	'Res 1 Brightness',
	'ModDevice_SpeedGross',
	'Mod_Chain_Vol'
];

var INSTRUMENT_IMPULSE = [
	'1 Start',
	'1 Envelope Decay',
	'1 Stretch Factor',
	'Global Time',
	'Global Transpose',
	'1 Filter Freq',
	'ModDevice_SpeedGross',
	'Mod_Chain_Vol'
];

var NO_DEVICE = [
	'None',
	'None',
	'None',
	'None',
	'None',
	'None',
	'None',
	'None'
];

function make_page(type, first, second){
	var bank = [];
	switch(type){
		case 'single':
			first[4] = 'ModDevice_PolyOffset';
			first[5] = 'ModDevice_Mode';
			bank = first.concat(second);
			break;
		case 'multi':
			first[5] = 'ModDevice_Channel';
			bank = first.concat(second);
			break;
		case 'speed':
			bank = first.concat(second);
			break;
	};
	return bank;
};

var HEX_BANKS = {
	'InstrumentGroupDevice':[
		make_page('single', INSTRUMENT_GROUP_DEVICE, SENDS_PAGE),
		make_page('multi', INSTRUMENT_GROUP_DEVICE, SENDS_PAGE),
		make_page('speed', HEX_SPEED_1, SENDS_PAGE),
		make_page('speed', HEX_SPEED_2, SENDS_PAGE),
		make_page('single', INSTRUMENT_GROUP_DEVICE, SETTINGS_PAGE),
		make_page('multi', INSTRUMENT_GROUP_DEVICE, SETTINGS_PAGE)
	],
	'DrumGroupDevice':[
		make_page('single', DRUM_GROUP_DEVICE, SENDS_PAGE),
		make_page('multi', DRUM_GROUP_DEVICE, SENDS_PAGE),
		make_page('speed', HEX_SPEED_1, SENDS_PAGE),
		make_page('speed', HEX_SPEED_2, SENDS_PAGE),
		make_page('single', DRUM_GROUP_DEVICE, SETTINGS_PAGE),
		make_page('multi', DRUM_GROUP_DEVICE, SETTINGS_PAGE)
	],
	'MidiEffectGroupDevice':[
		make_page('single', MIDI_EFFECT_GROUP_DEVICE, SENDS_PAGE),
		make_page('multi', MIDI_EFFECT_GROUP_DEVICE, SENDS_PAGE),
		make_page('speed', HEX_SPEED_1, SENDS_PAGE),
		make_page('speed', HEX_SPEED_2, SENDS_PAGE),
		make_page('single', MIDI_EFFECT_GROUP_DEVICE, SETTINGS_PAGE),
		make_page('multi', MIDI_EFFECT_GROUP_DEVICE, SETTINGS_PAGE)
	],
	'Other':[
		make_page('single', OTHER, SENDS_PAGE),
		make_page('multi', OTHER, SENDS_PAGE),
		make_page('speed', HEX_SPEED_1, SENDS_PAGE),
		make_page('speed', HEX_SPEED_2, SENDS_PAGE),
		make_page('single', OTHER, SETTINGS_PAGE),
		make_page('multi', OTHER, SETTINGS_PAGE)
	],
	'Operator':[
		make_page('single', OPERATOR, SENDS_PAGE),
		make_page('multi', OPERATOR, SENDS_PAGE),
		make_page('speed', HEX_SPEED_1, SENDS_PAGE),
		make_page('speed', HEX_SPEED_2, SENDS_PAGE),
		make_page('single', OPERATOR, SETTINGS_PAGE),
		make_page('multi', OPERATOR, SETTINGS_PAGE)
	],
	'UltraAnalog':[
		make_page('single', ULTRA_ANALOG, SENDS_PAGE),
		make_page('multi', ULTRA_ANALOG, SENDS_PAGE),
		make_page('speed', HEX_SPEED_1, SENDS_PAGE),
		make_page('speed', HEX_SPEED_2, SENDS_PAGE),
		make_page('single', ULTRA_ANALOG, SETTINGS_PAGE),
		make_page('multi', ULTRA_ANALOG, SETTINGS_PAGE)
	],
	'OriginalSimpler':[
		make_page('single', ORIGINAL_SIMPLER, SENDS_PAGE),
		make_page('multi', ORIGINAL_SIMPLER, SENDS_PAGE),
		make_page('speed', HEX_SPEED_1, SENDS_PAGE),
		make_page('speed', HEX_SPEED_2, SENDS_PAGE),
		make_page('single', ORIGINAL_SIMPLER, SETTINGS_PAGE),
		make_page('multi', ORIGINAL_SIMPLER, SETTINGS_PAGE)
	],
	'MultiSampler':[
		make_page('single', MULTI_SAMPLER, SENDS_PAGE),
		make_page('multi', MULTI_SAMPLER, SENDS_PAGE),
		make_page('speed', HEX_SPEED_1, SENDS_PAGE),
		make_page('speed', HEX_SPEED_2, SENDS_PAGE),
		make_page('single', MULTI_SAMPLER, SETTINGS_PAGE),
		make_page('multi', MULTI_SAMPLER, SETTINGS_PAGE)
	],
	'LoungeLizard':[
		make_page('single', LOUNGE_LIZARD, SENDS_PAGE),
		make_page('multi', LOUNGE_LIZARD, SENDS_PAGE),
		make_page('speed', HEX_SPEED_1, SENDS_PAGE),
		make_page('speed', HEX_SPEED_2, SENDS_PAGE),
		make_page('single', LOUNGE_LIZARD, SETTINGS_PAGE),
		make_page('multi', LOUNGE_LIZARD, SETTINGS_PAGE)
	],
	'StringStudio':[
		make_page('single', STRING_STUDIO, SENDS_PAGE),
		make_page('multi', STRING_STUDIO, SENDS_PAGE),
		make_page('speed', HEX_SPEED_1, SENDS_PAGE),
		make_page('speed', HEX_SPEED_2, SENDS_PAGE),
		make_page('single', STRING_STUDIO, SETTINGS_PAGE),
		make_page('multi', STRING_STUDIO, SETTINGS_PAGE)
	],
	'Collision':[
		make_page('single', COLLISION, SENDS_PAGE),
		make_page('multi', COLLISION, SENDS_PAGE),
		make_page('speed', HEX_SPEED_1, SENDS_PAGE),
		make_page('speed', HEX_SPEED_2, SENDS_PAGE),
		make_page('single', COLLISION, SETTINGS_PAGE),
		make_page('multi', COLLISION, SETTINGS_PAGE)
	],
	'InstrumentImpulse':[
		make_page('single', INSTRUMENT_IMPULSE, SENDS_PAGE),
		make_page('multi', INSTRUMENT_IMPULSE, SENDS_PAGE),
		make_page('speed', HEX_SPEED_1, SENDS_PAGE),
		make_page('speed', HEX_SPEED_2, SENDS_PAGE),
		make_page('single', INSTRUMENT_IMPULSE, SETTINGS_PAGE),
		make_page('multi', INSTRUMENT_IMPULSE, SETTINGS_PAGE)
	],
	'NoDevice':[
		make_page('single', NO_DEVICE, SENDS_PAGE),
		make_page('multi', NO_DEVICE, SENDS_PAGE),
		make_page('speed', HEX_SPEED_1, SENDS_PAGE),
		make_page('speed', HEX_SPEED_2, SENDS_PAGE),
		make_page('single', NO_DEVICE, SETTINGS_PAGE),
		make_page('multi', NO_DEVICE, SETTINGS_PAGE)
	]
}

var CODEC_HEX_SPEED = ['ModDevice_Speed1', 'ModDevice_Speed2', 'ModDevice_Speed3',
	'ModDevice_Speed4', 'ModDevice_Speed5', 'ModDevice_Speed6', 'ModDevice_Speed7',
	'ModDevice_Speed8', 'ModDevice_Speed9', 'ModDevice_Speed10', 'ModDevice_Speed11',
	'ModDevice_Speed12', 'ModDevice_Speed13', 'ModDevice_Speed14', 'ModDevice_Speed15',
	'ModDevice_Speed16', 'ModDevice_Adjust1', 'ModDevice_Adjust2', 'ModDevice_Adjust3',
	'ModDevice_Adjust4', 'ModDevice_Adjust5', 'ModDevice_Adjust6', 'ModDevice_Adjust7',
	'ModDevice_Adjust8', 'ModDevice_Adjust9', 'ModDevice_Adjust10', 'ModDevice_Adjust11',
	'ModDevice_Adjust12', 'ModDevice_Adjust13', 'ModDevice_Adjust14', 'ModDevice_Adjust15',
	'ModDevice_Adjust16'];

var CODEC_HEX_BANKS = {'NoDevice':[CODEC_HEX_SPEED, CODEC_HEX_SPEED],
						'Other':[CODEC_HEX_SPEED, CODEC_HEX_SPEED]};

//exports.HEX_BANKS = HEX_BANKS;
