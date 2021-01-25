/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * Lerna has an open issue to support header customization for changelogs.
 * Until that is closed we can use the `version` lifecycle hook and this to
 * accomplish the same result.
 *
 * https://github.com/lerna/lerna/issues/2272
 */

const path = require("path");
const fs = require("fs");
const glob = require("glob");
const startCase = require("lodash/startCase");

glob.sync(path.join("packages/*/CHANGELOG.md")).forEach(file => {
  const changelog = String(fs.readFileSync(file));
  if (changelog.startsWith("---")) return;

  const directoryPath = path.dirname(file);
  const directoryName = path.basename(directoryPath);
  const packageName = require(`../${directoryPath}/package.json`).name;

  console.log(`Fixing header on: ${file}`);

  const header = `
---
name: ${startCase(directoryName)}
menu: Changelog
---
# ${packageName}: Change Log
  `.trim();

  fs.writeFileSync(file, changelog.replace("# Change Log", header));
});
