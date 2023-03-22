import type { StorybookConfig } from "@storybook/react-webpack5";
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
    "@storybook/addon-mdx-gfm",
    {
      name: "@storybook/addon-docs",
      options: {
        transcludeMarkdown: true,
      },
    },
  ],
  features: { buildStoriesJson: true },
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  // Prevent reactDocgen from reaching into Webpack 4 and breaking the build.
  typescript: { reactDocgen: false },
  docs: {
    autodocs: true,
  },
  webpackFinal: async webpackConfig => {
    /**
     * Separate existing rules for CSS files
     */
    if (webpackConfig.module?.rules) {
      const matcher = (rule: string | webpack.RuleSetRule): boolean => {
        if (typeof rule === "string") return false;
        return rule.test?.toString() === "/\\.css$/";
      };
      const existingRule = webpackConfig.module.rules.find(matcher);

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
      webpackConfig.module.rules = [
        ...webpackConfig.module.rules.filter(r => !matcher(r)),
        packageCssRule,
        atlantisCssRule,
      ];
    }

    /**
     * Framer motion 5 and up use ESM mjs files which doesn't work out of the
     * box for webpack 4.
     *
     * Until we get to React 18, Node 18, Webpack 5, Storybook 7, this is needed.
     */
    webpackConfig.module?.rules?.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    });

    /**
     * Generate css types on `.css` file save,
     * as well as handle PostCss
     */
    webpackConfig.module?.rules?.push({
      enforce: "pre",
      test: /\.css$/,
      exclude: [/node_modules/, /\.storybook\/assets\/css\/.*\.css$/],
      use: [
        // FIXME: This throws a warning for generating d.ts file with the same name
        // FIXME
        // FIXME
        // FIXME
        // FIXME
        // FIXME
        // require.resolve("typed-css-modules-loader"),
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
    Object.assign(webpackConfig.resolve?.alias, {
      "@jobber/components": path.resolve(
        __dirname,
        "../packages/components/src",
      ),
      "@jobber/docx": path.resolve(__dirname, "../packages/docx/src"),
      mdxUtils: path.resolve(__dirname, "components"),
      "@atlantis": path.resolve(__dirname, "../"),
    });

    // Return the altered config
    return webpackConfig;
  },
};

module.exports = config;
