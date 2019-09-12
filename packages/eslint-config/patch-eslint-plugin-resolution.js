/* eslint-env node */
/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * There is a decent amount of discussion around having ESLint properly search
 * the module resolution paths for plugins like TSLint does. This makes
 * managing shared config a lot easier as we can specify plugins and their
 * versions in a centralized place.
 *
 * https://github.com/eslint/eslint/issues/3458#issuecomment-516666620
 *
 * As per this patch this enables that behavior.
 * https://github.com/eslint/eslint/issues/3458#issuecomment-516716165
 *
 * We should track this issue though and remove this patch once the discussion
 * resolves and a solution is ready.
 */

const path = require("path");

let currentModule = module;
while (
  !/[\\/]eslint[\\/]lib[\\/]cli-engine[\\/]config-array-factory\.js/i.test(
    currentModule.filename,
  )
) {
  if (!currentModule.parent) {
    // This was tested with ESLint 6.1.0; other versions may not work
    throw new Error(
      "Failed to patch ESLint because the calling module was not recognized",
    );
  }
  currentModule = currentModule.parent;
}
const eslintFolder = path.join(path.dirname(currentModule.filename), "../..");

const configArrayFactoryPath = path.join(
  eslintFolder,
  "lib/cli-engine/config-array-factory",
);
const configArrayFactoryModule = require(configArrayFactoryPath);

const moduleResolverPath = path.join(
  eslintFolder,
  "lib/shared/relative-module-resolver",
);
const ModuleResolver = require(moduleResolverPath);

const originalLoadPlugin =
  configArrayFactoryModule.ConfigArrayFactory.prototype._loadPlugin;
configArrayFactoryModule.ConfigArrayFactory.prototype._loadPlugin = function(
  name,
  importerPath,
  importerName,
) {
  const originalResolve = ModuleResolver.resolve;
  try {
    ModuleResolver.resolve = function(moduleName, relativeToPath) {
      // resolve using importerPath instead of relativeToPath
      return originalResolve.call(this, moduleName, importerPath);
    };
    return originalLoadPlugin.apply(this, arguments);
  } finally {
    ModuleResolver.resolve = originalResolve;
  }
};
