import React from "react";
import { Story, useStorybookApi, useStorybookState } from "@storybook/api";
import {
  SandpackCodeEditor,
  SandpackPreview,
  SandpackProvider,
} from "@codesandbox/sandpack-react";
import { Args } from "@storybook/addons";
import dedent from "dedent";
import "./Playground.css";

export function Playground() {
  const sbState = useStorybookState();
  const sbAPI = useStorybookApi();
  const activeStory = sbAPI.getCurrentStoryData() as Story;

  if (!activeStory) return <></>;

  console.log("sbState", sbState);
  console.log("activeStory", activeStory);

  const importsString = getImportStrings(activeStory);
  const canPreview = Boolean(importsString);

  return (
    <SandpackProvider
      template="react-ts"
      customSetup={{
        dependencies: {
          "@jobber/components": "latest",
        },
      }}
      options={{
        visibleFiles: ["/Example.tsx"],
        activeFile: "/Example.tsx",
      }}
      theme="dark"
      files={{
        "/App.tsx": getAppJsCode(),
        "/Example.tsx": getExampleJsCode(),
      }}
    >
      {canPreview && <SandpackPreview />}
      <SandpackCodeEditor
        showLineNumbers={true}
        showInlineErrors={true}
        readOnly={!canPreview}
      />
    </SandpackProvider>
  );

  function getExampleJsCode(): string {
    const exampleComponent = dedent`
      export function Example() {
        return ${getSourceCode(activeStory)}
      }`;
    return [getImportStrings(activeStory), exampleComponent]
      .filter(Boolean)
      .join("\n\n");
  }
}

function getImportStrings(story: Story): string {
  const parameters = story?.parameters;

  if (parameters && "storySource" in parameters) {
    const matchingComponents: string[] =
      // get components wrapped in < > but not </ >
      parameters.storySource.source?.match(/<[^/](.*?)>/gm);

    const componentNames = matchingComponents
      // replace: remove < and >
      // split: get the first word which is the component name
      ?.map(component => component.replace(/<|>/g, "").split(" ")[0])
      // Remove duplicates
      .filter((component, index, self) => self.indexOf(component) === index)
      // Only get components that start with a capital letter. This removes the HTML tags.
      .filter(component => /[A-Z]/.test(component[0]));

    if (componentNames) {
      return componentNames
        .map(
          component =>
            `import { ${component} } from "@jobber/components/${component}";`,
        )
        .join("\n");
    }
  }

  return "";
}

function getSourceCode(story: Story) {
  const parameters = story?.parameters;

  if (parameters && "storySource" in parameters) {
    const rawSourceCode = parameters.storySource.source;
    const sourceCodeArr = RegExp("<((.*|\\n)*)>", "m").exec(rawSourceCode);
    const { attributes, args } = getAttributeProps(story);

    return sourceCodeArr?.[0]
      .replace(" {...args}", attributes)
      .replace("{args.children}", args?.children);
  }
}

function getAttributeProps(story: Story) {
  let args: Args | undefined;
  let attributes = "";

  if ("args" in story && story.args) {
    args = story.args;
    const argsKeys = Object.keys(args);

    attributes = argsKeys.reduce((currentArgs, arg) => {
      if (arg === "children") return currentArgs;
      const rawArgValue = args?.[arg];
      const argValue = getArgs(rawArgValue);
      return [currentArgs, ` ${arg}=${argValue}`].join("");
    }, "");
  }

  return { attributes, args };
}

function getArgs(args: unknown) {
  if (typeof args === "string") {
    return `"${args}"`;
  }

  if (typeof args === "object") {
    return `{${JSON.stringify(args)}}`;
  }

  return `{${args}}`;
}

function getAppJsCode(): string {
  return dedent`
    import "@jobber/design/foundation.css";
    import { Example } from "./Example";

    export default function App() {
      return <Example />
    }`;
}
