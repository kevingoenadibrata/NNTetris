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
        var bw = this.tileSize * this.cols;
        var bh = this.tileSize * this.rows;

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
        var shapeId = Math.floor((Math.random() * NUM_SHAPE));
        return shapeId;
    }

    moveLeft = () => {

        //check valid to move left
        var valid = true;
        for (var i = 0; i < this.activePiece.cells[this.activePiece.currRot].length; i++) {
            if(this.activePiece.cells[i].x - 1 < 0){
                valid = false;
            }
        }

        //move left if valid
        for (var i = 0; i < this.activePiece.cells[this.activePiece.currRot].length; i++) {
            this.activePiece.cells[i].x = this.activePiece.cells[i].x - 1;

            //reset grid color val to 0, white

            //set val of grid to 1
        }

    }

    moveRight = () => {

       //check valid to move right
        var valid = true;
        for (var i = 0; i < this.activePiece.cells[this.activePiece.currRot].length; i++) {
            if(this.activePiece.cells[i].x + 1 >= this.activePiece.cells[this.activePiece.currRot].length){
                valid = false;
            }
        }

        //move left if right
        for (var i = 0; i < this.activePiece.cells[this.activePiece.currRot].length; i++) {
            this.activePiece.cells[i].x = this.activePiece.cells[i].x + 1;

            //reset grid color val to 0, white

            //set val of grid to 1
        }

    }

    rotate = () => {

    }

    dropblock = () => {

        //check the y border line
        var y_border = this.grid[0].length-1;

        var difference = -1; //initially don't know how much to go down

        for (var i = 0; i < this.activePiece.cells[this.activePiece.currRot].length; i++) {
            //get grid perspective
            var currX = this.activePiece.cells[i].x;
            var currY = this.activePiece.cells[i].y+2;

            while(currY+1 < this.grid[0].length-1 && this.grid[currX][currY+1] != 2){
                currY++;
            }

            //get the lowest border line y and the minimal difference of going down
            if(currY < y_border || currY - this.activePiece.cells[i].y + 2 < difference){
                y_border = currY;
                difference = currY - this.activePiece.cells[i].y + 2;
            }
        }

        //drop block
        for (var i = 0; i < this.activePiece.cells[this.activePiece.currRot].length; i++) {

            // reset current grid status

            // check here if there is a bug
            this.activePiece.cells[i].y = this.activePiece.cells[i].y + difference;

            //update next grid status
        }

    }
}
