/* eslint-disable no-unused-vars */
import React, { useCallback } from 'react';
import scss from './index.module.scss';

const data = Array.from({ length: 100000 }, (_, i) => `第 ${i + 1}条数据`);

export default () => {
  const handleScroll = useCallback((e) => {
    // scrollTop
    // e.target
    console.log('%c [ e ]-9', 'font-size:13px; background:pink; color:#bf2c9f;', e);
  }, []);

  return (
    <div className={scss.wrapper}>
      {data.map((v) => (
        <div className={scss.item}>
          {v}
        </div>
      ))}
    </div>
  );
};
