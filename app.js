const grid = document.querySelector('.grid')
const cubeWidth = 100
const cubeHeight = 20
//create cube

const playerStartingPosition = [230, 10]
let currentPlayerPosition = playerStartingPosition

class Cube {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + cubeWidth, yAxis]
        this.topLeft = [xAxis, yAxis + cubeHeight]
        this.topRight = [xAxis + cubeWidth, yAxis + cubeHeight]
    }
}

//all cubes, determines cube positions
const cubes = [
    new Cube(10, 270),
    new Cube(120, 270),
    new Cube(230, 270),
    new Cube(340, 270),
    new Cube(450, 270),
    new Cube(10, 240),
    new Cube(120, 240),
    new Cube(230, 240),
    new Cube(340, 240),
    new Cube(450, 240),
    new Cube(10, 210),
    new Cube(120, 210),
    new Cube(230, 210),
    new Cube(340, 210),
    new Cube(450, 210),

]

//draws the cubes for the game
function addCubes(){

    for (let i =  0; i < cubes.length; i++){
    const cube = document.createElement('div')
    cube.classList.add('cube')
    cube.style.left = cubes[i].bottomLeft[0] + 'px'
    cube.style.bottom = cubes[i].bottomLeft[1] + 'px'
    grid.appendChild(cube)
    }

}

addCubes()

//adds player
const player = document.createElement('div')
player.classList.add('player')
drawPlayer()
grid.appendChild(player)

//draw player
function drawPlayer() {
    player.style.left = currentPlayerPosition[0] + 'px'
    player.style.bottom = currentPlayerPosition[1] + 'px'
}


//move user
function moveUser(e) {
    switch(e.key){
        case'ArrowLeft':
            currentPlayerPosition[0] -= 10
            player.style.left = currentPlayerPosition[0] + 'px'
    }
}
