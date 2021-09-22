import React from 'react';
import scss from './index.module.scss';

/**
 * 1. 利用文本围绕浮动元素特性, 来定位展开更多按钮
 * 2. 利用多个浮动, 以及清除浮动特性来使得展开按钮固定底部
 * 3. 在元素未设置高度情况下, 通过外层包一个 div 并设置 `display: flex;` 来使得子元素支持百分比(相对于高度)
 * 4. 通过 checkbox 来记录展开收起状态
 * 5. 通在文本后定位一个区块(display: inline-block;) 作为遮罩, 在文本较少时遮住展开按钮
 */
export default () => (
  <div className={scss.wrapper}>
    <input type="checkbox" name="" id="checkbox" />
    <div className={scss.content}>
      <label htmlFor="checkbox" className={scss.btn} />
      说实话，之前单独看这个布局，
      即使借助 JavaScript 也不是一件容易的事啊（需要计算文字宽度动态截取文本，vue-clamp就是这么做的），更别说下面的交互和判断逻辑了，不过经过我的一番琢磨，其实纯 CSS 也能完美实现的，下面就一步一步来看看如何实现吧~
    </div>
  </div>
);
