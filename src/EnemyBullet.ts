import Bullet from './Bullet.js';

export default class EnemyBullet extends Bullet {
  update() {
    this.y += this.speed;
  }
}
