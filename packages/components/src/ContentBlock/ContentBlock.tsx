import React from "react";
import classNames from "classnames";
import styles from "./ContentBlock.module.css";
import type { ContentBlockProps } from "./types";
import { getMappedAtlantisSpaceToken } from "../sharedHelpers/getMappedAtlantisSpaceToken";
import { getMappedBreakpointWidth } from "../sharedHelpers/getMappedBreakpointWidth";

export function ContentBlock({
  children,
  maxWidth = "sm",
  andText,
  gutters,
  justify = "left",
  as: Tag = "div",
  dataAttributes,
  ariaAttributes,
  role,
  id,
  UNSAFE_className,
  UNSAFE_style,
}: ContentBlockProps) {
  return (
    <Tag
      role={role}
      id={id}
      {...dataAttributes}
      {...ariaAttributes}
      style={
        {
          "--content-block-max-width": getMappedBreakpointWidth(maxWidth),
          "--content-block-gutters": getMappedAtlantisSpaceToken(gutters),
          ...UNSAFE_style?.container,
        } as React.CSSProperties
      }
      className={classNames(
        styles.contentBlock,
        andText && styles.andText,
        gutters && styles.gutters,
        justify === "left" && styles.left,
        justify === "right" && styles.right,
        justify === "center" && styles.center,
        UNSAFE_className?.container,
      )}
    >
      {children}
    </Tag>
  );
}
