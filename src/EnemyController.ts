import Enemy from './Enemy.js';
import Player from './Player.js';
import EnemyBullet from './EnemyBullet.js';
import {
  BULLET_HEIGHT,
  BULLET_WIDTH,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  ENEMY_WIDTH,
} from './consts.js';
import { Direction } from './Direction.js';

export default class EnemyController {
  offsetY: number;
  offsetX: number;
  paddingY: number;
  paddingX: number;
  jumpDistance: number;
  rowCount: number;
  enemies: Enemy[];
  direction: number;
  bullets: EnemyBullet[];
  timeSinceLastBullet: number;
  shootingCooldown: number;

  constructor() {
    this.offsetY = 40;
    this.offsetX = 20;
    this.paddingX = 90;
    this.paddingY = 40;
    this.jumpDistance = 10;
    this.rowCount = 3;
    this.enemies = this.createEnemies();
    this.direction = 0;
    this.bullets = [];
    this.timeSinceLastBullet = 0;
    this.shootingCooldown = 80;
  }

  createEnemies(): Enemy[] {
    let enemies = [];
    let y = this.offsetY;

    for (let i = 0; i < this.rowCount; i++) {
      for (
        let x = this.offsetX;
        x < CANVAS_WIDTH - this.paddingX;
        x += this.paddingX
      ) {
        enemies.push(new Enemy(x, y));
      }
      y += this.paddingY;
    }

    return enemies;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    for (let enemy of this.enemies) {
      enemy.draw(ctx);
    }

    for (let bullet of this.bullets) {
      bullet.draw(ctx);
    }
  }

  update(): void {
    for (let enemy of this.enemies) {
      if (this.direction === Direction.Right) {
        enemy.x += enemy.speed;
      } else if (this.direction === Direction.Left) {
        enemy.x -= enemy.speed;
      }
    }

    if (this.hasChangedDirection()) {
      this.moveEnemyDown();
    }
  }

  updateBullets(player: Player): void {
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      this.bullets[i].update();

      if (
        this.bullets[i].x > player.x &&
        this.bullets[i].x < player.x + player.width &&
        this.bullets[i].y > player.y &&
        this.bullets[i].y < player.y + player.height
      ) {
        player.lives--;
        console.log(player.lives);

        this.bullets.splice(i, 1);
      }
      if (this.bullets[i].y > CANVAS_HEIGHT - 40 - 20) {
        this.bullets.splice(i, 1);
      }
    }
    if (this.timeSinceLastBullet >= this.shootingCooldown) {
      let bottomEnemies: Enemy[] = this.getBottomEnemies();

      if (bottomEnemies.length) {
        this.makeABottomEnemyShoot(bottomEnemies);
      }
    }
    this.timeSinceLastBullet++;
  }

  checkCollision(x: number, y: number): boolean {
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      let currentEnemy = this.enemies[i];
      if (
        x > currentEnemy.x &&
        x < currentEnemy.x + currentEnemy.width &&
        y > currentEnemy.y &&
        y < currentEnemy.y + currentEnemy.height
      ) {
        this.enemies.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  hasChangedDirection() {
    for (let enemy of this.enemies) {
      if (enemy.x >= CANVAS_WIDTH - ENEMY_WIDTH - 2) {
        this.direction = Direction.Left;
        return true;
      } else if (enemy.x <= 2) {
        this.direction = Direction.Right;
        return true;
      }
    }
    return false;
  }

  moveEnemyDown() {
    for (let enemy of this.enemies) {
      enemy.y += this.jumpDistance;
    }
  }

  getBottomEnemies(): Enemy[] {
    let allXPositions = this.getAllXPositions();
    let enemiesAtTheBottom: Enemy[] = [];

    for (let enemyAtX of allXPositions) {
      let bestYPosition = 0;
      let lowestEnemy: Enemy | null = null;

      for (let enemy of this.enemies) {
        if (enemy.x === enemyAtX && enemy.y > bestYPosition) {
          bestYPosition = enemy.y;
          lowestEnemy = enemy;
        }
      }

      if (lowestEnemy) {
        enemiesAtTheBottom.push(lowestEnemy);
      }
    }

    return enemiesAtTheBottom;
  }

  makeABottomEnemyShoot(bottomEnemies: Enemy[]) {
    let randNum = Math.floor(Math.random() * bottomEnemies.length);
    let shootingEnemy = bottomEnemies[randNum];

    let bullet = new EnemyBullet(
      shootingEnemy.x + shootingEnemy.width / 2 - BULLET_WIDTH / 2,
      shootingEnemy.y + BULLET_HEIGHT
    );

    this.bullets.push(bullet);
    this.timeSinceLastBullet = 0;
  }

  getAllXPositions(): number[] {
    const allXPositions = [];
    for (let enemy of this.enemies) {
      allXPositions.push(enemy.x);
    }
    return allXPositions;
  }
}
