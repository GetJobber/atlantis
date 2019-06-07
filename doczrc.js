/* eslint-env node */
import path from "path";
// eslint-disable-next-line import/no-extraneous-dependencies
import { css } from "styled-components";
// eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-extraneous-dependencies
const { WatchIgnorePlugin } = require("webpack");

const modifyBundlerConfig = config => {
  config.resolve.alias = Object.assign({}, config.resolve.alias, {
    "@jobber/components": path.resolve(__dirname, "packages/components/src"),
    "@jobber/docx": path.resolve(__dirname, "packages/docx/src"),
    "@jobber/colors": path.resolve(__dirname, "packages/colors/src"),
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
      {
        loader: require.resolve("postcss-loader"),
        options: {
          modules: true,
          plugins: [
            require("postcss-preset-env")({
              preserve: true,
              importFrom: [require.resolve("@jobber/colors")],
            }),
          ],
        },
      },
    ],
  });

  return config;
};

const fonts = {
  // Used for headings larger than 20px.
  display: '"Poppins", sans-serif',
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
    h1: css`
      margin: 40px 0 20px;
      font-family: ${fonts.display};
      font-size: 48px;
      font-weight: 800;
      letter-spacing: -0.02em;
      text-transform: uppercase;
    `,
    h2: css`
      margin: 30px 0 20px;
      line-height: 1.4em;
      font-family: ${fonts.display};
      font-weight: 600;
      font-size: 28px;
      letter-spacing: -0.02em;
      text-transform: uppercase;
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
          "https://fonts.googleapis.com/css?family=Poppins:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i",
      },
      {
        rel: "stylesheet",
        href: "/public/colors.css",
      },
    ],
  },
};

// eslint-disable-next-line import/no-default-export
export default {
  title: "🔱 Atlantis",
  typescript: true,
  port: 3333,
  menu: ["Atlantis"],
  files: "{README.md,**/*.mdx}",
  ignore: ["./plop/templates/**/*"],
  codeSandbox: false,
  public: "public",
  hashRouter: true,
  themeConfig,
  htmlContext,
  modifyBundlerConfig,
};
