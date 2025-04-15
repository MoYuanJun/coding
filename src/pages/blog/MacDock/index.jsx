/* eslint-disable no-unused-vars */
import React, { useCallback, useMemo, useRef, useState } from 'react';
import scss from './index.module.scss';

const data = [
  { color: '#ff4d4f' },
  { color: '#ff7a45' },
  { color: '#ffa940' },
  { color: '#ffc53d' },
  { color: '#ffec3d' },
  { color: '#bae637' },
  { color: '#73d13d' },
  { color: '#36cfc9' },
  { color: '#4096ff' },
  { color: '#597ef7' },
  { color: '#9254de' },
  { color: '#f759ab' },
];

const curveRange = 600;
const minScale = 1;
const maxScale = 1.8;


/**
 * 比例波形
 *
 * @param {*} params 参数
 * @param {number} params.curveCentreX 波形中心位置(其实就是当前鼠标位置)
 * @param {number} params.menuItemX 当前菜单位置(菜单中心点位置)
 * @returns {number} 最终返回对应菜单的放大比例
 */
const scaleCurve = ({ curveCentreX, menuItemX }) => {
  const beginX = curveCentreX - (curveRange / 2); // 波形开始的 x 位置
  const endX = curveCentreX + (curveRange / 2); // 波形结束的 x 位置

  // 边界控制, 目的是只保留一个波形
  if (menuItemX < beginX || menuItemX > endX) {
    return minScale;
  }

  const amplitude = maxScale - minScale; // 波形的振幅, 控制菜单项放大
  const angle = ((menuItemX - beginX) / curveRange) * Math.PI; // 波形角度

  return (Math.sin(angle) * amplitude) + minScale;
};

const useScale = (clientX) => {
  const ref = useRef(null);

  const scale = useMemo(() => {
    if (!ref.current) {
      return minScale;
    }

    const { left, width } = ref.current.getBoundingClientRect();

    return scaleCurve({
      curveCentreX: clientX,
      menuItemX: left + (width / 2),
    });
  }, [clientX]);

  return { ref, scale };
};

const Item = ({ color, clientX  }) => {
  const { ref, scale } = useScale(clientX);

  return (
    <div
      ref={ref}
      className={scss.item}
      style={{ 'backgroundColor': color, '--scale': scale }}
    />
  );
};

const Gap = ({ clientX }) => {
  const { ref, scale } = useScale(clientX);

  return (
    <div
      ref={ref}
      className={scss.gap}
      style={{ '--scale': scale }}
    />
  );
};

export default () => {
  const [clientX, setClientX] = useState(null);
  const wrapperRef = useRef(null);

  const setTransitionDuration = useCallback(() => {
    wrapperRef.current.style.setProperty('--transition-duration', 0.08);
    setTimeout(
      () => wrapperRef.current.style.setProperty('--transition-duration', 0),
      80,
    );
  }, []);

  const handleMouseEnter = useCallback((e) => {
    setTransitionDuration();
    setClientX(e.clientX);
  }, [setTransitionDuration]);

  const handleMouseMove = useCallback((e) => {
    setClientX(e.clientX);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransitionDuration();
    setClientX(null);
  }, [setTransitionDuration]);

  return (
    <div className={scss.main}>
      <div
        ref={wrapperRef}
        className={scss.wrapper}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}>
        {data.map((v, index) => (
          <>
            <Item
              color={v.color}
              clientX={clientX}
            />
            {index < data.length - 1 ? <Gap clientX={clientX} /> : null}
          </>
        ))}
      </div>
    </div>
  );
};
