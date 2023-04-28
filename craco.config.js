const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components/'),
      '@common': path.resolve(__dirname, 'src/common/'),
      '@api': path.resolve(__dirname, 'src/api/'),
      '@customTypes': path.resolve(__dirname, 'src/types/'),
      '@state': path.resolve(__dirname, 'src/state/'),
      '@assets': path.resolve(__dirname, 'src/assets/'),
      '@layouts': path.resolve(__dirname, 'src/layouts/'),
      '@containers': path.resolve(__dirname, 'src/containers/'),
      '@config': path.resolve(__dirname, 'src/config/'),
    },
  },
};
