import React, { useMemo } from "react";
import { Breakpoints } from "@jobber/hooks/useResizeObserver";
import { useMediaQuery } from "@jobber/hooks";
import classNames from "classnames";
import styles from "./Cluster.module.css";
import { ClusterProps } from "./types";
import { useSpaces } from "../sharedHooks/useSpaces";

export function Cluster({
  children,
  justify,
  align,
  space,
  collapseBelow,
}: ClusterProps) {
  const spaceMapped = useSpaces(space);

  const collapseBelowMapped = useMemo(() => {
    if (!collapseBelow) {
      return "0px";
    }

    const collapsedKey = collapseBelow as keyof typeof Breakpoints;

    if (Breakpoints[collapsedKey]) {
      return Breakpoints[collapsedKey] + "px";
    }

    return collapseBelow as string;
  }, [collapseBelow]);

  const justifyMapped = useMemo(() => {
    if (justify === "between") {
      return "space-between";
    }

    if (justify === "around") {
      return "space-around";
    }

    return justify;
  }, [justify]);

  const isCollapsed = useMediaQuery(`(max-width: ${collapseBelowMapped})`);

  return (
    <div
      style={
        {
          "--public-cluster-justify": justifyMapped,
          "--public-cluster-align": align,
          "--public-cluster-space": spaceMapped,
        } as React.CSSProperties
      }
      className={classNames(styles.cluster, isCollapsed && styles.collapsed)}
    >
      {children}
    </div>
  );
}
