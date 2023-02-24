import type { StorybookConfig } from "@storybook/react/types";
import * as webpack from "webpack";
const path = require("path");

const config: StorybookConfig = {
  "stories": [
    "../packages/**/*.stories.mdx",
    "../packages/**/*.stories.@(js|jsx|ts|tsx)",
    "../docs/**/*.stories.mdx",
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: '@storybook/addon-docs',
      options: {
        transcludeMarkdown: true,
      },
    },
  ],
  "framework": "@storybook/react",
  webpackFinal: async (config) => {

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

    /**
     * Since we don't use .module.css, we'll have to enable CSS modules for
     * all CSS files.
     */
    const ruleCssIndex = config.module?.rules.findIndex(rule => rule.test?.toString() === '/\\.css$/');

    if (ruleCssIndex) {
      (config.module?.rules[ruleCssIndex]?.use as webpack.RuleSetLoader[])?.map(item => {
        if (item.loader && item.loader.includes('/css-loader/')) {
          (item.options as Record<any, any>).modules = {
            localIdentName: "[name]__[local]--[hash:base64:5]",
          };
        }

        return item;
      })
    }

    // Alias @jobber so it works on MDX files
    Object.assign(config.resolve?.alias, {
      "@jobber/components": path.resolve(__dirname, "../packages/components/src"),
      "@jobber/docx": path.resolve(__dirname, "../packages/docx/src"),
      "@jobber/docz-tools": path.resolve(__dirname, "../packages/docz-tools/src/components"),
      "mdxUtils": path.resolve(__dirname, "components"),
      "@atlantis": path.resolve(__dirname, "../"),
    });
    // Return the altered config
    return config;
  }
}

module.exports = config
