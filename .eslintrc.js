require("@jobber/eslint-config/patch-eslint-plugin-resolution.js");

module.exports = {
  extends: ["@jobber/eslint-config"],
  settings: {
    "import/resolver": {
      alias: {
        map: [
          ["@jobber/components", "./packages/components/src"],
          ["@jobber/hooks", "./packages/hooks"]
        ],
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
      }
    }
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
        allow: ["@jobber/components/*", "gatsby-theme-docz/**", "lodash/*"]
      }
    ]
  },
  overrides: [
    {
      files: [
        './packages/docz-tools/src/gatsby-theme-docz/theme/index.ts',
        './packages/docz-tools/src/gatsby-theme-docz/components/index.ts'
      ],
      rules: {
        "import/no-default-export": "off",
      }
    },
    {
      files: ['./packages/docz-tools/**/*'],
      settings: {
        "import/resolver": {
          alias: {
            map: [
              ["~theme", "./packages/docz-tools/src/gatsby-theme-docz/theme"],
            ],
            extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
          }
        }
      },
    }
  ]
};
