import PlayerController from './PlayerController.js';

export default class InputHandler {
  playerController: PlayerController;

  constructor(playerController: PlayerController) {
    this.playerController = playerController;
  }

  keyDownHandler(e: KeyboardEvent) {
    if (e.code === 'ArrowRight') {
      this.playerController.rightPressed = true;
    }
    if (e.code === 'ArrowLeft') {
      this.playerController.leftPressed = true;
    }
    if (e.code === 'Space') {
      this.playerController.spacePressed = true;
    }
  }

  keyUpHandler(e: KeyboardEvent) {
    if (e.code === 'ArrowRight') {
      this.playerController.rightPressed = false;
    }
    if (e.code === 'ArrowLeft') {
      this.playerController.leftPressed = false;
    }
    if (e.code === 'Space') {
      this.playerController.spacePressed = false;
    }
  }
}
