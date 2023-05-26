import React, { useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import {
  FileTabs,
  SandpackStack,
  useActiveCode,
  useSandpack,
} from "@codesandbox/sandpack-react";

export function PlaygroundEditor() {
  const { code, updateCode } = useActiveCode();
  const { sandpack } = useSandpack();
  const valueGetter = useRef<() => string>();

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      const value = valueGetter.current?.();
      console.log(value);
      updateCode(value || code);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <SandpackStack style={{ height: "100vh", margin: 0 }}>
      <FileTabs />
      <div style={{ flex: 1, paddingTop: 8, background: "#1e1e1e" }}>
        <Editor
          width="100%"
          height="100%"
          language="javascript"
          theme="vs-dark"
          key={sandpack.activeFile}
          value={code}
          editorDidMount={getVal => {
            valueGetter.current = getVal;
          }}
        />
      </div>
    </SandpackStack>
  );
}
