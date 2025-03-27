import React from "react";
import classNames from "classnames";
import styles from "./Center.module.css";

export const Center = ({
  children,
  max = "50ch",
  andText,
  gutters,
  intrinsic,
}: {
  readonly children: React.ReactNode;
  readonly max?: string;
  readonly andText?: boolean;
  readonly gutters?: string;
  readonly intrinsic?: boolean;
}) => {
  return (
    <div
      style={
        {
          "--center-measure": max,
          "--center-gutters": gutters,
        } as React.CSSProperties
      }
      className={classNames(
        styles.center,
        andText && styles.andText,
        gutters && styles.gutters,
        intrinsic && styles.intrinsic,
      )}
    >
      {children}
    </div>
  );
};
