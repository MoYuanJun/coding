import React from 'react';

import Home from './src/pages/Home'; // 首页
import Tmp from './src/pages/Tmp'; // 临时练习
import ReadCode from './src/pages/ReadCode'; // 源码解读

// canvas
import Clock from './src/pages/canvas/demo/Clock';
import Scratch from './src/pages/canvas/demo/Scratch';
import Magnifier from './src/pages/canvas/demo/Magnifier';
import PictureHandle from './src/pages/canvas/demo/PictureHandle';
import Bar from './src/pages/canvas/echart/Bar';
import Pie from './src/pages/canvas/echart/Pie';
import Line from './src/pages/canvas/echart/Line';
import Honeycomb from './src/pages/canvas/particle/Honeycomb';
import DynamicLine from './src/pages/canvas/particle/DynamicLine';
import FollowBubbles from './src/pages/canvas/particle/FollowBubbles';
import TextDissipation from './src/pages/canvas/particle/TextDissipation';
import G6Research from './src/pages/canvas/g6/Research';

// three
import ThreePractice from './src/pages/three/Practice';

// css
import Shape from './src/pages/css/Shape';
import Keyboard from './src/pages/css/Keyboard';
import CssPractice from './src/pages/css/Practice';
import GamingConsole from './src/pages/css/GamingConsole';
import TabBarInteraction from './src/pages/css/TabBarInteraction';
import MacOSControlCenter from './src/pages/css/MacOSControlCenter';
import MoreText from './src/pages/css/MoreText';

// 博客 DEMO
import BlogCrawler from './src/pages/blog/Crawler';
import IntermediateEllipsis from './src/pages/blog/IntermediateEllipsis';
import BlogCursorSuctionBottom from './src/pages/blog/CursorSuctionBottom';

import './src/assets/style';

