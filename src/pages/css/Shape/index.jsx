/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import React from 'react';
import Radius from './Radius';
import Triangle from './Triangle';
import InsideRadius from './InsideRadius';
import scss from './index.module.scss';

import { Card } from 'antd';

export default () => (
  <div className={scss.layout}>
    <Card
      bordered={false}
      title="三角形、梯形">
      <Triangle />
    </Card>
    <Radius />
    <Card
      title="内凹圆角"
      bordered={false}>
      <InsideRadius />
    </Card>
  </div>
);
