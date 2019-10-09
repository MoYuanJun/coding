import React from 'react';
import { configure, storiesOf } from '@storybook/react';
import route from '../src/route';
// configure(require.context('../src', true, /\.stories\.js$/), module);

route.forEach(v => {
  const { path, page: Page } = v;
  const pathArr = path.split('/');
  storiesOf(pathArr[0], module).add(pathArr.slice(1).join('/'), () => (<Page />));
});
