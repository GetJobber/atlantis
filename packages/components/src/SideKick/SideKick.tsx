import React from "react";
import classNames from "classnames";
import styles from "./SideKick.module.css";

export const SideKick = ({
  children,
  sideWidth,
  contentMinWidth,
  space,
  onRight,
}: {
  readonly children: React.ReactNode;
  readonly sideWidth?: string;
  readonly contentMinWidth?: string;
  readonly space?: string;
  readonly onRight?: boolean;
}) => {
  return (
    <div
      style={
        {
          "--public-sidekick-width": sideWidth,
          "--public-sidekick-min-size": contentMinWidth,
          "--public-sidekick-space": space,
        } as React.CSSProperties
      }
      className={classNames(
        styles.sidekick,
        onRight ? styles.right : styles.left,
      )}
    >
      {children}
    </div>
  );
};
