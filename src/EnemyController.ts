import Enemy from './Enemy.js';
import Player from './Player.js';
import EnemyBullet from './EnemyBullet.js';
import { CANVAS_WIDTH } from './consts.js';

export default class EnemyController {
  offsetY: number;
  offsetX: number;
  paddingY: number;
  paddingX: number;
  rowCount: number;
  enemies: Enemy[];
  direction: number;
  bullets: EnemyBullet[];
  timeSinceLastBullet: number;

  constructor() {
    this.offsetY = 40;
    this.offsetX = 20;
    this.paddingX = 90;
    this.paddingY = 40;
    this.rowCount = 3;
    this.enemies = this.createEnemies();
    this.direction = 0;
    this.bullets = [];
    this.timeSinceLastBullet = 0;
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

  draw(ctx: CanvasRenderingContext2D) {
    for (let alien of this.enemies) {
      alien.draw(ctx);
    }
    for (let bullet of this.bullets) {
      bullet.draw(ctx);
    }
  }

  update(player: Player) {
    for (let alien of this.enemies) {
      if (this.direction == 0) {
        alien.x += alien.speed;
      } else if (this.direction == 1) {
        alien.x -= alien.speed;
      }
    }
    if (this.hasChangedDirection()) {
      this.moveAlienDown();
    }

    for (let i = this.bullets.length - 1; i >= 0; i--) {
      this.bullets[i].update();
      if (
        this.bullets[i].x > player.x &&
        this.bullets[i].x < player.x + player.width &&
        this.bullets[i].y > player.y &&
        this.bullets[i].y < player.y + player.height
      ) {
        player.lives--;

        this.bullets.splice(i, 1);
      }
    }

    if (this.timeSinceLastBullet >= 80) {
      let bottomAliens: Enemy[] = this.getBottomAliens();

      if (bottomAliens.length) {
        this.makeABottomAlienShoot(bottomAliens);
      }
    }
    this.timeSinceLastBullet++;
  }

  checkCollision(x: number, y: number): boolean {
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      let currentAlien = this.enemies[i];
      if (
        x > currentAlien.x &&
        x < currentAlien.x + currentAlien.width &&
        y > currentAlien.y &&
        y < currentAlien.y + currentAlien.height
      ) {
        this.enemies.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  hasChangedDirection() {
    for (let alien of this.enemies) {
      if (alien.x >= 480 - 40) {
        this.direction = 1;
        return true;
      } else if (alien.x <= 20) {
        this.direction = 0;
        return true;
      }
    }
    return false;
  }

  moveAlienDown() {
    for (let alien of this.enemies) {
      alien.y += 10;
    }
  }

  getBottomAliens(): Enemy[] {
    let allXPositions = this.getAllXPositions();
    let aliensAtTheBottom: Enemy[] = [];

    for (let alienAtX of allXPositions) {
      let bestYPosition = 0;
      let lowestAlien: Enemy | null = null;

      for (let alien of this.enemies) {
        if (alien.x === alienAtX && alien.y > bestYPosition) {
          bestYPosition = alien.y;
          lowestAlien = alien;
        }
      }

      if (lowestAlien) {
        aliensAtTheBottom.push(lowestAlien);
      }
    }

    return aliensAtTheBottom;
  }

  makeABottomAlienShoot(bottomAliens: Enemy[]) {
    let randNum = Math.floor(Math.random() * bottomAliens.length);
    let shootingAlien = bottomAliens[randNum];

    let bullet = new EnemyBullet(
      shootingAlien.x + 10,
      shootingAlien.y + 10
    );

    this.bullets.push(bullet);
    this.timeSinceLastBullet = 0;
  }

  getAllXPositions() {
    let allXPositions = new Set();
    for (let alien of this.enemies) {
      allXPositions.add(alien.x);
    }
    return allXPositions;
  }
}
