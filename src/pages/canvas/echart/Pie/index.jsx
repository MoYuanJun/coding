import Pie from './pie';
import scss from './index.module.scss';
import React, { useRef, useEffect } from 'react';


export default () => {
  const container = useRef(null);

  useEffect(() => {
    const pie = new Pie(container.current, {});
    pie.init();
  }, []);
  return (
    <div className={scss.layout}>
      <div
        ref={container}
        style={{ height: 600, width: 600 }}
      />
    </div>
  );
};
