import { CellOfParticles } from "./CellOfParticles";
import { GridPosition } from "./GridPosition";
import { Grid } from "./Grid";

export class Simulator {
  readonly TRESHOLD_FOR_SPLIT = 1000;
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
    this.totalChanse = this.sumUpChances();
    let firstCell = new CellOfParticles(
      10000,
      new GridPosition(Math.floor(this.grid.numberOfRows / 2), 3)
    );

    grid.setPositionContent(
      firstCell.position.x,
      firstCell.position.y,
      firstCell
    );
  }

  init() {
    // todo create array of cells
  }

  step() {
    const oldGrid = this.grid;
    console.table(oldGrid.grid);
    // create new array from old
    const tempArray = oldGrid;

    let numbOfColums = oldGrid.numberOfColums;
    let numbOfRows = oldGrid.numberOfRows;
    /// loop thoough old array
    let counter = 0;
    for (let x = 0; x < numbOfColums; x++) {
      for (let y = 0; y < numbOfRows; y++) {
        counter++;
        // console.warn("loop counter" + counter);
        let cell = this.grid.getPositionContent(x, y);
        if (cell != null && cell.numberOfParticles > 0) {
          console.log(cell);

          const numberOfParticles = cell.numberOfParticles;

          // looping through all the chanses to get split amount
            this.chances.forEach((_: number, direction: Direction) => {

            const splitAmount = this.calculateSplitToAmount(
              numberOfParticles,
              direction
            );
            console.log("amount to split: " + splitAmount);

            if (direction != Direction.Stay) {
              console.log("if Not stay direction: " + direction);

              let newPosition = this.getNewCellPosition(
                <Direction>(<unknown>direction),
                cell.position
              );
              let newCell = this.splitCell(splitAmount, cell, newPosition);
              console.log(newCell);

              this.mergeParticleInCell(newCell, oldGrid);
            }
          });
        }
      }
    }
    console.table(oldGrid.grid);
    // calculate split
    // put new cells into position
    // if there is something at that position add it
    // if on edge calculate new temp chanses
    // display changes
  }

  mergeParticleInCell(newCell: CellOfParticles, grid: Grid) {
    const x = newCell.position.x;
    const y = newCell.position.y;
    // console.log(newCell);

    const oldCell = grid.getPositionContent(x, y);

    if (oldCell != null && oldCell.numberOfParticles > 0) {
      oldCell.numberOfParticles += newCell.numberOfParticles;
    } else {
      grid.setPositionContent(x, y, newCell);
    }
  }

  getNewCellPosition(
    direction: Direction,
    startPosition: GridPosition
  ): GridPosition {
    const x = startPosition.x;
    const y = startPosition.y;
    let newX: number, newY: number;
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
    return new GridPosition(newX, newY);
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
