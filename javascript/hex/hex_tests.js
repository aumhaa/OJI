function preset_tests(){
	HexEditor.selectedPreset.add_listener(function(){
		debug('Presets are now:', HexEditor._presets._presets);
	})
	debug('Initial presets:', HexEditor._presets._presets);
}

function parameter_tests(){
	debug('NoteType:', HexEditor.noteType._value);
	debug('NoteValues:', HexEditor.noteValues._value);
}
