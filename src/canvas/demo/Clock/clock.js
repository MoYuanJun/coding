// 参考: https://codepen.io/exd/pen/dwreEa
export default class {
  constructor({
    width = 400,         // 画布宽度
    height = 400,        // 画布高度
    radius = 190,        // 半径
    container = null,    // 容器
    tickWidth = 6,       // 刻度线宽度(粗的), 粗 /3 = 细
    tickHeight = 10,     // 刻度线高度(长)
    tickFontHeight = 35, // 刻度线文字高度(距离边框的距离)
    tickFontSize = 18,   // 刻度线文字大小
    borderWidth = 3,     // 边框宽度
    uedFontSize = 30,    // ued 字体大小
    originRadius = 5,    // 原点半径
  }){
    this.ctx = null;
    this.width = width;
    this.height = height;
    this.radius = radius;
    this.container = container;
    this.tickWidth = tickWidth;
    this.tickHeight = tickHeight;
    this.borderWidth = borderWidth;
    this.tickFontSize = tickFontSize;
    this.uedFontSize = uedFontSize;
    this.originRadius = originRadius;
    this.tickFontHeight = tickFontHeight;

    // 绘制底盘背景
    this.clockDial = this.drawClockDial();
    this.render();
  }

  // 渲染
  render = () => {
    const canvas = document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height;
    this.ctx = canvas.getContext('2d');
    this.container.appendChild(canvas);
    this.draw();
  }

  // 绘制
  draw = () => {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.drawImage(this.clockDial, 0, 0);
    this.ctx.drawImage(this.drawPointer(), 0, 0);
    requestAnimationFrame(this.draw);
  }

  // 绘制表盘: 返回 canvas
  drawClockDial = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.height = this.height;
    canvas.width = this.width;

    // 1. 绘制背景
    ctx.beginPath();   // 开始一个路径
    ctx.arc(           // 绘制圆弧曲线
      this.width / 2,  // 原点坐标 x
      this.height / 2, // 原点左边 y
      this.radius,     // 半径
      0,               // 开始角, 单位 弧度
      2 * Math.PI,     // 结束角, 单位 弧度
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
      // 绘制刻度
      ctx.beginPath();                              // 开始绘制路径
      ctx.moveTo(0, this.radius);                   // 移动到指定位置
      ctx.lineTo(0, this.radius - this.tickHeight); // 从当前位置绘制直线(路径)到指定位置
      ctx.strokeStyle = '#000';     // 设置描边样式
      ctx.lineWidth = i % 5 === 0   // 设置线宽
        ? this.tickWidth 
        : this.tickWidth / 3;  
      ctx.stroke();                // 描边
      ctx.closePath();             // 结束路径的绘制

      // 绘制数字
      if (i % 5 === 0) {
        ctx.font=`${this.tickFontSize}px arial`;     // 字体设置: font 属性使用的语法与 CSS font 属性
        ctx.fillStyle = '#000';    // 设置填充样式                    
        ctx.textAlign = 'center';  // 设置文字对齐方式, 定义文字坐标点在文字的位置
        ctx.fillText(              // 绘制填充文字: (文字, 位置 x, 位置 y)
          i / 5, 
          0, 
          - this.radius + this.tickFontHeight,
        ); 
      }

      ctx.rotate((2 * Math.PI) / 60); // 顺时针旋转整个画布, 包括坐标系
    }

    // 4. 绘制文字: UED
    ctx.fond = `${this.uedFontSize}px arial`;    // 字体设置, 同 css font 属性
    ctx.fillStyle = '#fff';     // 设置填充颜色
    ctx.textAlign = 'center';   // 设置文字对齐方式 => 定义文字绘制点在文本中的位置
    ctx.fillText(               // 绘制填充文字: (文字, 位置 x, 位置 y)
      'UED', 
      0, 
      - this.radius / 2,
    ); 

