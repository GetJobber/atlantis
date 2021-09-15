/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-env node */
const path = require("path");

exports.onCreateWebpackConfig = ({
  loaders,
  rules,
  actions,
  stage,
  getConfig,
}) => {
  const config = getConfig();

  /**
   * Generate css types on `.css` file save,
   * as well as handle PostCss
   */
  config.module.rules.push({
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
   * Gatsby does not like that we use css modules. To fix this we need
   * to change some of the webpack config around how we handle css.
   * 😢 More info here: https://github.com/gatsbyjs/gatsby/issues/16129
   */
  const cssRule = {
    ...rules.cssModules(),
    test: rules.css().test,
    include: /^((?!node_modules).)*$/,
  };

  /**
   * Don't process css from npm packages as modules.
   */
  const libCssRule = {
    ...rules.css(),
    test: rules.css().test,
    include: /node_modules/,
  };

  config.module.rules = [
    ...config.module.rules.filter(rule => {
      const areCssRules =
        rule.oneOf && rule.oneOf.some(r => r.test.test("style.css"));

      return !areCssRules;
    }),
    libCssRule,
    cssRule,
  ];

  // Situationally disable serverside rendering.
  if (stage.includes("html")) {
    config.module.rules.push({
      test: /(?:packages|docs)\/.*\.(?:js|jsx|ts|tsx)$/,
      use: loaders.null(),
    });

    config.module.rules.push({
      test: /.*\.(?:md|mdx)$/,
      use: path.resolve("../null-markdown-loader.js"),
    });
  }

  actions.replaceWebpackConfig(config);
};
