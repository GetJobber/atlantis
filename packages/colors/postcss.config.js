/* eslint-env node */
module.exports = {
  plugins: [
    require("postcss-preset-env")({
      exportTo: ["colors.css", "colors.js", "colors.json"],
    }),
  ],
};
