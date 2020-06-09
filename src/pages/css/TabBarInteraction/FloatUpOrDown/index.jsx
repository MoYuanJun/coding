// 参考: https://codepen.io/kdbkapsere/pen/GRKaKMG
import React from 'react';
import scss from './index.module.scss';

import {
  HomeOutlined,
  RedditOutlined,
  BarChartOutlined,
  InstagramOutlined,
} from '@ant-design/icons';

const MENU_LIST = [
  { title: 'Home', icon: HomeOutlined },
  { title: 'Home', icon: RedditOutlined },
  { title: 'Home', icon: BarChartOutlined },
  { title: 'Home', icon: InstagramOutlined },
];

export default () => (
  <div className={scss.body}>
    <div className={scss.menu}>
      {MENU_LIST.map((V, index) => (
        <div
          key={index}
          className={scss['menu-item']}>
          <div className={scss['menu-item-content']}>
            <div className={scss.icon}>
              <V.icon/>
            </div>
            <div className={scss.title}>
              {V.title}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
