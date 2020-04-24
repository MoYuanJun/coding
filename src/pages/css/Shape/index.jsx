import React from 'react';
import Triangle from './Triangle';
import InsideRadius from './InsideRadius';
import scss from './index.module.scss';

import { Card } from 'antd';

export default () => (
  <div className={scss.layout}>
    <Card
      bordered={false}
      title="三角形、梯形">
      <Triangle/>
    </Card>
    <Card title="内凹圆角" bordered={false}>
      <InsideRadius/>
    </Card>
  </div>
);
