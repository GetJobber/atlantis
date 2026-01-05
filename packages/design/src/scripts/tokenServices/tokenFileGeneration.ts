import { Tokens } from "./tokenTypes";

/**
 * Take in a list of tokens as a JS Object, and return a string that can be written to a file that makes up a CSS theme.
 *
 * Since this generates a CSS theme, you should first convert your tokens to the var(--token-name) format via `parseTokensToCSS`
 *
 * @param css A list of tokens that have been parsed to CSS, but still not a string/file
 * @param theme What is the name of your theme?
 * @param layers Layers are the idea of a theme within a theme. For example, [data-elevated="true"] could require slightly different tokens.
 * @returns A string that can be written to a file, but contains the necessary CSS to load a theme.
 */
export const convertJSTokensToTheme = (
  css: Tokens,
  theme: string,
  layers: Array<{
    key: string;
    value: string;
    tokens: Record<string, string | number>;
  }>,
) => {
  let rootCSS = `:root[data-theme="${theme}"],\n div[data-theme="${theme}"] {\n@media screen {\n`;

  for (const [i] of Object.entries(css)) {
    rootCSS += `  --${i}: ${css[i]};\n`;
  }
  layers.forEach(layer => {
    rootCSS += `&:not(:has(div[data-theme]:not([data-theme="${theme}"]))) [${layer.key}="${layer.value}"] {\n`;

    for (const [i] of Object.entries(layer.tokens)) {
      rootCSS += `  --${i}: ${layer.tokens[i]};\n`;
    }
    rootCSS += `}\n`;
  });
  rootCSS += `}\n}`;

  return rootCSS;
};

/**
 * Takes in a list of tokens as a JS Object, and returns a string that can be written to a file that makes up a CSS file.
 *
 * @param css A list of tokens, parsed to the CSS format var(--token-name) (via `parseTokensToCSS`) but still as a JS object (not yet transformed to a string/file)
 * @returns A string that can be written to a file, that attaches the list of tokens in CSS format to the root of the document.
 */
export const convertJSTokensToCSS = (css: Tokens) => {
  let rootCSS = `:root {\n`;

  for (const [i] of Object.entries(css)) {
    rootCSS += `  --${i}: ${css[i]};\n`;
  }
  rootCSS += `}\n`;

  return rootCSS;
};

/**
 * Little helper function to determine if something is a number or not. Numbers don't get wrapped in quotes when generating JS
 */
function isNumber(value: unknown) {
  return !isNaN(value as number) && !isNaN(parseFloat(value as string));
}

/**
 * Low-level utility function for this file. It traverses a list of tokens and prints them in the correct format for a JS file.
 *
 * @param obj A list of tokens to traverse and print
 * @returns A list of tokens in the correct format for a JS file.
 */
function traverseObjectAndPrintForJS(obj: Tokens): string {
  let result = "";

  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value === "object" && !Array.isArray(value)) {
      result += `    "${key}":{\n`;
      Object.entries(value as Tokens).forEach(([innerKey, innerValue]) => {
        const isNum = isNumber(innerValue);
        const maybeWrapped = !isNum ? `"${innerValue}"` : innerValue;
        result += `      "${innerKey}": ${maybeWrapped}, \n`;
      });
      result += `    },\n`;
    } else {
      const isNum = isNumber(value);
      const maybeWrapped = !isNum ? `"${value}"` : value;
      result += `    "${key}": ${maybeWrapped}, \n`;
    }
  });

  result = result.slice(0, -2);

  return result + "\n";
}

/**
 * Create a JS object from a list of tokens. This is useful for writing to a file.
 *
 * @param jsTokens A list of tokens, converted to be ready for JS.
 * @param esm Should we generate an ESM file or not?
 * @returns A string, ready to be written to a file. That file will contain a default javascript object with tokens.
 */
export const convertJSTokensToObjectString = (
  jsTokens: Record<string, string | number>,
  esm = true,
) => {
  let jsTokensString = esm ? `export default {\n` : `module.exports ={\n`;

  for (const [key, value] of Object.entries(jsTokens)) {
    if (typeof value === "object") {
      jsTokensString +=
        `  "${key}":{\n` + traverseObjectAndPrintForJS(value) + `  },\n`;
    } else {
      const isNum = isNumber(value);
      const maybeWrapped = !isNum ? `"${value}"` : value;
      jsTokensString += `  "${key}": ${maybeWrapped},\n`;
    }
  }
  jsTokensString += `};`;

  return jsTokensString;
};

/**
 * Tokens aliases are stored in the JSON w3c format https://tr.designtokens.org/format/#alias-reference.
 * Which means we can reference other tokens in the value of a token.
 * This function takes in a complete list of those w3c tokens, and replaces any aliases with their actual values.
 *
 * We need a complete list of tokens becuase we will find the associated value by key in this list.
 *
 * This function will be called many times in the process of generating tokens because of how token aliases can reference other token aliases.
 * We need to keep evaluating token aliases until we have an actual value.
 *
 * ...it's token aliases all the way down
 *
 * @param rawTokens The raw tokens to parse, typically the output of `getRawTokens` or `recurseTokenTree` for a single set.
 * @returns A list of tokens variables where {group.subgroup.keyname} is replaced with the actual value.
 */
export const replaceTokenAliasesWithActualValues = (
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
