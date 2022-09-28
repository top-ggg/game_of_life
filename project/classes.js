class Grass {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],     
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],     
            [this.x + 1, this.y + 1]  
        ];
    }
    chooseCells(){
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                if (matrix[y][x] instanceof Empty) {
                    found.push(this.directions[i]);
                }
            }  
        }
        var target = random(found);
        return target;
    }
}

class GrassEater {
    constructor(x,y,energy){
        this.x = x;
        this.y = y;
        this.energy = energy;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCells(){
        var foundGrassEater = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                if (matrix[y][x] instanceof Grass || matrix[y][x] instanceof Flower) {
                    foundGrassEater.push(this.directions[i]);
                    this.energy = 15;
                    if (matrix[y][x] instanceof Flower) {
                        grassTimer = 50
                    }
                }
            }
        }
        if (foundGrassEater.length == 0) {
            for (var i in this.directions) {
                var x = this.directions[i][0];
                var y = this.directions[i][1];
                if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                    if (matrix[y][x] instanceof Empty) {
                        foundGrassEater.push(this.directions[i]);
                    }
                }  
            }
            this.energy--
        }
        if (foundGrassEater.length == 0) {
            for (var i in this.directions) {
                var x = this.directions[i][0];
                var y = this.directions[i][1];
                if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                    if (matrix[y][x] instanceof GrassEater) {
                        foundGrassEater.push(this.directions[i]);
                    }
                    
                }  
            }
            this.energy--
        }
        var target = random(foundGrassEater);
        return target;
    }
    move(){
        var targetCell = this.chooseCells()
        var x = targetCell[0]
        var y = targetCell[1]
        var targetCellClone = this.chooseCells()
        var xClone = targetCellClone[0]
        var yClone = targetCellClone[1]
        matrix[this.y][this.x] = new Empty(this.x,this.y)
        if(this.energy > 0){
            matrix[y][x] = new GrassEater(x,y,this.energy)
            if(Math.random()<0.05){  
                matrix[yClone][xClone] = new GrassEater(xClone,yClone,this.energy)
            }
        }
    }
}

class Empty {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}





// Updates

class Season {
    constructor(){
        this.season = ['spring', 'summer', 'fall', 'winter']
        this.seasonTimer = 0
        this.seasonCount = 0
        this.currentSeason = this.season[this.seasonCount]
    }

    recheckSeason(){
        if(this.seasonTimer > 250){
            this.seasonTimer = 0
            if(this.seasonCount >= this.season.length-1){
                this.seasonCount  = 0
            } else {
                this.seasonCount++
            }
        } else {
            this.seasonTimer++
        }
        this.currentSeason = this.season[this.seasonCount]
        document.getElementById('season').innerText = "Season: " + this.currentSeason + " / Season Time: " + this.seasonTimer
    }

    getGrassColor(x){
        return grassTimer != 0 ? 'red'
             : this.currentSeason == 'spring' ? 'green'
             : this.currentSeason == 'summer' ? 'rgb(194, 178, 128)'
             : this.currentSeason == 'fall'   ? 'darkgreen'
             : this.currentSeason == 'winter' ? 'white'
             : 'green' 
    }
    
}



class Flower{
    constructor(x,y){
        this.x = x
        this.y = y
    }
    check(){
        if(season.currentSeason != 'spring'){
            matrix[this.y][this.x] = new Empty(this.x,this.y)
        }
    }
}



class Lightning {
    constructor(x,y,child,time){
        this.x = x;
        this.y = y;
        this.child = child
        this.time = time
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],     
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],     
            [this.x + 1, this.y + 1]  
        ];
    }
    chooseCells(){
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                found.push(this.directions[i]);
            }  
        }
        return found
    }
    strike(){
        var turnLighting = this.chooseCells()
        for(var i in turnLighting){
            var tempx = this.directions[i][0];
            var tempy = this.directions[i][1];
            matrix[tempy][tempx] = new Lightning(tempx,tempy,this.child,timer)
        }
    }
}