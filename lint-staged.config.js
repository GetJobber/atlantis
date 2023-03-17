/* eslint-env node */

module.exports = {
  "*.{js,jsx,ts,tsx}": [
    "eslint --format=codeFrame --fix",
    "git add",
    "jest --bail --findRelatedTests",
  ],
  "*.css": ["stylelint --fix --allow-empty-input", "git add"],
  "*.{md,mdx}": ["prettier --write", "git add"],
};
