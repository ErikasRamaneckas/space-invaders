import Bullet from './Bullet.js';

export default class EnemyBullet extends Bullet {
  constructor(x: number, y: number) {
    super(x, y, 1, 'red');
  }

  update() {
    this.y += this.speed;
  }
}
