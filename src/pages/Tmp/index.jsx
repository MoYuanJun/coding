import React from 'react';

const done = () => {
  console.log(Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1);
  console.log(Number.MIN_SAFE_INTEGER === -Math.pow(2, 53) + 1);
};

export default () => (
  <div>
    {done()}
  </div>
);
