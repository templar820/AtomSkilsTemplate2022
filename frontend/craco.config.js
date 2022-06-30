const path = require('path');

const resolvePath = p => path.resolve(__dirname, p);

module.exports = {
  webpack: {
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
      '@services': resolvePath('./src/services')
    }
  },
};
