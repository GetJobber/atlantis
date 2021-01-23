/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-env node */
const path = require("path");

exports.onCreateWebpackConfig = ({ actions, stage, getConfig }) => {
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
                require.resolve(
                  path.join(
                    __dirname,
                    "../packages/design/src/responsiveBreakpoints.css",
                  ),
                ),
              ],
            }),
          ],
        },
      },
    ],
  });

  if (stage.includes("html")) {
    config.module.rules.push({
      test: /.*\.(?:md|mdx)$/,
      use: path.resolve("../null-markdown-loader.js"),
    });
  }

  config.resolve.alias = {
    ...config.resolve.alias,
    "@jobber/components": path.resolve(__dirname, "./packages/components/src"),
    "@jobber/hooks": path.resolve(__dirname, "./packages/hooks"),
  };

  actions.replaceWebpackConfig(config);
};
