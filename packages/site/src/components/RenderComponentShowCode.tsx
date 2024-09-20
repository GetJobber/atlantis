import { Box, Button, Card } from "@jobber/components";
import reactElementToJSXString from "react-element-to-jsx-string";
import { Children, PropsWithChildren, useEffect, useState } from "react";
import prism from "prismjs";

export const RenderComponentShowCode = ({ children }: PropsWithChildren) => {
  const [codeVisible, setCodeVisible] = useState(false);

  const showCode = () => {
    setCodeVisible(!codeVisible);
  };
  const code = Children.map(children, child => {
    return reactElementToJSXString(child);
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
        <Box background="base-blue--800" padding={"small"} radius="base">
          <pre>
            <code className="language-javascript">{code}</code>
          </pre>
        </Box>
      )}
    </Card>
  );
};
