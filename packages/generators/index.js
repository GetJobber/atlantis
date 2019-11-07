/* eslint-env node */

module.exports = function(plop, config) {
  // create your generators here
  const { basePath } = Object.assign(
    {
      basePath: "packages/components/src",
    },
    config || {},
  );

  plop.setGenerator("component", {
    description: "Generate a component.",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Component Name:",
      },
      {
        type: "input",
        name: "path",
        message: "Component Path:",
        transformer: input => `./${basePath}/${input}`,
        filter: input => `./${basePath}/${input}`,
      },
    ],
    actions: [
      {
        type: "addMany",
        destination: `{{path}}/{{name}}/`,
        base: "templates/component",
        templateFiles: "templates/component/*",
      },
    ],
  });
};
