const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const cubeWidth = 100
const cubeHeight = 20
const ballDiameter = 20
const boardWidth = 560
const boardHeight = 300
let xDirection = -2
let yDirection = 2

const playerStart = [230, 10]
let currentPosition = playerStart

const ballStart = [270, 40]
let currentBallPosition = ballStart

let timerId
let score = 0

//my cube
class Cube {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis]
    this.bottomRight = [xAxis + cubeWidth, yAxis]
    this.topRight = [xAxis + cubeWidth, yAxis + cubeHeight]
    this.topLeft = [xAxis, yAxis + cubeHeight]
  }
}

//all my cubes
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

//draw my cubes
function addCubes() {
  for (let i = 0; i < cubes.length; i++) {
    const cube = document.createElement('div')
    cube.classList.add('cube')
    cube.style.left = cubes[i].bottomLeft[0] + 'px'  
    cube.style.bottom = cubes[i].bottomLeft[1] + 'px'  
    grid.appendChild(cube)
    console.log(cubes[i].bottomLeft)
  }
}
addCubes()

//add player
const player = document.createElement('div')
player.classList.add('player')
grid.appendChild(player)
drawPlayer()

//add ball
const ball = document.createElement('div')
ball.classList.add('ball')
grid.appendChild(ball)
drawBall()

//move player
function movePlayer(e) {
  switch (e.key) {
    case 'ArrowLeft':
      if (currentPosition[0] > 0) {
        currentPosition[0] -= 10
        console.log(currentPosition[0] > 0)
        drawPlayer()   
      }
      break
    case 'ArrowRight':
      if (currentPosition[0] < (boardWidth - cubeWidth)) {
        currentPosition[0] += 10
        console.log(currentPosition[0])
        drawPlayer()   
      }
      break
  }
}
document.addEventListener('keydown', movePlayer)

//draw Player
function drawPlayer() {
  player.style.left = currentPosition[0] + 'px'
  player.style.bottom = currentPosition[1] + 'px'
}

//draw Ball
function drawBall() {
  ball.style.left = currentBallPosition[0] + 'px'
  ball.style.bottom = currentBallPosition[1] + 'px'
}

//move ball
function moveBall() {
    currentBallPosition[0] += xDirection
    currentBallPosition[1] += yDirection
    drawBall()
    checkForCollisions()
}
timerId = setInterval(moveBall, 30)

//check for collisions
function checkForCollisions() {
  //check for cube collision
  for (let i = 0; i < cubes.length; i++){
    if
    (
      (currentBallPosition[0] > cubes[i].bottomLeft[0] && currentBallPosition[0] < cubes[i].bottomRight[0]) &&
      ((currentBallPosition[1] + ballDiameter) > cubes[i].bottomLeft[1] && currentBallPosition[1] < cubes[i].topLeft[1]) 
    )
      {
      const allCubes = Array.from(document.querySelectorAll('.cube'))
      allCubes[i].classList.remove('cube')
      cubes.splice(i,1)
      changeDirection()   
      score++
      scoreDisplay.innerHTML = score
      if (cubes.length == 0) {
        scoreDisplay.innerHTML = 'You Win!'
        clearInterval(timerId)
        document.removeEventListener('keydown', movePlayer)
      }
    }
  }
  // check for wall hits
  if (currentBallPosition[0] >= (boardWidth - ballDiameter) || currentBallPosition[0] <= 0 || currentBallPosition[1] >= (boardHeight - ballDiameter))
  {
    changeDirection()
  }

  //check for player collision
  if
  (
    (currentBallPosition[0] > currentPosition[0] && currentBallPosition[0] < currentPosition[0] + cubeWidth) &&
    (currentBallPosition[1] > currentPosition[1] && currentBallPosition[1] < currentPosition[1] + cubeHeight ) 
  )
  {
    changeDirection()
  }

  //game over
  if (currentBallPosition[1] <= 0) {
    clearInterval(timerId)
    scoreDisplay.innerHTML = 'You lose!'
    document.removeEventListener('keydown', movePlayer)
  }
}


function changeDirection() {
  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2
    return
  }
  if (xDirection === 2 && yDirection === -2) {
    xDirection = -2
    return
  }
  if (xDirection === -2 && yDirection === -2) {
    yDirection = 2
    return
  }
  if (xDirection === -2 && yDirection === 2) {
    xDirection = 2
    return
  }
}