// https://codepen.io/Anna_Batura/details/qBbaXBd
import React from 'react';
import classNames from 'classnames';
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
    title: 'MENU',
  },
  {
    icon: <WechatOutlined />,
    title: 'USERS',
  },
  {
    icon: <TeamOutlined />,
    title: 'CHAT',
  },
  {
    icon: <SettingOutlined />,
    title: 'EDIT',
  },
];

const useStateHook = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const onChange = activeIndex => {
    setActiveIndex(activeIndex);
  };

  return { onChange, activeIndex };
};

export default () => {
  const state = useStateHook();

  return (
    <div className={scss.body}>
      <div className={scss.menu}>
        {MENU_LIST.map((v, index) => (
          <div
            key={index}
            className={classNames(
              scss.item,
              { [scss.active]: state.activeIndex === index }
            )}
            onClick={state.onChange.bind(null, index)}>
            <div className={scss.icon}>
              {v.icon}
              {index === 0 ?
                <div className={scss.tip}>
                  About Us <br/>
                  Contact Us
                </div> : null
              }
            </div>
            <div className={scss.title}>{v.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
