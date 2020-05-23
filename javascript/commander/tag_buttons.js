autowatch = 1;

aumhaa = require('_base');
var util = require('aumhaa_util');
util.inject(this, util);

var FORCELOAD = false;
var DEBUG = false;

aumhaa.init(this);
var script = this;

var Alive = false;
var _name = jsarguments[0];

var available_tags = [];
var selected_tags = [];
var bank_index = 0;

var COLORS = {white:[.7, .7, .7],
							off:[0, 0, 0],
							red:[.7, 0, 0],
							green:[0, .7, 0],
							blue:[0, 0, .7],
							cyan:[0, .7, .7],
							yellow:[.7, .7, 0],
							magenta:[.7, 0, .7]};



function init(){
  setup_patcher();
  clear();
  _refresh();
  messnamed('from_commander', 'update_remote_display');
}

function setup_patcher(){
  script.bank_up_button = this.patcher.getnamed('tag_button_bank_up');
  script.bank_down_button = this.patcher.getnamed('tag_button_bank_down');
  script.tagButton = [];
  for(var i=0;i<8;i++){
    tagButton[i] = this.patcher.getnamed('tag_button['+i+']');
  }
}

function append(){
  var args = arrayfromargs(arguments);
  debug('append:', args);
  available_tags.push({name:args.join(' '), acive:false});
  _refresh();
}

function clear(){
  available_tags = [];
  _refresh();
}

function _refresh(){
  for(var i = 0;i<8;i++){
    if(available_tags.length>(i+bank_index)){
      tagButton[i].message('activebgcolor', available_tags[i+bank_index].active ? COLORS.yellow : COLORS.white);
      tagButton[i].message('text', available_tags[i+bank_index].name);
    }
    else{
      //debug('clearing button:', i);
      tagButton[i].message('activebgcolor', COLORS.off);
      tagButton[i].message('text', ' ');
    }
  }
}

function anything(){
  var args = arrayfromargs(messagename, arguments);
  debug('anything', args);
}

function tag_button(pos, val){
  if(available_tags.length > (pos + bank_index)){
    available_tags[pos + bank_index].active = (!available_tags[pos + bank_index].active);
  }
  _refresh();
  report_tag_selection();
}

function report_tag_selection(){
  var tags = [];
  for(var i in available_tags){
    if(available_tags[i].active){
      tags.push(available_tags[i].name);
    }
  }
  if(tags.length){
    outlet(0, 'tag_selection', tags);
  }
  else{
    outlet(0, 'tag_selection');
  }
}

function tag_button_bank_up(){
  if(available_tags.length>(8+bank_index)){
    bank_index += 1;
    _refresh();
  }
}

function tag_button_bank_down(){
  if(bank_index>0){
    bank_index -= 1;
    _refresh();
  }
}

function set(num, val){
	var i = num;
	if(available_tags[i]){
		available_tags[i].active = val;
		tagButton[i-bank_index].message('activebgcolor', val ? COLORS.yellow : COLORS.white);
	}
}

function clear_filter(){
  for(var i in available_tags){
    available_tags[i].active = false;
  }
	_refresh();
  report_tag_selection();
}

forceload(this);
