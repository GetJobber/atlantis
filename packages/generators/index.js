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
        type: "list",
        name: "type",
        message: "Generate for:",
        choices: [
          {
            name: "Web",
            value: "web",
          },
          {
            name: "React native",
            value: "native",
          },
          {
            name: "Both",
            value: "both",
          },
        ],
      },
      {
        type: "path",
        name: "path",
        message: "Component Path:",
        default: basePath,
        directoryOnly: true,
      },
    ],
    actions: answers => {
      Object.assign(answers, { mdx: "mdx", tsx: "tsx" });
      const actions = [];
      if (answers.type === "web") {
        actions.push({
          type: "addMany",
          destination: `{{path}}/{{name}}/`,
          base: "templates/component",
          templateFiles: `templates/component/${templateGlob}`,
        });
        actions.push({
          type: "addMany",
          destination: `docs/components/{{name}}/`,
          base: "templates/docs",
          templateFiles: `templates/docs/!Mobile*`,
        });
      } else if (answers.type === "native") {
        actions.push({
          type: "addMany",
          destination: `packages/components-native/src/{{name}}/`,
          base: "templates/component-native",
          templateFiles: `templates/component-native/${templateGlob}`,
        });
        actions.push({
          type: "addMany",
          destination: `docs/components/{{name}}/`,
          base: "templates/docs",
          templateFiles: `templates/docs/!Web*`,
        });
      } else {
        actions.push(
          ...[
            {
              type: "addMany",
              destination: `{{path}}/{{name}}/`,
              base: "templates/component",
              templateFiles: `templates/component/${templateGlob}`,
            },
            {
              type: "addMany",
              destination: `packages/components/src/{{name}}/`,
              base: "templates/component-native",
              templateFiles: `templates/component-native/${templateGlob}`,
            },
            {
              type: "addMany",
              destination: `docs/components/{{name}}/`,
              base: "templates/docs",
              templateFiles: `templates/docs/${templateGlob}`,
            },
          ],
        );
      }

      return actions;
    },
  });
};

// actions: [
//       /**
//        * Gatsby is insisting on at least opening every file ending in `.mdx`.
//        * This allows us to name the template file {{name}}.{{mdx}} and have
//        * plop rename it to Component.mdx when it runs.
//        *
//        * https://plopjs.com/documentation/#addmany
//        */
//       answers => Object.assign(answers, { mdx: "mdx", tsx: "tsx" }),
//       answers => {
//         const actions = [];
//         if (answers.type === "web") {
//           console.log("alo??");
//           actions.push({
//             type: "addMany",
//             destination: `{{path}}/{{name}}/`,
//             base: "templates/component",
//             templateFiles: `templates/component/${templateGlob}`,
//           });
//         } else if (answers.type === "native") {
//           actions.push({
//             type: "addMany",
//             destination: `packages/components/src/{{name}}/`,
//             base: "templates/component-native",
//             templateFiles: `templates/component-native/${templateGlob}`,
//           });
//         } else {
//           actions.push(
//             ...[
//               {
//                 type: "addMany",
//                 destination: `{{path}}/{{name}}/`,
//                 base: "templates/component",
//                 templateFiles: `templates/component/${templateGlob}`,
//               },
//               {
//                 type: "addMany",
//                 destination: `packages/components/src/{{name}}/`,
//                 base: "templates/component-native",
//                 templateFiles: `templates/component-native/${templateGlob}`,
//               },
//             ],
//           );
//         }

//         actions.push({
//           type: "addMany",
//           destination: `docs/components/{{name}}/`,
//           base: "templates/docs",
//           templateFiles: `templates/docs/${templateGlob}`,
//         });

//         return actions;
//       },
//     ],