export default {
  logo: { img: void 0, title: 'Coding' },
  iconFont: '//at.alicdn.com/t/font_1732251_i4cfzbz65vj.js',
  menu: [
    {
      url: '/',
      key: 'home',
      title: '首页',
      icon: 'HomeOutlined',
      routes: [
        {
          path: '/',
          exact: true,
          element: <Home />,
        },
      ],
    },
    {
      key: 'blog',
      title: '博客 DEMO',
      icon: 'HomeOutlined',
      children: [
        {
          title: '反爬',
          icon: 'iconlianxi',
          key: 'blogCrawler',
          url: '/blog/crawler',
          routes: [
            {
              path: '/blog/crawler',
              element: <BlogCrawler />,
            },
          ],
        },
        {
          title: '光标吸底',
          icon: 'iconlianxi',
          key: 'blogBlogCursorSuctionBottom',
          url: '/blog/cursor-suction-bottom',
          routes: [
            {
              path: '/blog/cursor-suction-bottom',
              element: <BlogCursorSuctionBottom />,
            },
          ],
        },
        {
          title: '文本超出中间省略',
          icon: 'iconlianxi',
          key: 'intermediateEllipsis',
          url: '/blog/intermediate-ellipsis',
          routes: [
            {
              path: '/blog/intermediate-ellipsis',
              element: <IntermediateEllipsis />,
            },
          ],
        },
      ],
    },
    {
      title: '源码阅读',
      key: 'readCode',
      icon: 'iconlianxi',
      url: '/canvas/particle/readCode',
      routes: [
        {
          element: <ReadCode/>,
          path: '/canvas/particle/readCode',
        },
      ],
    },
    {
      url: '/tmp',
      key: 'tmp',
      title: '临时练习',
      icon: 'iconlianxi',
      routes: [
        {
          path: '/tmp',
          element: <Tmp/>,
        },
      ],
    },
    {
      key: 'css',
      title: 'CSS',
      icon: 'iconCSS-',
      children: [
        {
          title: '练习',
          icon: 'iconlianxi',
          key: 'cssPractice',
          url: '/css/practice',
          routes: [
            {
              path: '/css/practice',
              element: <CssPractice/>,
            },
          ],
        },
        {
          title: '形状',
          key: 'cssShape',
          icon: 'iconxingzhuang',
          url: '/css/shape',
          routes: [
            {
              path: '/css/shape',
              element: <Shape/>,
            },
          ],
        },
        {
          title: '键盘',
          key: 'css-demo-keyboard',
          url: '/css/demo/keyboard',
          icon: 'iconjianpan',
          routes: [
            {
              element: <Keyboard/>,
              path: '/css/demo/keyboard',
            },
          ],
        },
        {
          title: '游戏机',
          icon: 'iconyouxiji',
          key: 'css-demo-gamingConsole',
          url: '/css/demo/gamingConsole',
          routes: [
            {
              element: <GamingConsole/>,
              path: '/css/demo/gamingConsole',
            },
          ],
        },
        {
          title: '选项卡栏交互',
          icon: 'iconxuanxiangqia',
          key: 'css-demo-tabBarInteraction',
          url: '/css/demo/TabBarInteraction',
          routes: [
            {
              element: <TabBarInteraction/>,
              path: '/css/demo/tabBarInteraction',
            },
          ],
        },
        {
          title: 'MacOS 控制中心',
          icon: 'iconxuanxiangqia',
          key: 'cssMacOSControlCenter',
          url: '/css/macOSControlCenter',
          routes: [
            {
              path: '/css/macOsControlCenter',
              element: <MacOSControlCenter/>,
            },
          ],
        },
        {
          title: '纯 CSS 多文本处理(展开更多)',
          icon: 'iconxuanxiangqia',
          key: 'css',
          url: '/css/moreText',
          routes: [
            {
              path: '/css/moreText',
              element: <MoreText/>,
            },
          ],
        },
      ],
    },
    {
      key: 'canvas',
      title: 'canvas',
      icon: 'iconCanvas',
      children: [
        {
          key: 'demo',
          title: 'DEMO',
          icon: 'icondemo',
          children: [
            {
              title: '时钟',
              key: 'clock',
              url: '/canvas/demo/clock',
              routes: [
                {
                  element: <Clock/>,
                  path: '/canvas/demo/clock',
                },
              ],
            },
            {
              title: '放大镜',
              key: 'magnifier',
              url: '/canvas/demo/magnifier',
              routes: [
                {
                  element: <Magnifier/>,
                  path: '/canvas/demo/magnifier',
                },
              ],
            },
            {
              title: '刮刮卡',
              key: 'scratch',
              url: '/canvas/demo/scratch',
              routes: [
                {
                  element: <Scratch/>,
                  path: '/canvas/demo/scratch',
                },
              ],
            },
            {
              title: '图片处理',
              key: 'picture-handle',
              url: '/canvas/demo/picture-handle',
              routes: [
                {
                  element: <PictureHandle/>,
                  path: '/canvas/demo/picture-handle',
                },
              ],
            },
          ],
        },
        {
          key: 'echart',
          title: '图表',
          icon: 'icontubiao',
          children: [
            {
              title: '折线图',
              key: 'line',
              url: '/canvas/echart/line',
              routes: [
                {
                  element: <Line/>,
                  path: '/canvas/echart/line',
                },
              ],
            },
            {
              key: 'bar',
              title: '柱状图',
              url: '/canvas/echart/bar',
              routes: [
                {
                  element: <Bar/>,
                  path: '/canvas/echart/bar',
                },
              ],
            },
            {
              key: 'pie',
              title: '饼图',
              url: '/canvas/echart/pie',
              routes: [
                {
                  element: <Pie/>,
                  path: '/canvas/echart/pie',
                },
              ],
            },
          ],
        },
        {
          key: 'particle',
          icon: 'iconlizi',
          title: '粒子',
          children: [
            {
              title: '动态线条',
              key: 'dynamicLine',
              url: '/canvas/particle/dynamicLine',
              routes: [
                {
                  element: <DynamicLine/>,
                  path: '/canvas/particle/dynamicLine',
                },
              ],
            },
            {
              title: '多彩蜂窝',
              key: 'honeycomb',
              url: '/canvas/particle/honeycomb',
              routes: [
                {
                  element: <Honeycomb/>,
                  path: '/canvas/particle/honeycomb',
                },
              ],
            },
            {
              title: '气泡跟随',
              key: 'followBubbles',
              url: '/canvas/particle/followBubbles',
              routes: [
                {
                  element: <FollowBubbles/>,
                  path: '/canvas/particle/followBubbles',
                },
              ],
            },
            {
              title: '文字消散',
              key: 'textDissipation',
              url: '/canvas/particle/textDissipation',
              routes: [
                {
                  element: <TextDissipation/>,
                  path: '/canvas/particle/textDissipation',
                },
              ],
            },
          ],
        },
        {
          key: 'g6',
          icon: 'iconlizi',
          title: 'G6',
          children: [
            {
              title: '文档阅读',
              key: 'g6Research',
              url: '/canvas/g6/research',
              routes: [
                {
                  element: <G6Research/>,
                  path: '/canvas/g6/research',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      key: 'three',
      title: 'Three',
      icon: 'iconthreed-',
      children: [
        {
          title: '练习',
          icon: 'iconlianxi',
          key: 'threePractice',
          url: '/three/practice',
          routes: [
            {
              path: '/three/practice',
              element: <ThreePractice/>,
            },
          ],
        },
      ],
    },
  ],
};
