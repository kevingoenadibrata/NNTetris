class Tetris{
    constructor(canvId, reset_func){
        /* VARIABLES */
        this.reset = reset_func;
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

        // game over
        if (this.gameOver()) {
            console.log("Game Over");
        }

        this.drawGrid();
        this.drawPieces();
    }

    gameOver = () => {
        // if (y+1 < 0 && y+1.grid == locked), then game over
        const currCell = this.activePiece.getCurrentCells();

        for (let i = 0; i < currCell.length; i++) {
            let currY = currCell[i].y;

            if (currY + 1 < 0 && !this.canFall()) {
                console.log("Game Over");
                this.reset();
                // delete interval
                // print out game over
            }
        }
    }

    lockPiece = () => {
        // copy active piece to grid
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
                    this.grid[cell.x][cell.y+2].color = cell.color;
                }
            }
        }

    }

    spawnPiece = () => {
        var shapeId = Math.floor((Math.random() * NUM_SHAPE));
        return shapeId;
    }

    canFall = () => {
        // if (y+1 out of bounds) || (y+1) == 2, return false;

        const currCell = this.activePiece.getCurrentCells();

        for (let i = 0; i < currCell.length; i++) {
            let currX = currCell[i].x;
            let currY = currCell[i].y + 2;

            if (currY + 1 > 23) return false;
            if (this.grid[currX][currY+1].val == 2) return false;
        }

        return true;

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

    drawPieces = () => {
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                if (this.grid[i][j].val != 0 && this.grid[i][j].y >= 0) {
                    this.drawCell(this.grid[i][j]);
                }
            }
        }
    }

    drawCell = (cell) => {
        this.ctx.fillStyle = cell.color;
        this.ctx.fillRect(this.tileSize * cell.x, this.tileSize * cell.y + this.topPad, this.tileSize, this.tileSize);
    }

    spawnPiece = () => {
        var shapeId = Math.floor((Math.random() * NUM_SHAPE));
        return shapeId;
    }


    moveLeft = () => {
        console.log("left");
        //check valid to move left
        var valid = true;
        for (var i = 0; i < this.activePiece.getCurrentCells().length; i++) {
            if(this.activePiece.getCurrentCells()[i].x - 1 < 0){
                valid = false;
            }
            else if(this.grid[this.activePiece.getCurrentCells()[i].x - 1][this.activePiece.getCurrentCells()[i].y+2].val == 2)
                valid = false;
        }

        //move left if valid
        if(valid){
            for (var i = 0; i < this.activePiece.cells.length; i++) {
                for (var j = 0; j < this.activePiece.cells[i].length; j++) {
                    var currX = this.activePiece.cells[i][j].x;
                    var currY = this.activePiece.cells[i][j].y + 2;

                    //reset grid color val to 0, white
                    if(i == this.activePiece.currentRotation){
                        this.grid[currX][currY].val = 0;
                    }

                    this.activePiece.cells[i][j].x = this.activePiece.cells[i][j].x - 1;
                    // currX = this.activePiece.cells[i][j].x;
                }
            }

            for (var i = 0; i < this.activePiece.getCurrentCells().length; i++) {
                var currX = this.activePiece.getCurrentCells()[i].x;
                var currY = this.activePiece.getCurrentCells()[i].y+2;

                //set val of grid to 1
                this.grid[currX][currY].val = 1;
                this.grid[currX][currY].color = this.activePiece.getCurrentCells()[i].color;


            }


            this.drawGrid();
            this.drawPieces();
        }


    }

    moveRight = () => {
        console.log("right");

        //check valid to move right
        var valid = true;
        for (var i = 0; i < this.activePiece.getCurrentCells().length; i++) {
            if(this.activePiece.getCurrentCells()[i].x + 1 >= this.grid.length){
                valid = false;
            }
            else if(this.grid[this.activePiece.getCurrentCells()[i].x + 1][this.activePiece.getCurrentCells()[i].y+2].val == 2)
                valid = false;
        }

        //move right if valid
        if(valid){
            for (var i = 0; i < this.activePiece.cells.length; i++) {
                for (var j = 0; j < this.activePiece.cells[i].length; j++) {
                    var currX = this.activePiece.cells[i][j].x;
                    var currY = this.activePiece.cells[i][j].y + 2;

                    //reset grid color val to 0, white
                    if(i == this.activePiece.currentRotation){
                        this.grid[currX][currY].val = 0;
                    }

                    this.activePiece.cells[i][j].x = this.activePiece.cells[i][j].x + 1;
                    // currX = this.activePiece.cells[i][j].x;
                }
            }

            for (var i = 0; i < this.activePiece.getCurrentCells().length; i++) {
                var currX = this.activePiece.getCurrentCells()[i].x;
                var currY = this.activePiece.getCurrentCells()[i].y+2;

                //set val of grid to 1
                this.grid[currX][currY].val = 1;
                this.grid[currX][currY].color = this.activePiece.getCurrentCells()[i].color;


            }


            this.drawGrid();
            this.drawPieces();
        }


    }

    rotate = () => {

    }

    dropblock = () => {

        //check the y border line
        var y_border = this.grid[0].length-1;

        var difference = -1; //initially don't know how much to go down

        for (var i = 0; i < this.activePiece.getCurrentCells().length; i++) {
            //get grid perspective
            var currX = this.activePiece.getCurrentCells()[i].x;
            var currY = this.activePiece.getCurrentCells()[i].y+2;

            while((currY+1) < this.grid[0].length && this.grid[currX][currY+1].val != 2){
                currY++;
            }
            // console.log("currX: " + currX);
            // console.log("currY: " + currY);

            //get the lowest border line y and the minimal difference of going down
            if(currY <= y_border || currY - this.activePiece.getCurrentCells()[i].y - 2 < difference){
                
                y_border = currY;
                difference = currY - this.activePiece.getCurrentCells()[i].y - 2;
            }
        }

        // console.log("difference: " + difference);
        //drop block
        for (var i = 0; i < this.activePiece.getCurrentCells().length; i++) {

            // reset current grid status
            var currX = this.activePiece.getCurrentCells()[i].x;
            var currY = this.activePiece.getCurrentCells()[i].y+2;

            this.grid[currX][currY].val = 0;


            this.activePiece.getCurrentCells()[i].y = this.activePiece.getCurrentCells()[i].y + difference;
            currY = this.activePiece.getCurrentCells()[i].y + 2;

            console.log("currX: " + currX);
            console.log("currY: " + currY); 

            //update next grid status
            this.grid[currX][currY].val = 1;
            this.grid[currX][currY].color = this.activePiece.getCurrentCells()[i].color;




        }
        this.lockPiece();
        this.drawGrid();
        this.drawPieces();      

    }
}
