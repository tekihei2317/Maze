(() => {
  // canvas
  let canvas = null;
  let context = null;
  const CANVAS_WIDTH = 600;
  const CANVAS_HEIGHT = 600;

  // maze
  const H = 11;
  const W = 11;
  const GRID_SIZE = 50;
  let maze = null;

  // player
  let player = null;
  const offsetX = 25;
  const offsetY = 575;

  window.addEventListener('load', () => {
    initialize();
  });

  // 初期化処理
  function initialize() {
    canvas = document.getElementById('main_canvas');
    context = canvas.getContext('2d');
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    maze = new Maze(H, W);

    player = new Player(1, 1, 0);
    Math.clamp = (l, x, r) => {
      return Math.max(l, Math.min(x, r));
    };

    eventSetting();
    render();
  }

  // 
  function eventSetting() {
    window.addEventListener('keydown', (event) => {
      // playerの位置を更新
      if (event.key === 'ArrowRight') player.turnRight();
      if (event.key === 'ArrowLeft') player.turnLeft();
      if (event.key === 'ArrowUp') player.moveForward(maze);
      if (event.key === 'ArrowDown') player.moveBackward(maze);
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
      if (maze.isWall[i][j] === true) {
        context.fillStyle = '#691e06';
        context.fill();
      }

      context.strokeStyle = '#dddddd';
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