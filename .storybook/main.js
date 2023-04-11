const path = require("path");

const config = {
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
  features: { buildStoriesJson: true },
  framework: "@storybook/react",
  webpackFinal: async config => {
    /**
     * Separate existing rules for CSS files
     */
    if (config.module?.rules) {
      const matcher = (rule) =>
        rule.test?.toString() === "/\\.css$/";
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
    })

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
                require('@csstools/postcss-global-data')({
                  files: [
                    require.resolve(
                      path.join(__dirname, "../packages/design/foundation.css"),
                    ),
                  ]
                }),
                require("postcss-preset-env")({
                  stage: 1,
                  preserve: true,
                }),
              ],
            },
          }
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
      mdxUtils: path.resolve(__dirname, "components"),
      "@atlantis": path.resolve(__dirname, "../"),
    });

    // Return the altered config
    return config;
  },
};

module.exports = config;
