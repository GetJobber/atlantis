/* eslint-env node */
import path from "path";
import { createPlugin } from "docz-core";
import glob from "glob";
// import { WatchIgnorePlugin } from "webpack";

const projectPlugin = () =>
  createPlugin({
    onCreateWebpackConfig: ({ rules, actions, getConfig }) => {
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
  },
};
