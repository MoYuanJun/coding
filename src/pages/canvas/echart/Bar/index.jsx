import React from 'react';
import { useEffect, useRef }  from 'react';

const WIDTH = 600;
const HEIGHT = 500;
const PADDING = 50;
const STEP_Y = 5;

const data = [
  { name: '1111', value: 300 },
  { name: '1111', value: 300 },
  { name: '1111', value: 300 },
  { name: '1111', value: 300 },
  { name: '1111', value: 300 },
];

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
}

const useStateHook = () => {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    drawAxis(canvas);

  }, []);

  return { canvasRef };
}

export default (props) => {
  const state = useStateHook(props);
  return (
    <canvas ref={state.canvasRef} style={{ background: '#829dba' }}>
      demo-1
    </canvas>
  );
}
