import React from "react";
import { Story, useStorybookApi, useStorybookState } from "@storybook/api";
import {
  SandpackCodeEditor,
  SandpackPreview,
  SandpackProvider,
} from "@codesandbox/sandpack-react";
import { Args } from "@storybook/addons";

export function Playground() {
  const sbState = useStorybookState();
  const sbAPI = useStorybookApi();
  const activeStory = sbAPI.getCurrentStoryData() as Story;

  if (!activeStory) return <></>;

  console.log("sbState", sbState);
  console.log("activeStory", activeStory);

  return (
    <SandpackProvider
      template="react"
      customSetup={{
        dependencies: {
          "@jobber/components": "*",
        },
      }}
      options={{
        wrapContent: true,
        visibleFiles: ["/Example.js"],
        activeFile: "/Example.js",
      }}
      theme="dark"
      files={{
        "/App.js": getAppJsCode(),
        "/Example.js": getExampleJsCode(),
      }}
    >
      <SandpackPreview />
      <SandpackCodeEditor />
    </SandpackProvider>
  );

  function getExampleJsCode(): string {
    return `${activeStory.parameters?.playground?.imports}

export function Example() {
  return ${getSourceCode(activeStory)}
}`;
  }
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
      return [currentArgs, ` ${arg}={${JSON.stringify(args[arg])}}`].join("");
    }, "");
  }

  return { attributes, args };
}

function getAppJsCode(): string {
  return `import "@jobber/design/foundation.css";
import { Example } from "./Example";

export default function App() {
  return <Example />
}`;
}
