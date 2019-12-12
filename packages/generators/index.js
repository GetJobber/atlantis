/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */

const { PathPrompt } = require("inquirer-path");

module.exports = function(plop, config) {
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
      {
        type: "addMany",
        destination: `{{path}}/{{name}}/`,
        base: "templates/component",
        templateFiles: `templates/component/${templateGlob}`,
      },
    ],
  });
};
