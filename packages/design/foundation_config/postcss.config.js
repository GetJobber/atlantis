/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-env node */

// const fs = require("fs");
// const postcss = require("postcss");
const postcssCustomProperties = require("postcss-custom-properties");
const postcssImport = require("postcss-import");
const postcssCopy = require("postcss-copy");
const removeRule = require("./postcss-filter-rules");

const hasJobberFonts = true; //Boolean(process.env.INCLUDE_FONTS);
console.warn("foundationPostCSS", { hasJobberFonts });
function removeFontImport(rule) {
  if (rule.params.includes("@jobber/fonts")) {
    if (!hasJobberFonts) rule.remove();
  }
}
const postcssCopyInstance = postcssCopy({
  dest: "dist",
  basePath: ["./src", "./node_modules"],
  // preservePath: true,
  template(fileMeta) {
    return fileMeta.filename;
  },
});
const postcssImportInstance = postcssImport({
  // plugins: [testCopy],
  basedir: [".", "./node_modules"],
  filter: path => {
    if (path.includes("@jobber/fonts")) {
      return hasJobberFonts;
    } else {
      return true;
    }
  },
  // load: (fileName, importOptions) => {
  //   console.warn({ fileName, importOptions });
  // },
});

module.exports = {
  plugins: [
    removeRule({ ruleFilters: [removeFontImport] }),
    postcssImportInstance,
    hasJobberFonts && postcssCopyInstance,
    postcssCustomProperties({
      exportTo: ["src/foundation.js"],
    }),
  ],
};
