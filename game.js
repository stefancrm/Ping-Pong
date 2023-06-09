const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const paddleWidth = 5;
const paddleHeight = 20;

let playerSpeed = 3;
let player1Score = 0;
let player2Score = 0;
let player1 = {
    x: 10 + paddleWidth,
    y: canvas.height / 2 - 25,
    width: paddleWidth,
    height: paddleHeight,
    dy: 0,
	score: 0
}
let player2 = {
    x: canvas.width - 20,
    y: canvas.height / 2 - 25,
    width: paddleWidth,
    height: paddleHeight,
    dy: 0,
	score: 0
}
let ballspeed = 0.5;
let ball = {
	x: canvas.width / 2,
	y:canvas.height / 2,
	radius: 2,
	speedx: ballspeed,
	speedy: ballspeed,
}

function draw() {
    // Draw the background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw player 1's paddle
    ctx.fillStyle = 'white';
    ctx.fillRect(player1.x, player1.y, paddleWidth, paddleHeight);

	// Draw player 2's paddle
    ctx.fillStyle = 'white';
    ctx.fillRect(player2.x, player2.y, paddleWidth, paddleHeight);

	// Draw the ball
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();

	// Draw the score
    ctx.fillStyle = 'white';
    ctx.font = '15px Arial';
    ctx.fillText(`${player1.score} - ${player2.score}`, canvas.width / 2 - 20, 30);
}

// Move the ball
function moveBall() {
	ball.x += ball.speedx,
	ball.y += ball.speedy

	// Bounce the ball off the top and bottom walls
	if (ball.y < 0 || ball.y > canvas.height) {
		ball.speedy  = -ball.speedy
	}
}

// Detect collisions with the paddles
function checkCollisions() { 
	// Check if the ball hit player 1's paddle
	if (ball.x < (player1.x + player1.width) && ball.y > player1.y && ball.y < player1.y + paddleHeight){
		ball.speedx = -ball.speedx
	}

	// Check if the ball hit player 2's paddle
	if (ball.x > player2.x && ball.y > player2.y && ball.y < player2.y + paddleHeight) {
		ball.speedx = -ball.speedx;
	}
	// Check if the ball went out of bounds on player 1's side
	if (ball.x < 0) {
		player2.score++;
		resetBall();
	}

	// Check if the ball went out of bounds on player 2's side
	if (ball.x > canvas.width) {
		player1.score++;
		resetBall();
	}

}

function resetBall(){
	ball.x = canvas.width / 2;
	ball.y = canvas.width / 2;
	ball.speedx = (Math.random() < 0.5 ? -(ball.speedx + 0.05) : (ball.speedx + 0.05));
	ball.speedy = (Math.random() < 0.5 ? -(ball.speedy + 0.05) : (ball.speedy+ 0.05));
}

// Player controls
document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);
function handleKeyDown(event) {
    if (event.key === "w") {
        // Up arrow key
        player1.dy -= playerSpeed;
      } else if (event.key === "s") {
        // Down arrow key
        player1.dy += playerSpeed;
      } else if (event.key === "o") {
        // W key
        player2.dy -= playerSpeed;
      } else if (event.key === "l") {
        // S key
        player2.dy += playerSpeed;
      }
}
function handleKeyUp(event) {
    if (event.key === "w" || event.key === "s") {
        player1.dy = 0;
    } else if (event.key === "o"|| event.key === "l") {
        player2.dy = 0;
    }
}

function movePlayer1() {
  player1.y += player1.dy;

  // Keep the paddle within the canvas bounds
  if (player1.y < 0) {
      player1.y = 0;
    }
    if (player1.y + player1.height > canvas.height) {
      player1.y = canvas.height - player1.height;
    }
}
function movePlayer2() {
	player2.y += player2.dy;
  
	// Keep the paddle within the canvas bounds
	if (player2.y < 0) {
		player2.y = 0;
	  }
	  if (player2.y + player2.height > canvas.height) {
		player2.y = canvas.height - player2.height;
	  }
  }

function update() {
	moveBall()
	movePlayer1();
	movePlayer2();
	checkCollisions();
	draw();
	requestAnimationFrame(update);
}

update();