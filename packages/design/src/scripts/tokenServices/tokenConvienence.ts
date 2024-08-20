import { dirname, join } from "path";
import { readFileSync } from "fs";
import {
  parseOverrides,
  parseTokensToCSS,
  parseTokensToCSS as parseTokensToCustomPropertyJS,
  recurseTokenTree,
} from "./tokenParsing.ts";
import {
  convertJSTokensToCSS,
  convertJSTokensToObjectString,
  replaceTokenAliasesWithActualValues as generateActualValueFromTokenAlias,
  convertJSTokensToCSS as generateCSSFileFromJSTokens,
  convertJSTokensToObjectString as generateObjectStringFromJSTokens,
  convertJSTokensToTheme as generateThemeFromJSTokens,
  replaceTokenAliasesWithActualValues,
} from "./tokenFileGeneration.ts";
import { CompleteTokenList, TokenTypes, tokenMap } from "./allTokens.ts";
import { baseUnit } from "./tokenConstants.ts";
import {
  ParsedTokenValue,
  ParsedTokens,
  TokenTree,
  Tokens,
} from "./tokenTypes.ts";
import PlatformOverrides from "../../tokens/platformOverride.tokens.json" assert { type: "json" };

/**
 * This kicks off a recursive function that replaces token aliases with their actual values.
 * Since token aliases can reference other token aliases, we need to keep evaluating until we have an actual value.
 *
 * @param rawTokens The raw tokens, directly from the JSON file via `getRawTokens` or `recurseTokenTree`
 * @returns A list of tokens, where the values are replaced with the actual values of any token aliases.
 */
export const parseAllTokenVariables = (rawTokens: Tokens) => {
  let finalTokens: Tokens = { ...rawTokens };
  let hasObjectLeft = false;

  do {
    finalTokens = replaceTokenAliasesWithActualValues(
      finalTokens as Record<string, string>,
    );
    hasObjectLeft = Object.values(finalTokens).some(value => {
      return typeof value == "string" && value.includes("{");
    });
  } while (hasObjectLeft);

  return finalTokens;
};

/**
 * Opinionated function. Only takes one parameter. Want to generate all our tokens, to JS format? This is your one-stop shop.
 *
 * 'web' gets you the web tokens
 * 'ios' gets you the ios tokens
 * 'android' gets you the android tokens
 *
 * @param platform Are we generating for web, ios, or android?
 * @returns
 */
export const parseToJs = (
  platform: "web" | "ios" | "android" = "web",
): Record<string, string> => {
  const finalTokens = parseAllTokenVariables(getRawTokens(true, "js"));

  let overrides = {};

  if (platform !== "web") {
    overrides = parseOverrides(PlatformOverrides, platform, "js");
  }

  return { ...finalTokens, ...overrides };
};

/**
 * Convinence function. Takes in a list of tokens, spits out a JS file ready to write.
 *
 * This is opinionated on purpose. Don't add params here, use the functions this calls to build your own.
 *
 * @param platform Are we generating for web, ios, or android?
 * @returns
 */
export const createTokenFileContentsForPlatform = (
  platform: "web" | "ios" | "android",
) => {
  const jsTokens = parseToJs(platform);

  return generateObjectStringFromJSTokens(jsTokens);
};

/**
 * Build yourself a subset of tokens, fully parsed with actual values. This is useful for creating themes.
 *
 * @param tokenNames The list of tokens to build a subset of
 * @param transform Should we transform the tokens?
 * @param outputType CSS or JS? This will determine how we transform the tokens.
 * @returns A sub-set of the tokens. Useful for creating themes.
 */
export const createTokenSubset = (tokenNames: Array<TokenTypes>) => {
  const controlTokens = parseTokenNames(tokenNames);
  const allTokens = parseToJs("web");
  const myTokens: Record<string, string> = {};
  controlTokens.forEach(tokenName => {
    myTokens[tokenName] = allTokens[tokenName];
  });

  return myTokens;
};

export const createTokenFileContentsForCSS = (types: Array<TokenTypes>) => {
  const parsedTokens = parseTokens(types, true, "css");

  return parseTokensToCSS(parsedTokens);
};

export const createTokenFileContentsForJS = (types: Array<TokenTypes>) => {
  const jsTokens = parseTokens(types, true, "js");

  return parseTokensToCSS(jsTokens);
};

export const createTokenFileFromSubset = (
  subset: Array<TokenTypes>,
  esm = true,
) => {
  const jsColorTokens = createTokenSubset(subset);

  return convertJSTokensToObjectString(jsColorTokens, esm);
};

export const createCSSFileFromSubset = (subset: Array<TokenTypes>) => {
  const jsColorTokens = createTokenSubset(subset);

  return convertJSTokensToCSS(jsColorTokens);
};

/**
 * Convienence function.
 *
 * @param types The types of tokens to parse
 * @param transform  Should we transform the tokens?
 * @param outputType CSS or JS? This will determine how we transform the tokens.
 * @returns A list of tokens, based on the types passed in.
 */
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

