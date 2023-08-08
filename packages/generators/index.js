/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */

const { PathPrompt } = require("inquirer-path");

module.exports = function (plop, config) {
  const { basePath, templateGlob } = Object.assign(
    {
      basePath: "packages/components/src",
      templateGlob: "*",
    },
    config || {},
  );

  // Add PathPrompt to Inquirer.js
  plop.setPrompt("path", PathPrompt);

  plop.setGenerator("component", {
    description: "Generate a component.",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Component Name:",
      },
      {
        type: "path",
        name: "path",
        message: "Component Path:",
        default: basePath,
        directoryOnly: true,
      },
    ],
    actions: [
      /**
       * Gatsby is insisting on at least opening every file ending in `.mdx`.
       * This allows us to name the template file {{name}}.{{mdx}} and have
       * plop rename it to Component.mdx when it runs.
       *
       * https://plopjs.com/documentation/#addmany
       */
      answers => Object.assign(answers, { mdx: "mdx", tsx: "tsx" }),
      {
        type: "addMany",
        destination: `docs/components/{{name}}/`,
        base: "templates/docs",
        templateFiles: `templates/docs/${templateGlob}`,
      },
      {
        type: "addMany",
        destination: `{{path}}/{{name}}/`,
        base: "templates/component",
        templateFiles: `templates/component/${templateGlob}`,
      },
    ],
  });
};
