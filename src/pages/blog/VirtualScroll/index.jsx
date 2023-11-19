/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import React from 'react';
import Static from './Static';
import Dynamic from './Dynamic';
import { Card } from 'antd';

export default () => (
  <div>
    <Card title="静态(每条数据高度固定)">
      <Static />
    </Card>
    <br />
    <Card title="动态(每条数据高度不固定)">
      <Dynamic />
    </Card>
  </div>
);
