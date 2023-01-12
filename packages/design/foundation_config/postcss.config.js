/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-env node */

const postcssCustomProperties = require("postcss-custom-properties");
const postcssImport = require("postcss-import");
const postcssCopy = require("postcss-copy");
const removeRule = require("./postcss-filter-rules");

let maintainPath;
const hasJobberFonts = Boolean(process.env.INCLUDE_FONTS === "true");
if (hasJobberFonts) {
  ({ maintainPath } = require("@jobber/fonts"));
}
function removeFontImport(rule) {
  if (rule.params?.includes("@jobber/fonts")) {
    if (!hasJobberFonts) {
      console.warn("remove rule in foundation config", { hasJobberFonts });
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
      console.warn("include fonts, import, foundation config", {
        hasJobberFonts,
      });
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
