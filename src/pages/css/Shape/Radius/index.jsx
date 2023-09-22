/* eslint-disable no-unused-vars */
import React, { useState, useCallback } from 'react';
import { Slider, Form, Select } from 'antd';
import scss from './index.module.scss';

export default () => {
  const [setting, setSetting] = useState({
    topLeftX: 10,
    topLeftY: 10,
    topRightX: 10,
    topRightY: 10,
    bottomRightX: 10,
    bottomRightY: 10,
    bottomLeftX: 10,
    bottomLeftY: 10,
  });

  const handleChange = useCallback(() => {

  }, []);

  return (
    <div className={scss.wrapper}>
      <div className={scss.box} />
      <div className={scss.controller}>
        {/* 水平半径 */}
        <Form.Item label="左上角水平半径">
          <Slider
            min={0}
            max={200}
            value={setting.topLeftX}
            onChange={handleChange.bind(null, 'topLeftX')}
          />
        </Form.Item>
        <Form.Item label="右上角水平半径">
          <Slider
            min={0}
            max={200}
            value={setting.topRightX}
            onChange={handleChange.bind(null, 'topRightX')}
          />
        </Form.Item>
        <Form.Item label="右下角水平半径">
          <Slider
            min={0}
            max={200}
            value={setting.bottomRightX}
            onChange={handleChange.bind(null, 'bottomRightX')}
          />
        </Form.Item>
        <Form.Item label="左下角水平半径">
          <Slider
            min={0}
            max={200}
            value={setting.bottomLeftX}
            onChange={handleChange.bind(null, 'bottomLeftX')}
          />
        </Form.Item>
        {/* 垂直半径  */}
        <Form.Item label="左上角垂直半径">
          <Slider
            min={0}
            max={200}
            value={setting.topLeftY}
            onChange={handleChange.bind(null, 'topLeftY')}
          />
        </Form.Item>
        <Form.Item label="右上角垂直半径">
          <Slider
            min={0}
            max={200}
            value={setting.topRightY}
            onChange={handleChange.bind(null, 'topRightY')}
          />
        </Form.Item>
        <Form.Item label="右下角垂直半径">
          <Slider
            min={0}
            max={200}
            value={setting.bottomRightY}
            onChange={handleChange.bind(null, 'bottomRightY')}
          />
        </Form.Item>
        <Form.Item label="左下角垂直半径">
          <Slider
            min={0}
            max={200}
            value={setting.bottomLeftY}
            onChange={handleChange.bind(null, 'bottomLeftY')}
          />
        </Form.Item>
      </div>
    </div>
  );
};
