// eslint-disable-next-line import/no-internal-modules
require("@rushstack/eslint-patch/modern-module-resolution");

// Register our custom plugin
const Module = require("module");
const path = require("path");

const originalResolveFilename = Module._resolveFilename;

Module._resolveFilename = function (request, parent, isMain, options) {
  if (request === "eslint-plugin-jobber") {
    return path.resolve(__dirname, "eslint-plugin-jobber.js");
  }

  return originalResolveFilename.call(this, request, parent, isMain, options);
};
