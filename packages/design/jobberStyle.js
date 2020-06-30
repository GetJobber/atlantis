/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
// eslint-disable-next-line import/no-internal-modules
const customPropertiesObject = require("./foundation.js");

const regexExpressions = {
  cssVars: /var\((.*)\)/,
  calculations: /calc\((.*)\)/,
  removeAllNonNumerals: /[^0-9.+\-/*]/gi,
  extractAllVarGroups: /var\(.*?\)/g,
};

const customProperties = customPropertiesObject.customProperties;

const resolvedCssVars = getResolvedCSSVars(customProperties);

const jsonContent =
  "export const JobberStyle = " + JSON.stringify(resolvedCssVars, undefined, 2);

fs.writeFile("./foundation.js", jsonContent, "utf8", function(err) {
  if (err) {
    console.log("An error occured while writing JSON object to File.");
    return console.log(err);
  }
  console.log("JSON file has been saved.");
});

function jobberStyle(styling) {
  const styleValue = customProperties[styling];
  const varRegexResult = regexExpressions.cssVars.exec(styleValue);
  const calcRegexResult = regexExpressions.calculations.exec(styleValue);
  if (calcRegexResult) {
    const finalExpression = handleExpressionsInCalc(calcRegexResult);
    // eslint-disable-next-line no-new-func
    const calculatedValue = new Function(
      "return " +
        finalExpression.replace(regexExpressions.removeAllNonNumerals, ""),
    )();
    return isSpacingValue(calculatedValue)
      ? parseFloat(calculatedValue)
      : calculatedValue;
  } else if (varRegexResult) {
    return jobberStyle(varRegexResult[1]);
  } else {
    return isSpacingValue(styleValue) ? parseFloat(styleValue) : styleValue;
  }
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
  return !!String(value).match(/(^\d+(px|%)$)|(^\d+$)/);
}

function getResolvedCSSVars(cssProperties) {
  const allKeys = Object.keys(cssProperties);
  return allKeys.reduce((acc, key) => {
    const newKey = key.replace("--", "");
    acc[newKey] = jobberStyle(key);
    return acc;
  }, {});
}
