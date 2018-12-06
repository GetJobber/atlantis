const path = require('path');
const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
  modules: true,
  plugins: [
    postcssPresetEnv({
      preserve: true,
      exportTo: path.join(__dirname, "custom-properties.js"),
      importFrom: [
        require.resolve("./custom-properties.css")
      ],
      features: {
        'custom-properties': true,
      },
    })
  ]
};
