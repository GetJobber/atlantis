module.exports = {
  extends: ["@jobber/eslint-config", "plugin:jest/recommended"],
  plugins: ["jest"],
  rules: {
    /*
      Need to figure out a good way to enforce intra vs inter module import
      rules. For now, warn on these.
     */
    "import/no-relative-parent-imports": "warn",
  },
};
