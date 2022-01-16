# by amounra 0320 : http://www.aumhaa.com
# written against Live 10.1.9 release on 030920



import Live
import time
import math
import sys

from ableton.v2.base import inject, listens, listens_group, inject
from ableton.v2.control_surface import ControlSurface, ControlElement, Layer, Skin, PrioritizedResource, Component, ClipCreator, DeviceBankRegistry
from ableton.v2.control_surface.elements import ButtonMatrixElement, DoublePressElement, MultiElement, DisplayDataSource, SysexElement
from ableton.v2.control_surface.components import ClipSlotComponent, SceneComponent, SessionComponent, TransportComponent, BackgroundComponent, ViewControlComponent, SessionRingComponent, SessionRecordingComponent, SessionNavigationComponent, SessionOverviewComponent, MixerComponent, PlayableComponent
#from ableton.v2.control_surface.components.mixer import simple_track_assigner
from ableton.v2.control_surface.mode import AddLayerMode, ModesComponent, DelayMode, CompoundMode
from ableton.v2.control_surface.elements.physical_display import PhysicalDisplayElement
from ableton.v2.control_surface.components.session_recording import *
from ableton.v2.control_surface.control import PlayableControl, ButtonControl, control_matrix
from ableton.v2.control_surface.components.scroll import ScrollComponent
from ableton.v2.control_surface.components.view_control import BasicSceneScroller
from ableton.v2.control_surface.percussion_instrument_finder import PercussionInstrumentFinder, find_drum_group_device
from ableton.v2.control_surface.elements import PlayheadElement

from aumhaa.v2.base import initialize_debug
from aumhaa.v2.control_surface import SendLividSysexMode, MomentaryBehaviour, ExcludingMomentaryBehaviour, DelayedExcludingMomentaryBehaviour, ShiftedBehaviour, LatchingShiftedBehaviour, FlashingBehaviour
from aumhaa.v2.control_surface.mod_devices import *
from aumhaa.v2.control_surface.mod import *
from aumhaa.v2.control_surface.elements import MonoEncoderElement, MonoBridgeElement, generate_strip_string, CodecEncoderElement
from aumhaa.v2.control_surface.elements.mono_button import *
from aumhaa.v2.control_surface.components import DeviceNavigator, TranslationComponent, MonoMixerComponent, ResetSendsComponent, DeviceSelectorComponent, MonoMixerComponent
from aumhaa.v2.control_surface.components.device import DeviceComponent
from aumhaa.v2.control_surface.components.mono_instrument import *
from aumhaa.v2.control_surface.mono_modes import SendLividSysexMode, SendSysexMode, CancellableBehaviourWithRelease, ColoredCancellableBehaviourWithRelease, MomentaryBehaviour, BicoloredMomentaryBehaviour, DefaultedBehaviour
from aumhaa.v2.livid import LividControlSurface, LividSettings, LividRGB
from aumhaa.v2.control_surface.components.m4l_interface import M4LInterfaceComponent

from pushbase.automation_component import AutomationComponent
#from pushbase.auto_arm_component import AutoArmComponent
#from pushbase.grid_resolution import GridResolution
#from pushbase.playhead_element import PlayheadElement
#from pushbase.percussion_instrument_finder import PercussionInstrumentFinder, find_drum_group_device
#from pushbase.drum_group_component import DrumGroupComponent

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


def special_number_of_parameter_banks(device, device_dict = DEVICE_DICT):
	""" Determine the amount of parameter banks the given device has """
	if device != None:
		if device.class_name in list(device_dict.keys()):
			device_bank = device_dict[device.class_name]
			return len(device_bank)/2 + (1 if len(device_bank)%2 else 0)
		else:
			if device.class_name in MAX_DEVICES:
				try:
					banks = device.get_bank_count()
				except:
					banks = 0
				if banks != 0:
					return banks
			param_count = len(device.parameters[1:])
			return param_count / 16 + (1 if param_count % 16 else 0)
	return 0


