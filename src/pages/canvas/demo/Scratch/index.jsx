import React from 'react';
import Scratch from './component';
import scss from './index.module.scss';

export default () => (
  <div className={scss.demo}>
    <Scratch>
      刮刮乐
    </Scratch>
  </div>
);
