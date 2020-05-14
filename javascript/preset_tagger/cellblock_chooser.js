autowatch = 1;

inlets = 2;
outlets = 2;

aumhaa = require('_base');
var util = require('aumhaa_util');
util.inject(this, util);
var FORCELOAD = true;
var DEBUG = true;
aumhaa.init(this);
var script = this;
script._name = jsarguments[0];


function anything(){
  var args = arrayfromargs(messagename, arguments);
  debug('anything:', args);
}

var contents = [];

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

}

function append(){
  var args = arrayfromargs(arguments);
  debug('append:', args);
  contents.push({value:args.join(' '), acive:false});
  outlet(1, contents.length, args);
  //_refresh();
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

function clear_filter(){
  for(var i in available_tags){
    available_tags[i].active = false;
  }
  report_tag_selection();
}

forceload(this);