def special_parameter_bank_names(device, bank_name_dict = BANK_NAME_DICT):
	if device != None:
		if device.class_name in list(bank_name_dict.keys()):
			ret = group(bank_name_dict[device.class_name], 2)
			ret1 = [[i for i in bank_names if not i is None] for bank_names in ret]
			return [' - '.join(i) for i in ret1]
		banks = special_number_of_parameter_banks(device)
		def _default_bank_name(bank_index):
			return 'Bank ' + str(bank_index + 1)

		if device.class_name in MAX_DEVICES and banks != 0:
			def _is_ascii(c):
				return ord(c) < 128

			def _bank_name(bank_index):
				try:
					name = device.get_bank_name(bank_index)
				except:
					name = None
				if name:
					return str(list(filter(_is_ascii, name)))
				else:
					return _default_bank_name(bank_index)

			return list(map(_bank_name, list(range(0, banks))))
		else:
			return list(map(_default_bank_name, list(range(0, banks))))
	return []


def special_parameter_banks(device, device_dict = DEVICE_DICT):
	""" Determine the parameters to use for a device """
	if device != None:
		if device.class_name is 'LegacyModDeviceProxy':
			return group(device_parameters_to_map(device), 16)
		elif device.class_name in list(device_dict.keys()):
			def names_to_params(bank):
				return list(map(partial(get_parameter_by_name, device), bank))

			return group([i for i in flatten(list(map(names_to_params, device_dict[device.class_name])))], 16)
		else:
			if device.class_name in MAX_DEVICES:
				try:
					banks = device.get_bank_count()
				except:
					banks = 0
				if banks != 0:
					def _bank_parameters(bank_index):
						try:
							parameter_indices = device.get_bank_parameters(bank_index)
						except:
							parameter_indices = []
						if len(parameter_indices) != 32:
							return [ None for i in list(range(0, 32))]
						else:
							return [ (device.parameters[i] if i != -1 else None) for i in parameter_indices ]

					return list(map(_bank_parameters, list(range(0, banks))))
			return group(device_parameters_to_map(device), 16)
	return []



class SpecialDeviceComponent(DeviceComponent):


	def __init__(self, script, *a, **k):
		self._script = script
		super(SpecialDeviceComponent, self).__init__(*a, **k)


	def display_device(self):
		track = self.find_track(livedevice(self._get_device()))
		if (self.song.view.selected_track is not track):
			self.song.view.selected_track = track
		self.song.view.select_device(livedevice(self._get_device()))
		if ((not self.application().view.is_view_visible('Detail')) or (not self.application().view.is_view_visible('Detail/DeviceChain'))):
			self.application().view.show_view('Detail')
			self.application().view.show_view('Detail/DeviceChain')


	def find_track(self, obj):
		if obj != None:
			if(type(obj.canonical_parent)==type(None)) or (type(obj.canonical_parent)==type(self.song)):
				return None
			elif(type(obj.canonical_parent) == type(self.song.tracks[0])):
				return obj.canonical_parent
			else:
				return self.find_track(obj.canonical_parent)
		else:
			return None


	def update(self):
		super(SpecialDeviceComponent, self).update()


	def _current_bank_details(self):
		bank_name = self._bank_name
		bank = []
		best_of = self._best_of_parameter_bank()
		banks = self._parameter_banks()
		if banks:
			if self._bank_index != None and self._is_banking_enabled() or not best_of:
				index = self._bank_index if self._bank_index != None else 0
				bank = banks[index]
				#debug('bank is:', bank)
				bank_name = self._parameter_bank_names()[index]
			else:
				bank = best_of
				bank_name = 'Best of Parameters'
		#debug('current_bank_details:', bank_name, bank)
		return (bank_name, bank)


	def _parameter_banks(self):
		return special_parameter_banks(self._get_device())


	def _parameter_bank_names(self):
		return special_parameter_bank_names(self._get_device())


	def _number_of_parameter_banks(self):
		return special_number_of_parameter_banks(self._get_device())


	def _release_parameters(self, controls):
		if controls != None:
			for control in controls:
				if control != None:
					control.release_parameter()
					control.reset()



