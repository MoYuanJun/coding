import * as pages from '../pages';

export default {
  logo: { img: void 0, title: 'Coding' },
  iconFont: '//at.alicdn.com/t/font_1732251_i4cfzbz65vj.js',
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
      title: '源码阅读',
      key: 'readCode',
      icon: 'iconlianxi',
      url: '/canvas/particle/readCode',
      router: [
        {
          component: pages.ReadCode,
          path: '/canvas/particle/readCode',
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
      key: 'css',
      title: 'CSS',
      icon: 'iconCSS-',
      children: [
        {
          title: '练习',
          icon: 'iconlianxi',
          key: 'cssPractice',
          url: '/css/practice',
          router: [
            {
              path: '/css/practice',
              component: pages.CssPractice,
            },
          ],
        },
        {
          title: '形状',
          key: 'cssShape',
          icon: 'iconxingzhuang',
          url: '/css/shape',
          router: [
            {
              path: '/css/shape',
              component: pages.Shape,
            },
          ],
        },
        {
          title: '键盘',
          key: 'css-demo-keyboard',
          url: '/css/demo/keyboard',
          icon: 'iconjianpan',
          router: [
            {
              component: pages.Keyboard,
              path: '/css/demo/keyboard',
            },
          ],
        },
        {
          title: '游戏机',
          icon: 'iconyouxiji',
          key: 'css-demo-gamingConsole',
          url: '/css/demo/gamingConsole',
          router: [
            {
              component: pages.GamingConsole,
              path: '/css/demo/gamingConsole',
            },
          ],
        },
        {
          title: '选项卡栏交互',
          icon: 'iconxuanxiangqia',
          key: 'css-demo-tabBarInteraction',
          url: '/css/demo/TabBarInteraction',
          router: [
            {
              component: pages.TabBarInteraction,
              path: '/css/demo/tabBarInteraction',
            },
          ],
        },
        {
          title: 'MacOS 控制中心',
          icon: 'iconxuanxiangqia',
          key: 'cssMacOSControlCenter',
          url: '/css/macOSControlCenter',
          router: [
            {
              path: '/css/macOsControlCenter',
              component: pages.MacOSControlCenter,
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
              router: [
                {
                  component: pages.Clock,
                  path: '/canvas/demo/clock',
                },
              ],
            },
            {
              title: '放大镜',
              key: 'magnifier',
              url: '/canvas/demo/magnifier',
              router: [
                {
                  component: pages.Magnifier,
                  path: '/canvas/demo/magnifier',
                },
              ],
            },
            {
              title: '刮刮卡',
              key: 'scratch',
              url: '/canvas/demo/scratch',
              router: [
                {
                  component: pages.Scratch,
                  path: '/canvas/demo/scratch',
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
              key: 'dynamicLine',
              url: '/canvas/particle/dynamicLine',
              router: [
                {
                  component: pages.DynamicLine,
                  path: '/canvas/particle/dynamicLine',
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
            {
              title: '气泡跟随',
              key: 'followBubbles',
              url: '/canvas/particle/followBubbles',
              router: [
                {
                  component: pages.FollowBubbles,
                  path: '/canvas/particle/followBubbles',
                },
              ],
            },
            {
              title: '文字消散',
              key: 'textDissipation',
              url: '/canvas/particle/textDissipation',
              router: [
                {
                  component: pages.TextDissipation,
                  path: '/canvas/particle/textDissipation',
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
          router: [
            {
              path: '/three/practice',
              component: pages.ThreePractice,
            },
          ],
        },
      ],
    },
  ],
};
