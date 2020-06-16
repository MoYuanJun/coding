// https://codepen.io/lerida/details/ZEQQEOd

import React from 'react';
import classNames from 'classnames';
import scss from './index.module.scss';
import {
  AliwangwangOutlined,
  PieChartOutlined,
  ChromeOutlined,
  RedditOutlined,
} from '@ant-design/icons';

const MENU_LIST = [
  {
    title: 'Browse',
    icon: <PieChartOutlined />,
  },
  {
    title: 'Profile',
    icon: <ChromeOutlined />,
  },
  {
    title: 'Chat',
    icon: <AliwangwangOutlined />,
  },
  {
    title: 'Menu',
    icon: <RedditOutlined />,
  },
];

const useStateHook = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const onChange = activeIndex => setActiveIndex(activeIndex);

  return { activeIndex, onChange };
};

export default () => {
  const state = useStateHook();

  return (
    <div className={scss.body}>
      <div
        className={scss.menu}
        style={{ '--active-index': state.activeIndex }}>
        {MENU_LIST.map((v, index) => (
          <div
            key={index}
            className={classNames(
              scss.item,
              { [scss.active]: index === state.activeIndex }
            )}
            onClick={state.onChange.bind(null, index)}>
            <div className={scss.icon}>{v.icon}</div>
            <div className={scss.title}>{v.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
