// 参考: https://codepen.io/ixahmedxi/pen/zYrdBKx
import React from 'react';
import scss from './index.module.scss';
import { Slider } from 'antd';
import {
  WifiOutlined,
  SoundOutlined,
  AlertOutlined,
} from '@ant-design/icons';

export default () => (
  <div className={scss.body}>
    <div className={scss['control-center']}>
      <div className={scss.connection}>
        <WifiOutlined />
        <div className={scss.text}>
          <div>Wi-Fi</div>
          <div>Home1</div>
        </div>
        <WifiOutlined />
        <div className={scss.text}>
          <div>Bluetooth</div>
        </div>
        <WifiOutlined />
        <div className={scss.text}>
          <div>AirDrop</div>
          <div>Contacts Only</div>
        </div>
      </div>
      <div className={scss.disturb}>
        <WifiOutlined />
        <div className={scss.text}>
          Do Not<br/>Disturb
        </div>
      </div>
      <div className={scss.brightness}>
        <WifiOutlined />
        <div className={scss.text}>
          Keyboard<br/>Brightness
        </div>
      </div>
      <div className={scss.airplay}>
        <WifiOutlined />
        <div className={scss.text}>
          Airplay Display
        </div>
      </div>
      <div className={scss.display}>
        <div>Display</div>
        <Slider
          defaultValue={50}
          tooltipVisible={false}
          marks = {{ 0: <AlertOutlined /> }}
        />
      </div>
      <div className={scss.sound}>
        <div>Sound</div>
        <Slider
          defaultValue={50}
          tooltipVisible={false}
          marks={{ 0: <SoundOutlined /> }}
        />
      </div>
      <div className={scss.playing}></div>
    </div>
  </div>
);
