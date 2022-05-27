# by amounra 0320 : http://www.aumhaa.com
# written against Live 10.1.9 on 0320



import Live
import math
# from itertools import ifilter

from ableton.v2.base import inject, listens, listens_group, listenable_property, liveobj_valid
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

debug = initialize_debug(True)


class KeysplitterComponent(Component):

	low_assign_button = ButtonControl()
	high_assign_button = ButtonControl()
	low_octave_up_button = ButtonControl()
	low_octave_down_button = ButtonControl()
	high_octave_up_button = ButtonControl()
	high_octave_down_button = ButtonControl()
	mid_octave_up_button = ButtonControl()
	mid_octave_down_button = ButtonControl()
	low_octave_reset_button = ButtonControl()
	mid_octave_reset_button = ButtonControl()
	high_octave_reset_button = ButtonControl()
	engage_button = ButtonControl()
	select_matrix = control_matrix(PlayableControl)


	def __init__(self, *a, **k):
		super(KeysplitterComponent, self).__init__()
		self._low_split_index = 127
		self._high_split_index = 127
		self._low_octave_offset = 0
		self._mid_octave_offset = 0
		self._high_octave_offset = 0
		self._is_engaged = False
		self._autoarm_component = None
		self._last_engaged_track_index = 0


	def set_autoarm_component(self, component):
		self._autoarm_component = component

	@listens('autoarm_enabled')
	def _on_autoarm_changed(self, value):
		self.engaged = value

	@listenable_property
	def number_of_splits(self):
		splits = 1
		splits += 1 if self._low_split_index != 127 else 0
		splits += 1 if self._high_split_index != 127 else 0
		return splits

	@low_octave_reset_button.pressed
	def low_octave_reset_button(self, button):
		self.low_octave_offset = 0

	@low_octave_up_button.pressed
	def low_octave_up_button(self, button):
		self.low_octave_offset = self._low_octave_offset + 1

	@low_octave_down_button.pressed
	def low_octave_down_button(self, button):
		self.low_octave_offset = self._low_octave_offset - 1

	@listenable_property
	def low_octave_offset(self):
		return self._low_octave_offset

	@low_octave_offset.setter
	def low_octave_offset(self, value):
		self._low_octave_offset = min(max(value, -5), 5)
		self._update_note_translations()
		self.notify_low_octave_offset(self._low_octave_offset)


	@mid_octave_reset_button.pressed
	def mid_octave_reset_button(self, button):
		self.mid_octave_offset = 0

	@mid_octave_up_button.pressed
	def mid_octave_up_button(self, button):
		self.mid_octave_offset = self._mid_octave_offset + 1

	@mid_octave_down_button.pressed
	def mid_octave_down_button(self, button):
		self.mid_octave_offset = self._mid_octave_offset - 1

	@listenable_property
	def mid_octave_offset(self):
		return self._mid_octave_offset

	@mid_octave_offset.setter
	def mid_octave_offset(self, value):
		self._mid_octave_offset = min(max(value, -5), 5)
		self._update_note_translations()
		self.notify_mid_octave_offset(self._mid_octave_offset)


	@high_octave_reset_button.pressed
	def high_octave_reset_button(self, button):
		self.high_octave_offset = 0

	@high_octave_up_button.pressed
	def high_octave_up_button(self, button):
		self.high_octave_offset = self._high_octave_offset + 1

	@high_octave_down_button.pressed
	def high_octave_down_button(self, button):
		self.high_octave_offset = self._high_octave_offset - 1

	@listenable_property
	def high_octave_offset(self):
		return self._high_octave_offset

	@high_octave_offset.setter
	def high_octave_offset(self, value):
		self._high_octave_offset = min(max(value, -5), 5)
		self._update_note_translations()
		self.notify_high_octave_offset(self._high_octave_offset)


	@select_matrix.pressed
	def select_matrix(self, button):
		self._on_select_matrix_pressed(button)

	@listenable_property
	def engaged(self):
		return self._is_engaged

	@engaged.setter
	def engaged(self, value):
		self._is_engaged = value
		debug('about to notify')
		self.notify_engaged(self._is_engaged)
		self._update_note_translations()

	@engage_button.pressed
	def engage_button(self, button):
		self.toggle_engaged()

	def toggle_engaged(self):
		self.engaged = not self._is_engaged
		self._update_note_translations()
		if self._autoarm_component != None:
			self._autoarm_component._update_implicit_arm_task.kill()
		if self._is_engaged:
			song = self.song
			selected_track = song.view.selected_track
			tracks = list(song.tracks)
			if selected_track in tracks:
				selected_index = tracks.index(selected_track)
				self._last_engaged_track_index = selected_index
				for track in song.tracks:
					if track in tracks:
						track_index = tracks.index(track)
						track.implicit_arm = track_index in range(selected_index, selected_index + self.number_of_splits)
						if track_index in range(selected_index, (selected_index + self.number_of_splits)):
							if hasattr(track, 'available_input_routing_channels') and len(track.available_input_routing_channels) > (track_index - selected_index):
								track.input_routing_channel = track.available_input_routing_channels[(track_index - selected_index)+1]
						elif hasattr(track, 'available_input_routing_channels') and len(track.available_input_routing_channels) > 0:
							track.input_routing_channel = track.available_input_routing_channels[0]
		else:
			song = self.song
			tracks = list(song.tracks)
			selected_index = self._last_engaged_track_index
			for track in tracks:
				if track in tracks:
					track_index = tracks.index(track)
					if track_index in range(selected_index, (selected_index + self.number_of_splits)):
						if track.implicit_arm:
							track.implicit_arm = False
						if hasattr(track, 'available_input_routing_channels') and len(track.available_input_routing_channels) > 0:
							track.input_routing_channel = track.available_input_routing_channels[0]


	def track_can_be_armed(self, track):
		return track.can_be_armed and track.has_midi_input

	@low_assign_button.double_clicked
	def low_assign_button(self, button):
		debug('low_assign_button.double_clicked')
		self._high_split_index = 127
		self._low_split_index = 127
		self._update_note_translations()
		self.notify_number_of_splits(self.number_of_splits)


	@high_assign_button.double_clicked
	def high_assign_button(self, button):
		debug('high_assign_button.double_clicked')
		self._high_split_index = 127
		self._update_note_translations()
		self.notify_number_of_splits(self.number_of_splits)


	def _on_select_matrix_pressed(self, button):
		identifier = button.coordinate[1]
		debug('_on_select_matrix_pressed():', button, identifier)
		if self.low_assign_button.is_pressed:
			self._low_split_index = identifier
			self._update_note_translations()
			self.notify_number_of_splits(self.number_of_splits)
		elif self.high_assign_button.is_pressed:
			self._high_split_index = identifier
			self._update_note_translations()
			self.notify_number_of_splits(self.number_of_splits)


	def set_select_matrix(self, matrix):
		debug('set select matrix:', matrix)
		self.select_matrix.set_control_element(matrix)
		for button in self.select_matrix:
			button.set_mode(PlayableControl.Mode.playable_and_listenable)



	def set_low_octave_up_button(self, button):
		self.low_octave_up_button.set_control_element(button)

	def set_low_octave_down_button(self, button):
		self.low_octave_down_button.set_control_element(button)

	def set_mid_octave_up_button(self, button):
		self.mid_octave_up_button.set_control_element(button)

	def set_mid_octave_down_button(self, button):
		self.mid_octave_down_button.set_control_element(button)

	def set_high_octave_up_button(self, button):
		self.high_octave_up_button.set_control_element(button)

	def set_high_octave_down_button(self, button):
		self.high_octave_down_button.set_control_element(button)

	def set_low_octave_reset_button(self, button):
		self.low_octave_reset_button.set_control_element(button)

	def set_mid_octave_reset_button(self, button):
		self.mid_octave_reset_button.set_control_element(button)

	def set_high_octave_reset_button(self, button):
		self.high_octave_reset_button.set_control_element(button)



	def set_low_assign_button(self, button):
		self.low_assign_button.set_control_element(button)


	def set_high_assign_button(self, button):
		self.high_assign_button.set_control_element(button)


	def set_engage_button(self, button):
		self.engage_button.set_control_element(button)


	def _update_note_translations(self):
		debug('update_note_translations:', self.engaged)
		for button in self.select_matrix:
			identifier = button.coordinate[1]
			# original_id = button._control_element._original_identifier if hasattr(button, '_control_element') and hasattr(button._control_element._original_identifier) else identifier
			if self.engaged or self._autoarm_component.autoarm_enabled:
				# debug('is engaged')
				if identifier <= self._low_split_index:
					button.channel = 0
					button.identifier = min(127, max(0, identifier + (self.low_octave_offset*12)))
				elif identifier <= self._high_split_index:
					button.channel = 1
					button.identifier = min(127, max(0, identifier + (self.mid_octave_offset*12)))
				else:
					button.channel = 2
					button.identifier = min(127, max(0, identifier + (self.high_octave_offset*12)))
			else:
				# debug('not engaged')
				button.channel = 0
				button.identifier = identifier




