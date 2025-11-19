import { useCallback, useRef, useState } from "react";
import { ComponentType } from "../types/content";
import { getPlatformForComponentType } from "../utils/componentTypeUtils";

export const useAtlantisPreviewViewer = () => {
  const iframe = useRef<HTMLIFrameElement | null>(null);
  const iframeMobile = useRef<HTMLIFrameElement | null>(null);

  // Parse the current type from URL parameters
  const getInitialType = (): ComponentType => {
    const params = new URLSearchParams(window.location.search);
    if (params.has("mobile")) return "mobile";
    if (params.has("webLegacy")) return "web";

    return "webSupported"; // Default to supported version
  };

  const [type, setType] = useState<ComponentType>(getInitialType());

  const updateType = (value: ComponentType) => {
    setType(value);

    // Update URL parameters
    const params = new URLSearchParams();

    if (value === "mobile") {
      params.set("mobile", "");
    } else if (value === "web") {
      params.set("webLegacy", "");
    }
    // For "webSupported", we don't add any parameters (default)

    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${
        params.toString() ? `?${params.toString()}` : ""
      }`,
    );
  };

  // Get the appropriate iframe ref for a given type based on platform
  const getIframeRef = useCallback(
    (componentType: ComponentType) => {
      const platform = getPlatformForComponentType(componentType);

      switch (platform) {
        case "web":
          return iframe; // Both webSupported and webLegacy use the same iframe
        case "mobile":
          return iframeMobile;
        default:
          return iframe;
      }
    },
    [iframe, iframeMobile],
  ); // Only depends on the refs, which are stable

  return {
    iframe,
    iframeMobile,
    type,
    updateType,
    getIframeRef,
  };
};
