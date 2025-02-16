import Bullet from './Bullet.js';

export default class PlayerBullet extends Bullet {
  update() {
    this.y -= this.speed;
  }
}
