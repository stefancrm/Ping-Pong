const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let ballX = canvas.width / 4;
let ballY = canvas.height / 4;
let ballSpeedX = 2;
let ballSpeedY = 2; 

let player1Score = 0;
let player2Score = 0;
let playerSpeed = 10;
const paddleWidth = 5;
const paddleHeight = 50;

let player1 = {
    x: 10,
    y: canvas.height / 2 - 25,
    width: paddleWidth,
    heigth: paddleHeight,
    dy: 0
}

let player2 = {
    x: canvas.width - 20,
    y: canvas.height / 2 - 25,
    width: paddleWidth,
    heigth: paddleHeight,
    dy: 0
}

let player1Y = canvas.height / 2 - 25;
let player2Y = canvas.height / 2 - 25;


// Draw the game
function draw() {
    // Draw the background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw the ball
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(ballX, ballY, 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw player 1's paddle
    ctx.fillStyle = 'white';
    ctx.fillRect(10, player1Y, 5, paddleHeight);
    
    // Draw player 2's paddle
    ctx.fillStyle = 'white';
    ctx.fillRect(canvas.width - 20, player2Y, 5, paddleHeight);
    
    // Draw the score
    ctx.fillStyle = 'white';
    ctx.font = '15px Arial';
    ctx.fillText(`${player1Score} - ${player2Score}`, canvas.width / 2 - 20, 30);
}

  // Move the ball
  function moveBall() {
    // Move the ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    
    // Bounce the ball off the top and bottom walls
    if (ballY < 0 || ballY > canvas.height) {
      ballSpeedY = -ballSpeedY;
    }
}

// player controls
document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);

function handleKeyDown(event) {
    if (event.key === "w") {
        // Up arrow key
        player1Y -= playerSpeed;
      } else if (event.key === "s") {
        // Down arrow key
        player1Y += playerSpeed;
      } else if (event.key === "o") {
        // W key
        player2Y -= playerSpeed;
      } else if (event.key === "l") {
        // S key
        player2Y += playerSpeed;
      }
}
function handleKeyUp(event) {
    if (event.key === "w" || event.key === "s") {
        player1Y = 0;
    } else if (event.key === "o"|| event.key === "l") {
        player2Y = 0;
    }
}

function movePlayer1() {
    player1.y = player1.dy;

    // Keep the paddle within the canvas bounds
    if (player1.y < 0) {
        player1.y = 0;
      }
      if (player1.y + player1.heigth > canvas.height) {
        player1.y = canvas.height - player1.heigth;
      }
}

function movePlayer2() {
    player2.y = player2.dy;

    // Keep the paddle within the canvas bounds
    if (player2.y < 0) {
        player2.y = 0;
      }
      if (player2.y + player2.heigth > canvas.height) {
        player2.y = canvas.height - player2.heigth;
      }
}

// Detect collisions with the paddles
function checkCollisions() {
    // Check if the ball hit player 1's paddle
    if (ballX < 20 && ballY > player1Y && ballY < player1Y + paddleHeight) {
      ballSpeedX = -ballSpeedX;
    }
    
    // Check if the ball hit player 2's paddle
    if (ballX > canvas.width - 20 && ballY > player2Y && ballY < player2Y + paddleHeight) {
      ballSpeedX = -ballSpeedX;
    }
    
    // Check if the ball went out of bounds on player 1's side
    if (ballX < 0) {
      player2Score++;
      resetBall();
    }
  
    // Check if the ball went out of bounds on player 2's side
    if (ballX > canvas.width) {
      player1Score++;
      resetBall();
    }
  }

  // Reset the ball
  function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
    ballSpeedY = Math.random() * 10 - 5;
  }

  // game loop
  function update() {
    moveBall();
    movePlayer1();
    movePlayer2();
    checkCollisions();
    draw();
    requestAnimationFrame(update);
  }
  
  update();