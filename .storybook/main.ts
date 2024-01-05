const webpack = require("webpack");
const path = require("path");

export type Options = {
  modulesToTranspile?: string[];
  modulesToAlias?: { [key: string]: string };
  babelPlugins?: string[];
  projectRoot?: string;
};

export const getBabelPlugins = (options: Options) => {
  return ['react-native-web', "react-native-reanimated/plugin"];
};

const getModule = (name: string) => path.join('node_modules', name);

// copied from https://github.com/expo/expo-cli/blob/master/packages/webpack-config/src/loaders/createBabelLoader.ts
const DEFAULT_INCLUDES = [
  getModule('react-native'),
  getModule('react-navigation'),
  getModule('expo'),
  getModule('unimodules'),
  getModule('@react'),
  getModule('@expo'),
  getModule('@use-expo'),
  getModule('@unimodules'),
  getModule('native-base'),
  getModule('styled-components'),
];

const DEFAULT_EXCLUDES = [
  '/node_modules',
  '/bower_components',
  '/.expo/',
  // Prevent transpiling webpack generated files.
  '(webpack)',
];


const config = {
  stories: [
    "../docs/**/*.stories.mdx",
    "../docs/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
 ],
  features: { buildStoriesJson: true },
  framework: "@storybook/react-webpack5",
  webpackFinal: async (config, options) => {
    config.plugins = [
      ...config.plugins,

      // Mock react-native-gesture-handler to do nothing in web
      new webpack.NormalModuleReplacementPlugin(
        /react-native-gesture-handler$/,
        path.join(__dirname, "__mocks__/react-native-gesture-handler.tsx"),
      ),
      new webpack.EnvironmentPlugin({ JEST_WORKER_ID: null }),
      new webpack.DefinePlugin({ process: { env: {} } }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(
          process.env.NODE_ENV || 'development',
        ),
        __DEV__: process.env.NODE_ENV !== 'production' || true,
      }),
    ];

    /**
     * Separate existing rules for CSS files
     */
    if (config.module?.rules) {
      const matcher = rule => rule.test?.toString() === "/\\.css$/";
      const existingRule = config.module.rules.find(matcher);

      // CSS rules for 3rd-party package only
      const packageCssRule = { ...existingRule, include: /node_modules/ };

      // CSS rules for Atlantis
      const atlantisCssRule = {
        ...existingRule,
        exclude: /node_modules/,
        use: existingRule?.use?.map(item => {
          let newItem = item;
          if (newItem.loader?.includes("/css-loader/")) {
            const modules = {
              localIdentName: "[name]__[local]--[hash:base64:5]",
            };
            newItem = {
              ...newItem,
              options: { ...newItem.options, modules },
            };
          }
          return newItem;
        }),
      };

      // Delete existing CSS rule and replace them with the new ones
      config.module.rules = [
        ...config.module.rules.filter(r => !matcher(r)),
        packageCssRule,
        atlantisCssRule,
      ];

      const babelPlugins = getBabelPlugins(options);
      const root = options.projectRoot ?? process.cwd();
      const userModules = ["react-native-reanimated"]?.map(getModule) ?? [];
      const modules = [...DEFAULT_INCLUDES, ...userModules];

      // fix for uncompiled react-native dependencies
      config.module.rules.push({
        test: /\.(js|jsx|ts|tsx)$/,
        loader: 'babel-loader',
        // include logic copied from https://github.com/expo/expo-cli/blob/master/packages/webpack-config/src/loaders/createBabelLoader.ts
        include(filename: string) {
          if (!filename) {
            return false;
          }

          for (const possibleModule of modules) {
            if (filename.includes(path.normalize(possibleModule))) {
              return true;
            }
          }

          if (filename.includes(root)) {
            for (const excluded of DEFAULT_EXCLUDES) {
              if (filename.includes(path.normalize(excluded))) {
                return false;
              }
            }
            return true;
          }
          return false;
        },
        options: {
          root,
          presets: [
            [
              'module:metro-react-native-babel-preset',
              {
                useTransformReactJSXExperimental: true,
              },
            ],
            [
              '@babel/preset-react',
              {
                runtime: 'automatic',
              },
            ],
            ['@babel/preset-env', { modules: false }]
          ],
          plugins: [...babelPlugins, '@babel/plugin-proposal-class-properties'],
        },
      });
    }

    /**
     * Framer motion 5 and up use ESM mjs files which doesn't work out of the
     * box for webpack 4.
     *
     * Until we get to React 18, Node 18, Webpack 5, Storybook 7, this is needed.
     */
    config.module?.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    });

    /**
     * Generate css types on `.css` file save,
     * as well as handle PostCss
     */
    config.module?.rules.push({
      enforce: "pre",
      test: /\.css$/,
      exclude: [/node_modules/, /\.storybook\/assets\/css\/.*\.css$/],
      use: [
        require.resolve("typed-css-modules-loader"),
        {
          loader: "postcss-loader",
          options: {
            postcssOptions: {
              autoModules: false,
              plugins: [
                require("postcss-import"),
                require("autoprefixer"),
                require("@csstools/postcss-global-data")({
                  files: [
                    require.resolve(
                      path.join(__dirname, "../packages/design/foundation.css"),
                    ),
                  ],
                }),
                require("postcss-preset-env")({
                  stage: 1,
                  preserve: true,
                }),
              ],
            },
          },
        },
      ],
    });

    // Alias @jobber so it works on MDX files
    Object.assign(config.resolve?.alias, {
      "@jobber/components": path.resolve(
        __dirname,
        "../packages/components/src",
      ),
      "@jobber/components-native": path.resolve(
        __dirname,
        "../packages/components-native/src",
      ),
      "@jobber/docx": path.resolve(__dirname, "../packages/docx/src"),
      "@jobber/hooks": path.resolve(__dirname, "../packages/hooks/src"),
      mdxUtils: path.resolve(__dirname, "components"),
      "@atlantis": path.resolve(__dirname, "../"),
    });
    config.resolve.extensions = [
      '.web.js',
      '.web.jsx',
      '.web.ts',
      '.web.tsx',
      ...config.resolve.extensions,
    ];
    const userAliases = options.modulesToAlias ?? {};
    config.resolve.alias = {
      'react-native$': 'react-native-web',
      ...config.resolve.alias,
      ...userAliases,
    };
    // Return the altered config
    return config;
  },
};
export default config;
