const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const playerWidth = 60;
const playerHeight = 30;

function drawPlayer() {
  const img = new Image();
  img.addEventListener('load', () => {
    ctx.drawImage(
      img,
      (canvas.width - playerWidth) / 2,
      canvas.height - playerHeight - 10
    );
  });
  img.src = 'images/player.png';
}

drawPlayer();
