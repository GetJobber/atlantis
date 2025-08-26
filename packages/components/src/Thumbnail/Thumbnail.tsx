import React from "react";
import classNames from "classnames";
import styles from "./Thumbnail.module.css";
import { InternalThumbnailImage } from "./ThumbnailImage";
import type { IconNames } from "../Icon";
import { Icon } from "../Icon";
import type { FileUpload } from "../InputFile";
import { Typography } from "../Typography";
import { isSafari } from "../utils/getClientBrowser";

interface ThumbnailProps {
  readonly compact?: boolean;
  readonly size: "base" | "large";
  readonly file: FileUpload;

  /**
   * **Use at your own risk:** Custom classNames for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_className?: {
    container?: string;
  };

  /**
   * **Use at your own risk:** Custom classNames for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_style?: {
    container?: React.CSSProperties;
  };
}

export function Thumbnail({
  compact = false,
  size,
  file,
  UNSAFE_className,
  UNSAFE_style,
}: ThumbnailProps) {
  const { name, type } = file;
  const iconName = getIconNameFromType(type);
  const hasName = Boolean(name) && compact;

  if (type.startsWith("image/") && isSupportedImageType(file)) {
    return (
      <InternalThumbnailImage
        file={file}
        UNSAFE_className={UNSAFE_className}
        UNSAFE_style={UNSAFE_style}
      />
    );
  }

  return (
    <div
      className={classNames(
        styles.content,
        styles[size],
        {
          [styles.hasName]: hasName,
        },
        UNSAFE_className?.container,
      )}
      style={UNSAFE_style?.container}
    >
      <Icon name={iconName} color="greyBlue" size={size} />

      {hasName && (
        <div className={styles.fileName}>
          <Typography element="span" textColor="text" numberOfLines={1}>
            {name}
          </Typography>
        </div>
      )}
    </div>
  );
}

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

function isSupportedImageType(file: FileUpload) {
  const userAgent =
    typeof document === "undefined" ? "" : window.navigator.userAgent;
  const nonHeicImage = !file.type.startsWith("image/heic");
  const nonSVGImage = !file.type.startsWith("image/svg");

  return (nonHeicImage || isSafari(userAgent)) && nonSVGImage;
}
