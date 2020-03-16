import { CellOfParticles } from "./CellOfParticles";
import { GridPosition } from "./GridPosition";
import { Grid } from "./Grid";

export class Simulator {
  readonly TRESHOLD_FOR_SPLIT = 10;
  readonly RIGHT_EDGE: number;
  readonly LEFT_EDGE: number = 0;
  readonly TOP_EDGE: number = 0;
  readonly BOTTOM_EDGE: number;
  readonly START_PARTICLE_AMOUNT;
  readonly START_POSITION: GridPosition;
  totalChanse = 0;
  grid: Grid;

  chances: Map<Direction, number>;

  constructor(grid: Grid, startParticleAmount: number, startPosition: GridPosition) {
    this.chances = new Map();
    this.chances.set(Direction.Left, 20);
    this.chances.set(Direction.Right, 20);
    this.chances.set(Direction.Down, 30);
    this.chances.set(Direction.Up, 5);
    this.chances.set(Direction.Stay, 25);
    this.START_PARTICLE_AMOUNT = startParticleAmount;

    this.grid = grid;
    console.table(this.grid);
    
    this.RIGHT_EDGE = this.grid.numberOfColums-1;
    // console.log(this.RIGHT_EDGE);
    
    this.BOTTOM_EDGE = this.grid.numberOfRows-1;
    this.START_POSITION = startPosition;

    this.totalChanse = this.sumUpChances();
    let firstCell = new CellOfParticles(this.START_PARTICLE_AMOUNT, this.START_POSITION);
    // console.log(firstCell.position);
    

    grid.setContentAtPosition(firstCell.position.x, firstCell.position.y, firstCell);
  }

  init() {
    // todo create array of cells
  }

  step() {
    let oldGrid = this.grid;
    // console.table(this.grid.grid);


    // create new array from old
    const newGrid = new Grid(oldGrid.numberOfRows, oldGrid.numberOfColums);

    let numbOfColums = oldGrid.numberOfColums;
    let numbOfRows = oldGrid.numberOfRows;
    // console.log(`number of cols: ${numbOfColums} number of rows: ${numbOfRows}`);

    // loop thoough old array
    let particleCounter = 0;
    let counter = 0;
    for (let y = 0; y < numbOfRows; y++) {
      for (let x = 0; x < numbOfColums; x++) {
        // console.log("x:" + x + ", y: " + y);
        // counter++;
        // console.warn(counter);

        let cell = oldGrid.getPositionContent(x, y);
        if (cell != null && cell.numberOfParticles > 0) {
          const numberOfParticles = cell.numberOfParticles;
          // console.log("number of particles: " + numberOfParticles);

          // looping through all the chanses to get split amount
          this.chances.forEach((_: number, direction: Direction) => {
            // calculate ssplit
            let splitAmount = this.calculateAmountToSplit(numberOfParticles, direction);
            // if(direction == Direction.Stay) {
            //   splitAmount = cell.numberOfParticles;
            // }
            // console.log(`amount to split ${splitAmount} in direction ${direction}`);
            

            // put new cells into position
            let newPosition = this.getNewCellPosition(<Direction>(<unknown>direction), cell.position);

            // create new cell from split
            const newCell = this.splitCell(splitAmount, cell, newPosition);

            particleCounter += newCell.numberOfParticles;

            // if there is something at that position add it
            this.mergeParticleInCell(newCell, oldGrid, newGrid);
          });
        }
      }
    }
    if(particleCounter != this.START_PARTICLE_AMOUNT) {
      console.error(`Total amount of particles ${particleCounter}`);
    }
    
    this.grid = newGrid;
    // console.table(newGrid.grid);
    return newGrid;
  }

  /**
   * Merge the new cell into the existing one
   * check if there already is a cell at new position
   * if yes merge them, if no insert new cell.
   * if it is not posible to move stay on current position, check if there is particles in ocupied spot (in new grid)
   * if yes merge them, if not insert.
   * @param newCell the cell to insert
   * @param previusGrid The old grid from last itteration (t-1)
   * @param newGrid The new grid from this itteration (t)
   */
  mergeParticleInCell(newCell: CellOfParticles, previusGrid: Grid, newGrid: Grid) {
    const x: number = newCell.position.x;
    const y: number = newCell.position.y;
    let result: CellOfParticles = newCell;
    const cellAlreadyThere = newGrid.getPositionContent(x, y);

    if (cellAlreadyThere === null) {
      newGrid.setContentAtPosition(x, y, newCell);
    }

    if (cellAlreadyThere != null) {
      let particles = newCell.numberOfParticles + cellAlreadyThere.numberOfParticles;
      newCell.numberOfParticles = particles;
      newGrid.setContentAtPosition(x, y, result);
    }
  }

  /**
   * Tries to move into new position. If we are on the edge we stay there
   * @param direction The direction that we want to move
   * @param startPosition The position that we are moving from
   */
  getNewCellPosition(direction: Direction, startPosition: GridPosition): GridPosition {
    const x = startPosition.x;
    const y = startPosition.y;
    let edge = true;
    let newX: number = x,
      newY: number = y;
    switch (direction) {
      case Direction.Right:
        if (x < this.RIGHT_EDGE) {
          edge=false;
          newX = x + 1;
        }
        break;

      case Direction.Left:
        if (x > this.LEFT_EDGE) {
          edge=false;
          newX = x - 1;
        }
        break;

      case Direction.Up:
        if (y > this.TOP_EDGE) {
          edge=false;
          newY = y - 1;
        }
        break;

      case Direction.Down:
        if (y < this.BOTTOM_EDGE) {
          edge=false;
          newY = y + 1;
        }
        break;
      case Direction.Stay:
        edge = false;
        newX = x;
        newY = y;
        break;
      default:
        console.error("Default state in getNewCellPosition not implemented");

        break;
    }

    // if(edge && direction == Direction.Right) {console.log(`Edge to the direction ${direction} `);  }

    return new GridPosition(newX, newY);
  }

  /**
   * Calculates the amount of particles to split of as a precentage of the chance of movment
   * @param orgAmount The original amount of particles
   * @param direction The direction we want to move
   */
  calculateAmountToSplit(orgAmount: number, direction: Direction): number {
    let chance = 0;
    // if (orgAmount > this.TRESHOLD_FOR_SPLIT) {
      chance = this.chances.get(direction);
    // }

    const result = Math.ceil((orgAmount * chance) / this.totalChanse);
    // console.log(`Org amount: ${orgAmount}, result: ${result}`);
    
    return result;
  }

  /**
   * Creates a new cell and filles with a number of particles that is split off from old cell
   * @param numberToSplitAway the amount of particles to split off
   * @param cellToSplit the cell that should be split
   * @param positionOfNewCell the position of the new cell
   */
  splitCell(numberToSplitAway: number, cellToSplit: CellOfParticles, positionOfNewCell: GridPosition): CellOfParticles {
    // if (numberToSplitAway <= this.TRESHOLD_FOR_SPLIT) {
    //   return cellToSplit;
    // }
    if (numberToSplitAway > cellToSplit.numberOfParticles) {
      numberToSplitAway = cellToSplit.numberOfParticles;
    }
    cellToSplit.numberOfParticles -= numberToSplitAway;
    return new CellOfParticles(numberToSplitAway, positionOfNewCell);
  }

  /**
   * Sums up the total chance
   */
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
