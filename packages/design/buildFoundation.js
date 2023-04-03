/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const postcss = require("postcss");
// const postcssCustomProperties = require("postcss-custom-properties");
const postcssExtract = require("@csstools/postcss-extract");

const foundation = fs.readFileSync("./foundation.css");

postcss([
  postcssExtract({
    queries: {
      customProperties: 'rule[selector*=":root" i] > decl[value]',
    },
    results: yourResults => {
      //{ type: 'decl', prop: '--your-property', value: 'cyan', variable: true },
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
      // console.log(JSON.stringify({ customProperties: mappedResults }, null, 2));
      fs.writeFileSync("src/foundation.js", resultsString);
    },
    // extractLate: true,
  }),
])
  .process(foundation, { from: undefined })
  .then();
