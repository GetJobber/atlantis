import { dirname, join } from "path";
import { readFileSync } from "fs";
//import postcss from "postcss";
//import calc from "postcss-calc";
import TimingTokens from "../tokens/timing.tokens.json" assert { type: "json" };
import OpacityTokens from "../tokens/opacity.tokens.json" assert { type: "json" };
import ElevationTokens from "../tokens/elevation.tokens.json" assert { type: "json" };
import BaseColourTokens from "../tokens/baseColor.tokens.json" assert { type: "json" };
import ColourTokens from "../tokens/color.tokens.json" assert { type: "json" };
import SemanticColourTokens from "../tokens/semanticColor.tokens.json" assert { type: "json" };
import WorkflowTokens from "../tokens/workflow.tokens.json" assert { type: "json" };
import TypographyTokens from "../tokens/typography.tokens.json" assert { type: "json" };
import RadiusTokens from "../tokens/radius.tokens.json" assert { type: "json" };
import BorderTokens from "../tokens/border.tokens.json" assert { type: "json" };
import SpaceTokens from "../tokens/space.tokens.json" assert { type: "json" };
import ShadowTokens from "../tokens/shadow.tokens.json" assert { type: "json" };
import DarkTokens from "../tokens/dark.tokens.json" assert { type: "json" };
import PlatformOverrides from "../tokens/platformOverride.tokens.json" assert { type: "json" };

export const baseUnit = "16px";

/*
const calcEach = (tokens: Tokens, includeSemiColon = true) => {
  const css = Object.keys(tokens)
    .map(key => `--${key}: ${tokens[key]}${includeSemiColon ? ";" : ""}`)
    .join("\n");
  const cssRoot = postcss.parse(`:root{\n${css}\n}`);

  const result = postcss([calc({})]).process(cssRoot, { from: undefined }).css;
  const results = result.split("\n");
  const finalResults: Record<string, string> = {};

  for (const line of results) {
    if (line.includes(":")) {
      const lineSplit = line.split(":");
      const key = lineSplit[0].replace("--", "");

      if (key) {
        finalResults[key] = lineSplit[1]
          .trim()
          .replace("px", "")
          .replace("ms", "");
      }
    }
  }

  return finalResults;
};
*/
export type TokenType =
  | "dimension"
  | "number"
  | "color"
  | "fontFamily"
  | "percentage"
  | "duration";

const transformValue = (
  value: string | number | object,
  activeType: TokenType,
  outputType: "css" | "js" = "css",
) => {
  let transformed = value;

  if (activeType === "duration") {
    if (outputType === "js" && typeof value === "string") {
      transformed = value.replace("ms", "");
    }
  }

  if (activeType === "dimension") {
    if (outputType === "js" && typeof value === "string") {
      transformed = value.replace("px", "");
    }
  }

  if (activeType === "percentage") {
    if (outputType === "js" && typeof value === "string") {
      transformed = value.replace("%", "");
    }
  }

  return transformed;
};
export type TokenTree = Record<
  string,
  string | { $value: string } | object | number
>;
export type Token = string | object | number;
export type Tokens = Record<string, Token>;

const getActiveType = (
  key: string,
  activeType: string,
  tokens: Tokens,
): TokenType => {
  if (key === "$type") {
    activeType = tokens[key] as TokenType;
  }

  if (tokens.$type) {
    activeType = tokens.$type as string;
  }

  return activeType as TokenType;
};

const recurseTokenTree = (
  tokens: TokenTree,
  keyIn = "",
  tokenList: Record<string, Token>,
  activeType: TokenType = "dimension",
  transform = true,
  outputType: "css" | "js" = "css" as const,
) => {
  for (const [key] of Object.entries(tokens)) {
    let token: Tokens = {};
    activeType = getActiveType(key, activeType, tokens);

    if (!key.startsWith("$")) {
      const passedKey = keyIn ? keyIn + "-" + key : key;
      token = recurseTokenTree(
        tokens[key] as Tokens,
        passedKey,
        tokenList,
        activeType,
        transform,
        outputType,
      );
    } else if (key === "$value") {
      return {
        [keyIn]: transform
          ? transformValue(tokens[key], activeType, outputType)
          : tokens[key],
      };
    }
    const tokenKey = Object.keys(token)[0];

    if (tokenKey && typeof token[tokenKey] !== "undefined") {
      tokenList[tokenKey] = token[tokenKey];
    }
  }

  return tokenList;
};

const getOverrides = (
  platform?: "ios" | "android",
  outputType: "css" | "js" = "css",
) => {
  let overrides = {};

  [PlatformOverrides].forEach(root => {
    if (root.platformOverrides && platform) {
      overrides = {
        ...overrides,
        ...recurseTokenTree(
          root.platformOverrides[platform],
          "",
          {},
          undefined,
          true,
          outputType,
        ),
      };
    }
  });

  return overrides;
};

