/* eslint-env node */
import path from "path";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { WatchIgnorePlugin } = require("webpack");

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
        },
      },
      { loader: require.resolve("postcss-loader") },
    ],
  });

  return config;
};

export default {
  title: "Atlantis 🔱",
  typescript: true,
  port: 3333,
  modifyBundlerConfig,
};
