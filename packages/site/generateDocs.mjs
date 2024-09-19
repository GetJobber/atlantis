import { mkdirSync, writeFileSync } from "fs";
import { dirname } from "path";
import { parse } from "react-docgen-typescript";

const parseAndWriteDocs = (componentPath, outputPath) => {
  console.log("parsing component at:", componentPath);
  const documentation = parse(componentPath);

  const outputDir = dirname(outputPath);
  mkdirSync(outputDir, { recursive: true });

  console.log("writing documentation to:", outputPath);
  writeFileSync(outputPath, JSON.stringify(documentation, null));
};

const buildPaths = (baseComponentDir, baseOutputDir, componentName) => {
  const componentPath = `${baseComponentDir}/${componentName}/${componentName}.tsx`;
  const outputPath = `${baseOutputDir}/${componentName}/${componentName}.props.json`;

  return { componentPath, outputPath };
};

const baseComponentDir = `../components/src`;
const baseOutputDir = "./src/content";

const buildComponentDocs = name => {
  const { componentPath, outputPath } = buildPaths(
    baseComponentDir,
    baseOutputDir,
    name,
  );
  parseAndWriteDocs(componentPath, outputPath);
};

const components = [
  "AnimatedPresence",
  "Button",
  "Checkbox",
  "Chip",
  "Disclosure",
  "StatusLabel",
  "Switch",
];

components.forEach(buildComponentDocs);
