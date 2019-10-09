import React from 'react';
import { configure, storiesOf } from '@storybook/react';
import route from '../src/route';

route.forEach(v => {
  const { path, page: Page } = v;
  const pathArr = path.split('/');
  storiesOf(pathArr.slice(0, -1).join('/'), module).add(pathArr.pop(), () => (<Page />));
});
