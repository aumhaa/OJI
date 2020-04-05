# by amounra 0417 : http://www.aumhaa.com
# written against Live 10.1.7 release on 011720

from __future__ import with_statement
import Live
import time
import math
import logging
logger = logging.getLogger(__name__)

#from itertools import izip, izip_longest, product
from ableton.v2.control_surface.control_surface import ControlSurface, DeviceBankRegistry
from ableton.v2.control_surface.device_decorator_factory import DeviceDecoratorFactory

from ableton.v2.control_surface.default_bank_definitions import BANK_DEFINITIONS
from ableton.v2.base import inject, listens, listens_group, liveobj_valid
from ableton.v2.control_surface import ControlSurface, ControlElement, Layer, Skin, PrioritizedResource, Component, ClipCreator, BANK_MAIN_KEY, BANK_PARAMETERS_KEY, use
from ableton.v2.control_surface.elements import ButtonElement, ComboElement, EncoderElement, DisplayDataSource
from ableton.v2.control_surface.components import ClipSlotComponent, SessionComponent, ViewControlComponent, SessionRingComponent, SessionNavigationComponent, MixerComponent, ChannelStripComponent, UndoRedoComponent, TransportComponent
from ableton.v2.control_surface.components.mixer import SimpleTrackAssigner
from ableton.v2.control_surface.control import control_color
from ableton.v2.control_surface.mode import ModesComponent, AddLayerMode, DelayMode, CompoundMode
from ableton.v2.control_surface.components.auto_arm import AutoArmComponent
from ableton.v2.control_surface.input_control_element import InputControlElement, MIDI_CC_TYPE, MIDI_NOTE_TYPE, MIDI_PB_TYPE, MIDI_SYSEX_TYPE
from ableton.v2.control_surface.components import DisplayingDeviceParameterComponent, DeviceComponent
from ableton.v2.control_surface.control import ButtonControl
from ableton.v2.control_surface import ParameterInfo
from ableton.v2.control_surface.device_parameter_bank import *
from ableton.v2.control_surface.control import ControlList, MappedSensitivitySettingControl
from ableton.v2.control_surface.banking_util import *
from ableton.v2.control_surface.device_parameter_bank import DeviceParameterBank

from aumhaa.v2.control_surface.mod_devices import *
from aumhaa.v2.control_surface.mod import *
from aumhaa.v2.control_surface.elements import MonoEncoderElement, MonoBridgeElement, generate_strip_string, CodecEncoderElement
from aumhaa.v2.control_surface.components import DeviceNavigator, DeviceSelectorComponent  #, DeviceComponent
from aumhaa.v2.control_surface.elements.mono_button import *
from aumhaa.v2.control_surface.mono_modes import SendLividSysexMode, SendSysexMode, CancellableBehaviourWithRelease, ColoredCancellableBehaviourWithRelease, MomentaryBehaviour, BicoloredMomentaryBehaviour, DefaultedBehaviour
from aumhaa.v2.base import initialize_debug
from .parameter_mapping_sensitivities import parameter_mapping_sensitivity, fine_grain_parameter_mapping_sensitivity
from .Map import *

from aumhaa.v2.base.debug import initialize_debug

debug = initialize_debug()

DEVICE_COMPONENTS = ['device_0', 'device_1']


"""Custom files, overrides, and files from other scripts"""
from _Generic.Devices import *
from .Map import *


def xstr(s):
	if s is None:
		return ''
	else:
		return str(s)

def create_device_bank(device, banking_info):
	bank = None
	if liveobj_valid(device):
		if banking_info.has_bank_count(device):
			bank_class = MaxDeviceParameterBank
		elif banking_info.device_bank_definition(device) is not None:
			# bank_class = DescribedDeviceParameterBank
			bank_class = LargeDescribedDeviceParameterBank
		else:
			bank_class = DeviceParameterBank
		bank = bank_class(device=device, size=16, banking_info=banking_info)
	return bank


class LargeDescribedDeviceParameterBank(DescribedDeviceParameterBank):

	def _current_parameter_slots(self):
		if self.bank_count() > self.index+1:
			return self._definition.value_by_index(self.index).get(BANK_PARAMETERS_KEY)+self._definition.value_by_index(self.index+1).get(BANK_PARAMETERS_KEY) or tuple()
		else:
			return self._definition.value_by_index(self.index).get(BANK_PARAMETERS_KEY) or tuple()


