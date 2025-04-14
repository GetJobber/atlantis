import classnames from "classnames";
import styles from "./FormatFile.module.css";
import { UseFormatFileStylesProps } from "./types";

export const useFormatFileStyles = ({
  displaySize = "base",
  onClick,
  display = "expanded",
  isComplete,
  onDelete,
}: UseFormatFileStylesProps) => {
  const wrapperClassNames = classnames(styles[display], styles.formatFile, {
    [styles[displaySize]]: display === "compact",
  });

  const detailsClassNames = classnames(styles.wrapper, {
    [styles[displaySize]]: display === "compact",
    [styles.hoverable]: isHoverable(),
    [styles.clickable]: onClick,
    [styles.deleteable]: display === "compact",
  });

  const thumbnailContainerClassNames = classnames(
    styles.thumbnail,
    styles[displaySize],
  );

  function isHoverable(): boolean {
    if (display === "compact") {
      return Boolean(isComplete && (onClick || onDelete));
    } else if (display === "expanded") {
      return Boolean(isComplete && onClick);
    }

    return false;
  }

  return { wrapperClassNames, detailsClassNames, thumbnailContainerClassNames };
};
