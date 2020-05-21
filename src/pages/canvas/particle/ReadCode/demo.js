'use strict';

let mouse, originx, originy, cvs;

// Individual particle 单个粒子
class Point {
  constructor (x, y, canvas, dia) {
    this.canvas = canvas || cvs;
    this.x = x || 0;
    this.y = y || 0;
    this.vx = 0;
    this.vy = 0;
    this.speed = (Math.random() * .5) + .2;
    this.angle = Math.random() * 360;
    this.diaSet = dia || 2 + (Math.random() * 10);
    this.dia = this.diaSet;
    this.age = 0;
    this.fill =  `hsl(${Math.floor(Math.random() * 360)}, 95%, 70%)`;
    this.line = Math.random() > .5;
  }

  emit (life) {
    const s = this.speed * 2;
    this.angle += (Math.random() * 10) - 5;
    this.x += s * Math.cos(this.angle * Math.PI / 180);
    this.y += s * Math.sin(this.angle * Math.PI / 180);
    this.age += 1 / life;
    this.boundary();
  }

  boundary () {
    if (this.x < 0) {
      this.x = this.canvas.width;
    }
    if (this.x > this.canvas.width) {
      this.x = 0;
    }
    if (this.y < 0) {
      this.y = this.canvas.height;
    }
    if (this.y > this.canvas.height) {
      this.y = 0;
    }
  }

  field (life) {
    const s = this.speed;
    this.angle += (Math.random() * 10) - 5;
    this.x += s * Math.cos(this.angle * Math.PI / 180);
    this.y += s * Math.sin(this.angle * Math.PI / 180);
    this.age += 1 / life;
    this.boundary();
  }

  shrink () {
    this.dia = (1 - this.age) * this.diaSet;
  }

  draw () {
    const ctx = this.canvas.getContext('2d');

    ctx.beginPath();
    ctx.fillStyle = this.fill;
    ctx.strokeStyle = this.fill;
    ctx.lineWidth = 2;
    ctx.arc(this.x, this.y, this.dia, 0, 2 * Math.PI);
    ctx.closePath();

    this.line !== true ? ctx.fill() : ctx.stroke();
  }
}

// 粒子组
class ParticleGroup {
  setPosition (x, y) {
    this.x = x;
    this.y = y;
  }

  spawn (x, y, amount = 1, dia = false) {
    let arr = [];
    if (amount > 1) {
      for (let i = 0; i < amount; i += 1) {
        if (dia) {
          arr.push(new Point(x, y, cvs, dia));
        } else {
          arr.push(new Point(x, y, cvs));
        }
      }
    } else {
      arr = new Point(x, y, cvs, dia);
    }

    return arr;
  }
}

// Particle Emitter 粒子发射器
class Emitter extends ParticleGroup  {
  constructor (x, y, life, mouse, dia) {
    super();
    if (mouse === void 0) {
      this.mouse = true;
    } else {
      this.mouse = mouse;
    }

    this.particles = [];
    this.x = x || 0;
    this.y = y || 0;
    this.life = life || 20;
    this.canvas = cvs;
    this.dia = dia || false;
  }

  animate () {
    if (this.mouse) {
      this.setPosition(originx, originy);
    }

    for (let i = 0; i < 1; i += 2) {
      this.particles.push(this.spawn(this.x, this.y, 1));
    }

    if (this.particles.length > this.life * 1) {
      for (let i = 0; i < 1; i += 2) {
        this.particles.shift();
      }
    }

    this.render(this.canvas);
  }

  render () {
    for (let i = 0; i < this.particles.length; i += 1) {
      const p = this.particles[i];
      p.draw();
      p.emit(this.life);
      p.shrink();
    }
  }
}

// Particle Field 粒子场(画布上一直运动的粒子)
class Field {
  // 粒子场粒子数
  constructor (life) {
    this.particles = [];
    this.canvas = cvs;
    this.life = life;

    for (let i = 0; i < this.life; i += 1) {
      const x = Math.random() * cvs.width;
      const y = Math.random() * cvs.height;

      this.particles.push(new Point(x, y, this.canvas));
    }
  }

  animate () {
    this.render();
  }

  render () {
    for (let i = 0; i < this.particles.length; i += 1) {
      const p = this.particles[i];
      p.draw();
      p.field(this.life);
    }
  }
}

// get the mouse position relative to the canvas
// 获取鼠标相对画布的位置
const getMousePos = (canvas, event) => {
  const { left, top } = canvas.getBoundingClientRect();
  return {
    x: event.clientX - left,
    y: event.clientY - top,
  };
};

// animate the canvas
const animateCanvas = (canvas, callback) => {

  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  callback();

  requestAnimationFrame(animateCanvas.bind(null, canvas, callback));
};

// Update canvas size to fill window
const resizeCanvas = canvas => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  originx = canvas.width / 2;
  originy = canvas.height / 2;
};

export default () => {
  // 获取画布
  cvs = document.getElementById('canvas');

  // 重置画布大小
  resizeCanvas(cvs);

  // 监听 onResize 重置画布大小
  window.addEventListener('resize', resizeCanvas, false);

  // 监听鼠标移动: 鼠标移动则修改鼠标位置
  window.addEventListener('mousemove', e => {
    mouse = getMousePos(cvs, e);
    originx = mouse.x;
    originy = mouse.y;
  });

  // 初始化粒子场
  const network = new Field(50);

  // 初始化发射器
  const emit = new Emitter(0, 0, 50);

  // 执行动画
  animateCanvas(cvs, () => {
    network.animate();
    emit.animate();
  });
};
