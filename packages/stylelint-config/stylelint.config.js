/* eslint-env node */
module.exports = {
  extends: ["stylelint-config-recommended", "stylelint-config-css-modules"],
  plugins: [
    "stylelint-order",
    "stylelint-declaration-block-no-ignored-properties",
  ],
  rules: {
    "color-named": "never",
    "color-no-hex": true,
    "plugin/declaration-block-no-ignored-properties": true,
    "order/properties-order": require("./properties-order"),
    "alpha-value-notation": "number",
    "selector-max-type": [
      0,
      {
        // Allow child (.foo > a) and descendant (.foo a) for now until we need
        // to tighten things up.
        ignore: ["child", "compounded", "descendant"],
        message:
          "Please use a class name instead of styling the HTML tags. Doing so will style elements outside of your components.",
      },
    ],
  },
};
