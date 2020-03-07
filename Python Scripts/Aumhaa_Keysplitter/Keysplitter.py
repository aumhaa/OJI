# by amounra 0320 : http://www.aumhaa.com
# written against Live 10.1.9 on 0320


from __future__ import absolute_import, print_function
import Live
import math

from ableton.v2.base import inject, listens
from ableton.v2.control_surface import ControlSurface, ControlElement, Layer, Skin, PrioritizedResource, Component, ClipCreator, DeviceBankRegistry
from ableton.v2.control_surface.elements import ButtonMatrixElement, ButtonElement
from ableton.v2.control_surface.mode import AddLayerMode, ModesComponent, DelayMode, CompoundMode
from ableton.v2.control_surface.control import PlayableControl, control_matrix, ButtonControl
from ableton.v2.control_surface.input_control_element import *
from ableton.v2.control_surface.components.background import BackgroundComponent
from ableton.v2.control_surface.components.auto_arm import AutoArmComponent

from aumhaa.v2.control_surface.mono_modes import CancellableBehaviour
from aumhaa.v2.base import initialize_debug

from .Map import *

debug = initialize_debug()


class KeysplitterComponent(Component):

	low_assign_button = ButtonControl()
	high_assign_button = ButtonControl()
	select_matrix = control_matrix(PlayableControl)


	def __init__(self, *a, **k):
		super(KeysplitterComponent, self).__init__()
		self._low_split_index = 127
		self._high_split_index = 127


	@select_matrix.pressed
	def select_matrix(self, button):
		self._on_select_matrix_pressed(button)


	def _on_select_matrix_pressed(self, button):
		identifier = button.coordinate[1]
		debug('_on_select_matrix_pressed():', button, identifier)
		if self.low_assign_button.is_pressed:
			self._low_split_index = identifier
			self._update_note_translations()
		elif self.high_assign_button.is_pressed:
			self._high_split_index = identifier
			self._update_note_translations()


	def set_select_matrix(self, matrix):
		debug('set select matrix:', matrix)
		self.select_matrix.set_control_element(matrix)
		for button in self.select_matrix:
			button.set_mode(PlayableControl.Mode.playable_and_listenable)


	def set_low_assign_button(self, button):
		self.low_assign_button.set_control_element(button)


	def set_high_assign_button(self, button):
		self.high_assign_button.set_control_element(button)


	def _update_note_translations(self):
		for button in self.select_matrix:
			identifier = button.coordinate[1]
			if identifier <= self._low_split_index:
				button.channel = 0
			elif identifier <= self._high_split_index:
				button.channel = 1
			else:
				button.channel = 2


class SpecialAutoArmComponent(AutoArmComponent):

	util_autoarm_toggle_button = ButtonControl()
	__autoarm_enabled = False

	# def __init__(self, *a, **k):
	#     super(SpecialAutoArmComponent, self).__init__(*a, **k)

	def set_enabled(self, enable):
		debug('set_enabled:', self.is_enabled())
		super(SpecialAutoArmComponent, self).set_enabled(enable)

	# @enable_button.pressed
	# def enable_button(self, button):
	# 	debug('enable_button.pressed', button)
	# 	if self.is_enabled():
	# 		self._update_implicit_arm_task.kill()
	# 		song = self.song
	# 		selected_track = song.view.selected_track
	# 		tracks = list(song.tracks)
	# 		selected_index = tracks.index(selected_track)
	# 		for track in tracks:
	# 			track_index = tracks.index(track)
	# 			if track_index in range(selected_index, selected_index + 3):
	# 				if track.implicit_arm:
	# 					track.implicit_arm = False
	# 				track.input_routing_channel = track.available_input_routing_channels[0]
	# 		self.set_enabled(False)
	# 	else:
	# 		self.set_enabled(True)
	# 		self.update()

	def _update_implicit_arm(self):
		self._update_implicit_arm_task.kill()
		song = self.song
		selected_track = song.view.selected_track
		can_auto_arm = self.can_auto_arm()
		tracks = list(song.tracks)
		if selected_track in tracks:
			selected_index = tracks.index(selected_track)
			for track in song.tracks:
				if self.track_can_be_armed(track):
					if track in tracks:
						track_index = tracks.index(track)
						track.implicit_arm = can_auto_arm and track_index in range(selected_index, selected_index + 3) and self.can_auto_arm_track(track)
						if self.autoarm_enabled:
							if track_index in range(selected_index, selected_index + 3):
								if hasattr(track, u'available_input_routing_channels') and len(track.available_input_routing_channels) > (track_index - selected_index):
									track.input_routing_channel = track.available_input_routing_channels[(track_index - selected_index)+1]
							elif hasattr(track, u'available_input_routing_channels') and len(track.available_input_routing_channels) > 0:
								track.input_routing_channel = track.available_input_routing_channels[0]


	def set_util_autoarm_toggle_button(self, button):
		self.util_autoarm_toggle_button.set_control_element(button)

	@util_autoarm_toggle_button.pressed
	def util_autoarm_toggle_button(self, button):
		self._on_util_autoarm_toggle_button_pressed(button)

	def _on_util_autoarm_toggle_button_pressed(self, button):
		self.toggle_autoarm()

	def toggle_autoarm(self):
		self.__autoarm_enabled = not self.__autoarm_enabled
		debug('toggle_autoarm')
		if not self.autoarm_enabled:
			self._update_implicit_arm_task.kill()
			song = self.song
			selected_track = song.view.selected_track
			tracks = list(song.tracks)
			selected_index = tracks.index(selected_track)
			for track in tracks:
				if track in tracks:
					track_index = tracks.index(track)
					if track_index in range(selected_index, selected_index + 3):
						if track.implicit_arm:
							track.implicit_arm = False
						if hasattr(track, u'available_input_routing_channels') and len(track.available_input_routing_channels) > 0:
							track.input_routing_channel = track.available_input_routing_channels[0]
		else:
			self.update()

	@property
	def autoarm_enabled(self):
		return self.__autoarm_enabled

	def can_auto_arm_track(self, track):
		return self.track_can_be_armed(track) and self.autoarm_enabled


