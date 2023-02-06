import type { StorybookConfig } from "@storybook/react/types";

// import { config as webpackConfig } from "./webpack.config";
// const { merge } = require("webpack-merge");
// const path = require("path");

const config: StorybookConfig = {
  "stories": [
    "../packages/**/*.stories.mdx",
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-css-modules",

  ],
  "framework": "@storybook/react",
}

module.exports = config
