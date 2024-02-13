import { readFileSync, writeFileSync } from "fs";
import postcss from "postcss";
import postcssExtract from "@csstools/postcss-extract";

const colors = readFileSync("src/colors.css");

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

      writeFileSync("colors.js", resultsString);
    },
  }),
])
  .process(colors, { from: undefined })
  .then();
