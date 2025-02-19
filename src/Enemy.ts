import { ENEMY_WIDTH, ENEMY_HEIGHT } from './consts.js';

export default class Enemy {
  x: number;
  y: number;
  speed: number;
  enemyImg: HTMLImageElement;
  width: number;
  height: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.speed = 0.3;
    this.enemyImg = new Image();
    this.enemyImg.src = 'assets/images/red.png';
    this.width = ENEMY_WIDTH;
    this.height = ENEMY_HEIGHT;
  }

  update() {
    //
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.enemyImg,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
