import { dirname, join } from "path";
const util = require('util');
const webpack = require("webpack");
const path = require("path");

const config = {
  stories: [
    "../docs/**/*.stories.mdx",
    "../docs/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  core: {
    builder: "webpack5",
  },
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-interactions"),
    {
      name: "@storybook/addon-react-native-web",
      options: {
        modulesToTranspile: ["react-native-reanimated"],
        babelPlugins: [
          "react-native-reanimated/plugin"],
      },
    },
    getAbsolutePath("@storybook/addon-mdx-gfm")
  ],

  features: { buildStoriesJson: true },

  framework: {
    name: getAbsolutePath("@storybook/react-webpack5"),
    options: {}
  },

  webpackFinal: async config => {
    config.plugins = [
      ...config.plugins,

      // Mock react-native-gesture-handler to do nothing in web
      new webpack.NormalModuleReplacementPlugin(
        /react-native-gesture-handler$/,
        path.join(__dirname, "__mocks__/react-native-gesture-handler.tsx"),
      ),
      new webpack.EnvironmentPlugin({ JEST_WORKER_ID: null }),
      new webpack.DefinePlugin({ process: { env: {} } })
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
    }
    
    config.devtool = false;
    config.resolve.fallback = {
      ...config.resolve.fallback,
      os: false,
      util: false,
      path: require.resolve("path-browserify"),
      assert: require.resolve('browser-assert'),
      fs: false,
      stream: false,
      module: false,
      crypto: false,
      child_process: false,
      tty: false,
      benchmark: false,
      v8: false,
      net: false,
    }

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

    // Return the altered config
    return config;
  },

  docs: {
    autodocs: false
  }
};

module.exports = config;

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}
