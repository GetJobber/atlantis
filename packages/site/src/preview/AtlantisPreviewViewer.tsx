import { useAtlantisPreview } from "./AtlantisPreviewProvider";
import { getPlatformForComponentType } from "../utils/componentTypeUtils";

export const AtlantisPreviewViewer = () => {
  const { iframe, iframeMobile, type } = useAtlantisPreview();

  // Create iframe configurations based on platforms, not individual component types
  const iframeConfigs = [
    {
      ref: iframe,
      platform: "web" as const,
      style: {
        border: "none",
        display: getPlatformForComponentType(type) === "web" ? "block" : "none",
        minHeight: "200px",
      },
    },
    {
      ref: iframeMobile,
      platform: "mobile" as const,
      style: {
        border: "none",
        display:
          getPlatformForComponentType(type) === "mobile" ? "block" : "none",
        borderRadius: "var(--radius-base)",
        minHeight: "200px",
      },
    },
  ];

  return (
    <>
      {iframeConfigs.map(({ ref, platform, style }) => (
        <iframe key={platform} style={style} ref={ref} />
      ))}
    </>
  );
};
