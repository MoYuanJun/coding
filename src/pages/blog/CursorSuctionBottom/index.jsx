/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useEffect, useRef } from 'react';
import scss from './index.module.scss';

const data = '一种常一种一种常一种见的见的见的见的反爬技反爬技反爬技反爬技术, 是术, 是术, 是术, 是网页与网页与网页与网页与前端字体文件前端字体文件前端字体文件前端字体文件配合完成的配合完成的配合完成的配合完成的反爬策略, 最反爬策略, 最反爬策略, 最反爬策略, 最早使用早使用早使用早使用字体反爬字体反爬字体反爬字体反爬技术的技术的技术的技术的有 58 同有 58 同有 58 同有 58 同城、汽城、汽城、汽城、汽车之家等等, 现车之家等等, 现车之家等等, 现车之家等等, 现在很多主流的网在很多主流的网在很多主流的网在很多主流的网站或 APP 也使用字体反站或 APP 也使用字体反站或 APP 也使用字体反站或 APP 也使用字体反爬技术为自身的网站或 A爬技术为自身的网站或 A爬技术为自身的网站或 A爬技术为自身的网站或 A的网站或 A爬技术为自身的网站或 APP 增加一种反爬措施PP 增加一种反爬措施PP 增加一种反爬措施PP 增加一种反爬措施'.split('');

export default () => {
  const viewRef = useRef();
  const cursorRef = useRef();
  const [value, setValue] = useState('');

  const setCursor = useCallback(() => {
    const { current: viewDom }  = viewRef;
    const offset =
      viewDom.scrollHeight -
      viewDom.scrollTop -
      viewDom.clientHeight;

    if (offset < 50) {
      cursorRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handled = useCallback(async () => {
    for (const item of data) {
      setValue((pre) => `${pre}${item}`);
      setCursor();
      await new Promise((resolve) => setTimeout(resolve, 200 * Math.random()));
    }
  }, [setCursor]);

  useEffect(() => {
    handled();
  }, [handled]);

  return (
    <div
      ref={viewRef}
      className={scss.wrapper}>
      {value}
      <span
        ref={cursorRef}
        className={scss.cursor}
      />
    </div>
  );
};
