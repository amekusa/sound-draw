import Pen from './Pen.js';

let pen;

let mic;

let spectrum;
let bins = 256;
let lowCut;
let highCut;
let shape = [];

let canvas;
let w = 1280;
let h = 720;

function setup(){
	canvas = createCanvas(w, h);
	canvas.mousePressed(userStartAudio);

	angleMode(DEGREES);

	mic = new p5.AudioIn();
	mic.start();

	fft = new p5.FFT();
	fft.setInput(mic);

	pen = new Pen(w/2, h/2);
}

function update() {
	spectrum = fft.analyze(bins);
	pen.update();
}

function draw(){
	update();

	background(200);

	push();
	translate(w/2, h/2);
	noStroke();
	beginShape();

	/*
	vertex(-1, h+1);
	for (let i = 0; i < bins; i++) {
		vertex(
			map(i, 0, bins - 1, 0, w),
			map(spectrum[i], 0, 255, h, 0)
		);
	}
	vertex(w+1, h+1);
	*/


	let steps = ceil(bins * .75);
	let _min = h * .10;
	let _max = h * .80;
	for (let i = 0; i < steps; i++) {
		let deg = map(i, 0, steps - 1, 0, 180);
		let s = sin(deg);
		let c = cos(deg);
		let x = 0;
		let y = map(spectrum[i], 0, 255, _min, _max);
		vertex(x*c - y*s, x*s + y*c);
	}
	endShape();
	pop();

	pen.draw();
}
