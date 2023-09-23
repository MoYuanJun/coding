/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useMemo } from 'react';
import { Slider, Form, Select, Card, Button } from 'antd';
import scss from './index.module.scss';

const MAX_RADIUS_RADIUS = 800;
const COLOR = {
  BG: '#91caff',
  BORDER_TOP: '#ff4d4f',
  BORDER_RIGHT: '#597ef7',
  BORDER_BOTTOM: '#ffc53d',
  BORDER_LEFT: '#73d13d',
};

const DEFAULT_SETTING = {
  width: 300,
  height: 150,
  bg: COLOR.BG,

  // 圆角
  topLeftX: 50,
  topLeftY: 50,
  topRightX: 50,
  topRightY: 50,
  bottomRightX: 50,
  bottomRightY: 50,
  bottomLeftX: 50,
  bottomLeftY: 50,

  // 边框
  borderTopSize: 10,
  borderTopColor: COLOR.BORDER_TOP,
  borderRightSize: 10,
  borderRightColor: COLOR.BORDER_RIGHT,
  borderBottomSize: 10,
  borderBottomColor: COLOR.BORDER_BOTTOM,
  borderLeftSize: 10,
  borderLeftColor: COLOR.BORDER_LEFT,
};

export default () => {
  const [setting, setSetting] = useState(DEFAULT_SETTING);

  const boxStyle = useMemo(() => ({
    width: setting.width,
    height: setting.height,
    background: setting.bg,
    borderTop: `${setting.borderTopSize}px solid ${setting.borderTopColor}`,
    borderBottom: `${setting.borderBottomSize}px solid ${setting.borderBottomColor}`,
    borderLeft: `${setting.borderLeftSize}px solid ${setting.borderLeftColor}`,
    borderRight: `${setting.borderRightSize}px solid ${setting.borderRightColor}`,
    borderRadius: `${setting.topLeftX}px ${setting.topRightX}px ${setting.bottomRightX}px ${setting.bottomLeftX}px / ${setting.topLeftY}px ${setting.topRightY}px ${setting.bottomRightY}px ${setting.bottomLeftY}px`,
  }), [setting]);

  const handleChange = useCallback((key, value) => {
    setSetting((pre) => ({
      ...pre,
      [key]: value,
    }));
  }, []);

  return (
    <Card
      title="圆角"
      bordered={false}
      extra={(
        <Button
          size='small'
          type="primary"
          onClick={setSetting.bind(null, DEFAULT_SETTING)}>
          重置
        </Button>
      )}>
      <div className={scss.wrapper}>
        <div className={scss.main}>
          <div
            style={boxStyle}
            className={scss.box}
          />
        </div>
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

          {/* 边框 */}
          <Form.Item
            span={12}
            label="上边框宽度">
            <Slider
              min={0}
              max={200}
              value={setting.borderTopSize}
              onChange={handleChange.bind(null, 'borderTopSize')}
            />
          </Form.Item>
          <Form.Item
            span={12}
            label="上边框颜色">
            <Select
              style={{ width: '100%' }}
              value={setting.borderTopColor}
              onChange={handleChange.bind(null, 'borderTopColor')}>
              <Select.Option value={COLOR.BORDER_TOP}>
                实色
              </Select.Option>
              <Select.Option value="transparent">
                透明
              </Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            span={12}
            label="下边框宽度">
            <Slider
              min={0}
              max={200}
              value={setting.borderBottomSize}
              onChange={handleChange.bind(null, 'borderBottomSize')}
            />
          </Form.Item>
          <Form.Item
            span={12}
            label="下边框颜色">
            <Select
              style={{ width: '100%' }}
              value={setting.borderBottomColor}
              onChange={handleChange.bind(null, 'borderBottomColor')}>
              <Select.Option value={COLOR.BORDER_BOTTOM}>
                实色
              </Select.Option>
              <Select.Option value="transparent">
                透明
              </Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            span={12}
            label="左边框宽度">
            <Slider
              min={0}
              max={200}
              value={setting.borderLeftSize}
              onChange={handleChange.bind(null, 'borderLeftSize')}
            />
          </Form.Item>
          <Form.Item
            span={12}
            label="左边框颜色">
            <Select
              style={{ width: '100%' }}
              value={setting.borderLeftColor}
              onChange={handleChange.bind(null, 'borderLeftColor')}>
              <Select.Option value={COLOR.BORDER_LEFT}>
                实色
              </Select.Option>
              <Select.Option value="transparent">
                透明
              </Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            span={12}
            label="右边框宽度">
            <Slider
              min={0}
              max={200}
              value={setting.borderRightSize}
              onChange={handleChange.bind(null, 'borderRightSize')}
            />
          </Form.Item>
          <Form.Item
            span={12}
            label="右边框颜色">
            <Select
              style={{ width: '100%' }}
              value={setting.borderRightColor}
              onChange={handleChange.bind(null, 'borderRightColor')}>
              <Select.Option value={COLOR.BORDER_RIGHT}>
                实色
              </Select.Option>
              <Select.Option value="transparent">
                透明
              </Select.Option>
            </Select>
          </Form.Item>
          {/* 宽高 */}
          <Form.Item label="宽度">
            <Slider
              min={0}
              max={400}
              value={setting.width}
              onChange={handleChange.bind(null, 'width')}
            />
          </Form.Item>
          <Form.Item label="高度">
            <Slider
              min={0}
              max={200}
              value={setting.height}
              onChange={handleChange.bind(null, 'height')}
            />
          </Form.Item>
          <Form.Item label="背景颜色">
            <Select
              value={setting.bg}
              style={{ width: '100%' }}
              onChange={handleChange.bind(null, 'bg')}>
              <Select.Option value={COLOR.BG}>
                实色
              </Select.Option>
              <Select.Option value="transparent">
                透明
              </Select.Option>
            </Select>
          </Form.Item>
        </div>
      </div>
    </Card>

  );
};
