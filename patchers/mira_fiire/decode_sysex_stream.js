autowatch = 1;

var stream = [];

function msg_int(val){
	if(val == 240){
		stream = [240];
	}
	else if(val == 247){
		stream.push(247);
		outlet(0, stream);
		stream = [];
	}
	else{
		stream.push(val);
	}
}

function anything(){}

