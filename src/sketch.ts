/// <reference path="../node_modules/@types/p5/global.d.ts" />
require("p5")

function setup() {
	createCanvas(500, 500)
	background(0)
	fill(255)
	circle(100, 100, 20)
}

function draw() {

}

window['setup'] = setup
window['draw'] = draw