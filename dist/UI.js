export default class GameUI {
    score;
    lives;
    constructor(score, lives) {
        this.score = score;
        this.lives = lives;
    }
    drawScore(ctx) {
        ctx.font = '48px serif';
        ctx.fillStyle = 'white';
        ctx.fillText(this.score.toString(), 10, 40);
    }
    drawLives(ctx) {
        ctx.font = '48px serif';
        ctx.fillStyle = 'white';
        ctx.fillText(this.lives.toString(), 420, 40);
    }
}
