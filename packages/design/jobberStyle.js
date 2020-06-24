/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
// eslint-disable-next-line import/no-internal-modules
const customPropertiesObject = require("./foundation.js");

const customProperties = customPropertiesObject.customProperties;
const allKeys = Object.keys(customProperties);
const resolvedCssVars = allKeys.reduce((acc, key) => {
  const newKey = key.replace("--", "");
  acc[newKey] = jobberStyle(key);
  return acc;
}, {});

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
  const varRegExp = /var\((.*)\)/;
  const calcRegExp = /calc\((.*)\)/;
  const removeAllNonNumerals = /[^0-9.+\-/*]/gi;
  const styleValue = customProperties[styling];
  const varRegexResult = varRegExp.exec(styleValue);
  const calcRegexResult = calcRegExp.exec(styleValue);
  if (calcRegexResult) {
    const finalExpression = handleExpressionsInCalc(calcRegexResult);
    // eslint-disable-next-line no-new-func
    const calculatedValue = new Function(
      "return " + finalExpression.replace(removeAllNonNumerals, ""),
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
  const varRegExp = /var\((.*)\)/;
  const extractAllVarGroups = /var\(.*?\)/g;
  const calcExtract = calcRegexResult[1];
  const varGroups = calcExtract.match(extractAllVarGroups);
  let finalExpression = calcExtract;
  varGroups &&
    varGroups.forEach(group => {
      const cssVariableRegexResult = varRegExp.exec(group);
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
