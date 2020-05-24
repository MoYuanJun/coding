export default () => {
  const canvas = document.getElementById('textparticle');
  const ctx = canvas.getContext('2d');
  const { width, height } = getComputedStyle(canvas.parentNode);
  canvas.width = Number.parseFloat(width);
  canvas.height = Number.parseFloat(height);

  const cw = canvas.width;
  const ch = canvas.height;

  const keyword = 'Would love to hear back !!';
  const radius = 6400;
  const drag = 0.92;
  const density = 1;
  const offset = 1;
  const timeout = 30;
  let pixels;
  const particles = [];

  let mx = 0;
  let my = 0;

  ctx.font = '90px \'Jockey One\'';

  ctx.fillText(
    keyword,
    (cw / 2) - (Math.round(ctx.measureText(keyword).width / 2)),
    ~~(ch / 2)
  );

  canvas.addEventListener('mousemove', e => {
    const { left, top } = canvas.getBoundingClientRect();
    mx = e.clientX - left;
    my = e.clientY - top;
  });

  // 粒子 x, y
  const Particle = function (x, y) {
    this.hx = ~~(x - (offset * Math.random()));   // 粒子最终位置 x: 根据初始化传入值随机偏移
    this.hy = ~~(y - (offset * Math.random()));   // 粒子最终位置 y: 根据初始化传入值随机偏移
    this.cx = ~~(cw * Math.random());            // 粒子当前位置 x: 初始化时粒子随机分布
    this.cy = ~~(ch * Math.random());            // 粒子当前位置 y: 初始化时粒子随机分布
    this.vx = (Math.random() * 10) - 5;          // 获取 -5 ~ 5 之间随机数
    this.vy = (Math.random() * 10) - 5;          // 获取 -5 ~ 5 之间随机数
  };

  Particle.prototype.update = function () {
    const dx = this.cx - mx;             // 粒子位置和鼠标位置 x 方向上的距离
    const dy = this.cy - my;             // 粒子位置和鼠标位置 x 方向上的距离
    const ds = (dx * dx) + (dy * dy);    // 粒子和鼠标之间的距离平方
    const aradius = Math.min(radius / ds, radius);
    const theta = Math.atan2(dy, dx);

    const hdx = this.hx - this.cx;
    const hdy = this.hy - this.cy;
    const hds = Math.sqrt((hdx * hdx) + (hdy * hdy));
    const hf = (hds * 0.01);
    const htheta = Math.atan2(hdy, hdx);

    this.vx += (aradius * Math.cos(theta)) + (hf * Math.cos(htheta));
    this.vy += (aradius * Math.sin(theta)) + (hf * Math.sin(htheta));

    this.vx *= drag;
    this.vy *= drag;

    this.cx += this.vx;
    this.cy += this.vy;
  };

  const draw = function () {
    const a = ctx.createImageData(cw, ch);

    // 更新每个粒子
    for (let i = 0; i < particles.length; i += 1) {
      particles[i].update();
    }

    // 将粒子绘制到图片信息上
    for (let j = 0; j < particles.length; j += 1) {
      const p = particles[j];
      const n = (~~p.cx + (~~p.cy * cw)) * 4;

      a.data[n] = 220;
      a.data[n + 1] = 220;
      a.data[n + 2] = 220;
      a.data[n + 3] = 255;
    }

    // 将图片绘制到画布上
    ctx.putImageData(a, 0, 0);

    setTimeout(() => {
      requestAnimationFrame(draw);
    }, timeout);
  };

  const init = function () {
    pixels = ctx.getImageData(0, 0, cw, ch).data;
    // 1. 获取画布上图片数据, 将像素转为粒子
    for (let i = 0; i < ch; i = i + density) {
      for (let j = 0; j < cw; j = j + density) {
        const index = (j + (i * cw)) * 4;
        if (pixels[index + 3] > 128) {
          if (index >= particles.length) {
            particles.push(new Particle(j, i));
          } else {
            particles[index].hx = j;
            particles[index].hy = i;
          }
        }
      }
    }
  };

  init();
  draw();
};
