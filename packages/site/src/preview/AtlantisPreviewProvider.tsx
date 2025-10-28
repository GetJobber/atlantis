import { PropsWithChildren, createContext, useContext, useEffect } from "react";
import { useAtlantisTheme } from "@jobber/components";
import { useAtlantisPreviewCode } from "./useAtlantisPreviewCode";
import { useAtlantisPreviewViewer } from "./useAtlantisPreviewViewer";
import { ComponentType } from "../types/content";

// We could probably create some better types throughout here,
// but not necessary until we need them externally.
const AtlantisPreviewContext = createContext<{
  iframe: React.RefObject<HTMLIFrameElement> | null;
  iframeMobile: React.RefObject<HTMLIFrameElement> | null;
  getIframeRef: (type: ComponentType) => React.RefObject<HTMLIFrameElement>;
  updateCode: (code: string, forceUpdate?: boolean) => void;
  code: string;
  error: string;
  type: ComponentType;
  updateType: (value: ComponentType) => void;
}>({
  iframe: null,
  iframeMobile: null,
  getIframeRef: () => ({ current: null }),
  updateCode: () => ({}),
  code: "",
  error: "",
  type: "web",
  updateType: () => ({}),
});

export const useAtlantisPreview = () => {
  return useContext(AtlantisPreviewContext);
};

export const AtlantisPreviewProvider = ({ children }: PropsWithChildren) => {
  const { theme } = useAtlantisTheme();
  const { iframe, iframeMobile, type, updateType, getIframeRef } =
    useAtlantisPreviewViewer();

  const { code, error, updateCode } = useAtlantisPreviewCode({
    iframe,
    iframeMobile,
    getIframeRef,
    theme,
    type,
  });

  // Update theme for all iframes
  useEffect(() => {
    const iframes = [
      { ref: iframe, name: "web" },
      { ref: iframeMobile, name: "mobile" },
    ];

    iframes.forEach(({ ref }) => {
      if (ref.current) {
        const iframeWindow = ref.current.contentWindow;
        iframeWindow?.postMessage({ type: "updateTheme", theme }, "*");
      }
    });
  }, [theme]);

  return (
    <AtlantisPreviewContext.Provider
      value={{
        iframe,
        iframeMobile,
        getIframeRef,
        updateCode,
        code,
        error,
        type,
        updateType,
      }}
    >
      {children}
    </AtlantisPreviewContext.Provider>
  );
};
