import {line, circle, paintCircles} from "./util/paint.js";
import {attract} from "./util/physics.js";

let bodies = [];
const canvas = document.getElementsByTagName("canvas")[0];


const addBody = (e) => {
	let pos = getMousePos(e);
	bodies.push({x:pos[0], y:pos[1]});
};

const getMousePos = (e) => {
	let rect = canvas.getBoundingClientRect();
	return([e.clientX - rect.left, e.clientY - rect.top]);
}

const getEquilibriumFunc = (delta=4, iterations = 30) => {
	let max_movement = 0;
	console.log('iterations remaining: ', iterations);
	
	const iterateToEquilibrium = () =>{

		if(iterations <= 0){
			return false;
		};

		console.log('achieving equilibrium...');
		bodies.forEach( (body_pos, index) => {
			//potential for optimization: find radius at which f is sufficiently small and ignore everything outside that radius
			bodies.forEach( other_body_pos => {
				let attraction = attract(body_pos, other_body_pos, 10, 10, 8.2);
				let repulsion = attract(body_pos, other_body_pos, 2, 4, 130);
				console.log('attraction : ', attraction);
				console.log('repulsion : ', repulsion);
				let deltax = attraction.x - repulsion.x;
				let deltay = attraction.y - repulsion.y;

				console.log('dx, dy: ', deltax, deltay);
				bodies[index].old_pos = body_pos;
				bodies[index].x += (deltax);  
				bodies[index].y += (deltay);

				//this ^ used to be body_pos.x / y . if this fixes things you should take note/write about it
				let movement = Math.abs(attraction.r * attraction.f - repulsion.r * repulsion.f);
				console.log('movement: ', movement);
				if(!isNaN(movement)){
					max_movement = Math.max(movement, max_movement);  
				}

			});
		});
		
		console.log('max_movement: ', max_movement);
		iterations -= 1;
		console.log('iterations remaining: ', iterations);
		paintCircles(bodies);
		if((max_movement > delta) && (iterations > 0)){
			window.requestAnimationFrame(iterateToEquilibrium);
		}else{
			console.log('finished attempting to reach eq');
			console.log(bodies);
		};
	};

	return iterateToEquilibrium;
};

canvas.addEventListener('click', e => {
	addBody(e);
	paintCircles(bodies);
	console.log(bodies);
	getEquilibriumFunc(4, 30)();
});
