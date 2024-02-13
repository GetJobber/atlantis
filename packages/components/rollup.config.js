/* eslint-disable import/no-default-export */
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import postcssImport from "postcss-import";
import autoprefixer from "autoprefixer";
import postcssPresetEnv from "postcss-preset-env";

export default {
  input: `src/index.tsx`,
  plugins: [
    postcss({
      modules: {
        generateScopedName: "[hash:base64]",
        globalModulePaths: [/node_modules/],
      },
      autoModules: false,
      plugins: [
        postcssImport({
          path: [
            "@jobber/design/foundation.css",
            "@jobber/design/src/responsiveBreakpoints.css",
          ],
        }),
        autoprefixer,
        postcssPresetEnv({
          stage: 1,
          preserve: true,
        }),
      ],
    }),
    typescript({
      tsconfig: "./tsconfig.rollup.json",
      noEmitOnError: true,
    }),
  ],
  output: [
    {
      file: "dist/index.js",
      format: "esm",
    },
  ],
  external: [
    "react",
    "react-hook-form",
    "react-router-dom",
    "react-dom",
    "react-markdown",
    "react-countdown",
    "react-popper",
    "react-datepicker",
    "react-dropzone",
    "react-dom/client",
    "axios",
    "filesize",
    "color",
    "framer-motion",
    "classnames",
    new RegExp("lodash/.*"),
    "@std-proposal/temporal",
    "@jobber/design",
    "@jobber/design/foundation",
    "@jobber/formatters",
    new RegExp("@jobber/hooks/.*"),
    "zxcvbn",
    "use-resize-observer/polyfilled",
    "@apollo/client",
    "@tanstack/react-table",
  ],
};
