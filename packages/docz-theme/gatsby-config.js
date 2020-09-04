/* eslint-env node */
module.exports = {
  plugins: [
    {
      resolve: "gatsby-plugin-compile-es6-packages",
      options: {
        modules: [
          "docz",
          "docz-core",
          "gatsby-theme-docz",
          "@jobber/components",
          "@jobber/design",
        ],
      },
    },
  ],
};
