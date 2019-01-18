

var canvas = document.getElementsByTagName("canvas")[0];
var ctx = canvas.getContext('2d');

export function line (start, end) {
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke(); 
}; 

export function circle (pos, r = 10, highlighted = false) {
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, r, 0, 2 * Math.PI);
	if(highlighted){
		ctx.fillStyle = "orange";
	}else{
		ctx.fillStyle = "white";
	}
	ctx.fill();
    ctx.stroke(); 
}

export function paintCircles (circle_list) {
	console.log('painting circles...');
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	circle_list.forEach( pos => {
		circle(pos);
	});
};
