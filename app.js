var tet;

function start(){
    tet = new Tetris('canv');

    window.addEventListener('keydown', function(event){
    	console.log(event.keyCode);
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
    setInterval(tet.mainLoop, 100);
}


function game(){
    
}

