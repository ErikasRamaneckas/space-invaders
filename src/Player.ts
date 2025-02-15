import Bullet from './Bullet';
import EnemyController from './EnemyController';

export default class Player {
  score: number;
  lives: number;
  width: number;
  height: number;
  x: number;
  y: number;
  image: HTMLImageElement;
  speed: number;
  bullets: Bullet[];
  lastShot: number;
  enemyController: EnemyController;

  constructor(initialX: number, enemyController: EnemyController) {
    this.score = 0;
    this.lives = 3;
    this.width = 60;
    this.height = 30;
    this.x = initialX;
    this.y = 280;
    this.image = new Image();
    this.image.src = '/public/images/player.png';
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

  drawScore(ctx: CanvasRenderingContext2D) {
    ctx.font = '48px serif';
    ctx.fillStyle = 'red';
    ctx.fillText(this.score.toString(), 10, 40);
  }

  drawLives(ctx: CanvasRenderingContext2D) {
    ctx.font = '48px serif';
    ctx.fillStyle = 'red';
    ctx.fillText(this.lives.toString(), 420, 40);
  }

  drawBullets(ctx: CanvasRenderingContext2D) {
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      let bullet = this.bullets[i];
      bullet.y -= 30;
      bullet.draw(ctx);

      if (this.enemyController.checkCollision(bullet.x, bullet.y)) {
        this.bullets.splice(i, 1);
        this.score++;
        console.log(this.score);
        continue;
      }

      if (bullet.y < 0) {
        this.bullets.splice(i, 1);
      }
    }
  }
}
