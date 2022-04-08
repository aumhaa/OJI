# by amounra 0420 : http://www.aumhaa.com
# written against Live 10.1.9 release on 040520


import Live
import time
import math
import logging
logger = logging.getLogger(__name__)

from future.moves.itertools import zip_longest
#from itertools import izip, izip_longest, product
from ableton.v2.control_surface.control_surface import ControlSurface, DeviceBankRegistry
from ableton.v2.control_surface.device_decorator_factory import DeviceDecoratorFactory

from ableton.v2.control_surface.default_bank_definitions import BANK_DEFINITIONS
from ableton.v2.base import inject, listens, listens_group, liveobj_valid
from ableton.v2.control_surface import ControlSurface, ControlElement, Layer, Skin, PrioritizedResource, Component, ClipCreator, BANK_MAIN_KEY, BANK_PARAMETERS_KEY, use
from ableton.v2.control_surface.elements import ButtonElement, ComboElement, EncoderElement, DisplayDataSource
from ableton.v2.control_surface.components import ClipSlotComponent, SessionComponent, ViewControlComponent, SessionRingComponent, SessionNavigationComponent, MixerComponent, ChannelStripComponent, UndoRedoComponent, TransportComponent, DeviceNavigationComponent
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


# from Push2.device_navigation import DeviceNavigationComponent
# from Push2.track_list import TrackListComponent
from Push2.track_selection import SessionRingTrackProvider
from Push2.device_parameter_bank_with_options import DescribedDeviceParameterBankWithOptions

from aumhaa.v2.control_surface.mod_devices import *
from aumhaa.v2.control_surface.mod import *
from aumhaa.v2.control_surface.elements import MonoButtonElement, MonoEncoderElement, MonoBridgeElement, generate_strip_string, CodecEncoderElement
# from aumhaa.v2.control_surface.components import MonoMixerComponent  #, DeviceSelectorComponent, DeviceComponent
from aumhaa.v2.control_surface.components.mono_mixer import MonoMixerComponent, MonoChannelStripComponent
from aumhaa.v2.control_surface.elements.mono_button import *
from aumhaa.v2.control_surface.elements.mono_encoder import *
from aumhaa.v2.control_surface.mono_modes import SendLividSysexMode, SendSysexMode, CancellableBehaviourWithRelease, ColoredCancellableBehaviourWithRelease, MomentaryBehaviour, BicoloredMomentaryBehaviour, DefaultedBehaviour
from aumhaa.v2.control_surface.components.fixed_length_recorder import FixedLengthSessionRecordingComponent
from aumhaa.v2.base import initialize_debug
from .loop_selector_component import LoopSelectorComponent
from .parameter_mapping_sensitivities import parameter_mapping_sensitivity, fine_grain_parameter_mapping_sensitivity
from .track_list import TrackListComponent
from .device_navigation import DeviceNavigationComponent as UtilDeviceNavigationComponent
from .device_provider import DeviceProvider as SpecialDeviceProvider
from .Map import *

from aumhaa.v2.base.debug import initialize_debug

debug = initialize_debug()

DEVICE_COMPONENTS = ['device_0', 'device_1']
LENGTH_VALUES = [2, 3, 4]

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


# class UtilDeviceNavigationComponent(DeviceNavigationComponent):
#
# 	@listenable_property
# 	def item_names(self):
# 		items = [str(item.name).replace(' ', '_') if hasattr(item, 'name') else '---' for item in self.items]
# 		return items
#
# 	def update_items(self):
# 		super(UtilDeviceNavigationComponent, self).update_items()
# 		names = self.item_names
# 		self.notify_item_names(*names)
#

class SpecialEncoderElement(EncoderElement):

	def connect_to(self, parameter):
		self.remove_parameter_listener()
		super(SpecialEncoderElement, self).connect_to(parameter)
		self.add_parameter_listener()
		self._on_parameter_value_changed()
		self.notify_parameter_name()

	def add_parameter_listener(self, *a):
		if liveobj_valid(self._parameter_to_map_to) and not self._parameter_to_map_to.value_has_listener(self._on_parameter_value_changed):
			self._parameter_to_map_to.add_value_listener(self._on_parameter_value_changed)

	def remove_parameter_listener(self, *a):
		if liveobj_valid(self._parameter_to_map_to) and self._parameter_to_map_to.value_has_listener(self._on_parameter_value_changed):
			self._parameter_to_map_to.remove_value_listener(self._on_parameter_value_changed)

	def _on_parameter_value_changed(self, *a):
		self.notify_parameter_value(self.parameter_value)
		self.notify_normalized_parameter_value(self.normalized_parameter_value)

	@listenable_property
	def parameter_name(self):
		parameter = self._parameter_to_map_to
		if liveobj_valid(parameter):
			try:
				name = str(parameter.name)
				return name
			except:
				return '-'

	@listenable_property
	def parameter_value(self):
		parameter = self._parameter_to_map_to
		if liveobj_valid(parameter):
			try:
				value = str(parameter.str_for_value(parameter.value)).replace(' ', '_')
				return value
			except:
				return '-'

	@listenable_property
	def normalized_parameter_value(self):
		parameter = self._parameter_to_map_to
		if liveobj_valid(parameter):
			value = int(((parameter.value - parameter.min) / (parameter.max - parameter.min))  * 127)
			return value

	def set_normalized_value(self, value):
		parameter = self._parameter_to_map_to
		if liveobj_valid(parameter):
			newval = float(float(float(value)/127) * float(parameter.max - parameter.min)) + parameter.min
			parameter.value = newval
		else:
			self.receive_value(value)

	def set_value(self, value):
		parameter = self._parameter_to_map_to
		if liveobj_valid(parameter):
			newval = float(value * (parameter.max - parameter.min)) + parameter.min
			parameter.value = newval
		else:
			self.receive_value(int(value*127))


class SpecialMonoButtonElement(MonoButtonElement):

	def __init__(self, *a, **k):
		self._text = ''
		super(SpecialMonoButtonElement, self).__init__(*a, **k)

	@listenable_property
	def text(self):
		return str(self._text)

	def set_text(self, text = ''):
		# debug('button text:', self._text)
		# self._text = text.encode('utf-8', 'ignore')
		self._text = str(text)
		self.notify_text(self._text)

	def reset(self):
		super(SpecialMonoButtonElement, self).reset()
		self._text = ''
		self.notify_text(self._text)


