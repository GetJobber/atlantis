/* eslint-disable import/no-default-export */
import multiInput from "rollup-plugin-multi-input";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import commonjs from "rollup-plugin-commonjs";

export default {
  input: `src/*/index.ts`,
  plugins: [
    multiInput(),
    typescript({
      declarationDir: "dist",
    }),
    postcss({
      modules: true,
      plugins: [
        require("postcss-import"),
        require("autoprefixer"),
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require("postcss-custom-media")({
          preserve: true,
          importFrom: [
            require.resolve("@jobber/design/src/responsiveBreakpoints.css"),
          ],
        }),
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require("postcss-media-minmax")({
          preserve: true,
          importFrom: [
            require.resolve("@jobber/design/src/responsiveBreakpoints.css"),
          ],
        }),
      ],
    }),
    commonjs({
      ignore: ["time-input-polyfill", "time-input-polyfill/supportsTime"],
    }),
  ],
  output: [
    {
      dir: "dist",
      format: "cjs",
    },
  ],
  external: ["react", "classnames", "@jobber/formatters"],
};
