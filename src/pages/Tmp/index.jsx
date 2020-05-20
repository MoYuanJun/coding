import React from 'react';

const done = () => {
  console.log('-------------->>>', !1n);
  console.log('-------------->>>', !0n);
  console.log('-------------->>>', !!1n);
  console.log('-------------->>>', !!0n);
};

export default () => (
  <div>
    {done()}
  </div>
);
