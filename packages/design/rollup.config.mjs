import typescript from '@rollup/plugin-typescript';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs'; // Import the plugin
import pluginjson from '@rollup/plugin-json'; // Import the plugin

export default {
  input: 'src/index.ts', // Your entry point
  output: [
    {
      file: 'dist/index.mjs', // ES module format
      format: 'es', // ES module format
    },
  ],
  plugins: [
    nodeResolve(), // Resolves node modules
    commonjs(), // Use the plugin
    pluginjson(),
    typescript(), // Compiles TypeScript
  ],
};
