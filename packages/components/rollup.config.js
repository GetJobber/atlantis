/* eslint-disable import/no-default-export */
import multiInput from "rollup-plugin-multi-input";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: `src/*/index.ts`,
  plugins: [
    multiInput(),
    typescript({
      declarationDir: "dist",
      noEmitOnError: true,
    }),
    postcss({
      modules: {
        generateScopedName: "[hash:base64]",
        globalModulePaths: [/node_modules/],
      },
      autoModules: false,
      plugins: [
        require("postcss-import"),
        require("autoprefixer"),
        require("@csstools/postcss-global-data")({
          files: [
            require.resolve("@jobber/design/foundation.css"),
            require.resolve("@jobber/design/src/responsiveBreakpoints.css"),
          ],
        }),
        require("postcss-preset-env")({
          stage: 1,
          preserve: true,
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
    "uuid",
    "lodash/debounce",
    "lodash/get",
    "lodash/groupBy",
    "lodash/omit",
    "lodash/sortBy",
    "@std-proposal/temporal",
    "@use-it/event-listener",
    "@jobber/design",
    "@jobber/formatters",
    new RegExp("@jobber/hooks/.*"),
    "zxcvbn",
    "use-resize-observer/polyfilled",
    "@apollo/client",
    "@tanstack/react-table",
  ],
};
