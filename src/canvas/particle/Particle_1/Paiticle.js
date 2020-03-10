// 参考: https://codepen.io/JulianLaval/pen/KpLXOO
export default class Paiticle {
  constructor({
    container,              // 父级容器
    density = 5e3,          // 粒子密度: width * height / density = 粒子初始个数
    velocity = 0.66,        // 粒子速度
    globalAlpha = 0.8,      // 全局透明度
    maxLineLength = 120,    // 粒子间最长连线
    particleColor = '#888', // 粒子颜色
  } = {}){
    this.ctx = null;                       // canvas 2d 上下文
    this.width = 0;                        // 画布宽
    this.height = 0;                       // 画布高
    this.spots = [];                       // 所有点
    this.canvas = null,                    // canvas dom
    this.density = density;                // 粒子密度
    this.tmpSpotSpot = null;               // 临时点
    this.velocity = velocity;              // 粒子速度
    this.container = container;            // 父级容器
    this.globalAlpha = globalAlpha;        // 全局透明度
    this.particleColor = particleColor;    // 粒子颜色
    this.maxLineLength = maxLineLength;    // 粒子间最长连线

    this.createCanvas();
    this.render();
    this.bindEvent();
  }

  // 创建画布
  createCanvas = () => {
    this.canvas = document.createElement('canvas');
    this.container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
  }

  // 渲染: canvas
  render = () => {
    const { width, height } = getComputedStyle(this.container);
    this.width = parseFloat(width, 10)
    this.height = parseFloat(height, 10);
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.draw();
  }

  // 绘制
  draw = () => {
    // 1. 更新 spots 速度
    this.spots.forEach(v => {
      v.velocity.x = ((v.x > this.width + 20 || v.x < -20) ? -1 : 1) * v.velocity.x;
      v.velocity.y = ((v.y > this.height + 20 || v.y < -20) ? -1 : 1) * v.velocity.y;
      v.x += v.velocity.x;
      v.y += v.velocity.y;
    });
    
    // 2. 清除画布
    this.ctx.clearRect(0, 0, this.width, this.height);

    // 3. 绘制点、直线
    this.drawSpots();
    this.drawLines();

    // 4. 添加动画
    requestAnimationFrame(this.draw);
  }

  // 绑定事件
  bindEvent = () => {
    window.addEventListener('resize', this.onResize);
    this.canvas.addEventListener('click', this.onClick);
    this.canvas.addEventListener('mousemove', this.onMouseMove);
    this.canvas.addEventListener('mouseleave', this.onMouseLeave);
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
    const spots = this.tmpSpot ? [this.tmpSpot, ... this.spots] : this.spots;

    // 绘制点
    this.ctx.save();
    this.ctx.fillStyle = this.particleColor;
    this.ctx.globalAlpha = this.globalAlpha;
    spots.forEach(v => {
      this.ctx.beginPath();
      this.ctx.arc(v.x, v.y, 1.5, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.closePath();
    });
    this.ctx.restore();
  }

  // 绘制线线条
  drawLines = () => {
    const spots = this.tmpSpot ? [this.tmpSpot, ... this.spots] : this.spots;

    // 循环绘制直线: 只有相邻的点之间才绘制连线
    this.ctx.save();
    this.ctx.strokeStyle = this.particleColor;
    this.ctx.lineWidth = .7;
    for (let i = 0; i < spots.length; i ++){
      for (let j = i + 1; j < spots.length; j ++){
        // 根据直角三角形定理计算两个点之间的距离
        const lineLength = Math.sqrt(
          Math.pow(spots[i].x - spots[j].x, 2) + 
          Math.pow(spots[i].y - spots[j].y, 2)
        );
        lineLength < this.maxLineLength && (
          this.ctx.beginPath(),
          this.ctx.moveTo(spots[i].x, spots[i].y),
          this.ctx.lineTo(spots[j].x, spots[j].y),
          this.ctx.globalAlpha = this.globalAlpha * (120 - lineLength) / 120,
          this.ctx.stroke()
        );
      }
    }
    this.ctx.restore();
  }

  // 容器大小改变
  onResize = () => {
    this.render();
  }

  // 画布上点击鼠标: 以当前位置为左边插入点
  onClick = event => {
    this.spots.push({
      x: event.offsetX,
      y: event.offsetY,
      velocity: {
        x: (Math.random() - .5) * this.velocity,
        y: (Math.random() - .5) * this.velocity,
      },
    });
  }

  // 画布上鼠标移动: 设置临时点
  onMouseMove = event => {
    this.tmpSpot = {
      x: event.offsetX,
      y: event.offsetY,
      velocity: {
        x: 0,
        y: 0,
      },
    };
  }

  // 鼠标移出画布: 清除临时点
  onMouseLeave = () => {
    this.tmpSpot = null;
  }
}
