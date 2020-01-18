Abstract:

Device that will enable extended attribute tagging of device preset files (aupreset, adg),
browsing tagged presets, and loading those presets through keycommands and other
automated/automatable means.

Extendable for other uses that would benefit from OS-level file access, key commands,
and tagging.

Components:

nodejs script capable of parsing library and user directories, detect
preset files, listing their pertinent xattr tags, adding them, and modifying them.

Python MIDI Remote Script used to load devices utilizing API hooks that aren't
available via m4l.

js script capable of interacting with Python backend (MIDI Remote Script),
bulding gui frontend (possibly react-based browser portal).

keylogger with MIDI output.  Separate application that is capable of translating
key-presses to MIDI output, for injection to MIDI Remote script. 
