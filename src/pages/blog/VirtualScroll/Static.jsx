/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useCallback, useState, useEffect, useRef } from 'react';
import scss from './static.module.scss';

const ITEM_SIZE = 40; // 每条数据高度
const DATA_SOURCE = Array.from({ length: 100000 }, (_, i) => `第 ${i + 1}条数据`); // 模拟数据
const CONTENT_HEIGHT = DATA_SOURCE.length * ITEM_SIZE; // 列表内容总高度

export default () => {
  const containerRef = useRef();
  const [paddingTop, setPaddingTop] = useState(0);
  const [renderList, setRenderList] = useState([]);

  const handler = useCallback((scrollTop) => {
    const { clientHeight } = containerRef.current ?? {};
    const remainder = scrollTop % ITEM_SIZE;

    // 要渲染的列表, 在源数据中的开始索引
    const startIndex = Math.floor(scrollTop / ITEM_SIZE);

    // 要渲染的列表数量
    const renderNum = Math.ceil(clientHeight / ITEM_SIZE) + (remainder !== 0 ? 1 : 0);

    // 要渲染的列表, 在源数据中的结束索引
    const endIndx = startIndex + renderNum;

    setPaddingTop(startIndex * ITEM_SIZE);
    setRenderList(DATA_SOURCE.slice(startIndex, endIndx));
  }, []);

  const handleScroll = useCallback((e) => {
    handler(e.target.scrollTop);
  }, [handler]);

  useEffect(() => {
    handler(0);
  }, [handler]);

  return (
    <div
      ref={containerRef}
      className={scss.wrapper}
      onScroll={handleScroll}>
      <div
        className={scss.list}
        style={{ height: CONTENT_HEIGHT, paddingTop }}>
        {renderList.map((v, index) => (
          <div
            key={index}
            className={scss.item}>
            {v}
          </div>
        ))}
      </div>
    </div>
  );
};
