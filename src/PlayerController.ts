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
      this.player.x += this.player.speed;
    }
  }

  moveLeft() {
    if (this.leftPressed) {
      this.player.x -= this.player.speed;
    }
  }

  shoot() {
    if (
      this.spacePressed &&
      Date.now() - this.player.lastShot > 500
    ) {
      const newBullet = new Bullet(
        this.player.x + this.player.width / 2 - 5,
        320 - this.player.height,
        5
      );
      this.player.bullets.push(newBullet);
      this.player.lastShot = Date.now();
    }
  }
}
