/// <reference path="../node_modules/@types/p5/global.d.ts" />
require("p5")

function setup() {
	createCanvas(500, 500)
	background(0)
	noStroke()
}

function draw() {
	fill(255, 32)
	circle(mouseX, mouseY, random(20, 50))
}

window['setup'] = setup
window['draw'] = draw