/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-env node */

// const fs = require("fs");
// const postcss = require("postcss");
const postcssCustomProperties = require("postcss-custom-properties");
const postcssImport = require("postcss-import");
const copyAssets = require("postcss-copy-assets");
const { createNoSubstitutionTemplateLiteral } = require("typescript");

const hasJobberFonts = Boolean(process.env.INCLUDE_FONTS);
console.warn("foundationPostCSS", { hasJobberFonts });

module.exports = {
  modules: true,
  namedExports: true,
  plugins: [
    postcssImport({
      resolve: (id, basedir, importOptions) => {
        console.warn("post css import", { id, basedir, importOptions });
        if (id.includes("@jobber/fonts") && hasJobberFonts) {
          // const splitPath = basedir.split("/");
          // const fontName = splitPath[splitPath.length - 1];
          if (id.includes("fonts") && hasJobberFonts) {
            const newerPath = `${basedir}/../node_modules/@jobber/fonts/dist/index.css`;
            console.warn("newPath", importOptions.resolve(newerPath));
            return importOptions.resolve(newerPath);
          }
        }
        return id;
      },
      // addModulesDirectories: ["node_modules/@jobber/"],
      filter: path => {
        if (path.includes("@jobber/fonts")) {
          return hasJobberFonts;
        } else {
          return true;
        }
      },
    }),
    copyAssets({
      base: "dist",
      pathTransform: function (newPath, origPath, contents) {
        console.warn("copyPath", { newPath, origPath, contents });
        return newPath;
      },
    }),

    postcssCustomProperties({
      exportTo: ["src/foundation.js"],
    }),
  ],
};
