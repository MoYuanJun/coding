/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import React from 'react';
import Com from './Com';

export default () => {
  console.log('%c [ 1 ]-3', 'font-size:13px; background:pink; color:#bf2c9f;', 1);
  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', padding: 50  }}>
      <Com onValueChange={(codes) => console.log(codes)} />
    </div>
  );
};
