import Player from './Player.js';

export default class GameUI {
  score: number;
  lives: number;
  fontStyle: string;
  fontColor: string;

  constructor(score: number, lives: number) {
    this.score = score;
    this.lives = lives;
    this.fontStyle = '48px ArcadeClassic, sans-serif';
    this.fontColor = 'white';
  }

  drawScore(ctx: CanvasRenderingContext2D, player: Player) {
    ctx.font = this.fontStyle;
    ctx.fillStyle = this.fontColor;
    ctx.fillText(player.score.toString(), 10, 40);
  }

  drawLives(ctx: CanvasRenderingContext2D, player: Player) {
    ctx.font = this.fontStyle;
    ctx.fillStyle = this.fontColor;
    ctx.fillText(player.lives.toString(), 420, 40);
  }
}
