import { RefObject, useCallback, useState } from "react";
import { transform } from "@babel/standalone";
import { type Theme } from "@jobber/components";
import { useAtlantisPreviewSkeleton } from "./useAtlantisPreviewSkeleton";

export const useAtlantisPreviewCode = ({
  iframe,
  iframeMobile,
  theme,
  type,
}: {
  iframe: RefObject<HTMLIFrameElement | null>;
  iframeMobile: RefObject<HTMLIFrameElement | null>;
  type: "web" | "mobile";
  theme: Theme;
}) => {
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { writeCodeToIFrame } = useAtlantisPreviewSkeleton(type);

  const updateCode = useCallback(
    (codeUp: string, forceUpdate?: boolean) => {
      // Since we can update our code from the editor or from page updates (clicking tabs)
      // We need a mechanism above to check for loops
      if (codeUp === code && !forceUpdate) {
        return;
      }
      setCode(codeUp);

      try {
        // If the provided code does not include a return statement, we have to provide one.
        const preCode = !codeUp.includes("return ")
          ? `return ${codeUp}`
          : codeUp;

        // Take the code, wrap it in a function named "App" which will be picked up within the iframe.
        // Transpile the code with Babel to be able to run it in the iframe.
        const transpiledCode = transform(`function App(props){${preCode}}`, {
          presets: [["env", { modules: false }], "react"],
          plugins: [
            ["transform-typescript", { isTSX: true, allExtensions: false }],
          ],
        }).code;

        // Clear the error state
        setError("");

        // Determine which iframe to use (this is a weak point for expansion, we only suport two iframes now)
        const selectedFrame = type == "web" ? iframe : iframeMobile;

        const html =
          selectedFrame.current?.contentDocument?.documentElement.outerHTML;

        writeCodeToIFrame(html, selectedFrame, theme, transpiledCode);
      } catch (e) {
        setError((e as { message: string }).message as string);
      }
    },
    [iframe, iframeMobile, theme, type],
  );

  return { updateCode, code, error };
};
