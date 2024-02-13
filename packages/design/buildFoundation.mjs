import { readFileSync, writeFileSync } from "fs";
import postcss from "postcss";
import postcssExtract from "@csstools/postcss-extract";

const foundation = readFileSync("./foundation.css");

postcss([
  postcssExtract({
    queries: {
      customProperties: 'rule[selector*=":root" i] > decl[value]',
    },
    results: yourResults => {
      const mappedResults = yourResults.customProperties.reduce(
        (acc, { prop, value }) => {
          if (!(prop in acc)) {
            acc[prop] = value;
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

      writeFileSync("src/foundation.js", resultsString);
    },
  }),
])
  .process(foundation, { from: undefined })
  .then();
