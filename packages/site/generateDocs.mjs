import { mkdirSync, writeFileSync } from "fs";
import { dirname } from "path";
import { parse } from "react-docgen-typescript";

/**
 * This script is used to generate the *.props.json files under the src/content directory of this repo.
 *
 * The script uses react-docgen-typescript to parse our Typescript Component files, and generate a JSON representation that we can then
 * display to our consumers.
 *
 * These props can be parsed without the need for the library, but react-docgen-typescript a battle-tested approach that we don't
 * have to own. I believe the project is currently looking for a maintainer, and the community was/is pressuruing Storybook
 * to take it on, since it's a critical part of their system.
 *
 * These prop files are then used to generate the list of Props for every component on our documentation site.
 *
 */

/**
 * Take in a component location, and where you want the output written. We will parse the component contents at the provided location, and write the
 * associated JSON file in the provided output location.
 * @param {string} componentPath
 * @param {string} outputPath
 */
const parseAndWriteDocs = (componentPath, outputPath) => {
  console.log("parsing component at:", componentPath);
  const documentation = parse(componentPath);

  const outputDir = dirname(outputPath);
  mkdirSync(outputDir, { recursive: true });

  console.log("writing documentation to:", outputPath);
  writeFileSync(outputPath, JSON.stringify(documentation, null, 2));
};

/**
 * Takes in 3 pieces of information (component directory, output directory, and componentname) and builds a standard path object from it.
 *
 * The pattern is currently to have a directory in the components directory that matches the component name.
 *
 * @param {string} baseComponentDir
 * @param {string} baseOutputDir
 * @param {string} componentName
 * @returns {{componentPath: string, outputPath: string}}
 */
const buildPaths = (baseComponentDir, baseOutputDir, componentName) => {
  const componentPath = `${baseComponentDir}/${componentName}/${componentName}.tsx`;
  const outputPath = `${baseOutputDir}/${componentName}/${componentName}.props.json`;

  return { componentPath, outputPath };
};

/**
 * In a library world, these would be provided at run-time for more reusability but this script is hyper-specific for now.
 *
 * With these as relative paths, we also need to make sure we build from the correct location. An
 * improvement in the future would be take in the location of the script, and work from there instead (__dirname in the old world).
 */
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

/**
 * List of components to build documentation for. There is a future in which this list is dynamically generated from an 'ls' command or similar.
 * For now though, since not ALL the components are in the system, we're building manually.
 */
const components = [
  "AnimatedPresence",
  "AnimatedSwitcher",
  "Autocomplete",
  "Button",
  "Checkbox",
  "Chip",
  "Disclosure",
  "StatusLabel",
  "Switch",
];

components.forEach(buildComponentDocs);
