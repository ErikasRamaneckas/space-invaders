import Player from './Player.js';
import PlayerController from './PlayerController.js';
import InputHandler from './InputHandler.js';
import EnemyController from './EnemyController.js';
import GameUI from './GameUI.js';
import { CANVAS_WIDTH, CANVAS_HEIGHT, PLAYER_WIDTH, } from './consts.js';
createCanvas();
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
let player;
let playerController;
let inputHandler;
let enemyController;
let gameUI;
function init() {
    if (canvas) {
        enemyController = new EnemyController();
        enemyController.createEnemies();
        player = new Player((CANVAS_WIDTH - PLAYER_WIDTH) / 2, enemyController);
        playerController = new PlayerController(player);
        inputHandler = new InputHandler(playerController);
        gameUI = new GameUI();
        document.addEventListener('keydown', (e) => inputHandler.keyDownHandler(e), false);
        document.addEventListener('keyup', (e) => inputHandler.keyUpHandler(e), false);
        window.requestAnimationFrame(draw);
    }
}
function draw() {
    if (ctx !== null) {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.beginPath();
        ctx.moveTo(0, CANVAS_HEIGHT - 40);
        ctx.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT - 40);
        ctx.strokeStyle = 'limegreen';
        ctx.lineWidth = 3;
        ctx.stroke();
        gameUI.drawScore(ctx, player);
        gameUI.drawLives(ctx, player);
        player.draw(ctx);
        playerController.move();
        playerController.shoot();
        player.drawBullets(ctx);
        enemyController.draw(ctx);
        enemyController.update();
        enemyController.updateBullets(player);
        if (player.lives === 0) {
            drawMessage(ctx, 'You lose');
        }
        else if (player.score === 15) {
            drawMessage(ctx, 'You win');
        }
        else {
            requestAnimationFrame(draw);
        }
    }
}
init();
function createCanvas() {
    const canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    document.body.appendChild(canvas);
}
function drawMessage(ctx, text) {
    ctx.font = '32px Press Start 2P, sans-serif';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(text, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    setTimeout(() => {
        document.location.reload();
    }, 3000);
}
