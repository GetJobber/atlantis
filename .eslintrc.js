// eslint-disable-next-line import/no-internal-modules
require("@jobber/eslint-config/patch-eslint-plugin-resolution.js");

const packageAliases = [
  ["@jobber/components", "./packages/components/src"],
  ["@jobber/hooks", "./packages/hooks/src"],
];

module.exports = {
  extends: ["@jobber/eslint-config"],
  settings: {
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
        allow: ["@jobber/components/*", "@jobber/hooks/*", "lodash/*"],
      },
    ],
  },
  overrides: [
    {
      files: ["*.stories.mdx"],
      extends: "plugin:mdx/recommended",
      rules: {
        "react-native/no-inline-styles": "off",
        "no-alert": "off",
        "@typescript-eslint/naming-convention": "off",
        "@typescript-eslint/no-unused-expressions": "off",
        "import/no-extraneous-dependencies": "off",
      },
    },
  ],
};
