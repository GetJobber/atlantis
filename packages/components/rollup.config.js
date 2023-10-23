/* eslint-disable import/no-default-export */
import multiInput from "rollup-plugin-multi-input";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: `src/*/index.{ts,tsx}`,
  plugins: [
    multiInput(),
    typescript({
      tsconfig: "./tsconfig.rollup.json",
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
    "react-dropzone",
    "react-dom/client",
    "axios",
    "filesize",
    "color",
    "framer-motion",
    "classnames",
    "uuid",
    new RegExp("lodash/.*"),
    "@std-proposal/temporal",
    "@use-it/event-listener",
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
