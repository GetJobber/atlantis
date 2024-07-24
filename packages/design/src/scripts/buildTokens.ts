import { writeFile } from "fs/promises";
import {
  buildFullCSS,
  buildTokenSubset,
  convertJSTokensToCSS,
  convertJSTokensToObjectString,
  convertRawTokensToCSSFile,
  convertRawTokensToJSFile,
  convertRawTokensToThemeFile,
  parseToObject,
  parseTokens,
} from "./generation.ts";

const writeMobileTokens = () => {
  const androidTokens = parseToObject("android");
  writeFile("src/generated/tokens.android.ts", androidTokens);

  const iosTokens = parseToObject("ios");
  writeFile("src/generated/tokens.ios.ts", iosTokens);
};

const writeColorTokens = () => {
  const colorTokens = buildTokenSubset(["color"]);
  writeFile(
    "src/generated/tokens.color.ts",
    convertJSTokensToObjectString(colorTokens),
  );
  writeFile("colors.js", convertJSTokensToObjectString(colorTokens));
  writeFile("dist/color.css", convertJSTokensToCSS(colorTokens));
  const semanticTokens = buildTokenSubset(["semantic-color"]);
  writeFile(
    "src/generated/tokens.semantic.ts",
    convertJSTokensToObjectString(semanticTokens),
  );
  writeFile("dist/semantic.css", convertJSTokensToCSS(semanticTokens));
};

const writeDarkModeTokens = () => {
  const darkTokens = parseTokens(["dark"]);
  const jsTokens = convertRawTokensToJSFile(darkTokens);
  const cssTokens = convertRawTokensToCSSFile(darkTokens);
  const darkModeTokens = convertRawTokensToThemeFile(darkTokens, "dark");

  writeFile("src/generated/tokens.dark.ts", jsTokens);
  writeFile("dist/dark.theme.css", cssTokens);
  writeFile("dist/dark.mode.css", darkModeTokens);
};

export const writeTokenFile = () => {
  const cssString = buildFullCSS();
  writeFile("foundation.css", cssString);
  writeFile("dist/foundation.css", cssString);
  writeFile("foundation.css", cssString);

  const jsTokens = parseToObject("web");
  writeFile("src/tokens.web.ts", jsTokens);

  writeMobileTokens();
  writeColorTokens();
  writeDarkModeTokens();
};

writeTokenFile();
