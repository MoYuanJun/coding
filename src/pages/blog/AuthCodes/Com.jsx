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

  const handleDelete = useCallback((index, event) => {
    const { key } = event;

    // 是否按下删除键, 否提前结束
    if (key !== 'Backspace') {
      return;
    }

    // 1. 如果当前输入框有值, 则删除当前输入框内容
    if (codes[index]) {
      setCodes((pre) => {
        const newData = [...pre];
        newData[index] = '';
        return newData;
      });
    } else if (index > 0) {
      // 2. 如果当前输入框没有值(考虑下边界的情况 index === 0): 则删除上一个输入框内容, 并且光标聚焦到上一个输入框
      setCodes((pre) => {
        const newData = [...pre];
        newData[index - 1] = '';
        return newData;
      });
      inputsRef.current[index - 1].focus();
    }
  }, [codes]);

  const handlePaste = useCallback((event) => {
    const pastedValue = event.clipboardData.getData('Text'); // 读取剪切板数据
    const pastNum = pastedValue.replace(/[^0-9]/g, ''); // 去除数据中非数字部分, 只保留数字

    // 重新生成 code: 6 位, 每一位取剪切板对应位置的数字, 没有则置空
    const newData = Array.from(
      { length: 6 },
      (_, index) => pastNum.charAt(index) || '',
    );

    setCodes(newData); // 修改状态 codes

    // 光标要聚焦的输入框的索引, 这里取 pastNum.length 和 5 的最小值即可, 当索引为 5 就表示最后一个输入框了
    const focusIndex = Math.min(pastNum.length, 5);
    inputsRef.current[focusIndex]?.focus();
  }, []);

  return (
    <div>
      {codes.map((value, index) => (
        <input
          type="text"
          key={index}
          value={value}
          maxLength={1}
          onPaste={handlePaste}
          className={scss.input}
          onKeyDown={handleDelete.bind(null, index)}
          onChange={handleChange.bind(null, index)}
          ref={(ele) => (inputsRef.current[index] = ele)}
        />
      ))}
    </div>
  );
};
