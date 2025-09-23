module.exports = {
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        project: "tsconfig.eslint.json",
        tsconfigRootDir: __dirname,
        sourceType: "module",
      },
      rules: {
        "@typescript-eslint/consistent-type-exports": "error",
        "@typescript-eslint/consistent-type-imports": "error",
      },
    },
  ],
  rules: {
    "import/no-internal-modules": [
      "error",
      {
        allow: ["**"],
      },
    ],
  },
};
