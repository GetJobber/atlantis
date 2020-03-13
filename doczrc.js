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
          test: /(?:packages|docs)\/.*\.(?:js|jsx|ts|tsx)$/,
          use: loaders.null(),
        });
        config.module.rules.push({
          test: /.*\.(?:md|mdx)$/,
          use: path.resolve("../src/null-markdown-loader.js"),
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
    fontSizes: [
      "var(--typography--fontSize-smaller)",
      "var(--typography--fontSize-small)",
      "var(--typography--fontSize-base)",
      "var(--typography--fontSize-large)",
      "var(--typography--fontSize-larger)",
      "var(--typography--fontSize-largest)",
      "var(--typography--fontSize-jumbo)",
      "var(--typography--fontSize-extravagant)",
    ],
    colors: {
      green: "var(--color-green)",
      border: "var(--color-grey--lighter)",
      text: "var(--color-blue--dark)",
      primary: "var(--color-green)",
      playground: {
        border: "var(--color-grey--lighter)",
      },
      props: {
        bg: "var(--color-grey--lightest)",
      },
      sidebar: {
        bg: "var(--color-greyBlue--dark)",
        navGroup: "var(--color-greyBlue--lighter)",
        navLink: "var(--color-white)",
        navLinkActive: "var(--color-white)",
        tocLink: "var(--color-greyBlue--lighter)",
        tocLinkActive: "var(--color-white)",
      },
    },
    navigation: {
      level1: {
        mb: 3,
        ml: 0,
        pl: 0,
        fontFamily: "fonts.heading",
        fontSize: 2,
        fontWeight: 800,
        textTransform: "uppercase",
        letterSpacing: "0.02rem",
        "&::before, &.active::before": {
          display: "none",
        },
      },
      level2: {
        position: "relative",
        pl: 3,
        ml: 0,
        fontSize: 2,
        transition: "background 200ms ease 0s",
        color: "var(--color-greyBlue--lighter)",
        "&::before": {
          content: "''",
          position: "absolute",
          top: 2,
          left: 0,
          width: 6,
          height: 6,
          border: "1px solid var(--color-greyBlue--light)",
          borderRadius: 100,
        },
        "&.active": {
          color: "var(--color-white)",
        },
        "&:hover::before, &.active::before": {
          transition: "background 200ms ease 0s",
          bg: "var(--color-green)",
          borderColor: "var(--color-green)",
        },
      },
      level3: {
        position: "relative",
        ml: 3,
        pl: 3,
        fontSize: 2,
        color: "var(--color-greyBlue--light)",
        "&::before": {
          content: "'>'",
          position: "absolute",
          fontFamily: "monospace",
          left: 0,
          mr: 1,
        },
        "&.active::before": {
          content: "'>'",
        },
      },
    },
    prism: {
      light: {
        plain: {
          backgroundColor: "var(--color-grey--lightest)",
        },
      },
    },
  },
};
