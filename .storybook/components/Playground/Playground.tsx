import React from "react";
import { Story, useStorybookApi, useStorybookState } from "@storybook/api";
import {
  SandpackCodeEditor,
  SandpackPreview,
  SandpackProvider,
} from "@codesandbox/sandpack-react";
import { Args } from "@storybook/addons";
import dedent from "ts-dedent";
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
        ${getSourceCode(activeStory)}
      }
    `;

    return [importsString, exampleComponent].filter(Boolean).join("\n\n");
  }
}

function getSourceCode(story: Story) {
  const parameters = story?.parameters;

  if (parameters && "storySource" in parameters) {
    let sourceCode: string | undefined;

    const rawSourceCode = parameters.storySource.source;
    const isBracketFunction = rawSourceCode.startsWith("args => {");

    if (isBracketFunction) {
      // remove "args => " and the first and last bracket
      sourceCode = rawSourceCode.replace("args => ", "").slice(1, -1);
    } else {
      // find the first < and last >
      const sourceCodeArr = RegExp("<((.*|\\n)*)>", "m").exec(rawSourceCode);
      sourceCode = dedent`return ${sourceCodeArr?.[0]}`;
    }
    const { attributes, args } = getAttributeProps(story);

    return sourceCode
      ?.replace(new RegExp(" {...args}", "g"), attributes)
      .replace("{args.children}", args?.children)
      .replace("{children}", args?.children);
  }
}

function getImportStrings(story: Story): string {
  const parameters = story?.parameters;

  if (parameters && "storySource" in parameters) {
    const { componentNames, hookNames } = parseSourceStringForImports(
      parameters.storySource.source,
    );

    // Import components from @jobber/components
    const componentImports =
      componentNames?.map(component => {
        return `import { ${component} } from "@jobber/components/${component}";`;
      }) || [];

    // Import hooks from react
    const hooksImports =
      hookNames?.map(hook => {
        return `import { ${hook} } from "react";`;
      }) || [];

    return [...hooksImports, ...componentImports].join("\n");
  }

  return "";
}

function parseSourceStringForImports(source: string) {
  // Grab the first word after <
  const matchingComponents = source?.match(/<(\w+)/gm);

  const componentNames = matchingComponents
    // replace: remove < and >
    // split: get the first word which is the component name
    ?.map(component => component.replace(/<|>/g, "").split(" ")[0])
    // Remove duplicates
    .filter((component, index, self) => self.indexOf(component) === index)
    // Only get components that start with a capital letter. This removes the HTML tags.
    .filter(component => /[A-Z]/.test(component[0]));

  // check to see if the source contains any react hooks
  const hookNames = source?.match(/use[State|Effect|Ref]+/gm);

  return { componentNames, hookNames };
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
      return [currentArgs, ` ${arg}={${getArgValue(rawArgValue)}}`].join("");
    }, "");
  }

  return { attributes, args };
}

function getArgValue(args: unknown): string {
  if (typeof args === "string") {
    return `"${args}"`;
  }

  if (typeof args === "symbol") {
    return `"${args.toString()}"`;
  }

  if (Array.isArray(args)) {
    const newArgs = args.reduce((currentArgs, arg) => {
      return [currentArgs, getArgValue(arg), ", "].join("");
    }, "");
    return `[${newArgs}]`;
  }

  if (args && typeof args === "object") {
    const keys = Object.keys(args);
    const newArgs = keys.reduce((currentArgs, key) => {
      const rawArgValue = (args as Record<string, unknown>)?.[key];
      return [currentArgs, ` ${key}: ${getArgValue(rawArgValue)}`, ", "].join(
        "",
      );
    }, "");
    return `{${newArgs}}`;
  }

  return `${args}`;
}

function getAppJsCode(): string {
  return dedent`
    import "@jobber/design/foundation.css";
    import { Example } from "./Example";

    export default function App() {
      return <Example />
    }`;
}
