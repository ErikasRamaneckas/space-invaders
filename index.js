const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const playerWidth = 60;
const playerHeight = 30;
let playerX = (canvas.width - playerWidth) / 2;
const player = new Image();
const enemy = new Image();
const enemyWidth = 75;
const enemyHeight = 20;
const enemyPadding = 20;
const enemyOffsetTop = 10;
const enemyOffsetLeft = 20;
let dx = 4;
let dy = 4;
let rightPressed = false;
let leftPressed = false;

const enemyRowCount = 3;
const enemyColumnCount = 5;

const enemies = [];
for (let i = 0; i < enemyRowCount; i++) {
  enemies[i] = [];
  for (let j = 0; j < enemyColumnCount; j++) {
    enemies[i][j] = { x: 0, y: 0, status: 1 };
  }
}

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
  enemy.src = 'images/green.png';
  window.requestAnimationFrame(draw);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(player, playerX, canvas.height - playerHeight - 10);
  for (let i = 0; i < enemyRowCount; i++) {
    for (let j = 0; j < enemyColumnCount; j++) {
      if (enemies[i][j].status === 1) {
        const enemyX =
          j * (enemyWidth + enemyPadding) + enemyOffsetLeft;
        const enemyY =
          i * (enemyHeight + enemyPadding) + enemyOffsetTop;
        enemies[i][j].x = enemyX;
        enemies[i][j].y = enemyY;
        ctx.drawImage(enemy, enemyX, enemyY);
      }
    }
  }
  if (rightPressed && playerX < canvas.width - playerWidth - 2) {
    playerX += dx;
  }
  if (leftPressed && playerX > 2) {
    playerX -= dx;
  }
  requestAnimationFrame(draw);
}

init();
