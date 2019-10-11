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

  // 标点
  const stepLengthY = Math.floor((HEIGHT - 2 * PADDING) / STEP_Y);
  const stepLengthX = Math.floor((WIDTH - 2 * PADDING) / data.length);


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
