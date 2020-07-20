from __future__ import absolute_import, print_function, unicode_literals
from contextlib import contextmanager
from itertools import ifilter, imap, chain
from functools import partial
from multipledispatch import dispatch
import Live
from ableton.v2.base import find_if, first, index_if, listenable_property, listens, listens_group, liveobj_changed, liveobj_valid, EventObject, SlotGroup, task
from ableton.v2.control_surface import DecoratorFactory, device_to_appoint
from ableton.v2.control_surface.components import DeviceNavigationComponent as DeviceNavigationComponentBase, FlattenedDeviceChain, ItemSlot, ItemProvider, is_empty_rack, nested_device_parent
from ableton.v2.control_surface.control import control_list, StepEncoderControl
from ableton.v2.control_surface.mode import Component, ModesComponent, NullModes, DelayMode

from pushbase.device_chain_utils import is_first_device_on_pad
from Push2.bank_selection_component import BankSelectionComponent
from Push2.chain_selection_component import ChainSelectionComponent
from Push2.colors import DISPLAY_BUTTON_SHADE_LEVEL, IndexedColor
from Push2.device_util import is_drum_pad, find_chain_or_track
from Push2.item_lister import IconItemSlot, ItemListerComponent

from aumhaa.v2.base.debug import initialize_debug

debug = initialize_debug()

def find_drum_pad(items):
	elements = imap(lambda i: i.item, items)
	return find_if(lambda e: is_drum_pad(e), elements)


@dispatch(Live.DrumPad.DrumPad)
def is_active_element(drum_pad):
	return not drum_pad.mute and drum_pad.canonical_parent.is_active


@dispatch(object)
def is_active_element(device):
	return device.is_active


def set_enabled(device, is_on):
	device.parameters[0].value = int(is_on)


def is_on(device):
	return bool(device.parameters[0].value)


def collect_devices(track_or_chain, nesting_level = 0):
	chain_devices = track_or_chain.devices if liveobj_valid(track_or_chain) else []
	devices = []
	for device in chain_devices:
		devices.append((device, nesting_level))
		if device.can_have_drum_pads and device.view.selected_drum_pad:
			devices.append((device.view.selected_drum_pad, nesting_level + 1))
		devices.extend(collect_devices(nested_device_parent(device), nesting_level=nesting_level + 1))

	return devices


def delete_device(device):
	device_parent = device.canonical_parent
	device_index = list(device_parent.devices).index(device)
	device_parent.delete_device(device_index)


def drum_rack_for_pad(drum_pad):
	return drum_pad.canonical_parent


class SpecialBankSelectionComponent(BankSelectionComponent):

	color_class_name = u'BankSelection'

	def _create_slot(self, index, item, nesting_level):
		items = self._item_provider.items[self.item_offset:]
		num_slots = min(self._num_visible_items, len(items))
		slot = None
		if index == 0 and self.can_scroll_left():
			slot = IconItemSlot(name=u'<-', icon=u'page_left.svg')
			slot.is_scrolling_indicator = True
		elif index == num_slots - 1 and self.can_scroll_right():
			slot = IconItemSlot(name=u'->', icon=u'page_right.svg')
			slot.is_scrolling_indicator = True
		else:
			slot = ItemSlot(item=item, nesting_level=nesting_level)
			slot.is_scrolling_indicator = False
		return slot


	def update(self, *a, **k):
		super(SpecialBankSelectionComponent, self).update(*a, **k)
		if self.is_enabled():
			self._update_button_colors()

	def _color_for_button(self, button_index, is_selected):
		debug('color_for_button:', button_index, is_selected)
		if is_selected:
			return self.color_class_name + u'.ItemSelected'
		return self.color_class_name + u'.ItemNotSelected'



