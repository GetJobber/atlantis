---
name: Eslint Config
menu: Packages
route: /packages/eslint-config
---

# ESLint Config _aka Dip Lint_

## Installing

`npm install --save-dev @jobber/eslint-config`

Seed your `.eslintrc.js` with:

```js
require("@jobber/eslint-config/patch-eslint-plugin-resolution.js");

module.exports = {
  extends: ["@jobber/eslint-config"],
  settings: {},
  rules: {}
};
```
