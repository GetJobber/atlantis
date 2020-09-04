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

// eslint-disable-next-line import/no-default-export
export default {
  title: "🔱 Atlantis",
  typescript: true,
  port: 3333,
  menu: ["Atlantis", "Patterns", "Components", "Hooks", "Design"],
  docgenConfig: {
    searchPath: "../components/src",
  },
  filterComponents: files => {
    return files.filter(filepath => /\/[A-Z]\w*\.(ts|tsx)$/.test(filepath));
  },
  files: [
    "../../docs/**/*.{md,mdx}",
    "./docs/**/*.{md,mdx}",
    "../components/src/**/*.{md,mdx}",
    "../hooks/src/**/*.{md,mdx}",
    "../design/src/**/*.{md,mdx}",
    // "../docx/README.mdx", // <-- We should move this to @jobber/docz-theme
    ...packages.map(pckg => `../${pckg}/CHANGELOG.{md,mdx}`),
    ...packages.map(pckg => `../${pckg}/README.{md,mdx}`),
  ],
  ignore: [
    "../../docs/CHARTER.md",
    "../../docs/proposals/**/*.{md,mdx}",
    "../generators/templates/**/*.{md,mdx}",
    ...privateComponentReadmes(),
  ],
  // themeConfig: {
  //   // Custom Config
  //   favicon: "public/assets/favicon.png",
  // },
  // src: ["../../components/"],
  // files: [
  //   "./docs/**/*.{md,mdx}",
  //
  //   "../components/src/Banner/Banner.mdx",
  // ],
  // docgenConfig: {
  //   searchPath: "../components/src/",
  // },
};

function privateComponentReadmes() {
  // If specified at run time show documentation for privates components.
  if (process.env.PRIVATE_COMPONENTS === "visible") {
    return [];
  }

  // Ensure we're on atlantis root. Gatsby can also execute this file
  // from within the build directory.
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
