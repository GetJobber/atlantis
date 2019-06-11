/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const postcss = require("postcss");
const postcssCustomProperties = require("postcss-custom-properties");

const colors = fs.readFileSync("src/colors.css");

postcss([
  postcssCustomProperties({
    exportTo: ["colors.js"],
  }),
])
  .process(colors, { from: undefined })
  .then();
