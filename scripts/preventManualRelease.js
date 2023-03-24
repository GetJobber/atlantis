/**
 * In Atlantis 🔱, we want to ensure that there are never any direct
 * version bumps to any of the @jobber packages. The reason being is
 * that if a version is manually bumped, lerna will have a stuggle to
 * try and figure out what the next proper version to release is.
 */

/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require("axios");
const glob = require("glob");
const chalk = require("chalk");

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

async function checkPackagesAgainstNpm() {
  /**
   * Get a list of all of our package.json files.
   */
  const packages = getAllPublicPackages();

  /**
   * Check that the the local versions match the registry versions.
   */
  for (const package of packages) {
    const { name, version } = require(package);

    await axios
      .get(`https://registry.npmjs.org/${name}`)
      .then(function ({ data }) {
        const { time } = data;
        const versions = Object.keys(time);

        if (versions.includes(version)) {
          console.log(
            chalk.green(`✅ ${name}@${version} is currently in npm registry`),
          );
        } else {
          console.log(
            chalk.red(
              `${name}@${version} was not found in the npm registry. Please check that you have not committed a new version to your branch`,
            ),
          );
          process.exit(1);
        }
      })
      .catch(error => {
        if (error.response.data.message) {
          console.log(chalk.red(error.response.data.message));
        } else {
          console.log(chalk.red("Something went wrong"));
        }
        process.exit(1);
      });
  }
}

async function checkForPreReleases() {
  /**
   * Get a list of all of our package.json files.
   */
  const packages = getAllPublicPackages();

  /**
   * Check packages for pre-releases.
   */
  for (const package of packages) {
    const { dependencies, devDependencies } = require(package);
    const allDependencies = { ...dependencies, ...devDependencies };

    for (const dependency in allDependencies) {
      /**
       * Check for all "@jobber/" packages
       */
      if (dependency.includes("@jobber/")) {
        /**
         * Check if the package name does not match the format of
         * either "N.N.N" or "^N.N.N" or "*"
         **/
        if (!/(^\^?\d+.\d+.\d+$|\*)/.test(allDependencies[dependency])) {
          console.log(
            chalk.red(
              `There seems to be a non-official release version of a Jobber npm package: ${package}@${packages[package]}`,
            ),
          );
          process.exit(1);
        }
      }
    }
  }

  console.log(
    chalk.green("✅ No pre-release versions found in @jobber packages"),
  );
}

async function preventManualReleases() {
  await checkForPreReleases();
  await checkPackagesAgainstNpm();
}

preventManualReleases();
