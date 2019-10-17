export default class Line {
  constructor({ padding = 50, data = [], segsY = 5, divisionLength = 5, barWidth = 40, frameNum = 50  }){
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
  }

  // 初始化
  init = (container) => {
    const { width, height } = window.getComputedStyle(container);
    this.width = parseFloat(width);
    this.height = parseFloat(height);
    this.canvas = document.createElement('canvas');

    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext('2d');
    container.appendChild(this.canvas);
  }


  // 绘制坐标轴
  drawAxis = () => {
    // 坐标轴线
    this.ctx.beginPath();
    this.ctx.moveTo(this.padding, this.padding);
    this.ctx.lineTo(this.padding, this.height - this.padding);
    this.ctx.lineTo(this.width - this.padding, this.height - this.padding);
    this.ctx.strokeStyle = 'red';
    this.ctx.stroke();

    const stepLengthX = Math.floor((this.width - 2 * this.padding) / this.data.length);
    const stepLengthY = Math.floor((this.height - 2 * this.padding) / this.segsY);
    
    // x - 分割点
    for(let i = 0; i < this.data.length; i++){
      const y = this.height - this.padding;
      const x = this.padding + stepLengthX * (i + 1);
      
      // 分割线
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(x, y + this.divisionLength);
      this.ctx.stroke();

    }

    // y - 分割点
    for(let i = 0; i < this.segsY; i++){
      const x = this.padding;
      const y = this.height - this.padding - stepLengthY * (i + 1);
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(x - this.divisionLength, y);
      this.ctx.stroke();
    }

  }



}