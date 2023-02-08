/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */

const postcss = require("postcss");

module.exports = postcss.plugin(
  "postcss-filter-rules",
  (opts = { ruleFilters: [] }) => {
    // Work with options here

    return root => {
      root.nodes.forEach(rule => {
        opts.ruleFilters.forEach(filter => filter(rule));
      });
    };
  },
);
