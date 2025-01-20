import Player from './Player.js';
import Bullet from './Bullet.js';

export default class PlayerController {
  player: Player;
  leftPressed: boolean;
  rightPressed: boolean;
  spacePressed: boolean;

  constructor(player: Player) {
    this.player = player;
    this.rightPressed = false;
    this.leftPressed = false;
    this.spacePressed = false;
  }

  moveRight() {
    if (this.rightPressed) {
      this.player.horizontalPos += this.player.dx;
    }
  }

  moveLeft() {
    if (this.leftPressed) {
      this.player.horizontalPos -= this.player.dx;
    }
  }

  shoot() {
    if (this.spacePressed) {
      this.player.bullets.push(
        new Bullet(
          this.player.horizontalPos + this.player.width / 2 - 5,
          320 - this.player.height,
          5
        )
      );
    }
  }
}
