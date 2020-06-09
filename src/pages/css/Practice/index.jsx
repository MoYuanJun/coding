// https://blog.csdn.net/qq_44607694/article/details/90551133
import React from 'react';
import img from './img/img.jpg';
import scss from './index.module.scss';

export default () => (
  <div className={scss.body}>
    <img src={img} className={scss.mask}/>
  </div>
);
