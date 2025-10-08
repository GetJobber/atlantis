import {
  existsSync,
  mkdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "fs";
import { dirname, join, relative, resolve } from "path";
import { fileURLToPath } from "url";
import { parse } from "react-docgen-typescript";
import {
  ListOfGeneratedMobileComponents,
  ListOfGeneratedWebComponents,
} from "./baseComponentLists.mjs";

// Summary stats for clear output
const stats = {
  parsed: 0,
  written: 0,
  skippedUnchanged: 0,
  parsedFiles: [],
  writtenFiles: [],
  skippedUnchangedFiles: [],
};

// Helpers for stats and IO
const recordParsed = componentPath => {
  stats.parsed += 1;
  stats.parsedFiles.push(componentPath);
};

const recordWritten = outputPath => {
  stats.written += 1;
  stats.writtenFiles.push(relative(__dirname, outputPath));
};

const recordSkipped = outputPath => {
  stats.skippedUnchanged += 1;
  stats.skippedUnchangedFiles.push(relative(__dirname, outputPath));
};

const ensureDir = dir => {
  mkdirSync(dir, { recursive: true });
};

const writeOutput = (outputPath, content) => {
  console.log("writing documentation to:", outputPath);
  writeFileSync(outputPath, content);
};

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
 * Parse a component file and write its cleaned JSON to the output path.
 * Skips the write when the generated content has not changed.
 *
 * @param {string} componentPath Absolute path to component source
 * @param {string} outputPath Absolute path for the JSON output
 */
const parseAndWriteDocs = (componentPath, outputPath) => {
  try {
    console.log("parsing component at:", componentPath);
    const documentation = parse(componentPath),
      cleanedDocumentation = cleanDoc(documentation),
      outputDir = dirname(outputPath),
      newContent = JSON.stringify(cleanedDocumentation, null, 2);
    ensureDir(outputDir);
    const shouldWrite = !existsSync(outputPath)
      ? true
      : newContent !== readFileSync(outputPath, "utf8");
    recordParsed(componentPath);

    if (shouldWrite) {
      writeOutput(outputPath, newContent);
      recordWritten(outputPath);
    } else {
      recordSkipped(outputPath);
    }
  } catch (error) {
    console.error("Failed to generate docs for:", componentPath, "\n", error);
  }
};

/**
 * Check if the generated output is up-to-date with respect to the source file
 * by comparing modification times. Returns true if output exists and is newer
 * or equal to the source; false otherwise.
 *
 * @param {string} componentPath Absolute or relative path to component source
 * @param {string} outputPath Absolute path to JSON output
 */
const isOutputUpToDate = (componentPath, outputPath) => {
  if (!existsSync(outputPath)) return false;

  try {
    const srcStat = statSync(componentPath);
    const outStat = statSync(outputPath);

    return outStat.mtimeMs >= srcStat.mtimeMs;
  } catch (_err) {
    return false;
  }
};

/**
 * Generate docs for a component only when the output is missing or stale.
 * Handles building the relative parse path and skips work when safe.
 */
const generateIfNeeded = (componentPath, outputPath) => {
  const parsePath = relative(__dirname, componentPath);
  if (isOutputUpToDate(parsePath, outputPath)) return;

  parseAndWriteDocs(parsePath, outputPath);
};

/**
 * react-docgen-typescript parses every export from the component file, which
 * includes functions that are not components.
 *
 * This method filters out any items that start with a lowercase letter, which is almost always
 * non-component function exports.
 *
 * @param {object} doc
 * @returns The doc without any functions
 */
const removeNonComponents = doc => {
  doc = doc.filter(item => {
    return Boolean(
      item &&
        typeof item.displayName === "string" &&
        /^[A-Z]/.test(item.displayName),
    );
  });

  return doc;
};

/**
 * The 'declarations' field within the generated JSON output are all the instances where the prop is referenced. Normally it's a single field, maybe two.
 * In some of our components, we're making heavy use of the XOR operator to allow and disallow certain props from being used together.
 * When react-docgen-typescript generates the JSON, it includes every variation of these references which are not useful for our documentation site.
 * In the case of Button in particular, it generated thousands of lines of JSON that were not useful (outside of the signal that our props were too complicated, which we knew already).
 *
 * We use this small recursive method (generated by GPT) to remove all instances of 'declarations' from the JSON output.
 *
 * If there's a smarter way to do this, we're all ears! This was a quick solution that is easy to remove later if we just fix our XOR usages.
 *
 * It's possible this could be used as a signal to when our props are too complicated, but that's a different conversation.
 *
 * @param {JSON} doc
 * @returns JSON without any keys called 'declarations'
 */
const removeDeclarations = doc => {
  if (Array.isArray(doc)) {
    return doc.map(removeDeclarations);
  } else if (typeof doc === "object" && doc !== null) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { declarations, ...rest } = doc;

    return Object.keys(rest).reduce((acc, key) => {
      acc[key] = removeDeclarations(rest[key]);

      return acc;
    }, {});
  }

  return doc;
};

