/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useCallback } from 'react';
import scss from './com.module.scss';

export default () => {
  const [codes, setCodes] = useState(Array.from({ length: 6 }, () => ''));
  const inputsRef = useRef([]);

  const handleChange = useCallback((index, event) => {
    const currentValue = event.target.value.match(/[0-9]{1}/)
      ? event.target.value
      : '';

    // 如果输入有效值, 则自动聚焦到下一个输入框
    if (currentValue) {
      inputsRef.current[index + 1]?.focus();
    }

    setCodes((pre) => {
      const newData = [...pre];
      newData[index] = currentValue;
      return newData;
    });
  }, []);

  return (
    <div>
      {codes.map((value, index) => (
        <input
          type="text"
          key={index}
          value={value}
          maxLength={1}
          className={scss.input}
          onChange={handleChange.bind(null, index)}
          ref={(ele) => (inputsRef.current[index] = ele)}
        />
      ))}
    </div>
  );
};
