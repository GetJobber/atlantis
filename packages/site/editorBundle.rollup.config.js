// rollup.config.js
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import nodePolyfills from "rollup-plugin-polyfill-node";
import replace from "@rollup/plugin-replace";

export default {
  input: "src/editorBundle.js",
  output: {
    file: "public/editorBundle.js",
    format: "esm",
    exports: "named",
  },
  plugins: [
    commonjs(),
    nodePolyfills({ util: true, process: true }),
    json(),
    resolve(),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
      preventAssignment: true,
    }),
  ],
  external: ["axios"],
};
