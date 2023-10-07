/* eslint-disable no-unused-vars */
import React from 'react';
import scss from './index.module.scss';

import {
  ToolOutlined,
  AppleOutlined,
  CloseOutlined,
  DeleteOutlined,
  PieChartOutlined,
  AliwangwangOutlined,
} from '@ant-design/icons';

export default () => (
  <div className={scss.body}>
    <div className={scss.mene}>
      <input id="open" />
      <div className={scss['mene-item-wrapper']}>
        <div className={scss['mene-item']}>
          <AliwangwangOutlined />
        </div>
        <div className={scss['mene-item']}>
          <DeleteOutlined />
        </div>
        <div className={scss['mene-item']}>
          <PieChartOutlined />
        </div>
        <div className={scss['mene-item']}>
          <AppleOutlined />
        </div>
      </div>
      <div className={scss['mene-toggle']}>
        <label htmlFor="open">
          <ToolOutlined />
        </label>
        <label htmlFor="close">
          <CloseOutlined />
        </label>
      </div>
    </div>
  </div>
);
