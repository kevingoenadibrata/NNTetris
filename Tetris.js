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
        this.bag = this.shuffle([0,1,2,3,4,5,6]);
        this.grid = [];
        this.activePiece = new ActivePiece(this.spawnPiece());
        this.gridLines = new Array(this.rows + 2).fill(0);

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
            const spawn = this.spawnPiece();
            this.activePiece.currentRotation = 0;
            this.activePiece.cells = copyArray(SHAPE_DICT[spawn]);
            this.activePiece.blockType = spawn;
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
            this.countCellLines(cell.y+2);
        }
    }

    countCellLines = (y) => {
        // number of counts of blocks in each line
        ++this.gridLines[y];
        if (this.gridLines[y] == 10) {
            this.clearLines(y);
        }
    }

    clearLines = (index) => {
        console.log("Need to clear line");
        // splice the array
        // push 0 to front of array
        this.gridLines.splice(index, 1);
        this.gridLines.unshift(0);
        
        console.log(this.grid);

        // clear the line
        for (let x = 0; x < this.grid.length; x++) {
            
            // shift by 1 downward
            let needToBeUpdated = this.grid[x].slice(0,index);
            needToBeUpdated.map(item => item.y += 1);

            // splice arrays
            this.grid[x].splice(index, 1);

            // add new cell object
            this.grid[x].unshift(new Cell(x, -2, 0, ""));
        }

        this.drawGrid();
        this.drawPieces();
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
        console.log(this.bag);
        let returnValue = this.bag.pop();
        if(this.bag.length == 0) this.bag = this.shuffle([0,1,2,3,4,5,6]);
        return returnValue;
    }

    shuffle = (a) => {
        var array = a.slice();
    	var currentIndex = array.length;
    	var temporaryValue, randomIndex;

    	// While there remain elements to shuffle...
    	while (0 !== currentIndex) {
    		// Pick a remaining element...
    		randomIndex = Math.floor(Math.random() * currentIndex);
    		currentIndex -= 1;

    		// And swap it with the current element.
    		temporaryValue = array[currentIndex];
    		array[currentIndex] = array[randomIndex];
    		array[randomIndex] = temporaryValue;
    	}

    	return array;
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

        this.drawNext(this.bag[this.bag.length-1]);
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

    drawNext = (id) => {
        let shape = copyArray(SHAPE_DICT[id])[0];
        let color = shape[0].color;

        this.ctx.fillStyle = color;
        for(let i = 0; i < shape.length; i++){
            this.ctx.fillRect(shape[i].x*10, 30 + shape[i].y*10, 10, 10);
        }

    }


    moveLeft = () => {
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
        var valid = false;
        var initRotation = this.activePiece.currentRotation;
        var rotationIdxResult = this.activePiece.currentRotation;
        console.time('start');
        while(!valid && (rotationIdxResult+1)%4 != initRotation){
            rotationIdxResult = (rotationIdxResult+1)%4;

            //check if valid
            var validFlag = 1;
            var currCells = this.activePiece.cells[rotationIdxResult];
            for (var i = 0; i < currCells.length; i++) {
                var currX = currCells[i].x;
                var currY = currCells[i].y + 2;

                if(currX < 0 || currX > this.grid.length-1){
                    validFlag = 0;
                    break;
                }
                else if(currY < 0 || currY > this.grid[0].length-1){
                    validFlag = 0;
                    break;
                }
                else if(this.grid[currX][currY].val == 2){
                    validFlag = 0;
                    break;
                }


            }
            if(validFlag == 1){
                valid = true;
                break;
            }

        }
        console.timeEnd('start');
        console.time('draw');

        if(valid){
            this.setGridByBlock(this.activePiece.getCurrentCells(), 0);
            this.activePiece.currentRotation = rotationIdxResult;
            this.setGridByBlock(this.activePiece.getCurrentCells(), 1);
            this.drawGrid();
            this.drawPieces();
        }
        console.timeEnd('draw');
    }

    setGridByBlock = (block, val) => {
        for(let i = 0; i < block.length; i++){
            this.grid[block[i].x][block[i].y+2].val = val;
            this.grid[block[i].x][block[i].y+2].color = block[i].color;

        }
    }

    dropblock = () => {
        while(this.canFall()) this.fallPiece();
        this.lockPiece();
        this.drawGrid();
        this.drawPieces();
    }

}

