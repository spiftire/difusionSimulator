import { CellOfParticles } from "./CellOfParticles";

export class Grid {
  // todo make an iterator for this class
  numberOfRows: number; // y
  numberOfColums: number; // x
  grid: CellOfParticles[][];

  constructor(numberOfRows: number, numberOfColums: number) {
    this.numberOfRows = numberOfRows;
    this.numberOfColums = numberOfColums;
    this.grid = this.create2dgrid(this.numberOfColums, this.numberOfRows);
  }

  private create2dgrid(cols: number, rows: number): CellOfParticles[][] {
    let arr = new Array(rows);
    for (let col = 0; col < arr.length; col++) {
      arr[col] = new Array(cols);
      const temprows = arr[col];
      for (let i = 0; i < temprows.length; i++) {
        temprows[i] = null;
      }
    }
    return arr;
  }

  private createEmpty2dgrid(cols: number, rows: number): number[][] {
    let arr = new Array(rows);
    for (let col = 0; col < arr.length; col++) {
      arr[col] = new Array(cols);
      const temprows = arr[col];
      for (let i = 0; i < temprows.length; i++) {
        temprows[i] = null;
      }
    }
    return arr;
  }

  getGrid(): CellOfParticles[][] {
    return this.grid;
  }

  setGrid(grid: CellOfParticles[][]) {
    this.grid = grid;
  }

  setContentAtPosition(x: number, y: number, cellOfParticles: CellOfParticles): void {
    this.grid[y][x] = cellOfParticles;
  }

  getPositionContent(x: number, y: number): CellOfParticles {
    // console.log("x, y :" + x + ", " + y);

    return this.grid[y][x];
  }

  getGridOfParticles(): number[][] {
    return this.calculateParticles();
  }

  calculateParticles(): number[][] {
    let result = this.createEmpty2dgrid(this.numberOfColums, this.numberOfRows);
    for (let x = 0; x < this.numberOfColums; x++) {
      for (let y = 0; y < this.numberOfRows; y++) {
        const cell = this.getPositionContent(x, y);
        if (cell) {
          result[y][x] = cell.numberOfParticles;
        }
      }
    }
    return result;
  }
}
