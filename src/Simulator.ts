import { CellOfParticles } from "./CellOfParticles";
import { GridPosition } from "./GridPosition";
import { Grid } from "./Grid";

export class Simulator {
  readonly TRESHOLD_FOR_SPLIT = 1000;
  totalChanse = 0;
  cells: Array<CellOfParticles>;
  grid: Array<Array<CellOfParticles>>;

  chances: Map<Direction, number>;

  constructor(
    this.chances = new Map();
    this.chances.set(Direction.Left, 20);
    this.chances.set(Direction.Right, 20);
    this.chances.set(Direction.Down, 30);
    this.chances.set(Direction.Up, 5);
    this.chances.set(Direction.Stay, 25);

    this.grid = grid;
    this.totalChanse = this.sumUpChances();
    let firstCell = new CellOfParticles(
      10000,
      new GridPosition(Math.floor(grid[0].length / 2), 0)
    );

    grid[firstCell.position.y][firstCell.position.x] = firstCell;
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

  mergeParticleInCell(newCell: CellOfParticles) {
    const x = newCell.position.x;
    const y = newCell.position.y;

    const oldCell = this.grid[x][y];

    if (oldCell != null) {
      oldCell.numberOfParticles += newCell.numberOfParticles;
    } else {
      this.grid[x][y] = newCell;
    }
  }

  setCellPosition(
    cell: CellOfParticles,
    direction: Direction,
    y: number,
    x: number
  ) {
    let newX, newY;
    switch (direction) {
      case Direction.Right:
        newX = x + 1;
        newY = y;
        break;

      case Direction.Left:
        newX = x - 1;
        newY = y;
        break;

      case Direction.Up:
        newX = x;
        newY = y - 1;
        break;

      case Direction.Down:
        newX = x;
        newY = y + 1;
        break;
      default:
        break;
    }
    // this.grid[newY][newX] = cell;
    cell.position.y = newY;
    cell.position.x = newX;
  }

  calculateSplitToAmount(orgAmount: number, direction: Direction): number {
    let chance = 0;
    if (orgAmount > this.TRESHOLD_FOR_SPLIT) {
      console.log("direction: " + direction);

      chance = this.chances.get(direction);
      console.log("Split chance: " + chance);
    }

    return (orgAmount * chance) / this.totalChanse; // todo use totalchance
  }

  splitCell(numberToSplitAway: number, cell: CellOfParticles): CellOfParticles {
    cell.numberOfParticles -= numberToSplitAway;
    return new CellOfParticles(numberToSplitAway, new GridPosition(0, 0));
  }

  sumUpChances(): number {
    let totalChance = 0;
    this.chances.forEach((chance, _) => {
      totalChance += chance;
    });
    return totalChance;
  }
}

enum Direction {
  Up,
  Down,
  Left,
  Right,
  Stay
}
