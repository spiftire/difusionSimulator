/// <reference path="../node_modules/@types/p5/global.d.ts" />

import { Simulator } from "./Simulator";
import { Grid } from "./Grid";
import { GridPosition } from "./GridPosition";

require("p5");
let resolution = 20;
let cols: number;
let rows: number;
let grid: Grid;
const NUMBER_OF_COLUMS = 20;
const NUMBER_OF_ROWS = 20;
const START_POSITION = new GridPosition(Math.floor(NUMBER_OF_COLUMS-1/2), 0);
const START_NUMBER_OF_PARTICLES = 10000;
const STEPS_TO_SIMULATE = 50;
let simulator;
let stepsSimulated = 1;

function map(value: number, fromLow: number, fromHigh: number, toLow: number, toHigh: number): number {
  return ((value - fromLow) * (toHigh - toLow)) / (fromHigh - fromLow) + toLow;
}

function setup() {
  createCanvas(NUMBER_OF_COLUMS * resolution, NUMBER_OF_ROWS * resolution);
  background(255);
  noStroke();

  cols = Math.floor(width / resolution);
  rows = Math.floor(height / resolution);
  grid = new Grid(rows, cols);
  simulator = new Simulator(grid, START_NUMBER_OF_PARTICLES, START_POSITION);
  // for (let i = 0; i < STEPS_TO_SIMULATE; i++) {
  //   setTimeout(() => {
  //     simulateOneStep();
  //   }, 1000);
  // }
}

function draw() {
  simulateOneStep();
}

function simulateOneStep() {
  stepsSimulated++;
  // console.log(`%c Step number: ${stepsSimulated}`, "background: #222; color: #bada55");

  let backgroundColor = color(255);
  backgroundColor.setAlpha(50);
  background(backgroundColor);
  grid = simulator.step();
  drawCell();
}

function drawCell() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let xCord = i * resolution + resolution / 2;
      let yCord = j * resolution + resolution / 2;
      let cell = grid.getPositionContent(i, j);

      if (cell != null) {
        // console.log(cell.numberOfParticles);
        // console.log(`i: ${i}, j: ${j}`);
        let particles = cell.numberOfParticles;
        let alpha = map(particles, 0, START_NUMBER_OF_PARTICLES, 25, 255);
        let fillColor = color(252, 3, 3);
        if (START_NUMBER_OF_PARTICLES >= 100 && particles < START_NUMBER_OF_PARTICLES /10 && particles > START_NUMBER_OF_PARTICLES / 100) {
          fillColor = color(66, 135, 245);
        }
        if (START_NUMBER_OF_PARTICLES >= 1000 && particles <= START_NUMBER_OF_PARTICLES / 100 && particles > START_NUMBER_OF_PARTICLES/ 1000) {
          fillColor = color(66, 245, 93);
        }
        if (START_NUMBER_OF_PARTICLES >= 10000 && particles <= START_NUMBER_OF_PARTICLES / 5000) {
          fillColor = color(180, 65, 242);
        }

        fillColor.setAlpha(alpha);
        fill(fillColor);
        noStroke();
        circle(xCord, yCord, resolution * 2);
      }
    }
  }
}

function keyPressed() {
  if (keyCode == 78) {
    simulateOneStep();
  }
}

window["setup"] = setup;
window["draw"] = draw;
window["keyPressed"] = keyPressed;
