import React from "react";
import { useStorybookApi, useStorybookState } from "@storybook/api";
import {
  SandpackCodeEditor,
  SandpackPreview,
  SandpackProvider,
} from "@codesandbox/sandpack-react";

export function Playground() {
  const sbState = useStorybookState();
  const sbAPI = useStorybookApi();
  const activeStory = sbAPI.getCurrentStoryData();

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
        visibleFiles: ["./Example.js"],
        activeFile: "/Example.js",
      }}
      theme="dark"
      files={{
        "/App.js": `import "@jobber/design/foundation.css";
import { Example } from "./Example";\n
export default function App() {
  return <Example />
}`,
        "/Example.js": `import { Text } from "@jobber/components/Text";\n
export function Example() {
  return ${getSourceCode()}
}`,
      }}
    >
      <SandpackPreview />
      <SandpackCodeEditor />
    </SandpackProvider>
  );

  function getSourceCode() {
    const rawSourceCode = activeStory?.parameters?.storySource?.source;
    const sourceCodeArr = RegExp("<((.*|\\n)*)>", "m").exec(rawSourceCode);
    // eslint-disable-next-line no-new-func
    return sourceCodeArr?.[0]
      .replace(" {...args}", getAttributeProps())
      .replace("{args.children}", activeStory.args.children);
  }

  function getAttributeProps() {
    if ("args" in activeStory && activeStory.args) {
      const args = activeStory.args;
      const argsKeys = Object.keys(args);

      return argsKeys
        .reduce((currentArgs, arg) => {
          if (arg === "children") return currentArgs;
          return [currentArgs, ` ${arg}={${JSON.stringify(args[arg])}}`].join(
            "",
          );
        }, "")
        .trim();
    }
    return "";
  }
}
