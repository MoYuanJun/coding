// 参考: https://codepen.io/towc/details/mJzOWJ

class Line {
  constructor({
    ctx = null,       // canvas 2d 上下文
    originX = 0,      // 源头坐标 x
    originY = 0,      // 源头坐标 y

    width = 0,   // 画布宽
    height = 0, // 画布高
    color = 'hsl(hue,100%,light%)',
    baseLightInputMultiplier = .01,
    addedLightInputMultiplier = .02,
    baseLight = 50,
    addedLight = 10, // [50-10,50+10]

    segmentLen = 20,  // 线段长度(粒子数)
    hueChange = .1,           // 颜色变化概率
    particleSize = 2, // 粒子大小
  } = {}){
    this.ctx = ctx;
    this.width = width;
    this.color = color;         
    this.height = height;
    this.originX = originX;
    this.originY = originY;
    this.segmentLen = segmentLen;
    this.particleSize = particleSize;
    this.baseLight = baseLight;
    this.addedLight = addedLight;
    this.hueChange = hueChange;

    this.baseLightInputMultiplier = baseLightInputMultiplier;
    this.addedLightInputMultiplier = addedLightInputMultiplier;

    this.lightInputMultiplier = 0;
    this.cumulativeTime = 0;                             // 存活时间
    this.currentSegmentLen = 0;                                // 当前线段长度(粒子数)
    this.turningX = 0;                              // 上一个转折点坐标 x
    this.turningY = 0;                              // 上一个转折点坐标 y
    this.angle = 0; // 当前线条行走方向(角度, 相对 x 轴, 逆时针为正)

    this.reset(this.originX, this.originY, true);
  }

  // 重置
  reset = (x, y, init) => {
    if (
      init ||
      Math.abs(x) > (this.width / 2 - this.particleSize * this.segmentLen) ||
      Math.abs(y) > (this.height / 2 - this.particleSize * this.segmentLen)
    ){
      this.turningX = 0;
      this.turningY = 0;
      this.currentSegmentLen = 0;
      this.angle = (Math.random() < 0.5 ? 1 : -1) * Math.PI / 3;
      this.lightInputMultiplier = this.baseLightInputMultiplier + this.addedLightInputMultiplier * Math.random();

      // 颜色
      this.color = this.color.replace('hue', this.cumulativeTime * this.hueChange);

    } else if (this.currentSegmentLen === this.segmentLen){
      this.turningX = x;
      this.turningY = y;
      this.angle += (Math.random() < 0.5 ? 1 : -1) * Math.PI / 3;
      this.currentSegmentLen = 0;
    } else {
      this.currentSegmentLen ++;
    }
    this.cumulativeTime ++;
  }

  // 移动
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
    // this.ctx.shadowBlur = 10;
    this.ctx.fillStyle = this.ctx.shadowColor = this.color.replace(
      'light', 
      this.baseLight + this.addedLight * Math.sin(this.cumulativeTime * this.lightInputMultiplier)
    );
    this.ctx.fillRect(x, y, this.particleSize, this.particleSize);
    this.ctx.beginPath();
    this.ctx.restore();
  }
};

export default class {
  constructor({
    container = null,
  } = {}){
    this.count = 50;
    this.lines = [];
    this.width = 0;
    this.ctx = null;
    this.height = 0;
    this.canvas = null;
    this.container = container;

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
    if (this.lines < this.count) {
      this.lines.push(new Line({
        ctx: this.ctx,
        width: this.width,
        height: this.height,
      }));
    }
    this.lines.forEach(v => {
      v.step();
    });
    requestAnimationFrame(this.loop);
  }
}

