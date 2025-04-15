import React from "react";
import classNames from "classnames";
import styles from "./Stack.module.css";
import { StackProps } from "./types";
import {
  getMappedAtlantisSpaceToken,
  spaceTokens,
} from "../sharedHelpers/getMappedAtlantisSpaceToken";

export function Stack({
  gap = spaceTokens.base,
  recursive,
  splitAfter,
  children,
  align,
  autoWidth = false,
  as: Tag = "div",
  data,
  aria,
  role,
  id,
  UNSAFE_className,
  UNSAFE_style,
}: StackProps) {
  return (
    <Tag
      role={role}
      id={id}
      {...data}
      {...aria}
      style={
        {
          "--public-stack-split": splitAfter,
          "--public-stack-space": getMappedAtlantisSpaceToken(gap),
          "--public-stack-width": autoWidth ? "auto" : "100%",
          ...UNSAFE_style?.container,
        } as React.CSSProperties
      }
      className={classNames(
        styles.stack,
        recursive ? styles.recursive : styles.topOnly,
        splitAfter
          ? styles[`splitAfter-${splitAfter}` as keyof typeof styles]
          : undefined,
        align === "center" ? styles.center : undefined,
        align === "start" ? styles.start : undefined,
        align === "end" ? styles.end : undefined,
        UNSAFE_className?.container,
      )}
    >
      {children}
    </Tag>
  );
}
