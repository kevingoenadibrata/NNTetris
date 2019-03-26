class ActivePiece {
  constructor(cellType) {
    this.cells = copyArray(SHAPE_DICT[cellType]);
    this.currentRotation = 0;
    this.lockStatus = false;
    this.blockType = cellType;
  }

  getCurrentCells = () => {
    return this.cells[this.currentRotation];
  }

  rotate = () => {
    this.currentRotation = (this.currentRotation + 1) % 4;
  }
}