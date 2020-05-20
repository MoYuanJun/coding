import React from 'react';
import scss from './index.module.scss';

const useStateHook = props => {
  const canvasRef = React.useRef(null);

  // 组件样式
  const scratchStyle = React.useMemo(() => ({
    width: props.width,
    height: props.height,
  }), []);

  // 擦除
  const eraseCanvas = event => {
    // 1. 获取擦除点
    const { left, top } = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - left;
    const y = event.clientY - top;
    // 2. 擦除画布
    const ctx = canvasRef.current.getContext('2d');
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, props.eraserSize / 2, 0, 2 * Math.PI);
    // 通过投影实现羽化效果
    ctx.fillStyle = props.color;
    ctx.shadowColor = props.color;
    ctx.shadowBlur = props.eraserSize / 2;
    ctx.fill();
    ctx.closePath();
  };

  // 初始化画布
  const initCanvas = () => {
    if (!canvasRef.current) {
      return false;
    }
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = props.color;
    ctx.fillRect(0, 0, props.width, props.height);
    ctx.closePath();
  };

  // 鼠标画布上移动
  const onMouseMove = event => {
    if (!onMouseMove.eraseCanvas) {
      return false;
    }
    eraseCanvas(event);
  };

  // 鼠标按下
  const onMouseDown = event => {
    onMouseMove.eraseCanvas = true;
    eraseCanvas(event);
  };

  // 鼠标弹起
  const onMouseUp = () => {
    onMouseMove.eraseCanvas = false;
  };

  React.useEffect(() => {
    initCanvas();
  }, [canvasRef.current]);

  return { scratchStyle, canvasRef, onMouseMove, onMouseUp, onMouseDown };
};

const Scratch = props => {
  const state = useStateHook(props);

  return (
    <div
      className={scss.scratch}
      style={state.scratchStyle}>
      {props.children}
      <canvas
        width={props.width}
        height={props.height}
        ref={state.canvasRef}
        className={scss.canvas}
        onMouseUp={state.onMouseUp}
        onMouseDown={state.onMouseDown}
        onMouseMove={state.onMouseMove}
      />
    </div>
  );
};

Scratch.defaultProps = {
  width: 300,        // 组件宽
  height: 300,       // 组件高
  eraserSize: 30,    // 橡皮擦大小(圆半径)
  color: '#eff1f7',  // 刮刮乐颜色(背景色)
};

export default Scratch;
