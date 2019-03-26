class Tetris{
    constructor(canvId){
        /* VARIABLES */
        this.cols = 10;
        this.rows = 22;
        this.tileSize = 15;
        this.topPad = 50;
        this.canvas = document.getElementById(canvId);
        this.ctx = this.canvas.getContext('2d');
        this.grid = [];
        this.activePiece = new ActivePiece(this.spawnPiece());
        /*           */

        for(let i = 0; i < this.cols; i++){
            let temp = [];
            for(let j = 0; j < this.rows + 2; j++){
                temp.push(new Cell(i, j-2, 0, ""));
            }
            this.grid.push(temp);
        }

        this.drawGrid();
    }

    mainLoop = () => {
        // spawn piece
        if (this.canFall()) {
            this.fallPiece();
        } else {
            this.lockPiece();
        }


        this.drawGrid();
        this.drawPieces();
    }

    lockPiece = () => {
        // copy active piece ke grid
        for (let j = 0; j < this.activePiece.getCurrentCells().length; j++) {
            const cell = this.activePiece.cells[this.activePiece.currentRotation][j];
            this.grid[cell.x][cell.y+2].val = 2;
        }
        const spawn = this.spawnPiece();
        this.activePiece.cells = copyArray(SHAPE_DICT[spawn]);
        this.activePiece.blockType = spawn;

    }

    fallPiece = () => {
        // semua cell turun 1

        // hapus
        for (let j = 0; j < this.activePiece.getCurrentCells().length; j++) {
            const cell = this.activePiece.cells[this.activePiece.currentRotation][j];
            this.grid[cell.x][cell.y+2].val = 0;
        }


        // bikin baru
        for (let i = 0; i < this.activePiece.cells.length; i++) {
            for (let j = 0; j < this.activePiece.cells[i].length; j++) {
                this.activePiece.cells[i][j].y += 1;
                if(i == this.activePiece.currentRotation){
                    const cell = this.activePiece.cells[i][j];
                    this.grid[cell.x][cell.y+2].val = 1;
                }
            }
        }

    }

    spawnPiece = () => {
        var shapeId = Math.floor((Math.random() * NUM_SHAPE));
        return shapeId;
    }

    canFall = () => {
        // if ((y+1 out of bounds) || (y+1) == 2, return false;
        const currCell = this.activePiece.getCurrentCells();

        for (let i = 0; i < currCell.length; i++) {
            if (currCell[i].y+2+1 > 23) return false;
            if (this.grid[currCell[i].x][currCell[i].y+2+1].val == 2) return false;
        }

        return true;
        
    }

    drawGrid = () => {
        var bw = this.tileSize * 10;
        var bh = this.tileSize * 22;

        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, this.topPad, this.cols * this.tileSize, this.rows * this.tileSize);

        this.ctx.fillStyle = 'rgb(40, 40, 40)';
        this.ctx.fillRect(0, 0, this.cols * this.tileSize, this.topPad);

        for (var x = 0; x <= bw; x += this.tileSize) {
            this.ctx.moveTo(0.5 + x + 0, 0 + this.topPad);
            this.ctx.lineTo(0.5 + x + 0, bh + 0 + this.topPad);
        }

        for (var x = 0; x <= bh; x += this.tileSize) {
            this.ctx.moveTo(0     , 0.5 + x + 0 + this.topPad);
            this.ctx.lineTo(bw + 0, 0.5 + x + 0 + this.topPad);
        }
        this.ctx.strokeStyle = "rgb(208, 208, 208)";
        this.ctx.stroke();
    }

    drawPieces = () => {
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                if (this.grid[i][j].val != 0) {
                    this.drawCell(this.grid[i][j]);
                }
            }
        }
    }

    drawCell = (cell) => {
        this.ctx.fillStyle = 'rgb(147, 39, 129)';
        this.ctx.fillRect(this.tileSize * cell.x, this.tileSize * cell.y + this.topPad, this.tileSize, this.tileSize);
    }
}
