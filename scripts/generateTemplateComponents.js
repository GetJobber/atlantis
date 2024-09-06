/* eslint-disable max-statements */
const fs = require("fs");
const path = require("path");

function findWebStoriesFiles(dir) {
  let results = [];

  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      results = results.concat(findWebStoriesFiles(filePath));
    } else if (file === "Web.stories.tsx") {
      results.push(filePath);
    }
  });

  return results;
}

function generateComponentTemplates() {
  const componentsDir = path.join(__dirname, "..", "docs", "components");
  const paths = findWebStoriesFiles(componentsDir);

  const result = {};

  return paths.map(filePath => {
    const content = fs.readFileSync(filePath, "utf-8");
    const componentName = path.basename(path.dirname(filePath));
    const argsMatch = content.match(/Basic\.args\s*=\s*{([^}]*)}/);

    let args = [];

    if (argsMatch) {
      const argsString = argsMatch[1];
      args = argsString
        .split(",")
        .map(arg => arg.split(":")[0].trim().replace(/['"]/g, ""))
        .filter(Boolean);
    }

    result[componentName] = args;

    const outputDir = path.join(
      __dirname,
      "..",
      "packages",
      "components",
      "src",
      "utils",
      "meta",
    );
    const outputFilePath = path.join(outputDir, "extension-components.json");

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(outputFilePath, JSON.stringify(result, null, 2), "utf-8");

    return result;
  });
}

generateComponentTemplates();
