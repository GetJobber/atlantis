import type {
  OverrideTokenTree,
  ParsedTokens,
  Token,
  TokenTree,
  TokenType,
  Tokens,
  TransformValue,
} from "./tokenTypes.ts";

/**
 *
 * @param value A value from a token file to be transformed
 * @param activeType The type of the token
 * @param outputType Are we generating for CSS or JS? It makes a difference in how we output for some types.
 * @returns
 */
export const tokenValueToCSSOrJS = (
  value: TransformValue,
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

/**
 * Used to determined the active type of a token while parsing. Because
 * a type can be set in a parent, we need to check that value at the child level
 * So we pass the type down through the chain as we find them.
 * @param key The current key in the token tree
 * @param activeType The current active type
 * @param tokens A list of tokens
 * @returns The current active type. Either at value level, or group/parent level from the existing key.
 */
export const getActiveType = (
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

const handleRecurseError = (e: Error) => {
  if (e.message.includes("Maximum")) {
    throw new Error(
      `Maximum recursion depth reached. Are you missing a $value key in your token structure?`,
    );
  } else {
    console.log("EEEVCCVv", e);
  }
};

/**
 * This is the meat of the design package/token parsing.
 * This is a Recursive Function: https://en.wikipedia.org/wiki/Recursion_(computer_science).
 *
 * That means that this function calls itself. It's a way to loop through a tree-like structure
 * with very little code.
 *
 * The general idea behind this code:
 *
 * 1. We start with a list of tokens. This is a tree-like structure where each key can have a value, or another list of keys. An example of that structure is below.
 * 2. We loop through each key in the list.
 * 3. If the key is not a token (doesn't start with a $) we call this function again with the new list of keys.
 * 4. If the key is a token, we return the value of that token.
 * 5. We then add that token to a list of tokens we are building.
 * 6. We return that list of tokens.
 *
 * ```json
 * {
 *  "keyname": {
 *   "$type": "dimension",
 *   "$value": "16px"
 *  },
 *  "keyname2":{
 *     "subkeyname":{
 *       "$type": "dimension",
 *       "$value": "32px"
 *     }
 *  }
 * }
 * ```
 *
 *
 * That's it. That's the whole function, and the key pin in this entire package.
 *
 * Beyond this function, it's about transforming the structure created into other shapes. CSS files. JS files. JSON files with calculated values.
 *
 * So the process for using this:
 *
 *  Load tokens into the app by importing the JSON directly, or parse it from a file. the tokens follow the standard W3C Format (with one caveat) https://tr.designtokens.org/format/
 *      . Our one caveat is we store our colors in the HSL format, instead of the HEX format.
 * 
 * Pass the loaded tokens into this function with the following params:
 * 
 * recurseTokenTree(
    YOUR_LOADED_TOKENS,
    "", <-- We will this empty string to build up the key names as we recurse
    {}, <-- The list of tokens we are building will be loaded into this object
    undefined, <-- The active type. Since we're just starting, this is undefined. This will be filled in as we recurse.
    transform, <-- Should we transform the final value?
    outputType, <-- If we are transforming, should we transform for CSS or JS. This can change what we transform the value into.
  );
 *
 * @param tokens The complete, original list of tokens
 * @param keyIn The current key (starts blank, builds up as we go)
 * @param tokenList The list of tokens we are building
 * @param activeType The active type of token. As we find these types we pass them down the chain because they can be set at the parent level.
 * @param transform Should we transform the value when we find one?
 * @param outputType If we are transforming, are we generating for CSS or JS? The token itself is transformed in `tokenValueToCSSorJS`
 * @returns
 */
export const recurseTokenTree = (
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

      try {
        token = recurseTokenTree(
          tokens[key] as Tokens,
          passedKey,
          tokenList,
          activeType,
          transform,
          outputType,
        );
      } catch (e) {
        handleRecurseError(e as Error);
      }
    } else if (key === "$value") {
      return {
        [keyIn]: transform
          ? tokenValueToCSSOrJS(tokens[key], activeType, outputType)
          : tokens[key],
      };
    }
    tokenList = extractTokenFromObject(token, tokenList);
  }

  return tokenList;
};

export const extractTokenFromObject = (token: Tokens, tokenList: Tokens) => {
  // There is only one key in the token object, so we can just grab the first key
  const tokenKey = Object.keys(token)[0];

  if (tokenKey && typeof token[tokenKey] !== "undefined") {
    tokenList[tokenKey] = token[tokenKey];
  }

  return tokenList;
};

/**
 * This function takes in a list of tokens and returns a list of tokens with the standard CSS Custom Property format.
 * @param rawTokens A list of raw tokens, straight from the JSON file via `getRawTokens` or `recurseTokenTree`
 * @returns
 */
export const parseTokensToCSS = (rawTokens: Tokens): ParsedTokens => {
  let cssTokens = replaceStandardTokenWithCSSCustomProperty(rawTokens);
  let keepGoing = false;

  do {
    cssTokens = replaceStandardTokenWithCSSCustomProperty(cssTokens);
    keepGoing = false;

    for (const [, val] of Object.entries(cssTokens)) {
      if (typeof val === "string" && val.includes?.("{")) {
        keepGoing = true;
      }
    }
  } while (keepGoing);

  return cssTokens;
};

/**
 * Takes in a list of tokens, returns a list of tokens with the standard CSS Custom Property format.
 *
 * @param rawTokens A list of raw tokens to parse
 * @returns A list of tokens in the CSS Custom property format var(--token-name);
 */
export const replaceStandardTokenWithCSSCustomProperty = (
  rawTokens: Tokens,
) => {
  const newTokens: ParsedTokens = {};

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
              .replace(/\}/g, ")")
              .replace(/\{/g, "(--");
          newTokens[key] = value.replace(new RegExp(match, "g"), tokenKey);
        });
      }
    }
  }

  return { ...rawTokens, ...newTokens } as ParsedTokens;
};

/**
 * Platform Overrides allow us to override specific design tokens for a specific platform.
 *
 * Right now that means we can take our web-based tokens, and sub-in ios or android specific values.
 *
 * @param platform Are we overriding for ios or android?
 * @param outputType CSS or JS. This will get passed down to the `tokenValueToCSSOrJS` function to determine how to transform the value.
 * @param Overrides By default we have a platform override file, but you could reuse this funciton to parse overrides from other files if needed.
 * @returns
 */
export const parseOverrides = (
  Overrides: OverrideTokenTree,
  platform?: "ios" | "android",
  outputType: "css" | "js" = "css",
) => {
  let overrides = {};
  [Overrides].forEach(root => {
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
