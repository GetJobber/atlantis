#!/usr/bin/env ts-node  --project ../../tsconfig.bin.json
import { promisify } from "util";
import { sep } from "path";
import { writeFileSync } from "fs";
import glob from "glob";

const pGlob = promisify(glob);

build();

async function build() {
  writeFileSync(`./src/index.ts`, await getEntryPointsContent());
}

async function getEntryPointsContent() {
  const indices = await pGlob("./src/*/index.ts");
  const content = "";

  return indices.reduce((listContent, entryPoint) => {
    const pathParts = entryPoint.split(sep);
    const moduleName = pathParts[2];
    listContent += `export { ${moduleName} } from "./${moduleName}";\n`;

    return listContent;
  }, content);
}
