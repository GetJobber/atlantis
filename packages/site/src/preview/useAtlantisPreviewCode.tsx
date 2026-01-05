import { RefObject, useCallback, useRef, useState } from "react";
import { transform } from "@babel/standalone";
import { type Theme } from "@jobber/components";
import { useAtlantisPreviewSkeleton } from "./useAtlantisPreviewSkeleton";
import { ComponentType } from "../types/content";

export const useAtlantisPreviewCode = ({
  iframe,
  iframeMobile,
  getIframeRef,
  theme,
  type,
}: {
  iframe: RefObject<HTMLIFrameElement | null>;
  iframeMobile: RefObject<HTMLIFrameElement | null>;
  getIframeRef: (type: ComponentType) => RefObject<HTMLIFrameElement | null>;
  type: ComponentType;
  theme: Theme;
}) => {
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { writeCodeToIFrame } = useAtlantisPreviewSkeleton(type);
  const lastSignature = useRef<string>("");

  const updateCode = useCallback(
    (codeUp: string, forceUpdate?: boolean) => {
      // Skip redundant updates when both the code and the active preview type are unchanged.
      const signature = `${type}:${codeUp}`;
      if (!forceUpdate && signature === lastSignature.current) return;
      lastSignature.current = signature;
      setCode(codeUp);

      try {
        const preCode = getPreCode(codeUp);

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

        // Use the flexible iframe selection system
        const selectedFrame = getIframeRef(type);

        const html =
          selectedFrame.current?.contentDocument?.documentElement.outerHTML;

        writeCodeToIFrame(html, selectedFrame, theme, transpiledCode);
      } catch (e) {
        setError((e as { message: string }).message as string);
      }
    },
    [iframe, iframeMobile, getIframeRef, theme, type],
  );

  return { updateCode, code, error };
};

/**
 * If the provided code does not include a leading return statement,
 * add one and wrap the JSX/expression to be resilient to formatting.
 * @param codeUp - The code to get the pre code for.
 * @returns The pre code.
 */
const getPreCode = (codeUp: string) => {
  const hasLeadingReturn = /^\s*return\b/m.test(codeUp);

  return hasLeadingReturn ? codeUp : `return (${codeUp.trim()})`;
};
