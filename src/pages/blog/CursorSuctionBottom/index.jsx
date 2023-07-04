/* eslint-disable no-unused-vars */
import { Button } from 'antd';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import scss from './index.module.scss';

const sourceStr = '一种常一种一种常一种见的见的见的见的反爬技反爬技反爬技反爬技术, 是术, 是术, 是术, 是网页与网页与网页与网页与前端字体文件前端字体文件前端字体文件前端字体文件配合完成的配合完成的配合完成的配合完成的反爬策略, 最反爬策略, 最反爬策略, 最反爬策略, 最早使用早使用早使用早使用字体反爬字体反爬字体反爬字体反爬技术的技术的技术的技术的有 58 同有 58 同有 58 同有 58 同城、汽城、汽城、汽城、汽车之家等等, 现车之家等等, 现车之家等等, 现车之家等等, 现在很多主流的网在很多主流的网在很多主流的网在很多主流的网站或 APP 也使用字体反站或 APP 也使用字体反站或 APP 也使用字体反站或 APP 也使用字体反爬技术为自身的网站或 A爬技术为自身的网站或 A爬技术为自身的网站或 A爬技术为自身的网站或 A的网站或 A爬技术为自身的网站或 APP 增加一种反爬措施PP 增加一种反爬措施PP 增加一种反爬措施PP 增加一种反爬措施';

export default () => {
  const viewRef = useRef();
  const cursorRef = useRef();
  const [value, setValue] = useState('');

  // 设置光标位置
  const setCursor = useCallback(() => {
    const { current: viewDom }  = viewRef;
    const offset =
      viewDom.scrollHeight -
      viewDom.scrollTop -
      viewDom.clientHeight;

    // 如果当前滚动条在底部(<50) 则需要将光标滚动到视口
    if (offset < 50) {
      cursorRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // 追加内容
  const handle = useCallback(async () => {
    setValue('');

    for (const item of [...sourceStr]) {
      setValue((pre) => `${pre}${item}`);
      setCursor();
      await new Promise((resolve) => setTimeout(resolve, 200 * Math.random()));
    }
  }, [setCursor]);

  useEffect(() => {
    handle();
  }, [handle]);

  return (
    <>
      <div
        ref={viewRef}
        className={scss.wrapper}>
        {value}
        {value === sourceStr ? null :  (
          <span
            ref={cursorRef}
            className={scss.cursor}
          />
        )}
      </div>
      <Button
        type="primary"
        onClick={handle}>
        重置
      </Button>
    </>
  );
};
