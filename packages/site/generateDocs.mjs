import { existsSync, mkdirSync, statSync, writeFileSync } from "fs";
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
  writtenFiles: [],
};

// Helpers for stats and IO
const recordParsed = () => {
  stats.parsed += 1;
};

const recordWritten = outputPath => {
  stats.written += 1;
  stats.writtenFiles.push(relative(__dirname, outputPath));
};

const recordSkipped = () => {
  stats.skippedUnchanged += 1;
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
const processDocumentation = componentPath => {
  // Use a relative path for parsing so docgen's filePath output matches previous behavior
  const parsePath = relative(__dirname, componentPath);
  const documentation = parse(parsePath);
  const docPipeline = [
    removeDeclarations,
    removeNonComponents,
    filterOutInheritedReactProps,
  ];

  return docPipeline.reduce(
    (docs, cleanUpFn) => cleanUpFn(docs),
    documentation,
  );
};

const prepareOutput = (cleanedDocumentation, outputPath) => {
  const outputDir = dirname(outputPath);
  const newContent = JSON.stringify(cleanedDocumentation, null, 2);
  ensureDir(outputDir);

  return newContent;
};

const parseAndWriteDocs = (componentPath, outputPath) => {
  try {
    console.log("parsing component at:", componentPath);
    const cleanedDocumentation = processDocumentation(componentPath);
    const newContent = prepareOutput(cleanedDocumentation, outputPath);
    recordParsed();

    writeOutput(outputPath, newContent);
    recordWritten(outputPath);
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
 * @param {string} outputPath Absolute or relative path to output file
 * @returns {boolean} true if output is up-to-date, false otherwise
 */

const isOutputUpToDate = (componentPath, outputPath) => {
  if (!existsSync(outputPath)) return false;
  const componentTime = statSync(componentPath).mtime;
  const outputTime = statSync(outputPath).mtime;

  return outputTime >= componentTime;
};

/**
 * Generate documentation for a component if needed (when source is newer than output).
 *
 * @param {string} componentPath Absolute path to component source
 * @param {string} outputPath Absolute path for the JSON output
 */
const generateIfNeeded = (componentPath, outputPath) => {
  if (!existsSync(componentPath)) {
    return;
  }

  if (!isOutputUpToDate(componentPath, outputPath)) {
    parseAndWriteDocs(componentPath, outputPath);
  } else {
    recordSkipped();
  }
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
 * Filter out inherited React base attributes from component docs.
 * Operate only on the top-level array returned by
 * react-docgen-typescript and the top-level `props` per component.
 *
 * - Keeps prop tables focused on component-specific props
 * - Drops any prop whose parent is a React base attribute type or originates
 *   from `@types/react`
 *
 * @param {Array} docs - array of component docs from react-docgen-typescript
 * @returns {Array} new array with filtered `props` per component
 */
const filterOutInheritedReactProps = docs => {
  if (!Array.isArray(docs)) return docs;

  // Explicit list of React parent types we want to exclude from docs.
  const REACT_PARENT_NAMES = new Set([
    "InputHTMLAttributes",
    "HTMLAttributes",
    "AriaAttributes",
    "DOMAttributes",
    "Attributes",
  ]);

  // Consider anything from @types/react an inherited React attribute as well.
  const isReactTypesFile = fileName =>
    typeof fileName === "string" &&
    fileName.includes("node_modules/@types/react");

  // Explicit keep-list: props we want to always show even if they originate
  // from @types/react (e.g., `ref`).
  const KEEP_PROP_NAMES = new Set(["ref"]);

  const filterPropsObject = propsObject => {
    if (!propsObject || typeof propsObject !== "object") return propsObject;

    return Object.entries(propsObject).reduce((acc, [propName, propDef]) => {
      const parentName = propDef?.parent?.name;
      const parentFile = propDef?.parent?.fileName;
      const isInheritedReactAttribute =
        REACT_PARENT_NAMES.has(parentName) || isReactTypesFile(parentFile);

      // Skip inherited React base attributes; keep only explicit component props,
      // except for props we intentionally surface (like `ref`).
      if (isInheritedReactAttribute && !KEEP_PROP_NAMES.has(propName)) {
        return acc;
      }

      acc[propName] = propDef;

      return acc;
    }, {});
  };

  return docs.map(componentDoc => {
    if (!componentDoc || typeof componentDoc !== "object") return componentDoc;

    const filteredProps = filterPropsObject(componentDoc.props);

    return { ...componentDoc, props: filteredProps };
  });
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
 * Resolve base directories relative to this script so the generator can be
 * executed from any working directory.
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const baseComponentDir = resolve(__dirname, "../components/src");
const baseMobileComponentDir = resolve(__dirname, "../components-native/src");
const baseOutputDir = resolve(__dirname, "./src/content");

// Default behavior: always write outputs. With -t/--touched, only write when changed.
// Note: When invoking via npm scripts, pass flags after "--" (e.g., `npm run generate -- -t`).
const args = process.argv.slice(2);
const allowedFlags = new Set(["-t", "--touched"]);
const unknownFlags = args.filter(
  a => a.startsWith("-") && !allowedFlags.has(a),
);

if (unknownFlags.length > 0) {
  console.error(
    `Unknown flag(s): ${unknownFlags.join(", ")}\n` +
      "Usage: npm run generate -- [-t|--touched]",
  );
  process.exit(1);
}

const touchedMode = args.includes("-t") || args.includes("--touched");

// Run generation depending on mode: touched mode only writes when changed,
// default mode always writes.
const generate = (componentPath, outputPath) => {
  if (touchedMode) {
    generateIfNeeded(componentPath, outputPath);
  } else {
    parseAndWriteDocs(componentPath, outputPath);
  }
};

const buildComponentDocs = name => {
  const { componentPath, outputPath } = buildPaths(
    baseComponentDir,
    baseOutputDir,
    name,
  );

  generate(componentPath, outputPath);
};

const buildMobileComponentDocs = name => {
  const { componentPath, outputPath } = buildPaths(
    baseMobileComponentDir,
    baseOutputDir,
    name,
    "-mobile",
  );

  generate(componentPath, outputPath);
};

ListOfGeneratedWebComponents.forEach(buildComponentDocs);
ListOfGeneratedMobileComponents.forEach(buildMobileComponentDocs);

// V2 auto-detection: if a rebuilt file exists, emit separate V2 props
const buildWebComponentDocsV2 = name => {
  const rebuiltPath = `${baseComponentDir}/${name}/${name}.rebuilt.tsx`;
  const v2OutputPath = `${baseOutputDir}/${name}V2/${name}V2.props.json`;

  if (existsSync(rebuiltPath)) {
    generate(rebuiltPath, v2OutputPath);
  }
};

ListOfGeneratedWebComponents.forEach(buildWebComponentDocsV2);

// Print a concise summary at the end for clarity
console.log(
  `Parsed ${stats.parsed} component(s). Updated ${stats.written} file(s). Skipped ${stats.skippedUnchanged}.`,
);

if (stats.written > 0) {
  stats.writtenFiles.forEach(file => {
    console.log(" -", file);
  });
}
