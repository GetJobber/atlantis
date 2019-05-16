#!/usr/bin/env ts-node  --project ../../tsconfig.bin.json

/* eslint-disable no-console */

import { promisify } from "util";
import { sep } from "path";
import { unlinkSync, writeFileSync } from "fs";
import glob from "glob";

declare const process: { argv: string[] };
const pGlob = promisify(glob);

interface EntryPoint {
  file: string;
  content: string;
}

if (process.argv[2] === "clean") {
  clean();
} else {
  build();
}

async function build() {
  (await entryPoints()).forEach(async entryPoint => {
    writeFileSync(entryPoint.file, entryPoint.content);
  });
}

async function clean() {
  (await entryPoints()).forEach(entryPoint => {
    unlinkSync(entryPoint.file);
  });
}

async function entryPoints() {
  const indices = await pGlob("./src/*/index.ts");

  return indices.reduce((entryPoints: EntryPoint[], entryPoint) => {
    const pathParts = entryPoint.split(sep);

    entryPoints.push({
      file: `${pathParts[2]}.js`,
      content: `export * from "./dist/${pathParts[2]}";\n`,
    });
    entryPoints.push({
      file: `${pathParts[2]}.d.ts`,
      content: `export * from "./dist/${pathParts[2]}";\n`,
    });

    return entryPoints;
  }, []);
}
