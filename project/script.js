var matrix = [];
var side = 15;
var cellSize = 50;
var emptyCells = [];
var timer = 0;
var weather = ['spring', 'summer', 'fall', 'winter']

var emptyItems;
var grassItems;
var grassEaterItems;

function setup(){
    createCanvas(cellSize*side+1,cellSize*side+1)
    background(50)
    for(var i=0;i<cellSize;i++){
        var arr = [];
        for(var j=0;j<cellSize;j++){
            var entity = Math.random()
            if(entity <= 1 && entity >= 0.4){
                arr.push(new Empty(j,i))
            } else if(entity < 0.4 && entity >= 0.01){
                arr.push(new Grass(j,i))
            } else if(entity < 0.01 && entity >= 0){
                arr.push(new GrassEater(j,i,15))
            }
        }
        matrix.push(arr)
    } 
}

function draw(){
    frameRate(10)
    emptyCells=[];
    timer++
    for(var i=0;i<cellSize;i++){
        for(var j=0;j<cellSize;j++){
            if(matrix[j][i] instanceof Empty){
                fill('grey')
            }else if(matrix[j][i] instanceof Grass){
                fill('green')
                emptyCells.push(matrix[j][i].chooseCells())
                emptyCells = emptyCells.filter(e => e != null); // Removes unindentified values(happens when green cells don't have empty cells surrounding it)
            }else if(matrix[j][i] instanceof GrassEater){
                fill('yellow')
                matrix[j][i].move()
            }
            rect(j*side,i*side,side,side)
        }
    }
    if (timer % 3 == 0){
        for(var i in emptyCells){
            var x3 = emptyCells[i][0]
            var y3 = emptyCells[i][1]
            matrix[y3][x3]=new Grass(x3,y3);
        }
    }

    emptyItems = 0;
    grassItems = 0;
    grassEaterItems = 0;
    for (var i in matrix) {
        for(var j in matrix[i]){
            if(matrix[i][j] instanceof Empty){
                emptyItems++
            }
            if(matrix[i][j] instanceof Grass){
                grassItems++
            }
            if(matrix[i][j] instanceof GrassEater){
                grassEaterItems++
            }
        }
    }
    document.getElementById('empty').innerText = "Empty Cells: " + emptyItems
    document.getElementById('grass').innerText = "Grass Cells: " + grassItems
    document.getElementById('grassEater').innerText = "GrassEater Cells: " + grassEaterItems

    document.getElementById('timer').innerText = "Timer: "+ timer
}









