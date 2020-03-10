import React from 'react';

const done = () => {
  const text = 'zabbcdef';
  const re = /ab/;
  const result = re.exec(text);
  
  console.log(result.index) // 1
  console.log(result.indices) // [ [1, 3] ]
};

export default () => (
  <div>
    {done()}
  </div>
);

export const path = ['es6', '小操场'];
