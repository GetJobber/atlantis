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
      modules: {
        generateScopedName: "[hash:base64]",
        globalModulePaths: [/node_modules/],
      },
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
    "classnames",
    "@jobber/formatters",
    "lodash/debounce",
    "@jobber/hooks",
    "react-router-dom",
    "@std-proposal/temporal",
    "react-countdown",
    "react-datepicker",
    "framer-motion",
    "react-hook-form",
    "uuid",
    "filesize",
    "@jobber/design",
    "lodash",
    "react-dropzone",
    "axios",
    "react-image-lightbox",
    "react-image-lightbox/style.css",
    "react-markdown",
    "react-dom",
    "react-popper",
    "@use-it/event-listener",
    "color",
  ],
};
