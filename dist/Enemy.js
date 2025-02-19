import { ENEMY_WIDTH, ENEMY_HEIGHT } from './consts.js';
export default class Enemy {
    x;
    y;
    speed;
    enemyImg;
    width;
    height;
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = 0.3;
        this.enemyImg = new Image();
        // this.enemyImg.src =
        //   'https://erikasramaneckas.github.io/space-invaders/red.png';
        this.enemyImg.src = 'red.png';
        this.width = ENEMY_WIDTH;
        this.height = ENEMY_HEIGHT;
    }
    update() {
        //
    }
    draw(ctx) {
        ctx.drawImage(this.enemyImg, this.x, this.y, this.width, this.height);
    }
}
