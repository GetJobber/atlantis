import { writeFile } from "fs/promises";
import {
  buildFullCSS,
  convertRawTokensToCSSFile,
  convertRawTokensToJSFile,
  convertRawTokensToThemeFile,
  createCSSFileFromSubset,
  createTokenFileContentsForCSS,
  createTokenFileContentsForPlatform,
  createTokenFileFromSubset,
  parseTokens,
} from "./tokenServices/tokenConvienence.ts";

const writeMobileTokens = () => {
  const androidTokens = createTokenFileContentsForPlatform("android");
  writeFile("src/assets/tokens.android.ts", androidTokens);

  const iosTokens = createTokenFileContentsForPlatform("ios");
  writeFile("src/assets/tokens.ios.ts", iosTokens);
};

const writeColorTokens = () => {
  const jsFileContents = createTokenFileFromSubset(["color"]);
  writeFile("src/assets/tokens.color.ts", jsFileContents);
  writeFile("dist/colors.mjs", jsFileContents);
  writeFile("dist/colors.cjs", jsFileContents);

  const cssFileContents = createCSSFileFromSubset(["color"]);
  writeFile("dist/color.css", cssFileContents);

  const semanticJSCotent = createTokenFileFromSubset(["semantic-color"]);
  writeFile("src/assets/tokens.semantic.ts", semanticJSCotent);

  const semanticCSSContent = createCSSFileFromSubset(["semantic-color"]);
  writeFile("dist/semantic.css", semanticCSSContent);
};

const writeDarkModeTokens = () => {
  const cssDarkTokens = parseTokens(["dark"], true, "css");

  const cssDarkElevatedContent = createTokenFileContentsForCSS([
    "dark-elevated",
  ]);
  const darkModeTokens = convertRawTokensToThemeFile(cssDarkTokens, "dark", [
    {
      key: "data-elevation",
      value: "elevated",
      tokens: cssDarkElevatedContent,
    },
  ]);
  writeFile("dist/dark.mode.css", darkModeTokens);

  const jsDarkTokens = parseTokens(["dark"], true, "js");
  const jsTokens = convertRawTokensToJSFile(jsDarkTokens);
  writeFile("src/assets/tokens.dark.ts", jsTokens);

  const cssTokens = convertRawTokensToCSSFile(cssDarkTokens);
  writeFile("dist/dark.theme.css", cssTokens);
};

export const writeTokenFile = () => {
  const cssString = buildFullCSS();
  writeFile("dist/foundation.css", cssString);

  const jsTokens = createTokenFileContentsForPlatform("web");
  writeFile("src/assets/tokens.web.ts", jsTokens);

  writeMobileTokens();
  writeColorTokens();
  writeDarkModeTokens();
};

writeTokenFile();
