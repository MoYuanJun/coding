/* eslint-disable no-unused-vars */
import React from 'react';
import scss from './index.module.scss';

const ITEM_SIZE = 40;
const DATA_SOURCE = Array.from({ length: 100000 }, (_, i) => `第 ${i + 1}条数据`);
const CONTENT_HEIGHT = DATA_SOURCE.length * ITEM_SIZE;

export default () => (
  <div className={scss.wrapper}>
    <div
      className={scss.list}
      style={{ height: CONTENT_HEIGHT, paddingTop: ITEM_SIZE * 10 }}>
      {DATA_SOURCE.slice(10, 21).map((v) => (
        <div className={scss.item}>
          {v}
        </div>
      ))}
    </div>
  </div>
);
