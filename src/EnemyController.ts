import Enemy from './Enemy.js';

export default class EnemyController {
  enemyOffsetTop: number;
  enemyOffsetLeft: number;
  enemyRowCount: number;
  enemyColumnCount: number;
  enemies: Enemy[];
  direction: number;

  constructor() {
    this.enemyOffsetTop = 10;
    this.enemyOffsetLeft = 20;
    this.enemyRowCount = 3;
    this.enemyColumnCount = 5;
    this.enemies = this.createEnemies();
    this.direction = 0;
  }

  createEnemies() {
    let aliens = [];
    let y = 20;
    for (let i = 0; i < this.enemyRowCount; i++) {
      for (let x = 25; x < 480 - 75; x += 90) {
        aliens.push(new Enemy(x, y));
      }
      y += 20;
    }
    return aliens;
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (let alien of this.enemies) {
      alien.draw(ctx);
    }
  }

  update() {
    for (let alien of this.enemies) {
      if (this.direction === 0) {
        alien.x += alien.speed;
      } else if (this.direction === 1) {
        alien.x -= alien.speed;
      }

      if (this.hasChangedDirection()) {
        this.moveAlienDown();
      }
    }
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
      alien.y += 0.1;
    }
  }
}
