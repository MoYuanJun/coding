import React from 'react';
import scss from './index.module.scss';
import PopUpSecondaryMenu from './PopUpSecondaryMenu';

import { Card } from 'antd';

const LIST = [
  {
    title: '弹出式二级菜单',
    Component: PopUpSecondaryMenu,
  },
];

export default () => (
  <React.Fragment>
    {LIST.map(V => (
      <Card
        title={V.title}
        key={V.title}
        className={scss.card}>
        <V.Component/>
      </Card>
    ))}
  </React.Fragment>
);
