import {join, dirname} from 'path';
import webpack from 'webpack';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')));
}

const config = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-onboarding'),
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-interactions'),
    {
      name: getAbsolutePath('@storybook/addon-react-native-web'),
      options: {
        modulesToTranspile: [
          'react-native-toast-message',
          'react-native-reanimated',
          'react-native-keyboard-aware-scroll-view',
        ],
        babelPlugins: [
          '@babel/plugin-proposal-export-namespace-from',
          'react-native-reanimated/plugin',
        ],
        babelPresets: [
          [
            '@babel/preset-env',
            {
              // Prevent Babel from transforming ES modules to another format
              modules: false,
              loose: true,
            },
          ],
        ],
      },
    },
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-webpack5'),
    options: {},
  },
  webpackFinal: async (config, { configType }) => {
    config.resolve = {
      ...config.resolve,
      fallback: {
        ...config.resolve?.fallback,
        os: require.resolve('os-browserify/browser'),
        tty: require.resolve('tty-browserify'),
      },
    };

    config.plugins = [
      ...(config.plugins || []),
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
    ];

    config.module.rules.push({
      test: /\.avif$/,
      type: 'asset',
      parser: {
        dataUrlCondition: {
          maxSize: 8 * 1024, // 8kb
        },
      },
    });

    return config;
  },
};
export default config;
