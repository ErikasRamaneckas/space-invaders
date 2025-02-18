import { PLAYER_HEIGHT, PLAYER_WIDTH, } from './consts.js';
export default class GameUI {
    fontStyle;
    fontColor;
    image;
    constructor() {
        this.fontStyle = '32px "Press Start 2P", sans-serif';
        this.fontColor = 'white';
        this.image = new Image();
        this.image.src = '/public/images/player.png';
    }
    drawScore(ctx, player) {
        ctx.font = this.fontStyle;
        ctx.fillStyle = this.fontColor;
        ctx.fillText(`${player.score.toString().padStart(4, '0')}`, 10, 40);
    }
    drawLives(ctx, player) {
        ctx.font = this.fontStyle;
        ctx.fillStyle = this.fontColor;
        ctx.fillText(`${player.lives.toString()}`, 5, 635);
        let offset = 0;
        for (let i = 0; i < player.lives; i++) {
            ctx.drawImage(this.image, 40 + offset, 600, PLAYER_WIDTH, PLAYER_HEIGHT);
            offset += 65;
        }
    }
}
