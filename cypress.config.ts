import { defineConfig } from 'cypress';
import { devServer } from '@cypress/webpack-dev-server';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer(devServerConfig) {
      return devServer({
        ...devServerConfig,
        framework: 'react',
        webpackConfig: require('./webpack.config.js'),
      });
    },
  },
});
