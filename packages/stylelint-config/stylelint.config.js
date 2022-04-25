/* eslint-env node */
module.exports = {
  extends: ["stylelint-config-recommended", "stylelint-config-css-modules"],
  plugins: [
    "stylelint-prettier",
    "stylelint-order",
    "stylelint-color-format",
    "stylelint-declaration-block-no-ignored-properties",
  ],
  rules: {
    "prettier/prettier": true,
    "color-format/format": { format: "rgb" },
    "plugin/declaration-block-no-ignored-properties": true,
    "order/properties-order": require("./properties-order"),
    "alpha-value-notation": "number",
  },
};
