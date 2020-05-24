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
  const offset = 5;
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
    this.hx = ~~(x - (offset * Math.random()));
    this.hy = ~~(y - (offset * Math.random()));
    this.cx = ~~(cw * Math.random());
    this.cy = ~~(ch * Math.random());
    this.vx = (Math.random() * 10) - 5;
    this.vy = (Math.random() * 10) - 5;
  };

  Particle.prototype.update = function () {
    const dx = this.cx - mx;
    const dy = this.cy - my;
    const ds = (dx * dx) + (dy * dy);
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
    const b = a.data;

    for (let i = 0; i < particles.length; i += 1) {
      particles[i].update();
    }

    for (let j = 0; j < particles.length; j += 1) {
      const p = particles[j];
      const n = (~~p.cx + (~~p.cy * cw)) * 4;

      b[n] = 220;
      b[n + 1] = 220;
      b[n + 2] = 220;
      b[n + 3] = 255;
    }

    ctx.putImageData(a, 0, 0);

    setTimeout(() => {
      requestAnimationFrame(draw);
    }, timeout);
  };

  const init = function () {
    pixels = ctx.getImageData(0, 0, cw, ch).data;

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
