var matrix = [];
var side = 15;
var cellSize = 50;
var emptyCells = [];
var timer = 0;
var season = new Season()
var grassSpeed = 3
var grassTimer = 0

/*-- Audio --*/
var winAudio = new Audio('content/win.wav');
var flowerAudio = new Audio('content/flower.wav');
var lightningAudio = new Audio('content/lightning.wav');

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
    emptyCells=[];
    timer++
    if(season.currentSeason == 'spring'){
        if(grassTimer == 50){
            flowerAudio.play()
        }
        if(grassTimer <= 0){
            grassSpeed = 3
            grassTimer = 0
        } else {
            grassSpeed = 1
            grassTimer--
        } 
    } else if (season.currentSeason == 'fall'){
        grassSpeed = 4
    } else if (season.currentSeason == 'winter'){
        grassSpeed = 5
    }
    
    if(grassItems == 0){
        document.getElementById('winTitle').innerHTML = '<i class="fa-solid fa-flag"></i> GrassEaters Won! <i class="fa-solid fa-flag"></i>'
        document.getElementById('scoreTitle').innerHTML = '<i class="fa-solid fa-clock"></i> Time: ' + timer
        winAudio.play()
        noLoop()
    } 
    if(grassEaterItems == 0 && getAllCells(Lightning).length == 0 && grassItems != 0){
        var tempLightningX = getRandomInt(0,cellSize+1)
        var tempLightningY = getRandomInt(0,cellSize+1)
        if(matrix[tempLightningY][tempLightningX] instanceof Grass){
            matrix[tempLightningY][tempLightningX] = new Lightning(tempLightningX, tempLightningY, GrassEater, timer)
            lightningAudio.play()
            matrix[tempLightningY][tempLightningX].strike()
        }
    } 

    season.recheckSeason()
    for(var i=0;i<cellSize;i++){
        for(var j=0;j<cellSize;j++){
            if(matrix[j][i] instanceof Empty){
                fill('grey')
            }else if(matrix[j][i] instanceof Grass){
                fill(season.getGrassColor())
                emptyCells.push(matrix[j][i].chooseCells())
                emptyCells = emptyCells.filter(e => e != null); // Removes unindentified values(happens when green cells don't have empty cells surrounding it)
            }else if(matrix[j][i] instanceof GrassEater){
                fill('yellow')
                matrix[j][i].move()
            }else if(matrix[j][i] instanceof Flower){
                fill('pink')
                matrix[j][i].check()
            }else if(matrix[j][i] instanceof Lightning){
                fill('blue')
                if(matrix[j][i].time+2 <= timer){
                    matrix[j][i] = new GrassEater(i,j,15)
                    matrix[j][i].move()
                }
            }
            rect(j*side,i*side,side,side)
        }
    }
    if (timer % grassSpeed == 0){
        for(var i in emptyCells){
            var x3 = emptyCells[i][0]
            var y3 = emptyCells[i][1]
            matrix[y3][x3]=new Grass(x3,y3);
        }
    }
    if(season.currentSeason == 'spring'){
        var tempCoords = [getRandomInt(0,cellSize), getRandomInt(0,cellSize)]
        if(matrix[tempCoords[1]][tempCoords[0]] instanceof Grass){   
            if(Math.random() < 0.02){
                matrix[tempCoords[0]][tempCoords[1]] = new Flower   (tempCoords[0],tempCoords[1])
            }
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
            else if(matrix[i][j] instanceof Grass){
                grassItems++
            }
            else if(matrix[i][j] instanceof GrassEater){
                grassEaterItems++
            }
        }
    }
    document.getElementById('empty').innerText = "Empty Cells: " + emptyItems
    document.getElementById('grass').innerText = "Grass Cells: " + grassItems
    document.getElementById('grassEater').innerText = "GrassEater Cells: " + grassEaterItems

    document.getElementById('timer').innerText = "Timer: "+ timer
}



function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function getAllCells(val) {
    var indexes = []
    for(i = 0; i < matrix.length; i++){
        for(j = 0; j < matrix[i].length; j++){
            if(matrix[i][j] instanceof val){
                indexes.push(matrix[i][j]) 
            }
        }
    }
    return indexes
}