class TwisterButtonElement(MonoButtonElement):


	def send_value(self, value, force = False):
		if (value != None) and isinstance(value, int) and (value in list(range(128))):
			if (force or self._force_next_send or ((value != self._last_sent_value) and self._is_being_forwarded)):
				data_byte1 = self._original_identifier
				if value in list(range(1, 127)):
					data_byte2 = self._color_map[(value - 1) % (self._num_colors)]
				elif value == 127:
					data_byte2 = self._color_map[self._num_colors-1]
				else:
					data_byte2 = self._darkened
				self._color = data_byte2
				status_byte = self._original_channel
				if (self._msg_type == MIDI_NOTE_TYPE):
					status_byte += MIDI_NOTE_ON_STATUS
				elif (self._msg_type == MIDI_CC_TYPE):
					status_byte += MIDI_CC_STATUS
				else:
					assert False
				self.send_midi(tuple([status_byte,
				 data_byte1,
				 data_byte2]))
				self._last_sent_message = [value]
				if self._report_output:
					is_input = True
					self._report_value(value, (not is_input))
				self._flash_state = round((value -1)/self._num_colors)
				self._force_next_value = False
		else:
			debug('Button bad send value:', value)



class TwisterStaticDeviceProvider(EventObject):


	device_selection_follows_track_selection = False

	def __init__(self, *a, **k):
		super(TwisterStaticDeviceProvider, self).__init__(*a, **k)
		self._device = None


	@listenable_property
	def device(self):
		#debug('returning:', self._device)
		return self._device


	@device.setter
	def device(self, device):
		#debug('provider device_setter:', device)
		if liveobj_changed(self._device, device):
			self._device = device
			self.notify_device()



class TwisterDeviceComponent(DeviceComponent):


	def __init__(self, script, preset_index, *a, **k):
		self._script = script
		self._preset_index = str(preset_index)
		provider = TwisterStaticDeviceProvider()
		self._dynamic_device_provider = None
		self._preset_device = None
		super(TwisterDeviceComponent, self).__init__(device_provider = provider, *a, **k)
		self.scan_all()


	def update(self):
		super(TwisterDeviceComponent, self).update()


	def scan_all(self):
		debug('scan all device--------------------------------')
		preset = None
		tracks = self.song.tracks + self.song.return_tracks + tuple([self.song.master_track])
		key = str('@d:'+self._preset_index)
		debug('key is:', key)
		for track in tracks:
			for device in enumerate_track_device(track):
				if device.name.startswith(key+' ') or device.name == key:
					preset = device
				elif (device.name.startswith('*' +key+' ') or device.name == ('*' +key))  and device.can_have_chains and len(device.chains) and len(device.chains[0].devices):
					preset = device.chains[0].devices[0]
		self._preset_device = preset
		debug('preset is:', preset)
		if not preset == None:
			self._device_provider.device = preset


	@listens('device')
	def _on_dynamic_device_changed(self):
		if self._preset_device is None:
			device = self._dynamic_device_provider.device if self._dynamic_device_provider else None
			#debug('_on_provided_device_changed:', self.name, device)
			if liveobj_valid(self._device_provider):
				self._device_provider.device = device


	def set_dynamic_device_provider(self, provider):
		self._dynamic_device_provider = provider
		self._on_dynamic_device_changed.subject = self._dynamic_device_provider
		if self._get_device() is None:
			self._on_dynamic_device_changed()


	def display_device(self):
		track = self.find_track(livedevice(self._get_device()))
		if (self.song.view.selected_track is not track):
			self.song.view.selected_track = track
		self.song.view.select_device(livedevice(self._get_device()))
		if ((not self.application.view.is_view_visible('Detail')) or (not self.application.view.is_view_visible('Detail/DeviceChain'))):
			self.application.view.show_view('Detail')
			self.application.view.show_view('Detail/DeviceChain')


	def find_track(self, obj):
		if obj != None:
			if(type(obj.canonical_parent)==type(None)) or (type(obj.canonical_parent)==type(self.song)):
				return None
			elif(type(obj.canonical_parent) == type(self.song.tracks[0])):
				return obj.canonical_parent
			else:
				return self.find_track(obj.canonical_parent)
		else:
			return None


	def _on_device_changed(self, device):
		super(TwisterDeviceComponent, self)._on_device_changed(device)


	def _release_parameters(self, controls):
		if controls != None:
			for control in controls:
				if control != None:
					control.release_parameter()
					control.reset()



