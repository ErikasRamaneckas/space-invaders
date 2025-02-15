import Player from './Player.js';
import PlayerController from './PlayerController.js';
import InputHandler from './InputHandler.js';
import EnemyController from './EnemyController.js';
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  PLAYER_WIDTH,
} from './consts.js';

const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

let player: Player;
let playerController: PlayerController;
let inputHandler: InputHandler;
let enemyController: EnemyController;

function init() {
  if (canvas) {
    enemyController = new EnemyController();
    enemyController.createEnemies();
    player = new Player(
      (CANVAS_WIDTH - PLAYER_WIDTH) / 2,
      enemyController
    );
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
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    player.draw(ctx);
    playerController.move(CANVAS_WIDTH);
    playerController.shoot();
    player.drawBullets(ctx);

    enemyController.draw(ctx);
    enemyController.update(player);

    player.drawScore(ctx);
    player.drawLives(ctx);

    if (player.lives === 0 || player.score === 15) {
      document.location.reload();
    }

    requestAnimationFrame(draw);
  }
}
init();