/**
 * Combine all cleaning steps for documentation into a single function.
 *
 * @param {unknown} doc
 * @returns cleaned doc
 */
const cleanDoc = doc => removeNonComponents(removeDeclarations(doc));

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
const buildPaths = (
  baseComponentDir,
  baseOutputDir,
  componentName,
  tack = "",
) => {
  const componentPath = join(
    baseComponentDir,
    componentName,
    `${componentName}.tsx`,
  );
  const outputPath = join(
    baseOutputDir,
    componentName,
    `${componentName}.props${tack}.json`,
  );

  return { componentPath, outputPath };
};

/**
 * Build paths for V2 (rebuilt) components. V2 files follow the naming pattern
 * <Component>/<Component>.rebuilt.tsx and we output to a distinct folder
 * <Component>V2/<Component>V2.props.json so it won't interfere with the
 * existing site UI until it's ready to consume V2 docs.
 *
 * @param {string} baseComponentDir
 * @param {string} baseOutputDir
 * @param {string} componentName
 * @returns {{componentPath: string, outputPath: string}}
 */
const buildV2Paths = (baseComponentDir, baseOutputDir, componentName) => {
  const componentPath = join(
    baseComponentDir,
    componentName,
    `${componentName}.rebuilt.tsx`,
  );
  const outputPath = join(
    baseOutputDir,
    `${componentName}V2`,
    `${componentName}V2.props.json`,
  );

  return { componentPath, outputPath };
};

/**
 * Resolve base directories relative to this script so the generator can be
 * executed from any working directory.
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const baseComponentDir = resolve(__dirname, "../components/src");
const baseMobileComponentDir = resolve(__dirname, "../components-native/src");
const baseOutputDir = resolve(__dirname, "./src/content");

const buildComponentDocs = name => {
  const { componentPath, outputPath } = buildPaths(
    baseComponentDir,
    baseOutputDir,
    name,
  );
  generateIfNeeded(componentPath, outputPath);
};

const buildMobileComponentDocs = name => {
  const { componentPath, outputPath } = buildPaths(
    baseMobileComponentDir,
    baseOutputDir,
    name,
    "-mobile",
  );
  generateIfNeeded(componentPath, outputPath);
};

ListOfGeneratedWebComponents.forEach(buildComponentDocs);
ListOfGeneratedMobileComponents.forEach(buildMobileComponentDocs);

/**
 * Additionally, auto-detect and generate docs for any V2 (rebuilt) web components
 * without needing to hardcode them. This sets up the content files now so the
 * site can display them when the UI is ready.
 */
const buildWebComponentDocsV2 = name => {
  const { componentPath, outputPath } = buildV2Paths(
    baseComponentDir,
    baseOutputDir,
    name,
  );

  if (existsSync(componentPath)) {
    generateIfNeeded(componentPath, outputPath);
  }
};

ListOfGeneratedWebComponents.forEach(buildWebComponentDocsV2);

// Print a concise summary at the end for clarity
if (stats.written === 0) {
  console.log("No changes detected. Component docs are up-to-date.");
} else {
  console.log(
    `Generated/updated ${stats.written} file(s). Parsed ${stats.parsed} component(s).`,
  );
  stats.writtenFiles.forEach(file => {
    console.log(" -", file);
  });
}