class Keysplitter(ControlSurface):

	def __init__(self, c_instance):
		super(Keysplitter, self).__init__(c_instance)
		self._skin = Skin(KeysplitterColors)
		with self.component_guard():
			self._setup_controls()
			self._setup_background()
			self._setup_autoarm()
			self._setup_keysplitter()
			self._setup_modes()
		self._main_modes.selected_mode = 'Keysplitter'


	def _setup_controls(self):
		is_momentary = True
		optimized = True
		resource = PrioritizedResource
		self._key = [ButtonElement(is_momentary = is_momentary, msg_type = MIDI_NOTE_TYPE, channel = CHANNEL, identifier = KEYSPLITTER_KEYS[index], name = 'Key_' + str(index)) for index in range(128)]
		self._key_matrix = ButtonMatrixElement(name = 'KeyMatrix', rows = [self._key])
		self._button = [ButtonElement(is_momentary = is_momentary, msg_type = MIDI_NOTE_TYPE, channel = BUTTON_CHANNEL, identifier = KEYSPLITTER_ASSIGN_BUTTONS[index], name = 'Buttons_' + str(index)) for index in range(3)]


	def _setup_background(self):
		self._background = BackgroundComponent(name = 'Background')
		self._background.layer = Layer(matrix = self._key_matrix)
		self._background.set_enabled(False)


	def _setup_autoarm(self):
		self._autoarm = SpecialAutoArmComponent()
		self._autoarm.layer = Layer(util_autoarm_toggle_button = self._button[2])


	def _setup_keysplitter(self):
		self._keysplitter = KeysplitterComponent(name = 'KeysplitterComponent')
		self._keysplitter.layer = Layer(select_matrix = self._key_matrix, low_assign_button = self._button[0], high_assign_button = self._button[1])
		self._keysplitter.set_enabled(False)


	def _setup_mixer(self):
		self._mixer = MixerComponent()


	def _setup_modes(self):
		# self._autoarm_modes = ModesComponent(name = 'AutoArmModes')
		# self._autoarm_modes.add_mode('disabled', [])
		# self._autoarm_modes.add_mode('enabled', [self._autoarm], behaviour = CancellableBehaviour())
		# self._autoarm_modes.selected_mode = 'disabled'
		# self._autoarm_modes.layer = Layer(cycle_mode_button = self._button[2])
		# self._autoarm_modes.layer = Layer(enabled_button = self._button[2])

		self._main_modes = ModesComponent(name = 'MainModes')
		self._main_modes.add_mode('disabled', [self._background])
		self._main_modes.add_mode('Keysplitter', [self._keysplitter, self._autoarm])
		self._main_modes.selected_mode = 'disabled'

#	a
