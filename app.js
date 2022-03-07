const scoreDisplay = document.querySelector('.score')
const grid = document.querySelector('.grid')
const gridWidth = 560
const gridHeight = 300
const cubeWidth = 100
const cubeHeight = 20
const ballDiameter = 20
let xDirection = -2
let yDirection = 2
let timerId
//create cube

const playerStartingPosition = [230, 10]
const ballStartingPosition = [270, 50]
let currentPlayerPosition = playerStartingPosition
let currentBallPosition = ballStartingPosition

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
//draw ball
function drawBall(){
    ball.style.left = currentBallPosition[0] + 'px'
    ball.style.bottom = currentBallPosition[1] + 'px'
}

//moves player
function movePlayer(e) {
    switch(e.key){
        case'ArrowLeft':
        if (currentPlayerPosition[0] > 0){
            currentPlayerPosition[0] -= 10
            drawPlayer()
        }     
            break;
        case'ArrowRight':
        if (currentPlayerPosition[0] < gridWidth - cubeWidth){
            currentPlayerPosition[0] += 10
            drawPlayer()
            }     
            break;
    }
}

document.addEventListener('keydown', movePlayer)


//adds ball
const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)

//move ball

function moveBall(){
    currentBallPosition[0] += xDirection
    currentBallPosition[1] += yDirection
    drawBall()
    collisionCheck()
}

timerId = setInterval(moveBall, 30)

//collision check
function collisionCheck(){
    //block collision handling
    for (let i = 0; i < cubes.length; i++){
        if ( 
            (currentBallPosition[0] > cubes[i].bottomLeft[0] && currentBallPosition[0] < cubes[i].bottomRight[0]) &&
            ((currentBallPosition[1] + ballDiameter) > cubes[i].bottomLeft[1] && currentBallPosition[1] < blocks[i].topLeft[1])
        ) {// removes blocks on collision
            const allCubes = Array.from(document.querySelectorAll('.cube'))
            allCubes[i].classList.remove('cube')
            cubes.splice(i, 1)
            changeDirection()
        }

    //wall collision handling
    if (currentBallPosition[0] >= (gridWidth - ballDiameter) || 
        currentBallPosition[1] >= (gridHeight - ballDiameter) ||
        currentBallPosition[0] <= 0) {
        changeDirection()
    }
    

    }
    //checks for loss/gameover
    if(currentBallPosition[1] <= 0){
        clearInterval(timerId)
        alert('YOU LOSE')
        document.removeEventListener('keydown', movePlayer)
    }
}



//ball changing direction
function changeDirection(){
    if(xDirection === 2 && yDirection === 2){
        yDirection = -2
        return
    }
    if(xDirection == 2 && yDirection  == -2 ){
        xDirection = -2
        return
    }
    if(xDirection == -2 && yDirection == -2){
        yDirection = 2
        return
    }
    if(xDirection == -2 && yDirection === 2){
        xDirection = 2
        return
    }
}