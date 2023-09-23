/* eslint-disable no-unused-vars */
import React, {
  useMemo,
  useState,
  useCallback,
} from 'react';
import scss from './index.module.scss';

import { Slider, Form, Select } from 'antd';

const SETTING = [
  { defaultWidth: 120, label: '上边框', type: 'top', defaultColor: '#ff4d4f' },
  { defaultWidth: 120, label: '下边框', type: 'bottom',  defaultColor: '#ffc53d' },
  { defaultWidth: 120, label: '左边框', type: 'left', defaultColor: '#73d13d' },
  { defaultWidth: 120, label: '右边框', type: 'right', defaultColor: '#597ef7' },
];

const getDefaultColor = (type) => (
  SETTING.find((v) => v.type === type).defaultColor
);

const getDefaultWidth = (type) => (
  SETTING.find((v) => v.type === type).defaultWidth
);

const useStateHook = () => {
  const [setting, setSetting] = useState({
    width: 0,
    height: 0,
    top: {
      width: getDefaultWidth('top'),
      color: getDefaultColor('top'),
    },
    left: {
      width: getDefaultWidth('left'),
      color: getDefaultColor('left'),
    },
    right: {
      width: getDefaultWidth('right'),
      color: getDefaultColor('right'),
    },
    bottom: {
      width: getDefaultWidth('bottom'),
      color: getDefaultColor('bottom'),
    },
  });

  const onChangeBorderWidth = useCallback((type, value) => {
    setSetting({
      ...setting,
      [type]: { ...setting[type], width: value },
    });
  }, [setting]);

  const onChangeBorderColor = useCallback((type, value) => {
    setSetting({
      ...setting,
      [type]: { ...setting[type], color: value },
    });
  }, [setting]);

  const onChangeContainer = useCallback((type, value) => {
    setSetting({
      ...setting,
      [type]: value,
    });
  }, [setting]);

  const style = useMemo(() => ({
    width: setting.width,
    height: setting.height,
    borderColor: `
      ${setting.top.color}
      ${setting.right.color}
      ${setting.bottom.color}
      ${setting.left.color}
    `,
    borderWidth: `
      ${setting.top.width}px
      ${setting.right.width}px
      ${setting.bottom.width}px
      ${setting.left.width}px
    `,
  }), [setting]);

  return {
    style,
    setting,
    onChangeContainer,
    onChangeBorderColor,
    onChangeBorderWidth,
  };
};

export default () => {
  const state = useStateHook();

  return (
    <div className={scss.layout}>
      <div className={scss.main}>
        <div
          style={state.style}
          className={scss.body}
        />
      </div>
      <div className={scss.controller}>
        <Form.Item label="&emsp;容器宽度">
          <Slider
            min={0}
            max={200}
            defaultValue={0}
            onChange={state.onChangeContainer.bind(null, 'width')}
          />
        </Form.Item>
        <Form.Item label="容器高度">
          <Slider
            min={0}
            max={200}
            defaultValue={0}
            onChange={state.onChangeContainer.bind(null, 'height')}
          />
        </Form.Item>
        {SETTING.map((v) => (
          <React.Fragment key={v.type}>
            <Form.Item label={`${v.label}宽度`}>
              <Slider
                min={0}
                max={200}
                defaultValue={v.defaultWidth}
                onChange={state.onChangeBorderWidth.bind(null, v.type)}
              />
            </Form.Item>
            <Form.Item label="边框颜色">
              <Select
                style={{ width: '100%' }}
                defaultValue={v.defaultColor}
                onChange={state.onChangeBorderColor.bind(null, v.type)}>
                <Select.Option value={v.defaultColor}>
                  默认颜色(
                  {v.defaultColor}
                  )
                </Select.Option>
                <Select.Option value="transparent">
                  透明(transparent)
                </Select.Option>
              </Select>
            </Form.Item>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
