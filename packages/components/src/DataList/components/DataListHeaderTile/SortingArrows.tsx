import React from "react";
import styles from "./SortingArrows.css";
import { Icon } from "../../../Icon";

export function SortingArrows({ order }: { order: "asc" | "desc" }) {
  const activeColor = "blue";
  const inactiveColor = "greyBlueLighter";

  return (
    <div>
      <span className={styles.arrowUp}>
        <Icon
          name="arrowUp"
          color={order === "asc" ? activeColor : inactiveColor}
          size="small"
        />
      </span>
      <span className={styles.arrowDown}>
        <Icon
          name="arrowDown"
          color={order === "desc" ? activeColor : inactiveColor}
          size="small"
        />
      </span>
    </div>
  );
}