class LargeDescribedDeviceParameterBank(DescribedDeviceParameterBankWithOptions):

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
		self._parameter_name_data_sources = list(map(DisplayDataSource, ('', '', '', '', '', '', '', '','', '', '', '', '', '', '', '')))
		self._parameter_value_data_sources = list(map(DisplayDataSource, ('', '', '', '', '', '', '', '','', '', '', '', '', '', '', '')))

	def get_parameter_proxy(self, index):
		return self.parameter_proxies[index] if index < len(self.parameter_proxies) else None

	@listenable_property
	def current_parameters(self):
		return [p and hasattr(p.parameter, 'str_for_value') and str(p.parameter.str_for_value(p.parameter.value)).replace(' ', '_') or '---' for p in self._parameter_provider.parameters]

	@listenable_property
	def current_parameter_names(self):
		return [p and p.name.replace(' ', '_') or '---' for p in self.parameters]

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
		# debug('parameters are:', parameters)
		for proxy, parameter_info in zip(self.parameter_proxies, parameters):
			# debug('here')
			parameter = parameter_info.parameter if parameter_info else None
			# debug('proxy:', proxy, 'parameter:', parameter)
			if proxy:
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

	@listenable_property
	def options(self):
		return getattr(self._bank, 'options', [None] * 7)

	@property
	def bank_view_description(self):
		return getattr(self._bank, 'bank_view_description', '')

	@listenable_property
	def device_name(self):
		device = self.device()
		name = str(device.name).replace(' ', '_') if liveobj_valid(device) and hasattr(device, 'name') else '-'
		return name

	def _on_device_changed(self, device):
		super(UtilDeviceComponent, self)._on_device_changed(device)
		self.notify_device_name(self.device_name)


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
		# self._keysplitter_disable_autoarm = False
		super(UtilAutoArmComponent, self).__init__(*a, **k)
		self._update_autoarm_toggle_button.subject = self

	def set_util_autoarm_toggle_button(self, button):
		self.util_autoarm_toggle_button.set_control_element(button)

	@util_autoarm_toggle_button.pressed
	def util_autoarm_toggle_button(self, button):
		self._on_util_autoarm_toggle_button_pressed(button)

	def _on_util_autoarm_toggle_button_pressed(self, button):
		self.toggle_autoarm()

	def toggle_autoarm(self):
		self.__autoarm_enabled = not self.__autoarm_enabled
		#debug('toggle_autoarm')
		self.notify_autoarm_enabled()
		self.update()

	@listenable_property
	def autoarm_enabled(self):
		return self.__autoarm_enabled

	def can_auto_arm_track(self, track):
		# if self._keysplitter_disable_autoarm:
		# 	return False
		# else:
		return self.track_can_be_armed(track) and self.autoarm_enabled

	@listens('autoarm_enabled')
	def _update_autoarm_toggle_button(self, *a):
		#debug('_update_autoarm_toggle_button')
		self.util_autoarm_toggle_button.color = 'Auto_Arm.Enabled' if self.autoarm_enabled else 'Auto_Arm.Disabled'

	# def update(self):
	# 	if not self._keysplitter_disable_autoarm:
	# 		super(UtilAutoArmComponent, self).update()
	# 	else:
	# 		debug('autoarm.update(), keysplitter disabled')



class UtilChannelStripComponent(MonoChannelStripComponent):

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


class UtilMixerComponent(MonoMixerComponent):

	util_mute_kill_button = ButtonControl()
	util_solo_kill_button = ButtonControl()
	util_arm_kill_button = ButtonControl()
	util_mute_flip_button = ButtonControl()
	util_select_first_armed_track_button = ButtonControl()
	util_lower_all_track_volumes_button = ButtonControl()

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
				try:
					names.append(str(strip._track.name).replace(' ', '_'))
				except:
					names.append('-')
			else:
				names.append('-')
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

	def set_util_lower_all_track_volumes_button(self, button):
		self.util_lower_all_track_volumes_button.set_control_element(button)

	@util_lower_all_track_volumes_button.pressed
	def util_lower_all_track_volumes_button(self, button):
		self._on_util_lower_all_track_volumes_button_pressed(button)

	def _on_util_lower_all_track_volumes_button_pressed(self, button):
		self.lower_all_track_volumes()

	def lower_all_track_volumes(self):
		debug('lower_all_track_volumes')
		for t in self.get_tracks():
			if liveobj_valid(t) and t.has_audio_output:
				t.mixer_device.volume.value = t.mixer_device.volume.value*.95


