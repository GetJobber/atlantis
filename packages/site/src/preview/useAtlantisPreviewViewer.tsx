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
    const params = new URLSearchParams(window.location.search);

    if (value === "mobile") {
      params.set("mobile", "1");
    } else {
      params.delete("mobile");
    }
    const query = params.toString();
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${query ? `?${query}` : ""}`,
    );
  };

  return { iframe, iframeMobile, type, updateType };
};
