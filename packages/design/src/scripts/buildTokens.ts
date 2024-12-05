import { readFileSync, writeFileSync } from "fs";
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
  writeFileSync("src/assets/tokens.android.ts", androidTokens);

  const iosTokens = createTokenFileContentsForPlatform("ios");
  writeFileSync("src/assets/tokens.ios.ts", iosTokens);
};

// eslint-disable-next-line max-statements
const writeColorTokens = () => {
  const jsFileContents = createTokenFileFromSubset(["color"]);
  const cjsFileContents = createTokenFileFromSubset(["color"], false);
  writeFileSync("src/assets/tokens.color.ts", jsFileContents);
  writeFileSync("dist/colors.mjs", jsFileContents);
  writeFileSync("dist/colors.cjs", cjsFileContents);

  const cssFileContents = createCSSFileFromSubset(["color"]);
  writeFileSync("dist/color.css", cssFileContents);

  const semanticJSContent = createTokenFileFromSubset(["semantic-color"]);
  writeFileSync("src/assets/tokens.semantic.ts", semanticJSContent);

  const allJSColorContent = createTokenFileFromSubset([
    "workflow",
    "semantic-color",
    "color",
    "base-color",
  ]);
  writeFileSync("src/assets/tokens.all.colors.ts", allJSColorContent);

  const semanticCSSContent = createCSSFileFromSubset(["semantic-color"]);
  writeFileSync("dist/semantic.css", semanticCSSContent);
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
  const darkModeSuffixStyles = readFileSync(
    "src/styles/dark.mode.suffixStyles.css",
    "utf8",
  );
  writeFileSync(
    "dist/dark.mode.css",
    `${darkModeTokens}\n${darkModeSuffixStyles}`,
  );

  const jsDarkTokens = parseTokens(["dark"], true, "js");
  const jsTokens = convertRawTokensToJSFile(jsDarkTokens);
  writeFileSync("src/assets/tokens.dark.ts", jsTokens);

  const cssTokens = convertRawTokensToCSSFile(cssDarkTokens);
  writeFileSync("dist/dark.theme.css", cssTokens);
};

export const writeTokenFile = () => {
  const cssString = buildFullCSS();
  writeFileSync("dist/foundation.css", cssString);

  const jsTokens = createTokenFileContentsForPlatform("web");
  writeFileSync("src/assets/tokens.web.ts", jsTokens);

  writeMobileTokens();
  writeColorTokens();
  writeDarkModeTokens();
};

writeTokenFile();
