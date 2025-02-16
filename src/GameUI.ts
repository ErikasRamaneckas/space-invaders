export default class GameUI {
  score: number;
  lives: number;

  constructor(score: number, lives: number) {
    this.score = score;
    this.lives = lives;
  }

  drawScore(ctx: CanvasRenderingContext2D) {
    ctx.font = '48px serif';
    ctx.fillStyle = 'white';
    ctx.fillText(this.score.toString(), 10, 40);
  }

  drawLives(ctx: CanvasRenderingContext2D) {
    ctx.font = '48px serif';
    ctx.fillStyle = 'white';
    ctx.fillText(this.lives.toString(), 420, 40);
  }
}
