import { Box, Button, Card } from "@jobber/components";
import reactElementToJSXString from "react-element-to-jsx-string";
import { Children, PropsWithChildren, useEffect, useState } from "react";
import prism from "prismjs";

/**
 * This is a drop-in replacement for the <Canvas> component from Storybook. It renders the component as provided, and then shows the code for that component.
 * @param param0 {children:ReactNode}
 * @returns ReactNode
 */
export const RenderComponentShowCode = ({ children }: PropsWithChildren) => {
  const [codeVisible, setCodeVisible] = useState(false);

  const showCode = () => {
    setCodeVisible(!codeVisible);
  };
  const code = Children.map(children, child => {
    return reactElementToJSXString(child, {
      displayName: e => {
        if (e && typeof e === "object" && "type" in e) {
          if (typeof e.type === "function") {
            return (e.type.name || "Anonymous").replace(/[\d$]+/g, "");
          }
        }

        return "Anonymous";
      },
    });
  });
  useEffect(() => {
    prism.highlightAll();
  }, [code]);

  return (
    <Card>
      <Box padding={"largest"} direction="column" alignItems="start">
        {children}
        <div
          style={{
            position: "absolute",
            bottom: "0",
            right: "0",
          }}
        >
          <Button
            type="tertiary"
            size="small"
            variation="subtle"
            label={codeVisible ? "Hide Code" : "Show Code"}
            onClick={showCode}
          />
        </div>
      </Box>
      {codeVisible && (
        <pre>
          <code className="language-javascript">{code}</code>
        </pre>
      )}
    </Card>
  );
};
