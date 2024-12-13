/**
 * This is used in the Live Editor + Preview feature.
 *
 * We bundle all the Atlantis Web dependency files into a single import,
 * so that we can load it in the iframe via an import map.
 *
 * So when you click on a "Web" tab, the built result of this file is loaded in the preview iframe,
 * via https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap
 */

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
