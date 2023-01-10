/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const postcss = require("postcss");
const postcssCustomProperties = require("postcss-custom-properties");
const postcssImport = require("postcss-import");
const postcssCopy = require("postcss-copy");

const hasJobberFonts = Boolean(process.env.INCLUDE_FONTS);
console.warn("buildFoundation", { hasJobberFonts });
const foundation = fs.readFileSync("./foundation.css");

const postcssCopyInstance = postcssCopy({
  dest: "./dist",
  basePath: ["./node_modules", "."],
  template(fileMeta) {
    console.warn({ fileMeta });
    return fileMeta.filename;
  },
});
const postcssImportInstance = postcssImport({
  basedir: ["node_modules"],
  filter: path => {
    if (path.includes("@jobber/fonts")) {
      console.warn("filter", path, hasJobberFonts);

      return hasJobberFonts;
    } else {
      return true;
    }
  },
});

postcss([
  postcssImportInstance,
  // otherCopy,
  postcssCopyInstance,
  postcssCustomProperties({
    exportTo: ["src/foundation.js"],
  }),
])
  .process(foundation, { from: "./foundation.css", to: "./foundation.css" })
  .then();
