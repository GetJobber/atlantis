/* eslint-env node */
import path from "path";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { WatchIgnorePlugin } = require("webpack");
import { css } from "styled-components";

const modifyBundlerConfig = config => {
  config.resolve.alias = Object.assign({}, config.resolve.alias, {
    "@jobber/components": path.resolve(__dirname, "packages/components/src"),
  });

  config.plugins.push(new WatchIgnorePlugin([/css\.d\.ts$/]));

  config.module.rules.push({
    enforce: "pre",
    test: /\.css$/,
    exclude: /node_modules/,
    loader: require.resolve("typed-css-modules-loader"),
  });

  config.module.rules.push({
    test: /\.css$/,
    use: [
      require.resolve("style-loader"),
      {
        loader: require.resolve("css-loader"),
        options: {
          modules: true,
          importLoaders: 1,
          localIdentName: "[name]__[local]--[hash:base64:5]",
        },
      },
      { loader: require.resolve("postcss-loader") },
    ],
  });

  return config;
};

const fonts = {
  // Used for headings larger than 20px.
  display: '"Orbitron", sans-serif',
  // Used for code and sometimes numbers in tables.
  mono: '"Anonymous Pro", monospace',
  // Used for text and UI (which includes almost anything).
  ui: '"Noto Sans", sans-serif',
};

const themeConfig = {
  showPlaygroundEditor: true,
  fonts,
  styles: {
    body: css`
      font-family: ${fonts.ui};
      font-size: 18px;
      line-height: 1.8;
    `,
  },
};

const htmlContext = {
  head: {
    links: [
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Noto+Sans:400,400i,700,700i",
      },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Anonymous+Pro:400,400i,700,700i",
      },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Orbitron:400,500,700,900",
      },
    ],
  },
};

export default {
  title: "🔱 Atlantis",
  typescript: true,
  port: 3333,
  menu: ["Atlantis"],
  themeConfig,
  htmlContext,
  modifyBundlerConfig,
};
