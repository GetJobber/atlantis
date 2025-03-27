import React from "react";
import classNames from "classnames";
import styles from "./Square.module.css";

export const Square = ({
  children,
  padding,
  borderWidth,
  invert,
}: {
  readonly children: React.ReactNode;
  readonly padding?: string;
  readonly borderWidth?: string;
  readonly invert?: boolean;
}) => {
  return (
    <div
      style={
        {
          "--square-padding": padding,
          "--square-border-width": borderWidth,
        } as React.CSSProperties
      }
      className={classNames(styles.square, {
        [styles.invert]: invert,
      })}
    >
      {children}
    </div>
  );
};
