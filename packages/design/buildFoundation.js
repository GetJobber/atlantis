/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const postcss = require("postcss");
const postcssCustomProperties = require("postcss-custom-properties");
const postcssImport = require("postcss-import");

const hasJobberFonts = Boolean(process.env.INCLUDE_FONTS);
console.warn("buildFoundation", { hasJobberFonts });
const foundation = fs.readFileSync("foundation.css");

postcss([
  require("postcss-copy-assets")({
    base: "dist",
  }),
  postcssImport({
    filter: path => {
      if (path.includes("@jobber/fonts")) {
        return hasJobberFonts;
      } else {
        return true;
      }
    },
  }),
  postcssCustomProperties({
    exportTo: ["src/foundation.js"],
  }),
])
  .process(foundation, { from: undefined })
  .then(result => {
    console.error("buildFoundation Result", result);
  });