class UtilSessionComponent(SessionComponent):

	util_capture_new_scene_button = ButtonControl()
	util_fire_next_button = ButtonControl()
	util_fire_prev_button = ButtonControl()
	util_fire_next_absolute_button = ButtonControl()
	util_fire_prev_absolute_button = ButtonControl()
	util_fire_next_on_single_armed_button = ButtonControl(color = "Session.FireNextArm")
	util_fire_next_on_all_armed_button = ButtonControl()
	util_select_playing_clipslot_button = ButtonControl()
	util_stop_clip_button = ButtonControl()
	util_new_scene_button = ButtonControl()
	util_select_playing_on_single_armed_button = ButtonControl()


	def __init__(self, *a, **k):
		super(UtilSessionComponent, self).__init__(*a, **k)

	def get_tracks(self):
		return [track for track in self.song.tracks]

	def set_util_capture_new_scene_button(self, button):
		self.util_capture_new_scene_button.set_control_element(button)

	@util_capture_new_scene_button.pressed
	def util_capture_new_scene_button(self, button):
		self._on_util_capture_new_scene_button_pressed(button)

	def _on_util_capture_new_scene_button_pressed(self, button=None):
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


	def set_util_select_playing_on_single_armed_button(self, button):
		self.util_select_playing_on_single_armed_button.set_control_element(button)

	@util_select_playing_on_single_armed_button.pressed
	def util_select_playing_on_single_armed_button(self, button):
		self._on_util_select_playing_on_single_armed_button_pressed(button)

	def _on_util_select_playing_on_single_armed_button_pressed(self, button):
		self.select_playing_clip_slot_on_single_armed_track()


	def set_util_fire_next_on_all_armed_button(self, button):
		self.util_fire_next_on_all_armed_button.set_control_element(button)

	@util_fire_next_on_all_armed_button.pressed
	def util_fire_next_on_all_armed_button(self, button):
		self._on_util_fire_next_on_all_armed_button_pressed(button)

	def _on_util_fire_next_on_all_armed_button_pressed(self, button):
		self.fire_next_available_clip_slot_on_all_armed_tracks()


	def get_first_available_clip(self, track):
		clip_slots = track.clip_slots
		for slot in clip_slots:
			if slot.has_clip:
				return slot
		return None


	def get_first_empty_clipslot(self, track):
		clip_slots = track.clip_slots
		for slot in clip_slots:
			if not slot.has_clip:
				return slot
		return None


	def get_clip_slot_by_delta_bool(self, current_clip_slot, track, d_value, bool_callable):
		clip_slots = track.clip_slots
		max_clip_slots = len(clip_slots)

		found = False
		if d_value > 0:
			the_range = list(range(max_clip_slots))
		else:
			the_range = list(range(max_clip_slots-1, -1, -1))

		for i in the_range:
			clip_slot = clip_slots[i]
			if found and bool_callable(clip_slot):
				return clip_slot

			if clip_slot == current_clip_slot:
				found = True


	def fire_clip_slot_by_delta(self, d_value, available=False, create=False):
		current_clip_slot = self.song.view.highlighted_clip_slot
		track = self.song.view.selected_track
		if d_value is 1 and create is True:
			clip_slots = track.clip_slots
			if clip_slots[-1] == current_clip_slot:
				# self._on_util_capture_new_scene_button_pressed()
				debug('creating new scene...')
				self.song.create_scene(-1)

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


	def fire_clip_slot_by_delta_with_explicit_track(self, d_value, track, available=False, create=False, select=False):
		current_scene = self.song.view.selected_scene
		scenes = list(self.song.scenes)
		current_scene_index = scenes.index(current_scene)
		current_clip_slot = track.clip_slots[current_scene_index]
		if d_value is 1 and create is True:
			clip_slots = track.clip_slots
			if clip_slots[-1] == current_clip_slot:
				self.song.create_scene(-1)

		if available:
			if track.arm:
				clip_slot = self.get_clip_slot_by_delta_bool(current_clip_slot, track, d_value, lambda x: x.has_stop_button and not x.has_clip)
			else:
				clip_slot = self.get_clip_slot_by_delta_bool(current_clip_slot, track, d_value, lambda x: x.has_clip)
		else:
			clip_slot = self.get_clip_slot_by_delta_bool(current_clip_slot, track, d_value, lambda x: True)

		if clip_slot:
			clip_slot.fire()
			if select:
				self.song.view.highlighted_clip_slot = clip_slot


	def fire_next_clip_slot(self):
		# debug('fire_next_clip_slot')
		self.fire_clip_slot_by_delta(1, available=False)

	def fire_next_available_clip_slot(self):
		# debug('fire_next_available_clip_slot')
		self.fire_clip_slot_by_delta(1, available=True, create=True)

	def fire_previous_clip_slot(self):
		# debug('fire_previous_clip_slot')
		self.fire_clip_slot_by_delta(-1, available=False)

	def fire_previous_available_clip_slot(self):
		# debug('fire_previous_available_clip_slot')
		self.fire_clip_slot_by_delta(-1, available=True)

	def _fire_next_available_clip_slot_on_single_armed_track(self):
		# debug('fire_next_available_clip_slot_on_single_armed_track')
		tracks = self.get_tracks()
		armed_tracks = self.armed_tracks()
		selected_track = self.song.view.selected_track
		if selected_track in armed_tracks:
			self.fire_clip_slot_by_delta(1, available=True, create=True)
		else:
			selected_index = tracks.index(selected_track) if selected_track in tracks else 0
			# debug('selected_index:', selected_index)
			if len(tracks) > selected_index:
				for track in tracks[selected_index:]:
					if track.can_be_armed and track.arm is True:
						self.fire_clip_slot_by_delta_with_explicit_track(d_value=1, track=track, available=True, create=True, select=True)
						break

		#fire_first_available_clip_slot_on_single_armed_track
	def fire_next_available_clip_slot_on_single_armed_track(self):
		tracks = self.get_tracks()
		armed_tracks = self.armed_tracks()
		selected_track = self.song.view.selected_track
		if selected_track in armed_tracks:
			clip_slot = self.get_first_empty_clipslot(selected_track)
			if clip_slot:
				clip_slot.fire()
				self.song.view.highlighted_clip_slot = clip_slot
			else:
				self.fire_next_available_clip_slot()

		else:
			selected_index = tracks.index(selected_track) if selected_track in tracks else 0
			if len(tracks) > selected_index:
				for track in tracks[selected_index:]:
					if track.can_be_armed and track.arm is True:
						clip_slot = self.get_first_empty_clipslot(track)
						if clip_slot:
							clip_slot.fire()
							self.song.view.highlighted_clip_slot = clip_slot
						else:
							self.fire_clip_slot_by_delta_with_explicit_track(d_value=1, track=track, available=True, create=True, select=True)
						break


	def fire_next_available_clip_slot_on_all_armed_tracks(self):
		# debug('fire_next_available_clip_slot_on_all_armed_tracks')
		armed_tracks = self.armed_tracks()
		# debug('armed_tracks:', len(armed_tracks))
		for track in armed_tracks:
			clip_slot = self.get_first_empty_clipslot(track)
			if clip_slot:
				clip_slot.fire()
				#self.song.view.highlighted_clip_slot = clip_slot
			else:
				self.fire_clip_slot_by_delta_with_explicit_track(d_value=1, track=track, available=True, create=False)

	def select_playing_clip_slot_on_single_armed_track(self):
		debug('select_playing_clip_slot_on_single_armed_track')

		tracks = list(self.get_tracks())
		armed_tracks = list(self.armed_tracks())
		selected_track = self.song.view.selected_track
		track =  None
		if selected_track in armed_tracks:
			debug('selected_track in armed_tracks')
			track = selected_track
		elif len(armed_tracks) > 0:
			debug('len(armed_tracks)>0')
			track = armed_tracks[0]
		else:
			debug('no armed tracks')
			track = selected_track
		if liveobj_valid(track):
			last_clip = None
			for clip_slot in track.clip_slots:
				if clip_slot.has_clip:
					if clip_slot.clip.is_playing:
						last_clip = None
						self.song.view.highlighted_clip_slot = clip_slot
						break
					else:
						debug('adding last clip:', clip_slot.has_clip)
						last_clip = clip_slot
			if liveobj_valid(last_clip):
				self.song.view.highlighted_clip_slot = last_clip


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


