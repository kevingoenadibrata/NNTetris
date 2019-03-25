var tet;

function start(){
    tet = new Tetris('canv');

    document.addEventListener('keydown', function(event){
	    if(event.keyCode == LEFT_CODE){
	    	tet.moveLeft();
	    }
	    else if(event.keyCode == UP_CODE){
	    	tet.moveRight();
	    }
	    else if(event.keyCode == RIGHT_CODE){
	    	tet.rotate();
	    }
	    else if(event.keyCode == SPACE_CODE){
	    	tet.dropblock();
	    }

	});
}


function game(){
    
}

