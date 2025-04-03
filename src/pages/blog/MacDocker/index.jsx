/* eslint-disable no-unused-vars */
import React, { useCallback } from 'react';
import scss from './index.module.scss';


const data = [
  { color: '#ff4d4f' },
  { color: '#ff4d4f' },
  { color: '#ff4d4f' },
  { color: '#ff4d4f' },
  { color: '#ff4d4f' },
];

export default () => {
  const handleMouseMove = useCallback(() => {
    console.log('%c [ 11 ]-17', 'font-size:13px; background:pink; color:#bf2c9f;', 11);
  }, []);

  return (
    <div className={scss.main}>
      <div
        onMouseMove={handleMouseMove}
        className={scss.wrapper}>
        {data.map((v) => (
          <div
            className={scss.item}
            style={{ 'backgroundColor': v.color, '--scale': 1 }}
          />
        ))}
      </div>
    </div>
  );
};
