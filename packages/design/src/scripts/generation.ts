import { dirname, join } from "path";
import { readFileSync } from "fs";
import postcss from "postcss";
import calc from "postcss-calc";
import TimingTokens from "../tokens/timing.tokens.json" assert { type: "json" };
import OpacityTokens from "../tokens/opacity.tokens.json" assert { type: "json" };
import ElevationTokens from "../tokens/elevation.tokens.json" assert { type: "json" };
import BaseColourTokens from "../tokens/baseColor.tokens.json" assert { type: "json" };
import ColourTokens from "../tokens/color.tokens.json" assert { type: "json" };
import SemanticColourTokens from "../tokens/semanticColor.tokens.json" assert { type: "json" };
import WorkflowTokens from "../tokens/workflow.tokens.json" assert { type: "json" };
import TypographyBaseTokens from "../tokens/typographyBase.tokens.json" assert { type: "json" };
import TypographyCalculatedTokens from "../tokens/typographyCalculated.tokens.json" assert { type: "json" };
import RadiusTokens from "../tokens/radius.tokens.json" assert { type: "json" };
import BorderTokens from "../tokens/border.tokens.json" assert { type: "json" };
import SpaceTokens from "../tokens/space.tokens.json" assert { type: "json" };
import ShadowTokens from "../tokens/shadow.tokens.json" assert { type: "json" };
import PlatformOverrides from "../tokens/platformOverride.tokens.json" assert { type: "json" };

export const baseUnit = "16px";

const calcEach = (tokens: Tokens, includeSemiColon = true) => {
  const css = Object.keys(tokens)
    .map(key => `--${key}: ${tokens[key]}${includeSemiColon ? ";" : ""}`)
    .join("\n");
  const cssRoot = postcss.parse(`:root{\n${css}\n}`);

  /** @ts-expect-error Something is wrong with the calc types. This works. */
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

type TokenTree = Record<string, string | { value: string } | object>;
type Token = string | object;
type Tokens = Record<string, Token>;

const recurseTokenTree = (
  tokens: TokenTree,
  keyIn = "",
  tokenList: Record<string, Token>,
) => {
  for (const [key] of Object.entries(tokens)) {
    let token: Tokens = {};

    if (key !== "value" && key !== "_") {
      const passedKey = keyIn ? keyIn + "-" + key : key;
      token = recurseTokenTree(tokens[key] as Tokens, passedKey, tokenList);
    } else if (key === "value") {
      return { [keyIn]: tokens[key] };
    } else if (key === "_") {
      token = recurseTokenTree(tokens[key] as Tokens, keyIn + "-", tokenList);
    }
    const tokenKey = Object.keys(token)[0];
    tokenList[tokenKey] = token[tokenKey];
  }

  return tokenList;
};

const getOverrides = (platform?: "ios" | "android") => {
  let overrides = {};

  [PlatformOverrides].forEach(root => {
    if (root.platformOverrides && platform) {
      overrides = {
        ...overrides,
        ...recurseTokenTree(root.platformOverrides[platform], "", {}),
      };
    }
  });

  return overrides;
};

const parseTokenVariables = (rawTokens: Record<string, string>) => {
  const parsedTokens: Record<string, string> = {};

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
          parsedTokens[key] = rawTokens[key].replace(
            new RegExp(match, "g"),
            value,
          );
        });
      }
    }
  }

  return { ...rawTokens, ...parsedTokens };
};

export const getRawTokens = () => {
  const rawTokens: Tokens = {
    ["base-unit"]: baseUnit,
    ...transformRootToTokens(BorderTokens),
    ...transformRootToTokens(BaseColourTokens),
    ...transformRootToTokens(ColourTokens),
    ...transformRootToTokens(SemanticColourTokens),
    ...transformRootToTokens(WorkflowTokens),
    ...transformRootToTokens(RadiusTokens),
    ...transformRootToTokens(SpaceTokens),
    ...transformRootToTokens(ShadowTokens),
    ...transformRootToTokens(TimingTokens),
    ...transformRootToTokens(OpacityTokens),
    ...transformRootToTokens(ElevationTokens),
    ...transformRootToTokens(TypographyBaseTokens),
    ...transformRootToTokens(TypographyCalculatedTokens),
  };

  return rawTokens;
};

const transformRootToTokens = (tokens: TokenTree) => {
  const baseTokens = recurseTokenTree(tokens, "", {});

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

export const parseTokensToCSS = () => {
  const rawTokens = getRawTokens();
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

export const buildFullCSS = () => {
  const css = parseTokensToCSS();
  const currentDir = dirname(import.meta.url.replace("file://", ""));
  const prefixFile = join(currentDir, "..", "styles", "prefixStyles.css");
  const suffixFile = join(currentDir, "..", "styles", "suffixStyles.css");

  const prefixStyles = readFileSync(prefixFile, "utf8");
  const suffixStyles = readFileSync(suffixFile, "utf8");
  let rootCSS = `:root {\n`;

  for (const [i] of Object.entries(css)) {
    rootCSS += `  --${i}: ${css[i]};\n`;
  }
  rootCSS += `}\n`;

  return `${prefixStyles}\n${rootCSS}\n\n${suffixStyles}`;
};

export const parseToJs = (
  platform: "web" | "ios" | "android" = "web",
): Record<string, string> => {
  const rawTokens = getRawTokens();
  let finalTokens: Tokens = { ...rawTokens };
  let hasObjectLeft = false;

  do {
    finalTokens = parseTokenVariables(finalTokens as Record<string, string>);
    hasObjectLeft = Object.values(finalTokens).some(value => {
      return typeof value == "string" && value.includes("{");
    });
  } while (hasObjectLeft);
  const calced = calcEach(finalTokens, false);

  let overrides = {};

  if (platform !== "web") {
    overrides = getOverrides(platform);
  }

  return { ...calced, ...overrides };
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

export const parseToObject = (platform: "web" | "ios" | "android") => {
  const jsTokens = parseToJs(platform);

  let jsTokensString = `export default {\n`;

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

export const parseTokensToValues = () => {
  return parseToJs();
};

export const parseTokensToAndroid = () => {
  return parseToJs("android");
};

export const parseTokensToIOS = () => {
  return parseToJs("ios");
};

export const getColorTokens = () => {
  const css = parseTokensToCSS();
  const keys = Object.keys(css).filter(token => {
    if (token.includes("color")) {
      return true;
    }
  });
  const vals: Tokens = {};
  keys.forEach(key => {
    vals[key] = css[key];
  });

  return vals;
};
