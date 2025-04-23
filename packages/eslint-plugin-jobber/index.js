"use strict";

module.exports = {
  rules: {
    "no-src-imports": require("./rules/no-src-imports"),
  },
  configs: {
    recommended: {
      plugins: ["jobber"],
      rules: {
        "jobber/no-src-imports": "warn",
      },
    },
  },
};
