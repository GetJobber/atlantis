import React from "react";
import classNames from "classnames";
import styles from "./Stack.module.css";

interface StackProps {
  readonly space?: string;
  readonly splitAfter?: number;
  readonly recursive?: boolean;
  readonly children: React.ReactNode;
}

export const Stack = ({
  space = "var(--space-base)",
  recursive,
  splitAfter,
  children,
}: StackProps) => {
  return (
    <div
      style={
        {
          "--public-stack-split": splitAfter,
          "--public-stack-space": space,
        } as React.CSSProperties
      }
      className={classNames(
        styles.stack,
        recursive ? styles.recursive : styles.topOnly,
        splitAfter
          ? styles[`splitAfter-${splitAfter}` as keyof typeof styles]
          : undefined,
      )}
    >
      {children}
    </div>
  );
};
