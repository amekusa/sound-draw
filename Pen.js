class Pen {
	constructor(x, y) {
		this.p = new p5.Vector(x, y);
		this.v = new p5.Vector(0, 0);
	}
	update() {
		this.p.add(this.v);
	}
	draw() {
		push();
		translate(this.p.x, this.p.y);
		circle(0, 0, 30);
		pop();
	}
}

export default Pen;
