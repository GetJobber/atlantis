import process from "process";
import React, { useEffect } from "react";
import { Story, useStorybookApi } from "@storybook/api";
import {
  SandpackCodeEditor,
  SandpackPreview,
  SandpackProvider,
} from "@codesandbox/sandpack-react";
import dedent from "ts-dedent";
import "./Playground.css";
import { STORY_CHANGED } from "@storybook/core-events";
import { PlaygroundWarning } from "./PlaygroundWarning";
import { PlaygroundImports } from "./types";
import { THIRD_PARTY_PACKAGE_VERSIONS } from "./constants";
import { formatCode } from "./utils";

export function Playground() {
  const { getCurrentStoryData, emit } = useStorybookApi();
  const activeStory = getCurrentStoryData() as Story | undefined;

  useEffect(() => {
    // Emit story changed so GA can track it as a page change. This mimics the
    // default behaviour of Canvas and Docs tab.
    emit(STORY_CHANGED);
  }, []);

  if (!activeStory) {
    return <></>;
  }

  const { isComponentStory, importsString, extraDependencies, canPreview } =
    getPlaygroundInfo(activeStory);

  if (!isComponentStory) {
    return <div className="codeUnavailable" data-testid="code-unavailable" />;
  }

  const { parameters, args } = activeStory;

  return (
    <SandpackProvider
      template="react-ts"
      customSetup={{
        dependencies: {
          "@jobber/components": "latest",
          "@jobber/hooks": "latest",
          "@apollo/client": "^3.0.0",
          graphql: "^15.8.0",
          ...extraDependencies,
        },
      }}
      options={{
        visibleFiles: ["/Example.tsx"],
        activeFile: "/Example.tsx",
      }}
      theme={canPreview ? "dark" : "light"}
      files={{
        "/App.tsx": getAppJsCode(),
        "/Example.tsx": getExampleJsCode(),
      }}
    >
      {canPreview && (
        <div className="sandbox">
          <SandpackPreview />
          {process.env.NODE_ENV !== "production" && <PlaygroundWarning />}
        </div>
      )}
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
        ${getSourceCode(args, parameters)}
      }
    `;

    return formatCode(
      [importsString, exampleComponent].filter(Boolean).join("\n\n"),
    );
  }
}

function getPlaygroundInfo({ parameters, type, title }: Story) {
  const isComponentsNative = title.includes("/Mobile");
  const importsString = getImportStrings(parameters, isComponentsNative);

  return {
    isComponentsNative,
    importsString,
    isComponentStory: type === "story" && title.startsWith("Components/"),
    extraDependencies: getExtraDependencies(parameters),
    canPreview: Boolean(importsString) && !isComponentsNative,
  };
}

function getSourceCode(
  args: Story["args"],
  parameters: Story["parameters"],
): string | undefined {
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
    const { attributes } = getAttributeProps(args);

    if (sourceCode) {
      Array.from(sourceCode.matchAll(/args\.(\w+)/g)).forEach(match => {
        sourceCode = sourceCode?.replace(
          match[0],
          getArgValue(args?.[match[1]]),
        );
      });

      return sourceCode
        ?.replace(new RegExp(" {...args}", "g"), attributes)
        .replace(new RegExp("(args)", "g"), getArgValue(args))
        .replace("{children}", args?.children);
    }
  }
}

function getImportStrings(
  parameters: Story["parameters"],
  isComponentsNative: boolean,
): string {
  const extraDependencyImports = getExtraDependencyImports(parameters);

  if (parameters && "storySource" in parameters) {
    const { componentNames, hookNames } = parseSourceStringForImports(
      parameters.storySource.source,
      extraDependencyImports.componentNames,
    );

    const componentImports = isComponentsNative
      ? [getSingleModuleImport("@jobber/components-native", componentNames)]
      : getComponentsImports(componentNames);

    return [
      getSingleModuleImport("react", hookNames),
      ...componentImports,
      extraDependencyImports.importString,
    ]
      .filter(Boolean)
      .join("\n");
  }

  return "";
}

function getComponentsImports(componentNames?: Array<string>) {
  if (componentNames) {
    return componentNames.map(
      name => `import { ${name} } from "@jobber/components/${name}";`,
    );
  }
  return [];
}

function getSingleModuleImport(
  moduleName = "react",
  hookNames?: Array<string> | null,
) {
  if (hookNames) {
    return `import { ${hookNames.join(", ")} } from "${moduleName}";`;
  }
  return;
}

function parseSourceStringForImports(source: string, extraImports: string[]) {
  // Grab the first word after <
  const matchingComponents = source?.match(/<(\w+)/gm);

  const componentNames = matchingComponents
    // replace: remove < and >
    // split: get the first word which is the component name
    ?.map(component => component.replace(/<|>/g, "").split(" ")[0])
    // Remove duplicates
    .filter((component, index, self) => self.indexOf(component) === index)
    // Only get components that start with a capital letter. This removes the HTML tags.
    .filter(component => /[A-Z]/.test(component[0]))
    // Filter out extra imports not in @jobber/components
    .filter(component => !extraImports.includes(component));

  // check to see if the source contains any react hooks
  const hookNameMatches = source?.match(
    /use[State|Effect|Ref|Memo|Callback]+/gm,
  );
  // deduplicate matches
  const hookNames = hookNameMatches?.filter((hook, index) => {
    return hookNameMatches.indexOf(hook) === index;
  });

  return { componentNames, hookNames };
}

function getAttributeProps(args: Story["args"]) {
  let attributes = "";

  if (args) {
    const argsKeys = Object.keys(args);

    attributes = argsKeys.reduce((currentArgs, arg) => {
      if (arg === "children") return currentArgs;

      const rawArgValue = args?.[arg];
      return [currentArgs, ` ${arg}={${getArgValue(rawArgValue)}}`].join("");
    }, "");
  }

  return { attributes };
}

function getArgValue(args: unknown): string {
  if (typeof args === "string") {
    // Escape quotes if they are already in the string. This prevents issues rendering those stories.
    return `"${args.replace(/"/g, '\\"')}"`;
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
      return [currentArgs, `${key}: ${getArgValue(rawArgValue)}`, ", "].join(
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

interface ExtraImports {
  importStrings: string[];
  componentNames: string[];
}

function getExtraDependencyImports(parameters: Story["parameters"]): {
  importString: string;
  componentNames: string[];
} {
  const extraImportsParameter: PlaygroundImports =
    parameters?.previewTabs?.code?.extraImports || {};
  const extraDependencyImports = Object.entries(
    extraImportsParameter,
  ).reduce<ExtraImports>(
    (previousValue, entry) => {
      const [key, value] = entry;

      const importedComponents: ExtraImports = value.reduce<ExtraImports>(
        (prev, component) => {
          if (typeof component === "string") {
            return {
              importStrings: [...prev.importStrings, component],
              componentNames: [...prev.componentNames, component],
            };
          } else {
            // Imported component has an alias
            const { alias, name } = component;
            return {
              importStrings: [...prev.importStrings, `${name} as ${alias}`],
              componentNames: [...prev.componentNames, alias],
            };
          }
        },
        { importStrings: [], componentNames: [] },
      );

      return {
        importStrings: [
          ...previousValue.importStrings,
          `import { ${importedComponents.importStrings.join(
            ", ",
          )} } from "${key}";`,
        ],
        componentNames: [
          ...previousValue.componentNames,
          ...importedComponents.componentNames,
        ],
      };
    },
    { importStrings: [], componentNames: [] },
  );
  return {
    importString: extraDependencyImports.importStrings.join("\n"),
    componentNames: extraDependencyImports.componentNames,
  };
}

function getExtraDependencies(
  parameters: Story["parameters"],
): Record<string, string> {
  const extraImportsParameter: PlaygroundImports =
    parameters?.previewTabs?.code.extraImports || {};

  const extraDeps = Object.keys(extraImportsParameter)?.reduce(
    (previousVal, key) => {
      // @jobber/components is already included
      if (key.match(/@jobber\/components/)) return previousVal;
      return { ...previousVal, [key]: THIRD_PARTY_PACKAGE_VERSIONS[key] };
    },
    {},
  );
  return extraDeps;
}