class Twister(LividControlSurface):
	__module__ = __name__
	__doc__ = " Monomodular controller script for Livid CNTRLR "


	_sysex_id = 8
	_model_name = 'Twister'
	_host_name = 'Twister'
	_version_check = 'b996'
	monomodular = None

	device_provider_class = ModDeviceProvider

	def __init__(self, *a, **k):
		super(Twister, self).__init__(*a, **k)
		self._skin = Skin(TwisterColors)
		self._device_selection_follows_track_selection = True
		with self.component_guard():
			self._setup_monobridge()
			self._setup_controls()
			#self._define_sysex()
			self._setup_background()
			self._setup_m4l_interface()
			self._setup_mod()
			self._setup_mixer_control()
			self._setup_device_navigator()
			self._setup_device_controls()
			self._setup_special_device_control()
			self._setup_device_chooser()
			#self._setup_device_selector()
			self._setup_modes()
		self._on_device_changed.subject = self.song
		self._on_selected_track_changed.subject = self.song.view


	def _initialize_script(self):
		super(Twister, self)._initialize_script()
		self._connected = True


	def _setup_controls(self):
		is_momentary = True
		optimized = True
		resource = PrioritizedResource
		self._encoder = [CodecEncoderElement(msg_type = MIDI_CC_TYPE, channel = CHANNEL, identifier = TWISTER_DIALS[index], name = 'Encoder_' + str(index), num = TWISTER_DIALS[index], script = self, optimized_send_midi = optimized, resource_type = resource, monobridge = self._monobridge) for index in list(range(16))]
		self._encoder_button = [TwisterButtonElement(is_momentary = is_momentary, msg_type = MIDI_CC_TYPE, channel = 1, identifier = TWISTER_DIAL_BUTTONS[index], name = 'Encoder_Button_' + str(index), script = self, skin = self._skin, color_map = COLOR_MAP, optimized_send_midi = optimized, resource_type = resource, monobridge = self._monobridge) for index in list(range(16))]

		self._dial_matrix = ButtonMatrixElement(name = 'Dial_Matrix', rows = [self._encoder[index*4:(index*4)+4] for index in range(4)])
		self._dial_button_matrix = ButtonMatrixElement(name = 'Dial_Button_Matrix', rows = [self._encoder_button[index*4:(index*4)+4] for index in range(4)])

		self._side_button = [TwisterButtonElement(is_momentary = is_momentary, msg_type = MIDI_NOTE_TYPE, channel = 3, identifier = TWISTER_SIDE_BUTTONS[index], name = 'Side_Button_' + str(index), script = self, skin = self._skin, color_map = COLOR_MAP, optimized_send_midi = optimized, resource_type = resource, monobridge = self._monobridge) for index in list(range(3))]


	def _setup_background(self):
		self._background = BackgroundComponent(name = 'Background')
		self._background.layer = Layer(priority = 3, dials = self._dial_matrix, dial_buttons = self._dial_button_matrix.submatrix[:,:])
		self._background.set_enabled(True)


	def _setup_m4l_interface(self):
		self._m4l_interface = M4LInterfaceComponent(controls=self.controls, component_guard=self.component_guard, priority = 10)
		self._m4l_interface.name = "M4LInterface"
		self.get_control_names = self._m4l_interface.get_control_names
		self.get_control = self._m4l_interface.get_control
		self.grab_control = self._m4l_interface.grab_control
		self.release_control = self._m4l_interface.release_control


	def _define_sysex(self):
		pass


	def _check_connection(self):
		self._connected = True
		self._initialize_hardware()
		self._initialize_script()


	def _setup_mixer_control(self):
		self._mixer_session_ring = SessionRingComponent(num_tracks = 0, num_scenes = 0)
		self._mixer = MonoMixerComponent(name = 'Mixer', tracks_provider = self._mixer_session_ring)
		self._mixer.set_enabled(False)


	def _setup_device_navigator(self):
		self._device_navigator = DeviceNavigator(self._device_provider, self._mixer, self)
		self._device_navigator._dev1_layer = AddLayerMode(self._device_navigator, Layer(priority = 4, prev_button = self._encoder_button[2], next_button = self._encoder_button[3], prev_chain_button = self._encoder_button[4], next_chain_button = self._encoder_button[5]))
		self._device_navigator._dev2_layer = AddLayerMode(self._device_navigator, Layer(priority = 4, prev_button = self._encoder_button[10], next_button = self._encoder_button[11], prev_chain_button = self._encoder_button[12], next_chain_button = self._encoder_button[13]))
		self._device_navigator.set_enabled(False)


	def _setup_device_controls(self):
		self._device = [None for index in list(range(2))]

		self._device[0] = TwisterDeviceComponent(self, 1, device_bank_registry = DeviceBankRegistry())
		self._device[0].name = 'TwisterDevice_Component_0'
		self._device[0].layer = Layer(priority = 4,  parameter_controls = self._dial_matrix.submatrix[:, :2],
											on_off_button = self._encoder_button[1],
											bank_prev_button = self._encoder_button[6],
											bank_next_button = self._encoder_button[7],
											)
		self._device[0].set_enabled(False)

		self._device[1] = TwisterDeviceComponent(self, 2, device_bank_registry = DeviceBankRegistry())
		self._device[1].name = 'TwisterDevice_Component_1'
		self._device[1].layer = Layer(priority = 4, parameter_controls = self._dial_matrix.submatrix[:, 2:],
											on_off_button = self._encoder_button[9],
											bank_prev_button = self._encoder_button[14],
											bank_next_button = self._encoder_button[15],
											)
		self._device[1].set_enabled(False)

		# self._automation_component = AutomationComponent(parameter_provider = self._device[0])
		# self._automation_component.layer = Layer(priority = 4, parameter_controls = self._dial_matrix.submatrix[:, :2])


	def _setup_special_device_control(self):
		self._special_device = SpecialDeviceComponent(name = 'Device_Component', device_provider = self._device_provider, device_bank_registry = DeviceBankRegistry(), script = self)
		self._special_device.layer = Layer(priority = 4, parameter_controls = self._dial_matrix.submatrix[:,:],
												on_off_button = self._encoder_button[1],
												bank_prev_button = self._encoder_button[6],
												bank_next_button = self._encoder_button[7])
		# self._device.bank_layer = AddLayerMode(self._device, Layer(priority = 4,
		#
		# 										bank_prev_button = self._encoder_button[14],
		# 										bank_next_button = self._encoder_button[15]))
		self._special_device.set_enabled(False)


	def _setup_device_chooser(self):
		self._selected_device = self._device[0]
		self._last_selected_device = self._device[0]

		self._selected_device_modes = ModesComponent()
		self._selected_device_modes.add_mode('disabled', [])
		self._selected_device_modes.add_mode('special_device', [self._special_device, self._device_navigator._dev1_layer])
		self._selected_device_modes.add_mode('device_0', [self._device_navigator._dev1_layer], behaviour = DefaultedBehaviour())
		self._selected_device_modes.add_mode('device_1', [self._device_navigator._dev2_layer], behaviour = DefaultedBehaviour())
		self._selected_device_modes.layer = Layer(priority = 4, device_0_button = self._encoder_button[0], device_1_button = self._encoder_button[8], special_device_button = self._side_button[0])
		self._selected_device_modes.selected_mode = 'special_device'
		self._selected_device_modes.set_enabled(False)
		self._on_device_selector_mode_changed.subject = self._selected_device_modes


	@listens('selected_mode')
	def _on_device_selector_mode_changed(self, mode):
		debug('_on_device_selector_mode_changed:', mode)
		if mode in DEVICE_COMPONENTS:
			active_device = self._device[DEVICE_COMPONENTS.index(self._selected_device_modes.selected_mode)]
			for device in self._device:
				if device is active_device:
					device.set_dynamic_device_provider(self._device_provider)
				else:
					device.set_dynamic_device_provider(None)
			if active_device.find_track(active_device._get_device()) == self.song.view.selected_track:
				active_device.display_device()
		else:
			for device in self._device:
				device.set_dynamic_device_provider(None)
		#debug('_on_device_selector_mode_changed finished')


	def _setup_mod(self):
		self.monomodular = get_monomodular(self)
		self.monomodular.name = 'monomodular_switcher'
		self.modhandler = TwisterModHandler(self, device_provider = self._device_provider)
		self.modhandler.name = 'ModHandler'
		self.modhandler.layer = Layer(priority = 8,
										twister_encoder_button_grid = self._dial_button_matrix.submatrix[:,:],)
										#twister_encoder_grid = self._dial_matrix.submatrix[:,:],)
		self.modhandler.set_enabled(False)


	def _setup_modes(self):
		self._modswitcher = ModesComponent(name = 'ModSwitcher')
		self._modswitcher.add_mode('mod', [self.modhandler, self._device])
		self._modswitcher.add_mode('device', [self._selected_device_modes, self._device[0]])  #, self._device[1], self._automation_component])
		#self._modswitcher.add_mode('special_device', [self._device, self._device.bank_layer])
		self._modswitcher.selected_mode = 'device'
		self._modswitcher.set_enabled(True)


	def _update_modswitcher(self):
		debug('update modswitcher', self.modhandler.active_mod())
		if self.modhandler.active_mod():
			self._modswitcher.selected_mode = 'mod'
		else:
			self._modswitcher.selected_mode = 'device'


	@listens('appointed_device')
	def _on_device_changed(self):
		debug('appointed device changed, script')
		self._update_modswitcher()


	@listens('selected_track')
	def _on_selected_track_changed(self):
		debug('_on_selected_track_changed')
		#super(Cntrlr, self)._on_selected_track_changed()
		#self._drum_group_finder.device_parent = self.song.veiw.selected_track
		if not len(self.song.view.selected_track.devices):
			self._update_modswitcher()


	def restart_monomodular(self):
		#debug('restart monomodular')
		self.modhandler.disconnect()
		with self.component_guard():
			self._setup_mod()



