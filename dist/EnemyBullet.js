import Bullet from './Bullet.js';
export default class EnemyBullet extends Bullet {
    constructor(x, y) {
        super(x, y, 1, 'red');
    }
    update() {
        this.y += this.speed;
    }
}
