function Cell(x, y, val, color){
    this.x = x;
    this.y = y;
    this.val = val;
    this.color = color;
}

function cellify(grid, size){
    let cells = [[],[],[],[]];
    for(let i = 0; i < grid.length; i++){
        for(let j = 0; j < grid[i].length; j++){
            if(grid[i][j] == 1){
                cells[i].push(new Cell(j%size + (size == 2 ? 4 : 3), Math.floor(j/size)-2, 1, ""));
            }
        }
    }
    return cells;
}


let IShape = cellify([
    [
        0,0,0,0,
        1,1,1,1,
        0,0,0,0,
        0,0,0,0
    ],
    [
        0,0,1,0,
        0,0,1,0,
        0,0,1,0,
        0,0,1,0
    ],
    [
        0,0,0,0,
        0,0,0,0,
        1,1,1,1,
        0,0,0,0
    ],
    [
        0,1,0,0,
        0,1,0,0,
        0,1,0,0,
        0,1,0,0
    ]
], 4);

let JShape = cellify([
    [
        1,0,0,
        1,1,1,
        0,0,0
    ],
    [
        0,1,1,
        0,1,0,
        0,1,0
    ],
    [
        0,0,0,
        1,1,1,
        0,0,1
    ],
    [
        0,1,0,
        0,1,0,
        1,1,0
    ],
], 3);

let LShape = cellify([
    [
        0,0,1,
        1,1,1,
        0,0,0
    ],
    [
        0,1,0,
        0,1,0,
        0,1,1
    ],
    [
        0,0,0,
        1,1,1,
        1,0,0
    ],
    [
        1,1,0,
        0,1,0,
        0,1,0
    ],
], 3);

let SShape = cellify([
    [
        0,1,1,
        1,1,0,
        0,0,0
    ],
    [
        0,1,0,
        0,1,1,
        0,0,1
    ],
    [
        0,0,0,
        0,1,1,
        1,1,0
    ],
    [
        1,0,0,
        1,1,0,
        0,1,0
    ],
], 3);

let ZShape = cellify([
    [
        1,1,0,
        0,1,1,
        0,0,0
    ],
    [
        0,0,1,
        0,1,1,
        0,1,0
    ],
    [
        0,0,0,
        1,1,0,
        0,1,1
    ],
    [
        0,1,0,
        1,1,0,
        1,0,0
    ],
], 3);

let TShape = cellify([
    [
        0,1,0,
        1,1,1,
        0,0,0
    ],
    [
        0,1,0,
        0,1,1,
        0,1,0
    ],
    [
        0,0,0,
        1,1,1,
        0,1,0
    ],
    [
        0,1,0,
        1,1,0,
        0,1,0
    ],
], 3);

let OShape = cellify([
    [
        1,1,
        1,1
    ],
    [
        1,1,
        1,1
    ],
    [
        1,1,
        1,1
    ],
    [
        1,1,
        1,1
    ]
], 2);

const SHAPE_DICT = {
    0: copyArray(IShape),
    1: copyArray(JShape),
    2: copyArray(LShape),
    3: copyArray(SShape),
    4: copyArray(ZShape),
    5: copyArray(TShape),
    6: copyArray(OShape)   
};

function copyArray(obj){
    return JSON.parse(JSON.stringify(obj));
}

const NUM_SHAPE = 7;
const LEFT_CODE = 37;
const UP_CODE = 38;
const RIGHT_CODE = 39;
const SPACE_CODE = 40;

