import React from "react";
import classnames from "classnames";
import styles from "./Icon.css";
import sizes from "./Sizes.css";
import colors from "./Colors.css";
import { iconObject } from "./iconObject";
import { iconNames } from "./iconNames";

interface IconMapping {
  [key: string]: string[];
}

const iconList = iconObject.icons.reduce((result: IconMapping, i) => {
  result[i.properties.name] = i.icon.paths;
  return result;
}, {});

export type IconNames = keyof typeof iconNames;
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
  const iconName = getIconNames(name);

  const svgClassNames = classnames(
    styles.icon,
    sizes[size],
    name === "longArrowUp" && styles.longArrowUp,
    name === "longArrowDown" && styles.longArrowDown,
  );

  const pathClassNames = classnames(colors[color]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${iconObject.height} ${iconObject.height}`}
      className={svgClassNames}
    >
      {iconList[iconName] &&
        iconList[iconName].map((path: string, key: number) => (
          <path key={key} className={pathClassNames} d={path} />
        ))}
    </svg>
  );
}
function getIconNames(name: string): string {
  switch (name) {
    case "longArrowUp":
      return "backArrow";
    case "longArrowDown":
      return "backArrow";
    case "remove":
      return "cross";
    default:
      return name;
  }
}
