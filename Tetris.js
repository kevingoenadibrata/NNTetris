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
        this.activePiece = [];
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

    drawCell = (x,y) => {
        this.ctx.fillStyle = 'rgb(147, 39, 129)';
        this.ctx.fillRect(this.tileSize * x, this.tileSize * y + this.topPad, this.tileSize, this.tileSize);
    }

    spawnPiece = () => {
        var shapeId = Math.floor((Math.random() * NUM_SHAPE) + 1);
        return SHAPE_DICT[shapeId].slice();
    }

    moveLeft = () => {

    }

    moveRight = () => {

    }

    rotate = () => {

    }

    dropblock = () => {
        
    }
}
