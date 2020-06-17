// https://codepen.io/Anna_Batura/details/qBbaXBd
import React from 'react';
import scss from './index.module.scss';
import {
  AlignLeftOutlined,
  WechatOutlined,
  TeamOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const MENU_LIST = [
  {
    icon: <AlignLeftOutlined />,
    title: '',
  },
  {
    icon: <WechatOutlined />,
    title: '',
  },
  {
    icon: <TeamOutlined />,
    title: '',
  },
  {
    icon: <SettingOutlined />,
    title: '',
  },
];

export default () => (
  <div className={scss.body}>
    <div className={scss.menu}>
      推拉
    </div>
  </div>
);
