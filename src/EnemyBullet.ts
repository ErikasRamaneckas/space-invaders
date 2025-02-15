import Bullet from './Bullet.js';

export default class EnemyBullet extends Bullet {
  constructor(x: number, y: number) {
    super(x, y);
  }

  update() {
    this.y += 1;
  }
}
