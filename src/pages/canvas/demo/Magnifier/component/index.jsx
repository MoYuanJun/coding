import React, {
  useRef,
  useMemo,
  useState,
} from 'react';
import scss from './index.module.scss';

const MASK_COLOR = 'rgba(64,169,255, 0.4)'; // 遮罩颜色
const MASK_SIZE = 100;                      // 遮罩大小
const ZOOM_SCALE = 2;                       // 缩放比例
const MARGIN = 10;                          // 原图和放大图之间间距

const useStateHook = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 });

  // canvas size
  const canvasSize = useMemo(() => {
    const { width, height } = imgSize;
    const zoomSize = ZOOM_SCALE * MASK_SIZE;
    return {
      width: width + zoomSize + MARGIN,
      height: Math.max(height, zoomSize) + MARGIN,
    };
  }, [imgSize]);

  // canvas 上下文
  const ctx = useMemo(() => (canvasRef.current
    ? canvasRef.current.getContext('2d')
    : null
  ), [canvasRef.current]);

  // 获取容器 BoundingClientRect
  const containerBoundingClientRect = useMemo(() => (canvasRef.current
    ? canvasRef.current.getBoundingClientRect()
    : null
  ), [canvasRef.current]);


  // 绘制遮罩
  const drawMask = ({ x, y }) => {
    ctx.clearRect(0, 0, imgSize.width, imgSize.height);
    ctx.beginPath();
    ctx.fillStyle = MASK_COLOR;
    ctx.fillRect(x, y, MASK_SIZE, MASK_SIZE);
  };

  // 图片加载完毕
  const onLoad = event => {
    const { width, height } = event.target;
    setImgSize({ width, height });
  };

  // 鼠标在画布上移动
  const onMouseMove = event => {
    const { left, top } = containerBoundingClientRect;
    drawMask({
      y: event.clientY - top,
      x: event.clientX - left,
    });
  };

  // 鼠标离开画布
  const onMouseLeave = () => {
    const { width, height } = canvasSize;
    ctx.clearRect(0, 0, width, height);
  };

  return {
    onLoad,
    canvasRef,
    canvasSize,
    onMouseMove,
    containerRef,
    onMouseLeave,
  };
};

export default props => {
  const state = useStateHook();
  return (
    <div
      ref={state.containerRef}
      className={scss.magnifier}>
      <img
        src={props.src}
        onLoad={state.onLoad}
      />
      <canvas
        {... state.canvasSize}
        ref={state.canvasRef}
        onMouseMove={state.onMouseMove}
        onMouseLeave={state.onMouseLeave}
        className={scss['magnifier-canvas']}
      />
    </div>
  );
};