class SpecialChainSelectionComponent(ChainSelectionComponent):

	color_class_name = u'ChainNavigation'

	def _on_select_button_pressed(self, button):
		super(SpecialChainSelectionComponent, self)._on_select_button_pressed(button)
		self._parent._exit_chain_selection()

	def _create_slot(self, index, item, nesting_level):
		#debug('ChainSelector._create_slot')
		items = self._item_provider.items[self.item_offset:]
		num_slots = min(self._num_visible_items, len(items))
		slot = None
		if index == 0 and self.can_scroll_left():
			slot = IconItemSlot(name=u'<-', icon=u'page_left.svg')
			slot.is_scrolling_indicator = True
		elif index == num_slots - 1 and self.can_scroll_right():
			slot = IconItemSlot(name=u'->', icon=u'page_right.svg')
			slot.is_scrolling_indicator = True
		else:
			slot = ItemSlot(item=item, nesting_level=nesting_level)
			slot.is_scrolling_indicator = False
		return slot

	def update(self, *a, **k):
		super(SpecialChainSelectionComponent, self).update(*a, **k)
		if self.is_enabled():
			self._update_button_colors()

	def _color_for_button(self, button_index, is_selected):
		if is_selected:
			return self.color_class_name + u'.ItemSelected'
		return self.color_class_name + u'.ItemNotSelected'

	# def _scroll_left(self):
	# 	debug('scroll_left')
	# 	super(SpecialChainSelectionComponent, self)._scroll_left()
	# 	debug('scroll_left finished')



class DeviceChainStateWatcher(EventObject):
	u"""
	Listens to the device navigations items and notifies whenever the items state
	changes and the color of the buttons might be affected.
	"""
	__events__ = (u'state',)

	def __init__(self, device_navigation = None, *a, **k):
		assert device_navigation is not None
		super(DeviceChainStateWatcher, self).__init__(*a, **k)
		self._device_navigation = device_navigation
		self.__on_items_changed.subject = device_navigation
		self._update_listeners_and_notify()

	@listens(u'items')
	def __on_items_changed(self, *a):
		self._update_listeners_and_notify()

	@listens_group(u'is_active')
	def __on_is_active_changed(self, device):
		self.notify_state()

	@listens_group(u'color_index')
	def __on_chain_color_index_changed(self, chain):
		self.notify_state()

	@listens(u'mute')
	def __on_mute_changed(self):
		self.notify_state()

	def _navigation_items(self):
		return ifilter(lambda i: not i.is_scrolling_indicator, self._device_navigation.items)

	def _devices(self):
		device_items = ifilter(lambda i: not is_drum_pad(i.item), self._navigation_items())
		return map(lambda i: i.item, device_items)

	def _update_listeners_and_notify(self):
		items = list(self._navigation_items())
		chains = set(filter(liveobj_valid, imap(lambda i: find_chain_or_track(i.item), items)))
		self.__on_is_active_changed.replace_subjects(self._devices())
		self.__on_mute_changed.subject = find_drum_pad(items)
		self.__on_chain_color_index_changed.replace_subjects(chains)
		self.notify_state()


class MoveDeviceComponent(Component):
	MOVE_DELAY = 0.1
	move_encoders = control_list(StepEncoderControl)

	def __init__(self, *a, **k):
		super(MoveDeviceComponent, self).__init__(*a, **k)
		self._device = None

	def set_device(self, device):
		self._device = device

	@move_encoders.value
	def move_encoders(self, value, encoder):
		if liveobj_valid(self._device):
			with self._disabled_encoders():
				if value > 0:
					self._move_right()
				else:
					self._move_left()

	@contextmanager
	def _disabled_encoders(self):
		self._disable_all_encoders()
		yield
		self._tasks.add(task.sequence(task.wait(self.MOVE_DELAY), task.run(self._enable_all_encoders)))

	def _disable_all_encoders(self):
		for encoder in self.move_encoders:
			encoder.enabled = False

	def _enable_all_encoders(self):
		for encoder in self.move_encoders:
			encoder.enabled = True

	def _move_right(self):
		parent = self._device.canonical_parent
		device_index = list(parent.devices).index(self._device)
		if device_index == len(parent.devices) - 1 and isinstance(parent, Live.Chain.Chain):
			self._move_out(parent.canonical_parent, move_behind=True)
		elif device_index < len(parent.devices) - 1:
			right_device = parent.devices[device_index + 1]
			if right_device.can_have_chains and right_device.view.is_showing_chain_devices and right_device.view.selected_chain:
				self._move_in(right_device)
			else:
				self.song.move_device(self._device, parent, device_index + 2)

	def _move_left(self):
		parent = self._device.canonical_parent
		device_index = list(parent.devices).index(self._device)
		if device_index > 0:
			left_device = parent.devices[device_index - 1]
			if left_device.can_have_chains and left_device.view.is_showing_chain_devices and left_device.view.selected_chain:
				self._move_in(left_device, move_to_end=True)
			else:
				self.song.move_device(self._device, parent, device_index - 1)
		elif isinstance(parent, Live.Chain.Chain):
			self._move_out(parent.canonical_parent)

	def _move_out(self, rack, move_behind = False):
		parent = rack.canonical_parent
		rack_index = list(parent.devices).index(rack)
		self.song.move_device(self._device, parent, rack_index + 1 if move_behind else rack_index)

	def _move_in(self, rack, move_to_end = False):
		chain = rack.view.selected_chain
		if chain:
			self.song.move_device(self._device, chain, len(chain.devices) if move_to_end else 0)


