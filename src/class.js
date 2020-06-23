// プレイヤーを扱うクラス
class Player {
  constructor(x, y, direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.dx = [0, -1, 0, 1];
    this.dy = [1, 0, -1, 0];
  }

  // 移動
  moveForward(maze) {
    const nx = this.x + this.dx[this.direction];
    const ny = this.y + this.dy[this.direction];
    if (maze.isWall[ny][nx] === false) [this.x, this.y] = [nx, ny];
  }
  moveBackward(maze) {
    const nx = this.x - this.dx[this.direction];
    const ny = this.y - this.dy[this.direction];
    if (maze.isWall[ny][nx] === false) [this.x, this.y] = [nx, ny];

  }

  // 回転
  turnRight() {
    this.direction = (this.direction + 3) % 4;
  }
  turnLeft() {
    this.direction = (this.direction + 1) % 4;
  }

  /**
   * プレイヤーの位置に矢印を描画する
   * @param {CanvasRenderingContext2D} context - 描画用のコンテキスト
   */
  draw(context) {
    const offsetX = 25;
    const offsetY = 575;
    const GRID_SIZE = 50;
    const centerX = offsetX + this.x * GRID_SIZE + GRID_SIZE / 2;
    const centerY = offsetY - this.y * GRID_SIZE - GRID_SIZE / 2;

    context.save();
    context.translate(centerX, centerY);
    context.rotate(-this.direction * Math.PI / 2);
    context.beginPath();
    context.moveTo(0, GRID_SIZE / 2);
    context.lineTo(0, -GRID_SIZE / 2 + 5);
    context.lineTo(-GRID_SIZE / 4, -GRID_SIZE / 6);
    context.moveTo(0, -GRID_SIZE / 2 + 5);
    context.lineTo(GRID_SIZE / 4, -GRID_SIZE / 6);
    context.lineWidth = 2;
    context.strokeStyle = '#ffd23f';
    context.stroke();
    context.restore();
  }
}

// 迷路を扱うクラス
class Maze {
  /**
   * @constructor
   * @param {number} H - 迷路の縦の長さ
   * @param {number} W - 迷路の横の長さ
   */
  constructor(H, W) {
    this.H = H;
    this.W = W;
    this.isWall = [];

    // 壁を生成(棒倒し法)
    for (let i = 0; i < H; i++) {
      this.isWall[i] = [];
      for (let j = 0; j < W; j++) {
        this.isWall[i][j] = (i === 0 || i === H - 1 || j === 0 || j === W - 1);
      }
    }

    for (let i = 2; i < H - 2; i += 2) {
      for (let j = 2; j < W - 2; j += 2) this.isWall[i][j] = true;
    }

    for (let i = 2; i < H - 2; i += 2) {
      for (let j = 2; j < W - 2; j += 2) {
        const r = this.random(i == 2 ? 4 : 3);

        let [y, x] = [i, j];
        if (r === 0) x++;
        if (r === 1) y++;
        if (r === 2) x--;
        if (r === 3) y--;
        console.log(r);
        this.isWall[y][x] = true;
      }
    }
  }

  /**
   * 0からnum-1までの整数をランダムに返す
   * @param {number} num
   */
  random(num) {
    return Math.floor(Math.random() * num);
  }
}