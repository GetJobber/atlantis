import React from "react";
import styles from "./Cluster.module.css";

export const Cluster = ({
  children,
  justify,
  align,
  space,
}: {
  readonly children: React.ReactNode;
  readonly justify?: "start" | "end" | "center" | "between" | "around";
  readonly align?: "start" | "end" | "center";
  readonly space?: string;
}) => {
  return (
    <div
      style={
        {
          "--public-cluster-justify": justify,
          "--public-cluster-align": align,
          "--public-cluster-space": space,
        } as React.CSSProperties
      }
      className={styles.cluster}
    >
      {children}
    </div>
  );
};
