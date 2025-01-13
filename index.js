const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const playerWidth = 60;
const playerHeight = 30;
let playerX = (canvas.width - playerWidth) / 2;
const player = new Image();
let dx = 2;
let dy = 2;
let rightPressed = false;
let leftPressed = false;

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(e) {
  if (e.code === 'ArrowRight') {
    rightPressed = true;
  }
  if (e.code === 'ArrowLeft') {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.code === 'ArrowRight') {
    rightPressed = false;
  }
  if (e.code === 'ArrowLeft') {
    leftPressed = false;
  }
}

function init() {
  player.src = 'images/player.png';
  window.requestAnimationFrame(draw);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(player, playerX, canvas.height - playerHeight - 10);
  if (rightPressed) {
    playerX += dx;
  }
  if (leftPressed) {
    playerX -= dx;
  }
  requestAnimationFrame(draw);
}

init();
