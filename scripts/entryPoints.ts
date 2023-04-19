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

const packages = process.argv.filter(param => param.includes("packages"));

if (process.argv[2] === "clean") {
  clean();
} else {
  build();
}

function build() {
  packages.forEach(async packagePath => {
    (await getEntryPoints(packagePath)).forEach(async entryPoint => {
      writeFileSync(`${packagePath}/${entryPoint.file}`, entryPoint.content);
    });
  });
}

function clean() {
  packages.forEach(async packagePath => {
    (await getEntryPoints(packagePath)).forEach(entryPoint => {
      unlinkSync(`${packagePath}/${entryPoint.file}`);
    });
  });
}

async function getEntryPoints(packagePath: string) {
  const indices = await pGlob(`${packagePath}/src/*/index.ts`);
  return indices.reduce((entryPoints: EntryPoint[], entryPoint) => {
    const pathParts = entryPoint.split(sep);
    const fileName = pathParts[3];
    entryPoints.push({
      file: `${pathParts[3]}.js`,
      content: `"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var ${fileName} = require("./dist/${fileName}");

Object.keys(${fileName}).forEach(function(key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return ${fileName}[key];
    },
  });
});`,
    });
    entryPoints.push({
      file: `${fileName}.d.ts`,
      content: `export * from "./dist/${fileName}";\n`,
    });

    return entryPoints;
  }, []);
}
