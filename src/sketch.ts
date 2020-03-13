/// <reference path="../node_modules/@types/p5/global.d.ts" />

import { CellOfParticles } from "./CellOfParticles";
import { GridPosition } from "./GridPosition";
import { Simulator } from "./Simulator";

require("p5");
let resolution = 20;
let cols: number;
let rows: number;
let grid: Array<Array<CellOfParticles>>;
let firstCell: CellOfParticles;
const cells = new Array<CellOfParticles>();
cells.push(firstCell);
let simulator = new Simulator(cells, gird)

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  noStroke();

  cols = Math.floor(width / resolution);
  rows = Math.floor(height / resolution);
  grid = create2dgrid(cols, rows);
//   populateGrid();
  firstCell = new CellOfParticles(
	10000,
	new GridPosition(Math.floor(rows / 2), 0)
  );
  
}

function draw() {
  //   fill(255, 32);
  //   circle(mouseX, mouseY, random(20, 50));
  background(255);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      if (grid[i][j]) {
        fill(51);
        stroke(0);
        rect(x, y, resolution - 1, resolution - 1); // -1 pixle to get boarders
      }
    }
  }
}

function create2dgrid(cols: number, rows: number) : Array<Array<CellOfParticles>> {
  let arr = new Array(cols);
  for (let col = 0; col < arr.length; col++) {
    arr[col] = new Array(rows);
  }
  return arr;
}

window["setup"] = setup;
window["draw"] = draw;