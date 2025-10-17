import { existsSync, mkdirSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import ts from "typescript";
import { withCompilerOptions } from "react-docgen-typescript";
import {
  ListOfGeneratedMobileComponents,
  ListOfGeneratedWebComponents,
} from "./baseComponentLists.mjs";

// Load tsconfig once and build compiler options
const tsconfigPath = resolve(process.cwd(), "../../tsconfig.json");
const { config: tsconfigJson } = ts.readConfigFile(
  tsconfigPath,
  ts.sys.readFile,
);
const parsedConfig = ts.parseJsonConfigFileContent(
  tsconfigJson,
  ts.sys,
  resolve(process.cwd(), "../.."),
);

// Create a single parser with our compiler options and filter props during parse
const parser = withCompilerOptions(parsedConfig.options, {
  // Avoid expensive expansions that aren't needed for docs
  shouldExtractValuesFromUnion: false,
  shouldExtractLiteralValuesFromEnum: false,
  shouldRemoveUndefinedFromOptional: true,
  savePropValueAsString: true,
  propFilter: prop => {
    // Drop inherited React props; keep `ref`
    if (prop.name === "ref") return true;

    const parentName = prop.parent?.name;
    const parentFile = prop.parent?.fileName ?? "";
    const isReactTypes =
      typeof parentFile === "string" &&
      parentFile.includes("node_modules/@types/react");

    if (isReactTypes) return false;

    const REACT_PARENT_NAMES = new Set([
      "InputHTMLAttributes",
      "HTMLAttributes",
      "AriaAttributes",
      "DOMAttributes",
      "Attributes",
    ]);

    if (REACT_PARENT_NAMES.has(parentName)) return false;

    return true;
  },
});

// Cache a single Program to reuse across all parses
let cachedProgram;

const getProgram = () => {
  if (!cachedProgram) {
    cachedProgram = ts.createProgram({
      rootNames: parsedConfig.fileNames,
      options: parsedConfig.options,
    });
  }

  return cachedProgram;
};

/**
 * This script is used to generate the *.props.json files under the src/content directory of this repo.
 *
 * The script uses react-docgen-typescript to parse our Typescript Component files, and generate a JSON representation that we can then
 * display to our consumers.
 *
 * These props can be parsed without the need for the library, but react-docgen-typescript a battle-tested approach that we don't
 * have to own. I believe the project is currently looking for a maintainer, and the community was/is pressuring Storybook
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
  const documentation = parser.parseWithProgramProvider(
    componentPath,
    getProgram,
  );
  const docPipeline = [
    removeNonComponents,
    filterOutInheritedReactProps,
    normalizePathsToRepo,
    normalizeTypes,
    sortDocsDeterministically,
  ];
  const cleanedDocumentation = docPipeline.reduce(
    (docs, cleanUpFn) => cleanUpFn(docs),
    documentation,
  );

  const outputDir = dirname(outputPath);
  mkdirSync(outputDir, { recursive: true });

  console.log("writing documentation to:", outputPath);
  writeFileSync(
    outputPath,
    JSON.stringify(
      cleanedDocumentation,
      (key, value) => (key === "declarations" ? undefined : value),
      2,
    ),
  );
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
  doc = doc.filter(item => item.displayName.match(/^[A-Z]/));

  return doc;
};

// Explicit list of React parent types we want to exclude from docs.
const REACT_PARENT_NAMES = new Set([
  "InputHTMLAttributes",
  "HTMLAttributes",
  "AriaAttributes",
  "DOMAttributes",
  "Attributes",
]);

// Explicit keep-list: props we want to always show even if they originate
// from @types/react (e.g., `ref`).
const KEEP_PROP_NAMES = new Set(["ref"]);

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
  if (docs.length === 0) return docs;

  // Consider anything from @types/react an inherited React attribute as well.
  const isReactTypesFile = fileName =>
    typeof fileName === "string" &&
    fileName.includes("node_modules/@types/react");

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

// Normalize absolute paths to repo-relative for determinism across machines/CI
const repoRoot = resolve(process.cwd(), "../..");

const toRepoRelative = filePath => {
  if (!filePath || typeof filePath !== "string") return filePath;
  const rel = filePath.startsWith("/")
    ? filePath.slice(repoRoot.length + (filePath.startsWith(repoRoot) ? 1 : 0))
    : filePath;

  return rel.replace(/\\\\/g, "/");
};

const normalizePathsToRepo = docs => {
  return docs.map(doc => {
    if (!doc || typeof doc !== "object") return doc;

    const normalizedProps = Object.entries(doc.props || {}).reduce(
      (acc, [propName, propDef]) => {
        if (propDef && typeof propDef === "object" && propDef.parent) {
          acc[propName] = {
            ...propDef,
            parent: {
              ...propDef.parent,
              fileName: toRepoRelative(propDef.parent.fileName),
            },
          };
        } else {
          acc[propName] = propDef;
        }

        return acc;
      },
      {},
    );

    return {
      ...doc,
      filePath: toRepoRelative(doc.filePath),
      props: normalizedProps,
    };
  });
};

// Normalize type names (remove redundant outer parentheses around function types)
const stripRedundantParens = typeName => {
  if (typeof typeName !== "string") return typeName;
  const t = typeName.trim();

  if (t.startsWith("((") && t.endsWith("))")) {
    return t.slice(1, -1);
  }

  return t;
};

const normalizeTypes = docs => {
  return docs.map(doc => {
    if (!doc || typeof doc !== "object") return doc;
    const normalizedProps = Object.entries(doc.props || {}).reduce(
      (acc, [propName, propDef]) => {
        if (propDef && typeof propDef === "object" && propDef.type) {
          acc[propName] = {
            ...propDef,
            type: {
              ...propDef.type,
              name: stripRedundantParens(propDef.type.name),
            },
          };
        } else {
          acc[propName] = propDef;
        }

        return acc;
      },
      {},
    );

    return { ...doc, props: normalizedProps };
  });
};

// Deterministic ordering for docs and their props
const sortObjectKeys = obj =>
  Object.keys(obj || {})
    .sort((a, b) => a.localeCompare(b))
    .reduce((acc, key) => {
      acc[key] = obj[key];

      return acc;
    }, {});

const sortDocsDeterministically = docs => {
  const sortedDocs = [...docs].sort((a, b) => {
    const aName = a?.displayName || "";
    const bName = b?.displayName || "";

    return (
      aName.localeCompare(bName) ||
      (a?.filePath || "").localeCompare(b?.filePath || "")
    );
  });

  return sortedDocs.map(doc => ({
    ...doc,
    props: sortObjectKeys(doc.props),
  }));
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
  const componentPath = `${baseComponentDir}/${componentName}/${componentName}.tsx`;
  const outputPath = `${baseOutputDir}/${componentName}/${componentName}.props${tack}.json`;

  return { componentPath, outputPath };
};

/**
 * In a library world, these would be provided at run-time for more reusability but this script is hyper-specific for now.
 *
 * With these as relative paths, we also need to make sure we build from the correct location. An
 * improvement in the future would be take in the location of the script, and work from there instead (__dirname in the old world).
 */
const baseComponentDir = `../components/src`;
const baseMobileComponentDir = `../components-native/src`;
const baseOutputDir = "./src/content";

const buildComponentDocs = name => {
  const { componentPath, outputPath } = buildPaths(
    baseComponentDir,
    baseOutputDir,
    name,
  );
  parseAndWriteDocs(componentPath, outputPath);
};

const buildMobileComponentDocs = name => {
  const { componentPath, outputPath } = buildPaths(
    baseMobileComponentDir,
    baseOutputDir,
    name,
    "-mobile",
  );
  parseAndWriteDocs(componentPath, outputPath);
};

ListOfGeneratedWebComponents.forEach(buildComponentDocs);

ListOfGeneratedMobileComponents.forEach(buildMobileComponentDocs);

// V2 auto-detection: if a rebuilt file exists, emit separate V2 props
const buildWebComponentDocsV2 = name => {
  const rebuiltPath = `${baseComponentDir}/${name}/${name}.rebuilt.tsx`;
  // Write V2 props into the same directory as V1: <Component>/<Component>V2.props.json
  const v2OutputPath = `${baseOutputDir}/${name}/${name}V2.props.json`;

  if (existsSync(rebuiltPath)) {
    parseAndWriteDocs(rebuiltPath, v2OutputPath);
  }
};

ListOfGeneratedWebComponents.forEach(buildWebComponentDocsV2);
