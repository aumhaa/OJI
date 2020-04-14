# by amounra 0120 : http://www.aumhaa.com
# written against Live 10.1.7 release on 011720


from ableton.v2.control_surface.elements.color import Color
from aumhaa.v2.livid.colors import *

CHANNEL = 0

UTIL_BUTTONS = range(128)

COLOR_MAP = [1,2,3,4,5,6,7]

class UtilColors:

	class Option:
		Selected = LividRGB.WHITE
		Unselected = LividRGB.CYAN
		On = LividRGB.WHITE
		Off = LividRGB.BLUE
		Unused = LividRGB.OFF

	class ItemNavigation:
		ItemNotSelected = LividRGB.BLUE
		ItemSelected = LividRGB.YELLOW
		NoItem = LividRGB.OFF


	class EditModeOptions:
		ItemNotSelected = LividRGB.BLUE
		ItemSelected = LividRGB.YELLOW
		NoItem = LividRGB.OFF


	class BankSelection:
		ItemNotSelected = LividRGB.BLUE
		ItemSelected = LividRGB.YELLOW
		NoItem = LividRGB.OFF


	class ModeButtons:
		Main = LividRGB.WHITE
		Select = LividRGB.RED
		Clips = LividRGB.GREEN


	class DefaultButton:
		On = LividRGB.WHITE
		Off = LividRGB.OFF
		Disabled = LividRGB.OFF
		Alert = LividRGB.RED
		Transparent = LividRGB.WHITE

	class List:
		ScrollerOn = LividRGB.GREEN
		ScrollerOff = LividRGB.MAGENTA

	class Session:
		StopClipDisabled = LividRGB.OFF
		StopClipTriggered = LividRGB.BLUE
		StopClip = LividRGB.BLUE
		Scene = LividRGB.CYAN
		NoScene = LividRGB.OFF
		SceneTriggered = LividRGB.GREEN
		ClipTriggeredPlay = LividRGB.GREEN
		ClipTriggeredRecord = LividRGB.RED
		RecordButton = LividRGB.OFF
		ClipEmpty = LividRGB.OFF
		ClipStopped = LividRGB.WHITE
		ClipStarted = LividRGB.GREEN
		ClipRecording = LividRGB.RED
		NavigationButtonOn = LividRGB.CYAN
		NavigationButtonOff = LividRGB.YELLOW
		ZoomOn = LividRGB.WHITE
		ZoomOff = LividRGB.WHITE


	class Zooming:
		Selected = LividRGB.YELLOW
		Stopped = LividRGB.WHITE
		Playing = LividRGB.GREEN
		Empty = LividRGB.OFF


	class LoopSelector:
		Playhead = LividRGB.YELLOW
		OutsideLoop = LividRGB.BLUE
		InsideLoopStartBar = LividRGB.CYAN
		SelectedPage = LividRGB.WHITE
		InsideLoop = LividRGB.CYAN
		PlayheadRecord = LividRGB.RED


	class Transport:
		PlayOn = LividRGB.GREEN
		PlayOff = LividRGB.WHITE
		StopOn = LividRGB.BLUE
		StopOff = LividRGB.BLUE
		RecordOn = LividRGB.RED
		RecordOff = LividRGB.WHITE
		OverdubOn = LividRGB.MAGENTA
		OverdubOff = LividRGB.WHITE
		SeekBackwardOn = LividRGB.CYAN
		SeekBackwardOff = LividRGB.CYAN
		LoopOn = LividRGB.YELLOW
		LoopOff = LividRGB.WHITE

	class Auto_Arm:
		Enabled = LividRGB.RED
		Disabled = LividRGB.WHITE

	class Mixer:
		SoloOn = LividRGB.BLUE
		SoloOff = LividRGB.CYAN
		MuteOn = LividRGB.YELLOW
		MuteOff = LividRGB.WHITE
		ArmSelected = LividRGB.RED
		ArmSelectedImplicit = LividRGB.MAGENTA
		ArmUnselected = LividRGB.RED
		ArmOff = LividRGB.WHITE
		StopClip = LividRGB.BLUE
		SelectedOn = LividRGB.WHITE
		SelectedOff = LividRGB.OFF
		ArmOn = LividRGB.RED


	class Recording:
		On = LividRGB.RED
		Transition = LividRGB.MAGENTA
		Off = LividRGB.MAGENTA


	class Automation:
		On = LividRGB.WHITE
		Off = LividRGB.YELLOW


	class Recorder:
		On = LividRGB.WHITE
		Off = LividRGB.BLUE
		NewOn = LividRGB.YELLOW
		NewOff = LividRGB.YELLOW
		FixedOn = LividRGB.CYAN
		FixedOff = LividRGB.CYAN
		RecordOn = LividRGB.MAGENTA
		RecordOff = LividRGB.MAGENTA
		AutomationOn = LividRGB.YELLOW
		AutomationOff = LividRGB.YELLOW
		FixedAssigned = LividRGB.MAGENTA
		FixedNotAssigned = LividRGB.OFF


	class Device:
		NavOn = LividRGB.MAGENTA
		NavOff = LividRGB.OFF
		BankOn = LividRGB.YELLOW
		BankOff = LividRGB.OFF
		ChainNavOn = LividRGB.RED
		ChainNavOff = LividRGB.OFF
		ContainNavOn = LividRGB.CYAN
		ContainNavOff = LividRGB.OFF
