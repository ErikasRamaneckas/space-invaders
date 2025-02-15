export default class Enemy {
  x: number;
  y: number;
  speed: number;
  enemyImg: HTMLImageElement;
  width: number;
  height: number;
  padding: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.speed = 0.3;
    this.enemyImg = new Image();
    this.enemyImg.src = 'public/images/green.png';
    this.width = 40;
    this.height = 32;
    this.padding = 20;
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
