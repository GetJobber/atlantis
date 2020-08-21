/* eslint-env node */
module.exports = {
  plugins: [
    "@jobber/docz-theme",
    /**
     * gatsby-plugin-module-resolver is needed since we are using a monorepo.
     * If docz complains that it can't resolve a package, add an entry to
     * the array below.
     */
    {
      resolve: "gatsby-plugin-module-resolver",
      options: {
        aliases: {
          "gatsby-theme-docz": "../node_modules/gatsby-theme-docz",
          "@emotion/core": "../node_modules/@emotion/core",
          "@mdx-js/react": "../node_modules/@mdx-js/react",
          docz: "../node_modules/docz",
        },
      },
    },
  ],
};