class MaxParameterProxy(Component):

	def __init__(self, *a, **k):
		self._parameter = None
		super(MaxParameterProxy, self).__init__(*a, **k)

	def set_parameter(self, parameter):
		if parameter != self._parameter:
			if not self._parameter == None and self._parameter.value_has_listener(self._on_parameter_value_changed):
				self._parameter.remove_value_listener(self._on_parameter_value_changed)
			self._parameter = parameter
			if not self._parameter == None:
				self._parameter.add_value_listener(self._on_parameter_value_changed)
			self._on_parameter_value_changed()

	def _on_parameter_value_changed(self, *a):
		parameter = self._parameter
		# debug('parameter_value_changed:', parameter)
		if liveobj_valid(parameter):
			# value = int(parameter.value * 127)
			value = int(self.normalized_value)
			self.notify_parameter_value(parameter)
			self.notify_normalized_value(value)

	def set_value(self, value):
		parameter = self._parameter
		if liveobj_valid(parameter):
			parameter.value = float(float(float(value)/127) * float(parameter.max - parameter.min)) + parameter.min

	@listenable_property
	def parameter_value(self):
		parameter = self._parameter
		if liveobj_valid(parameter):
			value = parameter
			return value

	@listenable_property
	def normalized_value(self):
		parameter = self._parameter
		if liveobj_valid(parameter):
			value = ((parameter.value - parameter.min) / (parameter.max - parameter.min))  * 127
			return value


class UtilDeviceParameterComponent(DisplayingDeviceParameterComponent):
	controls = ControlList(MappedSensitivitySettingControl, 16)

	def __init__(self, *a, **k):
		self.parameter_proxies = [MaxParameterProxy(name = 'ParameterProxy_'+str(index)) for index in range(16)]
		super(UtilDeviceParameterComponent, self).__init__(*a, **k)
		self._parameter_name_data_sources = map(DisplayDataSource, (u'', u'', u'', u'', u'', u'', u'', u'',u'', u'', u'', u'', u'', u'', u'', u''))
		self._parameter_value_data_sources = map(DisplayDataSource, (u'', u'', u'', u'', u'', u'', u'', u'',u'', u'', u'', u'', u'', u'', u'', u''))

	def get_parameter_proxy(self, index):
		return self.parameter_proxies[index] if index < len(self.parameter_proxies) else None

	@listenable_property
	def current_parameters(self):
		return map(lambda p: p and hasattr(p.parameter, 'str_for_value') and str(p.parameter.str_for_value(p.parameter.value)).replace(' ', '_') or u'---', self._parameter_provider.parameters)

	@listenable_property
	def current_parameter_names(self):
		return map(lambda p: p and p.name.replace(' ', '_') or u'---', self.parameters)

	def _update_parameter_names(self):
		#debug('_update_parameter_names')
		super(UtilDeviceParameterComponent, self)._update_parameter_names()
		if self.is_enabled():
			names = self.current_parameter_names
			self.notify_current_parameter_names(*names)

	def _update_parameter_values(self):
		#debug('_update_parameter_values')
		super(UtilDeviceParameterComponent, self)._update_parameter_values()
		if self.is_enabled():
			values = self.current_parameters
			self.notify_current_parameters(*values)

	def _connect_parameters(self):
		super(UtilDeviceParameterComponent, self)._connect_parameters()
		parameters = self._parameter_provider.parameters[:16]
		for proxy, parameter_info in map(None, self.parameter_proxies, parameters):
			parameter = parameter_info.parameter if parameter_info else None
			# debug('proxy:', proxy, 'parameter:', parameter)
			proxy.set_parameter(parameter)


class UtilDeviceComponent(DeviceComponent):

	bank_up_button = ButtonControl()
	bank_down_button = ButtonControl()

	@bank_up_button.pressed
	def bank_up_button(self, button):
		self._on_bank_up_button_pressed(button)

	def _on_bank_up_button_pressed(self, button):
		self.bank_up()

	def bank_up(self):
		#debug('bank_up')
		self._device_bank_registry.set_device_bank(self._bank._device, min(self._bank.index + 1, self._bank.bank_count()))

	@bank_down_button.pressed
	def bank_down_button(self, button):
		self._on_bank_down_button_pressed(button)

	def _on_bank_down_button_pressed(self, button):
		self.bank_down()

	def bank_down(self):
		#debug('bank_down')
		self._device_bank_registry.set_device_bank(self._bank._device, max(0, self._bank.index - 1))

	def _create_parameter_info(self, parameter, name):
		device_class_name = self.device().class_name
		return ParameterInfo(parameter=parameter, name=name, default_encoder_sensitivity=parameter_mapping_sensitivity(parameter, device_class_name), fine_grain_encoder_sensitivity=fine_grain_parameter_mapping_sensitivity(parameter, device_class_name))


	def _setup_bank(self, device, bank_factory = create_device_bank):
		if self._bank is not None:
			self.disconnect_disconnectable(self._bank)
			self._bank = None
		if liveobj_valid(device):
			self._bank = self.register_disconnectable(bank_factory(device, self._banking_info))


