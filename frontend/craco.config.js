const webpack = require('webpack');
const path = require('path');
const CracoEnvPlugin = require('craco-plugin-env');

const resolvePath = p => path.resolve(__dirname, p);
require('dotenv').config({
  path: path.resolve(__dirname, '../.env'),
});

module.exports = {
  plugins: [
    {
      plugin: CracoEnvPlugin,
      options: {
        variables: process.env
      }
    }
  ],
  webpack: {
    configure: {
      resolve: {
        fallback: {
          process: require.resolve('process/browser'),
          zlib: require.resolve('browserify-zlib'),
          stream: require.resolve('stream-browserify'),
          util: require.resolve('util'),
          buffer: require.resolve('buffer'),
          asset: require.resolve('assert'),
        },
      },
      plugins: [
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
          process: 'process/browser',
        }),
      ],
    },
    alias: {
      '@components': resolvePath('./src/components'),
      '@svg-icons': resolvePath('./src/assets/icons/index.ts'),
      '@common': resolvePath('./src/components/common'),
      '@pages': resolvePath('./src/pages'),
      '@assets': resolvePath('./src/assets'),
      '@colors': resolvePath('./src/styles/colors.module.scss'),
      '@styles': resolvePath('./src/styles'),
      '@globalTypes': resolvePath('./src/globals.d.ts'),
      '@api': resolvePath('./src/api/Api.service.ts'),
      '@hooks': resolvePath('./src/hooks'),
      'ui-kit': resolvePath('./src/components/ui-kit'),
      '@services': resolvePath('./src/services'),
      '@stores': resolvePath('./src/stores'),
      '@images': resolvePath('./src/assets/img')
    },
  },
};
