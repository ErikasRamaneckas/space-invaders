import Player from './Player.js';
import PlayerController from './PlayerController.js';

const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

let player: Player;
let playerController: PlayerController;

function init() {
  if (canvas) {
    player = new Player((canvas.width - 60) / 2);
    playerController = new PlayerController(player);
    window.requestAnimationFrame(draw);
  }
}

function draw() {
  if (ctx !== null) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      player.playerImg,
      player.horizontalPos,
      canvas.height - player.height - 10
    );
    if (
      playerController.rightPressed &&
      player.horizontalPos < canvas.width - player.width - 2
    ) {
      playerController.moveRight();
    }

    if (playerController.leftPressed && player.horizontalPos > 2) {
      playerController.moveLeft();
    }
    requestAnimationFrame(draw);
  }
}
init();

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(e: KeyboardEvent) {
  if (e.code === 'ArrowRight') {
    playerController.rightPressed = true;
    console.log(playerController.rightPressed);
  }
  if (e.code === 'ArrowLeft') {
    playerController.leftPressed = true;
    console.log(playerController.leftPressed);
  }
  if (e.code === 'Space') {
    // playerController.spacePressed = true;
    // console.log(playerController.spacePressed);
    // shoot();
  }
}

function keyUpHandler(e: KeyboardEvent) {
  if (e.code === 'ArrowRight') {
    playerController.rightPressed = false;
    console.log(playerController.rightPressed);
  }
  if (e.code === 'ArrowLeft') {
    playerController.leftPressed = false;
    console.log(playerController.leftPressed);
  }
  if (e.code === 'Space') {
    // playerController.spacePressed = false;
    // console.log(playerController.spacePressed);
  }
}

// const enemy = new Image();
// const enemyWidth = 75;
// const enemyHeight = 20;
// const enemyPadding = 20;
// const enemyOffsetTop = 10;
// const enemyOffsetLeft = 20;
// TODO: add score
// TODO: add lives

// const enemyRowCount = 3;
// const enemyColumnCount = 5;

// const enemies = [];
// for (let i = 0; i < enemyRowCount; i++) {
//   enemies[i] = [];
//   for (let j = 0; j < enemyColumnCount; j++) {
//     enemies[i][j] = { x: 0, y: 0, status: 1 };
//   }
// }

// const bullets = [];

// function shoot() {
//   bullets.push({
//     x: playerX + playerWidth / 2 - 5,
//     y: canvas.height - playerHeight - 10,
//     status: 1,
//   });
// }

// function drawBullets() {
//   for (let i = 0; i < bullets.length; i++) {}
// for (const bullet of bullets) {
//   ctx.fillStyle = 'red';
//   ctx.fillRect(x, y, 10, 10);
//   if (y < 0) {
//     bullets.splice(bullets.indexOf(bullet), 1);
//     y = canvas.height;
//   }
// }
// }

// function init() {
// player = new Player((canvas.width - 60) / 2);
// enemy.src = 'images/green.png';
//   window.requestAnimationFrame(draw);
// }

// function collisionDetection(x, y) {
//   for (let i = 0; i < enemyRowCount; i++) {
//     for (let j = 0; i < enemyColumnCount; j++) {
//       const e = enemies[i][j];
//       console.log(e.x);

//       if (
//         x > e.x &&
//         x < e.x + enemyWidth &&
//         y > e.y &&
//         y < e.y + enemyHeight
//       ) {
//         e.status = 0;
//       }
//     }
//   }
// }

// function draw() {

// ctx.drawImage(
//   player.playerImg.src,
//   player.playerX,
//   canvas.height - player.height - 10
// );

// ctx.drawImage(
//   player.Image.imgSrc,
//   player.playerX,
//   canvas.height - player.height - 10
// );

// for (let i = 0; i < enemyRowCount; i++) {
//   for (let j = 0; j < enemyColumnCount; j++) {
//     if (enemies[i][j].status === 1) {
//       const enemyX =
//         j * (enemyWidth + enemyPadding) + enemyOffsetLeft;
//       const enemyY =
//         i * (enemyHeight + enemyPadding) + enemyOffsetTop;
//       enemies[i][j].x = enemyX;
//       enemies[i][j].y = enemyY;
//       ctx.drawImage(enemy, enemyX, enemyY);
//     }
//   }
// }
// for (let i = 0; i < bullets.length; i++) {
//   bullets[i].y -= 2;
//   if (bullets[i].status === 1) {
//     ctx.fillStyle = 'red';
//     ctx.fillRect(bullets[i].x, bullets[i].y, 10, 10);
//   }
//   if (bullets[i].y < 0) {
//     bullets.splice(i, 1);
//   }
// collisionDetection(bullets[i].x, bullets[i].y);
// }

// }

// init();
