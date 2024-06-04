/* eslint-disable import/no-default-export */
const multiInput = require("rollup-plugin-multi-input");
const typescript = require("rollup-plugin-typescript2");
const postcss = require("rollup-plugin-postcss");
const commonjs = require("@rollup/plugin-commonjs");
const copy = require("rollup-plugin-copy");

module.exports = {
  input: `src/index.ts`,
  plugins: [
    multiInput.default(),
    typescript({
      declarationDir: "dist",
    }),
    postcss({
      modules: { generateScopedName: "[hash:base64]" },
      autoModules: false,
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
