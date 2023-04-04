/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const postcss = require("postcss");
const postcssExtract = require("@csstools/postcss-extract");

const colors = fs.readFileSync("src/colors.css");

postcss([
  postcssExtract({
    queries: {
      customProperties: 'rule[selector*=":root" i] > decl[value]',
    },
    results: yourResults => {
      const mappedResults = yourResults.customProperties.reduce(
        (acc, { prop, value }) => {
          acc[prop] = value;
          return acc;
        },
        {},
      );
      const resultsString = `module.exports = ${JSON.stringify(
        { customProperties: mappedResults },
        null,
        2,
      )}`;

      fs.writeFileSync("colors.js", resultsString);
    },
  }),
])
  .process(colors, { from: undefined })
  .then();
