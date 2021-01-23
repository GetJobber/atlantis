/* eslint-env node */
exports.onCreateWebpackConfig = ({
  stage,
  rules,
  actions,
  loaders,
  getConfig,
}) => {
  const config = getConfig();

  /**
   * Gatsby does not like that we use css modules. To fix this we need
   * to change some of the webpack config around how we handle css.
   * 😢 More info here: https://github.com/gatsbyjs/gatsby/issues/16129
   */
  const cssRule = {
    ...rules.cssModules(),
    test: rules.css().test,
    include: /^((?!node_modules).)*$/,
  };

  /**
   * Don't process css from npm packages as modules.
   */
  const libCssRule = {
    ...rules.css(),
    test: rules.css().test,
    include: /node_modules/,
  };

  config.module.rules = [
    ...config.module.rules.filter(rule => {
      const areCssRules =
        rule.oneOf && rule.oneOf.some(r => r.test.test("style.css"));

      return !areCssRules;
    }),
    libCssRule,
    cssRule,
  ];

  // Situationally disable serverside rendering.
  if (stage.includes("html")) {
    config.module.rules.push({
      test: /(?:packages|docs)\/.*\.(?:js|jsx|ts|tsx)$/,
      use: loaders.null(),
    });
  }

  actions.replaceWebpackConfig(config);
};
