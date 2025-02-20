import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  PLAYER_HEIGHT,
  PLAYER_WIDTH,
} from './consts.js';
import Player from './Player.js';

export default class GameUI {
  fontStyle: string;
  fontColor: string;
  image: HTMLImageElement;

  constructor() {
    this.fontStyle = '32px "Press Start 2P", sans-serif';
    this.fontColor = 'white';
    this.image = new Image();
    // this.image.src =
    //   'https://erikasramaneckas.github.io/space-invaders/player.png';
    this.image.src = '/assets/images/player.png';
  }

  drawScore(ctx: CanvasRenderingContext2D, player: Player) {
    ctx.font = this.fontStyle;
    ctx.fillStyle = this.fontColor;
    ctx.fillText(
      `${player.score.toString().padStart(4, '0')}`,
      10,
      40
    );
  }

  drawLives(ctx: CanvasRenderingContext2D, player: Player) {
    ctx.font = this.fontStyle;
    ctx.fillStyle = this.fontColor;
    ctx.fillText(`${player.lives.toString()}`, 5, 635);
    let offset = 0;
    for (let i = 0; i < player.lives; i++) {
      ctx.drawImage(
        this.image,
        40 + offset,
        600,
        PLAYER_WIDTH,
        PLAYER_HEIGHT
      );
      offset += 65;
    }
  }
}
