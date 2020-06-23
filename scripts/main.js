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
    Math.clamp = (l, x, r) => {
      return Math.max(l, Math.min(x, r));
    };

    eventSetting();
    render();
  }

  function eventSetting() {
    window.addEventListener('keydown', (event) => {
      // playerの位置を更新
      if (event.key === 'ArrowRight') player.turnRight();
      if (event.key === 'ArrowLeft') player.turnLeft();
      if (event.key === 'ArrowUp') player.moveForward();
      if (event.key === 'ArrowDown') player.moveBackward();
    });
  }

  // 描画処理
  function render() {
    context.fillStyle = '#0f0f0f';
    context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    for (let i = 0; i < H; i++) for (let j = 0; j < W; j++) {
      // グリッドを描画
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

      // 矢印を描画
      player.draw(context);
    }
    requestAnimationFrame(render);
  }

  function clamp(l, x, r) {
    return Math.max(l, Math.min(x, r));
  }

})();