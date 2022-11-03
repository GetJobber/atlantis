/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const postcss = require("postcss");
const postcssCustomProperties = require("postcss-custom-properties");

const colorsDark = fs.readFileSync("src/colorsDark.css");
const colorsLight = fs.readFileSync("src/colorsLight.css");

postcss([
  postcssCustomProperties({
    exportTo: ["colorsLight.js"],
  }),
])
  .process(colorsLight, { from: undefined })
  .then();

postcss([
  postcssCustomProperties({
    exportTo: ["colorsDark.js"],
  }),
])
  .process(colorsDark, { from: undefined })
  .then();
