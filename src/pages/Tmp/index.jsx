/* eslint-disable no-unused-vars */
import React, { useRef, useEffect } from 'react';

export default () => {
  const inputRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      console.log('手动绑定:', e.target.value);
    };

    inputRef.current.addEventListener('change', handler);

    return () => document.removeEventListener('change', handler);
  }, []);

  return (
    <input
      ref={inputRef}
      onChange={(e) => console.log('React 绑定事件: ', e.target.value)}
    />
  );
};
