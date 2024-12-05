/* eslint-env node */
module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
    "@babel/preset-react",
  ],
  plugins: [
    [
      "@babel/plugin-syntax-import-attributes",
      { deprecatedAssertSyntax: true },
    ],
    "babel-plugin-transform-import-meta",
  ],
};
