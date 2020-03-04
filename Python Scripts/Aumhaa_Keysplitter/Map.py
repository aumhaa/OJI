# by amounra 0320 : http://www.aumhaa.com
# written against Live 10.1.9 release on 0320


from ableton.v2.control_surface.elements.color import Color
from aumhaa.v2.livid.colors import *

"""
Keysplitter_Map.py

Created by amounra on 2020-03-02.
Copyright (c) 2010 __artisia__. All rights reserved.

"""

CHANNEL = 0
# BUTTON_CHANNEL = 9
BUTTON_CHANNEL = 1

KEYSPLITTER_KEYS = range(128)
# KEYSPLITTER_ASSIGN_BUTTONS = [42, 46]
KEYSPLITTER_ASSIGN_BUTTONS = [104, 105]

class KeysplitterColors:


	class DefaultButton:
		On = LividRGB.WHITE
		Off = LividRGB.OFF
		Disabled = LividRGB.OFF
		Alert = LividRGB.BlinkFast.WHITE

#a