export const parseTokenVariables = (
  rawTokens: Record<string, string | number>,
): Record<string, string | number> => {
  const parsedTokens: Record<string, string | number> = {};

  for (const [key, token] of Object.entries(rawTokens)) {
    if (typeof token === "string") {
      const matches = token.match(/{(.*?)}/g);

      if (matches) {
        matches.forEach(match => {
          const tokenKey = match
            .replace(/{|}/g, "")
            .replace(/_/g, "")
            .replace(/\./g, "-");

          const value = rawTokens[tokenKey];

          if (typeof value === "string" && typeof rawTokens[key] === "string") {
            parsedTokens[key] = rawTokens[key].replace(
              new RegExp(match, "g"),
              value,
            );
          } else {
            parsedTokens[key] = rawTokens[key] as number;
          }
        });
      }
    }
  }

  return { ...rawTokens, ...parsedTokens };
};

export const getRawTokens = (
  transform = true,
  outputType: "css" | "js" = "css",
) => {
  const rawTokens: Record<string, string | number> = {
    ["base-unit"]: baseUnit,
    ...transformRootToTokens(BorderTokens, transform, outputType),
    ...transformRootToTokens(BaseColourTokens, transform, outputType),
    ...transformRootToTokens(ColourTokens, transform, outputType),
    ...transformRootToTokens(SemanticColourTokens, transform, outputType),
    ...transformRootToTokens(WorkflowTokens, transform, outputType),
    ...transformRootToTokens(RadiusTokens, transform, outputType),
    ...transformRootToTokens(SpaceTokens, transform, outputType),
    ...transformRootToTokens(ShadowTokens, transform, outputType),
    ...transformRootToTokens(TimingTokens, transform, outputType),
    ...transformRootToTokens(OpacityTokens, transform, outputType),
    ...transformRootToTokens(ElevationTokens, transform, outputType),
    ...transformRootToTokens(TypographyTokens, transform, outputType),
  };

  return rawTokens;
};

const transformRootToTokens = (
  tokens: TokenTree,
  transform = true,
  outputType: "css" | "js" = "css",
) => {
  const baseTokens = recurseTokenTree(
    tokens,
    "",
    {},
    undefined,
    transform,
    outputType,
  );

  return baseTokens;
};

const swapCSSTokens = (rawTokens: Tokens) => {
  const newTokens: Record<string, string> = {};

  for (const [key, value] of Object.entries(rawTokens)) {
    if (typeof value === "string") {
      const matches = value.match(/{(.*?)}/g);

      if (matches) {
        matches.forEach(match => {
          const tokenKey =
            "var" +
            match
              .replace(/_/g, "")
              .replace(/\./g, "-")
              .replace("}", ")")
              .replace("{", "(--");
          newTokens[key] = value.replace(new RegExp(match, "g"), tokenKey);
        });
      }
    }
  }

  return { ...rawTokens, ...newTokens };
};

export const parseTokensToCSS = (rawTokens: Tokens) => {
  let cssTokens = swapCSSTokens(rawTokens);
  let keepGoing = false;

  do {
    cssTokens = swapCSSTokens(cssTokens);
    keepGoing = false;

    for (const [, val] of Object.entries(cssTokens)) {
      if (typeof val === "string" && val.includes?.("{")) {
        keepGoing = true;
      }
    }
  } while (keepGoing);

  return cssTokens;
};

export const convertJSTokensToTheme = (css: Tokens, theme: string) => {
  let rootCSS = ` @media screen {\n
 :root[data-theme="${theme}"] {\n
 `;

  for (const [i] of Object.entries(css)) {
    rootCSS += `  --${i}: ${css[i]};\n`;
  }
  rootCSS += `}\n}\n`;

  return rootCSS;
};

export const convertJSTokensToCSS = (css: Tokens) => {
  let rootCSS = `:root {\n`;

  for (const [i] of Object.entries(css)) {
    rootCSS += `  --${i}: ${css[i]};\n`;
  }
  rootCSS += `}\n`;

  return rootCSS;
};

export const buildFullCSS = () => {
  const allTokens = getRawTokens(true, "css");
  const css = parseTokensToCSS(allTokens);
  const currentDir = dirname(import.meta.url.replace("file://", ""));
  const prefixFile = join(currentDir, "..", "styles", "prefixStyles.css");
  const suffixFile = join(currentDir, "..", "styles", "suffixStyles.css");

  const prefixStyles = readFileSync(prefixFile, "utf8");
  const suffixStyles = readFileSync(suffixFile, "utf8");
  const rootCSS = convertJSTokensToCSS(css);

  return `${prefixStyles}\n${rootCSS}\n\n${suffixStyles}`;
};

export const parseAllTokenVariables = (rawTokens: Tokens) => {
  let finalTokens: Tokens = { ...rawTokens };
  let hasObjectLeft = false;

  do {
    finalTokens = parseTokenVariables(finalTokens as Record<string, string>);
    hasObjectLeft = Object.values(finalTokens).some(value => {
      return typeof value == "string" && value.includes("{");
    });
  } while (hasObjectLeft);

  return finalTokens;
};

