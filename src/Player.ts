import Bullet from './Bullet';

export default class Player {
  width: number;
  height: number;
  x: number;
  y: number;
  image: HTMLImageElement;
  speed: number;
  bullets: Bullet[];
  lastShot: number;

  constructor(initialX: number) {
    this.width = 60;
    this.height = 30;
    this.x = initialX;
    this.y = 280;
    this.image = new Image();
    this.image.src = '/public/images/player.png';
    this.speed = 4;
    this.bullets = [];
    this.lastShot = 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.image,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
