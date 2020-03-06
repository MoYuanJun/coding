// 参考: https://codepen.io/exd/pen/dwreEa
export default class {
  constructor({
    width = 400,
    height = 400,
    radius = 190,
    container = null,
    tickWidth = 3,    // 刻度线宽度
    tickHeight = 10,   // 刻度线高度(长)
    tickFontSize = 14, // 刻度线文字大小
    borderWidth = 3,  // 边框宽度
    uedFontSize = 18,
  }){
    this.width = width;
    this.height = height;
    this.radius = radius;
    this.container = container;
    this.tickWidth = tickWidth;
    this.tickHeight = tickHeight;
    this.borderWidth = borderWidth;
    this.tickFontSize = tickFontSize;
    this.uedFontSize = uedFontSize;

    // 绘制底盘背景
    this.clockDial = this.drawClockDial();
  }

  // // 初始化画布
  // init = ({ container }) => {
  //   this.canvas = document.createElement('canvas');
  //   this.width = parseFloat(width, 10);   // 宽
  //   this.height = parseFloat(height, 10);  // 高
  //   this.radius = this.height / 2 - 10;   // 半径
  //   this.canvas.width = this.width;
  //   this.canvas.height = this.height;

  //   // 获取 2d 上下文环境
  //   this.ctx = this.canvas.getContext('2d');
  //   container.appendChild(this.canvas);
  // }

  // 渲染
  render = () => {
    const canvas = document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(this.clockDial, 0, 0);

    this.container.appendChild(canvas);
  }

  // // 绘制
  // draw = () => {
  //   // 1. 清除画布
  //   this.ctx.clearRect(0, 0, this.width, this.height);

  //   // 2. 绘制表盘
  //   this.drawClockDial();

  //   // 3. 绘制时钟
  //   this.drawPointer();

  //   // 4. 绘制分针

  //   // 5. 绘制秒针
  // }

  // 绘制表盘
  drawClockDial = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = this.width;
    canvas.height = this.height;

    ctx.save();   // 保存当前状态

    // 1. 绘制背景
    ctx.beginPath(); // 开始一个路径
    ctx.arc(         // 绘制圆弧曲线
      this.width / 2,     // 原点坐标 x
      this.height / 2,    // 原点左边 y
      this.radius,        // 半径
      0,                  // 开始角, 单位 弧度
      2 * Math.PI,        // 结束角, 单位 弧度
    );
    ctx.closePath(); // 结束路径的绘制

    const color = ctx.createRadialGradient( // 创建渐变颜色
      this.width / 2,   // 开始圆点 x
      this.height / 2,  // 开始圆点 y
      this.radius / 3,  // 开始圆半径
      this.width / 2,   // 结束圆点 x
      this.height / 2,  // 结束圆点 y
      this.radius,      // 结束圆半径
    );
    color.addColorStop(0, 'rgb(253,189,125)'); // 为渐变对象中添加第一个渐变颜色
    color.addColorStop(1, 'rgb(255,127,0)');   // 为渐变对象中添加第二个渐变颜色

    ctx.fillStyle = color; // 设置填充颜色
    ctx.fill();            // 填充

    // 2. 绘制边框
    ctx.lineWidth = this.borderWidth;  // 设置线宽
    ctx.strokeStyle = '#bb5e00';       // 设置描边颜色
    ctx.stroke();                      // 描边

    // 3. 绘制刻度和数值: 绘制 60 个刻度, 每 5 个绘制一个大刻度
    ctx.translate(this.width / 2, this.height / 2);    // 设置原点的位置 
    for (let i = 0; i < 60; i++){
      ctx.beginPath();                      // 开始绘制路径

      // 绘制刻度
      ctx.moveTo(0, this.radius);           // 移动到指定位置
      ctx.lineTo(0, this.radius - this.tickHeight);      // 从当前位置绘制直线(路径)到指定位置
      ctx.strokeStyle = '#000';             // 设置描边样式
      ctx.lineWidth = i % 5 === 0 ? this.tickWidth : this.tickWidth / 3;  // 设置线宽
      ctx.stroke();                         // 描边

      // 绘制数字
      if (i % 5 === 0) {
        ctx.font=`${this.tickFontSize}px arial`;     // 字体设置: font 属性使用的语法与 CSS font 属性
        ctx.fillStyle = '#000';    // 设置填充样式                    
        ctx.textAlign = 'center';  // 设置文字对齐方式, 定义文字坐标点在文字的位置
        ctx.fillText(
          i / 5, 
          0, 
          - (this.radius - 1.5 * this.tickHeight - this.tickFontSize)
        ); // 绘制填充文字: (文字, 位置 x, 位置 y) 
      }

      ctx.rotate((2 * Math.PI) / 60); // 顺时针旋转整个画布, 包括坐标系
      ctx.closePath();                // 结束路径的绘制
    }

    // 4. 绘制文字: UED
    ctx.fond = `${this.uedFontSize}px arial`;    // 字体设置, 同 css font 属性
    ctx.fillStyle = '#fff';     // 设置填充颜色
    ctx.textAlign = 'center';   // 设置文字对齐方式 => 定义文字绘制点在文本中的位置
    ctx.fillText(
      'UED', 0, 
      - (this.radius - 1.5 * this.tickHeight - this.tickFontSize - 20 - this.uedFontSize)
    ); // 绘制填充文字: (文字, 位置 x, 位置 y)

    // 5. 恢复上一次保存的状态
    ctx.restore();

    return canvas;
  }

  // 绘制指针
  drawPointer = () => {
    this.ctx.save(); //保存当前状态
    this.ctx.translate(this.width / 2, this.height / 2);  // 设置原点位置
    this.ctx.rotate(- Math.PI / 2); // 先将画布逆时针旋转 Math.PI / 2 (90度)

    // 根据时间换算角度：一圈 = 2 * Math.PI = 60 秒 = 60 分 = 12 小时
    const time = new Date();
    const secAngle = (Math.PI / 30) * time.getSeconds();
    const minAngle = (Math.PI / 30) * time.getMinutes();
    const hourAngle = (Math.PI / 6) * (time.getHours() % 12);

    // 绘制时针
    this.ctx.save();
    this.ctx.rotate(hourAngle);
    this.ctx.beginPath()
    this.ctx.moveTo(-10, -3);
    this.ctx.lineTo(this.radius - 30, 0);
    this.ctx.lineTo(-10, 3);
    this.ctx.arcTo(0, 0, -10, -3, 3);
    this.ctx.strokeStyle = '#000';
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.restore();

    // 绘制分针
    this.ctx.save();
    this.ctx.rotate(minAngle);
    this.ctx.beginPath()
    this.ctx.moveTo(-10, -3);
    this.ctx.lineTo(this.radius - 50, 0);
    this.ctx.lineTo(-10, 3);
    this.ctx.arcTo(0, 0, -10, -3, 3);
    this.ctx.strokeStyle = '#000';
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.restore();

    // 1. 绘制秒钟
    this.ctx.save();  // 存储当前状态
    this.ctx.rotate(secAngle);
    this.ctx.beginPath();
    this.ctx.moveTo(-20, 0);
    this.ctx.lineTo(this.radius - 2, 0);
    this.ctx.strokeStyle = 'red';
    this.ctx.stroke();
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.arc(this.radius - 30, 0, 3, 0, 2 * Math.PI);
    this.ctx.fillStyle = '#ffff00';
    this.ctx.strokeStyle = 'red';
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();

    // 2. 绘制原点
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(0, 0, 3, 0, 2 * Math.PI);
    this.ctx.fillStyle = '#000';
    this.ctx.strokeStyle = 'red';
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();
  }
}