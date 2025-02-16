import Player from './Player.js';
import PlayerBullet from './PlayerBullet.js';
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  BULLET_WIDTH,
  BULLET_HEIGHT,
} from './consts.js';

export default class PlayerController {
  player: Player;
  leftPressed: boolean;
  rightPressed: boolean;
  spacePressed: boolean;
  shootingCooldown: number;

  constructor(player: Player) {
    this.player = player;
    this.rightPressed = false;
    this.leftPressed = false;
    this.spacePressed = false;
    this.shootingCooldown = 500;
  }

  move() {
    if (
      this.rightPressed &&
      this.player.x <
        CANVAS_WIDTH - this.player.width - this.player.paddingX
    ) {
      this.player.x += this.player.speed;
    }
    if (this.leftPressed && this.player.x > this.player.paddingX) {
      this.player.x -= this.player.speed;
    }
  }

  shoot() {
    if (
      this.spacePressed &&
      Date.now() - this.player.lastShot > this.shootingCooldown
    ) {
      const newBullet = new PlayerBullet(
        this.player.x + this.player.width / 2 - BULLET_WIDTH / 2,
        CANVAS_HEIGHT - this.player.height - BULLET_HEIGHT
      );
      this.player.bullets.push(newBullet);
      this.player.lastShot = Date.now();
    }
  }
}
