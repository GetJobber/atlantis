import React from "react";
import classNames from "classnames";
import styles from "./Stack.module.css";
import { StackProps } from "./types";
import { spaceTokens, useSpaces } from "../sharedHooks/useSpaces";
import {
  ariaPropsMapped,
  dataPropsMapped,
} from "../sharedHooks/useCommonProps";

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
}: StackProps) {
  const spaceMapped = useSpaces(gap);

  return (
    <Tag
      role={role}
      id={id}
      {...dataPropsMapped(data)}
      {...ariaPropsMapped(aria)}
      style={
        {
          "--public-stack-split": splitAfter,
          "--public-stack-space": spaceMapped,
          "--public-stack-width": autoWidth ? "auto" : "100%",
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
      )}
    >
      {children}
    </Tag>
  );
}
