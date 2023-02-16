/* eslint-env node */
import path from "path";
import glob from "glob";

const packages = getPackagesToDocument();
const privateComponents = privateComponentReadmes();

// eslint-disable-next-line import/no-default-export
export default {
  title: "🔱 Atlantis",
  description:
    "Atlantis is a design system for Jobber. The primary objective for Atlantis is to provide a system of reusable components to help developers to quickly build beautiful and consistent interfaces for our users.",
  typescript: true,
  port: 3333,
  host: "0.0.0.0",
  menu: ["Atlantis", "Patterns", "Components", "Hooks", "Design"],
  files: [
    "./docs/**/*.{md,mdx}",
    ...packages.map(
      pckg => `./packages/${pckg}/src/**/*.{md,mdx,!stories.mdx}`,
    ),
    ...packages.map(pckg => `./packages/${pckg}/README.{md,mdx}`),
    ...packages.map(pckg => `./packages/${pckg}/CHANGELOG.md`),
  ],
  ignore: [
    "./docs/CHARTER.md",
    "./docs/proposals/**/*",
    "./packages/generators/templates/**/*",
    "./packages/**/dist/**/*",
    "**/node_modules/**",
    "./docz",
    "./github",
    "./public",
    "**/__mocks__",
    ...privateComponents,
  ],
};

function getPackagesToDocument() {
  return [
    "components",
    "design",
    "eslint-config",
    "formatters",
    "generators",
    "hooks",
    "docx",
    "stylelint-config",
    "docz-tools",
  ];
}

function privateComponentReadmes() {
  // If specified at run time show documentation for privates components.
  if (process.env.PRIVATE_COMPONENTS === "visible") {
    return [];
  }

  const atlantis = __dirname.replace(/\/\.docz$/, "");
  const components = path.join(atlantis, "packages", "components", "src");

  const privates = glob
    .sync(path.join(components, "/**/.private"))
    .map(file => {
      const directory = path.dirname(file);
      const component = path.basename(directory);
      return path
        .join(directory, `${component}.mdx`)
        .slice(atlantis.length + 1);
    });

  return privates.map(p => `./${p}`);
}
