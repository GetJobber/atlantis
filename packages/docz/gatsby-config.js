/* eslint-env node */
module.exports = {
  plugins: [
    "@jobber/docz-theme",
    {
      resolve: "gatsby-plugin-module-resolver",
      options: {
        aliases: {
          "@jobber/components": "../../components/src",
          "gatsby-theme-docz": "../node_modules/gatsby-theme-docz",
          react: "../node_modules/react",
          docz: "../node_modules/docz",
        },
      },
    },
  ],
};
