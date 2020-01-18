# by amounra 0417 : http://www.aumhaa.com
# written against Live 10.1.7 release on 011720

from __future__ import with_statement
import Live
import time
import math
import logging
logger = logging.getLogger(__name__)

#from itertools import izip, izip_longest, product
from ableton.v2.control_surface.control_surface import ControlSurface
from ableton.v2.base import inject, listens, listens_group
from ableton.v2.control_surface import ControlSurface, ControlElement, Layer, Skin, PrioritizedResource, Component, ClipCreator
from ableton.v2.control_surface.elements import ButtonElement, ComboElement
from ableton.v2.control_surface.components import ClipSlotComponent, SessionComponent, ViewControlComponent, SessionRingComponent, SessionNavigationComponent, MixerComponent, ChannelStripComponent
from ableton.v2.control_surface.components.mixer import SimpleTrackAssigner
from ableton.v2.control_surface.control import control_color
from ableton.v2.control_surface.mode import ModesComponent
from ableton.v2.control_surface.components.auto_arm import AutoArmComponent
from ableton.v2.control_surface.input_control_element import InputControlElement, MIDI_CC_TYPE, MIDI_NOTE_TYPE, MIDI_PB_TYPE, MIDI_SYSEX_TYPE

from ableton.v2.control_surface.control import ButtonControl

from aumhaa.v2.base import initialize_debug

from .Map import *

from aumhaa.v2.base.debug import initialize_debug

debug = initialize_debug()

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

	def __init__(self, *a, **k):
		super(UtilMixerComponent, self).__init__(*a, **k)

	def get_tracks(self):
		tracks = [track for track in self.song.tracks]
		for track in self.song.return_tracks:
			tracks.append(track)
		return tracks


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
			t.arm = False




class UtilSessionComponent(SessionComponent):

	util_capture_new_scene_button = ButtonControl()
	util_fire_next_button = ButtonControl()
	util_fire_prev_button = ButtonControl()
	util_select_playing_clipslot_button = ButtonControl()
	util_stop_clip_button = ButtonControl()
	util_new_scene_button = ButtonControl()

	def __init__(self, *a, **k):
		super(UtilSessionComponent, self).__init__(*a, **k)

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
		self.fire_next_clip_slot()


	def set_util_fire_prev_button(self, button):
		self.util_fire_prev_button.set_control_element(button)

	@util_fire_prev_button.pressed
	def util_fire_prev_button(self, button):
		self._on_util_fire_prev_button_pressed(button)

	def _on_util_fire_prev_button_pressed(self, button):
		self.fire_previous_clip_slot()


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

	def fire_next_clip_slot(self):
		debug('fire_next_clip_slot')
		self.fire_clip_slot_by_delta(1, False)

	def fire_next_available_clip_slot(self):
		debug('fire_next_available_clip_slot')
		self.fire_clip_slot_by_delta(1, True)

	def fire_previous_clip_slot(self):
		debug('fire_previous_clip_slot')
		self.fire_clip_slot_by_delta(-1, False)

	def fire_previous_available_clip_slot(self):
		debug('fire_previous_available_clip_slot')
		self.fire_clip_slot_by_delta(-1, True)



	def set_util_select_playing_clipslot_button(self, button):
		self.util_select_playing_clipslot_button.set_control_element(button)

	@util_select_playing_clipslot_button.pressed
	def util_select_playing_clipslot_button(self, button):
		self._on_util_select_playing_clipslot_button_pressed(button)

	def _on_util_select_playing_clipslot_button_pressed(self, button):
		self.select_playing_clip()

	def select_playing_clip(self):
		debug('select_playing_clip')
		for clip_slot in self.song.view.selected_track.clip_slots:
			if clip_slot.has_clip and clip_slot.clip.is_playing:
				self.song.view.highlighted_clip_slot = clip_slot


class Util(ControlSurface):


	def __init__(self, c_instance, *a, **k):
		super(Util, self).__init__(c_instance, *a, **k)
		self.log_message = logger.warning
		self.log_message('<<<<<<<<<<<<<<<<<<<<<<<<< Util log opened >>>>>>>>>>>>>>>>>>>>>>>>>')
		self.show_message('Util Control Surface Loaded')
		#self._controls = []
		self._skin = Skin(UtilColors)
		with self.component_guard():
		#	self._setup_m4l_interface()
			self._setup_controls()
			self._setup_autoarm()
			self._setup_session_control()
			self._setup_mixer_control()
			self._setup_main_modes()
			self._initialize_script()


	def _initialize_script(self):
		self._main_modes.set_enabled(True)
		self._main_modes.selected_mode = 'Main'
		#debug('_selected_strip.is_enabled:', self._mixer._selected_strip.is_enabled())


	def _setup_controls(self):
		is_momentary = False
		optimized = True
		resource = PrioritizedResource
		self._button = [ButtonElement(is_momentary = is_momentary, msg_type = MIDI_NOTE_TYPE, channel = CHANNEL, identifier = UTIL_BUTTONS[index], name = 'Button_' + str(index), optimized_send_midi = optimized, resource_type = resource, skin = self._skin) for index in range(17)]


	def _setup_autoarm(self):
		self._autoarm = UtilAutoArmComponent(name='Auto_Arm')
		self._autoarm.layer = Layer(util_autoarm_toggle_button = self._button[16])
		self._autoarm.set_enabled(False)
		#self._auto_arm._can_auto_arm_track = self._can_auto_arm_track


	def _tracks_to_use(self):
		return self.song.visible_tracks + self.song.return_tracks


	def _setup_session_control(self):
		self._session_ring = SessionRingComponent(num_tracks = 1, num_scenes = 1, tracks_to_use = self._tracks_to_use)
		self._session_ring.set_enabled(False)

		self._session_navigation = SessionNavigationComponent(name = 'SessionNavigation', session_ring = self._session_ring)
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
			util_capture_new_scene_button = self._button[8])

		self._session.set_enabled(False)


	def _setup_mixer_control(self):
		self._mixer = UtilMixerComponent(name = 'Mixer', tracks_provider = self._session_ring, track_assigner = SimpleTrackAssigner(), auto_name = True, channel_strip_component_type = UtilChannelStripComponent)
		self._mixer.layer = Layer(util_arm_kill_button = self._button[9], util_mute_kill_button = self._button[10], util_solo_kill_button = self._button[11], util_mute_flip_button = self._button[12])
		self._mixer._selected_strip.layer = Layer(arm_button = self._button[0], mute_button = self._button[1], solo_button = self._button[2], util_arm_exclusive_button = self._button[13], util_mute_exclusive_button = self._button[14], util_solo_exclusive_button = self._button[15])
		self._mixer.set_enabled(False)


	def _setup_main_modes(self):
		self._main_modes = ModesComponent(name = 'MainModes')
		self._main_modes.add_mode('disabled', [])
		self._main_modes.add_mode('Main', [self._mixer, self._mixer._selected_strip, self._session, self._session_navigation, self._autoarm])
		self._main_modes.selected_mode = 'disabled'
		self._main_modes.set_enabled(False)


	def _can_auto_arm_track(self, track):
		routing = track.current_input_routing
		#return routing == 'Ext: All Ins' or routing == 'All Ins'
		return False


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
