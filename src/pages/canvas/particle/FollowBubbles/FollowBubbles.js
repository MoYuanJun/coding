class Point {
  constructor ({
    x = 0,               // 粒子初始位置 x
    y = 0,               // 粒子初始位置 y
    canvas,              // 画布
    size = 10,           // 粒子大小
    speed = .5,          // 粒子移动速度
    survival = Infinity, // 粒子存活时长
  } = {}) {
    this.canvas = canvas;                           // 画布

    this.x = x;                                     // 粒子位置 - x
    this.y = y;                                     // 粒子位置 - y
    this.age = survival;                            // 粒子寿命(每次执行动画 -1)
    this.survival = survival;                       // 粒子存活时长
    this.size = Math.random() * size;               // 粒子大小随机
    this.speed = (Math.random() * speed) + .2;      // 粒子运动速度(每次移动距离)
    this.direction = Math.random() * 2 * Math.PI;   // 粒子运动方向
    this.fillPoint = Math.random() < 0.5;           // 是否填充节点
    this.color = `hsl(${Math.floor(Math.random() * 360)}, 95%, 70%)`; // 粒子颜色
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
  };

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
  };

  // 修改运动方向
  changeDirection = () => {
    const conds = [
      [0, this.canvas.width].includes(this.x),
      [0, this.canvas.height].includes(this.y),
      Math.random() < 0.001,
    ];
    this.direction += conds.includes(true) ? Math.random() * Math.PI : 0;
  };

  // 修改粒子大小
  changeSize = () => {
    if (this.survival === Infinity) {
      return false;
    }

    this.size = this.size * (this.age / this.survival);
  };

  // 动画
  animate = () => {
    this.age -= 1;
    this.changeSize();
    this.changePosition();
    this.changeDirection();
    this.draw();
  };
}

// 粒子发射器
class Emitter {
  particles = [];

  /**
   * @param {number} num 粒子数(要发射粒子数)
   * @returns {object}
   * 其他参数和 Point 一致
   */
  emit = ({ x, y, num = 50, canvas, ...rest } = {}) => {
    for (let i = 0; i < num; i += 1) {
      this.particles.push(new Point({
        ...rest,
        canvas,
        x: x ?? Math.random() * canvas.width,
        y: y ?? Math.random() * canvas.height,
      }));
    }

    return this;
  };

  // 粒子动画
  animate = () => {
    this.particles.forEach((v) => v.animate());
    this.particles = this.particles.filter((v) => !v.die);
    return this;
  };
}

export default class {
  constructor ({
    container,
    fieldEmitterOption = { // 粒子场发射器参数, 同 Emitter.emit
      num: 50,
      size: 10,
    },
    mouseEmitterOption = { // 鼠标发射器参数, 同 Emitter.emit
      num: 10,
      size: 10,
      speed: 2,
      survival: 500,
    },
  }) {
    this.fieldEmitterOption = fieldEmitterOption; // 粒子场发射器参数
    this.mouseEmitterOption = mouseEmitterOption; // 鼠标发射器参数

    this.canvas = null;         // 画布
    this.fieldEmitter = null;   // 粒子场发射器(粒子场)
    this.mouseEmitter = null;   // 粒子发射器(永恒)
    this.container = container; // 画布容器

    this.createCanvas();
    this.renderFieldEmitter();
    this.animate();
  }

  // 创建画布
  createCanvas = () => {
    this.canvas = document.createElement('canvas');
    this.onResize();
    this.container.appendChild(this.canvas);
    this.bindEvent();
  };

  // 绑定事件
  bindEvent = () => {
    window.addEventListener('resize', this.onResize);
    this.canvas.addEventListener('mousemove', this.onMouseMove);
  };

  // 浏览器大小改变
  onResize = () => {
    const { width, height } = getComputedStyle(this.container);
    this.canvas.width = Number.parseFloat(width);
    this.canvas.height = Number.parseFloat(height);
  };

  // 鼠标移动
  onMouseMove = (event) => {
    const { top, left } = this.canvas.getBoundingClientRect();
    const emitOption = {
      ...this.mouseEmitterOption,
      canvas: this.canvas,
      x: event.clientX - left,
      y: event.clientY - top,
    };
    this.mouseEmitter
      ? this.mouseEmitter.emit(emitOption)
      : (this.mouseEmitter = new Emitter().emit(emitOption));
  };

  // 渲染粒子场发射器
  renderFieldEmitter = () => {
    this.fieldEmitter = new Emitter().emit({
      ...this.fieldEmitterOption,
      canvas: this.canvas,
    });
  };

  // 动画
  animate = () => {
    const ctx =  this.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.fieldEmitter.animate();
    this.mouseEmitter && this.mouseEmitter.animate();
    requestAnimationFrame(this.animate);
  };
}
