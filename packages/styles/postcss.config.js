const path = require('path');
const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
  modules: true,
  plugins: [
    postcssPresetEnv({
      preserve: true,
      exportTo: path.join(__dirname, 'lib', "custom-properties.js"),
      features: {
        'custom-properties': true,
      },
    })
  ]
};
