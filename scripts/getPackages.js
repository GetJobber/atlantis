/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const glob = require("glob");

function getAllPackages() {
  /**
   * Define some root directories for us to work with
   */
  const atlantis = process.cwd();
  const packages = `${atlantis}/packages`;

  /**
   * Get a list of all of our package.json files within the
   * packages directory.
   */
  const packageJsons = glob.sync(`${packages}/**/package.json`, {
    ignore: [`${atlantis}/**/node_modules/**`],
  });

  return packageJsons;
}

function getAllPublicPackages() {
  /**
   * Get a list of all of our package.json files within the
   * packages directory and then remove any that are private.
   */
  const packages = getAllPackages();
  const publicPackages = packages.filter(file => {
    const { private } = require(file);
    return !private;
  });

  return publicPackages;
}

module.exports = {
  getAllPackages,
  getAllPublicPackages,
};
