import React from "react";
import classnames from "classnames";
import styles from "./Icon.css";
import sizes from "./Sizes.css";
import colors from "./Colors.css";
import { iconObject } from "./iconList";

interface IconMapping {
  [key: string]: string[];
}

const iconList = iconObject.icons.reduce((map: IconMapping, i) => {
  map[i.properties.name] = i.icon.paths;
  return map;
}, {});

// export type IconNames = keyof typeof icons;
export type IconNames = keyof typeof iconList;
export type IconColorNames = keyof typeof colors;

interface IconProps {
  /** The icon to show.  */
  readonly name: IconNames;

  /**
   * Changes the size to small or large.
   * @default base
   */
  readonly size?: keyof typeof sizes;

  /**
   * Determines the color of the icon.
   * @default greyBlueDark
   */
  readonly color?: IconColorNames;
}

export function Icon({
  name,
  color = "greyBlueDark",
  size = "base",
}: IconProps) {
  const iconClasses = classnames(styles.icon, sizes[size]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
      className={iconClasses}
    >
      {iconList[name] &&
        iconList[name].map((path: string, key: number) => (
          <path key={key} className={colors[color]} d={path} />
        ))}
    </svg>
  );
}
