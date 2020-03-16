export class GridPosition {
    x:number;
    y:number;

    constructor(x:number, y:number) {
        if(x < 0 || y < 0) {throw RangeError("X or Y value is less than 0")};
        this.x = x;
        this.y = y;
    }
}