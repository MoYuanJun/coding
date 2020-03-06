// 时钟
var canvas_clock = document.getElementById("canvas_clock"); //获取画布
canvas_clock.width = 300;
canvas_clock.height = 300;

if (canvas_clock.getContext) {
  var context_clock = canvas_clock.getContext("2d"); //设置绘图环境
  function run() {
    var time = new Date();
    var sec = time.getSeconds();
    var min = time.getMinutes();
    var hour = time.getHours();
    hour = hour > 12 ? hour - 12 : hour;

    context_clock.clearRect(0, 0, 300, 300); //清除画布

    // 钟表盘
    context_clock.save(); //保存画布状态,后续绘制的都是在新画布坐标
    context_clock.beginPath(); //创建一个新的路径

    //表盘中心
    context_clock.beginPath(); //创建一个新的路径
    context_clock.arc(150, 150, 130, 0, 2 * Math.PI);
    context_clock.closePath(); //返回到当前子路径起始点

    var color = context_clock.createRadialGradient(150, 150, 30, 150, 150, 100);
    color.addColorStop(0, "rgb(253,189,125)");
    color.addColorStop(1, "rgb(255,127,0)");
    context_clock.fillStyle = color;
    context_clock.fill(); //填充

    //表盘边框
    context_clock.lineWidth = 3;
    context_clock.strokeStyle = "#bb5e00";
    context_clock.stroke(); //描边

    context_clock.font = "18px arial";
    context_clock.fillStyle = "white";
    context_clock.textAlign = "center";
    context_clock.fillText("UED", 150, 100);

    context_clock.restore(); //恢复画布状态

    // 分秒钟刻度
    context_clock.save();
    context_clock.translate(150, 150);
    for (var i = 0; i < 60; i++) {
      if (i % 5 == 0) {
        context_clock.beginPath();
        context_clock.moveTo(0, 120);
        context_clock.lineTo(0, 130);
        context_clock.lineWidth = 5;

        context_clock.strokeStyle = "black";
        context_clock.stroke();

        context_clock.rotate(6 * Math.PI / 180);
      } else {
        context_clock.beginPath();
        context_clock.moveTo(0, 120);
        context_clock.lineTo(0, 126);
        context_clock.lineWidth = 1;
        context_clock.strokeStyle = "black";
        context_clock.stroke();
        context_clock.rotate(6 * Math.PI / 180);
      }
    }
    context_clock.restore();

    // 时钟12小时数旋转
    context_clock.save();
    context_clock.translate(150, 150);
    for (var j = 0; j < 12; j++) {
      context_clock.beginPath();
      context_clock.font = "20px arial";
      context_clock.fillStyle = "black";
      context_clock.textAlign = "center";
      context_clock.fillText(j, 0, -85);
      context_clock.rotate(30 * Math.PI / 180);
    }
    context_clock.restore();

    // 实时时间转换成角度，一圈是360度，也就是2PI，一圈有60小格，一小格就是（2 * Math.PI / 60）
    var angle = 2 * Math.PI / 60,
      secHandAngle = sec * angle,
      minHandAngle = secHandAngle / 60 + min * angle,
      hourHandAngle = minHandAngle * 5 / 60 + hour * 5 * angle;

    // 时针
    context_clock.save();
    context_clock.translate(150, 150);
    context_clock.rotate(hourHandAngle);
    context_clock.beginPath();

    context_clock.moveTo(-2, 10);
    context_clock.lineTo(0, -60);
    context_clock.lineTo(2, 10);
    context_clock.moveTo(-2, 10);
    context_clock.arcTo(0, -60, 2, 10, 2);

    context_clock.lineWidth = 1;
    context_clock.strokeStyle = "black";
    context_clock.stroke();
    context_clock.restore();

    // 分针
    context_clock.save();
    context_clock.translate(150, 150);
    context_clock.rotate(minHandAngle);
    context_clock.beginPath();

    context_clock.moveTo(-2, 10);
    context_clock.lineTo(0, -80);
    context_clock.lineTo(2, 10);
    context_clock.moveTo(-2, 10);
    context_clock.arcTo(0, -80, 2, 10, 2);

    context_clock.strokeStyle = "black";
    context_clock.stroke();
    context_clock.restore();

    // 秒针
    context_clock.save();
    context_clock.translate(150, 150);
    context_clock.rotate(secHandAngle);
    context_clock.beginPath();
    context_clock.moveTo(0, 30);
    context_clock.lineTo(0, -120);
    context_clock.lineWidth = 1;
    context_clock.closePath();
    context_clock.strokeStyle = "red";
    context_clock.stroke();

    //秒针前端小点
    context_clock.beginPath();
    context_clock.strokeStyle = "red";
    context_clock.fillStyle = "#ffff00";
    context_clock.arc(0, -80, 4, 0, 2 * Math.PI);
    context_clock.fill();
    context_clock.closePath();
    context_clock.stroke();
    context_clock.restore();

    // 表盘中心圆轴
    context_clock.save();
    context_clock.beginPath();
    context_clock.strokeStyle = "red";
    context_clock.fillStyle = "black";
    context_clock.arc(150, 150, 4, 0, 2 * Math.PI);
    context_clock.fill();
    context_clock.closePath();
    context_clock.stroke();
    context_clock.restore();
  }

  run();
  setInterval(run, 1000);
}
