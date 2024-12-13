/**
 * This is used in the Live Editor + Preview feature.
 *
 * We bundle all the Atlantis Mobile/React-Native dependency files into a single import,
 * so that we can load it in the iframe via an import map.
 *
 * So when you click on a "Mobile" tab, the built result of this file is loaded in the preview iframe,
 * via https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap
 */

/**
 * STODO: This needs to bundle react-native in a better way while still overriding react-native for the web.
 *
 * There is a package in use called `react-native-web` that is used to override the react-native components for the web.
 *
 * It's not perfect because we're essentially mocking an entire operating system.
 *
 * In addition, I initially had a struggle bundling our components cleanly with react-native web (with vite), so I've setup a series
 * of alias overrides for every package that we use that has a react-native adjcaent dependency. This is not ideal,
 * and it's why some of the mobile components are not rendering properly in the live editor.
 *
 * What's happening now is we're funneling nearly any 'react-native' adjacent import to our "MobileOverrides.jsx" file.
 *
 * Because we're re-exporting the react-native-web components in the MobileOverrides file, we're effectively mocking
 * react-native with react-native-web that way. I would like to do it 'properly' with the build system though
 * instead of defaulting to a custom-spun file.
 *
 * There is a lot of documentation out there about how to get Vite to build react-native for the web using react-native web. There's even a plugin for it: https://www.npmjs.com/package/vite-plugin-react-native-web
 * The problem for us is some of our downstream deps like react-native-gensture-handler, react-native-reanimated, and react-native-svg are not compatible with react-native-web.
 *
 * So the second part of what we need to figure out is how to get Vite to build those secondary libraries in a way where we don't have to mock them out.
 *
 * Obviously the storybook side will give you some clues, but the big differences there is building with webpack and not vite. Webpack is built for compatiblity while Vite is a lot more strict.
 *
 *
 *  So yeah, flow right now is (for react-native)
 *
 *  Ask this bundle for 'react-native' -> MobileOverrides.jsx -> export react-native-web -> use "react-native" in the live editor.
 *
 *
 *  And for the other libraries:
 *
 *  Ask this bundle for 'react-native-gesture-handler' -> MobileOverrides.jsx -> export custom mock -> use "react-native-gesture-handler" in the live editor.
 *  Ask this bundle for 'react-native-reanimated' -> MobileOverrides.jsx -> export custom mock -> use "react-native-reanimated" in the live editor.
 *
 * The first part is good and what we want (essentially, I would prefer if we swapped/reworte/aliased in this build file versus the override file).
 * It's the second part we need to not do if we can avoid it. I want to load those "other" libraries in a way that doesn't require a custom mock.
 *
 */

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
