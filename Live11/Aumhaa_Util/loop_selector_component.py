
import math
import Live
from contextlib import contextmanager
from functools import partial

_Q = Live.Song.Quantization

from .Map import FAVORITE_CLIP_COLOR

from ableton.v2.base import EventObject, clamp, listenable_property, listens, liveobj_changed, liveobj_valid, nop, task
from ableton.v2.control_surface import defaults, Component
from ableton.v2.control_surface.control import ButtonControl, control_matrix, PlayableControl
from pushbase.step_duplicator import NullStepDuplicator, set_loop
from pushbase.consts import MessageBoxText
from pushbase.message_box_component import Messenger
from pushbase.pad_control import PadControl

from aumhaa.v2.base.debug import initialize_debug

debug = initialize_debug()


def create_clip_in_selected_slot(creator, song, clip_length = None):
	"""
	Create a new clip in the selected slot of if none exists, using a
	given creator object.  Fires it if the song is playing and
	displays it in the detail view.
	"""
	selected_slot = song.view.highlighted_clip_slot
	if creator and selected_slot and not selected_slot.has_clip:
		creator.create(selected_slot, clip_length, legato_launch=True)
		song.view.detail_clip = selected_slot.clip
	return selected_slot.clip


def clip_is_new_recording(clip):
	return clip.is_recording and not clip.is_overdubbing


class Paginator(EventObject):
	"""
	Paginator interface for objects that split continuous time into
	discrete pages.  This can be used as trivial paginator splits time
	into one single infinite-length page.
	"""
	__events__ = ('page', 'page_index', 'page_length')

	@property
	def can_change_page(self):
		return True

	@property
	def page_length(self):
		"""
		Length of a given page.
		"""
		# return 2147483648.0
		return 32.0

	@property
	def page_index(self):
		"""
		Index of the currently selected page.
		"""
		return 0

	def select_page_in_point(self, value):
		"""
		Select the page that falls in the given time point. Returns True if page was
		selected.
		"""
		return True

class LoopSelectorPaginator(Component, Paginator):

	def __init__(self, loop_selector = None, page_length = 32, *a, **k):
		super(LoopSelectorPaginator, self).__init__(*a, **k)
		self._last_page_index = -1
		self._page_index = 0
		self._page_length = page_length
		self._loop_selector = loop_selector

	@property
	def page_length(self):
		return self._page_length

	@property
	def page_index(self):
		# debug('page_index:', self._page_index)
		return self._page_index

	def update(self):
		super(LoopSelectorPaginator, self).update()
		if self.is_enabled():
			self.notify_page_index()
			self.notify_page_length()

	def _update_from_page_index(self):
		needed_update = self._last_page_index != self._page_index
		if needed_update:
			self._last_page_index = self._page_index
			# if self.is_enabled():
			debug('updating page index:', self._page_index)
			self.notify_page_index()
		return needed_update

	@property
	def can_change_page(self):
		# return all([ e.can_change_page for e in self._note_editors ])
		# if liveobj_valid(self._loop_selector._sequencer_clip):
		# 	length = self._loop_selector._sequencer_clip
		return True


	def select_page_in_point(self, value):
		can_change_page = self.can_change_page
		debug('select_page_in_point:', value)
		if can_change_page:
			# map(lambda e: e.set_selected_page_point(value), self._note_editors)
			# if self._update_from_page_index() and self.is_enabled():
			# 	self.notify_page()
			self._page_index = int(value / self._page_length / self._loop_selector._page_length_in_beats) * 32
			debug('the page index is now:', self._page_index)
			self._update_from_page_index()
		return can_change_page


