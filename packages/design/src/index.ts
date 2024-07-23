import { iconStyles } from "./iconStyles/iconStyles";
import { iconSizes } from "./iconStyles/iconSizes";
import { iconColors } from "./iconStyles/iconColours";
import iconMap from "./icon.map";
import tokens from "./tokens.web";
import mobileTokens from "./tokens.mobile";

export type Tokens = typeof tokens;
export type MobileTokens = typeof mobileTokens;

export { tokens, mobileTokens };

interface IconProps {
  /** The icon to show.  */
  readonly name: keyof typeof iconMap.icons | ExtraIconNames;

  /**
   * Changes the size to small or large.
   * @default base
   */
  readonly size?: keyof typeof iconSizes.tokens;

  /**
   * Determines the color of the icon. Some icons have a default system color
   * like quotes, jobs, and invoices. Others that doesn't have a system color
   * falls back to greyBlueDark.
   */
  readonly color?: keyof typeof iconColors.tokens;
}

const secondaryIconMap: Record<string, string> = {
  longArrowUp: "backArrow",
  longArrowDown: "backArrow",
  longArrowRight: "backArrow",
  longArrowLeft: "backArrow",
  remove: "cross",
  thumbsDown: "thumbsUp",
};

const getPaths = (name: keyof typeof iconMap.icons | ExtraIconNames) => {
  let paths: Array<string> = [];

  if (name !== "truck") {
    const iconRecord: Record<string, Array<string>> = iconMap.icons;
    paths = secondaryIconMap[name]
      ? iconRecord[secondaryIconMap[name]]
      : iconRecord[name];
  } else {
    paths = [];
  }

  const iconSize = name === "truck" ? 1024 : 24;

  return { paths, iconSize };
};

export function getIcon({ name, color, size = "base" }: IconProps) {
  const iconStyle = iconStyles.icon;
  const iconSizeStyle = iconSizes.tokens[size];
  const iconFill = iconStyles[name];
  let specialIconStyle = {};

  if (iconStyles[name]) {
    specialIconStyle = iconStyles[name];
  }
  const svgStyle: { fill?: string; width: number; height: number } = {
    ...iconStyle,
    ...iconSizeStyle,
    ...specialIconStyle,
    ...iconFill,
  };
  const { paths, iconSize } = getPaths(name);
  const colorStyle = (iconColors.tokens as any)[color || ""];
  const viewBox = `0 0 ${iconSize} ${iconSize}`;
  const pathClassNames = colorStyle;

  return { svgStyle, pathClassNames, paths, viewBox } as const;
}

export type ExtraIconNames =
  | "longArrowUp"
  | "longArrowDown"
  | "longArrowRight"
  | "longArrowLeft"
  | "remove"
  | "thumbsDown"
  | "truck";
export type IconNames = keyof typeof iconMap.icons | ExtraIconNames;
export type IconSizes = keyof typeof iconSizes.tokens;
export type IconColorNames = keyof typeof iconColors.tokens;
