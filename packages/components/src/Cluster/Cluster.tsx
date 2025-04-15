import React from "react";
import classNames from "classnames";
import styles from "./Cluster.module.css";
import { ClusterProps } from "./types";
import {
  ariaPropsMapped,
  dataPropsMapped,
} from "../sharedHelpers/getCommonProps";
import { getMappedAtlantisSpaceToken } from "../sharedHelpers/getMappedAtlantisSpaceToken";

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
  UNSAFE_className,
  UNSAFE_style,
}: ClusterProps) {
  const spaceMapped = getMappedAtlantisSpaceToken(gap);

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
          ...UNSAFE_style?.container,
        } as React.CSSProperties
      }
      className={classNames(
        styles.cluster,
        collapseBelow,
        collapsed ? styles.collapsed : undefined,
        UNSAFE_className?.container,
      )}
    >
      {children}
    </Tag>
  );
}
