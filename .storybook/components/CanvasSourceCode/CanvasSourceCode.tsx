import React from "react";
import { Description, DocsContext } from "@storybook/addon-docs";
import { AddonPanel } from "@storybook/components";
import { RenderOptions } from "@storybook/addons";
import { useStorybookApi, useStorybookState } from "@storybook/api";

export function CanvasSourceCode({ key, active = false }: RenderOptions) {
  const sbState = useStorybookState();
  const sbAPI = useStorybookApi();
  const activeStory = sbAPI.getCurrentStoryData();

  if (!activeStory) return <></>;

  const rawSourceCode = activeStory?.parameters?.storySource?.source;
  const sourceCode = rawSourceCode
    ?.replace("args => ", "")
    .replace("{...args}", getAttributeProps())
    .replace("{args.children}", activeStory.args.children);

  return (
    <AddonPanel key={key} active={active}>
      {activeStory && (
        <DocsContext.Provider
          value={{
            ...sbState,
            // @ts-expect-error bypass this for now
            storyById: () => activeStory,
          }}
        >
          <Description markdown={"```tsx\n\r" + sourceCode + "```"} />
        </DocsContext.Provider>
      )}
    </AddonPanel>
  );

  function getAttributeProps() {
    if ("args" in activeStory && activeStory.args) {
      const args = activeStory.args;
      const argsKeys = Object.keys(args);

      return argsKeys
        .reduce(
          (currentArgs, arg) => {
            if (arg === "children") return currentArgs;
            return [currentArgs, `${arg}={${JSON.stringify(args[arg])}} `].join("");
          },
          "",
        )
        .trim();
    }
    return "";
  }
}
