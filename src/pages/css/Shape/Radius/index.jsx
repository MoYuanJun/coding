/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useMemo } from 'react';
import { Slider, Form, Select } from 'antd';
import scss from './index.module.scss';

const MAX_RADIUS_RADIUS = 800;

export default () => {
  const [setting, setSetting] = useState({
    topLeftX: 50,
    topLeftY: 50,
    topRightX: 50,
    topRightY: 50,
    bottomRightX: 50,
    bottomRightY: 50,
    bottomLeftX: 50,
    bottomLeftY: 50,
  });

  const boxStyle = useMemo(() => ({
    borderRadius: `${setting.topLeftX}px ${setting.topRightX}px ${setting.bottomRightX}px ${setting.bottomLeftX}px / ${setting.topLeftY}px ${setting.topRightY}px ${setting.bottomRightY}px ${setting.bottomLeftY}px`,
  }), [setting]);

  const handleChange = useCallback((key, value) => {
    setSetting((pre) => ({
      ...pre,
      [key]: value,
    }));
  }, []);

  return (
    <div className={scss.wrapper}>
      <div
        style={boxStyle}
        className={scss.box}
      />
      <div className={scss.controller}>
        {/* 水平半径 */}
        <Form.Item label="左上角水平半径">
          <Slider
            min={0}
            max={MAX_RADIUS_RADIUS}
            value={setting.topLeftX}
            onChange={handleChange.bind(null, 'topLeftX')}
          />
        </Form.Item>
        <Form.Item label="右上角水平半径">
          <Slider
            min={0}
            max={MAX_RADIUS_RADIUS}
            value={setting.topRightX}
            onChange={handleChange.bind(null, 'topRightX')}
          />
        </Form.Item>
        <Form.Item label="右下角水平半径">
          <Slider
            min={0}
            max={MAX_RADIUS_RADIUS}
            value={setting.bottomRightX}
            onChange={handleChange.bind(null, 'bottomRightX')}
          />
        </Form.Item>
        <Form.Item label="左下角水平半径">
          <Slider
            min={0}
            max={MAX_RADIUS_RADIUS}
            value={setting.bottomLeftX}
            onChange={handleChange.bind(null, 'bottomLeftX')}
          />
        </Form.Item>
        {/* 垂直半径  */}
        <Form.Item label="左上角垂直半径">
          <Slider
            min={0}
            max={MAX_RADIUS_RADIUS}
            value={setting.topLeftY}
            onChange={handleChange.bind(null, 'topLeftY')}
          />
        </Form.Item>
        <Form.Item label="右上角垂直半径">
          <Slider
            min={0}
            max={MAX_RADIUS_RADIUS}
            value={setting.topRightY}
            onChange={handleChange.bind(null, 'topRightY')}
          />
        </Form.Item>
        <Form.Item label="右下角垂直半径">
          <Slider
            min={0}
            max={MAX_RADIUS_RADIUS}
            value={setting.bottomRightY}
            onChange={handleChange.bind(null, 'bottomRightY')}
          />
        </Form.Item>
        <Form.Item label="左下角垂直半径">
          <Slider
            min={0}
            max={MAX_RADIUS_RADIUS}
            value={setting.bottomLeftY}
            onChange={handleChange.bind(null, 'bottomLeftY')}
          />
        </Form.Item>
      </div>
    </div>
  );
};
