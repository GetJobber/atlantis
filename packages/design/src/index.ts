import { iconStyles } from "./iconStyles/iconStyles";
import { iconSizes } from "./iconStyles/iconSizes";
import { iconColors } from "./iconStyles/iconColours";
import iconMap from "./assets/icon.map";
import webTokens from "./assets/tokens.web";
import androidTokens from "./assets/tokens.android";
import iosTokens from "./assets/tokens.ios";
import colors from "./assets/tokens.color";
import allColors from "./assets/tokens.all.colors";
import semantic from "./assets/tokens.semantic";
import darkTokens from "./assets/tokens.dark";

type WebTokens = typeof webTokens;
type MobileTokens = typeof androidTokens;

export {
  webTokens as tokens,
  webTokens,
  allColors,
  androidTokens,
  darkTokens,
  iosTokens,
  iconMap,
  iconStyles,
  iconSizes,
  iconColors,
  type WebTokens,
  type MobileTokens,
  colors,
  semantic,
};

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

  const viewBox = `0 0 ${iconSize} ${iconSize}`;

  return { paths, iconSize, viewBox };
};

const tokenStyleToCss = (token?: string | number) => {
  const tokenAsString = typeof token === "string" ? token : token?.toString();

  return (
    tokenAsString
      ?.replace(/\{/g, "var(--")
      .replace(/\./g, "-")
      .replace(/\}/g, ")") || ""
  );
};

const tokenStyleToJs = (token?: string) => {
  const tokenKey =
    token?.replace(/}/g, "").replace(/{/g, "").replace(/\./g, "-") || "";

  return (allColors as Record<string, string>)[tokenKey] || "";
};

interface GetIconProps extends IconProps {
  format?: "css" | "js";
}

export function buildSVGStyle(
  name: string,
  size: "small" | "base" | "large",
  specialIconStyle: object,
) {
  const iconStyle = iconStyles.icon;
  const iconSizeStyle = iconSizes.tokens[size];
  const iconFill = iconStyles[name];
  const svgStyle: { fill?: string; width: number; height: number } = {
    ...iconStyle,
    ...iconSizeStyle,
    ...specialIconStyle,
    ...iconFill,
  };

  return svgStyle;
}

export function getIcon({
  name,
  color,
  size = "base",
  format = "css",
}: GetIconProps) {
  const { paths, viewBox } = getPaths(name);
  let specialIconStyle = {};

  if (iconStyles[name]) {
    specialIconStyle = iconStyles[name];
  }
  const svgStyle = buildSVGStyle(name, size, specialIconStyle);
  const colorStyle = (iconColors.tokens as Record<string, string | object>)[
    color || ""
  ];
  const pathStyle = {
    fill: tokenStyleToCss((colorStyle as { value: string })?.value),
  };
  svgStyle.fill = tokenStyleToCss(svgStyle.fill);

  if (format === "js") {
    pathStyle.fill = tokenStyleToJs((colorStyle as { value: string })?.value);
    svgStyle.fill = tokenStyleToJs(svgStyle.fill);
  }

  return { svgStyle, pathStyle, paths, viewBox } as const;
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
