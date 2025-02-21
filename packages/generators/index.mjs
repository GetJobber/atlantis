/* eslint-env node */
/* eslint-disable import/no-default-export */

import { PathPrompt } from "inquirer-path";

export default (plop, config) => {
  // Merge the config with the default values
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
      const buildSiteContentIndex = () => ({
        type: "addMany",
        destination: `packages/site/src/content/{{name}}/`,
        base: "templates/site",
        templateFiles: "templates/site/**/*",
      });

      if (answers.type === "web") {
        actions.push(
          {
            type: "addMany",
            destination: `{{path}}/{{name}}/`,
            base: "templates/component",
            templateFiles: `templates/component/${templateGlob}`,
          },
          {
            type: "addMany",
            destination: `docs/components/{{name}}/`,
            base: "templates/docs",
            templateFiles: `templates/docs/!(Mobile)*`,
          },
          buildSiteContentIndex(),
          webReminder,
        );
      } else if (answers.type === "native") {
        actions.push(
          {
            type: "addMany",
            destination: `packages/components-native/src/{{name}}/`,
            base: "templates/component-native",
            templateFiles: `templates/component-native/${templateGlob}`,
          },
          {
            type: "addMany",
            destination: `docs/components/{{name}}/`,
            base: "templates/docs",
            templateFiles: `templates/docs/!(Web)*`,
          },
          buildSiteContentIndex(),
          mobileReminder,
        );
      } else {
        actions.push(
          {
            type: "addMany",
            destination: `{{path}}/{{name}}/`,
            base: "templates/component",
            templateFiles: `templates/component/${templateGlob}`,
          },
          {
            type: "addMany",
            destination: `packages/components-native/src/{{name}}/`,
            base: "templates/component-native",
            templateFiles: `templates/component-native/${templateGlob}`,
          },
          {
            type: "addMany",
            destination: `docs/components/{{name}}/`,
            base: "templates/docs",
            templateFiles: `templates/docs/${templateGlob}`,
          },
          buildSiteContentIndex(),
          webReminder,
          mobileReminder,
        );
      }

      return actions;
    },
  });
};

function mobileReminder() {
  return "🎉 Mobile Component created!. Remember to add the new component's export to packages/components-native/src/index.ts";
}

function webReminder() {
  return "🎉 Web Component created!. Remember to add the new component's export to packages/components/src/index.tsx";
}
