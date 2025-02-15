import Enemy from './Enemy.js';

export default class EnemyController {
  enemyOffsetTop: number;
  enemyOffsetLeft: number;
  enemyRowCount: number;
  enemyColumnCount: number;
  enemies: Enemy[];

  constructor() {
    this.enemyOffsetTop = 10;
    this.enemyOffsetLeft = 20;
    this.enemyRowCount = 3;
    this.enemyColumnCount = 5;
    this.enemies = this.createEnemies();
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
      alien.x += alien.speed;
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
        this.enemies.splice(i, 1); // Remove the enemy
        return true; // Only return true when a collision happens
      }
    }
    return false; // Return false if no collisions
  }
}
