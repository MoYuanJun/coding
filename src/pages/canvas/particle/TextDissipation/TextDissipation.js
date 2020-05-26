const TEXT = '🤪';

// 粒子
class Particle {
  constructor ({
    canvas,              // canvas 对象
    radius,              // 粒子半径
    destX = 0,           // 粒子目的地 x
    destY = 0,           // 粒子目的地 y
    rgba = [0, 0, 0, 0], // 粒子颜色 rgba 值
  }) {
    this.rgba = rgba;                         // 粒子颜色 rgba 值
    this.destY = destY;                       // 粒子目的地 y
    this.destX = destX;                       // 粒子目的地 x
    this.radius = radius;                     // 粒子半径
    this.canvas = canvas;                     // canvas 对象
    this.ctx = canvas.getContext('2d');       // canvas 上下文
    this.x = canvas.width * Math.random();    // 当前粒子位置 x
    this.y = canvas.height * Math.random();   // 当前粒子位置 y

    this.speed = 0.1;       // 速度

    this.draw();
  }

  // 绘制粒子
  draw = () => {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.fillStyle = `rgba(${this.rgba.join(',')})`;
    this.ctx.arc(
      this.x,
      this.y,
      this.radius,
      0,
      2 * Math.PI
    );
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();
  }

  // 动画
  animation = () => {
    const dx = this.destX - this.x;
    const dy = this.destY - this.y;
    this.x += dx * this.speed * Math.random();
    this.y += dy * this.speed * Math.random();
    this.draw();
  }
}

export default class {
  constructor ({
    container,    // 外层容器
    density = 3,  // 密度
  }) {
    this.container = container;
    this.particles = [];
    this.density = density;

    this.createCanvas();
    this.drawText();
    this.createParticles();
    this.animation();
  }

  // 创建画布
  createCanvas = () => {
    const { width, height } = getComputedStyle(this.container);
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.container.appendChild(this.canvas);
    this.canvas.width = Number.parseFloat(width);
    this.canvas.height = Number.parseFloat(height);
  }

  // 绘制文本内容
  drawText = () => {
    this.ctx.textAlign = 'center';
    this.ctx.font = '200px monospace';
    this.ctx.fillText(TEXT, this.canvas.width / 2, this.canvas.height / 2);
  }

  // 创建粒子
  createParticles = () => {
    const { data } = this.ctx.getImageData(
      0, 0,
      this.canvas.width,
      this.canvas.height,
    );
    // 像素透明度不为 0 的创建对应的粒子
    for (let y = 0; y < this.canvas.height; y += this.density) {
      for (let x = 0; x < this.canvas.width; x += this.density) {
        // 当前像素点参数开始位置索引
        const index = ((y * this.canvas.width) + x) * 4;
        const [red, green, blue, alpha] = data.slice(index, index + 4);
        if (alpha > 0) {
          this.particles.push(new Particle({
            destX: x,
            destY: y,
            canvas: this.canvas,
            radius: this.density,
            rgba: [red, green, blue, alpha],
          }));
        }
      }
    }
  }

  // 动画
  animation = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.particles.forEach(v => v.animation());
    window.requestAnimationFrame(this.animation);
  }
}
