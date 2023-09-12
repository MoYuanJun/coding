/* eslint-disable no-unused-vars */
import React, { useState, useCallback, Fragment } from 'react';
import { Card, Col, Row, Button } from 'antd';
import scss from './index.module.scss';

const initStr = '当谈到前端开发时, 无论是初学者还是经验丰富的开发者, 都能够感受到这个领域的迅速发展和变化。';
const addStr = '您有偏离的分支，需要指定如何调和它们。您可以在执行下一次';

const conds = '';

export default () => {
  const [text, setText] = useState(Array.from({ length: 100 }).fill(initStr));

  const handleAdd = useCallback((e) => {
    setText((pre) => [...Array.from({ length: 90 }).fill(addStr), ...pre]);
  }, []);

  return (
    <Row gutter={16}>
      <Col span={24}>
        <Button
          type='primary'
          onClick={handleAdd}>
          追加数据
        </Button>
        <br />
        <br />
      </Col>
      <Col span={8}>
        <Card
          width="200"
          bordered={false}
          title="滚动锚点问题"
          className={scss.card1}
          style={{ width: 500 }}>
          {text.map((v, index) => (
            <p key={index}>
              {v}
            </p>
          ))}
        </Card>
      </Col>
      <Col span={8}>
        <Card
          width="200"
          bordered={false}
          title="滚动锚点问题"
          className={scss.card2}
          style={{ width: 500 }}>
          {text.map((v, index) => (
            <p key={index}>
              {v}
            </p>
          ))}
        </Card>
      </Col>
    </Row>
  );
};
