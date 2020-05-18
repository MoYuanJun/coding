import React from 'react';

const done = () => {
  const a = 2172141653n;
  const b = 15346349309n;

  console.log('-------------->>>', a * b);
  console.log('-------------->>>', Number(a) * Number(b));
  console.log(a * b === Number(a) * Number(b));
};

export default () => (
  <div>
    {done()}
  </div>
);
