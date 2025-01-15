import { useAtlantisPreview } from "./AtlantisPreviewProvider";

export const AtlantisPreviewViewer = () => {
  const { iframe, iframeMobile, type } = useAtlantisPreview();

  // A few different approaches were tried to clear out the iframe context when
  // swapping from mobile -> web -> back, but there was always leftover imports that interfered with each other.
  // So two iframes was a quick solution to avoid a more complicated solution.
  // If we ever need a 3rd or a 4th iframe we should probably revisit how to properly
  // clear out a single iframe instead of continuing this pattern.
  return (
    <>
      <iframe
        style={{
          border: "none",
          display: type == "web" ? "block" : "none",
          minHeight: "200px",
        }}
        ref={iframe}
      />
      <iframe
        style={{
          border: "none",
          display: type == "mobile" ? "block" : "none",
          borderRadius: "var(--radius-base)",
          minHeight: "200px",
        }}
        ref={iframeMobile}
      />
    </>
  );
};
