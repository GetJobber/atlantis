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
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require("postcss-preset-env")({
          stage: 1,
          preserve: true,
          importFrom: [
            require.resolve("@jobber/design"),
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
    "lodash",
    "uuid",
    "lodash/debounce",
    "@js-temporal/polyfill",
    "@std-proposal/temporal",
    "@use-it/event-listener",
    "@jobber/design",
    "@jobber/formatters",
    "@jobber/hooks",
    "@tanstack/react-table",
  ],
};
