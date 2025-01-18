export default class Player {
  constructor(initialPos) {
    this.width = 60;
    this.height = 30;
    this.playerX = initialPos;
    this.playerImg = new Image();
    this.playerImg.src = 'images/player.png';
    this.dx = 4;
  }
}