class TrackCreatorComponent(Component):

	create_audio_track_button = ButtonControl()
	create_midi_track_button = ButtonControl()

	def __init__(self, *a, **k):
		super(TrackCreatorComponent, self).__init__(*a, **k)

	@create_audio_track_button.pressed
	def create_audio_track_button(self, button):
		self._on_create_audio_track_button_pressed(button)

	def _on_create_audio_track_button_pressed(self, button):
		self.create_audio_track()

	def create_audio_track(self):
		self.song.create_audio_track()

	@create_midi_track_button.pressed
	def create_midi_track_button(self, button):
		self._on_create_midi_track_button_pressed(button)

	def _on_create_midi_track_button_pressed(self, button):
		self.create_midi_track()

	def create_midi_track(self):
		self.song.create_midi_track()


class UtilAutoArmComponent(AutoArmComponent):

	util_autoarm_toggle_button = ButtonControl()
	__autoarm_enabled = False

	def __init__(self, *a, **k):
		super(UtilAutoArmComponent, self).__init__(*a, **k)

	def set_util_autoarm_toggle_button(self, button):
		self.util_autoarm_toggle_button.set_control_element(button)

	@util_autoarm_toggle_button.pressed
	def util_autoarm_toggle_button(self, button):
		self._on_util_autoarm_toggle_button_pressed(button)

	def _on_util_autoarm_toggle_button_pressed(self, button):
		self.toggle_autoarm()

	def toggle_autoarm(self):
		self.__autoarm_enabled = not self.__autoarm_enabled

	def autoarm_enabled(self):
		return self.__autoarm_enabled

	def can_auto_arm_track(self, track):
		return self.track_can_be_armed(track) and self.autoarm_enabled()


class UtilChannelStripComponent(ChannelStripComponent):

	util_mute_exclusive_button = ButtonControl()
	util_solo_exclusive_button = ButtonControl()
	util_arm_exclusive_button = ButtonControl()

	def __init__(self, *a, **k):
		super(UtilChannelStripComponent, self).__init__(*a, **k)


	def get_tracks(self):
		tracks = [track for track in self.song.tracks]
		for track in self.song.return_tracks:
			tracks.append(track)
		return tracks


	def set_util_mute_exclusive_button(self, button):
		self.util_mute_exclusive_button.set_control_element(button)

	@util_mute_exclusive_button.pressed
	def util_mute_exclusive_button(self, button):
		self._on_util_mute_exclusive_button_pressed(button)

	def _on_util_mute_exclusive_button_pressed(self, button):
		self.mute_exclusive()

	def mute_exclusive(self):
		if(self._track.mute is True):
			self._track.mute = False
		else:
			self._track.mute = True
			for t in self.get_tracks():
				if not t == self._track:
					t.mute = False


	def set_util_solo_exclusive_button(self, button):
		self.util_solo_exclusive_button.set_control_element(button)

	@util_solo_exclusive_button.pressed
	def util_solo_exclusive_button(self, button):
		self._on_util_solo_exclusive_button_pressed(button)

	def _on_util_solo_exclusive_button_pressed(self, button):
		self.solo_exclusive()

	def solo_exclusive(self):
		if(self._track.solo is True):
			self._track.solo = False
		else:
			self._track.solo = True
			for t in self.get_tracks():
				if not t == self._track:
					t.solo = False


	def set_util_arm_exclusive_button(self, button):
		self.util_arm_exclusive_button.set_control_element(button)

	@util_arm_exclusive_button.pressed
	def util_arm_exclusive_button(self, button):
		self._on_util_arm_exclusive_button_pressed(button)

	def _on_util_arm_exclusive_button_pressed(self, button):
		self.arm_exclusive()

	def arm_exclusive(self):
		if liveobj_valid(self._track) and self._track.can_be_armed:
			if(self._track.arm is True):
				self._track.arm = False
			else:
				self._track.arm = True
				for t in self.get_tracks():
					if not t == self._track:
						if liveobj_valid(t) and t.can_be_armed:
							t.arm = False


