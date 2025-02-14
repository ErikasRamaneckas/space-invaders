export default class Enemy {
  x: number;
  y: number;
  speed: number;
  enemyImg: HTMLImageElement;
  width: number;
  height: number;
  padding: number;

  constructor() {
    this.x = 0;
    this.y = 0;
    this.speed = 1;
    this.enemyImg = new Image();
    this.enemyImg.src = 'public/images/green.png';
    this.width = 75;
    this.height = 20;
    this.padding = 20;
  }
}
