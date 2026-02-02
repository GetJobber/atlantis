import { useCallback, useRef, useState } from "react";
import { useParams, useSearch } from "@tanstack/react-router";
import { ComponentType } from "../types/content";
import { getPlatformForComponentType } from "../utils/componentTypeUtils";

function getTypeFromUrl(
  tab: string | undefined,
  isLegacy: boolean,
): ComponentType {
  if (tab === "mobile") return "mobile";
  if (tab === "web") return isLegacy ? "web" : "webSupported";

  return "webSupported"; // Design tab / no platform: default to supported
}

export const useAtlantisPreviewViewer = () => {
  const iframe = useRef<HTMLIFrameElement>(null);
  const iframeMobile = useRef<HTMLIFrameElement>(null);
  const params = useParams({ strict: false });
  const search = useSearch({ strict: false }) as
    | { isLegacy?: boolean }
    | undefined;
  const tab = params.tab?.toLowerCase().trim();
  const isLegacy = search?.isLegacy === true;

  const [type, setType] = useState<ComponentType>(() =>
    getTypeFromUrl(tab, isLegacy),
  );

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