class UtilMixerComponent(MixerComponent):

	util_mute_kill_button = ButtonControl()
	util_solo_kill_button = ButtonControl()
	util_arm_kill_button = ButtonControl()
	util_mute_flip_button = ButtonControl()
	util_select_first_armed_track_button = ButtonControl()

	def __init__(self, *a, **k):
		super(UtilMixerComponent, self).__init__(*a, **k)

	def _reassign_tracks(self):
		super(UtilMixerComponent, self)._reassign_tracks()
		names = self.track_names
		self.notify_track_names(*names)

	@listenable_property
	def track_names(self):
		names = []
		for strip in self._channel_strips:
			if liveobj_valid(strip._track) and hasattr(strip._track, 'name'):
				names.append(strip._track.name)
			else:
				names.append('')
		return names

	def get_tracks(self):
		tracks = [track for track in self.song.tracks]
		for track in self.song.return_tracks:
			tracks.append(track)
		return tracks

	def armed_tracks(self):
		tracks = []
		for t in self.get_tracks():
			if liveobj_valid(t) and t.can_be_armed:
				if t.arm:
					tracks.append(t)
		return tracks


	def set_util_select_first_armed_track_button(self, button):
		self.util_select_first_armed_track_button.set_control_element(button)

	@util_select_first_armed_track_button.pressed
	def util_select_first_armed_track_button(self, button):
		self._on_util_select_first_armed_track_button_pressed(button)

	def _on_util_select_first_armed_track_button_pressed(self, button):
		self.select_first_armed_track()

	def select_first_armed_track(self):
		debug('select_first_armed_track')
		armed_tracks = self.armed_tracks()
		if len(armed_tracks):
			self.song.view.selected_track = armed_tracks[0]


	def set_util_mute_kill_button(self, button):
		self.util_mute_kill_button.set_control_element(button)

	@util_mute_kill_button.pressed
	def util_mute_kill_button(self, button):
		self._on_util_mute_kill_button_pressed(button)

	def _on_util_mute_kill_button_pressed(self, button):
		self.mute_kill()

	def mute_kill(self):
		for t in self.get_tracks():
			t.mute = False


	def set_util_mute_flip_button(self, button):
		self.util_mute_flip_button.set_control_element(button)

	@util_mute_flip_button.pressed
	def util_mute_flip_button(self, button):
		self._on_util_mute_flip_button_pressed(button)

	def _on_util_mute_flip_button_pressed(self, button):
		self.mute_flip()

	def mute_flip(self):
		for t in self.get_tracks():
			t.mute = not t.mute


	def set_util_solo_kill_button(self, button):
		self.util_solo_kill_button.set_control_element(button)

	@util_solo_kill_button.pressed
	def util_solo_kill_button(self, button):
		self._on_util_solo_kill_button_pressed(button)

	def _on_util_solo_kill_button_pressed(self, button):
		self.solo_kill()

	def solo_kill(self):
		for t in self.get_tracks():
			t.solo = False


	def set_util_arm_kill_button(self, button):
		self.util_arm_kill_button.set_control_element(button)

	@util_arm_kill_button.pressed
	def util_arm_kill_button(self, button):
		self._on_util_arm_kill_button_pressed(button)

	def _on_util_arm_kill_button_pressed(self, button):
		self.arm_kill()

	def arm_kill(self):
		for t in self.get_tracks():
			if liveobj_valid(t) and t.can_be_armed:
				t.arm = False


