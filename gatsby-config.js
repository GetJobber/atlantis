/* eslint-env node */
module.exports = {
  plugins: [
    "@jobber/docz-tools",
    {
      resolve: "gatsby-plugin-compile-es6-packages",
      options: {
        modules: ["@jobber/docz-tools"],
      },
    },
  ],
};
