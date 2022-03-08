const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const cubeWidth = 100
const cubeHeight = 20
const ballDiameter = 20
const gridWidth = 560
const gridHeight = 300
let xDirection = -2
let yDirection = 2

const playerStart = [230, 10]
const ballStart = [270, 40]
let currentPosition = playerStart
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

//array of cubes
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

//spawns cubes
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

//spawn player
const player = document.createElement('div')
player.classList.add('player')
grid.appendChild(player)
drawPlayer()

//spawn ball
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
      if (currentPosition[0] < (gridWidth - cubeWidth)) {
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

//collision handling
function checkForCollisions() {
  //cube collision handling
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
        scoreDisplay.innerHTML = 'WINNER'
        alert('WINNER WINNER CHICKEN DINNER')
        clearInterval(timerId)
        document.removeEventListener('keydown', movePlayer)
      }
    }
  }
  // wall collision handling
  if (currentBallPosition[0] >= (gridWidth - ballDiameter) || currentBallPosition[0] <= 0 || currentBallPosition[1] >= (gridHeight - ballDiameter))
  {
    changeDirection()
  }

  //player collision handling
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
    scoreDisplay.innerHTML = 'YOU LOSE NERD'
    alert('YOU LOST HAHAHAHA')
    document.removeEventListener('keydown', movePlayer)
  }
}

//changes ball direction
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