/* eslint-disable no-unused-vars */
import React from 'react';
import scss from './index.module.scss';

export default () => (
  <div className={scss.text}>
    定位之类的方法会把字符切开半个, 会触发强迫症, 所以 pass
  </div>
);
