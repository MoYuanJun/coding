import React from 'react';
import scss from './index.module.scss';

export default () => (
  <div className={scss['read-code']}>
    <canvas id="canvas" width="100" height="100"></canvas>
  </div>
);
