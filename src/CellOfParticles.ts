import { GridPosition } from "./GridPosition";

/**
 * Represents a cell of particles
 * Each cell has a number of particles and a position
 */
export class CellOfParticles {
  numberOfParticles: number;
  position: GridPosition;
  readonly id:number;

  constructor(numberOfParticles: number, position: GridPosition) {
    this.numberOfParticles = numberOfParticles;
    this.position = position;
    this.id = Math.floor(Math.random() * 10000);
  }

  act(): void {}
}
