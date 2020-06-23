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

  // playerの向き(1増えるごとに時計周りにPI/2増える)
  let direction = 0;
  const dy = [1, 0, -1, 0];
  const dx = [0, -1, 0, 1];

  // player
  let player = null;

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

    player = new Player(0, 0, 0);

    eventSetting();
    render();
  }

  function eventSetting() {
    window.addEventListener('keydown', (event) => {
      // playerの位置を更新
      if (event.key === 'ArrowRight') player.direction = (player.direction + 3) % 4;
      if (event.key === 'ArrowLeft') player.direction = (player.direction + 1) % 4;
      if (event.key === 'ArrowUp') {
        player.x = clamp(0, player.x + dx[player.direction], W - 1);
        player.y = clamp(0, player.y + dy[player.direction], H - 1);
      }
      if (event.key === 'ArrowDown') {
        player.x = clamp(0, player.x - dx[player.direction], W - 1);
        player.y = clamp(0, player.y - dy[player.direction], H - 1);
      }
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

      if (j === player.x && i === player.y) {
        // context.fillStyle = '#F44E3F';
        context.fill();

        // 矢印を描画する
        const centerX = offsetX + j * GRID_SIZE + GRID_SIZE / 2;
        const centerY = offsetY - i * GRID_SIZE - GRID_SIZE / 2;
        context.save();
        context.translate(centerX, centerY);
        context.rotate(-player.direction * Math.PI / 2);
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