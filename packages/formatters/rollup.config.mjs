/* eslint-disable import/no-default-export */
import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

const outputDir = process.env.ATLANTIS_DIST_DIR || "dist";

export default {
  input: "src/index.ts",
  output: [
    {
      dir: outputDir,
      entryFileNames: "[name].cjs",
      chunkFileNames: "[name]-[format].js",
      exports: "named",
      format: "cjs",
    },
    {
      dir: outputDir,
      entryFileNames: "[name].mjs",
      chunkFileNames: "[name]-[format].js",
      format: "esm",
    },
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.rollup.json",
      noEmitOnError: true,
      outputToFilesystem: true,
      ...(process.env.ATLANTIS_DIST_DIR && {
        outDir: process.env.ATLANTIS_DIST_DIR,
      }),
    }),
  ],
};
