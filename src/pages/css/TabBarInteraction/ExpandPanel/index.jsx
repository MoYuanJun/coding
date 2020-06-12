// 参考 https://codepen.io/dev_loop/pen/YzwqzLV
import React from 'react';
import scss from './index.module.scss';

export default () => (
  <div className={scss.body}>
    <div className={scss.phone}>
      <div className={scss.screen}>
      </div>
      <div className={scss['home-key']}></div>
    </div>
  </div>
);
