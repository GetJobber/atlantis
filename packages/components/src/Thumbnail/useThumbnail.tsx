import { IconNames } from "@jobber/design";
import { ThumbnailProps } from "./types";
import { isSafari } from "../utils/getClientBrowser";

export const useThumbnail = ({
  file,
  compact,
}: Pick<ThumbnailProps, "file"> & { compact: boolean }) => {
  const iconName = getIconNameFromType(file.type);
  const hasName = Boolean(file.name) && compact;

  function getIconNameFromType(mimeType: string): IconNames {
    if (mimeType.startsWith("image/")) return "image";
    if (mimeType.startsWith("video/")) return "video";

    switch (mimeType) {
      case "application/pdf":
        return "pdf";
      case "application/vnd.ms-excel":
        return "excel";
      default:
        return "file";
    }
  }

  function isSupportedImageType() {
    const userAgent =
      typeof document === "undefined" ? "" : window.navigator.userAgent;
    const nonHeicImage = !file.type.startsWith("image/heic");
    const nonSVGImage = !file.type.startsWith("image/svg");

    return (nonHeicImage || isSafari(userAgent)) && nonSVGImage;
  }

  return { isSupportedImageType, iconName, hasName };
};
