require("@jobber/eslint-config/patch-eslint-plugin-resolution.js");

module.exports = {
  extends: ["@jobber/eslint-config"],
  settings: {
    "import/resolver": {
      alias: {
        map: [
          ["@jobber/components", "./packages/components/src"],
          ["@jobber/hooks", "./packages/hooks"],
          ["@jobber/docz-theme", "./packages/docz-theme/src"],
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
          "@jobber/design/*",
          "@jobber/docz-theme/**/*",
          "gatsby-theme-docz/**",
          "lodash/*"
        ]
      }
    ]
  },
  overrides: [
    {
      files: [
        "**/doczrc.js",
      "./packages/docz-theme/src/theme/index.js",
      "./packages/docz-theme/src/gatsby-theme-docz/**/*"
      ],
      rules: {
        "import/no-default-export": "off",
      },
    },
  ],
};
