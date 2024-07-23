import { writeFile } from "fs/promises";
import { buildFullCSS, parseToObject } from "./generation.ts";

const writeMobileTokens = () => {
  const androidTokens = parseToObject("android");
  writeFile("dist/tokens.android.js", androidTokens);
  writeFile("src/tokens.mobile.ts", androidTokens);
  writeFile(
    "../components-native/src/utils/design/tokens.android.ts",
    androidTokens,
  );

  const iosTokens = parseToObject("ios");
  writeFile("dist/tokens.ios.js", iosTokens);
  writeFile("../components-native/src/utils/design/tokens.ios.ts", iosTokens);
};

export const writeTokenFile = () => {
  const cssString = buildFullCSS();
  writeFile("dist/foundation.css", cssString);

  const jsTokens = parseToObject("web");
  writeFile("dist/tokens.web.js", jsTokens);

  const jssrcTokens = parseToObject("web");
  writeFile("src/tokens.web.ts", jssrcTokens);

  writeMobileTokens();
};

writeTokenFile();
