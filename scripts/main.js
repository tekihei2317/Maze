(() => {
  // canvas
  let canvas = null;
  let context = null;
  const CANVAS_WIDTH = 600;
  const CANVAS_HEIGHT = 600;

  // maze
  const H = 10;
  const W = 10;
  const GRID_SIZE = 50;
  let maze = [];
  const offsetX = 50;
  const offsetY = 550;

  // playerの位置
  let playerX = 0;
  let playerY = 0;

  // playerの向き
  let rotateY = 0;

  window.addEventListener('load', () => {
    initialize();
  });

  // 初期化処理
  function initialize() {
    canvas = document.getElementById('main_canvas');
    context = canvas.getContext('2d');
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    for (let i = 0; i < H; i++) {
      maze[i] = [];
      for (let j = 0; j < W; j++) maze[i][j] = 0;
    }

    eventSetting();
    render();
  }

  function eventSetting() {
    window.addEventListener('keydown', (event) => {
      // playerの位置を更新
      let dx = 0, dy = 0;
      if (event.key === 'ArrowRight') rotateY -= Math.PI / 2, console.log(rotateY);
      if (event.key === 'ArrowLeft') rotateY += Math.PI / 2, console.log(rotateY);
      if (event.key === 'ArrowUp') dy = 1;
      if (event.key === 'ArrowDown') dy = -1;
      playerX = clamp(0, playerX + dx, W - 1);
      playerY = clamp(0, playerY + dy, H - 1);
    });
  }

  // 描画処理
  function render() {
    context.fillStyle = '#0f0f0f';
    context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    for (let i = 0; i < H; i++) for (let j = 0; j < W; j++) {
      const [x1, y1] = [offsetX + (j + 0) * GRID_SIZE, offsetY - (i + 0) * GRID_SIZE];
      const [x2, y2] = [offsetX + (j + 1) * GRID_SIZE, offsetY - (i + 0) * GRID_SIZE];
      const [x3, y3] = [offsetX + (j + 1) * GRID_SIZE, offsetY - (i + 1) * GRID_SIZE];
      const [x4, y4] = [offsetX + (j + 0) * GRID_SIZE, offsetY - (i + 1) * GRID_SIZE];

      context.beginPath();
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.lineTo(x3, y3);
      context.lineTo(x4, y4);
      context.closePath();

      context.strokeStyle = 'white';
      context.lineWidth = 1;
      context.stroke();

      if (j === playerX && i === playerY) {
        // context.fillStyle = '#F44E3F';
        context.fill();

        // 矢印を描画する
        const centerX = offsetX + j * GRID_SIZE + GRID_SIZE / 2;
        const centerY = offsetY - i * GRID_SIZE - GRID_SIZE / 2;
        context.save();
        context.translate(centerX, centerY);
        context.rotate(-rotateY);
        context.beginPath();
        context.moveTo(0, GRID_SIZE / 2);
        context.lineTo(0, -GRID_SIZE / 2 + 5);
        context.lineTo(-GRID_SIZE / 4, -GRID_SIZE / 6);
        context.moveTo(0, -GRID_SIZE / 2 + 5);
        context.lineTo(GRID_SIZE / 4, -GRID_SIZE / 6);
        context.lineWidth = 2;
        context.strokeStyle = '#f44e3f';
        context.stroke();
        context.restore();
      }
    }
    requestAnimationFrame(render);
  }

  function clamp(l, x, r) {
    return Math.max(l, Math.min(x, r));
  }

})();