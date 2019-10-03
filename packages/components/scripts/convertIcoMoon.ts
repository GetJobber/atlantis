#!/usr/bin/env ts-node  --project ../../tsconfig.bin.json

import { readFileSync, writeFileSync } from "fs";
import { argv, exit } from "process";

if (argv[2]) {
  convertIcoMoonData(argv[2]);
} else {
  console.log("Please provide the path to your IcoMoon svg json file.");
  console.log("  `npm run convertIcoMoon -- [path to svg json file]`\n");
  exit(1);
}

function convertIcoMoonData(path: string) {
  const icoMoonData: IcoMoonData = loadIcoMoonData(path);

  interface IconMapping {
    [key: string]: string[];
  }

  interface IcoMoonData {
    height: number;
    icons: {
      properties: { name: string };
      icon: { paths: string[] };
    }[];
  }

  const iconMapping = icoMoonData.icons.reduce(
    (mapping, icon) => {
      mapping[icon.properties.name] = icon.icon.paths;
      return mapping;
    },
    {} as IconMapping,
  );

  const iconHeight = icoMoonData.height;

  const result = {
    height: iconHeight,
    icons: iconMapping,
  };

  writeFileSync("src/Icon/iconMap.json", JSON.stringify(result, undefined, 2));
}

function loadIcoMoonData(path: string) {
  return JSON.parse(readFileSync(path, "utf8"));
}
