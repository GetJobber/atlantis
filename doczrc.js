/* eslint-env node */
import path from "path";
import { createPlugin } from "docz-core";
import glob from "glob";
// import { WatchIgnorePlugin } from "webpack";

const projectPlugin = () =>
  createPlugin({
    onCreateWebpackConfig: ({ stage, rules, actions, loaders, getConfig }) => {
      // Setup CSS to allow for modules.
      // 😢 https://github.com/gatsbyjs/gatsby/issues/16129
      const config = getConfig();

      const cssRule = {
        ...rules.cssModules(),
        test: rules.css().test,
      };

      config.module.rules = [
        ...config.module.rules.filter(rule => {
          const areCssRules =
            rule.oneOf && rule.oneOf.some(r => r.test.test("style.css"));

          return !areCssRules;
        }),
        cssRule,
      ];

      config.resolve.alias = {
        ...config.resolve.alias,
        "@jobber/components": path.resolve(
          __dirname,
          "../packages/components/src",
        ),
      };

      // time-input-polyfill is incompatible with server side rendering
      if (stage.includes("html")) {
        config.module.rules.push({
          test: /time-input-polyfill/,
          use: loaders.null(),
        });
        config.module.rules.push({
          test: /(?:packages|docs)\/.*\.(?:js|jsx|ts|tsx|md|mdx)$/,
          use: loaders.null(),
        });
        config.module.rules.push({
          test: /CONTRIBUTING.md/,
          use: loaders.null(),
        });
        config.module.rules.push({
          test: /README.md/,
          use: loaders.null(),
        });
      }

      actions.replaceWebpackConfig(config);
    },
  });

function privateComponentReadmies() {
  if (process.env.PRIVATE_COMPONENTS === "visible") {
    return [];
  }
  return glob.sync("packages/components/src/**/.private").map(file => {
    const directory = path.dirname(file);
    const componentName = path.basename(directory);
    return path.join(directory, `${componentName}.mdx`);
  });
}

// eslint-disable-next-line import/no-default-export
export default {
  title: "🔱 Atlantis",
  description:
    "Atlantis is a design system for Jobber. The primary objective for Atlantis is to provide a system of reusable components to help developers to quickly build beautiful and consistent interfaces for our users.",
  typescript: true,
  port: 3333,
  menu: ["Atlantis", "Patterns", "Components"],
  files: "{README.md,CONTRIBUTING.md,**/*.mdx}",
  ignore: [
    ...privateComponentReadmies(),
    "./packages/generators/templates/**/*",
  ],
  plugins: [projectPlugin()],
  themeConfig: {
    showDarkModeSwitch: false,
    fonts: {
      body: '"Source Sans Pro", sans-serif',
      heading: '"Poppins", sans-serif',
      monospace: '"Anonymous Pro", monospace',
    },
  },
};
