module.exports = {
  env: { browser: true, es6: true },
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
  ],
  plugins: ["@typescript-eslint", "react", "import"],
  settings: {
    react: { version: "detect" },
    "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    "import/order": "error",
    "import/no-default-export": "error",
    'import/no-unresolved': ['error', {
      ignore: ["\.css$"],
    }],
    'import/named': 'error',
    'import/namespace': 'error',
    'import/default': 'error',
    'import/export': 'error',
    'import/no-duplicates': 'error',
    "import/no-extraneous-dependencies": "error",
    "import/no-internal-modules": "error",
    "import/no-named-default": "error",
    "import/no-cycle": ["error", { maxDepth: Infinity }],
    "import/no-useless-path-segments": "error",
    "import/no-relative-parent-imports": "warn",
    "prettier/prettier": [
      "error",
      { trailingComma: "all" },
      { usePrettierrc: false },
    ],
    "@typescript-eslint/no-use-before-define": ["error", { functions: false }],
    "@typescript-eslint/explicit-function-return-type": "off",
  },
};
