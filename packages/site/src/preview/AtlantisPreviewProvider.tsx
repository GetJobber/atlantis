import { PropsWithChildren, createContext, useContext, useEffect } from "react";
import { useAtlantisTheme } from "@jobber/components";
import { useAtlantisPreviewCode } from "./useAtlantisPreviewCode";
import { useAtlantisPreviewViewer } from "./useAtlantisPreviewViewer";

// We could probably create some better types throughout here,
// but not necessary until we need them externally.
const AtlantisPreviewContext = createContext<{
  iframe: React.RefObject<HTMLIFrameElement> | null;
  iframeMobile: React.RefObject<HTMLIFrameElement> | null;
  updateCode: (code: string, forceUpdate?: boolean) => void;
  updateContent: (content: string, forceUpdate?: boolean) => void;
  code: string;
  content: string;
  error: string;
  type: "web" | "mobile";
  updateType: (value: "web" | "mobile") => void;
}>({
  iframe: null,
  iframeMobile: null,
  updateCode: () => ({}),
  updateContent: () => ({}),
  code: "",
  content: "",
  error: "",
  type: "web",
  updateType: () => ({}),
});

export const useAtlantisPreview = () => {
  return useContext(AtlantisPreviewContext);
};

export const AtlantisPreviewProvider = ({ children }: PropsWithChildren) => {
  const { theme } = useAtlantisTheme();
  const { iframe, iframeMobile, type, updateType } = useAtlantisPreviewViewer();

  const { code, content, error, updateCode, updateContent } =
    useAtlantisPreviewCode({
      iframe,
      iframeMobile,
      theme,
      type,
    });

  useEffect(() => {
    if (iframe.current) {
      const iframeWindow = iframe.current.contentWindow;
      iframeWindow?.postMessage({ type: "updateTheme", theme }, "*");
    }

    if (iframeMobile.current) {
      const iframeMobileWindow = iframeMobile.current.contentWindow;
      iframeMobileWindow?.postMessage({ type: "updateTheme", theme }, "*");
    }
  }, [theme]);

  return (
    <AtlantisPreviewContext.Provider
      value={{
        iframe,
        iframeMobile,
        updateCode,
        updateContent,
        code,
        content,
        error,
        type,
        updateType,
      }}
    >
      {children}
    </AtlantisPreviewContext.Provider>
  );
};
