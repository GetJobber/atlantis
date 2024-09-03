module.exports = {
  rules: {
    "import/no-internal-modules": [
      "error",
      {
        allow: ["**"],
      },
    ],
  },

  extends: ["plugin:storybook/recommended"]
};
