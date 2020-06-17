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

// 延时函数
const delayed = time => new Promise(resolve => setTimeout(resolve, time));

const useStateHook = () => {
  const [animation, setAnimation] = React.useState(false);
  // 鼠标移动方向: 1 向右 -1 向左
  const [direction, setDirection] = React.useState(0);
  // 当前 active index
  const [activeIndex, setActiveIndex] = React.useState(0);

  const onChange = async index => {
    if (index === activeIndex) {
      return false;
    }
    setAnimation(false);
    await delayed(1000 * 0.1);
    setAnimation(true);
    setActiveIndex(index);
    setDirection(Math.sign(index - activeIndex) * 1);
  };

  return { activeIndex, onChange, animation, direction };
};

export default () => {
  const state = useStateHook();

  return (
    <div className={scss.body}>
      <div
        className={classNames(
          scss.menu,
          { [scss.animation]: state.animation }
        )}
        style={{
          '--active-index': state.activeIndex,
          '--direction': state.direction,
        }}>
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
