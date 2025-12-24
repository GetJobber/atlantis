import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { createRequire } from "module";
import path, { dirname } from "path";
// eslint-disable-next-line import/order
import { fileURLToPath } from "url";

const require = createRequire(import.meta.url);
const { sync: globSync } = require("glob");

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const SITE_ROOT = path.resolve(__dirname, "..");
const REPO_ROOT = path.resolve(SITE_ROOT, "..", "..");
const OUTPUT_DIR = path.join(SITE_ROOT, "public", "staticContent");

// Function to extract content and create JSON objects
const extractFiles = (
  dir: string,
  filename: string,
  glob = "/**/*.{tsx,mdx,md,css,json}",
): Record<string, { content: string }> => {
  console.log(`Extracting content from files: ${dir}${glob} -> ${filename}`);
  const files = globSync(`${dir}${glob}`);
  const result: Record<string, { content: string }> = {};

  for (const file of files) {
    try {
      const content = readFileSync(file, "utf8");
      const relativePath = path.relative(REPO_ROOT, file);
      result[relativePath] = { content };
      console.log(`  Added: ${relativePath}`);
    } catch (e) {
      console.error(`  Error reading file ${file}:`, e);
    }
  }

  return result;
};

// Ensure output directory exists
if (!existsSync(OUTPUT_DIR)) {
  mkdirSync(OUTPUT_DIR, { recursive: true });
}

const componentsDir = path.join(REPO_ROOT, "packages", "components", "src");
const mobileComponentsDir = path.join(
  REPO_ROOT,
  "packages",
  "components-native",
  "src",
);
const docsDir = path.join(REPO_ROOT, "docs");
const componentDocsDir = path.join(REPO_ROOT, "docs", "components");
const designDir = path.join(REPO_ROOT, "packages", "design");
const siteContentDir = path.join(SITE_ROOT, "src", "content");

console.log("Building static content JSON files");

// Extract and write JSON files for each content type
const componentWebProps = extractFiles(
  siteContentDir,
  "componentWebProps",
  "/**/*.props.json",
);
writeFileSync(
  path.join(OUTPUT_DIR, "webProps.json"),
  JSON.stringify(componentWebProps),
);

const componentMobileProps = extractFiles(
  siteContentDir,
  "componentMobileProps",
  "/**/*.props-mobile.json",
);
writeFileSync(
  path.join(OUTPUT_DIR, "mobileProps.json"),
  JSON.stringify(componentMobileProps),
);

const componentWeb = extractFiles(componentsDir, "componentWeb", "/**/*.tsx");
writeFileSync(
  path.join(OUTPUT_DIR, "components.json"),
  JSON.stringify(componentWeb),
);

const componentMobile = extractFiles(
  mobileComponentsDir,
  "componentMobile",
  "/**/*.tsx",
);
writeFileSync(
  path.join(OUTPUT_DIR, "mobileComponents.json"),
  JSON.stringify(componentMobile),
);

const webDocs = extractFiles(
  componentDocsDir,
  "webDocs",
  "/**/Web.stories.tsx",
);
writeFileSync(path.join(OUTPUT_DIR, "webDocs.json"), JSON.stringify(webDocs));

const mobileDocs = extractFiles(
  componentDocsDir,
  "mobileDocs",
  "/**/Mobile.stories.tsx",
);
writeFileSync(
  path.join(OUTPUT_DIR, "mobileDocs.json"),
  JSON.stringify(mobileDocs),
);

const sharedDocs = extractFiles(
  path.join(docsDir, "design"),
  "sharedDocs",
  "/**/*.mdx",
);
writeFileSync(
  path.join(OUTPUT_DIR, "sharedDocs.json"),
  JSON.stringify(sharedDocs),
);

const designDocs: Record<string, { content: string }> = {};
const designDocsDirs = [
  path.join(siteContentDir, "changelog"),
  path.join(docsDir, "content"),
  path.join(siteContentDir, "guides"),
  path.join(siteContentDir, "hooks"),
  path.join(siteContentDir, "packages"),
  path.join(siteContentDir, "patterns"),
];

const storiesDocs = extractFiles(docsDir, "designDocs", "/**/*.stories.mdx");
Object.assign(designDocs, storiesDocs);

for (const dir of designDocsDirs) {
  if (existsSync(dir)) {
    const dirDocs = extractFiles(dir, "designDocs", "/**/*.mdx");
    Object.assign(designDocs, dirDocs);
  }
}
writeFileSync(
  path.join(OUTPUT_DIR, "designDocs.json"),
  JSON.stringify(designDocs),
);

const componentCSS = extractFiles(componentsDir, "componentCSS", "/**/*.css");
writeFileSync(
  path.join(OUTPUT_DIR, "componentCSS.json"),
  JSON.stringify(componentCSS),
);

const designCSS = extractFiles(designDir, "designCSS", "/**/*.css");
writeFileSync(
  path.join(OUTPUT_DIR, "designCSS.json"),
  JSON.stringify(designCSS),
);

console.log("Successfully Generated Atlantis Static Content Files");
