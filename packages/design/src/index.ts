import { webIconStyles } from "./iconStyles/iconStyles.web";
import { mobileIconStyles } from "./iconStyles/iconStyles.mobile";
import { iconSizes } from "./iconStyles/iconSizes";
import { iconColors } from "./iconStyles/iconColors";
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
  webIconStyles,
  mobileIconStyles,
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
  platform: "web" | "mobile";
  format?: "css" | "js";
}

function buildSVGStyle(
  size: "small" | "base" | "large",
  specialIconStyle: object,
  platform: "web" | "mobile",
) {
  const platformIconStyles = getIconStyles(platform);
  const iconStyle = platformIconStyles.icon;
  const iconSizeStyle = iconSizes.tokens[size];
  const svgStyle: {
    fill?: string;
    width: number;
    height: number;
  } = {
    ...specialIconStyle,
    ...iconStyle,
    ...iconSizeStyle,
  };

  return svgStyle;
}

function getIconStyles(platform: "web" | "mobile") {
  if (platform === "web") {
    return webIconStyles;
  }

  return mobileIconStyles;
}

function buildPathStyle(
  color: IconProps["color"],
  specialIconStyle: Record<string, object>,
) {
  const colorStyle =
    color && iconColors.tokens[color] ? iconColors.tokens[color].value : "";

  const fallbackStyle =
    (typeof specialIconStyle.fill === "string" && specialIconStyle.fill) || "";

  return {
    fill: colorStyle || fallbackStyle,
  };
}

// eslint-disable-next-line max-statements
export function getIcon({
  name,
  color,
  platform,
  size = "base",
  format = "css",
}: GetIconProps) {
  const platformIconStyles = getIconStyles(platform);
  const { paths, viewBox } = getPaths(name);
  let specialIconStyle = {};

  if (platformIconStyles[name]) {
    specialIconStyle = platformIconStyles[name];
  }
  const svgStyle = buildSVGStyle(size, specialIconStyle, platform);
  const pathStyle = buildPathStyle(color, specialIconStyle);

  if (format === "js") {
    pathStyle.fill = tokenStyleToJs(pathStyle.fill);
    svgStyle.fill = tokenStyleToJs(svgStyle.fill);
  } else {
    pathStyle.fill = tokenStyleToCss(pathStyle.fill);
    svgStyle.fill = tokenStyleToCss(svgStyle.fill);
  }

  if (platform === "mobile" && pathStyle.fill) {
    svgStyle.fill = pathStyle.fill;
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
