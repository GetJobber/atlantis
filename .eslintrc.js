require("@jobber/eslint-config/patch-eslint-plugin-resolution.js");

module.exports = {
  extends: ["@jobber/eslint-config"],
  plugins: ["jest"],
  rules: {
    /*
      Need to figure out a good way to enforce intra vs inter module import
      rules. For now, warn on these.
     */
    "import/no-relative-parent-imports": "warn",
  },
};
