// 参考: https://codepen.io/jscottsmith/pen/VjPaLO

class Line {
  constructor({
    ctx = null,       // canvas 2d 上下文
    originX = 0,      // 源头坐标 x
    originY = 0,      // 源头坐标 y

    segmentLen = 10,  // 线段长度(粒子数)
    particleSize = 2, // 粒子大小
  } = {}){
    this.ctx = ctx;
    this.originX = originX;
    this.originY = originY;         
    this.segmentLen = segmentLen;
    this.particleSize = particleSize;

    this.angle = (Math.random() < 0.5 ? 1 : -1) * Math.PI / 3; // 当前线条行走方向(角度, 相对 x 轴, 逆时针为正)
    this.currentSegmentLen = 0;                                // 当前线段长度(粒子数)
    this.turningX = this.originX;                              // 上一个转折点坐标 x
    this.turningY = this.originY;                              // 上一个转折点坐标 y
  }

  // 移动
  step = () => {
    this.drawParticle();
    this.currentSegmentLen ++;
  }

  // 绘制粒子
  drawParticle = () => {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.fillStyle = 'red';
    const y = Math.sin(this.angle) * this.currentSegmentLen * this.particleSize;
    const x = Math.cos(this.angle) * this.currentSegmentLen * this.particleSize;
    this.ctx.fillRect(
      this.turningX + x,
      this.turningY + y, 
      this.particleSize, 
      this.particleSize,
    );
    this.ctx.beginPath();
    this.ctx.restore();
  }
};

export default class {
  constructor({
    container = null,
  } = {}){
    this.container = container;
    this.lines = [];

    this.createCanvas();
    this.loop();
  }

  // 创建画布
  createCanvas = () => {
    const { width, height } = getComputedStyle(this.container);
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width = parseFloat(width, 10);
    this.canvas.height = this.height = parseFloat(height, 10);
    this.container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    // 重新设置原点为画布中心
    this.ctx.translate(this.width / 2, this.height / 2);
  }

  // 循环
  loop = () => {
    !this.lines[0] && this.lines.push(new Line({
      ctx: this.ctx,
    }));
    this.lines[0].step();
    requestAnimationFrame(this.loop);
  }
}

