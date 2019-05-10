const path = require("path");

module.exports = ({ config, mode }) => {
  // enable css modules
  const cssLoaders = config.module.rules.filter(({ test }) => test.toString() === /\.css$/.toString());
  cssLoaders[0].use[1].options = {
    modules: true,
    importLoaders: 1,
    localIdentName: "[name]__[local]--[hash:base64:5]",
  };

  // enable typescript
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve("babel-loader"),
        options: {
          presets: ["@babel/typescript"],
        },
      },
      require.resolve("react-docgen-typescript-loader"),
    ],
    include: path.resolve(__dirname, "../", "packages"),
    exclude: /node_modules/,
  });

  config.resolve.extensions.push('.ts', '.tsx');

  return config;
};
