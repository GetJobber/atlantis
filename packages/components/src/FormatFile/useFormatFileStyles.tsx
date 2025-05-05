import classnames from "classnames";
import styles from "./FormatFile.module.css";
import { FormatFileProps } from "./types";

export const useFormatFileStyles = ({
  display = "expanded",
  displaySize = "base",
  onClick,
  onDelete,
  isComplete,
}: Pick<FormatFileProps, "display" | "onClick" | "onDelete" | "displaySize"> & {
  isComplete: boolean;
}) => {
  const wrapperClassNames = classnames(styles[display], styles.formatFile, {
    [styles[displaySize]]: display === "compact",
  });

  const detailsClassNames = classnames(styles.wrapper, {
    [styles[displaySize]]: display === "compact",
    [styles.hoverable]: isHoverable({ display, isComplete, onClick, onDelete }),
    [styles.clickable]: onClick,
    [styles.deleteable]: display === "compact",
  });

  const thumbnailContainerClassNames = classnames(
    styles.thumbnail,
    styles[displaySize],
  );

  return {
    wrapperClassNames,
    detailsClassNames,
    thumbnailContainerClassNames,
  };
};

function isHoverable({
  display,
  isComplete,
  onClick,
  onDelete,
}: Pick<FormatFileProps, "display" | "onClick" | "onDelete"> & {
  isComplete: boolean;
}): boolean {
  if (display === "compact") {
    return Boolean(isComplete && (onClick || onDelete));
  } else if (display === "expanded") {
    return Boolean(isComplete && onClick);
  }

  return false;
}
