const webpackFinal = async (config, { configType }) => {
  config.module.rules = [
    ... config.module.rules, ... [
    { // 样式文件打包
      test: /\.scss$/,
      use: [
        'style-loader', {
          loader: 'css-loader',
          options: {
            sourceMap: false,
          }
        }, {
          loader: 'postcss-loader',
          options: { javascriptEnabled: true, sourceMap: false },
        }, {
          loader: 'sass-loader'
        }
      ],
    }
  ]];

  return config;
}

module.exports = {
  webpackFinal,
  stories: ['./**/*.stories.js'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
};
