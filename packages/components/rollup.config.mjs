/* eslint-disable import/no-default-export */
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import postcssimport from "postcss-import";
import autoprefixer from "autoprefixer";
import tools from "@csstools/postcss-global-data";
import presetenv from "postcss-preset-env";
import multiInput from "rollup-plugin-multi-input";
import nodePolyfills from "rollup-plugin-polyfill-node";
import alias from "@rollup/plugin-alias";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default {
  input: `src/**/index.{ts,tsx}`,
  plugins: [
    nodePolyfills(),
    alias({
      entries: [
        {
          find: /@jobber\/hooks\/(.*)/,
          replacement: (_, p1) =>
            resolve(__dirname, `../hooks/dist/${p1}/${p1}.js`),
        },
      ],
    }),
    nodeResolve(),
    multiInput.default(),
    typescript({
      tsconfig: "./tsconfig.rollup.json",
      declarationDir: "dist",
      noEmitOnError: true,
    }),
    postcss({
      extract: "styles.css",
      inject: false,
      modules: {
        generateScopedName: "[hash:base64]",
        globalModulePaths: [/node_modules/],
      },
      autoModules: false,
      plugins: [
        postcssimport,
        autoprefixer,
        tools({
          files: [
            "../design/foundation.css",
            "../design/src/responsiveBreakpoints.css",
          ],
        }),
        presetenv({
          stage: 1,
          preserve: true,
        }),
      ],
    }),
    commonjs({
      ignore: ["time-input-polyfill", "time-input-polyfill/supportsTime"],
    }),
    copy({
      targets: [
        { src: "src/Card/colors.css.d.ts", dest: "dist/Card" },
        { src: "src/Content/Spacing.css.d.ts", dest: "dist/Content" },
        { src: "src/Gallery/Gallery.css.d.ts", dest: "dist/Gallery" },
        { src: "src/Grid/GridAlign.css.d.ts", dest: "dist/Grid" },
        { src: "src/Modal/Sizes.css.d.ts", dest: "dist/Modal" },
        { src: "src/ProgressBar/Sizes.css.d.ts", dest: "dist/ProgressBar" },
        {
          src: "src/Typography/css/Emphasis.css.d.ts",
          dest: "dist/Typography/css",
        },
        {
          src: "src/Typography/css/FontFamilies.css.d.ts",
          dest: "dist/Typography/css",
        },
        {
          src: "src/Typography/css/FontSizes.css.d.ts",
          dest: "dist/Typography/css",
        },
        {
          src: "src/Typography/css/FontWeights.css.d.ts",
          dest: "dist/Typography/css",
        },
        {
          src: "src/Typography/css/TextAlignment.css.d.ts",
          dest: "dist/Typography/css",
        },
        {
          src: "src/Typography/css/TextCases.css.d.ts",
          dest: "dist/Typography/css",
        },
        {
          src: "src/Typography/css/TextColors.css.d.ts",
          dest: "dist/Typography/css",
        },
        {
          src: "src/Typography/css/Truncate.css.d.ts",
          dest: "dist/Typography/css",
        },
        {
          src: "src/Typography/css/Typography.css.d.ts",
          dest: "dist/Typography/css",
        },
        { src: "src/Glimmer/style/Shape.css.d.ts", dest: "dist/Glimmer/style" },
        { src: "src/Glimmer/style/Sizes.css.d.ts", dest: "dist/Glimmer/style" },
        {
          src: "src/Glimmer/style/Timing.css.d.ts",
          dest: "dist/Glimmer/style",
        },
        {
          src: "src/Combobox/components/ComboboxContent/ComboboxContentList/ComboboxContent.css.d.ts",
          dest: "dist/Combobox/components/ComboboxContent/ComboboxContentList",
        },
        {
          src: "dist/index.d.ts",
          dest: "dist",
          rename: "index.d.mts",
        },
      ],
      hook: "writeBundle",
    }),
  ],
  output: [
    {
      dir: "dist",
      entryFileNames: "[name].cjs",
      exports: "named",
      format: "cjs",
    },
    {
      dir: "dist",
      entryFileNames: "[name].mjs",
      format: "esm",
    },
  ],
  external: [
    "react",
    "react-hook-form",
    "react-router-dom",
    "react-dom",
    "react-popper",
    "react-dom/client",
    "axios",
    "lodash",
    "filesize",
    "color",
    "framer-motion",
    "classnames",
    "@std-proposal/temporal",
    "@apollo/client",
    "@jobber/design",
    "@jobber/design/foundation",
    "@jobber/formatters",
    "@jobber/hooks",
    "zxcvbn",
    "@tanstack/react-table",
  ],
};
