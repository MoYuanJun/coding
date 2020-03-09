// 参考: https://codepen.io/JulianLaval/pen/KpLXOO
class Spots {
  constructor({
    ctx = null,
    width = 0,
    height = 0,
    density = 5e3,
    globalAlpha = 0.7,
    velocity = 1,            // 速度
    particleColor = '#888',
  } = {}){
    this.i = 0;
    this.ctx = ctx;
    this.spots = [];
    this.tmp = null;
    this.width = width;
    this.height = height;
    this.density = density;
    this.velocity = velocity;
    this.globalAlpha = globalAlpha;
    this.particleColor = particleColor;

    this.draw();
  }

  // 创建 spots
  createSpots = () => {
    let spots = [];
    for (let i = 0; i < this.width * this.height / this.density; i ++){
      spots.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        velocity: {
          x: (Math.random() - .5) * this.velocity,
          y: (Math.random() - .5) * this.velocity,
        },
      });
    }
    this.spots = spots;
  }

  // 绘制圆点
  drawSpots = () => {
    this.spots.length === 0 && this.createSpots();

    this.ctx.save();
    this.ctx.fillStyle = this.particleColor;
    this.ctx.globalAlpha = this.globalAlpha;
    this.spots.forEach(v => {
      this.ctx.beginPath();
      this.ctx.arc(v.x, v.y, 1.5, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.closePath();
    });
    this.ctx.restore();
  }

  // 绘制线线条
  drawLines = () => {
    this.ctx.save();
    this.ctx.strokeStyle = this.particleColor;
    this.ctx.lineWidth = .7;
    for (let i = 0; i < this.spots.length; i ++){
      for (let j = i + 1; j < this.spots.length; j ++){
        const lineLength = Math.sqrt(
          Math.pow(this.spots[i].x - this.spots[j].x, 2) + 
          Math.pow(this.spots[i].y - this.spots[j].y, 2)
        );
        lineLength < 120 && (
          this.ctx.beginPath(),
          this.ctx.moveTo(this.spots[i].x, this.spots[i].y),
          this.ctx.lineTo(this.spots[j].x, this.spots[j].y),
          this.ctx.globalAlpha = (120 - lineLength) / 120,
          this.ctx.stroke()
        );
      }
    }
    this.ctx.restore();
  }

  // 绘制
  draw = () => {
    // 更新 spots 值
    this.spots.forEach(v => {
      v.velocity.x = ((v.x > this.width + 20 || v.x < -20) ? -1 : 1) * v.velocity.x;
      v.velocity.y = ((v.y > this.height + 20 || v.y < -20) ? -1 : 1) * v.velocity.y;
      v.x += v.velocity.x;
      v.y += v.velocity.y;
    });
    
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawSpots();
    this.drawLines();
    requestAnimationFrame(this.draw);
  }
}

// 1. 绘制原点
// 2. 两原点之间距离小于给定值时使用直线连接两点
export default class {
  constructor({
    container = null,   // 容器
    density = 5e3,      // 密度, 圆点个数 = 画布宽 * 高 / 密度
  } = {}){
    this.container = container;
    this.density = density;
    this.spots = null

    this.init();
  }

  // 初始化
  init = () => {
    // 1. 获取父级容器的宽高
    const { width, height } = getComputedStyle(this.container);
    this.width = parseFloat(width, 10)
    this.height = parseFloat(height, 10);

    // 2. 创建 canvas 元素并插入到页面中
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    // 3. 初始化原点
    this.spots = new Spots({
      ctx: this.ctx,
      width: this.width,
      height: this.height,
      density: this.density,
    });
  }
};
