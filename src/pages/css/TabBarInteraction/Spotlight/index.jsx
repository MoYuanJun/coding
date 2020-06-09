// 参考: https://codepen.io/dev_loop/pen/WNvBzZG
import React from 'react';
import scss from './index.module.scss';
import classNames from 'classnames';
import {
  HomeOutlined,
  RedditOutlined,
  BarChartOutlined,
  InstagramOutlined,
  AliwangwangOutlined,
} from '@ant-design/icons';

const MENU_LIST = [
  { icon: HomeOutlined },
  { icon: RedditOutlined },
  { icon: BarChartOutlined },
  { icon: InstagramOutlined },
  { icon: AliwangwangOutlined },
];

const useStateHook = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const menuStyle = React.useMemo(() => ({
    '--active-index': activeIndex,
  }), [activeIndex]);

  const onClick = activeIndex => {
    setActiveIndex(activeIndex);
  };

  return { menuStyle, onClick, activeIndex };
};

export default () => {
  const state = useStateHook();

  return (
    <div className={scss.body}>
      <div
        className={scss.menu}
        style={state.menuStyle}>
        {MENU_LIST.map((V, index) => (
          <div
            key={index}
            onClick={state.onClick.bind(null, index)}
            className={classNames(
              scss['menu-item'],
              { [scss.active]: state.activeIndex === index }
            )}>
            <V.icon/>
          </div>
        ))}
        <div className={scss.spotlight}/>
      </div>
    </div>
  );
};
