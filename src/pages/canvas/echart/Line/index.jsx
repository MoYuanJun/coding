import React, { useRef, useEffect } from 'react';
import Line from './line';

const data = [
  { name: '周一', value: 300 },
  { name: '周二', value: 250 },
  { name: '周三', value: 100 },
  { name: '周四', value: 220 },
  { name: '周五', value: 280 },
];

export default () => {
  const containerRef = useRef(null);


  useEffect(() => {
    const line = new Line({ data });
    line.init(containerRef.current);
    line.draw();
  }, []);

  return (
    <div ref={containerRef} style={{ width: 600, height: 500 }}></div>
  );
}