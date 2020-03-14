import { CellOfParticles } from "./CellOfParticles";
import { GridPosition } from "./GridPosition";

export class Simulator {
  readonly TRESHOLD_FOR_SPLIT = 1000;
  totalChanse = 0;
  cells: Array<CellOfParticles>;
  grid: Array<Array<CellOfParticles>>;

  chances = new Collections.Dictionary<Direction, number>();

  constructor(
    // cells: Array<CellOfParticles>,
    grid: Array<Array<CellOfParticles>>
  ) {
    this.grid = grid;
    // this.cells = cells;
    this.totalChanse = this.sumUpChances(this.chances);
    let firstCell = new CellOfParticles(
      10000,
      new GridPosition(Math.floor(grid[0].length / 2), 0)
    );

    grid[firstCell.position.y][firstCell.position.x] = firstCell;

    this.chances.setValue(Direction.Left, 20);
    this.chances.setValue(Direction.Right, 20);
    this.chances.setValue(Direction.Down, 30);
    this.chances.setValue(Direction.Up, 5);
    this.chances.setValue(Direction.Stay, 25);
  }

  init() {
    // todo create array of cells
  }

  step() {
    console.log("in the step");

    // create new array from old
    const tempArray = this.grid;

    let cols = this.grid;
    let rows = cols.entries;
    /// loop thoough old array
    for (let i = 0; i < cols.length; i++) {
      for (let j = 0; j < cols[i].length; j++) {
        if (this.grid[i][j] instanceof CellOfParticles) {
          console.log(this.grid[i][j]);

          let cell = this.grid[i][j];
          const newCells = this.calculateSplitCell(cell);
		  console.log();

          //   this.setPositionOfNewCells(newCells, i, j);
        }
      }
    }
    // calculate splitt
    // put new cells into position
    // if there is something at that position add it
    // if on edge calculate new temp chanses
    // display changes
  }

  setPositionOfNewCells(newCells, oldX: number, oldY: number) {
    if (oldX <= 0) {
    }
  }

  calculateSplitCell(cell: CellOfParticles): object {
    if (cell.numberOfParticles > this.TRESHOLD_FOR_SPLIT) {
      let right = (cell.numberOfParticles * this.chances.right) / 100;
      let left = (cell.numberOfParticles * this.chances.left) / 100;
      let down = (cell.numberOfParticles * this.chances.down) / 100;
      let up = (cell.numberOfParticles * this.chances.up) / 100;

      let rightCell = this.splitCell(right, cell);
      let leftCell = this.splitCell(left, cell);
      let downCell = this.splitCell(down, cell);
      let upCell = this.splitCell(up, cell);

      return { rightCell, leftCell, downCell, upCell };
    }
  }

  splitCell(numberToSplitAway: number, cell: CellOfParticles): CellOfParticles {
    cell.numberOfParticles -= numberToSplitAway;
    return new CellOfParticles(numberToSplitAway, new GridPosition(0, 0));
  }

  sumUpChances(chances: object): number {
    let totalChance = 0;
    // const enteries: any = Object.keys(chances).map(function(key) {
    // 	return chances[]
    // })
    // enteries.forEach((value: any) => {
    // 	totalChance += value
    // })
    return totalChance;
  }
}
