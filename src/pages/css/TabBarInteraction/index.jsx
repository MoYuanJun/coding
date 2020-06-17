import React from 'react';
import Swing from './Swing';
import PushPull from './PushPull';
import SlidingBg from './SlidingBg';
import Spotlight from './Spotlight';
import scss from './index.module.scss';
import ExpandPanel from './ExpandPanel';
import FloatUpOrDown from './FloatUpOrDown';
import PopUpSecondaryMenu from './PopUpSecondaryMenu';

import { Card } from 'antd';

const LIST = [
  {
    title: '推拉',
    Component: PushPull,
  },
  {
    title: '弹出式二级菜单',
    Component: PopUpSecondaryMenu,
  },
  {
    title: '弹出式面板',
    Component: ExpandPanel,
  },
  {
    title: '滑动背景',
    Component: SlidingBg,
  },
  {
    title: '聚光灯',
    Component: Spotlight,
  },
  {
    title: '上下浮动',
    Component: FloatUpOrDown,
  },
  {
    title: '摇摆',
    Component: Swing,
  },
];

export default () => (
  <div className={scss.body}>
    {LIST.map(V => (
      <Card
        title={V.title}
        key={V.title}
        className={scss.card}>
        <V.Component/>
      </Card>
    ))}
  </div>
);
