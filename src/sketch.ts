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
const START_NUMBER_OF_PARTICLES = 100000;
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
        // const RED_MAX = 1850;
        // const GREEN_MAX = 2550;
        // const BLUE_MAX = 2550;
        const HUE_MAX = 365;
        const SATURATION_MAX = 100;
        const BRIGHTNESS_MAX = 100;
        const ALPHA_MAX = 100;
        // colorMode(RGB, RED_MAX, GREEN_MAX, BLUE_MAX, ALPHA_MAX);
        colorMode(HSB, HUE_MAX, SATURATION_MAX, BRIGHTNESS_MAX, ALPHA_MAX);

        // let red = map(particles, 1, START_NUMBER_OF_PARTICLES, 660, RED_MAX);
        // let green = map(particles, 1, START_NUMBER_OF_PARTICLES, 650, GREEN_MAX);
        // let blue = map(particles, 1, START_NUMBER_OF_PARTICLES, 930, BLUE_MAX);
        let percent = map(particles, 0, START_NUMBER_OF_PARTICLES, 0, 1000);
        let hue = map(particles*Math.log(START_NUMBER_OF_PARTICLES), 1, START_NUMBER_OF_PARTICLES, HUE_MAX, 0);
        let saturation = map(particles, 1, START_NUMBER_OF_PARTICLES, 90, SATURATION_MAX);
        let brightness = map(particles, 1, START_NUMBER_OF_PARTICLES, 70, BRIGHTNESS_MAX);
        let alpha = map(particles, 0, START_NUMBER_OF_PARTICLES, 25, ALPHA_MAX);
        // let fillColor = color(red, green, blue, alpha);
        // let fillColor = color(percent, saturation, brightness);
        let fillColor = color(hue, saturation, brightness);
        // let fillColor = color(252, 3, 3);
        // if (
        //   START_NUMBER_OF_PARTICLES >= 100 &&
        //   particles < START_NUMBER_OF_PARTICLES / 10 &&
        //   particles > START_NUMBER_OF_PARTICLES / 100
        // ) {
        //   fillColor = color(66, 135, 245);
        // }
        // if (
        //   START_NUMBER_OF_PARTICLES >= 1000 &&
        //   particles <= START_NUMBER_OF_PARTICLES / 100 &&
        //   particles > START_NUMBER_OF_PARTICLES / 1000
        // ) {
        //   fillColor = color(66, 245, 93);
        // }
        // if (START_NUMBER_OF_PARTICLES >= 10000 && particles <= START_NUMBER_OF_PARTICLES / 5000) {
        //   fillColor = color(180, 65, 242);
        // }

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
