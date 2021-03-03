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
  (await getEntryPoints()).forEach(async entryPoint => {
    writeFileSync(entryPoint.file, entryPoint.content);
  });
}

async function clean() {
  (await getEntryPoints()).forEach(entryPoint => {
    unlinkSync(entryPoint.file);
  });
}

async function getEntryPoints() {
  const indices = await pGlob("./src/*/index.ts");

  return indices.reduce((entryPoints: EntryPoint[], entryPoint) => {
    const pathParts = entryPoint.split(sep);

    entryPoints.push({
      file: `${pathParts[2]}.js`,
      content: `"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var ${pathParts[2]} = require("./dist/${pathParts[2]}");

Object.keys(${pathParts[2]}).forEach(function(key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return ${pathParts[2]}[key];
    },
  });
});`,
    });
    entryPoints.push({
      file: `${pathParts[2]}.d.ts`,
      content: `export * from "./dist/${pathParts[2]}";\n`,
    });

    return entryPoints;
  }, []);
}
