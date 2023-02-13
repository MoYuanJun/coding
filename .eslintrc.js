const path = require('path');

module.exports = {
  settings: {
    react: { version: '16' },
  },
  extends: [path.resolve(__dirname, './node_modules/@kunlunxu/create-react-app/.eslintrc.js')],
};
