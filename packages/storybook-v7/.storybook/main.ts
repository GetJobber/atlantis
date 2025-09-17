import webpack from 'webpack';
import path from 'path'
import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: [
    "../docs/**/*.stories.mdx",
    "../docs/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-mdx-gfm",
    {
      name: "@storybook/addon-react-native-web",
      options: {
        modulesToTranspile: ["react-native-reanimated"],
        babelPlugins: ["react-native-reanimated/plugin"],
      },
    },
  ],
  features: { buildStoriesJson: true },
  framework: "@storybook/react-webpack5",
  webpackFinal: async (config, options) => {
    // Mock react-native-gesture-handler to do nothing in web
    config.plugins?.push(
      new webpack.NormalModuleReplacementPlugin(
        /react-native-gesture-handler$/,
        path.join(__dirname, "__mocks__/react-native-gesture-handler.tsx"),
      ),
    )
    config.plugins?.push(
      new webpack.EnvironmentPlugin({ JEST_WORKER_ID: null }),
    )
    config.plugins?.push(
      new webpack.DefinePlugin({ process: { env: {} } }),
    )

    /**
     * Separate existing rules for CSS files
     */
    if (config.module?.rules) {

      const matcher = rule => rule.test?.toString() === "/\\.css$/";

      const existingRule = (config.module.rules.find(matcher) || {}) as webpack.RuleSetRule;

      // CSS rules for 3rd-party package only
      const packageCssRule = { ...existingRule, include: /node_modules/ };

      // CSS rules for Atlantis
      const atlantisCssRule = {
        ...existingRule,
        exclude: /node_modules/,
        use: (existingRule?.use as webpack.RuleSetRule[])?.map(item => {
          let newItem = item;
          if (newItem.loader?.includes("/css-loader/")) {
            const modules = {
              localIdentName: "[name]__[local]--[hash:base64:5]",
            };
            newItem = {
              ...newItem,
              options: { ...newItem.options as {}, modules },
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

    if (!config.module) { config.module = {} }
    if (!config.module.rules) { config.module.rules = [] }

    config.module.rules.push({
      test: /\.stories\.tsx?$/,
      use: [
        {
          loader: require.resolve("@storybook/source-loader"),
          options: { parser: "typescript" },
        },
      ],
      enforce: "pre",
    });

    /**
     * Generate css types on `.css` file save,
     * as well as handle PostCss
     */
    config.module.rules.push({
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
                      path.join(__dirname, "../packages/design/dist/foundation.css"),
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

    if (!config.resolve) {
      config.resolve = {}
    }
    // Alias @jobber so it works on MDX files
    config.resolve.alias = {
      ...config.resolve?.alias,
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
      'react-native-web/dist/exports/findNodeHandle': path.resolve(__dirname, "__mocks__/react-native-web-findNodeHandle.ts"),
    };

    // Return the altered config
    return config;
  },
};
export default config;
