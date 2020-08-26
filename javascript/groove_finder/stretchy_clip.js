autowatch = 1;

aumhaa = require('_base');
var FORCELOAD = true;
var DEBUG = true;
aumhaa.init(this);

var util = require('aumhaa_util');
var script = this;

this._name = jsarguments[0];
this._uid = jsarguments[1];

function init(){
  debug(this._name, 'init');
  script.functionObj = this.patcher.getnamed('function');
  // script.functionObs = new MaxobjListener(functionObj, onFunctionObjValueChanged);
  functionObj.message('fix', 0, 1);
  functionObj.message('fix', 4, 1);
  script.sliderObj = this.patcher.getnamed('slider');
  script.sliderObs = new MaxobjListener(sliderObj, onSliderObjValueChanged);
}

function slider_input(){
  var args = arrayfromargs(arguments);
  debug('slider_input:', args);
}

function onFunctionObjValueChanged(){
  var args = arrayfromargs(arguments);
  debug('function value:', args);
  var a = args[8];
  var b = args[12];
  var c = args[16];
  debug('a:', a, 'b:', b, 'c:', c);
  if(a!=.25){
    functionObj.message('clickmove', 0);
    functionObj.message(1, args[7], .25);
    functionObj.message('clickmove', 1);
  }
  if(b!=.5){
    functionObj.message(2, args[11], .5);
  }
  if(c!=.75){
    functionObj.message(3, args[15], .75);
  }
}

function onSliderObjValueChanged(){
  var args = arrayfromargs(arguments);
  debug('onSliderObjValueChanged:', args);
}
forceload(this);
