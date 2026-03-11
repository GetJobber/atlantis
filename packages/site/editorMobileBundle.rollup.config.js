import path from "path";
import { fileURLToPath } from "url";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import nodePolyfills from "rollup-plugin-polyfill-node";
import replace from "@rollup/plugin-replace";
import alias from "@rollup/plugin-alias";
import babel from "@rollup/plugin-babel";

const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);

export default {
  input: "src/editorMobileBundle.js",
  output: {
    file: "public/editorMobileBundle.js",
    format: "esm",
    exports: "named",
    banner: "var global = global || {cancelAnimationFrame: () => {}};", // Some code in the mobile bundle is looking for this, so we have to stub it.
  },
  plugins: [
    commonjs(),
    nodePolyfills({ util: true, process: true }),
    json(),
    resolve({
      dedupe: ["react", "react-dom"],
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify("development"),
      preventAssignment: true,
    }),
    alias({
      entries: [
        { find: "react-native", replacement: "./src/MobileOverrides.jsx" },
        {
          find: "react-native-modalize",
          replacement: path.resolve(dirname, "./src/MobileOverrides.jsx"),
        },
        {
          find: "react-native-keyboard-aware-scroll-view",
          replacement: path.resolve(dirname, "./src/MobileOverrides.jsx"),
        },
        {
          find: "react-native-keyboard-controller",
          replacement: path.resolve(dirname, "./src/MobileOverrides.jsx"),
        },
        {
          find: "react-native-toast-message",
          replacement: path.resolve(dirname, "./src/MobileOverrides.jsx"),
        },
        {
          find: "react-native-safe-area-context",
          replacement: path.resolve(dirname, "./src/MobileOverrides.jsx"),
        },
        {
          find: "react-native-gesture-handler",
          replacement: path.resolve(dirname, "./src/MobileOverrides.jsx"),
        },
        {
          find: "react-native-svg",
          replacement: path.resolve(dirname, "./src/MobileOverrides.jsx"),
        },
        {
          find: "react-native-reanimated",
          replacement: path.resolve(dirname, "./src/MobileOverrides.jsx"),
        },
        {
          find: "@react-native-picker/picker",
          replacement: path.resolve(dirname, "./src/MobileOverrides.jsx"),
        },
        {
          find: "@gorhom/bottom-sheet",
          replacement: path.resolve(dirname, "./src/BottomSheetMock.jsx"),
        },
        {
          find: "@jobber/hooks",
          replacement: path.resolve(dirname, `../hooks/dist`),
        },
      ],
    }),
    babel({
      babelHelpers: "bundled",
      presets: ["@babel/preset-react"],
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    }),
  ],
  external: ["axios"],
};
