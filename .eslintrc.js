// eslint-disable-next-line import/no-internal-modules
require("@jobber/eslint-config/patch-eslint-plugin-resolution.js");

const packageAliases = [
  ["@jobber/components", "./packages/components/src"],
  ["@jobber/components-native", "./packages/components-native/src"],
  ["@jobber/hooks", "./packages/hooks/src"],
];

module.exports = {
  extends: ["@jobber/eslint-config"],
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
          "@jobber/components-native",
          "@jobber/hooks/*",
          "@jobber/design/*",
          "lodash/*",
          "utils/*",
        ],
      },
    ],
    "jest/expect-expect": [
      "error",
      { assertFunctionNames: ["expect", "expectToastWithMessage"] },
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
  ],
};
