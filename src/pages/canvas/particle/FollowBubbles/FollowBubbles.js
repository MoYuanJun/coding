class Point {
  constructor ({
    x = 0,
    y = 0,
    canvas,
    size = 10,
    survival = Infinity,
  } = {}) {
    this.x = x;
    this.y = y;

    this.age = survival;                            // 粒子寿命(每次执行动画 -1)
    this.survival = survival;                       // 粒子存活时长

    this.canvas = canvas;
    this.size = Math.random() * size;               // 粒子大小随机
    this.speed = (Math.random() * .5) + .2;         // 粒子运动速度(每次移动距离)
    this.direction = Math.random() * 2 * Math.PI;   // 粒子运动方向
    this.fillPoint = Math.random() < 0.5;           // 是否填充节点
    this.color = `hsl(${Math.floor(Math.random() * 360)}, 95%, 70%)`;
    this.draw();
  }

  // 是否死亡
  get die () {
    return this.survival !== Infinity && this.age <= 0;
  }

  // 绘制节点
  draw = () => {
    const ctx = this.canvas.getContext('2d');
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    this.fillPoint ? ctx.fill() : ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }

  // 修改位置
  changePosition = () => {
    const [, x] = [
      0,
      this.canvas.width,
      this.x + (this.speed * Math.cos(this.direction)),
    ].sort((a, b) => (a - b));
    const [, y] = [
      0,
      this.canvas.height,
      this.y + (this.speed * Math.sin(this.direction)),
    ].sort((a, b) => (a - b));
    this.x = x;
    this.y = y;
  }

  // 修改运动方向
  changeDirection = () => {
    const conds = [
      [0, this.canvas.width].includes(this.x),
      [0, this.canvas.height].includes(this.y),
      Math.random() < 0.001,
    ];
    this.direction += conds.includes(true) ? Math.random() * Math.PI : 0;
  }

  // 修改粒子大小
  changeSize = () => {
    if (this.survival === Infinity) {
      return false;
    }
    this.size = this.size * (this.age / this.survival);
  }

  // 动画
  animate = () => {
    this.age -= 1;
    this.changeSize();
    this.changePosition();
    this.changeDirection();
    this.draw();
  }
}

// 粒子发射器
class Emitter {
  particles = [];

  // 发射
  emit = ({ originX, originY, num = 50, size = 20, canvas, survival } = {}) => {
    for (let i = 0; i < num; i += 1) {
      this.particles.push(new Point({
        size,
        canvas,
        survival,
        x: originX ?? Math.random() * canvas.width,
        y: originY ?? Math.random() * canvas.height,
      }));
    }
  }

  // 粒子动画
  animate = () => {
    this.particles.forEach(v => v.animate());
    this.particles = this.particles.filter(v => !v.die);
  }
}

export default class {
  constructor ({ container }) {
    this.container = container;
    this.canvas = null;
    this.emitNum = 50;    // 粒子场粒子数量
    this.size = 10;         // 粒子大小(最大半径)
    this.field = null;      // 粒子场

    this.createCanvas();
    this.render();
    this.animate();
  }

  // 创建画布
  createCanvas = () => {
    const { width, height } = getComputedStyle(this.container);
    this.canvas = document.createElement('canvas');
    this.canvas.width = Number.parseFloat(width);
    this.canvas.height = Number.parseFloat(height);
    this.container.appendChild(this.canvas);
  }

  // 渲染
  render = () => {
    this.field = new Emitter();
    this.field.emit({
      size: this.size,
      num: this.emitNum,
      canvas: this.canvas,
    });
  }

  // 动画
  animate = () => {
    const ctx =  this.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.field.animate();
    requestAnimationFrame(this.animate);
  }
}
