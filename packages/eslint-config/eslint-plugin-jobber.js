/**
 * ESLint plugin for @jobber packages
 *
 * This plugin provides custom rules specific to Jobber's codebase
 */

const rules = require("./rules");

module.exports = {
  rules,
  configs: {
    recommended: {
      plugins: ["jobber"],
      rules: {
        "jobber/prefer-specific-hooks-import": "error",
      },
    },
  },
};
