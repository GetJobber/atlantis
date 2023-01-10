/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const postcss = require("postcss");
const postcssCustomProperties = require("postcss-custom-properties");
const postcssImport = require("postcss-import");
const postcssCopy = require("postcss-copy");

const hasJobberFonts = Boolean(process.env.INCLUDE_FONTS);
console.warn("buildFoundation", { hasJobberFonts });
const foundation = fs.readFileSync("foundation.css");

// const otherCopy = postcssCopy({
//   dest: "dist",
//   basePath: ["src", "node_modules"],
//   // preservePath: true,
//   template(fileMeta) {
//     console.warn("template", fileMeta);
//     return fileMeta.fileName;
//   },
// });
// const testImport = postcssImport({
//   // plugins: [testCopy],
//   basedir: ["."],
//   resolve: (id, basedir, importOptions) => {
//     // console.warn("post css import", { id, basedir, importOptions });
//     if (id === "@jobber/fonts" && hasJobberFonts) {
//       // console.warn(importOptions.resolve(id));
//       // const splitPath = basedir.split("/");
//       // const fontName = splitPath[splitPath.length - 1];
//       // if (id.includes("fonts") && hasJobberFonts) {
//       //   const newerPath = `${basedir}/../node_modules/@jobber/fonts/dist/index.css`;
//       //   console.warn(
//       //     "newPath",
//       //     importOptions.resolve(newerPath, basedir, importOptions),
//       //   );
//       //   return importOptions.resolve(newerPath, basedir, importOptions);
//       // }
//     }
//     return id;
//   },
//   // addModulesDirectories: ["node_modules/@jobber/"],
//   filter: path => {
//     if (path.includes("@jobber/fonts")) {
//       return hasJobberFonts;
//     } else {
//       return true;
//     }
//   },
// });

const postcssCopyInstance = postcssCopy({
  dest: "dist",
  basePath: ["./src", "node_modules"],
  // preservePath: true,
  template(fileMeta) {
    return fileMeta.filename;
  },
});
const postcssImportInstance = postcssImport({
  // plugins: [testCopy],
  basedir: ["./src", "node_modules"],
  filter: path => {
    if (path.includes("@jobber/fonts")) {
      return false;
    } else {
      return true;
    }
  },
});

postcss([
  postcssImportInstance,
  // otherCopy,
  hasJobberFonts && postcssCopyInstance,
  postcssCustomProperties({
    exportTo: ["src/foundation.js"],
  }),
]).process(foundation, { from: undefined });
