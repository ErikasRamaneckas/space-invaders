import Bullet from './Bullet.js';
import {
  PLAYER_WIDTH,
  PLAYER_HEIGHT,
  CANVAS_HEIGHT,
} from './consts.js';
import EnemyController from './EnemyController.js';

export default class Player {
  score: number;
  lives: number;
  width: number;
  height: number;
  x: number;
  y: number;
  paddingX: number;
  paddingY: number;
  image: HTMLImageElement;
  speed: number;
  bullets: Bullet[];
  lastShot: number;
  enemyController: EnemyController;

  constructor(initialX: number, enemyController: EnemyController) {
    this.score = 0;
    this.lives = 3;
    this.width = PLAYER_WIDTH;
    this.height = PLAYER_HEIGHT;
    this.paddingX = 2;
    this.paddingY = 50;
    this.x = initialX;
    this.y = CANVAS_HEIGHT - this.height - this.paddingY;
    this.image = new Image();
    this.image.src =
      'https://erikasramaneckas.github.io/space-invaders/assets/images/player.png';
    this.speed = 4;
    this.bullets = [];
    this.lastShot = 0;
    this.enemyController = enemyController;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.image,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  drawBullets(ctx: CanvasRenderingContext2D) {
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      let bullet = this.bullets[i];
      bullet.update();
      bullet.draw(ctx);

      if (this.enemyController.checkCollision(bullet.x, bullet.y)) {
        this.bullets.splice(i, 1);
        this.score++;
      }

      if (bullet.y < 0) {
        this.bullets.splice(i, 1);
      }
    }
  }
}
