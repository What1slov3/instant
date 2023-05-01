const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@shared': path.resolve(__dirname, 'src/shared/'),
      '@pages': path.resolve(__dirname, 'src/pages/'),
      '@app': path.resolve(__dirname, 'src/app/'),
      '@features': path.resolve(__dirname, 'src/features/'),
      '@entities': path.resolve(__dirname, 'src/entities/'),
      '@widgets': path.resolve(__dirname, 'src/widgets/'),
      '@processes': path.resolve(__dirname, 'src/processes/'),
    },
  },
};