class SpecialAutoArmComponent(AutoArmComponent):

	util_autoarm_toggle_button = ButtonControl()
	util_arm_exclusive_button = ButtonControl()
	__autoarm_enabled = False

	def __init__(self, keysplitter, *a, **k):
		AutoArmComponent.active_push_instances.append(self)
		self._keysplitter = keysplitter
		# self._last_number_splits = 0
		super(SpecialAutoArmComponent, self).__init__(*a, **k)
		self._on_number_of_splits_changed.subject = self._keysplitter
		self._on_engaged.subject = self._keysplitter

	def disconnect(self):
		AutoArmComponent.active_push_instances.remove(self)
		super(SpecialAutoArmComponent, self).disconnect()

	def set_enabled(self, enable):
		debug('set_enabled:', self.is_enabled())
		super(SpecialAutoArmComponent, self).set_enabled(enable)

	@property
	def autoarm_enabled(self):
		return self.__autoarm_enabled

	@listens('number_of_splits')
	def _on_number_of_splits_changed(self, splits = 0):
		# debug('number_of_splits:', int(splits))
		# if not self._last_number_splits == int(splits):
			# debug('updating from here')
			# self._last_number_splits = int(splits)
		self._update_implicit_arm()


	def _update_implicit_arm(self):
		debug('update_implicit_arm')
		self._update_implicit_arm_task.kill()
		if self.can_update_implicit_arm():
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
							track.implicit_arm = can_auto_arm and track_index in range(selected_index, selected_index + self._keysplitter.number_of_splits) and self.can_auto_arm_track(track)
							if self.autoarm_enabled:
								if track_index in range(selected_index, (selected_index + self._keysplitter.number_of_splits)):
									if hasattr(track, 'available_input_routing_channels') and len(track.available_input_routing_channels) > (track_index - selected_index):
										track.input_routing_channel = track.available_input_routing_channels[(track_index - selected_index)+1]
								elif hasattr(track, 'available_input_routing_channels') and len(track.available_input_routing_channels) > 0:
									track.input_routing_channel = track.available_input_routing_channels[0]


	def set_util_arm_exclusive_button(self, button):
		self.util_arm_exclusive_button.set_control_element(button)

	@util_arm_exclusive_button.pressed
	def util_arm_exclusive_button(self, button):
		self._on_util_arm_exclusive_button_pressed(button)

	def _on_util_arm_exclusive_button_pressed(self, button):
		self.arm_exclusive()


	def set_util_autoarm_toggle_button(self, button):
		self.util_autoarm_toggle_button.set_control_element(button)

	@util_autoarm_toggle_button.pressed
	def util_autoarm_toggle_button(self, button):
		self._on_util_autoarm_toggle_button_pressed(button)

	def _on_util_autoarm_toggle_button_pressed(self, button):
		self.toggle_autoarm()

	def toggle_autoarm(self):
		if self._keysplitter.engaged:
			self._keysplitter._is_engaged = False
		self.__autoarm_enabled = not self.__autoarm_enabled
		debug('toggle_autoarm, is now:', self.__autoarm_enabled)
		if not self.autoarm_enabled:
			self._update_implicit_arm_task.kill()
			song = self.song
			selected_track = song.view.selected_track
			tracks = list(song.tracks)
			selected_index = tracks.index(selected_track)
			for track in tracks:
				if track in tracks:
					track_index = tracks.index(track)
					if track_index in range(selected_index, (selected_index + self._keysplitter.number_of_splits)):
						if track.implicit_arm:
							track.implicit_arm = False
						if hasattr(track, 'available_input_routing_channels') and len(track.available_input_routing_channels) > 0:
							track.input_routing_channel = track.available_input_routing_channels[0]
		else:
			self.update()
		# self.notify_autoarm_enabled(self.__autoarm_enabled)

	def arm_exclusive(self):
		debug('arm_exclusive')
		if self.__autoarm_enabled:
			self.toggle_autoarm()
		elif self._keysplitter.engaged:
			self._keysplitter.toggle_engaged()
		self._update_implicit_arm_task.kill()
		song = self.song
		selected_track = song.view.selected_track
		tracks = list(song.tracks)
		selected_index = tracks.index(selected_track)
		for track in tracks:
			if track in tracks:
				track_index = tracks.index(track)
				if track_index == selected_index:
					# debug('selected track is index')
					if not track.implicit_arm:
						track.implicit_arm = True
						# debug('armed the track')
				else:
					if track.implicit_arm:
						track.implicit_arm = False

	def can_auto_arm(self):
		return self.is_enabled() and not self.needs_restore_auto_arm and self.__autoarm_enabled

	# @listenable_property
	@property
	def autoarm_enabled(self):
		return self.__autoarm_enabled

	def can_auto_arm_track(self, track):
		return self.track_can_be_armed(track) and self.autoarm_enabled

	def can_update_implicit_arm(self):
		return (self.__autoarm_enabled and not self._keysplitter._is_engaged)

	@listens('engaged')
	def _on_engaged(self, engaged):
		debug('autoarm received engaged:', engaged)
		self.__autoarm_enabled = False



