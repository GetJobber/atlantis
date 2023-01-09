/* eslint-env node */

let hasJobberFonts = false;
console.error(process.env);
try {
  require("@jobber/fonts");
  hasJobberFonts = true;
} catch (e) {
  hasJobberFonts = false;
}
console.log(Boolean(hasJobberFonts));
