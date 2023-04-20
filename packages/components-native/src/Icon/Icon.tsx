import React from "react";
import Svg, { FillProps, Path, SvgProps } from "react-native-svg";
import {
  IconColorNames,
  IconNames,
  IconSizes,
  colorsClassMap,
  getIcon,
  iconClassMap,
  iconStyles,
  sizesClassMap,
} from "@jobber/design";

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
}

export function Icon({
  name,
  color,
  size = "base",
  customColor,
}: IconProps): JSX.Element {
  const { svgClassNames, pathClassNames, paths, viewBox } = getIcon({
    name,
    color,
    size,
  });

  /*
   *  This is to fix a bug where icons with built-in colours do not respect
   *  their color property. At time of writing, if you pass a color to getIcon,
   *  pathClassNames will return the color class first in pathClassNames.
   *  getSvgStyle applies styles in order, so the styles in the last class
   *  processed take precedence.
   *
   *  This fix reverses the order of pathClassNames, so any color-specific
   *  CSS classes are processed last. The order of classes in pathClassNames
   *  is not contractual, so this is potentially fragile if there are updates
   *  to the @jobber/design package it comes from.
   */
  const reversedPathClassNames = pathClassNames.split(" ").reverse().join(" ");

  const svgStyle = getSvgStyle(svgClassNames + " " + reversedPathClassNames);

  const icon = paths.map((path: string) => {
    return <Path key={path} d={path} fill={customColor || svgStyle.fill} />;
  });

  return (
    <Svg style={svgStyle} testID={name} viewBox={viewBox}>
      {icon}
    </Svg>
  );
}

/*
 * get svg styles based on the class names
 * @param className - list of hashed names separated by space - "_2GsLyQLHv8yNULHeXGdver _1ANbiqwd8qgeLaumvLs27n"
 * @default ""
 * @return - style object for the icon  - {"display": "flex" "height": 24, "width": 24, "verticalAlign": "middle" }
 *
 * Since the class names are hashed, we use the [name]ClassMap to find the actual class name. For example if we get
 * "_2GsLyQLHv8yNULHeXGdver _1ANbiqwd8qgeLaumvLs27n", it might map to ".icon .base". Then using the mapped class names,
 * we get the style from the css files which will be something like {"display": "flex" "height": 24, "width": 24, "verticalAlign": "middle" }
 *
 * Atlantis returns "display: inline-block" for icons, but since React Native doesn't support that, we override it with
 * the default "display" value for React Native which is "flex"
 */
function getSvgStyle(classNames = ""): SvgProps["style"] & FillProps {
  const classMap = {
    ...iconClassMap,
    ...sizesClassMap,
    ...colorsClassMap,
  };
  const svgStyle = getStylesForClassNames(classNames.split(" "), classMap);
  return { ...svgStyle, display: "flex" };
}

function getStylesForClassNames(
  classNames: string[],
  classMap: Record<string, string>,
) {
  return classNames.reduce(
    (acc, className) => ({
      ...acc,
      ...iconStyles[classMap[className] as keyof typeof iconStyles],
    }),
    {},
  );
}
