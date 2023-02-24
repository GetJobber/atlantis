import type { StorybookConfig } from "@storybook/react/types";
import * as webpack from "webpack";
const path = require("path");

const config: StorybookConfig = {
  stories: [
    "../packages/**/*.stories.mdx",
    "../packages/**/*.stories.@(js|jsx|ts|tsx)",
    "../docs/**/*.stories.mdx",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: "@storybook/addon-docs",
      options: {
        transcludeMarkdown: true,
      },
    },
  ],
  framework: "@storybook/react",
  webpackFinal: async config => {
    /**
     * Separate existing rules for CSS files
     */
    if (config.module?.rules) {
      const matcher = (rule: webpack.RuleSetRule): boolean =>
        rule.test?.toString() === "/\\.css$/";
      const existingRule = config.module.rules.find(matcher);

      // CSS rules for 3rd-party package only
      const packageCssRule = { ...existingRule, include: /node_modules/ };

      // CSS rules for Atlantis
      const atlantisCssRule = {
        ...existingRule,
        exclude: /node_modules/,
        use: (existingRule?.use as webpack.RuleSetLoader[])?.map(item => {
          let newItem = item;
          if (newItem.loader?.includes("/css-loader/")) {
            const modules = {
              localIdentName: "[name]__[local]--[hash:base64:5]",
            };
            newItem = {
              ...newItem,
              options: { ...(newItem.options as Record<any, any>), modules },
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

    /**
     * Generate css types on `.css` file save,
     * as well as handle PostCss
     */
    config.module?.rules.push({
      enforce: "pre",
      test: /\.css$/,
      exclude: /node_modules/,
      use: [
        require.resolve("typed-css-modules-loader"),
        {
          loader: "postcss-loader",
          options: {
            ident: "postcss",
            plugins: () => [
              require("postcss-import"),
              require("autoprefixer"),
              require("postcss-preset-env")({
                stage: 1,
                preserve: true,
                importFrom: [
                  require.resolve(
                    path.join(__dirname, "../packages/design/foundation.css"),
                  ),
                ],
              }),
            ],
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
      "@jobber/docx": path.resolve(__dirname, "../packages/docx/src"),
      "@jobber/docz-tools": path.resolve(
        __dirname,
        "../packages/docz-tools/src/components",
      ),
      mdxUtils: path.resolve(__dirname, "components"),
      "@atlantis": path.resolve(__dirname, "../"),
    });

    // Return the altered config
    return config;
  },
};

module.exports = config;
