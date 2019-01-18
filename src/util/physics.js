export function attract(myPos, otherPos, myMass, otherMass, g) {
	const x = myPos.x-otherPos.x;
	const y = myPos.y-otherPos.y;
	const r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
	const theta = Math.atan(y/x);
	const f = g * myMass * otherMass / Math.pow(r,2);
	return ({
		x,
		y,
		r,
		theta,
		f
	});
}
