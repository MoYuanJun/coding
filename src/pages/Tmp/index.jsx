import React from 'react';

const done = () => {
  const target = { a: 1, b: 1 };

  const source1 = { b: 2, c: 2 };
  const source2 = { c: 3 };

  Object.assign(target, source1, source2);

  console.log(target);
};

export default () => (
  <div>
    {done()}
  </div>
);
