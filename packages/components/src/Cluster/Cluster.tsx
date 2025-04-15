import React from "react";
import classNames from "classnames";
import styles from "./Cluster.module.css";
import { ClusterProps } from "./types";
import { useSpaces } from "../sharedHooks/useSpaces";
import {
  ariaPropsMapped,
  dataPropsMapped,
} from "../sharedHooks/useCommonProps";

export function Cluster({
  children,
  justify,
  align,
  gap,
  collapseBelow,
  collapsed,
  autoWidth = false,
  as: Tag = "div",
  data,
  aria,
  role,
  id,
}: ClusterProps) {
  const spaceMapped = useSpaces(gap);

  return (
    <Tag
      role={role}
      id={id}
      {...dataPropsMapped(data)}
      {...ariaPropsMapped(aria)}
      style={
        {
          "--public-cluster-justify": justify,
          "--public-cluster-align": align,
          "--public-cluster-space": spaceMapped,
          "--public-cluster-width": autoWidth ? "auto" : "100%",
        } as React.CSSProperties
      }
      className={classNames(
        styles.cluster,
        collapseBelow,
        collapsed ? styles.collapsed : undefined,
      )}
    >
      {children}
    </Tag>
  );
}
