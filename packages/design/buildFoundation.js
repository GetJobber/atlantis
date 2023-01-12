/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const postcss = require("postcss");
const postcssCustomProperties = require("postcss-custom-properties");
const postcssImport = require("postcss-import");
// eslint-disable-next-line import/no-internal-modules
const removeRule = require("./foundation_config/postcss-filter-rules");

const hasJobberFonts = Boolean(process.env.INCLUDE_FONTS === "true");
function removeFontImport(rule) {
  if (rule.params?.includes("@jobber/fonts")) {
    if (!hasJobberFonts) {
      rule.remove();
    }
  }
}

const foundation = fs.readFileSync("./foundation.css");

const postcssImportInstance = postcssImport({
  basedir: ["node_modules", "./"],
  filter: path => {
    if (path.includes("@jobber/fonts")) {
      return hasJobberFonts;
    } else {
      return true;
    }
  },
});

postcss([
  removeRule({ ruleFilters: [removeFontImport] }),
  postcssImportInstance,
  postcssCustomProperties({
    exportTo: ["src/foundation.js"],
  }),
])
  .process(foundation, { from: undefined })
  .then();
