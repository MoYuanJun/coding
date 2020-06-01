// 参考: https://codepen.io/chrisota/pen/eYpyqYG
import React from 'react';
import scss from './index.module.scss';

export default () => (
  <div className={scss.body}>
    <div className={scss['gaming-console']}>
      游戏机
    </div>
  </div>
);
