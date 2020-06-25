/* eslint-env node */
import path from "path";
import glob from "glob";

/**
 * Return an array of private components to hide from the user.
 *
 * Atlantis contains some private components. These are indicated by an
 * empty `.private` file in the component's directory.
 *
 * @return {string[]} Private components.
 */
function privateComponentReadmes() {
  // If specified at run time show documentation for privates components.
  if (process.env.PRIVATE_COMPONENTS === "visible") {
    return [];
  }

  // Ensure we're on atlantis root. Gatsby can also execute this file
  // from within the build directory.
  const atlantisPath = __dirname.replace(/\/\.docz$/, "");

  return glob
    .sync(path.join(atlantisPath, "packages/components/src/**/.private"))
    .map(file => {
      const directory = path.dirname(file);
      const componentName = path.basename(directory);

      return (
        path
          // Construct the absolute path to ignored component.
          .join(directory, `${componentName}.mdx`)
          // Convert to relative path.
          .slice(atlantisPath.length + 1)
      );
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
  files: "{README.md,CONTRIBUTING.md,**/*.mdx,packages/*/CHANGELOG.md}",
  ignore: [
    ...privateComponentReadmes(),
    "./packages/generators/templates/**/*",
  ],
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
          borderRadius: "100%",
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
