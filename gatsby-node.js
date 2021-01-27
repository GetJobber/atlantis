/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-env node */
const path = require("path");

exports.onCreateWebpackConfig = ({ actions, stage, getConfig }) => {
  const config = getConfig();

  if (stage.includes("html")) {
    config.module.rules.push({
      test: /.*\.(?:md|mdx)$/,
      use: path.resolve("../null-markdown-loader.js"),
    });
  }

  actions.replaceWebpackConfig(config);
};
