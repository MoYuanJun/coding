// 参考: https://codepen.io/towc/details/mJzOWJ
class Line {
  constructor({
    ctx = null,         // canvas 2d 上下文
    width = 0,          // 画布宽
    height = 0,         // 画布高
  
    originX = 0,        // 源头坐标 x
    originY = 0,        // 源头坐标 y

    sparkChance = 0.2,  // 火花出现概率
    sparkDist = 10,     // 火花距离
    sparkSize = 2,      // 火花大小 
  
    segmentLen = 20,    // 线段长度(粒子数)
    particleSize = 2,   // 粒子大小
  } = {}){
    this.ctx = ctx;
    this.width = width;     
    this.height = height;
    this.originX = originX;
    this.originY = originY;
    this.sparkDist = sparkDist;
    this.sparkSize = sparkSize;
    this.segmentLen = segmentLen;
    this.sparkChance = sparkChance;
    this.particleSize = particleSize;

    this.color = '';                           // 线条颜色
    this.angle = 0;                            // 当前线条行走方向(角度, 相对 x 轴, 逆时针为正)
    this.turningX = 0;                         // 上一个转折点坐标 x
    this.turningY = 0;                         // 上一个转折点坐标 y
    this.currentSegmentLen = 0;                // 当前线段长度(粒子数)

    this.reset(this.originX, this.originY, true);
  }

  // 随机颜色获取
  getColor = () => {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }

  // 重置: 当前 x, y, 是否初始化
  reset = (x, y, init) => {
    if (
      init ||
      Math.abs(x) > (this.width / 2 - this.particleSize * this.segmentLen) ||
      Math.abs(y) > (this.height / 2 - this.particleSize * this.segmentLen)
    ){
      this.turningX = 0;
      this.turningY = 0;
      this.currentSegmentLen = 0;
      this.color = this.getColor();
      this.angle = (Math.random() < 0.5 ? 1 : -1) * Math.PI / 3;
    } else if (this.currentSegmentLen === this.segmentLen) {
      this.turningX = x;
      this.turningY = y;
      this.currentSegmentLen = 0;
      this.angle += (Math.random() < 0.5 ? 1 : -1) * Math.PI / 3;
    } else {
      this.currentSegmentLen ++;
    }
  }

  // 移动: 绘制线条
  step = () => {
    const x = this.turningX + Math.cos(this.angle) * this.currentSegmentLen * this.particleSize;
    const y = this.turningY + Math.sin(this.angle) * this.currentSegmentLen * this.particleSize;
    this.drawParticle(x, y);
    this.reset(x, y);
  }

  // 绘制粒子
  drawParticle = (x, y) => {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.shadowBlur = 10;
    this.ctx.fillStyle = this.ctx.shadowColor = this.color;
    this.ctx.fillRect(x, y, this.particleSize, this.particleSize);
    this.drawSpark(x, y);
    this.ctx.beginPath();
    this.ctx.restore();
  }

  // 绘制火花
  drawSpark = (x, y) => {
    if (Math.random() < this.sparkChance) {
      const rectX = x + (Math.random() < 0.5 ? 1 : -1) * Math.random() * this.sparkDist;
      const rectY = y + (Math.random() < 0.5 ? 1 : -1) * Math.random() * this.sparkDist;
      this.ctx.fillRect(rectX, rectY,this.sparkSize, this.sparkSize);
    }
  }
};

export default class {
  constructor({
    container = null,
    ... lineOption
  } = {}){
    this.lines = [];              // 线条实例列表
    this.count = 50;              // 总数
    this.ctx = null;              // canvas 上下文
    this.width = 0;               // 画布宽
    this.height = 0;              // 画布高
    this.canvas = null;           // canvas dom
    this.container = container;   // 父级容器
    this.lineOption = lineOption; // 线条参数

    this.createCanvas();          // 绘制画布 
    this.loop();                  // 循环: 动画
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
    // 绘制黑色背景
    this.ctx.fillStyle = 'rgba(0,0,0,1)';
    this.ctx.fillRect(
      -this.width / 2, 
      -this.height / 2, 
      this.width, 
      this.height
    );
  }

  // 循环
  loop = () => {
    // 绘制半透明遮盖层: 实现粒子拖拽的效果
    this.ctx.globalCompositeOperation = 'source-over';
    this.ctx.shadowBlur = 0;
    this.ctx.fillStyle = 'rgba(0,0,0,0.04)';
    this.ctx.fillRect(
      -this.width / 2, 
      -this.height / 2, 
      this.width, 
      this.height
    );
    
    // 重置图形混合模式
    this.ctx.globalCompositeOperation = 'lighter';

    // 创建线条并绘制线条
    if (this.lines.length < this.count) {
      this.lines.push(new Line({
        ctx: this.ctx,
        width: this.width,
        height: this.height,
        ... this.lineOption,
      }));
    }
    this.lines.forEach(v => v.step());

    // 设置动画
    requestAnimationFrame(this.loop);
  }
}

