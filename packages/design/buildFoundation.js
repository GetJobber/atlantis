/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const postcss = require("postcss");
const postcssCustomProperties = require("postcss-custom-properties");
const calc = require("postcss-calc");

const foundation = fs.readFileSync("foundation.css");

postcss([
  postcssCustomProperties({
    preserve: false,
    exportTo: ["foundation.js"],
  }),
  calc(),
])
  .process(foundation, { from: undefined })
  .then();
