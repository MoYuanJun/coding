/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import scss from './com.module.scss';

export default () => {
  const [codes, setCodes] = useState(Array.from({ length: 6 }, () => ''));
  const inputsRef = useRef([]);

  return (
    <div>
      {codes.map((value, index) => (
        <input
          type="text"
          key={index}
          value={value}
          maxLength={1}
          className={scss.input}
          ref={(ele) => (inputsRef.current[index] = ele)}
        />
      ))}
    </div>
  );
};
