/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const postcss = require("postcss");
const postcssCustomProperties = require("postcss-custom-properties");

const foundation = fs.readFileSync("./foundation.css");

postcss([
  postcssCustomProperties({
    exportTo: ["src/foundation.js"],
  }),
])
  .process(foundation, { from: undefined })
  .then();
