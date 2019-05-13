/* eslint-disable import/no-default-export */

import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";

const inputs = ["InlineLabel"];

export default inputs.map(input => {
  return {
    input: `src/${input}/index.ts`,
    plugins: [
      typescript(),
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

// module.exports = [{
//   input: "src/InlineLabel/index.ts",
//   plugins: [
//     typescript(),
//     postcss({
//       modules: true
//     })
//   ],
//   output: [
//     {
//       file: "dist/InlineLabel.js",
//       format: "cjs"
//     }
//   ]
// }];
