/* eslint-disable import/no-internal-modules */
import { writeFile } from "fs";
import { customProperties } from "./src/foundation.mjs";
import { getShadowStyles } from "./src/getMobileShadows.mjs";
import { getMobileLineHeights } from "./src/getMobileLineHeights.mjs";
import { getMobileFontSizes } from "./src/getMobileFontSizes.mjs";

const regexExpressions = {
  cssVars: /var\((.*)\)/,
  calculations: /calc\((.*)\)/,
  rgbVars: /rgb\(var\((.*)\)\)/,
  rgbaVars: /rgba\(var\((.*)\),?(.*)\)/,
  removeAllNonNumerals: /[^0-9.+\-/*]/gi,
  extractAllVarGroups: /var\(.*?\)/g,
  extractTimeNumber: /(\d+)ms/,
};

const resolvedCssVars = getResolvedCSSVars(customProperties);

const jsonContent =
  "export const tokens = " + JSON.stringify(resolvedCssVars, undefined, 2);

writeFile("./foundation.js", jsonContent, "utf8", function (err) {
  if (err) {
    console.log("An error occured while writing JSON object to File.");

    return console.log(err);
  }
});
const scssColors = getResolvedSCSSVariables(resolvedCssVars);

writeFile("./foundation.scss", scssColors.join("\n"), "utf-8", function (err) {
  if (err) {
    console.log("An error occured while writing SCSS to File.");

    return console.log(err);
  }
});
writeMobileFoundationFiles();

/**
 * Recursively resolve css custom properties.
 *
 * eg:
 * ```
 * resolveCSSToken(`
 *   "--base": "5px",
 *   "--foo": "calc(var(--base) * 2),
 * `);
 * ```
 *
 * would return
 * ```
 * {
 *   "--base": "5",
 *   "--foo": "10",
 * }
 * ```
 */

// Added up to 13 statements to accommodate sharing timing with mobile
/*eslint max-statements: ["error", 13]*/
function resolveCSSToken(styling) {
  const styleValue = removeNewLines(customProperties[styling]);

  //varRegexResult returns --base-unit from var(--base-unit)
  const varRegexResult = regexExpressions.cssVars.exec(styleValue);
  //rgbVarRegexResult returns --base-unit from rgb(var(--base-unit))
  const rgbVarRegexResult = regexExpressions.rgbVars.exec(styleValue);
  //rgbaVarRegexResult returns --base-unit and alpha (if exists) from rgba(var(--base-unit), alpha)
  const rgbaVarRegexResult = regexExpressions.rgbaVars.exec(styleValue);
  //calcRegexResult returns var(--base-unit) / 16 from calc(var(--base-unit) / 16)
  const calcRegexResult = regexExpressions.calculations.exec(styleValue);
  //timeNumberResult returns 100 from "100ms"
  const timeNumberResult = regexExpressions.extractTimeNumber.exec(styleValue);

  if (calcRegexResult) {
    return handleCalc(calcRegexResult);
  } else if (rgbVarRegexResult) {
    return resolveCSSToken(rgbVarRegexResult[1]);
  } else if (rgbaVarRegexResult) {
    return handleRbga(rgbaVarRegexResult);
  } else if (varRegexResult) {
    return resolveCSSToken(varRegexResult[1]);
  } else if (timeNumberResult) {
    return handleTiming(timeNumberResult[1]);
  } else {
    return isSpacingValue(styleValue) || isFloatValue(styleValue)
      ? parseFloat(styleValue)
      : styleValue;
  }
}

function isFloatValue(value) {
  return value == parseFloat(value);
}

function handleCalc(calcRegexResult) {
  const finalExpression = handleExpressionsInCalc(calcRegexResult);
  // eslint-disable-next-line no-new-func
  const calculatedValue = new Function(
    "return " +
      finalExpression.replace(regexExpressions.removeAllNonNumerals, ""),
  )();

  return isSpacingValue(calculatedValue)
    ? parseFloat(calculatedValue)
    : calculatedValue;
}

function handleTiming(timeNumberResult) {
  return parseFloat(timeNumberResult);
}

function handleRbga(rgbaVarRegexResult) {
  let resolved = "rgba(" + resolveCSSToken(rgbaVarRegexResult[1]);

  if (rgbaVarRegexResult[2]) {
    resolved += "," + rgbaVarRegexResult[2];
  }
  resolved += ")";

  return resolved;
}

function handleExpressionsInCalc(calcRegexResult) {
  const calcExtract = calcRegexResult[1];
  const varGroups = calcExtract.match(regexExpressions.extractAllVarGroups);
  let finalExpression = calcExtract;
  varGroups &&
    varGroups.forEach(group => {
      const cssVariableRegexResult = regexExpressions.cssVars.exec(group);

      if (cssVariableRegexResult) {
        finalExpression = resolveCssVarsInExpression({
          group,
          cssVariableRegexResult,
          finalExpression,
        });
      }
    });

  return finalExpression;
}

function resolveCssVarsInExpression({
  group,
  cssVariableRegexResult,
  finalExpression,
}) {
  const cssVariable = cssVariableRegexResult[1];
  const realValue = resolveCSSToken(cssVariable);
  const unresolvedCssVariable = group;

  return finalExpression.replace(unresolvedCssVariable, realValue);
}

function isSpacingValue(value) {
  return !!String(value).match(
    /(^\d+(px|%|rem|em|ex|ch|vw|vh|vmin|vmax)$)|(^\d+$)/,
  );
}

function getResolvedCSSVars(cssProperties) {
  const allKeys = Object.keys(cssProperties);

  return allKeys.reduce((acc, key) => {
    const newKey = key.replace("--", "");
    acc[newKey] = resolveCSSToken(key);

    return acc;
  }, {});
}

function getResolvedSCSSVariables(cssProperties) {
  const allKeys = Object.keys(cssProperties);

  return allKeys.reduce((acc, cssVar) => {
    const propertyValue = getPropertyValue(cssVar);

    if (propertyValue) {
      return [...acc, `$${cssVar}: ${propertyValue};`];
    }

    return acc;
  }, []);
}

function resolveShadow(shadowValue) {
  const splitValue = shadowValue.split(" ").filter(n => n);

  return splitValue
    .map(value => {
      const varRegexResult = regexExpressions.cssVars.exec(value);

      if (varRegexResult) {
        const result = resolveCSSToken(varRegexResult[1]);
        const suffix = typeof result === "string" ? "" : "px";

        return `${result}${suffix}`;
      }

      return value;
    })
    .join(" ");
}

function getVariableType(cssVar) {
  const includesInArray = v => cssVar.includes(v);

  const isSizeVariables = ["border", "radius"].some(includesInArray);
  const isSimpleVariables = [
    "color",
    "timing",
    "elevation",
    "lineHeight",
    "fontFamily",
    "letterSpacing-base",
  ].some(includesInArray);
  const isCalcVariables = ["space", "letterSpacing-loose", "fontSize"].some(
    includesInArray,
  );
  const isShadowVariable = cssVar.includes("shadow");

  if (isSimpleVariables) return "simple";
  if (isSizeVariables) return "size";
  if (isCalcVariables) return "calc";
  if (isShadowVariable) return "shadow";
}

function getPropertyValue(cssVar) {
  const customPropertyValue = customProperties["--" + cssVar];
  const variableType = getVariableType(cssVar);

  switch (variableType) {
    case "simple":
      return `${resolvedCssVars[cssVar]}`;
    case "calc": {
      const calcRegexResult = regexExpressions.calculations.exec(
        removeNewLines(customPropertyValue),
      );

      return `${handleCalc(calcRegexResult)}px`;
    }
    case "size": {
      const suffix = customPropertyValue.includes("%") ? "%" : "px";

      return `${resolvedCssVars[cssVar]}${suffix}`;
    }
    case "shadow":
      return `${resolveShadow(customPropertyValue)}`;
    default:
      return "";
  }
}

/**
 *
 * Removes all types of line breaks from the text
 * Reference: https://stackoverflow.com/a/10805198
 */
function removeNewLines(text) {
  if (!text) return text;

  return text.replace(/(\r\n|\n|\r)/gm, "");
}

function writeMobileFoundationFiles() {
  const { androidShadows, iOSShadows } = getShadowStyles(resolvedCssVars);
  const mobileLineHeightValues = getMobileLineHeights();
  const mobileFontSizeValues = getMobileFontSizes();
  const androidFoundationTokens = {
    ...resolvedCssVars,
    ...androidShadows,
    ...mobileLineHeightValues,
    ...mobileFontSizeValues,
  };
  const iOSFoundationTokens = {
    ...resolvedCssVars,
    ...iOSShadows,
    ...mobileLineHeightValues,
    ...mobileFontSizeValues,
  };
  const androidFoundationsExportString = `export const tokens = ${JSON.stringify(
    androidFoundationTokens,
    undefined,
    2,
  )}`;

  const iOSFoundationsExportString = `export const tokens = ${JSON.stringify(
    iOSFoundationTokens,
    undefined,
    2,
  )}`;
  writeFile(
    "./foundation.android.js",
    androidFoundationsExportString,
    "utf-8",
    err => {
      if (err) {
        console.log("An error occured while writing Android Foundation File.");

        return console.log(err);
      }
      console.log("Wrote Android Foundations file");
    },
  );
  writeFile("./foundation.ios.js", iOSFoundationsExportString, "utf-8", err => {
    if (err) {
      console.log("An error occured while writing iOS Foundation File.");

      return console.log(err);
    }
    console.log("Wrote iOS Foundations file");
  });
  writeFile(
    "./foundation.native.js",
    iOSFoundationsExportString,
    "utf-8",
    err => {
      if (err) {
        console.log("An error occured while writing iOS Foundation File.");

        return console.log(err);
      }
      console.log("Wrote Native Foundations file");
    },
  );
}
