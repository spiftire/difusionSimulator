/// <reference path="../node_modules/@types/p5/global.d.ts" />

import { Simulator } from "./Simulator";
import { Grid } from "./Grid";
import { GridPosition } from "./GridPosition";

require("p5");
let resolution = 20;
let cols: number;
let rows: number;
let grid: Grid;
const NUMBER_OF_COLUMS = 80;
const NUMBER_OF_ROWS = 40;
const START_POSITION = new GridPosition(Math.floor((NUMBER_OF_COLUMS - 1) / 2), 0);
const START_NUMBER_OF_PARTICLES = 1000000;
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
  const HUE_MAX = 20;
  const SATURATION_MAX = 100;
  const SATURATION_UPPER = 70;
  const SATURATION_LOWER = 30;
  const BRIGHTNESS_MAX = 100;
  const BRIGHTNESS_UPPER = 100;
  const BRIGHTNESS_LOWER = 90;
  const ALPHA_MAX = 100;
  const LOG_OF_START_PARTICLES = Math.log10(START_NUMBER_OF_PARTICLES);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let xCord = i * resolution + resolution / 2;
      let yCord = j * resolution + resolution / 2;
      let cell = grid.getPositionContent(i, j);

      if (cell != null) {
        // console.log(cell.numberOfParticles);
        // console.log(`i: ${i}, j: ${j}`);
        let particles = cell.numberOfParticles;
        colorMode(HSB, HUE_MAX, SATURATION_MAX, BRIGHTNESS_MAX, ALPHA_MAX);

        let log = Math.log10(particles);
        let tan = 6 * Math.atan(log / 6 - 1 / 6);
        let hue = map(tan, 0, LOG_OF_START_PARTICLES, 0, HUE_MAX);
        let saturation = 70; //map(tan, 1, logOfStartParticle, SATURATION_LOWER, SATURATION_UPPER);
        let brightness = 95; //map(tan, 1, logOfStartParticle, BRIGHTNESS_LOWER, BRIGHTNESS_UPPER);
        let alpha = map(tan, 0, LOG_OF_START_PARTICLES, 60, ALPHA_MAX);
        let fillColor = color(hue, saturation, brightness);
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
