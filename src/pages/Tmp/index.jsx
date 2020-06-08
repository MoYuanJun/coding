import React from 'react';
import scss from './index.module.scss';

export default () => (
  <div className={scss.body}>
    <svg xmlns="qy" version="1.1" width="500" height="500">
      <path
        d="M50 50 l415 0"
        stroke="red"
        strokeWidth="5"
        strokeLinecap="butt"
        strokeDasharray="5,5"
      />

      <path
        d="M50 100 l415 0"
        stroke="blue"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray="20,30"
      />

      <path
        d="M50 150 l415 0"
        stroke="pink"
        strokeWidth="15"
        strokeLinecap="square"
        strokeDasharray="20,20,5,5,5,10"
      />
    </svg>
  </div>
);