export const parseToJs = (
  platform: "web" | "ios" | "android" = "web",
): Record<string, string> => {
  const finalTokens = parseAllTokenVariables(getRawTokens(true, "js"));

  let overrides = {};

  if (platform !== "web") {
    overrides = getOverrides(platform, "js");
  }

  return { ...finalTokens, ...overrides };
};

function isNumber(value: unknown) {
  return !isNaN(value as number) && !isNaN(parseFloat(value as string));
}

function traverseObjectAndPrint(obj: Tokens): string {
  let result = "";

  // First level traversal
  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value === "object" && !Array.isArray(value)) {
      // Second level traversal
      result += `    "${key}":{\n`;
      Object.entries(value as Tokens).forEach(([innerKey, innerValue]) => {
        const isNum = isNumber(innerValue);
        const maybeWrapped = !isNum ? `"${innerValue}"` : innerValue;
        result += `      "${innerKey}": ${maybeWrapped}, \n`;
      });
      result += `    },\n`;
    } else {
      const isNum = isNumber(value);
      const maybeWrapped = !isNum ? `"${key}"` : value;
      result += `    "${key}": ${maybeWrapped}, \n`;
    }
  });

  // Remove the last comma and space
  result = result.slice(0, -2);

  return result + "\n";
}

export type TokenTypes = keyof typeof tokenMap;
export const tokenMap = {
  color: ColourTokens,
  "semantic-color": SemanticColourTokens,
  workflow: WorkflowTokens,
  radius: RadiusTokens,
  space: SpaceTokens,
  shadow: ShadowTokens,
  timing: TimingTokens,
  opacity: OpacityTokens,
  elevation: ElevationTokens,
  typography: TypographyTokens,
  border: BorderTokens,
  "base-color": BaseColourTokens,
  dark: DarkTokens,
};

export const buildTokenSubset = (
  tokenNames: Array<TokenTypes>,
  transform: boolean,
  outputType: "js" | "css",
) => {
  const controlTokens = parseTokenNames(tokenNames, transform, outputType);
  const allTokens = parseToJs("web");
  const myTokens: Record<string, string> = {};
  controlTokens.forEach(tokenName => {
    myTokens[tokenName] = allTokens[tokenName];
  });

  return myTokens;
};

export const parseTokens = (
  types: Array<TokenTypes>,
  transform: boolean,
  outputType: "js" | "css",
): Record<string, string | number> => {
  let parsedTokens: Record<string, string | number> = {};
  types.forEach(type => {
    parsedTokens = {
      ["base-unit"]: baseUnit,
      ...parsedTokens,
      ...transformRootToTokens(tokenMap[type], transform, outputType),
    };
  });

  return parsedTokens;
};

export const convertRawTokensToJSFile = (
  tokens: Record<string, string | number>,
) => {
  const allTokens = getRawTokens();
  const piece = parseTokenVariables({ ...allTokens, ...tokens });
  const myTokens: Record<string, string | number> = {};
  Object.keys(tokens).forEach(tokenName => {
    myTokens[tokenName] = piece[tokenName];
  });

  return convertJSTokensToObjectString(myTokens);
};

export const convertRawTokensToCSSFile = (
  tokens: Record<string, string | number>,
) => {
  const cssTokens = parseTokensToCSS(tokens);

  return convertJSTokensToCSS(cssTokens);
};

export const convertRawTokensToThemeFile = (
  tokens: Record<string, string | number>,
  theme: string,
) => {
  const cssTokens = parseTokensToCSS(tokens);

  return convertJSTokensToTheme(cssTokens, theme);
};

export const parseTokenNames = (
  types: Array<TokenTypes>,
  transform: boolean,
  outputType: "js" | "css",
) => {
  const parsedTokens = parseTokens(types, transform, outputType);

  return Object.keys(parsedTokens);
};

export const convertJSTokensToObjectString = (
  jsTokens: Record<string, string | number>,
  esm = true,
) => {
  let jsTokensString = esm ? `export default {\n` : `module.exports ={\n`;

  for (const [key, value] of Object.entries(jsTokens)) {
    if (typeof value === "object") {
      jsTokensString +=
        `  "${key}":{\n` + traverseObjectAndPrint(value) + `  },\n`;
    } else {
      const isNum = isNumber(value);
      const maybeWrapped = !isNum ? `"${value}"` : value;
      jsTokensString += `  "${key}": ${maybeWrapped},\n`;
    }
  }
  jsTokensString += `};`;

  return jsTokensString;
};

export const parseToObject = (platform: "web" | "ios" | "android") => {
  const jsTokens = parseToJs(platform);

  return convertJSTokensToObjectString(jsTokens);
};

export const parseTokensToValues = () => {
  return parseToJs();
};

export const parseTokensToAndroid = () => {
  return parseToJs("android");
};

export const parseTokensToIOS = () => {
  return parseToJs("ios");
};
