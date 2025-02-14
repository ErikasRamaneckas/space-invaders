import Player from './Player.js';
import PlayerController from './PlayerController.js';
import InputHandler from './InputHandler.js';

const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

let player: Player;
let playerController: PlayerController;
let inputHandler: InputHandler;

function init() {
  if (canvas) {
    player = new Player((canvas.width - 60) / 2);
    playerController = new PlayerController(player);
    inputHandler = new InputHandler(playerController);
    document.addEventListener(
      'keydown',
      (e) => inputHandler.keyDownHandler(e),
      false
    );
    document.addEventListener(
      'keyup',
      (e) => inputHandler.keyUpHandler(e),
      false
    );
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

    if (playerController.spacePressed) {
      playerController.shoot();
    }

    for (let i = 0; i < player.bullets.length; i++) {
      player.bullets[i].y -= 2;
      ctx.fillStyle = 'red';
      ctx.fillRect(player.bullets[i].x, player.bullets[i].y, 10, 10);
      if (player.bullets[i].y < 0) {
        player.bullets.splice(i, 1);
      }
    }
    requestAnimationFrame(draw);
  }
}
init();

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

// }
