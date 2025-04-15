import React, { useMemo } from "react";
import classNames from "classnames";
import { Breakpoints } from "@jobber/hooks/useResizeObserver";
import styles from "./ContentBlock.module.css";
import { ContentBlockProps } from "./types";
import { useSpaces } from "../sharedHooks/useSpaces";
import {
  ariaPropsMapped,
  dataPropsMapped,
} from "../sharedHooks/useCommonProps";

export function ContentBlock({
  children,
  maxWidth = Breakpoints.smaller,
  andText,
  gutters,
  justify = "left",
  as: Tag = "div",
  data,
  aria,
  role,
  id,
}: ContentBlockProps) {
  const guttersMapped = useSpaces(gutters);

  const maxWidthMapped = useMemo(() => {
    if (typeof maxWidth === "number") {
      return `${maxWidth}px`;
    }

    if (Breakpoints[maxWidth as keyof typeof Breakpoints]) {
      return Breakpoints[maxWidth as keyof typeof Breakpoints] + "px";
    }

    return maxWidth;
  }, [maxWidth]);

  const style = useMemo(() => {
    return {
      "--content-block-max-width": maxWidthMapped,
      "--content-block-gutters": guttersMapped,
    } as React.CSSProperties;
  }, [maxWidthMapped, guttersMapped]);

  return (
    <Tag
      role={role}
      id={id}
      {...dataPropsMapped(data)}
      {...ariaPropsMapped(aria)}
      style={style}
      className={classNames(
        styles.contentBlock,
        andText && styles.andText,
        gutters && styles.gutters,
        justify === "left" && styles.left,
        justify === "right" && styles.right,
        justify === "center" && styles.center,
      )}
    >
      {children}
    </Tag>
  );
}
