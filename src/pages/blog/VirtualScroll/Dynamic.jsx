/* eslint-disable no-unused-vars */
import React, { useCallback, useState, useEffect, useRef, useMemo } from 'react';
import scss from './static.module.scss';

const ITEM_SIZE = 40; // 每条数据高度、

// 模拟数据
const DATA_SOURCE = Array.from({ length: 100000 }, (_, i) => ({
  id: i,
  content: `第 ${i + 1}条数据`, // 内容
  height: Math.round(ITEM_SIZE + (Math.random() * 100)), // 当前数据高度
}));

const CONTENT_HEIGHT = DATA_SOURCE.length * ITEM_SIZE; // 列表内容总高度


const getStartIndex = ({ heights, scrollTop }) => {
  let total = 0;

  for (let i = 0; i < DATA_SOURCE.length; i += 1) {
    total += (heights[i] || ITEM_SIZE);

    if (total > scrollTop) {
      return i;
    }
  }
};

const getEndIndex = ({ heights, startIndex, clientHeight }) => {
  let total = 0;
  let index = startIndex;

  while (total < clientHeight) {
    total += (heights[index] || ITEM_SIZE);
    index += 1;
  }

  return index;
};

const getOffset = ({ heights, startIndex }) => {
  let total = 0;

  for (let i = 0; i < startIndex; i += 1) {
    total += (heights[i] || ITEM_SIZE);
  }

  return total;
};

const Row = ({ onResize, data }) => {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new ResizeObserver(onResize.bind(null, data));
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [onResize, data]);

  return (
    <div
      ref={ref}
      className={scss.item}
      style={{ height: data.height }}>
      {data.content}
    </div>
  );
};

export default () => {
  const containerRef = useRef();
  const [paddingTop, setPaddingTop] = useState(0);
  const [renderList, setRenderList] = useState([]);

  const [scrollTop, setScrollTop] = useState(0);
  const [heights, setHeights] = useState({  }); // index: 高度

  //
  const listHeight = useMemo(() => DATA_SOURCE.reduce((total, ele, index) => {
    const value = heights[index] || ITEM_SIZE;
    return total + value;
  }, 0), [heights]);

  const handleRowResize = useCallback((data, [resizeObserverEntry]) => {
    setHeights((pre) => ({
      ...pre,
      [data.id]: resizeObserverEntry.target.offsetHeight,
    }));
  }, []);

  const handler = useCallback(() => {
    const { clientHeight, scrollTop = 0 } = containerRef.current ?? {};

    // 要渲染的列表, 在源数据中的开始索引
    const startIndex = getStartIndex({ heights, scrollTop });

    // 要渲染的列表, 在源数据中的结束索引
    const endIndx = getEndIndex({ heights, startIndex, clientHeight });

    // 多减去 2 * ITEM_SIZE, 目前是想在顶部多 2 条缓冲数据
    const paddingTop = getOffset({ heights, startIndex });

    setPaddingTop(paddingTop);
    setRenderList(DATA_SOURCE.slice(startIndex, endIndx));
  }, [heights]);

  useEffect(() => {
    handler();
  }, [handler]);

  return (
    <div
      onScroll={handler}
      ref={containerRef}
      className={scss.wrapper}>
      <div
        className={scss.list}
        style={{ height: listHeight, paddingTop }}>
        {renderList.map((v) => (
          <Row
            data={v}
            key={v.id}
            onResize={handleRowResize}
          />
        ))}
      </div>
    </div>
  );
};
