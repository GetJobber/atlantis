require("@jobber/eslint-config/patch-eslint-plugin-resolution.js");

module.exports = {
  extends: ["@jobber/eslint-config"],
  settings: {
    "import/resolver": {
      alias: {
        map: [
          ["@jobber/components", "./packages/components/src"],
        ],
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
      },
    },
  },
  rules: {
    /*
      Need to figure out a good way to enforce intra vs inter module import
      rules. For now, warn on these.
     */
    "import/no-relative-parent-imports": "warn",
    "no-restricted-imports": "warn",
    "import/no-internal-modules": [
      "error",
      {
        allow: [
          "@jobber/components/*",
          "gatsby-theme-docz/**"
        ]
      }
    ]
  },
};
