var tet;
var interval;

function start(){
    tet = new Tetris('canv', endGame);
    interval = setInterval(tet.mainLoop, 20);
}


function game(){
    
}

function endGame() {
    clearInterval(interval);
}