/**
 * Convienence Function
 * @param types Takes in a list of existing token types
 * @param transform Should we transform the tokens we find?
 * @param outputType CSS or JS? This will determine how we transform the tokens.
 * @returns Just the names of the tokens. Useful for generating themes.
 */
export const parseTokenNames = (types: Array<TokenTypes>) => {
  const parsedTokens = parseTokens(types, false, "css");

  return Object.keys(parsedTokens);
};

/**
 * A convienence function. Takes in a list of tokens, spits out a JS file ready to write.
 * This is useful for generating themes.
 *
 * Opinionated on purpose. Don't add params here, use the functions this calls to build your own.
 *
 * @param tokens A list of tokens to convert to a JS file
 * @returns
 */
export const convertRawTokensToJSFile = (
  tokens: Record<string, string | number>,
) => {
  const allTokens = getRawTokens();
  const piece = generateActualValueFromTokenAlias({
    ...allTokens,
    ...tokens,
  });
  const myTokens: Record<string, string | number> = {};
  Object.keys(tokens).forEach(tokenName => {
    myTokens[tokenName] = piece[tokenName];
  });

  return generateObjectStringFromJSTokens(myTokens);
};

/**
 * Opinionated function. Takes in a list of tokens, spits out a CSS file ready to write.
 *
 * Opinionated on purpose. Don't add params here, use the functions this calls to build your own.
 *
 * @param tokens A list of tokens to convert to a CSS file
 * @returns A list of tokens, ready to write to a CSS file
 */
export const convertRawTokensToCSSFile = (
  tokens: Record<string, string | number>,
) => {
  const cssTokens = parseTokensToCustomPropertyJS(tokens);

  return generateCSSFileFromJSTokens(cssTokens);
};

/**
 * Opinionated function. Takes in a list of tokens, spits out a theme file ready to write.
 *
 * Opinionated on purpose. Don't add params here, use the functions this calls to build your own.
 *
 * @param tokens List of main tokens
 * @param theme  Theme Name
 * @param layers An array of Layers. Layers are the idea of a theme within a theme. For example, [data-elevated="true"] could require slightly different tokens.
 * @returns A theme file, ready to write.
 */
export const convertRawTokensToThemeFile = (
  tokens: Record<string, ParsedTokenValue>,
  theme: string,
  layers: Array<{
    key: string;
    value: string;
    tokens: ParsedTokens;
  }>,
) => {
  const customPropertyJSTokens = parseTokensToCustomPropertyJS(tokens);

  return generateThemeFromJSTokens(customPropertyJSTokens, theme, layers);
};

/**
 * Just a convience function so that the function calls above in getRawTokens aren't as verbose.
 * That's it. A strong argument could be made to move this into the getRawTokens function.
 * @param tokens A list of tokens to transform
 * @param transform Should we transform these tokens?
 * @param outputType If we do transform them, are we transforming for CSS or JS?
 * @returns
 */
export const transformRootToTokens = (
  tokens: TokenTree,
  transform = true,
  outputType: "css" | "js" = "css",
) => {
  return recurseTokenTree(tokens, "", {}, undefined, transform, outputType);
};

/**
 *
 * This is a convienence function to get all our tokens in one place.
 *
 * It also gives you a good idea of how to load a subset of tokens if you ever needed to
 *
 * Just create another function that looks like this, but loads in your specific tokens instead.
 *
 * @param transform Should we transform these tokens?
 * @param outputType If we do transform them, are we transforming for CSS or JS?
 * @returns
 */
export const getRawTokens = (
  transform = true,
  outputType: "css" | "js" = "css",
) => {
  const allTokens = CompleteTokenList;

  let rawTokens = {
    "base-unit": baseUnit,
  };

  allTokens.forEach(tokenFile => {
    rawTokens = {
      ...rawTokens,
      ...transformRootToTokens(tokenFile, transform, outputType),
    };
  });

  return rawTokens;
};

/**
 * This is an opinionated function. It accepts no parameters. It's a one-stop-shop for generating the complete Atlantis CSS Foundation File.
 *
 * Call this function, it returns the full css, ready for writing to a file.
 *
 * Instead of making changes to this function for your own needs, consider building your own function that calls the functions this function calls.
 *
 * @returns The complete Atlantis CSS Foundation File. This file contains all the tokens in the correct order, with the correct CSS to load them.
 */
export const buildFullCSS = () => {
  const allTokens = getRawTokens(true, "css");
  const css = parseTokensToCustomPropertyJS(allTokens);
  const currentDir = dirname(import.meta.url.replace("file://", ""));
  const prefixFile = join(currentDir, "..", "..", "styles", "prefixStyles.css");
  const suffixFile = join(currentDir, "..", "..", "styles", "suffixStyles.css");

  const prefixStyles = readFileSync(prefixFile, "utf8");
  const suffixStyles = readFileSync(suffixFile, "utf8");
  const rootCSS = generateCSSFileFromJSTokens(css);

  return `${prefixStyles}\n${rootCSS}\n\n${suffixStyles}`;
};