class UtilSessionComponent(SessionComponent):

	util_capture_new_scene_button = ButtonControl()
	util_fire_next_button = ButtonControl()
	util_fire_prev_button = ButtonControl()
	util_fire_next_absolute_button = ButtonControl()
	util_fire_prev_absolute_button = ButtonControl()
	util_fire_next_on_single_armed_button = ButtonControl()
	util_fire_next_on_all_armed_button = ButtonControl()
	util_select_playing_clipslot_button = ButtonControl()
	util_stop_clip_button = ButtonControl()
	util_new_scene_button = ButtonControl()


	def __init__(self, *a, **k):
		super(UtilSessionComponent, self).__init__(*a, **k)

	def get_tracks(self):
		return [track for track in self.song.tracks]

	def set_util_capture_new_scene_button(self, button):
		self.util_capture_new_scene_button.set_control_element(button)

	@util_capture_new_scene_button.pressed
	def util_capture_new_scene_button(self, button):
		self._on_util_capture_new_scene_button_pressed(button)

	def _on_util_capture_new_scene_button_pressed(self, button):
		if self.is_enabled() and self._prepare_new_action():
			song = self.song
			view = song.view
			try:
				if liveobj_valid(view.highlighted_clip_slot.clip):
					song.capture_and_insert_scene(Live.Song.CaptureMode.all)
			except Live.Base.LimitationError:
				pass

	def _prepare_new_action(self):
		song = self.song
		selected_track = song.view.selected_track
		if selected_track.can_be_armed:
			song.overdub = False
			return True


	def set_util_stop_clip_button(self, button):
		self.util_stop_clip_button.set_control_element(button)

	@util_stop_clip_button.pressed
	def util_stop_clip_button(self, button):
		self._on_util_stop_clip_button_pressed(button)

	def _on_util_stop_clip_button_pressed(self, button):
		self.stop_selected_track()

	def stop_selected_track(self):
		debug('stop_selected_track')
		self.song.view.selected_track.stop_all_clips()


	def set_util_fire_next_button(self, button):
		self.util_fire_next_button.set_control_element(button)

	@util_fire_next_button.pressed
	def util_fire_next_button(self, button):
		self._on_util_fire_next_button_pressed(button)

	def _on_util_fire_next_button_pressed(self, button):
		self.fire_next_available_clip_slot()


	def set_util_fire_prev_button(self, button):
		self.util_fire_prev_button.set_control_element(button)

	@util_fire_prev_button.pressed
	def util_fire_prev_button(self, button):
		self._on_util_fire_prev_button_pressed(button)

	def _on_util_fire_prev_button_pressed(self, button):
		self.fire_previous_available_clip_slot()


	def set_util_fire_next_absolute_button(self, button):
		self.util_fire_next_absolute_button.set_control_element(button)

	@util_fire_next_absolute_button.pressed
	def util_fire_next_absolute_button(self, button):
		self._on_util_fire_next_absolute_button_pressed(button)

	def _on_util_fire_next_absolute_button_pressed(self, button):
		self.fire_next_clip_slot()


	def set_util_fire_prev_absolute_button(self, button):
		self.util_fire_prev_absolute_button.set_control_element(button)

	@util_fire_prev_absolute_button.pressed
	def util_fire_prev_absolute_button(self, button):
		self._on_util_fire_prev_absolute_button_pressed(button)

	def _on_util_fire_prev_absolute_button_pressed(self, button):
		self.fire_previous_clip_slot()


	def set_util_fire_next_on_single_armed_button(self, button):
		self.util_fire_next_on_single_armed_button.set_control_element(button)

	@util_fire_next_on_single_armed_button.pressed
	def util_fire_next_on_single_armed_button(self, button):
		self._on_util_fire_next_on_single_armed_button_pressed(button)

	def _on_util_fire_next_on_single_armed_button_pressed(self, button):
		self.fire_next_available_clip_slot_on_single_armed_track()


	def set_util_fire_next_on_all_armed_button(self, button):
		self.util_fire_next_on_all_armed_button.set_control_element(button)

	@util_fire_next_on_all_armed_button.pressed
	def util_fire_next_on_all_armed_button(self, button):
		self._on_util_fire_next_on_all_armed_button_pressed(button)

	def _on_util_fire_next_on_all_armed_button_pressed(self, button):
		self.fire_next_available_clip_slot_on_all_armed_tracks()


	def get_clip_slot_by_delta_bool(self, current_clip_slot, track, d_value, bool_callable):
		clip_slots = track.clip_slots
		max_clip_slots = len(clip_slots)

		found = False
		if d_value > 0:
			the_range = range(max_clip_slots)
		else:
			the_range = range(max_clip_slots-1, -1, -1)

		for i in the_range:
			clip_slot = clip_slots[i]
			if found and bool_callable(clip_slot):
				return clip_slot

			if clip_slot == current_clip_slot:
				found = True


	def fire_clip_slot_by_delta(self, d_value, available):
		current_clip_slot = self.song.view.highlighted_clip_slot
		track = self.song.view.selected_track

		if available:
			if track.arm:
				clip_slot = self.get_clip_slot_by_delta_bool(current_clip_slot, track, d_value, lambda x: x.has_stop_button and not x.has_clip)
			else:
				clip_slot = self.get_clip_slot_by_delta_bool(current_clip_slot, track, d_value, lambda x: x.has_clip)
		else:
			clip_slot = self.get_clip_slot_by_delta_bool(current_clip_slot, track, d_value, lambda x: True)

		if clip_slot:
			clip_slot.fire()
			self.song.view.highlighted_clip_slot = clip_slot


	def fire_clip_slot_by_delta_with_explicit_track(self, d_value, available, track):
		current_scene = self.song.view.selected_scene
		scenes = list(self.song.scenes)
		current_scene_index = scenes.index(current_scene)
		current_clip_slot = track.clip_slots[current_scene_index]

		#debug('fire_clip_slot_by_delta_with_explicit_track:', track)

		if available:
			if track.arm:
				clip_slot = self.get_clip_slot_by_delta_bool(current_clip_slot, track, d_value, lambda x: x.has_stop_button and not x.has_clip)
			else:
				clip_slot = self.get_clip_slot_by_delta_bool(current_clip_slot, track, d_value, lambda x: x.has_clip)
		else:
			clip_slot = self.get_clip_slot_by_delta_bool(current_clip_slot, track, d_value, lambda x: True)

		#debug('clipslot:', clip_slot)
		if clip_slot:
			clip_slot.fire()


	def fire_next_clip_slot(self):
		# debug('fire_next_clip_slot')
		self.fire_clip_slot_by_delta(1, False)

	def fire_next_available_clip_slot(self):
		# debug('fire_next_available_clip_slot')
		self.fire_clip_slot_by_delta(1, True)

	def fire_previous_clip_slot(self):
		# debug('fire_previous_clip_slot')
		self.fire_clip_slot_by_delta(-1, False)

	def fire_previous_available_clip_slot(self):
		# debug('fire_previous_available_clip_slot')
		self.fire_clip_slot_by_delta(-1, True)

	def fire_next_available_clip_slot_on_single_armed_track(self):
		# debug('fire_next_available_clip_slot_on_single_armed_track')
		tracks = self.get_tracks()
		armed_tracks = self.armed_tracks()
		selected_track = self.song.view.selected_track
		if selected_track in armed_tracks:
			self.fire_next_available_clip_slot()
		else:
			selected_index = tracks.index(selected_track) if selected_track in tracks else 0
			# debug('selected_index:', selected_index)
			if len(tracks) > selected_index:
				for track in tracks[selected_index:]:
					if track.can_be_armed and track.arm is True:
						self.fire_clip_slot_by_delta_with_explicit_track(1, True, track)
						break


	def fire_next_available_clip_slot_on_all_armed_tracks(self):
		# debug('fire_next_available_clip_slot_on_all_armed_tracks')
		armed_tracks = self.armed_tracks()
		# debug('armed_tracks:', len(armed_tracks))
		for track in armed_tracks:
			self.fire_clip_slot_by_delta_with_explicit_track(1, True, track)


	def set_util_select_playing_clipslot_button(self, button):
		self.util_select_playing_clipslot_button.set_control_element(button)

	@util_select_playing_clipslot_button.pressed
	def util_select_playing_clipslot_button(self, button):
		self._on_util_select_playing_clipslot_button_pressed(button)

	def _on_util_select_playing_clipslot_button_pressed(self, button):
		self.select_playing_clip()

	def select_playing_clip(self):
		# debug('select_playing_clip')
		for clip_slot in self.song.view.selected_track.clip_slots:
			if clip_slot.has_clip and clip_slot.clip.is_playing:
				self.song.view.highlighted_clip_slot = clip_slot

	def armed_tracks(self):
		tracks = []
		for t in self.get_tracks():
			if liveobj_valid(t) and t.can_be_armed:
				if t.arm is True:
					tracks.append(t)
		return tracks


