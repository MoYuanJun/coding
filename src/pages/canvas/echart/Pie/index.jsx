import React, { useRef, useEffect } from 'react';
import Pie from './pie';


export default () => {
  const container = useRef(null);
  
  useEffect(() => {
    const pie = new Pie(container.current, {});
    pie.init();
  }, []);
  return (
    <div ref={container} style={{ height: 600, width: 600 }}></div>
  );
}

export const path = ['Canvas', '图表', '饼图'];
