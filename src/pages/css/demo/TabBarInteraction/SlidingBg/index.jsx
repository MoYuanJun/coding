// https://codepen.io/AdePhil/pen/eYpqxrv
import React from 'react';
import scss from './index.module.scss';
import {
  MailOutlined,
  SearchOutlined,
  AlignRightOutlined,
} from '@ant-design/icons';

const MENU_SETTING = [
  { title: 'Stats', icon: AlignRightOutlined },
  { title: 'Inbox', icon: MailOutlined },
  { title: 'Find', icon: SearchOutlined },
];

export default () => (
  <div className={scss.body}>
    <div className={scss.menu}>
      {MENU_SETTING.map((V, index) => (
        <div className={scss['menu-item']}
          key={index}
          style={{ '--index': index }}>
          <div className={scss['menu-icon']}>
            <V.icon/>
          </div>
          <div className={scss['menu-title']}>
            {V.title}
          </div>
        </div>
      ))}
    </div>
  </div>
);
