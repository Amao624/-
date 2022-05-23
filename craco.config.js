const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // modifyVars: { '@primary-color': '#fff' },
            modifyVars: { '@primary-color': '#21b97a' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};