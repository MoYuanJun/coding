import React from 'react';
import demo from './demo';
import scss from './index.module.scss';

export default () => {
  React.useEffect(() => {
    demo();
  }, []);

  return (
    <div>
      1111
      <canvas id="canvas" className={scss.canvas}></canvas>
    </div>
  );
};
