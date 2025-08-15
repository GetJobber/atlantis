import React from "react";
import Svg, { Path } from "react-native-svg";
import type { IconColorNames, IconNames, IconSizes } from "@jobber/design";
import { getIcon } from "@jobber/design";

export interface IconProps {
  /** The icon to show.  */
  readonly name: IconNames;

  /**
   * Changes the size to small or large.
   * @default base
   */
  readonly size?: IconSizes;

  /**
   * Determines the color of the icon. If not specified, some icons have a default system colour
   * like quotes, jobs, and invoices.
   * Others that don't have a system colour fall back to greyBlue.
   */
  readonly color?: IconColorNames;

  /**
   * Sets a custom color for the icon. Can be a rgb() or hex value.
   */
  readonly customColor?: string;

  /**
   * Used to locate this view in end-to-end tests
   */
  readonly testID?: string;
}

export function Icon({
  name,
  color,
  size = "base",
  customColor,
  testID,
}: IconProps): JSX.Element {
  const { svgStyle, paths, viewBox } = getIcon({
    name,
    color,
    size,
    platform: "mobile",
    format: "js",
  });

  const icon = paths.map((path: string) => {
    return <Path key={path} d={path} fill={customColor || svgStyle.fill} />;
  });

  return (
    <Svg
      style={{ ...svgStyle, display: "flex" }}
      testID={testID || name}
      viewBox={viewBox}
    >
      {icon}
    </Svg>
  );
}
