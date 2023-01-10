/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-env node */
const path = require("path");

const { USE_ATLANTIS_ALIASES } = process.env;
const useAtlantisAliases = USE_ATLANTIS_ALIASES === "true";

exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
  const config = getConfig();

  /**
   * Generate css types on `.css` file save,
   * as well as handle PostCss
   */
  config.module.rules.push({
    enforce: "pre",
    test: /\.css$/,
    use: [
      {
        loader: "postcss-loader",
        options: {
          ident: "postcss",
          plugins: () => [
            require("postcss-preset-env")({
              stage: 1,
              preserve: true,
              importFrom: [
                require.resolve(
                  path.join(__dirname, "../design/foundation.css"),
                ),
                require.resolve(path.join(__dirname, "../design/dist")),
              ],
            }),
          ],
        },
      },
    ],
  });

  if (useAtlantisAliases) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@jobber/components": path.resolve(__dirname, "../components/src"),
      "@jobber/hooks": path.resolve(__dirname, "../hooks/src"),
    };
  }

  actions.replaceWebpackConfig(config);
};