class UtilSessionRingComponent(SessionRingTrackProvider):

	def __init__(self, *a, **k):
		super(UtilSessionRingComponent, self).__init__(*a, **k)
		self._on_offsets_changed.subject = self

	@listens('offset')
	def _on_offsets_changed(self, track_offset, scene_offset):
		self.notify_offsets(self.track_offset, self.scene_offset)

	@listenable_property
	def offsets(self):
		return (self.track_offset, self.scene_offset)


class TextGrid(Grid):

	def __init__(self, name, width, height, active_handlers = return_empty, *a, **k):
		super(TextGrid, self).__init__(name, width, height, active_handlers, *a, **k)
		self._cell = [[StoredElement(active_handlers, _name = self._name + '_' + str(x) + '_' + str(y), _x = x, _y = y , _value = '', *a, **k) for y in range(height)] for x in range(width)]


class TextArray(Array):

	def __init__(self, name, size, active_handlers = return_empty, *a, **k):
		super(TextArray, self).__init__(name, size, active_handlers, *a, **k)
		self._cell = [StoredElement(self._name + '_' + str(num), _num = num, _value = '', *a, **k) for num in range(size)]


class UtilModHandler(ModHandler):


	Shift_button = ButtonControl()
	Alt_button = ButtonControl()
	_name = 'UtilModHandler'

	def __init__(self, *a, **k):
		self._color_type = 'LividRGB'
		self._grid = None
		addresses = {'key_text': {'obj':TextArray('key_text', 8), 'method':self._receive_key_text},
					'grid_text': {'obj':TextGrid('grid_text', 16, 16), 'method':self._receive_grid_text}}
		super(UtilModHandler, self).__init__(addresses = addresses, *a, **k)
		self.nav_box = UtilNavigationBox(self, 16, 16, 8, 4, self.set_offset,)
		self._shifted = False


	def select_mod(self, mod):
		super(UtilModHandler, self).select_mod(mod)
		#self._script._select_note_mode()
		self._script._update_modswitcher()
		self.update()
		debug('modhandler select mod: ' + str(mod))


	def _receive_grid_text(self, x, y, value = '', *a, **k):
		# debug('_receive_grid_text:', x, y, value)
		mod = self.active_mod()
		if mod and self._grid_value.subject:
			if mod.legacy:
				x = x-self.x_offset
				y = y-self.y_offset
			if x in range(8) and y in range(4):
				button = self._grid_value.subject.get_button(y, x)
				if button:
					# debug('setting button')
					button.set_text(value)


	def _receive_grid(self, x, y, value = -1, identifier = -1, channel = -1, *a, **k):
		#debug('_receive_base_grid:', x, y, value, identifier, channel)
		mod = self.active_mod()
		if mod and self._grid_value.subject:
			if mod.legacy:
				x = x-self.x_offset
				y = y-self.y_offset
			if x in range(8) and y in range(4):
				value > -1 and self._grid_value.subject.send_value(x, y, self._colors[value], True)
				button = self._grid_value.subject.get_button(y, x)
				if button:
					new_identifier = identifier if identifier > -1 else button._original_identifier
					new_channel = channel if channel > -1 else button._original_channel
					button._msg_identifier != new_identifier and button.set_identifier(new_identifier)
					button._msg_channel != new_channel and button.set_channel(new_channel)
					button._report_input = True
					button.suppress_script_forwarding = not ((channel, identifier) == (-1, -1))


	def _receive_key_text(self, x, value = '', *a, **k):
		#debug('_receive_key:', x, value)
		if not self._keys_value.subject is None:
			button = self._keys_value.subject.get_button(0, x)
			if button:
				button.set_text(value)


	def _receive_key(self, x, value):
		#debug('_receive_key:', x, value)
		if not self._keys_value.subject is None:
			self._keys_value.subject.send_value(x, 0, self._colors[value], True)


	def nav_update(self):
		self.nav_box and self.nav_box.update()


	def set_modifier_colors(self):
		shiftbutton = self._shift_value.subject
		shiftbutton and shiftbutton.set_on_off_values('Mod.ShiftOn', 'Mod.ShiftOff')
		altbutton = self._alt_value.subject
		altbutton and altbutton.set_on_off_values('Mod.AltOn', 'Mod.AltOff')


	@Shift_button.pressed
	def Shift_button(self, button):
		debug('shift_button.pressed')
		self._is_shifted = True
		mod = self.active_mod()
		if mod:
			mod.send('shift', 1)
		#self.shift_layer and self.shift_layer.enter_mode()
		if mod and mod.legacy:
			self.legacy_shift_layer and self.legacy_shift_layer.enter_mode()
		self.update()


	@Shift_button.released
	def Shift_button(self, button):
		self._is_shifted = False
		mod = self.active_mod()
		if mod:
			mod.send('shift', 0)
		self.legacy_shift_layer and self.legacy_shift_layer.leave_mode()
		#self.shift_layer and self.shift_layer.leave_mode()
		self.update()


	@Alt_button.pressed
	def Alt_button(self, button):
		debug('alt_button.pressed')
		self._is_alted = True
		mod = self.active_mod()
		if mod:
			mod.send('alt', 1)
			mod._device_proxy._alted = True
			mod._device_proxy.update_parameters()
		self.alt_layer and self.alt_layer.enter_mode()
		self.update()


	@Alt_button.released
	def Alt_button(self, button):
		self._is_alted = False
		mod = self.active_mod()
		if mod:
			mod.send('alt', 0)
			mod._device_proxy._alted = False
			mod._device_proxy.update_parameters()
		self.alt_layer and self.alt_layer.leave_mode()
		self.update()

	def update(self, *a, **k):
		mod = self.active_mod()
		if not mod is None:
			mod.restore()
		else:
			if not self._grid_value.subject is None:
				self._grid_value.subject.reset()
			if not self._keys_value.subject is None:
				self._keys_value.subject.reset()

	def set_lock(self, value):
		self._is_locked = value > 0


