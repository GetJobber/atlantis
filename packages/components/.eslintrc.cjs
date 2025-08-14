module.exports = {
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  rules: {
    "@typescript-eslint/consistent-type-exports": "error",
    "@typescript-eslint/consistent-type-imports": "error",
    "import/no-internal-modules": [
      "error",
      {
        allow: ["**"],
      },
    ],
  },
};
