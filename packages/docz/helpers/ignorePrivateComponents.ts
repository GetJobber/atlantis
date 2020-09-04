/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-env node */
const path = require("path");
const glob = require("glob");

/**
 * Return an array of private components to hide from the user.
 *
 * Atlantis contains some private components. These are indicated by an
 * empty `.private` file in the component's directory.
 *
 * @return {string[]} Private components.
 */
export function privateComponentReadmes() {
  // If specified at run time show documentation for privates components.
  if (process.env.PRIVATE_COMPONENTS === "visible") {
    return [];
  }

  // Ensure we're on atlantis root. Gatsby can also execute this file
  // from within the build directory.
  const atlantisPath = __dirname.replace(/\/\.docz$/, "");

  return glob
    .sync(path.join(atlantisPath, "..", "..", "/components/src/**/.private"))
    .map(file => {
      const directory = path.dirname(file);
      const componentName = path.basename(directory);

      return (
        path
          // Construct the absolute path to ignored component.
          .join(directory, `${componentName}.mdx`)
          // Convert to relative path.
          .slice(atlantisPath.length + 1)
      );
    });
}
