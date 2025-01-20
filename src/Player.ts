import Bullet from './Bullet';

export default class Player {
  width: number;
  height: number;
  horizontalPos: number;
  playerImg: HTMLImageElement;
  dx: number;
  bullets: Bullet[];

  constructor(initialPos: number) {
    this.width = 60;
    this.height = 30;
    this.horizontalPos = initialPos;
    this.playerImg = new Image();
    this.playerImg.src = '/public/images/player.png';
    this.dx = 4;
    this.bullets = [];
  }
}
