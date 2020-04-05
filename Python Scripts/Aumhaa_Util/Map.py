# by amounra 0120 : http://www.aumhaa.com
# written against Live 10.1.7 release on 011720


from ableton.v2.control_surface.elements.color import Color
from aumhaa.v2.livid.colors import *

CHANNEL = 0

UTIL_BUTTONS = range(50)

class UtilColors:


	class ModeButtons:
		Main = LividRGB.WHITE
		Select = LividRGB.RED
		Clips = LividRGB.GREEN


	class DefaultButton:
		On = LividRGB.WHITE
		Off = LividRGB.OFF
		Disabled = LividRGB.OFF
		Alert = LividRGB.BlinkFast.WHITE


	class Session:
		StopClipDisabled = LividRGB.OFF
		StopClipTriggered = LividRGB.BiColor.BLUE.WHITE
		StopClip = LividRGB.BLUE
		Scene = LividRGB.CYAN
		NoScene = LividRGB.OFF
		SceneTriggered = LividRGB.GREEN
		ClipTriggeredPlay = LividRGB.BlinkFast.GREEN
		ClipTriggeredRecord = LividRGB.BlinkFast.RED
		RecordButton = LividRGB.OFF
		ClipEmpty = LividRGB.OFF
		ClipStopped = LividRGB.WHITE
		ClipStarted = LividRGB.GREEN
		ClipRecording = LividRGB.RED
		NavigationButtonOn = LividRGB.CYAN
		NavigationButtonOff = LividRGB.YELLOW
		ZoomOn = LividRGB.BlinkFast.WHITE
		ZoomOff = LividRGB.WHITE


	class Zooming:
		Selected = LividRGB.BlinkFast.YELLOW
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
		PlayOn = LividRGB.BiColor.WHITE.GREEN
		PlayOff = LividRGB.GREEN
		StopOn = LividRGB.BLUE
		StopOff = LividRGB.BLUE
		RecordOn = LividRGB.BiColor.WHITE.RED
		RecordOff = LividRGB.RED
		OverdubOn = LividRGB.BiColor.WHITE.MAGENTA
		OverdubOff = LividRGB.MAGENTA
		SeekBackwardOn = LividRGB.BlinkMedium.CYAN
		SeekBackwardOff = LividRGB.CYAN
		LoopOn = LividRGB.BlinkMedium.YELLOW
		LoopOff = LividRGB.YELLOW


	class Mixer:
		SoloOn = LividRGB.BLUE
		SoloOff = LividRGB.CYAN
		MuteOn = LividRGB.YELLOW
		MuteOff = LividRGB.WHITE
		ArmSelected = LividRGB.RED
		ArmUnselected = LividRGB.RED
		ArmOff = LividRGB.WHITE
		StopClip = LividRGB.BLUE
		SelectedOn = LividRGB.BLUE
		SelectedOff = LividRGB.MAGENTA
		ArmOn = LividRGB.RED


	class Recording:
		On = LividRGB.BiColor.WHITE.MAGENTA
		Transition = LividRGB.BlinkFast.MAGENTA
		Off = LividRGB.MAGENTA


	class Automation:
		On = LividRGB.BiColor.WHITE.YELLOW
		Off = LividRGB.YELLOW


	class Recorder:
		On = LividRGB.WHITE
		Off = LividRGB.BLUE
		NewOn = LividRGB.BlinkMedium.YELLOW
		NewOff = LividRGB.YELLOW
		FixedOn = LividRGB.BlinkMedium.CYAN
		FixedOff = LividRGB.CYAN
		RecordOn = LividRGB.BiColor.WHITE.MAGENTA
		RecordOff = LividRGB.MAGENTA
		AutomationOn = LividRGB.BiColor.WHITE.YELLOW
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
