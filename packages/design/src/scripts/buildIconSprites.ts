/* eslint-disable max-statements */
import * as fs from "node:fs";
import * as path from "node:path";
import { glob } from "glob";
import { parse } from "node-html-parser";

const cwd = process.cwd();
const inputDir = path.join(cwd, "src", "icons");
const inputDirRelative = path.relative(cwd, inputDir);
const outputDir = path.join(cwd);

// Create input directory if it doesn't exist
if (!fs.existsSync(inputDir)) {
  console.log(`Creating input directory ${inputDirRelative}`);
  fs.mkdirSync(inputDir, { recursive: true });
}

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(path.join(outputDir, "sprites.svg"), "");
const files = glob
  .sync("**/*.svg", {
    cwd: inputDir,
  })
  .sort((a, b) => a.localeCompare(b));

if (files.length === 0) {
  console.log(`No SVG files found in ${inputDirRelative}`);
  console.log(`Creating empty sprite and types files...`);
}
// The relative paths are just for cleaner logs
console.log(`Generating sprite for ${inputDirRelative}`);

const spritesheetContent = generateSvgSprite({
  files,
  inputDir,
});
console.log(spritesheetContent);
writeIfChanged(path.join(outputDir, "sprites.svg"), spritesheetContent);

/**
 * Process a single SVG file and convert it to a symbol
 */
function processSvgFile(file: string, inputDirPath: string): string | null {
  const filePath = path.join(inputDirPath, file);

  if (!fs.existsSync(filePath)) {
    console.warn(`File ${file} does not exist, skipping...`);

    return null;
  }

  try {
    const input = fs.readFileSync(filePath, "utf8");

    return convertSvgToSymbol(input, file);
  } catch (error) {
    console.warn(`Error processing ${file}: ${error}`);

    return null;
  }
}

function convertSvgToSymbol(input: string, file: string): string {
  const root = parse(input);
  const svg = root.querySelector("svg");

  if (!svg) {
    throw new Error(`No SVG element found in ${file}`);
  }

  svg.tagName = "symbol";
  svg.setAttribute("id", file.replace(/\.svg$/, ""));
  svg.setAttribute("height", "24");
  svg.setAttribute("width", "24");
  svg.setAttribute("data-testid", file.replace(/\.svg$/, ""));
  svg.setAttribute(
    "style",
    "fill: var(--color-icon); display: inline-block; vertical-align: middle; width: 24px; height: 24px;",
  );
  svg.removeAttribute("xmlns");
  svg.removeAttribute("xmlns:xlink");
  svg.removeAttribute("version");

  return svg.toString().trim();
}

/**
 * Outputs an SVG string with all the icons as symbols
 */
function generateSvgSprite({
  files: filesInput,
  inputDir: inputDirInput,
}: {
  files: string[];
  inputDir: string;
}) {
  // Each SVG becomes a symbol and we wrap them all in a single SVG
  const symbols = filesInput
    .map(file => processSvgFile(file, inputDirInput))
    .filter(Boolean);

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="0" height="0">`,
    `<defs>`, // for semantics: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/defs
    ...symbols,
    `</defs>`,
    `</svg>`,
  ].join("\n");
}

/**
 * Each write can trigger dev server reloads
 * so only write if the content has changed
 */
function writeIfChanged(filepath: string, newContent: string) {
  let currentContent = "";

  try {
    if (fs.existsSync(filepath)) {
      currentContent = fs.readFileSync(filepath, "utf8");
    }
  } catch (error) {
    console.warn(`Could not read existing file ${filepath}: ${error}`);
  }

  console.log(`Writing ${newContent.length} bytes to ${filepath}`);

  if (currentContent !== newContent) {
    try {
      return fs.writeFileSync(filepath, newContent, "utf8");
    } catch (error) {
      console.error(`Failed to write file ${filepath}: ${error}`);
      throw error;
    }
  }
}
