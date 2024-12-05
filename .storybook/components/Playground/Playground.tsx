import process from "process";
import React from "react";
import { type API as Story, useStorybookApi } from "@storybook/manager-api";
import {
  SandpackCodeEditor,
  SandpackPreview,
  SandpackProvider,
} from "@codesandbox/sandpack-react";
import dedent from "ts-dedent";
import "./Playground.css";
import { PlaygroundWarning } from "./PlaygroundWarning";
import { PlaygroundImports } from "./types";
import { THIRD_PARTY_PACKAGE_VERSIONS } from "./constants";
import { formatCode } from "./utils";

export function Playground() {
  const { getCurrentStoryData } = useStorybookApi();
  const activeStory = getCurrentStoryData() as Story | undefined;
  if (!activeStory) {
    return null;
  }

  const { isComponentStory, importsString, storySource, extraDependencies, canPreview } =
    getPlaygroundInfo(activeStory);

  if (!isComponentStory) {
    return <div className="codeUnavailable" data-testid="code-unavailable" />;
  }

  const { parameters } = activeStory;

  return (
    <SandpackProvider
      template="react-ts"
      customSetup={{
        dependencies: {
          "@jobber/components": "latest",
          "@jobber/design": "latest",
          "@jobber/hooks": "latest",
          "@apollo/client": "^3.0.0",
          graphql: "^15.8.0",
          ...extraDependencies,
        },
      }}
      options={{
        visibleFiles: ["/Example.tsx", ...(Object.keys(parameters?.previewTabs?.code?.files || {}))],
        activeFile: "/Example.tsx",
      }}
      theme={canPreview ? "dark" : "light"}
      files={{
        "/App.tsx": getAppJsCode(),
        "/Example.tsx": getExampleJsCode(),
        ...parameters?.previewTabs?.code?.files,
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
        ${storySource}
      }
    `;

    return formatCode(
      [importsString, exampleComponent].filter(Boolean).join("\n\n"),
    );
  }
}

function getPlaygroundInfo({ args, parameters, type, title, name }: Story) {
  const isComponentsNative = title.includes("/Mobile");
  const storySource = getSourceCode(name, args, parameters) || "";
  const importsString = getImportStrings(storySource, parameters, isComponentsNative);

  return {
    isComponentsNative,
    importsString,
    storySource,
    isComponentStory: type === "story" && title.startsWith("Components/") && storySource,
    extraDependencies: getExtraDependencies(parameters),
    canPreview: Boolean(importsString) && !isComponentsNative,
  };
}

function getSourceCode(
  storyName: string,
  args: Story["args"],
  parameters: Story["parameters"],
): string | undefined {
  const storyNameID = storyName.replaceAll(" ", "-").toLowerCase();
  const sourceLocation = parameters?.storySource?.locationsMap?.[storyNameID];
  const storySource = parameters?.storySource?.source;

  if (sourceLocation && storySource) {
    const allStoryLines = storySource.split("\n");

    let currentStorySource = allStoryLines
      .slice(sourceLocation.startBody.line-1, sourceLocation.endBody.line)
      .join("\n")
      .trim();

    // remove everything up until the return value
    currentStorySource = currentStorySource.replace(/.*= (args|\(\)) =>/g, "").trim();

    const isBracketFunction = currentStorySource.startsWith("{");
    if (isBracketFunction) {
      // remove the start/end brackets
      currentStorySource = currentStorySource.replace(/(^{|};?$)/g, "");
    } else {
      // find the first < and last >
      const sourceCodeArr = RegExp("<((.*|\\n)*)>", "m").exec(currentStorySource);
      currentStorySource = dedent`return ${sourceCodeArr?.[0]}`;
    }

    const { attributes } = getAttributeProps(args);

    if (currentStorySource) {
      Array.from(currentStorySource.matchAll(/args\.(\w+)/g)).forEach(match => {
        currentStorySource = currentStorySource?.replace(
          match[0],
          getArgValue(args?.[match[1]]),
        );
      });

      return currentStorySource
        ?.replace(new RegExp(" {...args}", "g"), attributes)
        .replace(new RegExp("(args)", "g"), getArgValue(args))
        .replace("{children}", args?.children);
    }
  }
}

function getImportStrings(
  storySource: string,
  parameters: Story["parameters"],
  isComponentsNative: boolean,
): string {
  const extraDependencyImports = getExtraDependencyImports(parameters);

  if (storySource) {
    const { componentNames, hookNames } = parseSourceStringForImports(
      storySource,
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
  // Grab the first word after "<" tag that starts with a capital letter (to avoid matching HTML tags)
  // only if there isn't a "use" or "type " in front of it (with the help of negative lookahead).
  // This is to avoid matching hook typings (e.g. `useState<SomeInterface>` or `useRef<HTMLDivElement>`)
  // as well as TS type definitions (e.g. `type SomeType<T> = { ... }`).
  const regex = /(?:\W)(?!use\w*|type\s*\w*)<([A-Z]\w+)/gm;
  const matchingComponents = source?.match(regex);

  const componentNames = matchingComponents
    // replace: remove < and >
    // split: get the first word which is the component name (at index 1)
    // The regex above return components with a space in front of them
    // (e.g. [' <MyComponent', ' <OtherComponent]). So we need to grab the 2nd element after split.
    // This is a workaround, since the negative lookbehind is not supported in Cloudflare's JS engine
    ?.map(component => component.replace(/<|>/g, "").split(" ")[1])
    // Remove duplicates
    .filter((component, index, self) => self.indexOf(component) === index)
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
    // Escape double quotes in args value so they don't cause issues when being passed to codesandbox
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
    import "@jobber/components/dist/styles.css";
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
