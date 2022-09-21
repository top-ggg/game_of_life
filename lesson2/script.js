var matrix = [];
var side = 15;
var size2 = 40; // Reduced size due to lag
var emptyCells = [];
var timer = 0;

function setup(){
    createCanvas(size2*side,size2*side)
    background(50)
    for(var i=0;i<size2;i++){
        var arr = [];
        for(var j=0;j<size2;j++){
            var entity = Math.random()
            if(entity > 0.4){
                arr.push(new Empty(j,i))
            } else if(entity < 0.4 && entity > 0.01){
                arr.push(new Grass(j,i))
            } else if(entity < 0.01){
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
    for(var i=0;i<size2;i++){
        for(var j=0;j<size2;j++){
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
    if (timer == 3){
        for(var i in emptyCells){
            var x3 = emptyCells[i][0]
            var y3 = emptyCells[i][1]
            matrix[y3][x3]=new Grass(x3,y3);
        }
        timer = 0;
    }
}



// Parent Class
class Item {
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
}


// Grass
class Grass extends Item{
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


// GrassEater
class GrassEater extends Item{
    constructor(x,y,energy){
        super(x, y)
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
                if (matrix[y][x] instanceof Grass) {
                    foundGrassEater.push(this.directions[i]);
                    this.energy = 15;
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


// Empty
class Empty extends Item{}







// var data = {
//     "key": "value",
//     "first_name": "Fabian",
//     "last_name": "Harizi",
//     "age": 16,
//     "tumo_student": true,
//     "favorite_sports": [
//         {
//             "name": "football",
//             "position": "defender"
//         },
//         {
//             "name": "basketball",
//             "position": "centerBack"
//         }
//     ],
    
//     sayHello() {
//         console.log("Hello")
//     }
// }


// // console.log(data.first_name)
// // console.log(data.last_name)
// // console.log(data.age)
// // console.log(data.tumo_student)
// // console.log(data.favorite_sports)
// // data.sayHello()






// class User {
//     constructor(firstName, lastName, age, job){
//         this.firstName = firstName;
//         this.lastName = lastName;
//         this.age = age;
//         this.job = job;
//     }

//     userInfo() {
//         console.log("My name is " + this.firstName + " " + this.lastName + ". I am "+ this.age +" years old and I am a "+ this.job)
//     }

//     changeJob(x) {
//         this.job = x;
//     } 
// }


// var firstUser = new User("Fabian", "Harizi", 16, "student")
// console.log(firstUser)
// firstUser.userInfo()

// var secondUser = new User("Fab", "Dumdumi", 15, "miniator")
// console.log(secondUser)
// secondUser.userInfo()