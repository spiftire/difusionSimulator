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
let simulator;
const cells = new Array<CellOfParticles>();
cells.push(firstCell);

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  noStroke();

  cols = Math.floor(width / resolution);
  rows = Math.floor(height / resolution);
  grid = create2dgrid(cols, rows);
  
  simulator = new Simulator(grid);
  //   populateGrid();
  // firstCell = new CellOfParticles(
  //   10000,
  //   new GridPosition(Math.floor(rows / 2), 0)
  // );

  // grid[firstCell.position.y][firstCell.position.x] = firstCell;
  
  // console.table(grid);
  console.log(simulator);
  


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

function create2dgrid(
  cols: number,
  rows: number
): Array<Array<CellOfParticles>> {
  let arr = new Array(cols);
  for (let col = 0; col < arr.length; col++) {
    arr[col] = new Array(rows);
    const temprows = arr[col];
    for(let i = 0; i< temprows.length; i++) {
      temprows[i] = null;
    }
  }
  return arr;
}

window["setup"] = setup;
window["draw"] = draw;
