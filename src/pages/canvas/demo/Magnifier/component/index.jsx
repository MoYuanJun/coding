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

// 获取中间值
const getMedianValue = (x, y, z) => (
  [x, y, z].sort((a, b) => (a - b))[1]
);

const useStateHook = () => {
  const imgRef = useRef(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 });

  // 设置画布大小
  const canvasSize = useMemo(() => {
    const { width, height } = imgSize;
    const zoomSize = ZOOM_SCALE * MASK_SIZE;
    return {
      width: width + zoomSize + MARGIN,
      height: Math.max(height, zoomSize),
    };
  }, [imgSize]);

  // 获取 canvas 上下文
  const ctx = useMemo(() => (canvasRef.current
    ? canvasRef.current.getContext('2d')
    : null
  ), [canvasRef.current]);

  // 获取容器 BoundingClientRect
  const containerBoundingClientRect = useMemo(() => (canvasRef.current
    ? canvasRef.current.getBoundingClientRect()
    : null
  ), [canvasRef.current]);

  // 图片加载完毕
  const onLoad = event => {
    const { width, height } = event.target;
    setImgSize({ width, height });
  };

  // 绘制遮罩
  const drawMask = ({ maskX, maskY }) => {
    ctx.beginPath();
    ctx.fillStyle = MASK_COLOR;
    ctx.fillRect(
      maskX,
      maskY,
      MASK_SIZE,
      MASK_SIZE
    );
    ctx.closePath();
  };

  // 绘制预览图
  const drawPreview = ({ maskX, maskY }) => {
    ctx.drawImage(
      imgRef.current,
      maskX,
      maskY,
      MASK_SIZE,
      MASK_SIZE,
      imgSize.width + MARGIN,
      0,
      MASK_SIZE * ZOOM_SCALE,
      MASK_SIZE * ZOOM_SCALE,
    );
  };

  // 鼠标在画布上移动
  const onMouseMove = event => {
    const { left, top } = containerBoundingClientRect;
    // 1. 计算鼠标位置
    const mouseY = event.clientY - top;
    const mouseX = event.clientX - left;

    // 2. 清除画布
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);

    // 3. 如果鼠标位置在图片之外则不进行绘制
    if (mouseX > imgSize.width || mouseY > imgSize.height) {
      return false;
    }

    // 4. 计算遮住绘制点坐标
    const maskX = getMedianValue(
      0,
      mouseX - (MASK_SIZE / 2),
      imgSize.width - MASK_SIZE
    );
    const maskY = getMedianValue(
      0,
      mouseY - (MASK_SIZE / 2),
      imgSize.height - MASK_SIZE
    );

    // 5. 绘制遮罩
    drawMask({ maskX, maskY });

    // 6. 绘制预览图
    drawPreview({ maskX, maskY });
  };

  // 鼠标离开画布
  const onMouseLeave = () => {
    const { width, height } = canvasSize;
    ctx.clearRect(0, 0, width, height);
  };

  return {
    imgRef,
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
        ref={state.imgRef}
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
