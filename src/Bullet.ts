export default abstract class Bullet {
  x: number;
  y: number;
  speed: number;
  width: number;
  height: number;
  color: string;

  constructor(x: number, y: number, speed: number, color: string) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 7;
    this.height = 20;
    this.color = color;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  abstract update(): void;
}
