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
  moveForward() {
    this.x = Math.clamp(0, this.x + this.dx[this.direction], 9);
    this.y = Math.clamp(0, this.y + this.dy[this.direction], 9);
  }
  moveBackward() {
    this.x = Math.clamp(0, this.x - this.dx[this.direction], 9);
    this.y = Math.clamp(0, this.y - this.dy[this.direction], 9);
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
    const offsetX = 50;
    const offsetY = 550;
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
    context.strokeStyle = '#f44e3f';
    context.stroke();
    context.restore();
  }
}