class LoopSelectorComponent(Component, Messenger):
	"""
	Component that uses a button matrix to display the timeline of a
	clip. It allows you to select the loop of the clip and a page
	within it of a given Paginator object.
	"""
	play_selected_clip_button = ButtonControl(color="LoopSelector.Bank")
	favorite_clip_color_button = ButtonControl(color="LoopSelector.Bank")
	fix_grid_button = ButtonControl(color="LoopSelector.Bank")
	loop_length_1_button = ButtonControl(color="LoopSelector.Bank")
	loop_length_2_button = ButtonControl(color="LoopSelector.Bank")
	loop_length_4_button = ButtonControl(color="LoopSelector.Bank")
	loop_length_8_button = ButtonControl(color="LoopSelector.Bank")
	loop_length_16_button = ButtonControl(color="LoopSelector.Bank")
	next_page_button = ButtonControl(color="LoopSelector.Bank")
	prev_page_button = ButtonControl(color="LoopSelector.Bank")
	shift_loop_right_keycommand_button = ButtonControl(color="LoopSelector.ShiftLoop")
	shift_loop_left_keycommand_button = ButtonControl(color="LoopSelector.ShiftLoop")
	shift_loop_right_button = ButtonControl(color="LoopSelector.ShiftLoop")
	shift_loop_left_button = ButtonControl(color="LoopSelector.ShiftLoop")
	latest_loop_button = ButtonControl(color="LoopSelector.LatestLoop")
	latest_loop_keycommand_button = ButtonControl(color="LoopSelector.LatestLoop")
	delete_button = ButtonControl()
	select_button = ButtonControl()
	loop_selector_matrix = control_matrix(PadControl, sensitivity_profile='loop', mode=PlayableControl.Mode.listenable)
	short_loop_selector_matrix = control_matrix(ButtonControl)
	is_following = listenable_property.managed(False)

	def __init__(self, clip_creator = None, measure_length = 4.0, follow_detail_clip = False, paginator = None, default_size = None, *a, **k):
		super(LoopSelectorComponent, self).__init__(*a, **k)
		assert default_size is not None
		self._clip_creator = clip_creator
		self._sequencer_clip = None
		self._paginator = LoopSelectorPaginator(loop_selector = self)
		self._loop_start = 0
		self._loop_end = 0
		self._loop_length = 0
		self._default_size = default_size
		self._pressed_pages = []
		self._page_colors = []
		self._measure_length = measure_length
		self._last_playhead_page = -1

		def set_is_following_true():
			self.is_following = True

		self._follow_task = self._tasks.add(task.sequence(task.wait(defaults.MOMENTARY_DELAY), task.run(set_is_following_true)))
		self._follow_task.kill()
		self.set_step_duplicator(None)
		self._notification_reference = partial(nop, None)
		self.is_deleting = False
		if follow_detail_clip:
			self._on_detail_clip_changed.subject = self.song.view
			self._on_detail_clip_changed()
		self._on_session_record_changed.subject = self.song
		self._on_song_playback_status_changed.subject = self.song
		if self._paginator is not None:
			self.set_paginator(self._paginator)

	def set_paginator(self, paginator):
		self._paginator = paginator or Paginator()
		self._on_page_index_changed.subject = paginator
		self._on_page_length_changed.subject = paginator
		self._update_page_colors()

	@listens('page_index')
	def _on_page_index_changed(self):
		debug('_on_page_index_changed')
		self._update_page_colors()

	@listens('page_length')
	def _on_page_length_changed(self):
		self._update_page_colors()
		# self._select_start_page()

	def set_step_duplicator(self, duplicator):
		self._step_duplicator = duplicator or NullStepDuplicator()
		self._step_duplicator.set_clip(self._sequencer_clip)

	@listens('detail_clip')
	def _on_detail_clip_changed(self):
		self.set_detail_clip(self.song.view.detail_clip)

	def set_detail_clip(self, clip):
		if liveobj_changed(clip, self._sequencer_clip):
			self.is_following = liveobj_valid(clip) and (self.is_following or clip_is_new_recording(clip))
			self._on_playing_position_changed.subject = clip
			self._on_playing_status_changed.subject = clip
			self._on_loop_start_changed.subject = clip
			self._on_loop_end_changed.subject = clip
			self._on_is_recording_changed.subject = clip
			self._sequencer_clip = clip
			self._step_duplicator.set_clip(clip)
			self._on_loop_changed()

	def _select_start_page(self):
		if liveobj_valid(self._sequencer_clip):
			page_start = self._paginator.page_index * self._paginator.page_length
			to_select = page_start
			if page_start <= self._sequencer_clip.loop_start:
				to_select = self._sequencer_clip.loop_start
			elif page_start >= self._sequencer_clip.loop_end:
				to_select = max(self._sequencer_clip.loop_end - self._paginator.page_length, self._sequencer_clip.loop_start)
			self._paginator.select_page_in_point(to_select)

	@listens('loop_start')
	def _on_loop_start_changed(self):
		self._on_loop_changed()

	@listens('loop_end')
	def _on_loop_end_changed(self):
		self._on_loop_changed()

	def _on_loop_changed(self):
		if liveobj_valid(self._sequencer_clip):
			self._loop_start = self._sequencer_clip.loop_start
			self._loop_end = self._sequencer_clip.loop_end
			self._loop_length = self._loop_end - self._loop_start
		else:
			self._loop_start = 0
			self._loop_end = 0
			self._loop_length = 0
		# self._select_start_page()
		self._update_page_colors()

	def set_loop_selector_matrix(self, matrix):
		self.loop_selector_matrix.set_control_element(matrix)
		self._update_page_colors()

	def set_short_loop_selector_matrix(self, matrix):
		self.short_loop_selector_matrix.set_control_element(matrix)
		self._update_page_colors()

	def update(self):
		super(LoopSelectorComponent, self).update()
		self._update_page_and_playhead_leds()

	@listens('is_recording')
	def _on_is_recording_changed(self):
		self.is_following = self.is_following or clip_is_new_recording(self._sequencer_clip)

	@listens('playing_position')
	def _on_playing_position_changed(self):
		self._update_page_and_playhead_leds()
		self._update_page_selection()

	@listens('playing_status')
	def _on_playing_status_changed(self):
		self._update_page_and_playhead_leds()

	@listens('session_record')
	def _on_session_record_changed(self):
		self._update_page_and_playhead_leds()

	@listens('is_playing')
	def _on_song_playback_status_changed(self):
		self._update_page_and_playhead_leds()

	def _has_running_clip(self):
		return liveobj_valid(self._sequencer_clip) and (self._sequencer_clip.is_playing or self._sequencer_clip.is_recording)

	def _update_page_selection(self):
		if self.is_enabled() and self.is_following and self._has_running_clip():
			position = self._sequencer_clip.playing_position
			# self._paginator.select_page_in_point(position)

	def _update_page_and_playhead_leds(self):

		@contextmanager
		def save_page_color(page_colors, page):
			old_page_value = page_colors[page]
			yield
			page_colors[page] = old_page_value

		@contextmanager
		def replace_and_restore_tail_colors(page_colors, page):
			if clip_is_new_recording(self._sequencer_clip):
				old_tail_values = page_colors[page + 1:]
				page_colors[page + 1:] = ['LoopSelector.OutsideLoop'] * len(old_tail_values)
			yield
			if clip_is_new_recording(self._sequencer_clip):
				page_colors[page + 1:] = old_tail_values

		if self.is_enabled() and self._has_running_clip():
			position = self._sequencer_clip.playing_position
			visible_page = int(position / self._page_length_in_beats) - self.page_offset
			page_colors = self._page_colors
			if 0 <= visible_page < len(page_colors):
				with save_page_color(page_colors, visible_page):
					if self.song.is_playing:
						page_colors[visible_page] = 'LoopSelector.PlayheadRecord' if self.song.session_record else 'LoopSelector.Playhead'
					with replace_and_restore_tail_colors(page_colors, visible_page):
						self._update_page_leds()
			else:
				self._update_page_leds()
			self._last_playhead_page = visible_page
		else:
			self._update_page_leds()

	def _get_size(self):
		return max(self.loop_selector_matrix.control_count, self.short_loop_selector_matrix.control_count, self._default_size)

	def _get_loop_in_pages(self):
		page_length = self._page_length_in_beats
		loop_start = int(self._loop_start / page_length)
		loop_end = int(self._loop_end / page_length)
		loop_length = loop_end - loop_start + int(self._loop_end % page_length != 0)
		return (loop_start, loop_length)

	def _selected_pages_range(self):
		size = self._get_size()
		page_length = self._page_length_in_beats
		seq_page_length = max(self._paginator.page_length / page_length, 1)
		seq_page_start = int(self._paginator.page_index * self._paginator.page_length / page_length)
		seq_page_end = int(min(seq_page_start + seq_page_length, self.page_offset + size))
		return (seq_page_start, seq_page_end)

	def _update_page_colors(self):
		"""
		Update the offline array mapping the timeline of the clip to buttons.
		"""
		page_length = self._page_length_in_beats
		size = self._get_size()

		def calculate_page_colors():
			l_start, l_length = self._get_loop_in_pages()
			page_offset = self.page_offset
			pages_per_measure = int(self._one_measure_in_beats / page_length)

			def color_for_page(absolute_page):
				if l_start <= absolute_page < l_start + l_length:
					if absolute_page % pages_per_measure == 0:
						return 'LoopSelector.InsideLoopStartBar'
					return 'LoopSelector.InsideLoop'
				else:
					return 'LoopSelector.OutsideLoop'

			return list(map(color_for_page, range(page_offset, page_offset + size)))

		def mark_selected_pages(page_colors):
			for page_index in range(*self._selected_pages_range()):
				button_index = page_index - self.page_offset
				if page_colors[button_index].startswith('LoopSelector.InsideLoop'):
					page_colors[button_index] = 'LoopSelector.SelectedPage'

		page_colors = calculate_page_colors()
		mark_selected_pages(page_colors)
		self._page_colors = page_colors
		self._update_page_and_playhead_leds()

	def _update_page_leds(self):
		self._update_page_leds_in_matrix(self.loop_selector_matrix)
		self._update_page_leds_in_matrix(self.short_loop_selector_matrix)

	def _update_page_leds_in_matrix(self, matrix):
		""" update hardware leds to match precomputed map """
		if self.is_enabled() and matrix:
			for button, color in zip(matrix, self._page_colors):
				button.color = color

	def _jump_to_page(self, next_page):
		start, length = self._get_loop_in_pages()
		debug('_jump_to_page:', start, length, next_page)
		# debug('page_length_in_beats', self._page_length_in_beats)
		if next_page >= start + length:
			next_page = start
		elif next_page < start:
			next_page = start + length - 1
		# debug('select_page_in_point:', next_page * self._page_length_in_beats)
		self._paginator.select_page_in_point(next_page * self._page_length_in_beats)

	@next_page_button.pressed
	def next_page_button(self, button):
		debug('next_page_button.pressed')
		if self.is_following:
			self.is_following = False
		# else:
			# _, end = self._selected_pages_range()
			# debug('end:', end)
			# self._jump_to_page(end)
		self._paginator._page_index = self._paginator._page_index + 32
		self._paginator._update_from_page_index()
		self._follow_task.restart()

	@next_page_button.released
	def next_page_button(self, button):
		self._follow_task.kill()

	@prev_page_button.pressed
	def prev_page_button(self, button):
		if self.is_following:
			self.is_following = False
		# else:
			# begin, end = self._selected_pages_range()
			# self._jump_to_page(begin - (end - begin))
		self._paginator._page_index = max(self._paginator._page_index - 32, 0)
		self._paginator._update_from_page_index()
		self._follow_task.restart()

	@prev_page_button.released
	def prev_page_button(self, button):
		self._follow_task.kill()

	@short_loop_selector_matrix.pressed
	def short_loop_selector_matrix(self, button):
		if self.is_enabled():
			page = self._get_corresponding_page(button, self.short_loop_selector_matrix)
			self._pressed_pages = [page]
			self._try_set_loop()
			self._pressed_pages = []

	@loop_selector_matrix.pressed
	def loop_selector_matrix(self, button):
		if self.is_enabled():
			page = self._get_corresponding_page(button, self.loop_selector_matrix)
			if page not in self._pressed_pages:
				self._on_press_loop_selector_matrix(page)

	@loop_selector_matrix.released
	def loop_selector_matrix(self, button):
		page = self._get_corresponding_page(button, self.loop_selector_matrix)
		if page in self._pressed_pages:
			self._pressed_pages.remove(page)

	def _get_corresponding_page(self, button, matrix):
		y, x = button.coordinate
		return x + y * matrix.width

	def _quantize_page_index(self, page_index, quant):
		page_length = self._page_length_in_beats  #.25 - 4
		return quant * float(int(page_length * page_index / quant))

	def _clear_page(self, page):
		page_start, page_end = self._selected_pages_time_range(page)
		notes = self._sequencer_clip.get_notes(page_start, 0, page_end, 128)
		if len(notes) > 0:
			self._sequencer_clip.remove_notes(page_start, 0, page_end - page_start, 128)
			self._notification_reference = self.show_notification(MessageBoxText.PAGE_CLEARED)
		else:
			self._notification_reference = self.show_notification(MessageBoxText.CANNOT_CLEAR_EMPTY_PAGE)

	def _selected_pages_time_range(self, page):
		page_start = 0
		page_end = 0
		page_length = self._page_length_in_beats
		if self._loop_length > page_length:
			range_start, range_end = self._selected_pages_range()
			page_start = range_start * page_length
			page_end = range_end * page_length
		else:
			page_start = page * page_length
			page_end = page_start + page_length
		return (page_start, page_end)

	def _add_page_to_duplicator(self, page):
		page_start, page_end = self._selected_pages_time_range(page)
		self._step_duplicator.add_step(page_start, page_end, nudge_offset=0, is_page=True)

	def absolute_page(self, page):
		return page + self.page_offset

	def _on_press_loop_selector_matrix(self, page):

		def create_clip(pages):
			measure = self._one_measure_in_beats
			length = self._quantize_page_index(pages, measure) + measure
			create_clip_in_selected_slot(self._clip_creator, self.song, length)

		def handle_page_press_on_clip(page):
			l_start, l_length = self._get_loop_in_pages()
			page_in_loop = l_start <= page < l_start + l_length
			buttons_pressed = len(self._pressed_pages)
			# if buttons_pressed == 1 and page_in_loop:
			# 	self._try_select_page(page)
			if buttons_pressed > 1 or not page_in_loop:
				self._try_set_loop()
			# if self._step_duplicator.is_duplicating:
			# 	self._add_page_to_duplicator(page)
			# if self.delete_button.is_pressed:
			# 	self._clear_page(page)

		self._pressed_pages.append(page)
		# absolute_page = page + self.page_offset
		absolute_page = self.absolute_page(page)
		if not self.select_button.is_pressed:
			if not liveobj_valid(self._sequencer_clip) and not self.song.view.highlighted_clip_slot.has_clip:
				create_clip(absolute_page)
			elif liveobj_valid(self._sequencer_clip):
				handle_page_press_on_clip(absolute_page)
		elif not self.is_following:
			self._try_select_page(absolute_page)

	def _try_select_page(self, page):
		step_time = page * self._page_length_in_beats
		if self._paginator.select_page_in_point(step_time):
			self.is_following = False
			return True
		return False

	def _try_set_loop(self):
		did_set_loop = False
		if liveobj_valid(self._sequencer_clip):
			if not clip_is_new_recording(self._sequencer_clip):
				lowest_page = min(self._pressed_pages) + self.page_offset
				# if self._try_select_page(lowest_page):
				self._set_loop_in_live()
				did_set_loop = True
			if did_set_loop:
				self.is_following = True
		return did_set_loop

	def _set_loop_in_live(self):
		quant = self._page_length_in_beats
		start_page = min(self._pressed_pages) + self.page_offset
		end_page = max(self._pressed_pages) + self.page_offset
		loop_start = self._quantize_page_index(start_page, quant)
		loop_end = self._quantize_page_index(end_page, quant) + quant
		set_loop(self._sequencer_clip, loop_start, loop_end)
		self._sequencer_clip.view.show_loop()

	@property
	def _page_length_in_beats(self):
		return clamp(self._paginator.page_length, 0.25, self._one_measure_in_beats)

	@property
	def _one_measure_in_beats(self):
		return self._measure_length * self.song.signature_numerator / self.song.signature_denominator

	@property
	def page_offset(self):
		#
		def zero_if_none(n):
			if n is None:
				return 0
			return n

		width = zero_if_none(self.loop_selector_matrix.width)
		height = zero_if_none(self.loop_selector_matrix.height)
		size = max(width * height, 1)
		# page_index = self._paginator.page_index
		# page_length = self._paginator.page_length
		# selected_page_index = int(page_index * page_length / self._page_length_in_beats)
		# # selected_page_index = int(page_index)
		# debug('page_offset:', 'size:', size, 'selected_page_index:', selected_page_index, 'result:', size * int(selected_page_index / size))
		# return size * int(selected_page_index / size)
		return self._paginator.page_index

	def pos_to_page(self, pos):
		debug('pos_to_page:', pos)
		return int(pos/self._page_length_in_beats)

	@shift_loop_right_keycommand_button.pressed
	def shift_loop_right_keycommand_button(self, button):
		debug('shift_loop_right_keycommand_button.pressed')
		clip = self._sequencer_clip
		if liveobj_valid(clip):
			# quant = self._page_length_in_beats
			loop_length = clip.end_marker - clip.loop_start
			loop_start = clip.loop_start + loop_length
			loop_end = clip.end_marker + loop_length
			set_loop(clip, loop_start, loop_end)
			self._sequencer_clip.view.show_loop()
			self._try_select_page(loop_start)
			self._try_select_page(self.pos_to_page(clip.loop_start))

	@shift_loop_left_keycommand_button.pressed
	def shift_loop_left_keycommand_button(self, button):
		debug('shift_loop_left_keycommand_button.pressed')
		clip = self._sequencer_clip
		if liveobj_valid(clip):
			# quant = self._page_length_in_beats
			loop_length = clip.end_marker - clip.loop_start
			loop_start = max(0, clip.loop_start - loop_length)
			loop_end = max(loop_length, clip.end_marker - loop_length)
			set_loop(clip, loop_start, loop_end)
			self._sequencer_clip.view.show_loop()
			self._try_select_page(self.pos_to_page(clip.loop_start))

	@shift_loop_right_button.pressed
	def shift_loop_right_button(self, button):
		debug('shift_loop_right_button.pressed')
		clip = self._sequencer_clip
		if liveobj_valid(clip):
			# quant = self._page_length_in_beats
			loop_length = clip.end_marker - clip.loop_start
			loop_start = clip.loop_start + loop_length
			loop_end = clip.end_marker + loop_length
			set_loop(clip, loop_start, loop_end)
			self._sequencer_clip.view.show_loop()
			self._try_select_page(loop_start)
			self._try_select_page(self.pos_to_page(clip.loop_start))

	@shift_loop_left_button.pressed
	def shift_loop_left_button(self, button):
		debug('shift_loop_left_button.pressed')
		clip = self._sequencer_clip
		if liveobj_valid(clip):
			# quant = self._page_length_in_beats
			loop_length = clip.end_marker - clip.loop_start
			loop_start = max(0, clip.loop_start - loop_length)
			loop_end = max(loop_length, clip.end_marker - loop_length)
			set_loop(clip, loop_start, loop_end)
			self._sequencer_clip.view.show_loop()
			self._try_select_page(self.pos_to_page(clip.loop_start))

	@latest_loop_button.pressed
	def latest_loop_button(self, button):
		debug('latest_loop_button.pressed')
		clip = self._sequencer_clip
		if liveobj_valid(clip):
			# debug('clip.loop_start:', clip.loop_start, 'loop_end', clip.loop_end, 'length', clip.length, 'end_time:', clip.end_time, 'start_marker:', clip.start_marker,  'start_time:', clip.start_time)
			loop_length = 16
			loop_end = clip.length
			loop_start = max(0, loop_end - loop_length)
			set_loop(clip, loop_start, loop_end)
			self._sequencer_clip.view.show_loop()
			self._try_select_page(self.pos_to_page(clip.loop_start))

	@latest_loop_keycommand_button.pressed
	def latest_loop_keycommand_button(self, button):
		debug('latest_loop_keycommand_button.pressed')
		clip = self._sequencer_clip
		if liveobj_valid(clip):
			# debug('clip.loop_start:', clip.loop_start, 'loop_end', clip.loop_end, 'length', clip.length, 'end_time:', clip.end_time, 'start_marker:', clip.start_marker,  'start_time:', clip.start_time)
			loop_length = 16
			loop_end = clip.length
			loop_start = max(0, loop_end - loop_length)
			set_loop(clip, loop_start, loop_end)
			self._sequencer_clip.view.show_loop()
			self._try_select_page(self.pos_to_page(clip.loop_start))

	@favorite_clip_color_button.pressed
	def favorite_clip_color_button(self, button):
		debug('favorite_clip_color_button.pressed')
		clip = self._sequencer_clip
		if liveobj_valid(clip):
			# debug('setting color:', clip.color, clip.color_index)
			clip.color_index = FAVORITE_CLIP_COLOR


	@fix_grid_button.pressed
	def fix_grid_button(self, button):
		debug('fix_grid_button.pressed')
		clip = self._sequencer_clip
		if liveobj_valid(clip):
			clip.view.grid_quantization = _Q.q_bar


	@loop_length_1_button.pressed
	def loop_length_1_button(self, button):
		debug('loop_length_1_button.pressed')
		self.set_loop_length(4)


	@loop_length_2_button.pressed
	def loop_length_2_button(self, button):
		debug('loop_length_2_button.pressed')
		self.set_loop_length(8)


	@loop_length_4_button.pressed
	def loop_length_4_button(self, button):
		debug('loop_length_4_button.pressed')
		self.set_loop_length(16)


	@loop_length_8_button.pressed
	def loop_length_8_button(self, button):
		debug('loop_length_8_button.pressed')
		self.set_loop_length(32)


	@loop_length_16_button.pressed
	def loop_length_16_button(self, button):
		debug('loop_length_16_button.pressed')
		self.set_loop_length(64)


	def set_loop_length(self, length):
		clip = self._sequencer_clip
		if liveobj_valid(clip):
			debug('clip.loop_start:', clip.loop_start, 'loop_end', clip.loop_end, 'length', clip.length, 'end_time:', clip.end_time, 'start_marker:', clip.start_marker,  'start_time:', clip.start_time)
			loop_length = length
			loop_start = clip.loop_start
			loop_end = loop_start+loop_length
			position = clip.position
			debug('position is:', position)
			# debug('setting_loop:', loop_start, loop_end)
			set_loop(clip, loop_start, loop_end)
			self._sequencer_clip.view.show_loop()
			self._try_select_page(self.pos_to_page(clip.loop_start))

	@play_selected_clip_button.pressed
	def play_selected_clip_button(self, button):
		debug('play_selected_clip_button.pressed')
		clip_slot = self.song.view.highlighted_clip_slot
		if liveobj_valid(clip_slot):
			clip = clip_slot.clip
			if liveobj_valid(clip):
				debug('here')
				clip.fire()
