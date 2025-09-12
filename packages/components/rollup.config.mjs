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

/**
 * When PREBUILD_CSS is supplied, only build the main index.ts file.
 * This ensures postcss maintains consistent ordering of styles across builds.
 *
 * Using multiInput (input with globs) produces inconsistent ordering within styles.css
 * because files are loaded in a non-deterministic order, and postcss bundles them in
 * that order.
 */
const PREBUILD_CSS = process.env.PREBUILD_CSS === "true";

export default {
  input: PREBUILD_CSS ? "src/index.ts" : `src/**/index.{ts,tsx}`,
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
          files: ["../design/dist/foundation.css"],
        }),
        presetenv({
          stage: 1,
          preserve: true,
        }),
      ],
    }),
    commonjs(),
    copy({
      targets: [
        { src: "src/Card/cardcolors.css.d.ts", dest: "dist/Card" },
        { src: "src/Content/Spacing.css.d.ts", dest: "dist/Content" },
        { src: "src/Gallery/Gallery.css.d.ts", dest: "dist/Gallery" },
        { src: "src/Grid/GridAlign.css.d.ts", dest: "dist/Grid" },
        { src: "src/Modal/ModalSizes.css.d.ts", dest: "dist/Modal" },
        {
          src: "src/ProgressBar/ProgressBarSizes.css.d.ts",
          dest: "dist/ProgressBar",
        },
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
        { src: "src/utils/meta/meta.json", dest: "dist/utils/meta" },
      ],
      hook: "writeBundle",
    }),
  ],
  output: [
    {
      dir: "dist",
      entryFileNames: "[name].cjs",
      chunkFileNames: "[name]-[format].js",
      exports: "named",
      format: "cjs",
    },
    {
      dir: "dist",
      entryFileNames: "[name].mjs",
      chunkFileNames: "[name]-[format].js",
      format: "esm",
    },
  ],
  external: [
    "react",
    "react-hook-form",
    "react-router-dom",
    "react-dom",
    "react-dom/client",
    "axios",
    "lodash",
    "filesize",
    "color",
    "framer-motion",
    "classnames",
    "@apollo/client",
    "@jobber/design",
    "@jobber/design/foundation",
    "@jobber/formatters",
    "@jobber/hooks",
    "@tanstack/react-table",
  ],
};
