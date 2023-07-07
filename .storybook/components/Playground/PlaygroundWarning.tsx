import React, { useEffect } from "react";
import { useSandpack } from "@codesandbox/sandpack-react";
import dedent from "ts-dedent";

export function PlaygroundWarning() {
  const { sandpack } = useSandpack();
  const { error } = sandpack;

  useEffect(() => {
    console.log(error);
  }, [error]);

  if (error?.title === "ModuleNotFoundError") {
    return (
      <div className="localDevNotice">
        <h2>Well, that didn&apos;t work</h2>
        <p>
          <b>If the error within the preview isn&apos;t helpful</b>, there are
          also other reasons why this would fail.
        </p>

        <p>1. You&apos;re creating a new component</p>
        <p>
          Unfortunately, code sandbox doesn&apos;t support new components as it
          relies on the production build of the components package. You can help
          us support this and open a PR for Atlantis.
        </p>

        <p>2. Auto imports are wrong</p>
        <p>
          You can override the auto-import by adding your own
          <code>code.imports</code> parameter on the storybook meta tag.
        </p>

        <pre>
          {dedent`export default {
            title: ...,
            component: ...,
            parameters: {
              ...,
              code: {
                imports: 'import { Component } from "@jobber/components/MyComponent";'
              },
            },
          } as ComponentMeta<>;`}
        </pre>
      </div>
    );
  }

  return <></>;
}
