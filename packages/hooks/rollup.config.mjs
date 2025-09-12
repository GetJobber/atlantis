/* eslint-disable import/no-default-export */
import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import multiInput from "rollup-plugin-multi-input";

export default {
  input: ["src/**/index.{ts,tsx}", "!src/**/test-utilities/*.{ts,tsx}"],
  output: {
    dir: "dist",
    format: "esm",
    entryFileNames: "[name].js",
  },
  plugins: [
    multiInput.default(),
    nodeResolve(),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.rollup.json",
      noEmitOnError: true,
      outputToFilesystem: true,
    }),
  ],
  external: [
    "@apollo/client",
    "@jobber/formatters",
    "react",
    "react-dom",
    "tslib",
  ],
};
