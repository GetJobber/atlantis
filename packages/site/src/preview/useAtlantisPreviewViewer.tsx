import { useCallback, useRef, useState } from "react";
import { useParams } from "@tanstack/react-router";
import { ComponentType } from "../types/content";
import { getPlatformForComponentType } from "../utils/componentTypeUtils";

export const useAtlantisPreviewViewer = () => {
  const iframe = useRef<HTMLIFrameElement>(null);
  const iframeMobile = useRef<HTMLIFrameElement>(null);
  const params = useParams({ strict: false });
  const tab = params.tab; // present on /components/$name/$tab, undefined on /components/$name

  // Parse the current type from URL parameters
  const getInitialType = (): ComponentType => {
    if (tab === "mobile") return "mobile";
    if (tab === "web") return "web";

    return "webSupported"; // Default to supported version
  };

  const [type, setType] = useState<ComponentType>(getInitialType());

  const updateType = (value: ComponentType) => {
    setType(value);
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
