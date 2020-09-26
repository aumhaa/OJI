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


Installation:

To work, preset_tagger relies on m4m8 or mod repository.  Since mod is currently
in a private repository, all the necessary aumhaa framework files have been included
in m4m8 repository.  Make sure to follow instructions included in it's readme.md
file to install m4m8.

m4m8 and OJI repositories should be copied to ~/Documents/Max 8/Packages/.  

Add OJI directory to "Places" in user area of Live's browser.  Browse to
OJI/patchers/preset_tagger/ and add the preset_tagger.amxd.  

You'll need to have XCode command line tools installed for the npm install to work.

http://osxdaily.com/2014/02/12/install-command-line-tools-mac-os-x/


Once its instantiated, it's best to open the Max log window by right-clicking or
cntrl-clicking the devices title bar and selecting the bottom option, "Open Max
Window".  This will give you an indication of problems.

First thing to do is hit the install button, and then wait for 30 seconds or so.
In order for the Nodejs installation to work correctly, you will need XCode Command
Line Tools installed.  If they're missing you should be prompted to download and
install them.  You may need to start over with a freshly loaded device after
installing them.

After the installation has completed, you should see some new folders in
~/Documents/Max 8/Packages/OJI/javascript/node_dependencies/node_modules.
If not, installation hasn't worked right.  In that case, you'll need to use the patch in
~/Documents/Max 8/Packages/OJI/javascript/node_dependencies/OJI_node_installer.amxd
to install the dependencies manually.  Just open the patch and hit the install button,
wait a bit to wait for everything to download.

The device should automatically start after installation.

Select a user library by pressing the "Select Library" button and choosing the
enclosing folder of your presets library.  If successful, you should see the
floating browser populate.  Click around and make sure no errors are occuring
in the Max window.  

If everything is working, press the "Set Global Path" button, and it will write
your user path to the prefs file so you don't have to select a new library
every time you open a new device.
