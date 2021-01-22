/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-env node */
const path = require("path");

exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
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

  actions.replaceWebpackConfig(config);
};
