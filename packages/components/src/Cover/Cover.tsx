import React from "react";
import classNames from "classnames";
import styles from "./Cover.module.css";
import { CoverProps } from "./types";
import {
  ariaPropsMapped,
  dataPropsMapped,
} from "../sharedHelpers/getCommonProps";
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
      {...dataPropsMapped(data)}
      {...ariaPropsMapped(aria)}
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
}: {
  readonly children: React.ReactNode;
  readonly UNSAFE_className?: {
    centerContent?: string;
  };
  readonly UNSAFE_style?: {
    centerContent?: React.CSSProperties;
  };
}) {
  return (
    <div
      className={classNames(
        styles.centerContent,
        UNSAFE_className?.centerContent,
      )}
      style={UNSAFE_style?.centerContent}
    >
      {children}
    </div>
  );
};
