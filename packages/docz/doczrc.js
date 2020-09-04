/* eslint-env node */
import path from "path";
import glob from "glob";

const packages = [
  "components",
  "design",
  "docz-theme",
  "eslint-config",
  "formatters",
  "generators",
  "hooks",
  "stylelint-config",
];

export default {
  title: "🔱 Atlantis",
  description:
    "Atlantis is a design system for Jobber. The primary objective for Atlantis is to provide a system of reusable components to help developers to quickly build beautiful and consistent interfaces for our users.",
  typescript: true,
  port: 3333,
  menu: ["Atlantis", "Patterns", "Components", "Hooks", "Design"],
  themeConfig: {
    /**
     * Custom config that is available in @jobber/docz-theme,
     * will be documented in docz
     */
    favicon: "public/assets/favicon.png",
  },
  docgenConfig: { searchPath: "../components/src" },
  filterComponents: files =>
    files.filter(filepath => /\/[A-Z]\w*\.(ts|tsx)$/.test(filepath)),
  /**
   * Since our docz package is a child of `packages`, including all files
   * in packages causes docz to freeze. We need to be more specific about
   * which files we are including.
   */
  files: [
    "../../docs/**/*.{md,mdx}",
    // "./docs/**/*.{md,mdx}",
    // "../components/src/**/*.{md,mdx}",
    // "../hooks/src/**/*.{md,mdx}",
    // "../design/src/**/*.{md,mdx}",
    // "../docx/README.mdx", // <-- We should move this to @jobber/docz-theme
    // ...packages.map(pckg => `../${pckg}/CHANGELOG.{md,mdx}`),
    ...packages.map(pckg => `../${pckg}/README.{md,mdx}`),
  ],
  ignore: [
    "../../docs/CHARTER.md",
    "../../docs/proposals/**/*.{md,mdx}",
    "../generators/templates/**/*.{md,mdx}",
    ...privateComponentReadmes(),
  ],
};

function privateComponentReadmes() {
  // If specified at run time show documentation for privates components.
  if (process.env.PRIVATE_COMPONENTS === "visible") {
    return [];
  }

  /**
   * Ensure we're on atlantis root. Gatsby can also execute this file
   * from within the build directory.
   */
  const atlantis = __dirname.replace(/\/\.docz$/, "");
  const components = path.join(atlantis, `../../packages/components/src`);

  const privates = glob.sync(path.join(components, "**/.private")).map(file => {
    const directory = path
      .dirname(file)
      .replace(components, "../components/src");

    return `${directory}/**/*.{md,mdx}`;
  });

  return privates;
}
