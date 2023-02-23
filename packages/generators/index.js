/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */

const { PathPrompt } = require("inquirer-path");

module.exports = function (plop, config) {
  const { basePath, templateGlob } = Object.assign(
    {
      basePath: "packages/components/src",
      templateGlob: "!(*.stories.*)",
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
      {
        type: "expand",
        name: "storybook",
        message: "Create Storybook mdx?",
        choices: [
          {
            key: "y",
            name: "Yes",
            value: "yes",
          },
          {
            key: "n",
            name: "No",
            value: "no",
          },
        ],
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
      answers => Object.assign(answers, { mdx: "mdx" }),
      {
        type: "addMany",
        destination: `{{path}}/{{name}}/`,
        base: "templates/component",
        templateFiles: `templates/component/${templateGlob}`,
      },
      {
        type: "addMany",
        destination: `{{path}}/{{name}}/`,
        base: "templates/component",
        templateFiles: `templates/component/*.stories.*`,
        skip(data) {
          if (data.storybook !== "yes") {
            return "Not adding storybook file";
          }
          return;
        },
      },
    ],
  });
};