class Keysplitter(ControlSurface):

	def __init__(self, c_instance):
		super(Keysplitter, self).__init__(c_instance)
		self._skin = Skin(KeysplitterColors)
		self.disable_autoarm = True
		with self.component_guard():
			self._setup_controls()
			self._setup_background()
			self._setup_keysplitter()
			self._setup_autoarm()
			self._setup_modes()
		self._main_modes.selected_mode = 'Keysplitter'

	def _setup_controls(self):
		is_momentary = True
		optimized = True
		resource = PrioritizedResource
		self._key = [ButtonElement(is_momentary = is_momentary, msg_type = MIDI_NOTE_TYPE, channel = CHANNEL, identifier = KEYSPLITTER_KEYS[index], name = 'Key_' + str(index)) for index in range(128)]
		self._key_matrix = ButtonMatrixElement(name = 'KeyMatrix', rows = [self._key])
		self._button = [ButtonElement(is_momentary = is_momentary, msg_type = MIDI_NOTE_TYPE, channel = BUTTON_CHANNEL, identifier = KEYSPLITTER_ASSIGN_BUTTONS[index], name = 'Buttons_' + str(index)) for index in range(14)]

	def _setup_background(self):
		self._background = BackgroundComponent(name = 'Background')
		self._background.layer = Layer(matrix = self._key_matrix)
		self._background.set_enabled(False)

	def _setup_keysplitter(self):
		self._keysplitter = KeysplitterComponent(name = 'KeysplitterComponent')
		self._keysplitter.layer = Layer(select_matrix = self._key_matrix,
			low_assign_button = self._button[0],
			high_assign_button = self._button[1],
			engage_button = self._button[3],
			low_octave_down_button = self._button[4],
			low_octave_up_button = self._button[5],
			mid_octave_down_button = self._button[6],
			mid_octave_up_button = self._button[7],
			high_octave_down_button = self._button[8],
			high_octave_up_button = self._button[9],
			low_octave_reset_button = self._button[10],
			mid_octave_reset_button = self._button[11],
			high_octave_reset_button = self._button[12],
		)
		self._keysplitter.set_enabled(False)

	def _setup_autoarm(self):
		self._autoarm = SpecialAutoArmComponent(keysplitter = self._keysplitter)
		self._autoarm.layer = Layer(util_autoarm_toggle_button = self._button[2], util_arm_exclusive_button = self._button[13])
		self._keysplitter.set_autoarm_component(self._autoarm)

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
		# self._main_modes.add_mode('Keysplitter', [self._keysplitter])
		self._main_modes.selected_mode = 'disabled'

#	a
