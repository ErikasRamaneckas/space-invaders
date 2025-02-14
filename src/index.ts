import Player from './Player.js';
import PlayerController from './PlayerController.js';
import InputHandler from './InputHandler.js';
import Enemy from './Enemy.js';
import EnemyController from './EnemyController.js';

const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

let player: Player;
let playerController: PlayerController;
let inputHandler: InputHandler;
let enemyController: EnemyController;

function init() {
  if (canvas) {
    player = new Player((canvas.width - 60) / 2);
    playerController = new PlayerController(player);
    inputHandler = new InputHandler(playerController);
    enemyController = new EnemyController();
    enemyController.createEnemies();
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
    playerController.move(canvas.width);
    playerController.shoot();
    player.drawBullets(ctx);

    enemyController.update();
    enemyController.draw(ctx);

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
