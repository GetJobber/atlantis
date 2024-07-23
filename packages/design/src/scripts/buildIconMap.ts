import { readFile, readdir, writeFile } from "fs/promises";
import { dirname, extname, join } from "path";
import { JSDOM } from "jsdom";

const processFiles = files => {
  const svgFiles = files.filter(file => extname(file) === ".svg");
  const iconMap: Record<string, Array<string>> = {};

  for (const file of svgFiles) {
    const filePath = join(iconDir, file);
    const content = await readFile(filePath, "utf8");
    const DOM = new JSDOM(content);
    const document = DOM.window.document;
    const paths = document.querySelectorAll("path");
    const pathAttributes = Array.from(paths).map(
      (path: { attributes: { d: { value: string } } }) =>
        path.attributes.d.value,
    );
    iconMap[file.replace(".svg", "")] = pathAttributes;
  }

  return iconMap;
};

export const getIconMap = async () => {
  const currentDir = dirname(import.meta.url.replace("file://", ""));
  const iconDir = join(currentDir, "../icons");

  try {
    const files = await readdir(iconDir);

    processFiles(files);

    return { icons: iconMap };
  } catch (err) {
    console.error("Error reading the directory or files:", err);
    throw err; // Rethrow or handle as needed
  }
};

export const generateIconMapFile = () => {
  getIconMap().then(iconMap => {
    const iconMapString = JSON.stringify(iconMap, null, 2);
    writeFile("src/icon.map.ts", "export default " + iconMapString);
    writeFile("dist/icon.map.js", "export default " + iconMapString);
  });
};

generateIconMapFile();
