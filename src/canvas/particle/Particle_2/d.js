var w = c.width = window.innerWidth,   // 设置并获取 canvas 宽度
  h = c.height = window.innerHeight,   // 设置并获取 canvas 高度
  ctx = c.getContext('2d'),            // 获取 canvas 2d 环境

  opts = {
    len: 20,
    count: 50,           // 总数限制
    baseTime: 10,
    addedTime: 10,
    dieChance: .05,
    spawnChance: 1,
    sparkChance: .1,
    sparkDist: 10,
    sparkSize: 2,

    color: 'hsl(hue,100%,light%)',
    baseLight: 50,
    addedLight: 10, // [50-10,50+10]
    shadowToTimePropMult: 6,
    baseLightInputMultiplier: .01,
    addedLightInputMultiplier: .02,

    cx: w / 2,
    cy: h / 2,
    repaintAlpha: .04,
    hueChange: .1
  },

  tick = 0,                 // 标记
  lines = [],
  dieX = w / 2 / opts.len,
  dieY = h / 2 / opts.len,

  baseRad = Math.PI * 2 / 6;

ctx.fillStyle = 'black';
ctx.fillRect(0, 0, w, h);

// 上面都只是参数

class Line {
  constructor(){
    this.reset();
  }

  // 重置
  reset = () => {

    this.x = 0;
    this.y = 0;
    this.addedX = 0;
    this.addedY = 0;
  
    this.rad = 0;
  
    this.lightInputMultiplier = opts.baseLightInputMultiplier + opts.addedLightInputMultiplier * Math.random();
  
    this.color = opts.color.replace('hue', tick * opts.hueChange);
    this.cumulativeTime = 0;
  
    this.beginPhase();
  }

  // 开始绘制图案
  beginPhase = () => {
    this.x += this.addedX;
    this.y += this.addedY;
  
    this.time = 0;
    this.targetTime = (opts.baseTime + opts.addedTime * Math.random()) | 0;
  
    this.rad += baseRad * (Math.random() < .5 ? 1 : -1);
    this.addedX = Math.cos(this.rad);
    this.addedY = Math.sin(this.rad);
    
    // dieChance 死亡概率, dieX 死亡坐标 x
    if (Math.random() < opts.dieChance || this.x > dieX || this.x < -dieX || this.y > dieY || this.y < -dieY) {
      this.reset();
    }
  }

  step = () => {

    ++ this.time;
    ++ this.cumulativeTime;
  
    if (this.time >= this.targetTime) {
      this.beginPhase();
    }
  
    var prop = this.time / this.targetTime,
      wave = Math.sin(prop * Math.PI / 2),
      x = this.addedX * wave,
      y = this.addedY * wave;
  
    // 设置阴影颜色: 
    ctx.shadowBlur = prop * opts.shadowToTimePropMult;

    // 设置填充颜色和阴影颜色
    ctx.fillStyle = ctx.shadowColor = this.color.replace(
      'light', 
      opts.baseLight + opts.addedLight * Math.sin(this.cumulativeTime * this.lightInputMultiplier)
    );
    
    // 绘制填充矩形
    ctx.fillRect(
      opts.cx + (this.x + x) * opts.len, 
      opts.cy + (this.y + y) * opts.len, 
      2, 
      2
    );
  
    // 绘制火花: sparkChance = 火花出现概率
    if (Math.random() < opts.sparkChance) {
      ctx.fillRect(
        opts.cx + (this.x + x) * opts.len + Math.random() * opts.sparkDist * (Math.random() < .5 ? 1 : -1) - opts.sparkSize / 2, 
        opts.cy + (this.y + y) * opts.len + Math.random() * opts.sparkDist * (Math.random() < .5 ? 1 : -1) - opts.sparkSize / 2, 
        opts.sparkSize, 
        opts.sparkSize
      )
    }
  }
}

function loop() {

  // 动画
  if (tick < 100){
    window.requestAnimationFrame(loop);
  }

  // 标记
  ++ tick;

  // 
  ctx.globalCompositeOperation = 'source-over';
  ctx.shadowBlur = 0;
  ctx.fillStyle = 'rgba(0,0,0,alp)'.replace('alp', opts.repaintAlpha);
  ctx.fillRect(0, 0, w, h);
  ctx.globalCompositeOperation = 'lighter';

  // 线条的长度小于指定总数
  if (lines.length < opts.count && Math.random() < opts.spawnChance) {
    lines.push(new Line);
  }

  // 遍历每个线条, 执行 step
  lines.map(function (line) { line.step(); });
}

loop();

// window.addEventListener('resize', function () {

//   w = c.width = window.innerWidth;
//   h = c.height = window.innerHeight;
//   ctx.fillStyle = 'black';
//   ctx.fillRect(0, 0, w, h);

//   opts.cx = w / 2;
//   opts.cy = h / 2;

//   dieX = w / 2 / opts.len;
//   dieY = h / 2 / opts.len;
// });