class DeviceNavigationComponent(DeviceNavigationComponentBase):
	__events__ = (u'drum_pad_selection', u'mute_solo_stop_cancel_action_performed')
	color_class_name = u'DeviceNavigation'

	def __init__(self, device_bank_registry = None, banking_info = None, delete_handler = None, track_list_component = None, *a, **k):
		assert banking_info is not None
		assert device_bank_registry is not None
		assert track_list_component is not None
		self._flattened_chain = FlattenedDeviceChain(collect_devices)
		self._track_decorator = DecoratorFactory()
		self._modes = NullModes()
		self.move_device = None
		super(DeviceNavigationComponent, self).__init__(item_provider=self._flattened_chain, *a, **k)
		self._delete_handler = delete_handler
		self.chain_selection = SpecialChainSelectionComponent(parent=self, is_enabled=False)
		self.bank_selection = SpecialBankSelectionComponent(bank_registry=device_bank_registry, banking_info=banking_info, device_options_provider=self._device_component, is_enabled=False, parent=self)
		self.move_device = MoveDeviceComponent(parent=self, is_enabled=False)
		self._last_pressed_button_index = -1
		self._selected_on_previous_press = None
		self._was_in_chain_mode = False
		self._modes = ModesComponent(parent=self)
		self._modes.add_mode(u'default', [partial(self.chain_selection.set_parent, None), partial(self.bank_selection.set_device, None), self.update_item_name_listeners, DelayMode(self.update, delay = .05, parent_task_group = self._tasks)])
		self._modes.add_mode(u'chain_selection', [self.chain_selection, self.update_item_name_listeners, DelayMode(self.update, delay = .05, parent_task_group = self._tasks)])
		self._modes.add_mode(u'bank_selection', [self.bank_selection, self.update_item_name_listeners, DelayMode(self.update, delay = .05, parent_task_group = self._tasks)])
		self._modes.selected_mode = u'default'
		self.register_disconnectable(self._flattened_chain)
		self.__on_items_changed.subject = self
		self.__on_bank_selection_closed.subject = self.bank_selection
		self.__on_bank_items_changed.subject = self.bank_selection
		self.__on_chain_items_changed.subject = self.chain_selection
		# self.__on_chain_selection_closed.subject = self.chain_selection
		self._update_selected_track()
		self._track_list = track_list_component
		watcher = self.register_disconnectable(DeviceChainStateWatcher(device_navigation=self))
		self.__on_device_item_state_changed.subject = watcher
		self._on_mode_changed.subject = self._modes
		self._update_device()
		self._update_button_colors()


	def _update_button_colors(self, *a, **k):
		super(DeviceNavigationComponent, self)._update_button_colors()

	def update(self, *a, **k):
		super(DeviceNavigationComponent, self).update(*a, **k)
		if self.is_enabled():
			self._update_button_colors()
			self.chain_selection._update_button_colors()
			self.bank_selection._update_button_colors()

	@property
	def modes(self):
		return self._modes

	@listens('selected_mode')
	def _on_mode_changed(self, *a, **k):
		self._update_button_colors()
		self.chain_selection._update_button_colors()
		self.bank_selection._update_button_colors()

	def _in_device_enabling_mode(self):
		return self._track_list.selected_mode == u'mute'

	def _on_select_button_pressed(self, button):
		device_or_pad = self.items[button.index].item
		# if self._in_device_enabling_mode():
		# 	self._toggle_device(device_or_pad)
		# 	self.notify_mute_solo_stop_cancel_action_performed()
		# else:
		self._last_pressed_button_index = button.index
		if not self._delete_handler or not self._delete_handler.is_deleting:
			self._selected_on_previous_press = device_or_pad if self.selected_object != device_or_pad else None
			self._was_in_chain_mode = self._modes.selected_mode == u'chain_selection'
			debug('was_in_chain_mode:', self._was_in_chain_mode)
			self._select_item(device_or_pad)

	def _on_select_button_released_immediately(self, button):
		if not self._in_device_enabling_mode():
			self._last_pressed_button_index = -1
			device_or_pad = self.items[button.index].item
			if self._delete_handler and self._delete_handler.is_deleting:
				self._delete_item(device_or_pad)
			elif self.selected_object == device_or_pad and device_or_pad != self._selected_on_previous_press:
				self._on_reselecting_object(device_or_pad)
			self._selected_on_previous_press = None

	def _on_select_button_pressed_delayed(self, button):
		if not self._in_device_enabling_mode():
			self._on_pressed_delayed(self.items[button.index].item)

	def _on_select_button_released(self, button):
		if button.index == self._last_pressed_button_index:
			self._modes.selected_mode = u'default'
			self._last_pressed_button_index = -1
			self._end_move_device()

	@dispatch(Live.DrumPad.DrumPad)
	def _toggle_device(self, drum_pad):
		if liveobj_valid(drum_pad):
			drum_pad.mute = not drum_pad.mute

	@dispatch(object)
	def _toggle_device(self, device):
		if liveobj_valid(device) and device.parameters[0].is_enabled:
			set_enabled(device, not is_on(device))

	@listens(u'state')
	def __on_device_item_state_changed(self):
		self._update_button_colors()
		# debug('adding task...')
		self._tasks.add(self._update_button_colors)

	@listenable_property
	def item_names(self):
		items = ['-' for index in range(16)]
		if self._modes.selected_mode == u'default' or self._modes.selected_mode == u'chain_selection':
			new_items = [(item.name).decode('utf-8', 'ignore').replace(' ', '_') if hasattr(item, 'name') else '-' for item in self.items]
			items[:len(new_items)] = new_items
			#debug('mode is default, names are:', items)
		if self._modes.selected_mode == u'chain_selection':
			items[8:] = [(item.name).decode('utf-8', 'ignore').replace(' ', '_') if hasattr(item, 'name') else '-' for item in self.chain_selection.items]
			#debug('mode is chain_selection, names are:', items)
		elif self._modes.selected_mode == u'bank_selection':
			items[8:] = [(item.name).decode('utf-8', 'ignore').replace(' ', '_') if hasattr(item, 'name') else '-' for item in self.bank_selection.items]
			#debug('mode is bank_selection, names are:', items)
		#debug('item names are:', items)
		return items

	@listens(u'items')
	def __on_bank_items_changed(self):
		# new_items = map(lambda x: x.item, self.bank_selection.items)
		# names = self.item_names
		# self.notify_item_names()
		self.update_item_name_listeners()

	@listens(u'items')
	def __on_chain_items_changed(self):
		# names = self.item_names
		# self.notify_item_names()
		# new_items = map(lambda x: x.item, self.chain_selection.items)
		self.update_item_name_listeners()

	@listens(u'items')
	def __on_items_changed(self):
		new_items = map(lambda x: x.item, self.items)
		lost_selection_on_empty_pad = new_items and is_drum_pad(new_items[-1]) and self._flattened_chain.selected_item not in new_items
		if self._should_select_drum_pad() or lost_selection_on_empty_pad:
			self._select_item(self._current_drum_pad())
		if self.moving:
			self._show_selected_item()
		self.notify_drum_pad_selection()
		self.update_item_name_listeners()

	def update_item_name_listeners(self):
		names = self.item_names
		self.notify_item_names(*names)

	def _create_slot(self, index, item, nesting_level):
		items = self._item_provider.items[self.item_offset:]
		num_slots = min(self._num_visible_items, len(items))
		slot = None
		if index == 0 and self.can_scroll_left():
			slot = IconItemSlot(name='<-', icon=u'page_left.svg')
			slot.is_scrolling_indicator = True
		elif index == num_slots - 1 and self.can_scroll_right():
			slot = IconItemSlot(name='->', icon=u'page_right.svg')
			slot.is_scrolling_indicator = True
		else:
			slot = ItemSlot(item=item, nesting_level=nesting_level)
			slot.is_scrolling_indicator = False
		return slot

	@listenable_property
	def moving(self):
		return self.move_device.is_enabled()

	@property
	def device_selection_update_allowed(self):
		return not self._should_select_drum_pad()

	def _color_for_button(self, button_index, is_selected):
		item = self.items[button_index]
		device_or_pad = item.item
		is_active = liveobj_valid(device_or_pad) and is_active_element(device_or_pad)
		chain = find_chain_or_track(device_or_pad)
		if not is_active:
			return u'DefaultButton.Off'
		elif is_selected:
			return u'ItemNavigation.ItemSelected'
		elif liveobj_valid(chain):
			# return IndexedColor.from_live_index(chain.color_index, DISPLAY_BUTTON_SHADE_LEVEL)
			return u'ItemNavigation.ItemNotSelected'
		else:
			return u'ItemNavigation.ItemNotSelected'

	def _begin_move_device(self, device):
		if not self.move_device.is_enabled() and device.type != Live.Device.DeviceType.instrument:
			self.move_device.set_device(device)
			self.move_device.set_enabled(True)
			self._scroll_overlay.set_enabled(False)
			self.notify_moving()

	def _end_move_device(self):
		if self.move_device and self.move_device.is_enabled():
			self.move_device.set_device(None)
			self.move_device.set_enabled(False)
			self._scroll_overlay.set_enabled(True)
			self.notify_moving()

	def request_drum_pad_selection(self):
		self._current_track().drum_pad_selected = True

	def unfold_current_drum_pad(self):
		self._current_track().drum_pad_selected = False
		self._current_drum_pad().canonical_parent.view.is_showing_chain_devices = True

	def sync_selection_to_selected_device(self):
		self._update_item_provider(self.song.view.selected_track.view.selected_device)

	@property
	def is_drum_pad_selected(self):
		return is_drum_pad(self._flattened_chain.selected_item)

	@property
	def is_drum_pad_unfolded(self):
		selection = self._flattened_chain.selected_item
		assert is_drum_pad(selection)
		return drum_rack_for_pad(selection).view.is_showing_chain_devices

	def _current_track(self):
		return self._track_decorator.decorate(self.song.view.selected_track, additional_properties={u'drum_pad_selected': False})

	def _should_select_drum_pad(self):
		return self._current_track().drum_pad_selected

	def _current_drum_pad(self):
		return find_drum_pad(self.items)

	def _update_selected_track(self):
		self._selected_track = self.song.view.selected_track
		selected_track = self._current_track()
		self.reset_offset()
		self._flattened_chain.set_device_parent(selected_track)
		self._device_selection_in_track_changed.subject = selected_track.view
		self._modes.selected_mode = u'default'
		self._end_move_device()
		self._restore_selection(selected_track)

	def _restore_selection(self, selected_track):
		to_select = None
		if self._should_select_drum_pad():
			to_select = self._current_drum_pad()
		if to_select == None:
			to_select = selected_track.view.selected_device
		self._select_item(to_select)

	def back_to_top(self):
		pass

	@property
	def selected_object(self):
		selected_item = self.item_provider.selected_item
		return getattr(selected_item, u'proxied_object', selected_item)

	@dispatch(Live.DrumPad.DrumPad)
	def _do_select_item(self, pad):
		self._current_track().drum_pad_selected = True
		device = self._first_device_on_pad(pad)
		self._appoint_device(device)

	def _first_device_on_pad(self, drum_pad):
		chain = drum_rack_for_pad(drum_pad).view.selected_chain
		if chain and chain.devices:
			return first(chain.devices)

	def _appoint_device(self, device):
		if self._device_component._device_changed(device):
			self._device_component.set_device(device)

	# def _select_item(self, device_or_pad):
	# 	debug('_select_item:', self._modes.selected_mode)
	# 	if self._modes.selected_mode == u'chain_selection':
	# 		self._modes.selected_mode = u'default'
	# 	else:
	# 		super(DeviceNavigationComponent, self)._select_item(device_or_pad)

	@dispatch(object)
	def _do_select_item(self, device):
		self._current_track().drum_pad_selected = False
		appointed_device = device_to_appoint(device)
		self._appoint_device(appointed_device)
		self.song.view.select_device(device, False)
		self.song.appointed_device = appointed_device


	@dispatch(Live.DrumPad.DrumPad)
	def _on_reselecting_object(self, drum_pad):
		# debug('_on_reselecting_object drumpad')
		# if self._modes.selected_mode is u'chain_selection':
		# 	self._modes.selected_mode = u'default'
		# else:
		rack = drum_rack_for_pad(drum_pad)
		self._toggle(rack)
		if rack.view.is_showing_chain_devices:
			first_device = self._first_device_on_pad(drum_pad)
			if first_device:
				self._select_item(first_device)
		self.notify_drum_pad_selection()

	@dispatch(object)
	def _on_reselecting_object(self, device):
		debug('_on_reselecting_object object',  self._modes.selected_mode)
		# if self._modes.selected_mode is u'chain_selection':
		# 	self._modes.selected_mode = u'default'
		# 	debug('just set mode to default...')
		if liveobj_valid(device) and device.can_have_chains:
			if not device.can_have_drum_pads:
				self._toggle(device)
			else:
				if self._was_in_chain_mode:
					self._modes.selected_mode = u'default'
					self._was_in_chain_mode = False
				else:
					self._show_chains(device)

		else:
			self.bank_selection.set_device(device)
			self._modes.selected_mode = u'bank_selection'

	@dispatch(Live.DrumPad.DrumPad)
	def _on_pressed_delayed(self, _):
		pass

	@dispatch(object)
	def _on_pressed_delayed(self, device):
		self._show_chains(device)
		self._begin_move_device(device)

	@dispatch(Live.DrumPad.DrumPad)
	def _delete_item(self, pad):
		pass

	@dispatch(object)
	def _delete_item(self, device):
		delete_device(device)

	def _show_chains(self, device):
		if device.can_have_chains:
			self.chain_selection.set_parent(device)
			self._modes.selected_mode = u'chain_selection'

	@listens(u'back')
	def __on_bank_selection_closed(self):
		self._modes.selected_mode = u'default'

	@listens(u'back')
	def __on_chain_selection_closed(self):
		self._modes.selected_mode = u'default'

	def _exit_chain_selection(self):
		debug('last_pressed_button:', self._last_pressed_button_index)

	def _update_device(self):
		if not self._should_select_drum_pad() and not self._is_drum_rack_selected():
			self._modes.selected_mode = u'default'
			self._update_item_provider(self._device_component.device())

	def _is_drum_rack_selected(self):
		selected_item = self._flattened_chain.selected_item
		instrument = self._find_top_level_instrument()
		return liveobj_valid(selected_item) and isinstance(selected_item, Live.RackDevice.RackDevice) and selected_item.can_have_drum_pads and not liveobj_changed(selected_item, instrument)

	def _find_top_level_instrument(self):
		return find_if(lambda device: device.type == Live.Device.DeviceType.instrument, self._current_track().devices)

	@listens(u'selected_device')
	def _device_selection_in_track_changed(self):
		new_selection = self.song.view.selected_track.view.selected_device
		if self._can_update_device_selection(new_selection):
			self._modes.selected_mode = u'default'
			self._update_item_provider(new_selection)

	def _toggle(self, item):
		view = item.view
		if view.is_collapsed:
			view.is_collapsed = False
			view.is_showing_chain_devices = True
		else:
			view.is_showing_chain_devices = not view.is_showing_chain_devices

	def _can_update_device_selection(self, new_selection):
		can_update = liveobj_valid(new_selection)
		drum_pad_selected_or_requested = self.is_drum_pad_selected or self._should_select_drum_pad()
		if can_update and drum_pad_selected_or_requested:
			if is_empty_rack(new_selection):
				can_update = False
			if can_update and self.is_drum_pad_selected:
				can_update = not is_first_device_on_pad(new_selection, self._flattened_chain.selected_item)
		elif not can_update and not drum_pad_selected_or_requested:
			can_update = True
		return can_update

	def _update_item_provider(self, selection):
		self._flattened_chain.selected_item = selection
		if not is_drum_pad(selection):
			self._current_track().drum_pad_selected = False
		self.notify_drum_pad_selection()