class TwisterModHandler(ModHandler):


	def __init__(self, *a, **k):
		self._twister_encoder_grid = None
		self._twister_encoder_button_grid = None
		addresses = {'twister_encoder_grid': {'obj':RingedGrid('twister_encoder_grid', 4, 4), 'method':self._receive_twister_encoder_grid},
					'twister_encoder_button_grid': {'obj':Grid('twister_encoder_button_grid', 4, 4), 'method':self._receive_twister_encoder_button_grid},}
		super(TwisterModHandler, self).__init__(addresses = addresses, *a, **k)
		self._color_type = 'RGB'


	def _receive_grid(self, x, y, value = -1, *a, **k):
		pass


	def _receive_twister_encoder_grid(self, x, y, value = -1, *a, **K):
		#debug('_receive_twister_encoder_grid:', x, y, value, mode, green, custom, local, relative)
		if self.is_enabled() and self._active_mod and self._twister_encoder_grid and x < 4 and y < 4:
			if value > -1:
				self._twister_encoder_grid.send_value(x, y, value, True)


	def _receive_twister_encoder_button_grid(self, x, y, value, *a, **k):
		if self.is_enabled() and self._active_mod:
			if self._twister_encoder_button_grid:
				self._twister_encoder_button_grid.send_value(x, y, self._colors[value], True)


	def set_twister_encoder_grid(self, grid):
		self._twister_encoder_grid = grid
		#self._twister_encoder_grid_value.subject = self._twister_encoder_grid


	def set_twister_encoder_button_grid(self, buttons):
		self._twister_encoder_button_grid = buttons
		self._twister_encoder_button_grid_value.subject = self._twister_encoder_button_grid


	@listens('value')
	def _twister_encoder_grid_value(self, value, x, y, *a, **k):
		#debug('_twister_encoder_grid_value:', x, y, value)
		if self._active_mod:
			self._active_mod.send('twister_encoder_grid', x, y, value)


	@listens('value')
	def _twister_encoder_button_grid_value(self, value, x, y, *a, **k):
		#debug('_twister_encoder_button_grid_value:', x, y, value)
		if self._active_mod:
			self._active_mod.send('twister_encoder_button_grid', x, y, value)


	def update(self, *a, **k):
		mod = self.active_mod()
		#debug('modhandler update:', mod)
		if self.is_enabled() and not mod is None:
			mod.restore()



#a
