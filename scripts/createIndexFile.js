/**
 * There are times in Atlantis where we need to create our entry points
 * programatically. One example of this is the `@jobber/hooks` package.
 * In the hooks package, we programatically want to create the entry point
 * to prevent contributors forgetting to export their newly created hooks.
 */

/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");

const params = process.argv.slice(2);

if (params.length > 1) {
  throw Error(
    "Enter only the direcory that you want to create an entry point for.",
  );
}

const target = params[0];

function createIndexFile(dir) {
  const stat = fs.lstatSync(path.join(process.cwd(), dir));

  if (!stat.isDirectory()) {
    throw Error("The path that you have entered is not a valid directory");
  }

  /**
   * Return only the name of the child directories
   */
  const dirs = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  if (!dirs) {
    return;
  }

  /**
   * Create a string that will be used as the content of the index file
   */
  let contents = ``;
  dirs.forEach(directory => {
    contents += `export * from "./${directory}";
`;
  });

  /**
   * Re-write the index file based on the contents above
   */
  fs.writeFileSync(path.join(dir, "index.ts"), contents);
}

createIndexFile(target);