class UtilSessionRingComponent(SessionRingComponent):

	def __init__(self, *a, **k):
		super(UtilSessionRingComponent, self).__init__(*a, **k)
		self._on_offsets_changed.subject = self

	@listens('offset')
	def _on_offsets_changed(self, track_offset, scene_offset):
		self.notify_offsets(self.track_offset, self.scene_offset)

	@listenable_property
	def offsets(self):
		return (self.track_offset, self.scene_offset)


class UtilViewControlComponent(ViewControlComponent):

	toggle_clip_detail_button = ButtonControl()
	toggle_detail_clip_loop_button = ButtonControl()

	def __init__(self, *a, **k):
		super(UtilViewControlComponent, self).__init__(*a, **k)

	def set_toggle_clip_detail_button(self, button):
		self.toggle_clip_detail_button.set_control_element(button)

	@toggle_clip_detail_button.pressed
	def toggle_clip_detail_button(self, button):
		self._on_toggle_clip_detail_button_pressed(button)

	def _on_toggle_clip_detail_button_pressed(self, button):
		self.toggle_clip_detail()

	def toggle_clip_detail(self):
		app_view = self.application.view
		if app_view.is_view_visible(u'Detail/Clip') and app_view.is_view_visible(u'Detail'):
			app_view.hide_view(u'Detail/Clip')
			app_view.hide_view(u'Detail')
		else:
			self.show_view(u'Detail/Clip')

	def set_toggle_detail_clip_loop_button(self, button):
		self.toggle_detail_clip_loop_button.set_control_element(button)

	@toggle_detail_clip_loop_button.pressed
	def toggle_detail_clip_loop_button(self, button):
		self._on_toggle_detail_clip_loop_button_pressed(button)

	def _on_toggle_detail_clip_loop_button_pressed(self, button):
		self.toggle_detail_clip_loop()

	def toggle_detail_clip_loop(self):
		detail_clip = self.song.view.detail_clip
		if liveobj_valid(detail_clip) and hasattr(detail_clip, 'looping'):
			detail_clip.looping = not detail_clip.looping


