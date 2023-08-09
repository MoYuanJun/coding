/* eslint-disable no-unused-vars */
import React from 'react';
import scss from './index.module.scss';

export default () => (
  <div className={scss.wrapper}>
    <div className={scss.left}>
      <div className={scss.group}>
        1
      </div>
      <div className={scss.group}>
        2
      </div>
      <div className={scss.group}>
        3
      </div>
    </div>
    <div className={scss.right}>
      <div className={scss.group}>
        4
      </div>
    </div>
  </div>
);
