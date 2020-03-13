import * as p5 from "p5";
import { CellOfParticles } from "./CellOfParticles";
import { GridPosition } from "./GridPosition";


const sketch = (p5: p5) => {
  let resolution = 20;
  let cols: number;
  let rows: number;
  let grid: any[];
  let firstCell: CellOfParticles;

  p5.setup = () => {
    p5.createCanvas(600, 400);
    cols = Math.floor(p5.width / resolution);
    rows = Math.floor(p5.height / resolution);
    grid = create2dgrid(cols, rows);
    // populateGrid();
    firstCell = new CellOfParticles(
      10000,
      new GridPosition(Math.floor(rows / 2), 0)
    );

    placeFirstCell(firstCell);
  };

  function placeFirstCell(cell: CellOfParticles) {
    grid[cell.position.x][cell.position.y] = cell;
  }

  p5.draw = () => {
    p5.background(255);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let x = i * resolution;
        let y = j * resolution;
        if (grid[i][j]) {
          p5.fill(51);
          p5.stroke(0);
          p5.rect(x, y, resolution - 1, resolution - 1); // -1 pixle to get boarders
        }
      }
    }
  };

//   function populateGrid() {
//     for (let i = 0; i < cols; i++) {
//       for (let j = 0; j < rows; j++) {
//         grid[i][j] = floor(random(2));
//       }
//     }
//   }

  function create2dgrid(cols: number, rows: number) {
    let arr = new Array(cols);
    for (let col = 0; col < arr.length; col++) {
      arr[col] = new Array(rows);
    }
    return arr;
  }
};

new p5(sketch);