import Bullet from './Bullet.js';

export default class PlayerBullet extends Bullet {
  constructor(x: number, y: number) {
    super(x, y, 10, 'skyblue');
  }

  update() {
    this.y -= this.speed;
  }
}
