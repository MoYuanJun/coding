import React from 'react';
import { storiesOf } from '@storybook/react';

const files = require.context('../', true, /.*\.page\.jsx?/);
const models = files.keys().forEach(key => {
  const { default: Component, path } = files(key);
  storiesOf(path.slice(0, -1).join('/'), module).add(
    path[path.length - 1], 
    () => (<Component/>)
  );
}, []);
