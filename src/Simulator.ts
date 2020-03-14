import { CellOfParticles } from "./CellOfParticles";
import { GridPosition } from "./GridPosition";
import { Grid } from "./Grid";

export class Simulator {
  readonly TRESHOLD_FOR_SPLIT = 1000;
  readonly RIGHT_EDGE: number;
  readonly LEFT_EDGE = 0;
  readonly TOP_EDGE = 0;
  readonly BOTTOM_EDGE: number;
  totalChanse = 0;
  cells: Array<CellOfParticles>;
  grid: Grid;

  chances: Map<Direction, number>;

  constructor(grid: Grid) {
    this.chances = new Map();
    this.chances.set(Direction.Left, 20);
    this.chances.set(Direction.Right, 20);
    this.chances.set(Direction.Down, 30);
    this.chances.set(Direction.Up, 5);
    this.chances.set(Direction.Stay, 25);

    this.grid = grid;
    this.RIGHT_EDGE = this.grid.numberOfColums;
    this.BOTTOM_EDGE = this.grid.numberOfRows;

    this.totalChanse = this.sumUpChances();
    let firstCell = new CellOfParticles(10000, new GridPosition(1, 1));

    grid.setContentAtPosition(
      firstCell.position.x,
      firstCell.position.y,
      firstCell
    );
  }

  init() {
    // todo create array of cells
  }

  step() {
    let oldGrid = this.grid;
    console.table(oldGrid.grid);
    // create new array from old
    const newGrid = new Grid(oldGrid.numberOfRows, oldGrid.numberOfColums);

    let numbOfColums = oldGrid.numberOfColums;
    let numbOfRows = oldGrid.numberOfRows;
    /// loop thoough old array
    let counter = 0;
    for (let y = 0; y < numbOfColums; y++) {
      for (let x = 0; x < numbOfRows; x++) {
        counter++;
        // console.warn("loop counter" + counter);
        let cell = oldGrid.getPositionContent(x, y);
        if (cell != null && cell.numberOfParticles > 0) {
          // console.log(cell);

          const numberOfParticles = cell.numberOfParticles;

          // looping through all the chanses to get split amount
          this.chances.forEach((_: number, direction: Direction) => {
            // calculate split
            const splitAmount = this.calculateAmountToSplit(
              numberOfParticles,
              direction
            );
            // console.log("amount to split: " + splitAmount);

            // if (direction != Direction.Stay) {
            // console.log("if Not stay direction: " + direction);

            // put new cells into position
            let newPosition = this.getNewCellPosition(
              <Direction>(<unknown>direction),
              cell.position
            );

            // if there is something at that position add it
            let newCell = this.splitCell(splitAmount, cell, newPosition);
            console.log(newCell);

            this.mergeParticleInCell(newCell, oldGrid, newGrid);
            // }
          });
        }
      }
    }
    console.table(oldGrid.grid);
    oldGrid = newGrid;
    console.table(oldGrid.grid);

    // if on edge calculate new temp chanses
    // display changes
  }

  mergeParticleInCell(newCell: CellOfParticles, oldGrid: Grid, newGrid: Grid) {
    const x = newCell.position.x;
    const y = newCell.position.y;
    // console.log(newCell);

    const oldCell = oldGrid.getPositionContent(x, y);
    console.log("The Old cell" + oldCell);

    if (oldCell != null && oldCell.numberOfParticles > 0) {
      newCell.numberOfParticles += oldCell.numberOfParticles;
    } else {
    }
    newGrid.setContentAtPosition(x, y, newCell);
  }

  getNewCellPosition(
    direction: Direction,
    startPosition: GridPosition
  ): GridPosition {
    const x = startPosition.x;
    const y = startPosition.y;
    let newX: number = x,
      newY: number = y;
    switch (direction) {
      case Direction.Right:
        if (x <= this.RIGHT_EDGE) {
          newX = x + 1;
        }
        break;

      case Direction.Left:
        if (x >= this.LEFT_EDGE) {
          newX = x - 1;
        }
        break;

      case Direction.Up:
        if (y <= this.TOP_EDGE) {
          newY = y - 1;
        }
        break;

      case Direction.Down:
        if (y >= this.BOTTOM_EDGE) {
          newY = y + 1;
        }
        break;
      case Direction.Stay:
        newX = x;
        newY = y;
        break;
      default:
        console.log("Default state in getNewCellPosition not implemented");

        break;
    }
    return new GridPosition(newX, newY);
  }

  calculateAmountToSplit(orgAmount: number, direction: Direction): number {
    let chance = 0;
    if (orgAmount > this.TRESHOLD_FOR_SPLIT) {
      // console.log("direction: " + direction);

      chance = this.chances.get(direction);
      // console.log("Split chance: " + chance);
    }

    return (orgAmount * chance) / this.totalChanse;
  }

  splitCell(
    numberToSplitAway: number,
    cellToSplit: CellOfParticles,
    positionOfNewCell: GridPosition
  ): CellOfParticles {
    cellToSplit.numberOfParticles -= numberToSplitAway;
    return new CellOfParticles(numberToSplitAway, positionOfNewCell);
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
