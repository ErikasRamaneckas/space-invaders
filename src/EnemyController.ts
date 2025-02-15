import Enemy from './Enemy.js';
import EnemyBullet from './EnemyBullet.js';

export default class EnemyController {
  enemyOffsetTop: number;
  enemyOffsetLeft: number;
  enemyRowCount: number;
  enemyColumnCount: number;
  enemies: Enemy[];
  direction: number;
  bullets: EnemyBullet[];
  timeSinceLastBullet: number;

  constructor() {
    this.enemyOffsetTop = 10;
    this.enemyOffsetLeft = 20;
    this.enemyRowCount = 3;
    this.enemyColumnCount = 5;
    this.enemies = this.createEnemies();
    this.direction = 0;
    this.bullets = [];
    this.timeSinceLastBullet = 0;
  }

  createEnemies() {
    let aliens = [];
    let y = 20;
    for (let i = 0; i < this.enemyRowCount; i++) {
      for (let x = 25; x < 480 - 75; x += 90) {
        aliens.push(new Enemy(x, y));
      }
      y += 40;
    }
    return aliens;
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (let alien of this.enemies) {
      alien.draw(ctx);
    }
    for (let bullet of this.bullets) {
      bullet.draw(ctx);
    }
  }

  update() {
    for (let alien of this.enemies) {
      if (this.direction == 0) {
        alien.x += 0.2;
      } else if (this.direction == 1) {
        alien.x -= 0.2;
      }
    }
    for (let bullet of this.bullets) {
      bullet.y += 2;
    }

    // this.updateBullets();

    if (this.hasChangedDirection()) {
      this.moveAlienDown();
    }

    if (this.timeSinceLastBullet >= 40) {
      let bottomAliens: Enemy[] = this.getBottomAliens();

      if (bottomAliens.length) {
        this.makeABottomAlienShoot(bottomAliens);
      }
    }

    this.timeSinceLastBullet++;
  }

  // updateBullets() {
  //   for (let i = this.bullets.length - 1; i >= 0; i--) {
  //     this.bullets[i].y += 2;

  //     this.bullets.splice(i, 1);
  //   }
  // }

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
    // let shootingAlien = random(bottomAliens);
    let shootingAlien = bottomAliens[0];

    let bullet = new EnemyBullet(
      shootingAlien.x + 10,
      shootingAlien.y + 10
    );

    this.bullets.push(bullet);
    this.timeSinceLastBullet = 0;
    console.log('shoot');
  }

  getAllXPositions() {
    let allXPositions = new Set();
    for (let alien of this.enemies) {
      allXPositions.add(alien.x);
    }
    return allXPositions;
  }
}
