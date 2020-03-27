/// <reference path="../node_modules/@types/p5/global.d.ts" />

import { Simulator, Direction } from "./Simulator";
import { Grid } from "./Grid";
import { GridPosition } from "./GridPosition";

require("p5");
let chances = new Map<Direction, number>();
    chances.set(Direction.Left, 20);
    chances.set(Direction.Right, 20);
    chances.set(Direction.Down, 30);
    chances.set(Direction.Up, 5);
    chances.set(Direction.Stay, 25);

const population: number[] = [1, 2, 3 ,5 ,8, 10, 50, 100, 1000, 10000];

let resolution = 50;
let cols: number;
let rows: number;
let grid: Grid;
const NUMBER_OF_COLUMS = 10;
const NUMBER_OF_ROWS = 10;
const START_X = Math.floor(window.innerWidth/(resolution*2));//Math.floor((NUMBER_OF_COLUMS - 1) / 2);
const START_Y = Math.floor(window.innerHeight/(resolution*2));//0;//Math.floor((NUMBER_OF_ROWS - 1) / 2);
const BACKGROUND_ALPHA = 50;
const START_POSITION = new GridPosition(START_X, START_Y);
const START_NUMBER_OF_PARTICLES = population[10];
const STEPS_TO_SIMULATE = 5;
let simulator: Simulator;
let stepsSimulated = 1;

function map(value: number, fromLow: number, fromHigh: number, toLow: number, toHigh: number): number {
  return ((value - fromLow) * (toHigh - toLow)) / (fromHigh - fromLow) + toLow;
}

function setup() {
  // createCanvas(NUMBER_OF_COLUMS * resolution, NUMBER_OF_ROWS * resolution);
  createCanvas(window.innerWidth, window.innerHeight);
  background(255);
  noStroke();
  frameRate(10);

  cols = Math.floor(width / resolution);
  rows = Math.floor(height / resolution);
  grid = new Grid(rows, cols);
  simulator = new Simulator(grid, START_NUMBER_OF_PARTICLES, START_POSITION, chances);
  drawCell();
  // for (let i = 0; i < STEPS_TO_SIMULATE; i++) {
  //   setTimeout(() => {
  //     simulateOneStep();
  //   }, 1000);
  // }
}

function draw() {
  let backgroundColor = color(255);
  backgroundColor.setAlpha(BACKGROUND_ALPHA);
  background(backgroundColor);
  simulateOneStep();
}

function simulateOneStep() {
  stepsSimulated++;
  console.log(`%c Step number: ${stepsSimulated}`, "background: #222; color: #bada55");

  grid = simulator.step();
  drawCell();
}

function drawCell() {
  push();
  const HUE_MAX = 360;
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

        let particlesLog10 = Math.log10(particles);
        let particlesTan = 6 * Math.atan(particlesLog10 / 6 - 1 / 6);
        // let hue = map(particlesTan, 0, LOG_OF_START_PARTICLES, 0, HUE_MAX);
        let hue = map(particlesTan, 0, LOG_OF_START_PARTICLES, 0, HUE_MAX);
        if (particles == 2) {
          hue = 0;
        }
        let saturation = 70; //map(tan, 1, logOfStartParticle, SATURATION_LOWER, SATURATION_UPPER);
        let brightness = 95; //map(tan, 1, logOfStartParticle, BRIGHTNESS_LOWER, BRIGHTNESS_UPPER);
        let alpha = 80; //map(tan, 0, LOG_OF_START_PARTICLES, 60, ALPHA_MAX);
        // let fillColor = color(hue, saturation, brightness);
        let from = color(0, saturation, brightness);
        // console.log("from");
        // console.log(from);

        let to = color(HUE_MAX - HUE_MAX * 0.1, saturation, brightness);
        // console.log("to");
        // console.log(to);
        let fractionOfParticles = particles / START_NUMBER_OF_PARTICLES;
        // console.log("fractionOfParticles: "+fractionOfParticles);

        let fillColor = lerpColor(from, to, fractionOfParticles);
        // console.log("fillColor");
        // console.log(fillColor);
        
        fillColor.setAlpha(alpha);
        fill(fillColor);
        noStroke();
        rectMode(CENTER);
        circle(xCord, yCord, /*particlesLog10*resolution * 2 + */ resolution);
      }
    }
  }
  pop();
}

function keyPressed() {
  if (keyCode == 78) {
    simulateOneStep();
    console.table(grid.getGridOfParticles());
  }
}

window["setup"] = setup;
window["draw"] = draw;
window["keyPressed"] = keyPressed;
