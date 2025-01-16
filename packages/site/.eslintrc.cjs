module.exports = {
  root: true,
  env: { browser: true, es6: true, node: true },
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:jest/recommended",
    "plugin:import/react",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier",
    "plugin:prettier/recommended",
  ],
  plugins: ["@typescript-eslint", "react", "prettier", "import", "jest"],
  settings: {
    react: { version: "detect" },
    "import/resolver": {
      typescript: {},
    },
    node: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
  },
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal", "index", "sibling"],
        "newlines-between": "never",
      },
    ],
    "import/no-default-export": "off",

    // Typescript will already do it
    "import/no-unresolved": "off",

    // Typescript will already do it
    "import/namespace": "off",

    // Typescript will already do it
    "import/default": "off",

    "import/export": "error",
    "import/no-duplicates": "error",

    "import/no-extraneous-dependencies": "off",

    // Lots of workarounds such as absolute paths to avoid people following this
    "import/no-internal-modules": "off",

    "import/no-named-default": "error",

    // Typescript will already do it
    "import/no-named-as-default": "off",

    // Typescript will already do it
    "import/no-named-as-default-member": "off",
    // Hugely expensive. See other tools like Madge to solve circular dependencies
    "import/no-cycle": "off",

    "import/no-useless-path-segments": "error",

    // Lots of workarounds such as absolute paths to avoid people following this
    "import/no-relative-parent-imports": "off",

    "import/no-deprecated": "error",
    "import/newline-after-import": "error",
    "jest/no-jasmine-globals": "error",
    "react/no-danger": "error",
    "prettier/prettier": [
      "error",
      { trailingComma: "all", arrowParens: "avoid" },
      { usePrettierrc: false },
    ],
    "@typescript-eslint/consistent-type-assertions": [
      "error",
      {
        assertionStyle: "as",
      },
    ],
    "@typescript-eslint/no-this-alias": "error",
    "@typescript-eslint/no-extraneous-class": "error",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-non-null-assertion": "error",
    "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
    "@typescript-eslint/no-unused-expressions": [
      "error",
      { allowShortCircuit: true },
    ],
    "@typescript-eslint/no-empty-function": "error",
    "@typescript-eslint/no-shadow": "error",
    curly: ["error", "multi-line", "consistent"],
    "prefer-const": "error",
    "dot-notation": "error",
    "sort-imports": ["error", { ignoreDeclarationSort: true }],
    "guard-for-in": "error",
    "max-statements": ["error", 12],
    "no-bitwise": "error",
    "no-caller": "error",
    "no-eval": "error",
    "no-shadow": "off",
    "no-sequences": "error",
    "no-template-curly-in-string": "error",
    "no-return-await": "error",
    "no-throw-literal": "error",
    "no-new-func": "error",
    "no-unused-expressions": "off",
    "no-use-before-define": "off",
    "no-octal-escape": "error",

    // Lots of workarounds such as absolute paths to avoid people following this
    "no-restricted-imports": "off",

    radix: "error",
    "use-isnan": "error",
    "func-style": ["error", "declaration", { allowArrowFunctions: true }],

    // We're leveraging the jsx transform so we don't need this.
    "react/react-in-jsx-scope": "off",
  },
  overrides: [
    {
      files: ["**/*.tsx"],
      rules: {
        "react/prop-types": "off",
      },
    },
  ],
};
