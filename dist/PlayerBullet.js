import Bullet from './Bullet.js';
export default class PlayerBullet extends Bullet {
    constructor(x, y) {
        super(x, y, 10, 'skyblue');
    }
    update() {
        this.y -= this.speed;
    }
}
