autowatch = 1;

inlets = 3;
outlets = 3;

var grossVal = 0;
var fineVal = 0;
var min = jsarguments[1] ? jsarguments[1] : 0;
var max = jsarguments[2] ? jsarguments[2] : 16;

var delayedUpdateTask = new Task(update, this);

function delayedUpdate(){
	if(delayedUpdateTask.running){
		delayedUpdateTask.cancel();
	}
	delayedUpdateTask.schedule(1);
}

function loadbang(){
	outlet(0, 'bang');
	outlet(1, 'bang');
}

function anything(){
	var args = arrayfromargs(messagename, arguments)
	post('args: ' + args + '\n');
	switch(inlet){
		case 0:
			int(args);
			break;
		case 1:
			float(args);
			break;
		case 2:
			grossVal = Math.floor(args);
			fineVal = args%1;
			update();
			break;
	}
}

function int(val){
	if(inlet == 0){
		//post('gross in: ' + val + '\n');
		grossVal = Math.max(Math.min(val, max), min);
		fineVal = 0.;
		update();
	}
}

function float(val){
	if((inlet == 1)&&(!delayedUpdateTask.running)){
		//post('fine in: ' + val + '\n');
		if(val < 0){
			if(grossVal > min){
				decreaseGross();
				fineVal = .99;
				delayedUpdate();
			}
			else{
				fineVal = .01;
				delayedUpdate();
			}
		}
		else if(val > .99){
			increaseGross();
			fineVal = 0.;
			delayedUpdate();
		}
		else{
			if(grossVal == max){
				fineVal = 0.;
				delayedUpdate();
			}
			else{
				fineVal = val;
				update();
			}
		}
	}
}

function increaseGross(){
	grossVal = Math.min(grossVal + 1, max);
}

function decreaseGross(){
	grossVal = Math.max(grossVal -1, min);
}

function update(){
	outlet(0, 'set', grossVal);
	outlet(1, 'set', fineVal);
	outlet(2, parseInt(grossVal) + parseFloat(fineVal));
}
