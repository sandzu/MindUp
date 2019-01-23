

var canvas = document.getElementsByTagName("canvas")[0];
var ctx = canvas.getContext('2d');

export function line (start, end) {
    ctx.moveTo(x_relative(start.x), y_relative(start.y));
    ctx.lineTo(x_relative(end.x), y_relative(end.y));
    ctx.stroke(); 
}; 

export function text (txt, pos) {
	ctx.font = '11px serif';
	ctx.fillStyle = 'black';
	console.log(ctx.measureText(txt).width)
	ctx.fillText(txt, x_relative(pos.x) - ctx.measureText(txt).width * 0.5, y_relative(pos.y));
}

const box = {
	xmin: 0,
	xmax: 0,
	ymin: 0,
	ymax: 0
};

const boxWidth = () => {
	return(box.xmax - box.xmin);
};

const boxHeight = () => {
	return(box.ymax - box.ymin);
};

const pos_relative = (pos, canvas_size, box_min, box_size) => {
	// console.log(box_size)
	return( 1.0 * canvas_size * (pos - box_min) / box_size);
}

const y_relative = y => pos_relative(y, canvas.height, box.ymin, boxHeight());
const x_relative = x => pos_relative(x, canvas.width, box.xmin, boxWidth());

export const update_bounding_box = pos => {
	box.xmin = Math.min(pos.x, box.xmin);
	box.xmax = Math.max(pos.x, box.xmax);
	box.ymin = Math.min(pos.y, box.ymin);
	box.ymax = Math.max(pos.y, box.ymax);
};






export function circle (pos, r = 10, highlighted = false) {
	ctx.beginPath();
	// console.log(x_relative(pos.x), y_relative(pos.y)); // +- infty -+ infty
    ctx.arc(x_relative(pos.x), y_relative(pos.y), r, 0, 2 * Math.PI);
	if(highlighted){
		ctx.fillStyle = "orange";
	}else{
		ctx.fillStyle = "white";
	}
	ctx.fill();
    ctx.stroke(); 
}

export function paintCircles (circle_list) {
	// console.log('painting circles...');
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	circle_list.forEach( pos => {
		circle(pos);
	});
};

export function clear() {
	ctx.fillStyle = 'grey';

	ctx.clearRect(0,0, canvas.width, canvas.height);
	ctx.rect(0,0, canvas.width, canvas.height);
}