class Util(ControlSurface):

	bank_definitions = BANK_DEFINITIONS

	def __init__(self, c_instance, *a, **k):
		super(Util, self).__init__(c_instance, *a, **k)
		self.log_message = logger.warning
		self.log_message('<<<<<<<<<<<<<<<<<<<<<<<<< Util log opened >>>>>>>>>>>>>>>>>>>>>>>>>')
		self.show_message('Util Control Surface Loaded')
		#self._controls = []
		self._skin = Skin(UtilColors)
		with self.component_guard():
		#	self._setup_m4l_interface()
			self._setup_monobridge()
			self._setup_controls()
			self._setup_autoarm()
			self._setup_session_control()
			self._setup_mixer_control()
			self._setup_track_creator()
			self._setup_undo_redo()
			self._setup_view_control()
			self._setup_transport()
			self._setup_device_controls()
			self._setup_main_modes()
			self._initialize_script()

	@listenable_property
	def pipe(self):
		return None

	def _send(self, **a):
		notify_pipe(a)


	def _initialize_script(self):
		self._main_modes.set_enabled(True)
		self._main_modes.selected_mode = 'Main'
		#debug('_selected_strip.is_enabled:', self._mixer._selected_strip.is_enabled())


	def _setup_monobridge(self):
		self._monobridge = MonoBridgeElement(self)
		self._monobridge.name = 'MonoBridge'


	def _setup_controls(self):
		is_momentary = False
		optimized = True
		resource = PrioritizedResource
		self._button = [ButtonElement(is_momentary = is_momentary, msg_type = MIDI_NOTE_TYPE, channel = CHANNEL, identifier = UTIL_BUTTONS[index], name = 'Button_' + str(index), optimized_send_midi = optimized, resource_type = resource, skin = self._skin) for index in range(50)]
		self._fader = EncoderElement(msg_type = MIDI_CC_TYPE, channel = CHANNEL, identifier = 0, map_mode = Live.MidiMap.MapMode.absolute, name = 'Fader', resource_type = resource)
		self._track_select_matrix = ButtonMatrixElement(name = 'TrackSelectMatrix', rows = [self._button[34:42]])
		self._encoder = [EncoderElement(msg_type = MIDI_CC_TYPE, channel = CHANNEL, identifier = index, map_mode = Live.MidiMap.MapMode.absolute) for index in range(1,17)]
		self._encoder_matrix = ButtonMatrixElement(name = 'Dial_Matrix', rows = [self._encoder]) #, self._encoder[8:]])


	def _setup_autoarm(self):
		self._autoarm = UtilAutoArmComponent(name='Auto_Arm')
		self._autoarm.layer = Layer(util_autoarm_toggle_button = self._button[16])
		self._autoarm.set_enabled(False)
		#self._auto_arm._can_auto_arm_track = self._can_auto_arm_track


	def _tracks_to_use(self):
		return self.song.visible_tracks + self.song.return_tracks


	def _setup_session_control(self):
		self._session_ring = UtilSessionRingComponent(num_tracks = 8, num_scenes = 1, tracks_to_use = self._tracks_to_use)
		self._session_ring.set_enabled(False)

		self._session_navigation = SessionNavigationComponent(name = 'SessionNavigation', session_ring = self._session_ring)
		self._session_navigation.layer = Layer(left_button = self._button[32], right_button = self._button[33])
		self._session_navigation.set_enabled(False)

		# self._session_recording = SessionRecordingComponent(name = 'SessionRecording')
		# self._session_recording.layer = Layer(scene_list_new_button = self._button[8])
		# self._session_recording.set_enabled(False)

		self._session = UtilSessionComponent(session_ring = self._session_ring, auto_name = True)
		self._session.layer = Layer(util_fire_next_button = self._button[3],
			util_fire_prev_button = self._button[4],
			util_stop_clip_button = self._button[5],
			stop_all_clips_button = self._button[6],
			util_select_playing_clipslot_button = self._button[7],
			util_capture_new_scene_button = self._button[8],
			util_fire_next_absolute_button = self._button[24],
			util_fire_prev_absolute_button = self._button[25],
			util_fire_next_on_single_armed_button = self._button[26],
			util_fire_next_on_all_armed_button = self._button[27])

		self._session.set_enabled(False)


	def _setup_mixer_control(self):
		self._mixer = UtilMixerComponent(name = 'Mixer', tracks_provider = self._session_ring, track_assigner = SimpleTrackAssigner(), auto_name = True, channel_strip_component_type = UtilChannelStripComponent)
		self._mixer.layer = Layer(util_arm_kill_button = self._button[9], util_mute_kill_button = self._button[10], util_solo_kill_button = self._button[11], util_mute_flip_button = self._button[12], util_select_first_armed_track_button = self._button[23], track_select_buttons = self._track_select_matrix)
		self._mixer._selected_strip.layer = Layer(volume_control = self._fader, arm_button = self._button[0], mute_button = self._button[1], solo_button = self._button[2], util_arm_exclusive_button = self._button[13], util_mute_exclusive_button = self._button[14], util_solo_exclusive_button = self._button[15])
		self._mixer.set_enabled(False)


	def _setup_track_creator(self):
		self._track_creator = TrackCreatorComponent()
		self._track_creator.layer = Layer(create_audio_track_button = self._button[18], create_midi_track_button = self._button[19])


	def _setup_undo_redo(self):
		self._undo_redo = UndoRedoComponent()
		self._undo_redo.layer = Layer(undo_button = self._button[20], redo_button = self._button[21])


	def _setup_view_control(self):
		self._view_control = UtilViewControlComponent()
		self._view_control.layer = Layer(toggle_clip_detail_button = self._button[17], toggle_detail_clip_loop_button = self._button[22], prev_track_button = self._button[28], next_track_button = self._button[29])

	def _setup_transport(self):
		self._transport = TransportComponent()
		self._transport.layer = Layer(play_button = self._button[30], stop_button = self._button[31])

	def _setup_device_controls(self):
		self._device_bank_registry = DeviceBankRegistry()
		self._device_decorator = DeviceDecoratorFactory()
		self._banking_info = BankingInfo(self.bank_definitions)
		self._parameter_provider  = UtilDeviceComponent(device_provider = self._device_provider,
													device_decorator_factory = self._device_decorator,
													device_bank_registry = self._device_bank_registry,
													banking_info = self._banking_info,
													name = u"DeviceComponent")
		self._parameter_provider.layer = Layer(bank_up_button = self._button[44], bank_down_button = self._button[43])
		self._device = UtilDeviceParameterComponent(parameter_provider = self._parameter_provider)
		self._device.layer = Layer(parameter_controls = self._encoder_matrix)
		self._device.set_enabled(False)

	def _setup_main_modes(self):
		self._main_modes = ModesComponent(name = 'MainModes')
		self._main_modes.add_mode('disabled', [])
		self._main_modes.add_mode('Main', [self._device, self._session_ring, self._transport, self._view_control, self._undo_redo, self._track_creator, self._mixer, self._mixer._selected_strip, self._session, self._session_navigation, self._autoarm])
		self._main_modes.selected_mode = 'disabled'
		self._main_modes.set_enabled(False)

	def _can_auto_arm_track(self, track):
		routing = track.current_input_routing
		#return routing == 'Ext: All Ins' or routing == 'All Ins'
		return False

	def _do_send_midi(self, midi_event_bytes):
		super(Util, self)._do_send_midi(midi_event_bytes)
		bytes = list(midi_event_bytes)
		self.notify_pipe('midi', *bytes)

	def receive_note(self, num, val):
		# debug('receive_note', num, val)
		self.receive_midi(tuple([144, num, val]))

	def receive_cc(self, num, val):
		debug('receive_cc', num, val)
		self.receive_midi(tuple([176, num, val]))

	def load_preset(self, target = None, folder = None, directory = 'defaultPresets'):
		debug('load_preset()', target, folder, directory)
		if not target is None:
			browser = Live.Application.get_application().browser ##if not self.application.view.browse_mode else self.application.browser.hotswap_target
			user_folders = browser.user_folders
			for item in user_folders:
				if item.name == directory:
					if not folder is None:
						folder_target = None
						item_iterator = item.iter_children
						inneritems = [inneritem for inneritem in item_iterator]
						for inneritem in inneritems:
							if inneritem.name == folder:
								folder_target = inneritem
								break
						if folder_target:
							item_iterator = folder_target.iter_children
							inneritems = [inneritem for inneritem in item_iterator]
							for inneritem in inneritems:
								if isinstance(target, int):
									if target < len(inneritems):
										if inneritems[target].is_loadable:
											browser.load_item(inneritems[target])
											break
										elif inneritems[target].is_folder:
											debug(inneritems[target], '.is_folder')
											innertarget = inneritems[target]
											innertarget_iterator = innertarget.iter_children
											innertargetitems = [innertargetitem for innertargetitem in innertarget_iterator]
											debug('innertargetitems:', innertargetitems)
											if len(innertargetitems)>0 and innertargetitems[0].is_loadable:
												browser.load_item(innertargetitems[0])
												break
											else:
												debug(innertargetitems[0], 'item isnt loadable 0')
												break
										else:
											debug(inneritems[target], 'item isnt loadable 1')
											break
								else:
									if inneritem.name == target:
										if inneritem.is_loadable:
											browser.load_item(inneritem)
										else:
											debug(inneritem, 'item isnt loadable 2')
										break
					else:
							item_iterator = item.iter_children
							inneritems = [inneritem for inneritem in item_iterator]
							for inneritem in inneritems:
								if isinstance(target, int):
									if target < len(inneritems):
										if inneritems[target].is_loadable:
											browser.load_item(inneritems[target])
											break
										else:
											debug(inneritems[target], 'item isnt loadable 3')
											break
								else:
									if inneritem.name == target:
										if inneritem.is_loadable:
											browser.load_item(inneritem)
											break
										else:
											debug(inneritem, 'item isnt loadable 4')
											break
