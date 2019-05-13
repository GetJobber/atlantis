/* eslint-disable import/no-default-export */

import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";

const inputs = ["Icon", "InlineLabel", "Table", "TextField"];

export default inputs.map(input => {
  return {
    input: `src/${input}/index.ts`,
    plugins: [
      typescript({
        useTsconfigDeclarationDir: true,
      }),
      postcss({
        modules: true,
      }),
    ],
    output: [
      {
        file: `dist/${input}/index.js`,
        format: "cjs",
      },
    ],
  };
});
