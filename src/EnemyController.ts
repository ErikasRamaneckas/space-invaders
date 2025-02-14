import Enemy from './Enemy.js';

export default class EnemyController {
  enemyOffsetTop: number;
  enemyOffsetLeft: number;
  enemyRowCount: number;
  enemyColumnCount: number;
  enemies: Enemy[][];

  constructor() {
    this.enemyOffsetTop = 10;
    this.enemyOffsetLeft = 20;
    this.enemyRowCount = 3;
    this.enemyColumnCount = 5;
    this.enemies = [];
  }

  createEnemies() {
    for (let i = 0; i < this.enemyRowCount; i++) {
      this.enemies[i] = [];
      for (let j = 0; j < this.enemyColumnCount; j++) {
        this.enemies[i][j] = new Enemy();
      }
    }
    console.log(this.enemies);
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (let i = 0; i < this.enemyRowCount; i++) {
      for (let j = 0; j < this.enemyColumnCount; j++) {
        const enemyX =
          j *
            (this.enemies[i][j].width + this.enemies[i][j].padding) +
          this.enemyOffsetLeft;
        const enemyY =
          i *
            (this.enemies[i][j].height + this.enemies[i][j].padding) +
          this.enemyOffsetTop;
        this.enemies[i][j].x += this.enemies[i][j].speed;
        this.enemies[i][j].y = enemyY;
        ctx.drawImage(this.enemies[i][j].enemyImg, enemyX, enemyY);
      }
    }
  }
}