class UtilNavigationBox(NavigationBox):


	def update(self):
		# debug('nav_box.update()')
		nav_grid = self._on_navigation_value.subject
		left_button = self._on_nav_left_value.subject
		right_button = self._on_nav_right_value.subject
		up_button = self._on_nav_up_value.subject
		down_button = self._on_nav_down_value.subject
		xinc = self._x_inc
		yinc = self._y_inc
		xoff = self.x_offset
		yoff = self.y_offset
		xmax = xoff+self._window_x
		ymax = yoff+self._window_y
		if nav_grid:
			for button, coord in nav_grid.iterbuttons():
				x = coord[0]
				y = coord[1]
				button and button.set_light('Mod.Nav.OnValue' if ((x*xinc) in range(xoff, xmax)) and ((y*yinc) in range(yoff, ymax)) else 'Mod.Nav.OffValue')
		left_button and left_button.set_light('DefaultButton.On' if (xoff>0) else 'DefaultButton.Off')
		right_button and right_button.set_light('DefaultButton.On' if (xoff<(self.width()-self._window_x)) else 'DefaultButton.Off')
		up_button and up_button.set_light('DefaultButton.On' if (yoff>0) else 'DefaultButton.Off')
		down_button and down_button.set_light('DefaultButton.On' if (yoff<(self.height()-self._window_y)) else 'DefaultButton.Off')


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
		if app_view.is_view_visible('Detail/Clip') and app_view.is_view_visible('Detail'):
			app_view.hide_view('Detail/Clip')
			app_view.hide_view('Detail')
		else:
			self.show_view('Detail/Clip')

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


class PresetTaggerSelectorComponent(Component):


	PT_button = ButtonControl()
	def __init__(self, modhandler, *a, **k):
		self._modhandler = modhandler
		self._PT_locked = False
		super(PresetTaggerSelectorComponent, self).__init__(*a, **k)

	@PT_button.pressed
	def PT_button(self, button):
		if not self._PT_locked:
			self._PT_locked = True
			self._modhandler.select_mod_by_name('PT')
			self._modhandler.set_lock(True)
			self.PT_button.color = 'DefaultButton.On'
		else:
			self._PT_locked = False
			self._modhandler.set_lock(False)
			self._modhandler._on_device_changed()
			self.PT_button.color = 'DefaultButton.Off'
			self.select_first_armed_track()

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

	def select_first_armed_track(self):
		debug('select_first_armed_track')
		armed_tracks = self.armed_tracks()
		if len(armed_tracks):
			self.song.view.selected_track = armed_tracks[0]


class DeviceDeleteComponent(Component):


	delete_button = ButtonControl()

	def __init__(self, device_provider, *a, **k):
		self.device_provider = device_provider
		super(DeviceDeleteComponent, self).__init__(*a, **k)

	@delete_button.pressed
	def delete_button(self, button):
		device = self.device_provider.device
		if liveobj_valid(device):
			device_parent = device.canonical_parent
			device_index = list(device_parent.devices).index(device)
			device_parent.delete_device(device_index)


class HotswapComponent(Component):

	hotswap_button = ButtonControl()

	def __init__(self, device_provider = None, *a, **k):
		self._drum_group_device = None
		self._selected_drum_pad = None
		super(HotswapComponent, self).__init__(*a, **k)
		self.device_provider = device_provider or SpecialDeviceProvider(song = self.song)
		self._browser = Live.Application.get_application().browser
		self.__on_device_changed.subject = self.device_provider
		# self._on_track_changed.subject = self.__on_selected_device_changed.subject = self.song.view.selected_track.view

	@hotswap_button.pressed
	def hotswap_button(self, button):
		debug('hotswap button pressed')
		device = self.device_provider.device
		browser = self._browser
		selected_track_device = self.song.view.selected_track.view.selected_device
		debug('selected_track.view.selected_device:', selected_track_device)
		if not browser.hotswap_target == None:
			browser.hotswap_target = None
		elif liveobj_valid(self._selected_drum_pad):
			browser.hotswap_target = self._selected_drum_pad
		elif liveobj_valid(self._drum_group_device):
			browser.hotswap_target = self._drum_group_device
		elif liveobj_valid(device):
			browser.hotswap_target = device
		elif liveobj_valid(selected_track_device):
			browser.hotswap_target = selected_track_device

	def set_drum_group_device(self, drum_group_device):
		debug('set_drum_group_device', drum_group_device)
		if drum_group_device and not drum_group_device.can_have_drum_pads:
			drum_group_device = None
		if drum_group_device != self._drum_group_device:
			drum_group_view = drum_group_device.view if drum_group_device else None
			self.__on_selected_drum_pad_changed.subject = drum_group_view
			# self.__on_chains_changed.subject = drum_group_device
			self._drum_group_device = drum_group_device
			# self._update_drum_pad_listeners()
			self._update_selected_drum_pad()

	@listens('device')
	def __on_device_changed(self):
		device = self.device_provider.device
		debug('_on_device_changed', device)
		# if liveobj_valid(device) and not self.browser.hotswap_target == None:
		# 	self.browser.hotswap_target = device
		self.set_drum_group_device(device)

	@listens('selected_drum_pad')
	def __on_selected_drum_pad_changed(self):
		self._update_selected_drum_pad()

	def _update_selected_drum_pad(self):
		debug('_update_selected_drum_pad')
		selected_drum_pad = self._drum_group_device.view.selected_drum_pad if liveobj_valid(self._drum_group_device) else None
		if liveobj_changed(self._selected_drum_pad, selected_drum_pad):
			self._selected_drum_pad = selected_drum_pad
			self._on_selected_drum_pad_changed()

	def _on_selected_drum_pad_changed(self):
		debug('_on_selected_drum_pad_changed', self._selected_drum_pad)

	# @listens(u'selected_track')
	# def __on_selected_track_changed(self):
	#     self.__on_selected_device_changed.subject = self.song.view.selected_track.view
	#     if self.device_selection_follows_track_selection:
	#         self.update_device_selection()
	#
	# @listens(u'selected_device')
	# def __on_selected_device_changed(self):
	#     self._update_appointed_device()


