import * as pages from '../pages';

export default {
  logo: { img: void 0, title: '练习室' },
  iconFont: '//at.alicdn.com/t/font_1732251_st9gwlsozhd.js',
  menu: [
    {
      url: '/',
      key: 'home',
      title: '首页',
      icon: 'HomeOutlined',
      router: [
        {
          path: '/',
          exact: true,
          component: pages.Home,
        },
      ],
    },
    {
      url: '/tmp',
      key: 'tmp',
      title: '临时练习',
      icon: 'iconlianxi',
      router: [
        {
          path: '/tmp',
          component: pages.Tmp,
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
              router: [
                {
                  component: pages.Clock,
                  path: '/canvas/demo/clock',
                },
              ],
            },
            {
              title: '图片处理',
              key: 'picture-handle',
              url: '/canvas/demo/picture-handle',
              router: [
                {
                  component: pages.PictureHandle,
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
              router: [
                {
                  component: pages.Line,
                  path: '/canvas/echart/line',
                },
              ],
            },
            {
              key: 'bar',
              title: '柱状图',
              url: '/canvas/echart/bar',
              router: [
                {
                  component: pages.Bar,
                  path: '/canvas/echart/bar',
                },
              ],
            },
            {
              key: 'pie',
              title: '饼图',
              url: '/canvas/echart/pie',
              router: [
                {
                  component: pages.Pie,
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
              key: 'dynamic-line',
              url: '/canvas/particle/dynamic-line',
              router: [
                {
                  component: pages.DynamicLine,
                  path: '/canvas/particle/dynamic-line',
                },
              ],
            },
            {
              title: '多彩蜂窝',
              key: 'honeycomb',
              url: '/canvas/particle/honeycomb',
              router: [
                {
                  component: pages.Honeycomb,
                  path: '/canvas/particle/honeycomb',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};