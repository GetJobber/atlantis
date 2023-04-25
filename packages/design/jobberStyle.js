/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
// eslint-disable-next-line import/no-internal-modules
const customPropertiesObject = require("./src/foundation.js");
// eslint-disable-next-line import/no-internal-modules
const { getShadowStyles } = require("./src/getMobileShadows.js");

const regexExpressions = {
  cssVars: /var\((.*)\)/,
  calculations: /calc\((.*)\)/,
  rgbVars: /rgb\(var\((.*)\)\)/,
  rgbaVars: /rgba\(var\((.*)\),?(.*)\)/,
  removeAllNonNumerals: /[^0-9.+\-/*]/gi,
  extractAllVarGroups: /var\(.*?\)/g,
};

const customProperties = customPropertiesObject.customProperties;

const resolvedCssVars = getResolvedCSSVars(customProperties);

const jsonContent =
  "export const JobberStyle = " + JSON.stringify(resolvedCssVars, undefined, 2);

fs.writeFile("./foundation.js", jsonContent, "utf8", function (err) {
  if (err) {
    console.log("An error occured while writing JSON object to File.");
    return console.log(err);
  }
});
const scssColors = getResolvedSCSSVariables(resolvedCssVars);

fs.writeFile(
  "./foundation.scss",
  scssColors.join("\n"),
  "utf-8",
  function (err) {
    if (err) {
      console.log("An error occured while writing SCSS to File.");
      return console.log(err);
    }
  },
);
writeMobileFoundationFiles();

/**
 * Recursively resolve css custom properties.
 *
 * eg:
 * ```
 * jobberStyle(`
 *   "--base": "5px",
 *   "--foo": "calc(var(--base) * 2),
 * `);
 * ```
 * =>
 * ```
 * {
 *   "--base": "5",
 *   "--foo": "10",
 * }
 * ```
 */

function jobberStyle(styling) {
  const styleValue = removeNewLines(customProperties[styling]);

  //varRegexResult returns --base-unit from var(--base-unit)
  const varRegexResult = regexExpressions.cssVars.exec(styleValue);
  //rgbVarRegexResult returns --base-unit from rgb(var(--base-unit))
  const rgbVarRegexResult = regexExpressions.rgbVars.exec(styleValue);
  //rgbaVarRegexResult returns --base-unit and alpha (if exists) from rgba(var(--base-unit), alpha)
  const rgbaVarRegexResult = regexExpressions.rgbaVars.exec(styleValue);

  //calcRegexResult returns var(--base-unit) / 16 from calc(var(--base-unit) / 16)
  const calcRegexResult = regexExpressions.calculations.exec(styleValue);
  if (calcRegexResult) {
    return handleCalc(calcRegexResult);
  } else if (rgbVarRegexResult) {
    return jobberStyle(rgbVarRegexResult[1]);
  } else if (rgbaVarRegexResult) {
    return handleRbga(rgbaVarRegexResult);
  } else if (varRegexResult) {
    return jobberStyle(varRegexResult[1]);
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

function handleRbga(rgbaVarRegexResult) {
  let resolved = "rgba(" + jobberStyle(rgbaVarRegexResult[1]);
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
  const realValue = jobberStyle(cssVariable);
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
    acc[newKey] = jobberStyle(key);
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
        const result = jobberStyle(varRegexResult[1]);
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
  const androidFoundationJobberStyle = {
    ...resolvedCssVars,
    ...androidShadows,
  };
  const iOSFoundationJobberStyle = {
    ...resolvedCssVars,
    ...iOSShadows,
  };
  const androidFoundationsExportString = `export const JobberStyle = ${JSON.stringify(
    androidFoundationJobberStyle,
    undefined,
    2,
  )}`;

  const iOSFoundationsExportString = `export const JobberStyle = ${JSON.stringify(
    iOSFoundationJobberStyle,
    undefined,
    2,
  )}`;
  fs.writeFile(
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
  fs.writeFile(
    "./foundation.ios.js",
    iOSFoundationsExportString,
    "utf-8",
    err => {
      if (err) {
        console.log("An error occured while writing iOS Foundation File.");
        return console.log(err);
      }
      console.log("Wrote iOS Foundations file");
    },
  );
}
