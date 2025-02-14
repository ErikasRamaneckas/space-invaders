import Player from './Player.js';
import PlayerController from './PlayerController.js';
import InputHandler from './InputHandler.js';
import Enemy from './Enemy.js';

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

    player.draw(ctx);
    if (
      playerController.rightPressed &&
      player.x < canvas.width - player.width - 2
    ) {
      playerController.moveRight();
    }

    if (playerController.leftPressed && player.x > 2) {
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
    const enemyOffsetTop = 10;
    const enemyOffsetLeft = 20;

    const enemyRowCount = 3;
    const enemyColumnCount = 5;

    const enemies: Enemy[][] = [];
    for (let i = 0; i < enemyRowCount; i++) {
      enemies[i] = [];
      for (let j = 0; j < enemyColumnCount; j++) {
        enemies[i][j] = new Enemy();
      }
    }
    console.log(enemies);

    for (let i = 0; i < enemyRowCount; i++) {
      for (let j = 0; j < enemyColumnCount; j++) {
        const enemyX =
          j * (enemies[i][j].width + enemies[i][j].padding) +
          enemyOffsetLeft;
        const enemyY =
          i * (enemies[i][j].height + enemies[i][j].padding) +
          enemyOffsetTop;
        enemies[i][j].x += enemies[i][j].speed;
        enemies[i][j].y = enemyY;
        ctx.drawImage(enemies[i][j].enemyImg, enemyX, enemyY);
      }
    }

    requestAnimationFrame(draw);
  }
}
init();

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
