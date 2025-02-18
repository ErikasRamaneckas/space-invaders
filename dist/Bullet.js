import { BULLET_HEIGHT, BULLET_WIDTH } from './consts.js';
export default class Bullet {
    x;
    y;
    speed;
    width;
    height;
    color;
    constructor(x, y, speed, color) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.width = BULLET_WIDTH;
        this.height = BULLET_HEIGHT;
        this.color = color;
    }
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
