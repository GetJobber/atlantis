import { useRef, useState } from "react";
import { ComponentType } from "../types/content";
import { getPlatformForComponentType } from "../utils/componentTypeUtils";

export const useAtlantisPreviewViewer = () => {
  const iframe = useRef<HTMLIFrameElement>(null);
  const iframeMobile = useRef<HTMLIFrameElement>(null);

  // Parse the current type from URL parameters
  const getInitialType = (): ComponentType => {
    const params = new URLSearchParams(window.location.search);
    if (params.has("mobile")) return "mobile";
    if (params.has("webRebuilt")) return "webRebuilt";

    return "web";
  };

  const [type, setType] = useState<ComponentType>(getInitialType());

  const updateType = (value: ComponentType) => {
    setType(value);

    // Update URL parameters
    const params = new URLSearchParams();

    if (value === "mobile") {
      params.set("mobile", "");
    } else if (value === "webRebuilt") {
      params.set("webRebuilt", "");
    }
    // For "web", we don't add any parameters (default)

    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${
        params.toString() ? `?${params.toString()}` : ""
      }`,
    );
  };

  // Get the appropriate iframe ref for a given type based on platform
  const getIframeRef = (componentType: ComponentType) => {
    const platform = getPlatformForComponentType(componentType);

    switch (platform) {
      case "web":
        return iframe; // Both web and webRebuilt use the same iframe
      case "mobile":
        return iframeMobile;
      default:
        return iframe;
    }
  };

  return {
    iframe,
    iframeMobile,
    type,
    updateType,
    getIframeRef,
  };
};
