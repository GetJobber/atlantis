import { useRef, useState } from "react";

export const useAtlantisPreviewViewer = () => {
  const iframe = useRef<HTMLIFrameElement>(null);
  const iframeMobile = useRef<HTMLIFrameElement>(null);

  const [type, setType] = useState<"web" | "mobile">(
    new URLSearchParams(window.location.search)?.has("mobile")
      ? "mobile"
      : "web",
  );

  const updateType = (value: "web" | "mobile") => {
    setType(value);
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}?${value === "mobile" ? "mobile" : ""}`,
    );
  };

  return { iframe, iframeMobile, type, updateType };
};
