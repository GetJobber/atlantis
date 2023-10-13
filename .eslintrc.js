// eslint-disable-next-line import/no-internal-modules
require("@jobber/eslint-config/patch-eslint-plugin-resolution.js");

const packageAliases = [
  ["@jobber/components", "./packages/components/src"],
  ["@jobber/components-native", "./packages/components-native/src"],
  ["@jobber/hooks", "./packages/hooks/src"],
];

module.exports = {
  plugins: ["monorepo-cop", "react"],
  extends: ["@jobber/eslint-config", "plugin:monorepo-cop/recommended"],
  root: true,
  settings: {
    "import/ignore": ["react-native/index"],
    "import/resolver": {
      alias: {
        map: packageAliases,
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".stories.mdx"],
      },
    },
  },
  rules: {
    /*
      Atlantis is a monorepo so we need to use `monorepo-cop` to enforce the
      relative import rule.
     */
    "import/no-relative-parent-imports": "off",
    "no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "lodash",
            message: "Import [module] from lodash/[module] instead.",
          },
        ],
      },
    ],
    "import/no-internal-modules": [
      "error",
      {
        allow: [
          "@jobber/components/*",
          "@jobber/components-native",
          "@jobber/hooks/*",
          "@jobber/design/*",
          "lodash/*",
          "utils/*",
        ],
      },
    ],
    "react/prefer-read-only-props": "warn",
    "react/jsx-no-useless-fragment": ["warn", { allowExpressions: true }],
    "react/button-has-type": "warn",
    "padding-line-between-statements": [
      "warn",
      // Catch all for block statements
      { blankLine: "always", prev: "*", next: "block" },
      { blankLine: "always", prev: "*", next: "block-like" },
      // Specific cases
      { blankLine: "always", prev: "*", next: "return" },
      { blankLine: "always", prev: "function", next: "function" },
      // Turn off for case statements
      { blankLine: "any", prev: "case", next: "case" },
    ],
  },
  overrides: [
    {
      files: ["*.stories.mdx"],
      extends: "plugin:mdx/recommended",
      rules: {
        "no-alert": "off",
        "@typescript-eslint/naming-convention": "off",
        "@typescript-eslint/no-unused-expressions": "off",
        "import/no-extraneous-dependencies": "off",
        "padding-line-between-statements": "off",
      },
    },
    {
      files: ["*.stories.tsx"],
      rules: {
        "import/no-relative-parent-imports": "off",
        "no-alert": "off",
        "@typescript-eslint/naming-convention": "off",
        "@typescript-eslint/no-unused-expressions": "off",
        "import/no-default-export": "off",
      },
    },
    {
      files: ["packages/components-native/**", "docs/**/Mobile.stories.tsx"],
      rules: {
        "react/forbid-elements": [
          "error",
          {
            forbid: [
              { element: "div", message: "Use `<View>` instead" },
              { element: "span", message: "Use `<View>` instead" },
              { element: "button", message: "Use `<Button/>` instead" },
              { element: "a", message: "Use `<AutoLink/>` instead" },
              { element: "img", message: "Use `<Image/>` instead" },
              {
                element: "input",
                message: "Use one of our `Input` components instead",
              },
            ],
          },
        ],
      },
    },
  ],
};
