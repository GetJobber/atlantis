/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-env node */

// const fs = require("fs");
// const postcss = require("postcss");
const postcssCustomProperties = require("postcss-custom-properties");
const postcssImport = require("postcss-import");
const postcssCopy = require("postcss-copy");
const { maintainPath } = require("@jobber/fonts");
const removeRule = require("./postcss-filter-rules");

const hasJobberFonts = Boolean(process.env.INCLUDE_FONTS);
console.warn("foundationPostCSS", { hasJobberFonts });
function removeFontImport(rule) {
  if (rule.params.includes("@jobber/fonts")) {
    if (!hasJobberFonts) {
      console.warn("remove import");
      rule.remove();
    }
  }
}
const postcssCopyInstance = postcssCopy({
  dest: "./dist",
  basePath: ["./src", "./node_modules"],
  preservePath: true,
  template(fileMeta) {
    return fileMeta.filename;
  },
});
const postcssImportInstance = postcssImport({
  basedir: ["./src", "./node_modules"],
  filter: path => {
    if (path.includes("@jobber/fonts")) {
      return hasJobberFonts;
    } else {
      return true;
    }
  },
});

module.exports = {
  plugins: [
    removeRule({ ruleFilters: [removeFontImport] }),
    postcssImportInstance,
    hasJobberFonts && postcssCopyInstance,
    hasJobberFonts &&
      maintainPath({ pathToFind: "dist/fonts", pathToSet: "./dist/fonts" }),
    postcssCustomProperties({
      exportTo: ["src/foundation.js"],
    }),
  ],
};
