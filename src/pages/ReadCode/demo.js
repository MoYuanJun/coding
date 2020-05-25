export default () => {
  const canvas = document.getElementById('textparticle');
  const ctx = canvas.getContext('2d');
  const text = canvas.getAttribute('text');
  const fontSize = canvas.getAttribute('size');
  canvas.width = canvas.getBoundingClientRect().width;
  canvas.height = canvas.getBoundingClientRect().height;

  let pixels = [];

  const animation = {
    radius: 3,
    move: 0.25,
    pull: 0.15,
    dampen: 0.95,
    density: 3,
  };

  /*
    * Distance function from mouse position
    */
  const distanceFromMouse = (x, y, mX, mY) => Math.sqrt(
    Math.pow(Math.pow(x - mX, 2) + y - mY, 2)
  );

  /*
  * Mouse position event
  * @Params: {canvas} -> html canvas element
  * result: mouse.x and mouse.y
  */
  class Mouse {
    constructor (canvas) {
      this.x = 0;
      this.y = 0;
      this.canvas = canvas;

      this.canvas.addEventListener('mousemove', e => {
        this.x = e.offsetX;
        this.y = e.offsetY;
      });

      this.canvas.addEventListener('mouseleave', () => {
        this.x = -100;
        this.y = -100;
      });
    }
  }

  /*
  * Canvas Draw Object
  *
  * @Params: {ctx} -> canvas context
  *
  * Prototypes:
  * - setText			-> setup text property
  * - fillText		-> drawing text on canvas with fill property
  * - strokeText	-> drawing text on canvas with stroke color property
  * - fillCircle	-> drawing circle on canvas with fill color property
  * - clear				-> to clean the canvas
  */
  class Draw {
    constructor (ctx) {
      this.ctx = ctx;
      this.canvas = canvas;
    }

    setText = proporty => {
      for (const option in proporty) {
        this.ctx[option] = proporty[option];
      }
    }

    fillText = (text, x, y) => {
      this.ctx.fillText(text, x, y);
    }

    strokeText = (text, x, y) => {
      this.ctx.strokeText(text, x, y);
    }

    fillCircle = (x, y, radius, color) => {
      this.ctx.beginPath();
      this.ctx.arc(x, y, radius, 0, Math.PI * 2);
      if (color) this.ctx.fillStyle = color;
      this.ctx.fill();
    }

    clear = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  const mouse = new Mouse(canvas);
  const draw = new Draw(ctx);

  const init = () => {
    draw.setText({
      font: `${fontSize}px monospace`,
      fillStyle: '#ff9840',
      textAlign: 'center',
      textBaseline: 'middle',
    });
    draw.fillText(text, (canvas.width - fontSize) / 2, canvas.height / 2);
    // 获取图片像素
    pixels = scene(ctx, animation.density);
    for (const particle of pixels) {
      particle.lx = particle.x;
      particle.ly = particle.y;
      particle.dx = (Math.random() * 25) - 10;
      particle.dy = (Math.random() * 25) - 10;
    }
  };

  /*
  * Get pixels positions
  * @Params: {ctx} 		 -> canvas context     canvas 上下文
  * @Params: {density} -> animation.density  动画密度
  */
  const scene = (ctx, density) => {
    const pixelData = [];
    const data = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    const rows = ctx.canvas.width / density;
    const cols = ctx.canvas.height / density;

    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        const pixelX = (col * density) + (density / 2);
        const pixelY = (row * density) + (density / 2);

        for (let rp = 0; rp < density; rp += 1) {
          for (let rc = 0; rc < density; rc += 1) {
            const pixel = (
              (((row * density) + rp) * canvas.width) + ((col * density) + rc)
            ) * 4;

            const colors = {
              r: data.data[pixel],
              g: data.data[pixel + 1],
              b: data.data[pixel + 2],
              a: data.data[pixel + 3],
            };

            if (colors.a) {
              pixelData.push({
                x: pixelX,
                y: pixelY,
                color: colors,
              });
              rp = density;
              rc = density;
            }
          }
        }
      }
    }
    return pixelData;
  };

  /*
  * Animation Frames
  */
  const frame = () => {
    draw.clear();
    requestAnimationFrame(frame);

    for (const particle of pixels) {
      const distance = distanceFromMouse(
        particle.x,
        particle.y,
        mouse.x,
        mouse.y
      );

      const shift = 1 / distance * 6;

      for (const ax of ['x', 'y']) {
        particle[ax] += particle[`d${ax}`];

        // particle[`d${ax}`] += (Math.random() - 0.5) * 0;
        particle[`d${ax}`] -=
          Math.sign(particle[ax] - particle[`l${ax}`]) * animation.pull;

        particle[`d${ax}`] *= animation.dampen;
        particle[`d${ax}`] -= Math.sign(mouse[ax] - particle[ax]) * shift;
      }

      const color = `rgba(${
        particle.color.r
      },${
        particle.color.g
      },${
        particle.color.b
      },${
        particle.color.a
      })`;

      draw.fillCircle(particle.x, particle.y, animation.radius, color);
    }
  };

  init();
  frame();
};
