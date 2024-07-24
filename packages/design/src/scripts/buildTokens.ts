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
  writeFile("src/assets/tokens.android.ts", androidTokens);

  const iosTokens = parseToObject("ios");
  writeFile("src/assets/tokens.ios.ts", iosTokens);
};

const writeColorTokens = () => {
  const jsColorTokens = buildTokenSubset(["color"], true, "js");
  const cssColorTokens = buildTokenSubset(["color"], true, "css");
  writeFile(
    "src/assets/tokens.color.ts",
    convertJSTokensToObjectString(jsColorTokens),
  );
  writeFile("colors.mjs", convertJSTokensToObjectString(jsColorTokens, true));
  writeFile("colors.cjs", convertJSTokensToObjectString(jsColorTokens, false));
  writeFile("dist/color.css", convertJSTokensToCSS(cssColorTokens));
  const jsSemanticTokens = buildTokenSubset(["semantic-color"], true, "js");
  const cssSemanticTokens = buildTokenSubset(["semantic-color"], true, "css");

  writeFile(
    "src/assets/tokens.semantic.ts",
    convertJSTokensToObjectString(jsSemanticTokens),
  );
  writeFile("dist/semantic.css", convertJSTokensToCSS(cssSemanticTokens));
};

const writeDarkModeTokens = () => {
  const cssDarkTokens = parseTokens(["dark"], true, "css");
  const jsDarkTokens = parseTokens(["dark"], true, "js");
  const jsTokens = convertRawTokensToJSFile(jsDarkTokens);
  const cssTokens = convertRawTokensToCSSFile(cssDarkTokens);
  const darkModeTokens = convertRawTokensToThemeFile(cssDarkTokens, "dark");

  writeFile("src/assets/tokens.dark.ts", jsTokens);
  writeFile("dist/dark.theme.css", cssTokens);
  writeFile("dist/dark.mode.css", darkModeTokens);
};

export const writeTokenFile = () => {
  const cssString = buildFullCSS();
  writeFile("foundation.css", cssString);
  writeFile("dist/foundation.css", cssString);
  writeFile("foundation.css", cssString);

  const jsTokens = parseToObject("web");
  writeFile("src/assets/tokens.web.ts", jsTokens);

  writeMobileTokens();
  writeColorTokens();
  writeDarkModeTokens();
};

writeTokenFile();
