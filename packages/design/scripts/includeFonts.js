/* eslint-env node */

let hasJobberFonts = false;
try {
  require("@jobber/fonts");
  hasJobberFonts = true;
} catch (e) {
  hasJobberFonts = false;
}
console.log(Boolean(hasJobberFonts));
