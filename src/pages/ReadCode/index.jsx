import React from 'react';
import demo from './demo';
import scss from './index.module.scss';

export default () => {
  React.useEffect(() => {
    demo();
    console.log('----------');
  }, []);

  return (
    <div className={scss['read-code']}>
      <canvas id = "textparticle"></canvas>
    </div>
  );
};
