import React from "react";
import classNames from "classnames";
import styles from "./Cover.module.css";
import type { CoverCenterContentProps, CoverProps } from "./types";
import { getMappedAtlantisSpaceToken } from "../sharedHelpers/getMappedAtlantisSpaceToken";

export function Cover({
  children,
  minHeight,
  gap,
  as: Tag = "div",
  dataAttributes,
  ariaAttributes,
  role,
  id,
  UNSAFE_className,
  UNSAFE_style,
}: CoverProps) {
  return (
    <Tag
      role={role}
      id={id}
      {...dataAttributes}
      {...ariaAttributes}
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
  ariaAttributes,
  dataAttributes,
}: CoverCenterContentProps) {
  return (
    <Tag
      role={role}
      id={id}
      {...dataAttributes}
      {...ariaAttributes}
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
