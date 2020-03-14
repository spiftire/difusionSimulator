import { CellOfParticles } from "./CellOfParticles";

export class Grid {
  rows: number; // y
  cols: number; // x
  grid: CellOfParticles[][];

  constructor(numberOfRows: number, numberOfColums: number) {
    this.rows = numberOfRows;
    this.cols = numberOfColums;
    this.grid = this.create2dgrid(this.cols, this.rows);
  }

  create2dgrid(cols: number, rows: number): Array<Array<CellOfParticles>> {
    let arr = new Array(cols);
    for (let col = 0; col < arr.length; col++) {
      arr[col] = new Array(rows);
      const temprows = arr[col];
      for (let i = 0; i < temprows.length; i++) {
        temprows[i] = null;
      }
    }
    return arr;
  }

  setPositionContent(
    x: number,
    y: number,
    cellOfParticles: CellOfParticles
  ): void {
    this.grid[y][x] = cellOfParticles;
  }

  getPositionContent(x: number, y: number): CellOfParticles {
    return this.grid[y][x];
  }
}
