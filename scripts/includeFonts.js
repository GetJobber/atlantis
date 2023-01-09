/* eslint-env node */

let hasJobberFonts = false;
console.error(process.env);
try {
  require("@jobber/fonts");
  hasJobberFonts = true;
} catch (e) {
  hasJobberFonts = false;
}
if (!process.env.INCLUDE_FONTS) {
  console.log(Boolean(hasJobberFonts));
} else {
  console.log(process.env.INCLUDE_FONTS);
}
// console.warn("includeFonts", hasJobberFonts);
