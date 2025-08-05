require("@jobber/eslint-config/patch-eslint-plugin-resolution.js");

module.exports = {
  root: true,
  env: { browser: true, es6: true, node: true },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    "import/no-internal-modules": [
      "error",
      {
        allow: ["**"],
      },
    ],
    // Custom rule to enforce specific @jobber/hooks imports
    "jobber/prefer-specific-hooks-import": "error",
  },
  plugins: ["jobber", "import"],
};
