import path from "path";
import { fileURLToPath } from "url";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import nodePolyfills from "rollup-plugin-polyfill-node";
import replace from "@rollup/plugin-replace";
import alias from "@rollup/plugin-alias";

const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);

export default {
  input: "src/editorMobileBundle.js",
  output: {
    file: "public/editorMobileBundle.js",
    format: "esm",
    exports: "named",
  },
  plugins: [
    commonjs(),
    nodePolyfills({ util: true, process: true }),
    json(),
    resolve(),
    replace({
      "process.env.NODE_ENV": JSON.stringify("development"),
      preventAssignment: true,
    }),
    alias({
      entries: [
        { find: "react-native", replacement: "react-native-web" },

        {
          find: "react-native-keyboard-aware-scroll-view",
          replacement: path.resolve(dirname, "./src/MobileOverrides.js"),
        },
        {
          find: "react-native-toast-message",
          replacement: path.resolve(dirname, "./src/MobileOverrides.js"),
        },
        {
          find: "react-native-safe-area-context",
          replacement: path.resolve(dirname, "./src/MobileOverrides.js"),
        },
        {
          find: "react-native-gesture-handler",
          replacement: path.resolve(dirname, "./src/MobileOverrides.js"),
        },
        {
          find: "react-native-modalize",
          replacement: path.resolve(dirname, "./src/MobileOverrides.js"),
        },
        {
          find: "react-native-svg",
          replacement: path.resolve(dirname, "./src/MobileOverrides.js"),
        },
        {
          find: "react-native-reanimated",
          replacement: path.resolve(dirname, "./src/MobileOverrides.js"),
        },
      ],
    }),
  ],
  external: ["axios"],
};
