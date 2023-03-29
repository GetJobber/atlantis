module.exports = {
  source: "src",
  output: "lib",
  targets: [
    [
      "commonjs",
      {
        configFile: true,
      },
    ],
    [
      "module",
      {
        configFile: true,
      },
    ],
    [
      "typescript",
      {
        // For some reason bob couldn't find tsc so we have to tell it
        tsc: "./node_modules/typescript/bin/tsc",
      },
    ],
  ],
};
