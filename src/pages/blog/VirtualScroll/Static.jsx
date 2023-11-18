/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useCallback, useState, useEffect, useRef } from 'react';
import scss from './static.module.scss';

const ITEM_SIZE = 40;
const DATA_SOURCE = Array.from({ length: 100000 }, (_, i) => `第 ${i + 1}条数据`);
const CONTENT_HEIGHT = DATA_SOURCE.length * ITEM_SIZE;

export default () => {
  const containerRef = useRef();
  const [paddingTop, setPaddingTop] = useState(0);
  const [renderList, setRenderList] = useState([]);

  const handler = useCallback((scrollTop) => {
    const { clientHeight } = containerRef.current ?? {};
    const remainder = scrollTop % ITEM_SIZE;

    // 要渲染的列表数量(多渲染 4 条作为缓冲数据)
    const renderNum = Math.ceil(clientHeight / ITEM_SIZE) + 4;

    // 要渲染的列表, 在源数据中的开始索引
    const startIndex = Math.floor(scrollTop / ITEM_SIZE);

    // 要渲染的列表, 在源数据中的结束索引
    const endIndx = startIndex + renderNum;

    // 多减去 2 * ITEM_SIZE, 目前是想在顶部多 2 条缓冲数据
    const paddingTop = Math.max(0, scrollTop - remainder - (2 * ITEM_SIZE));

    setPaddingTop(paddingTop);
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