class Util(ControlSurface):

	device_provider_class = ModDeviceProvider
	bank_definitions = BANK_DEFINITIONS

	def __init__(self, c_instance, *a, **k):
		super(Util, self).__init__(c_instance, *a, **k)
		self.log_message = logger.warning
		self.log_message('<<<<<<<<<<<<<<<<<<<<<<<<< Util log opened >>>>>>>>>>>>>>>>>>>>>>>>>')
		self.show_message('Util Control Surface Loaded')
		#self._controls = []
		self._skin = Skin(UtilColors)
		self._disable_autoarm = False
		#self._real_time_mapper = c_instance.real_time_mapper
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
			self._setup_session_recording_component()
			self._setup_device_controls()
			self._setup_device_deleter()
			self._setup_hotswap()
			self._setup_mod()
			self._setup_preset_tagger()
			self._setup_audiolooper()
			self._setup_main_modes()
			self._initialize_script()
		self._on_device_changed.subject = self._device_provider


	# @listenable_property
	# def pipe(self):
	# 	return None
	#
	#
	# def _send(self, **a):
	# 	notify_pipe(a)
	#

	def _initialize_script(self):
		self._main_modes.set_enabled(True)
		self._main_modes.selected_mode = 'Main'
		#debug('_selected_strip.is_enabled:', self._mixer._selected_strip.is_enabled())


	def _setup_monobridge(self):
		self._monobridge = MonoBridgeElement(self)
		self._monobridge.name = 'MonoBridge'


	def _handle(self):
		return self


	def _setup_controls(self):
		def is_momentary(id):
			return id > 34 and id not in (42,43,44,45,46,47,64,65,66,69)
		def is_momentary2(id):
			return id < 40
		optimized = True
		resource = PrioritizedResource
		color_map = COLOR_MAP
		# self._modHandle = SpecialMonoButtonElement(color_map = color_map, script = self, monobridge = self._monobridge, is_momentary = True, msg_type = MIDI_NOTE_TYPE, channel = 15, identifier = 0, name = 'ModHandle', optimized_send_midi = optimized, resource_type = resource, skin = self._skin)
		# self._modHandle.monomodular = self.monomodular

		self._button = [SpecialMonoButtonElement(color_map = color_map, script = self, monobridge = self._monobridge, is_momentary = is_momentary(UTIL_BUTTONS[index]), msg_type = MIDI_NOTE_TYPE, channel = CHANNEL, identifier = UTIL_BUTTONS[index], name = 'Button_' + str(index), optimized_send_midi = optimized, resource_type = resource, skin = self._skin) for index in range(128)]
		self._button2 = [SpecialMonoButtonElement(color_map = color_map, script = self, monobridge = self._monobridge, is_momentary = is_momentary2(SECONDARY_CHANNEL_UTIL_BUTTONS[index]), msg_type = MIDI_NOTE_TYPE, channel = SECONDARY_CHANNEL, identifier = SECONDARY_CHANNEL_UTIL_BUTTONS[index], name = 'Button2_' + str(index), optimized_send_midi = optimized, resource_type = resource, skin = self._skin) for index in range(128)]

		self._fader = SpecialEncoderElement(msg_type = MIDI_CC_TYPE, channel = CHANNEL, identifier = 0, map_mode = Live.MidiMap.MapMode.absolute, name = 'Fader', resource_type = resource)
		self._dial = SpecialEncoderElement(msg_type = MIDI_CC_TYPE, channel = CHANNEL, identifier = 17, map_mode = Live.MidiMap.MapMode.absolute, name = 'Dial', resource_type = resource)
		self._track_select_matrix = ButtonMatrixElement(name = 'TrackSelectMatrix', rows = [self._button[34:42]])
		self._device_select_matrix = ButtonMatrixElement(name = 'DeviceSelectMatrix', rows = [self._button[48:56]])
		self._chain_select_matrix = ButtonMatrixElement(name = 'ChainSelectMatrix', rows = [self._button[56:64]])
		self._encoder = [SpecialEncoderElement(name = 'Encoder_'+str(index), msg_type = MIDI_CC_TYPE, channel = CHANNEL, identifier = index, map_mode = Live.MidiMap.MapMode.absolute) for index in range(1,17)]
		self._encoder_matrix = ButtonMatrixElement(name = 'Dial_Matrix', rows = [self._encoder]) #, self._encoder[8:]])

		self._keys = ButtonMatrixElement(name = 'ModKeys', rows = [self._button2[0:8]])
		self._grid = ButtonMatrixElement(name = 'ModGrid', rows = [self._button2[8:16],
																	self._button2[16:24],
																	self._button2[24:32],
																	self._button2[32:40]])


	def _setup_autoarm(self):
		self._autoarm = UtilAutoArmComponent(name='Auto_Arm')
		self._autoarm.layer = Layer(util_autoarm_toggle_button = self._button[16])
		self._autoarm.set_enabled(False)
		#self._auto_arm._can_auto_arm_track = self._can_auto_arm_track


	def _tracks_to_use(self):
		return self.song.visible_tracks + self.song.return_tracks


	def _setup_session_control(self):
		self._session_ring = UtilSessionRingComponent(num_tracks = 8, num_scenes = 1) #, tracks_to_use = self._tracks_to_use)
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
			util_fire_next_on_all_armed_button = self._button[27],
			util_select_playing_on_single_armed_button = self._button2[50])

		self._session.set_enabled(False)


	def _setup_mixer_control(self):
		self._mixer = UtilMixerComponent(name = 'Mixer', tracks_provider = self._session_ring, track_assigner = SimpleTrackAssigner(), auto_name = True, channel_strip_component_type = UtilChannelStripComponent)
		self._mixer.layer = Layer(prehear_volume_control = self._dial, util_arm_kill_button = self._button[9], util_mute_kill_button = self._button[10], util_solo_kill_button = self._button[11], util_mute_flip_button = self._button[12], util_select_first_armed_track_button = self._button[23], arming_track_select_buttons = self._track_select_matrix, util_lower_all_track_volumes_button = self._button2[52])
		self._mixer._selected_strip.layer = Layer(volume_control = self._fader, arm_button = self._button[0], mute_button = self._button[1], solo_button = self._button[2], util_arm_exclusive_button = self._button[13], util_mute_exclusive_button = self._button[14], util_solo_exclusive_button = self._button[15])
		self._mixer._assign_skin_colors()
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
		self._transport.layer = Layer(play_button = self._button[30], stop_button = self._button[31], metronome_button = self._button[42]) #, overdub_button = self._button[43])

	def _setup_session_recording_component(self):
		self._clip_creator = ClipCreator()
		self._clip_creator.name = 'ClipCreator'
		self._recorder = FixedLengthSessionRecordingComponent(length_values = LENGTH_VALUES, clip_creator = self._clip_creator, view_controller = ViewControlComponent())
		self._recorder.layer = Layer(record_button = self._button[43], scene_list_new_button = self._button[68])
		#self._recorder.alt_layer = LayerMode(self._recorder, Layer(priority = 6, new_button = self._button[5], record_button = self._button[6]))
		# self._recorder.alt_layer = LayerMode(self._recorder, Layer(priority = 6, length_buttons = self._nav_buttons.submatrix[1:4,:]))
		self._recorder.set_enabled(False)

	def _setup_device_controls(self):
		self._device_bank_registry = DeviceBankRegistry()
		self._device_decorator = DeviceDecoratorFactory()
		self._banking_info = BankingInfo(self.bank_definitions)
		self._parameter_provider  = UtilDeviceComponent(device_provider = self._device_provider,
													device_decorator_factory = self._device_decorator,
													device_bank_registry = self._device_bank_registry,
													banking_info = self._banking_info,
													name = "DeviceComponent")
		self._parameter_provider.layer = Layer(priority = 6, bank_down_button = self._button[64], bank_up_button = self._button[65])
		self._device = UtilDeviceParameterComponent(parameter_provider = self._parameter_provider)
		self._device.layer = Layer(parameter_controls = self._encoder_matrix)
		self._device.set_enabled(False)

		self._track_list_component = TrackListComponent(tracks_provider = self._session_ring)
		self._device_navigation = UtilDeviceNavigationComponent(device_bank_registry = self._device_bank_registry,
																banking_info = self._banking_info,
																device_component = self._parameter_provider,
																track_list_component = self._track_list_component)
		self._device_navigation.layer = Layer(select_buttons = self._device_select_matrix, disable_button = self._button[67])
		self._device_navigation.scroll_left_layer = Layer(button = self._button[48], priority = 6)
		self._device_navigation.scroll_right_layer = Layer(button = self._button[55], priority = 6)
		self._device_navigation.chain_selection.layer = Layer(select_buttons = self._chain_select_matrix, priority = 6)
		self._device_navigation.chain_selection.scroll_left_layer = Layer(button = self._button[56], priority = 6)
		self._device_navigation.chain_selection.scroll_right_layer = Layer(button = self._button[63], priority = 6)
		self._device_navigation.bank_selection.layer = Layer(option_buttons = self._device_select_matrix, select_buttons = self._chain_select_matrix, priority = 6)
		self._device_navigation.bank_selection.scroll_left_layer = Layer(button = self._button[56], priority = 6)
		self._device_navigation.bank_selection.scroll_right_layer = Layer(button = self._button[63], priority = 6)
		# self._device_navigation.bank_inc_dec_layer = AddLayerMode(self._device_navigation.bank_selection, Layer(next_bank_button = self._button[44], priority = 6))
		self._device_navigation.set_enabled(False)

		# self._device_bank_incdec = BankIncDecComponent(device_bank_registry = self._device_bank_registry, banking_info = self._banking_info)
		# self._device_bank_incdec.layer = Layer(next_bank_button = self._button[44])
		# self._device_bank_incdec.set_enabled(False)


	def _setup_device_deleter(self):
		self._device_deleter = DeviceDeleteComponent(device_provider = self._device_provider)
		self._device_deleter.layer = Layer(delete_button = self._button[66], priority = 6)

	def _setup_hotswap(self):
		# self._hotswap = HotswapComponent(self._device_provider)
		self._hotswap = HotswapComponent()
		self._hotswap.layer = Layer(priority = 6, hotswap_button = self._button[69])
		self._hotswap.set_enabled(False)

	def _setup_mod(self):

		def get_monomodular(host):
				if isinstance(__builtins__, dict):
					if not 'monomodular' in list(__builtins__.keys()) or not isinstance(__builtins__['monomodular'], ModRouter):
						__builtins__['monomodular'] = ModRouter(song = self.song, register_component = self._register_component)
				else:
					if not hasattr(__builtins__, 'monomodular') or not isinstance(__builtins__['monomodular'], ModRouter):
						setattr(__builtins__, 'monomodular', ModRouter(song = self.song, register_component = self._register_component))
				monomodular = __builtins__['monomodular']
				if not monomodular.has_host():
					monomodular.set_host(host)
				return monomodular


		self.monomodular = get_monomodular(self)
		self.monomodular.name = 'monomodular_switcher'
		with inject(register_component = const(self._register_component), song = const(self.song)).everywhere():
			self.modhandler = UtilModHandler(self) ## song = self.song, register_component = self._register_component)
		self.modhandler.name = 'ModHandler'
		self.modhandler.layer = Layer( priority = 6, grid = self._grid, key_buttons = self._keys, Shift_button = self._button[46], Alt_button = self._button[47])
		# self.modhandler.layer = Layer( priority = 6, lock_button = self.elements.note_mode_button, grid = self.elements.matrix,
		# 																	nav_up_button = self.elements.octave_up_button,
		# 																	nav_down_button = self.elements.octave_down_button,
		# 																	nav_left_button = self.elements.in_button,
		# 																	nav_right_button = self.elements.out_button,
		# 																	key_buttons = self.elements.side_buttons,
		# 																	)
		self.modhandler.alt_shift_layer = AddLayerMode( self.modhandler, Layer(Shift_button = self._button[46],
																			Alt_button = self._button[47]))
		self.modhandler.legacy_shift_layer = AddLayerMode( self.modhandler, Layer(priority = 7,
																			device_selector_matrix = self._grid.submatrix[:, :1],
																			channel_buttons = self._grid.submatrix[:, 1:2],))
		# 																	nav_matrix = self.elements.matrix.submatrix[4:8, 2:6],
		# 																	))
		self.modhandler.shift_layer = AddLayerMode( self.modhandler, Layer( priority = 7,
																			device_selector_matrix = self._grid.submatrix[:, :1],
																			))
		# 																	#lock_button = self.elements.master_select_button,
		# 																	#))
		self.modhandler.alt_layer = AddLayerMode( self.modhandler, Layer( priority = 7,
																			))
		# 																	#key_buttons = self.elements.select_buttons))
		# 																	#key_buttons = self.elements.track_state_buttons))
		self._device_provider.restart_mod()

		# self._modHandle = ModControl(modscript = self, monomodular = self.monomodular, name = 'ModHandle')   #is_momentary = True, msg_type = MIDI_NOTE_TYPE, channel = 15, identifier = 0,

		self._modHandle = SpecialModControl(modscript = self, monomodular = self.monomodular, name = 'ModHandle')   #is_momentary = True, msg_type = MIDI_NOTE_TYPE, channel = 15, identifier = 0,

	def _setup_preset_tagger(self):
		self._preset_tagger_selector = PresetTaggerSelectorComponent(self.modhandler)
		self._preset_tagger_selector.layer = Layer(PT_button = self._button[45])
		self._preset_tagger_selector.set_enabled(False)

	def _setup_audiolooper(self):
		self._audiolooper = LoopSelectorComponent(follow_detail_clip=True, measure_length=4.0, name='Loop_Selector', default_size = 32)
		self._audiolooper.layer = Layer(priority = 6, loop_selector_matrix=self._grid,
														prev_page_button=self._button2[6],
														next_page_button=self._button2[7],
														shift_loop_left_button=self._button2[0],
														shift_loop_right_button=self._button2[1],
														latest_loop_button=self._button2[2],
														loop_length_1_button=self._button2[40],
														loop_length_2_button=self._button2[41],
														loop_length_4_button=self._button2[42],
														loop_length_8_button=self._button2[43],
														loop_length_16_button=self._button2[44],
														fix_grid_button=self._button2[45],
														favorite_clip_color_button=self._button2[46],
														shift_loop_left_keycommand_button=self._button2[47],
														shift_loop_right_keycommand_button=self._button2[48],
														play_selected_clip_button=self._button2[49],
														latest_loop_keycommand_button=self._button2[51])
		self._audiolooper.set_enabled(False)

	def _setup_main_modes(self):
		self._modswitcher = ModesComponent(name = 'ModSwitcher')
		self._modswitcher.add_mode('disabled', [])
		self._modswitcher.add_mode('mod', [self.modhandler])
		self._modswitcher.add_mode('audiolooper', [self._audiolooper])
		self._modswitcher.selected_mode = 'disabled'
		self._modswitcher.set_enabled(False)

		self._main_modes = ModesComponent(name = 'MainModes')
		self._main_modes.add_mode('disabled', [])
		self._main_modes.add_mode('Main', [self._preset_tagger_selector,
											self._modswitcher,
											self._recorder,
											self._device,
											self._device_navigation,
											self._parameter_provider,
											self._session_ring,
											self._transport,
											self._view_control,
											self._undo_redo,
											self._track_creator,
											self._mixer,
											self._mixer._selected_strip,
											self._session,
											self._session_navigation,
											self._autoarm,
											self._device_deleter,
											self._hotswap])


		# self._main_modes.add_mode('Mod', [self.modhandler, self._device, self._device_navigation, self._session_ring, self._transport, self._view_control, self._undo_redo, self._track_creator, self._mixer, self._mixer._selected_strip, self._session, self._session_navigation, self._autoarm])
		self._main_modes.selected_mode = 'disabled'
		# self._main_modes.layer = Layer(Main_button = self._button[44], Mod_button = self._button[45])
		self._main_modes.set_enabled(False)

	def _can_auto_arm_track(self, track):
		routing = track.current_input_routing
		#return routing == 'Ext: All Ins' or routing == 'All Ins'
		return False

	# def _do_send_midi(self, midi_event_bytes):
	# 	super(Util, self)._do_send_midi(midi_event_bytes)
	# 	bytes = list(midi_event_bytes)
	# 	self.notify_pipe('midi', *bytes)
	#
	# def receive_note(self, num, val, chan=0):
	# 	debug('receive_note', num, val)
	# 	self.receive_midi(tuple([144+chan, num, val]))
	#
	# def receive_cc(self, num, val, chan=0):
	# 	# debug('receive_cc', num, val)
	# 	self.receive_midi(tuple([176+chan, num, val]))

	# def connect_script_instances(self, instanciated_scripts):
	# 	hosts = []
	# 	for s in instanciated_scripts:
	# 		if hasattr(s, 'disable_autoarm') and s.disable_autoarm:
	# 			if hasattr(self, '_autoarm'):
	# 				self._autoarm._keysplitter_disable_autoarm = True
	# 				debug('setting _keysplitter_disable_autoarm to True')


	@listens('device')
	def _on_device_changed(self):
		self.schedule_message(1, self._update_modswitcher)

	def _update_modswitcher(self):
		debug('update modswitcher, mod is:', self.modhandler.active_mod())
		if self.modhandler.active_mod():
			self._modswitcher.selected_mode = 'mod'
		else:
			self._modswitcher.selected_mode = 'audiolooper'


