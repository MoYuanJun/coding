/* eslint-disable no-unused-vars */
import React, { useState, useCallback } from 'react';
import { Slider, Form, Select } from 'antd';
import scss from './index.module.scss';

export default () => {
  const [setting, setSetting] = useState({});

  const handleChange = useCallback(() => {

  }, []);

  return (
    <div className={scss.wrapper}>
      <div className={scss.box} />
      <div className={scss.controller}>
        <Form.Item label="宽度">
          <Slider
            min={0}
            max={200}
            defaultValue={0}
            onChange={handleChange.bind(null, 'width')}
          />
        </Form.Item>
        <Form.Item label="宽度">
          <Slider
            min={0}
            max={200}
            defaultValue={0}
            onChange={handleChange.bind(null, 'width')}
          />
        </Form.Item>
        <Form.Item label="宽度">
          <Slider
            min={0}
            max={200}
            defaultValue={0}
            onChange={handleChange.bind(null, 'width')}
          />
        </Form.Item>
      </div>
    </div>
  );
};
