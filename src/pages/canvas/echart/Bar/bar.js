
export default class Bar {
  constructor ({
    padding,
    data = [],
    segsY = 5,
    barWidth = 40,
    frameNum = 50,
    divisionLength = 5,
  }) {
    this.width = 0;
    this.height = 0;
    this.ctx = null;
    this.data = data;
    this.canvas = null;
    this.segsY = segsY;
    this.padding = padding;
    this.barWidth = barWidth;
    this.frameNum = frameNum;
    this.divisionLength = divisionLength;
  }

  // 绘制
  draw = () => {
    this.drawAxis();
    this.drawBars();
  }

  // 初始化
  init = container => {
    const { width, height } = window.getComputedStyle(container);
    this.canvas = document.createElement('canvas');
    this.width = parseFloat(width, 10);
    this.height = parseFloat(height, 10);
    this.ctx = this.canvas.getContext('2d');

    this.canvas.width = this.width;
    this.canvas.height = this.height;
    container.appendChild(this.canvas);
  }

  // 绘制坐标轴
  drawAxis = () => {
    // 1. 绘制轴线
    this.ctx.beginPath();
    this.ctx.moveTo(this.padding, this.padding);
    this.ctx.lineTo(this.padding, this.height - this.padding);
    this.ctx.lineTo(this.width - this.padding, this.height - this.padding);
    this.ctx.strokeStyle = 'red';
    this.ctx.stroke();

    // 2. 绘制坐标点
    const stepLengthY = Math.floor(
      (this.height - (2 * this.padding)) / this.segsY
    );
    const stepLengthX = Math.floor(
      (this.width - (2 * this.padding)) / this.data.length
    );

    // 2.1 Y 轴
    for (let i = 0; i < this.segsY; i += 1) {
      const x = this.padding;
      const y = this.height - this.padding - (stepLengthY * (i + 1));

      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(x - this.divisionLength, y);
      this.ctx.strokeStyle = 'red';
      this.ctx.stroke();

      const value = Math.floor(
        Math.max(... this.data.map(v => v.value)) / this.segsY
      ) * (i + 1);
      this.textAlign = 'right';
      this.ctx.fillText(value, x - (6 * this.divisionLength), y + 4);
    }

    // 2.2 X 轴
    for (let i = 0; i < this.data.length; i += 1) {
      const x =  this.padding + (stepLengthX * (i + 1));
      const y = this.height - this.padding;

      this.ctx.moveTo(x, y);
      this.ctx.lineTo(x, y + this.divisionLength);
      this.ctx.strokeStyle = 'red';
      this.ctx.stroke();

      this.ctx.textAlign = 'center';
      this.ctx.fillText(
        this.data[i].name,
        x - (stepLengthX / 2),
        y + (4 * this.divisionLength)
      );
    }
  }

  // 绘制柱状图
  drawBars = () => {
    const stepLengthX = Math.floor(
      (this.width - (2 * this.padding)) / this.data.length
    );

    for (let i = 0; i < this.data.length; i += 1) {
      const height = (this.height - (2 * this.padding)) / Math.max(
        ... this.data.map(v => v.value)
      ) * this.data[i].value;

      const x = this.padding +
        (stepLengthX * i) +
        ((stepLengthX - this.barWidth) / 2);
      const y = this.height - this.padding - height;
      this.drawBar(this.data[i].value, x, y, height);
    }
  }

  // 绘制单个柱状图
  drawBar = (value, x, y, height) => {
    let i = 1;
    this.ctx.textAlign = 'center';
    const draw = () => {
      this.ctx.clearRect(x, y, this.barWidth, height);
      const _height = height / this.frameNum * i;

      this.ctx.fillStyle = 'red';
      this.ctx.fillRect(x, y + height - _height, this.barWidth, _height);

      this.ctx.fillStyle = 'blue';
      this.ctx.fillText(
        value,
        x + (this.barWidth / 2),
        y + height - (_height / 2)
      );
      i += 1;
      i < this.frameNum && requestAnimationFrame(draw);
    };
    requestAnimationFrame(draw);
  }
}
