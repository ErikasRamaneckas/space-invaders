import Player from './Player.js';
import PlayerBullet from './PlayerBullet.js';

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

  move(canvasWidth: number) {
    if (
      this.rightPressed &&
      this.player.x < canvasWidth - this.player.width - 2
    ) {
      this.player.x += this.player.speed;
    }
    if (this.leftPressed && this.player.x > 2) {
      this.player.x -= this.player.speed;
    }
  }

  shoot() {
    if (
      this.spacePressed &&
      Date.now() - this.player.lastShot > 500
    ) {
      const newBullet = new PlayerBullet(
        this.player.x + this.player.width / 2 - 5,
        320 - this.player.height - 5,
        30,
        'gold'
      );
      this.player.bullets.push(newBullet);
      this.player.lastShot = Date.now();
    }
  }
}
