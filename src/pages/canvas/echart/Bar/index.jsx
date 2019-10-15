import React from 'react';
import { useEffect, useRef }  from 'react';
import Bar from './bar';

const WIDTH = 600;
const HEIGHT = 500;
const PADDING = 50;
const STEP_Y = 5;

const data = [
  { name: '周一', value: 300 },
  { name: '周二', value: 250 },
  { name: '周三', value: 100 },
  { name: '周四', value: 220 },
  { name: '周五', value: 280 },
];

// 绘制动画
const drawBar = (ctx, x, y, w, h) => {
  const frameNum = 50;
  let num = 1;
  const draw = () => {
    ctx.clearRect(x, y - 5, w, h + 5 );

    ctx.fillStyle = "#1890ff";
    ctx.textAlign = 'center';
    ctx.fillRect(x, y + (h - ((h / frameNum) * num)), w, (h / frameNum) * num);
    ctx.fillText('111', x + w / 2, y + (h - ((h / frameNum) * num)) - 5 );

    num += 1;
    num <= frameNum && requestAnimationFrame(draw);
  };

  requestAnimationFrame(draw);
}

// 1. 绘制坐标轴
const drawAxis = (canvas) => {
  const ctx = canvas.getContext('2d');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  ctx.beginPath();
  ctx.moveTo(PADDING, PADDING);
  ctx.lineTo(PADDING, HEIGHT - PADDING);
  ctx.lineTo(WIDTH - PADDING, HEIGHT - PADDING);
  ctx.strokeStyle = '#fff';
  ctx.stroke();

  // 坐标点
  const stepLengthY = Math.floor((HEIGHT - 2 * PADDING) / STEP_Y);
  const stepLengthX = Math.floor((WIDTH - 2 * PADDING) / data.length);

  // x 轴
  for (let i = 0; i < data.length; i++){
    const xAxis = data[i].name;
    const xlen = stepLengthX * (i + 1);

    ctx.moveTo(PADDING + xlen, HEIGHT - PADDING);
    ctx.lineTo(PADDING + xlen, HEIGHT - PADDING + 5);
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.fillStyle = 'red';
    ctx.fillText(xAxis, PADDING + xlen - stepLengthX / 2, HEIGHT - PADDING + 15);
  }

  // Y 轴
  for (let i = 0; i < STEP_Y; i++){
    const yAxis = Math.floor(Math.max(...data.map(v => v.value)) / STEP_Y) * (i + 1);
    const yLen = stepLengthY * (i + 1);

    ctx.moveTo(PADDING, HEIGHT - PADDING - yLen);
    ctx.lineTo(PADDING - 5, HEIGHT - PADDING - yLen);
    ctx.stroke();

    ctx.fillStyle = 'red';
    ctx.textAlign = 'right';
    ctx.fillText(yAxis, PADDING - 15, HEIGHT - PADDING - yLen + 5);
  }

  // 绘制柱状图
  // HEIGHT - 2 * PADDING
  const barWidth = 50;
  
  for (let i = 0; i < data.length; i ++ ){
    const height = ((HEIGHT - 2 * PADDING) / Math.max(...data.map(v => v.value))) * data[i].value;

    drawBar(
      ctx, 
      PADDING + stepLengthX * i + ((stepLengthX - barWidth) / 2), 
      HEIGHT - height - PADDING, 
      barWidth, 
      height
    );
  }
}

const useStateHook = () => {
  const containerRef = useRef();

  useEffect(() => {
    const bar = new Bar({});
    bar.init(containerRef.current);
  }, []);

  return { containerRef };
}

export default (props) => {
  const state = useStateHook(props);
  return (
    <div ref={state.containerRef} style={{ width: 600, height: 500, background: 'red' }}>
      
    </div>
  );
}
