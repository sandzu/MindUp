import {text, line, circle, paintCircles, clear, update_bounding_box} from "./util/paint.js";
import {attract} from "./util/physics.js";
const Springy = require("./dhotson-springy-9654b64/springy.js");

let bodies = [];
const canvas = document.getElementsByTagName("canvas")[0];

var graph = new Springy.Graph();

// make some nodes
var spruce = graph.newNode({ label: 'Norway Spruce' });
var fir = graph.newNode({ label: 'Sicilian Fir' });
var fir2 = graph.newNode({ label: 'Sicilian Fir2' });
var fir3 = graph.newNode({ label: 'Sicilian Fir3' });
var fir4 = graph.newNode({ label: 'Sicilian Fir4' });

// connect them with an edge
graph.newEdge(spruce, fir);
graph.newEdge(fir, fir);
graph.newEdge(fir2, fir);
graph.newEdge(fir3, fir);
graph.newEdge(fir4, fir);
graph.newEdge(fir2, fir3);
graph.newEdge(fir4, fir2);
console.log(fir);
bodies = [spruce, fir, fir2, fir3, fir4]

var layout = new Springy.Layout.ForceDirected(
	graph,
	400.0, // Spring stiffness
	400.0, // Node repulsion
	0.5 // Damping
);


var renderer = new Springy.Renderer(
	layout,
	function clear() {
		clear();
	},
	function drawEdge(edge, p1, p2) {
		line(p1, p2);
	},
	function drawNode(node, p) {
		update_bounding_box(p);
		circle(p);
		// console.log(node)
		text(node.data.label, p);
	}
);
	
const addBody = (e) => {
	let pos = getMousePos(e);
	bodies.push({x:pos[0], y:pos[1]});
};

const getMousePos = (e) => {
	let rect = canvas.getBoundingClientRect();
	return([e.clientX - rect.left, e.clientY - rect.top]);
}


// canvas.addEventListener('click', e => {
// 	addBody(e);
// 	paintCircles(bodies);
// 	console.log(bodies);
// 	getEquilibriumFunc(4, 30)();
// });

renderer.start();