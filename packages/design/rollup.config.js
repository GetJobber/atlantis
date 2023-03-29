/* eslint-disable import/no-default-export */
import multiInput from "rollup-plugin-multi-input";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";

export default {
  input: `src/index.ts`,
  plugins: [
    multiInput(),
    typescript({
      declarationDir: "dist",
    }),
    postcss({
      modules: { generateScopedName: "[hash:base64]" },
      plugins: [
        require("postcss-import"),
        require("autoprefixer"),
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require("postcss-preset-env")({
          stage: 1,
          preserve: true,
        }),
      ],
    }),
    commonjs({
      ignore: [],
    }),
    copy({
      targets: [{ src: "src/icons/*.css.d.ts", dest: "dist/icons" }],
    }),
  ],
  output: [
    {
      dir: "dist",
      format: "cjs",
    },
  ],
  external: ["react", "classnames"],
};
