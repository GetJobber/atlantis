/* eslint-disable import/no-default-export */
import multiInput from "rollup-plugin-multi-input";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";

export default {
  input: "src/*/index.ts",
  plugins: [
    multiInput.default(),
    typescript({ declarationDir: "dist" }),
    external(),
    resolve(),
    commonjs(),
    postcss(),
    terser(),
  ],
  output: [
    {
      dir: "dist",
      format: "cjs",
    },
  ],
  external: ["react", "react-native"],
};
