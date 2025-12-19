/* eslint-disable max-statements */
import {
  existsSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { componentList } from "../src/componentList.js";

// Get the directory of the current script file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Script is in packages/site/scripts/, so we need to go up one level to packages/site/
const SITE_ROOT = path.resolve(__dirname, "..");
// Repo root is two levels up from site root
const REPO_ROOT = path.resolve(SITE_ROOT, "..", "..");

const buildStaticPropsAndCode = () => {
  const paths: Array<Record<string, unknown>> = [];
  console.log("building static props and code");
  componentList.forEach(component => {
    const { title, to, imageURL, sections, additionalMatches } = component;
    const pathToContent = path.join(SITE_ROOT, "src", "content", title);
    const pathToWebCode = path.join(
      REPO_ROOT,
      "packages",
      "components",
      "src",
      title,
    );
    const pathToMobileCode = path.join(
      REPO_ROOT,
      "packages",
      "components-native",
      "src",
      title,
    );
    const pathToWebProps = path.join(pathToContent, `${title}.props.json`);
    const pathToMobileProps = path.join(
      pathToContent,
      `${title}.props-mobile.json`,
    );
    const webProps = existsSync(pathToWebProps)
      ? readFileSync(pathToWebProps, "utf8")
      : "";
    const mobileProps = existsSync(pathToMobileProps)
      ? readFileSync(pathToMobileProps, "utf8")
      : "";

    let webCode = ``;
    let mobileCode = ``;
    let webTestCode = ``;
    let mobileTestCode = ``;

    if (existsSync(pathToWebCode)) {
      readdirSync(pathToWebCode).forEach(file => {
        if (file.endsWith(".tsx")) {
          const filePath = path.join(pathToWebCode, file);
          const content = readFileSync(filePath, "utf8");

          if (file.includes(".test")) {
            webTestCode += content.toString();
          } else {
            webCode += content.toString();
          }
        }
      });
    }

    if (existsSync(pathToMobileCode)) {
      readdirSync(pathToMobileCode).forEach(file => {
        if (file.endsWith(".tsx") && !file.includes(".test")) {
          const filePath = path.join(pathToMobileCode, file);
          const content = readFileSync(filePath, "utf8");

          if (file.includes(".test")) {
            mobileTestCode += content.toString();
          } else {
            mobileCode += content.toString();
          }
        }
      });
    }

    if (webCode !== "") {
      webCode =
        `${title} ${additionalMatches?.join(" ") || ""} Web React ` + webCode;
    }

    if (mobileCode !== "") {
      mobileCode =
        `${title} ${
          additionalMatches?.join(" ") || ""
        } Mobile Native React-Native ` + mobileCode;
    }

    if (webTestCode !== "") {
      webTestCode =
        `${title} ${
          additionalMatches?.join(" ") || ""
        } Web React Test Testing Jest ` + webTestCode;
    }

    if (mobileTestCode !== "") {
      mobileTestCode =
        `${title} ${
          additionalMatches?.join(" ") || ""
        } Mobile Native React-Native Testing Test Jest ` + mobileTestCode;
    }

    paths.push({
      title,
      to,
      imageURL,
      sections,
      webProps,
      webTestCode,
      mobileTestCode,
      mobileProps,
      webCode,
      mobileCode,
    });
  });
  const outputPath = path.join(
    SITE_ROOT,
    "src",
    "staticContent.generated.json",
  );
  writeFileSync(outputPath, JSON.stringify(paths));
};

const staticMap = [
  {
    title: "Design",
    dirs: [path.join(REPO_ROOT, "docs", "design")],
  },
  {
    title: "Content",
    dirs: [path.join(REPO_ROOT, "docs", "content")],
  },
  {
    title: "Guides",
    dirs: [path.join(REPO_ROOT, "docs", "introduction")],
  },
  {
    title: "Hooks",
    dirs: [path.join(REPO_ROOT, "docs", "hooks")],
  },
  {
    title: "Patterns",
    dirs: [path.join(REPO_ROOT, "docs", "patterns")],
  },
];

const content: Record<string, Array<Record<string, unknown>>> = {};

const buildStaticDocs = () => {
  console.log("building static docs");
  staticMap.forEach(({ title, dirs }) => {
    dirs.forEach(dir => {
      try {
        const dirup = readdirSync(dir);

        if (dirup) {
          for (let i = 0; i < dirup.length; i++) {
            const fileName = dirup[i];
            const filePath = path.join(dir, fileName);

            if (statSync(filePath).isFile()) {
              const mdxContent = readFileSync(filePath, "utf8");

              if (!content[title]) {
                content[title] = [];
              }
              content[title].push({
                title: fileName,
                category: title,
                content: title + " " + mdxContent,
              });
            }
          }
        }
      } catch (e) {
        console.log("ERROR:", e, dir);
      }
    });
  });
  const outputPath = path.join(SITE_ROOT, "src", "staticDocs.generated.json");
  writeFileSync(outputPath, JSON.stringify(content));
};

const buildStaticComponentDocs = () => {
  console.log("building static component docs");
  const componentDocs: Record<
    string,
    {
      title: string;
      mobileStories?: string;
      webStories?: string;
      content: string;
    }
  > = {};

  const directory = path.join(REPO_ROOT, "docs", "components");
  const dirup = readdirSync(directory, { recursive: true });
  dirup.forEach(file => {
    const fullPath = path.join(directory, file as string);
    const component = (file as string).split(path.sep)[0];

    if (statSync(fullPath).isFile()) {
      if (!componentDocs[component]) {
        componentDocs[component] = { title: component, content: "" };
      }
      const fileContent = readFileSync(fullPath, "utf8");

      if ((file as string).endsWith(".mdx")) {
        componentDocs[component].content = fileContent;
      } else if (
        (file as string).endsWith(".tsx") &&
        (file as string).includes("Mobile.")
      ) {
        componentDocs[component].mobileStories = fileContent;
      } else if (
        (file as string).endsWith(".tsx") &&
        (file as string).includes("Web.")
      ) {
        componentDocs[component].webStories = fileContent;
      }
    }
  });

  const outputPath = path.join(
    SITE_ROOT,
    "src",
    "staticComponentDocs.generated.json",
  );
  writeFileSync(outputPath, JSON.stringify(componentDocs));
};

buildStaticPropsAndCode();
buildStaticDocs();
buildStaticComponentDocs();

console.log("Successfully Generated Atlantis Static Content");
