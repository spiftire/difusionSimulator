/// <reference path="../node_modules/@types/p5/global.d.ts" />

import { CellOfParticles } from "./CellOfParticles";
import { Simulator } from "./Simulator";
import { Grid } from "./Grid";

require("p5");
let resolution = 20;
let cols: number;
let rows: number;
let grid: Grid;
let firstCell: CellOfParticles;
let simulator;
const cells = new Array<CellOfParticles>();
cells.push(firstCell);

function map(
  value: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number {
  return ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  noStroke();

  cols = Math.floor(width / resolution);
  rows = Math.floor(height / resolution);
  grid = new Grid(rows, cols);

  simulator = new Simulator(grid);
  simulator.step();
  simulator.step();
  simulator.step();
  simulator.step();
}

function draw() {
  background(255);

  drawCell();
}

function drawCell() {
  // for (let i = 0; i < cols; i++) {
  // 	for (let j = 0; j < rows; j++) {
  // 		let x = i * resolution;
  // 		let y = j * resolution;
  // 		if (grid[i][j] instanceof CellOfParticles) {
  // 			fill(51);
  // 			stroke(0);
  // 			rect(x, y, resolution - 1, resolution - 1);
  // 		}
  // 	}
  // }
}

window["setup"] = setup;
window["draw"] = draw;
