import React from "react";
import classNames from "classnames";
import styles from "./Stack.module.css";
import { StackProps } from "./types";
import { spaceTokens, useSpaces } from "../sharedHooks/useSpaces";

export function Stack({
  space = spaceTokens.base,
  recursive,
  splitAfter,
  children,
  align,
}: StackProps) {
  const spaceMapped = useSpaces(space);

  return (
    <div
      style={
        {
          "--public-stack-split": splitAfter,
          "--public-stack-space": spaceMapped,
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
    </div>
  );
}
