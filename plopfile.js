/* eslint-env node */

module.exports = function(plop) {
  // create your generators here
  plop.setGenerator("component", {
    description: "Generate a component.",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Component Name:",
      },
    ],
    actions: [
      {
        type: "addMany",
        destination: "packages/components/src/{{name}}/",
        base: "plop/templates/component",
        templateFiles: "plop/templates/component/*",
      },
    ],
  });
};
