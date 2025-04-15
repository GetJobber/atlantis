import React from "react";
import classNames from "classnames";
import styles from "./Cover.module.css";
import { CoverCenterContentProps, CoverProps } from "./types";
import { getMappedAtlantisSpaceToken } from "../sharedHelpers/getMappedAtlantisSpaceToken";

export function Cover({
  children,
  minHeight,
  gap,
  as: Tag = "div",
  data,
  aria,
  role,
  id,
  UNSAFE_className,
  UNSAFE_style,
}: CoverProps) {
  return (
    <Tag
      role={role}
      id={id}
      {...data}
      {...aria}
      style={
        {
          "--public-cover-min-height": minHeight,
          "--public-cover-space": getMappedAtlantisSpaceToken(gap),
          ...UNSAFE_style?.container,
        } as React.CSSProperties
      }
      className={classNames(styles.cover, UNSAFE_className?.container)}
    >
      {children}
    </Tag>
  );
}

Cover.Center = function CenterContent({
  children,
  UNSAFE_className,
  UNSAFE_style,
  as: Tag = "div",
  id,
  role,
  aria,
  data,
}: CoverCenterContentProps) {
  return (
    <Tag
      role={role}
      id={id}
      {...data}
      {...aria}
      className={classNames(
        styles.centerContent,
        UNSAFE_className?.centerContent,
      )}
      style={UNSAFE_style?.centerContent}
    >
      {children}
    </Tag>
  );
};
