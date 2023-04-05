/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const postcss = require("postcss");
const postcssExtract = require("@csstools/postcss-extract");

const foundation = fs.readFileSync("./foundation.css");

postcss([
  postcssExtract({
    queries: {
      customProperties: 'rule[selector*=":root" i] > decl[value]',
    },
    results: yourResults => {
      const mappedResults = yourResults.customProperties.reduce(
        (acc, { prop, value }) => {
          if (!(prop in acc)) {
            acc[prop] = value; //.trim(); //.replaceAll("\n", "");
          }
          return acc;
        },
        {},
      );
      const resultsString = `module.exports = ${JSON.stringify(
        { customProperties: mappedResults },
        null,
        2,
      )}`;

      fs.writeFileSync("src/foundation.js", resultsString);
    },
  }),
])
  .process(foundation, { from: undefined })
  .then();
