import { Box, Button, Card } from "@jobber/components";
import reactElementToJSXString from "react-element-to-jsx-string";
import { Children, PropsWithChildren, useEffect, useState } from "react";
import prism from "prismjs";
import "./RenderComponentShowCode.css";

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
            bottom: "var(--space-base)",
            right: "var(--space-base)",
          }}
        >
          <Button type="secondary" label="Show code" onClick={showCode} />
        </div>
      </Box>
      {codeVisible && (
        <Box background="base-blue--700" padding={"small"}>
          <pre>
            <code className="language-javascript">{code}</code>
          </pre>
        </Box>
      )}
    </Card>
  );
};