class SpecialModControl(ModControl):


	def refresh_state(self, *a, **k):
		# super(Util, self).refresh_state(*a, **k)
		self.modscript.refresh_state(*a, **k)
		self.modscript.modhandler.update()

	def modhandler_select_mod_by_name(self, name):
		if not self.modscript.modhandler is None:
			self.modscript.modhandler.select_mod_by_name(name)

	def modhandler_set_lock(self, val):
		if not self.modscript.modhandler is None:
			self.modscript.modhandler.set_lock(val)

	def hotswap_enable(self, value):
		browser = Live.Application.get_application().browser
		if value:
			device = self.modscript._device_provider.device
			if liveobj_valid(device):
				browser.hotswap_target = device
		else:
			browser.hotswap_target = None

	def change_device_bank(self, value, m4l_device = None, *a, **k):
		device = self.modscript._parameter_provider
		# debug('special_device is:', liveobj_valid(device.device()), device.device().name if liveobj_valid(device.device()) else device.device())
		if device.is_enabled() and liveobj_valid(device.device()) and (m4l_device == device.device()):
			if value != device._bank.index:
				device._device_bank_registry.set_device_bank(device._bank._device, min(device._bank.bank_count(), max(0, value)))


	def load_preset(self, target = None, folder = None, directory = 'defaultPresets'):
		debug('load_preset()', 'target:', target, 'folder:', folder, 'directory:', directory)
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
