import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import postcssImport from "postcss-import";
import autoprefixer from "autoprefixer";
import postcssPresetEnv from "postcss-preset-env";

export default {
  input: `src/index.ts`,
  plugins: [
    typescript({
      declarationDir: "dist",
    }),
    postcss({
      modules: { generateScopedName: "[hash:base64]" },
      autoModules: false,
      plugins: [
        postcssImport,
        autoprefixer,
        postcssPresetEnv({
          stage: 1,
          preserve: true,
        }),
      ],
    }),
  ],
  output: [
    {
      dir: "dist",
      format: "esm",
    },
  ],
  external: ["react", "classnames"],
};
