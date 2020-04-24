import React from 'react';
import scss from './index.module.scss';

import { Card } from 'antd';

const GridStyle = { width: `${100 / 3}%` };

export default () => (
  <React.Fragment>
    <Card.Grid style={GridStyle}>
      <div className={scss['inside-radius-1']}>
        矩形和圆进行拼凑而成
      </div>
    </Card.Grid>
    <Card.Grid style={GridStyle}>
      <div className={scss['inside-radius-2']}>
        通过小矩形圆角、定位、旋转实现
      </div>
    </Card.Grid>
    <Card.Grid style={GridStyle}>
      <div className={scss['inside-radius-3']}>
        使用圆形渐变实现
      </div>
    </Card.Grid>
  </React.Fragment>
);
