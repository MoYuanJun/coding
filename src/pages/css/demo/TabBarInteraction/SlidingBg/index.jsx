// 参考: https://codepen.io/AdePhil/pen/eYpqxrv
import React from 'react';
import scss from './index.module.scss';
import classNames from 'classnames';
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

const useStateHook = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const menuRef = React.useRef(null);

  // 菜单样式
  const menuStyle = React.useMemo(() => ({
    '--active-index': activeIndex,
  }), [activeIndex]);

  // 菜单点击事件
  const onClick = (index, event) => {
    event.stopPropagation();
    setActiveIndex(index);
  };

  return { menuRef, onClick, menuStyle, activeIndex };
};

export default () => {
  const state = useStateHook();
  return (
    <div className={scss.body}>
      <div
        className={scss.menu}
        style={state.menuStyle}>
        {MENU_SETTING.map((V, index) => (
          <div
            key={index}
            onClick={state.onClick.bind(null, index)}
            className={classNames(
              scss['menu-item'],
              { [scss.active]: state.activeIndex === index }
            )}>
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
};