    return canvas;
  }

  // 绘制指针
  drawPointer = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.height = this.height;
    canvas.width = this.width;

    ctx.translate(this.width / 2, this.height / 2);  // 设置原点位置
    ctx.rotate(- Math.PI / 2);                       // 先将画布逆时针旋转 Math.PI / 2 (90度)

    // 根据时间换算转动角度(为了使得 x 轴指向正上方)：一圈 = 2 * Math.PI = 60 秒 = 60 分 = 12 小时
    const time = new Date();
    const secAngle = (Math.PI / 30) * time.getSeconds();      // 绘制秒针转动角度
    const minAngle = (Math.PI / 30) * time.getMinutes();      // 绘制分针转动角度
    const hourAngle = (Math.PI / 6) * (time.getHours() % 12); // 绘制时针转动角度

    // 绘制时针
    ctx.save();                                             // 保存当前状态          
    ctx.rotate(hourAngle);                                  // 转动画布
    ctx.beginPath();                                        // 开始绘制路径
    ctx.moveTo(- this.radius / 5, - this.originRadius / 2); // 移动绘制点
    ctx.lineTo(this.radius / 2, 0);                         // 绘制直线(路径)到指定位置
    ctx.lineTo(- this.radius / 5, this.originRadius / 2);   // 绘制直线(路径)到指定位置
    ctx.arcTo(                                              // 绘制圆弧: (第一端点 x 位置, 第一端点 x 位置,  第一端点 x 位置,  第一端点 x 位置, 圆弧半径),  当前绘制点、第一端点、第二端点形成夹角, 圆弧从当前端点开始绘制、到第二端点结束, 并于两条直线相切
      0, 0, 
      - this.radius / 5, - this.originRadius / 2, 
      this.originRadius / 2
    );
    ctx.strokeStyle = '#000';                               // 设置描边样式
    ctx.stroke();                                           // 描边
    ctx.closePath();                                        // 结束路径绘制
    ctx.restore();                                          // 回退到上一次保存的状态

    // 绘制分针
    ctx.save();                                                               // 保存当前路径
    ctx.rotate(minAngle);                                                     // 旋转画布
    ctx.beginPath();                                                          // 开始路径绘制
    ctx.moveTo(- this.radius / 5, - this.originRadius / 2);                   // 移动绘制点
    ctx.lineTo(this.radius - this.tickFontHeight - this.tickFontSize / 2, 0); // 绘制直线(路径)到指定位置
    ctx.lineTo(- this.radius / 5, this.originRadius / 2);                     // 绘制直线(路径)到指定位置
    ctx.arcTo(                                                                // 绘制圆弧: 第一端点 x 位置, 第一端点 x 位置,  第一端点 x 位置,  第一端点 x 位置, 圆弧半径),  当前绘制点、第一端点、第二端点形成夹角, 圆弧从当前端点开始绘制、到第二端点结束, 并于两条直线相切
      0, 0, 
      - this.radius / 5, - this.originRadius / 2, 
      this.originRadius / 2
    );
    ctx.strokeStyle = '#000';                                                  // 设置描边样式
    ctx.stroke();                                                              //描边
    ctx.closePath();                                                           // 关闭路径绘制
    ctx.restore();                                                             // 回退上一个状态

    // 绘制秒钟
    ctx.save();                            // 存储当前状态
    ctx.rotate(secAngle);                  // 旋转画布
    ctx.beginPath();                       // 开始绘制路径
    ctx.moveTo(- 2 * this.radius / 5, 0);  // 移动绘制点           
    ctx.lineTo(this.radius, 0);            // 绘制直线(路径)到指定点
    ctx.strokeStyle = 'red';               // 设置描边样式
    ctx.stroke();                          // 描边
    ctx.closePath();                       // 结束路径绘制

    ctx.beginPath();                                 // 开始绘制路径
    ctx.arc(                                         // 绘制圆(曲线)                                     
      this.radius - this.tickFontHeight - this.tickFontSize / 2, 
      0, this.originRadius, 0, 2 * Math.PI
    );
    ctx.fillStyle = '#ffff00';                       // 设置填充样式
    ctx.strokeStyle = 'red';                         // 设置描边样式
    ctx.fill();                                      // 填充
    ctx.stroke();                                    // 描边
    ctx.closePath();                                 // 结束路径绘制

    // 2. 绘制原点
    ctx.save();                                       // 保存状态
    ctx.beginPath();                                  // 开始绘制路径
    ctx.arc(0, 0, this.originRadius, 0, 2 * Math.PI); // 绘制圆弧(路径)
    ctx.fillStyle = '#000';                           // 设置填充样式
    ctx.strokeStyle = 'red';                          // 设置描边样式
    ctx.fill();                                       // 填充
    ctx.stroke();                                     // 描边
    ctx.closePath();                                  // 结束路径绘制
    ctx.restore();                                    // 回退到上一个状态
    return canvas;
  }
}