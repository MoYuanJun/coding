import React, { useRef, useEffect } from 'react';
import Line from './line';

export default () => {
  const containerRef = useRef(null);


  useEffect(() => {
    const line = new Line();
    line.init(containerRef.current);
  }, []);

  return (
    <div ref={containerRef} style={{ width: 600, height: 500 }}></div>
  );
}