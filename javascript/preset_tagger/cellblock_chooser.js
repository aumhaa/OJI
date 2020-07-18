autowatch = 1;

inlets = 2;
outlets = 2;

aumhaa = require('_base');
var util = require('aumhaa_util');
util.inject(this, util);
var FORCELOAD = false;
var DEBUG = true;
aumhaa.init(this);
var script = this;
script._name = jsarguments[0];

var ROW_HEIGHT = 12;

function anything(){
  var args = arrayfromargs(messagename, arguments);
  debug('anything:', args);
}

var _contents = [];
var _single_active = undefined;
var _active = [];
var _active_items = [];
var _active_indexes = [];
var _multiSelect = false;

var COLORS = {white:[180, 180, 180],
							off:[0, 0, 0],
							red:[180, 0, 0],
							green:[0, 180, 0],
							blue:[0, 0, 180],
							cyan:[0, 180, 180],
							yellow:[180, 180, 0],
							magenta:[180, 0, 180]};



function init(){
  setup_patcher();
  _clear();
  //_refresh();
  //messnamed('from_commander', 'update_remote_display');
}

function _multiselect(val){
  if(val != _multiSelect){
    _multiSelect = val;
    if(!val){
      debug('turning off multiselect')
      _single_active = _active_indexes[0];
      for(var i in _contents){
        _contents[i].active = false;
      }
    }
    if(_single_active!=undefined){
      _contents[_single_active].active = true;
    }
    _refresh();
    _report_selected();
  }
}

function setup_patcher(){

}

function _append(){
  var args = arrayfromargs(arguments);
  debug('append:', args);
  _contents.push({value:args.join(' '), _active:false});
  outlet(1, 'rows', _contents.length);
  outlet(1, 'set', 0, _contents.length-1, args);
  outlet(1, 'vscroll', _contents.length>ROW_HEIGHT);
  //_refresh();
}

function _clear(){
  outlet(1, 'rows', 0);
  outlet(1, 'set', 0, 0, '');
  outlet(1, 'vscroll', 0);
  _contents = [];
  _active = [];
  _active_items = [];
  _active_indexes = [];
  _refresh();
}

function _refresh(){
  _active = [];
  _active_items = [];
  _active_indexes = [];
  if(_multiSelect){
    for(var i in _contents){
      if(_contents[i].active){
        _active.push(_contents[i]);
        _active_items.push(_contents[i].value);
        _active_indexes.push(parseInt(i));
      }
      outlet(1, 'cell', 0, parseInt(i), 'brgb', _contents[i].active ? COLORS.cyan : COLORS.white);
    }
  }
  else{
    _active = _single_active ? [_contents[_single_active]] : [];
    _active_items = _single_active ? [_contents[_single_active].value] : [];
    _active_indexes = _single_active ? [_single_active] : [];
    for(var i in _contents){
      _contents[i].active = i == _single_active;
      outlet(1, 'cell', 0, parseInt(i), 'brgb', parseInt(i) == _single_active ? COLORS.cyan : COLORS.white);
    }
  }
  outlet(1, 'vscroll', _contents.length>ROW_HEIGHT);
}

function _cellblock_input(num, item){
  debug('cellblock_input', num, item);
  _contents[num].active = !_contents[num].active;
  _single_active = num == _single_active ? undefined : num;
  _refresh();
  _report_selected();
}

function _report_selected(){
  if(_multiSelect){
    outlet(0, 'selecteditems', _active_items);
  }
  else {
    outlet(0, _single_active ? _contents[_single_active].value : '');
  }
}

function _set(num){
  if(_contents[num]){
    _contents[num].active = true;
    _single_active = num;
  }
  _refresh();
}

function set_height(val){
  ROW_HEIGHT = val;
  _refresh();
}

function anything(){
  var args = arrayfromargs(messagename, arguments);
  debug('anything', args, this.inlet);
  switch(inlet){
    case 0:
      //input from outside;
      switch(args[0]){
        case 'append':
          _append.apply(this, args.slice(1));
          break;
        case 'set':
          _set.apply(this, args.slice(1));
          break;
        case 'clear':
          _clear();
          break;
        case 'multiselect':
          _multiselect.apply(this, args.slice(1));
          break;
        case 'bang':
          _report_selected();
          break;
      }
      break;
    case 1:
      //input from cellblock;
      _cellblock_input.apply(args[0], args.slice(1));
      break;
  }
}







forceload(this);
