/* eslint-env node */

let hasJobberFonts = false;
// console.error(process.env);
if (process.env.INCLUDE_FONTS) {
  console.log(Boolean(process.env.INCLUDE_FONTS));
  return;
}
try {
  require("@jobber/fonts");
  hasJobberFonts = true;
} catch (e) {
  hasJobberFonts = false;
}
console.log(Boolean(hasJobberFonts));
