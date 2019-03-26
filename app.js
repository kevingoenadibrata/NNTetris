var tet;
var interval;

function start(){
    tet = new Tetris('canv', endGame);

    window.addEventListener('keydown', function(event){
	    if(event.keyCode == LEFT_CODE){
	    	tet.moveLeft();
	    }
	    else if(event.keyCode == RIGHT_CODE){
	    	tet.moveRight();
	    }
	    else if(event.keyCode == UP_CODE){
	    	tet.rotate();
	    }
	    else if(event.keyCode == SPACE_CODE){
	    	tet.dropblock();
	    }

	});

    interval = setInterval(tet.mainLoop, 200);
}


function game(){

}

function endGame() {
    clearInterval(interval);
}
