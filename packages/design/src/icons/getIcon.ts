import classnames from "classnames";
import styles from "./Icon.css";
import sizes from "./Sizes.css";
import colors from "./Colors.css";
import { iconMap } from "./iconMap";

export const iconClassMap = styles;
export const sizesClassMap = sizes;
export const colorsClassMap = colors;

export type IconNames =
  | keyof typeof iconMap.icons
  | "longArrowUp"
  | "longArrowDown"
  | "remove"
  | "thumbsDown"
  | "truck";
export type IconColorNames = keyof typeof colorsClassMap;
export type IconSizes = keyof typeof sizesClassMap;
interface IconProps {
  /** The icon to show.  */
  readonly name: IconNames;

  /**
   * Changes the size to small or large.
   * @default base
   */
  readonly size?: IconSizes;

  /**
   * Determines the color of the icon. Some icons have a default system colour
   * like quotes, jobs, and invoices. Others that doesn't have a system colour
   * falls back to greyBlueDark.
   */
  readonly color?: IconColorNames;
}

export function getIcon({ name, color, size = "base" }: IconProps) {
  const svgClassNames = classnames(styles.icon, sizes[size], {
    [styles.longArrowUp]: name === "longArrowUp",
    [styles.longArrowDown]: name === "longArrowDown",
    [styles.thumbsDown]: name === "thumbsDown",
  });

  const pathClassNames = getPathClassNames(name, color);
  const paths = getPaths(name);
  const viewBox = `0 0 ${iconMap.height} ${iconMap.height}`;
  return { svgClassNames, pathClassNames, paths, viewBox } as const;
}

function getPaths(name: IconNames) {
  const iconName = mapToCorrectIcon(name);
  if (iconName === "truck") {
    return [];
  } else {
    return iconMap.icons[iconName];
  }
}

function mapToCorrectIcon(name: IconNames) {
  switch (name) {
    case "longArrowUp":
      return "backArrow";
    case "longArrowDown":
      return "backArrow";
    case "remove":
      return "cross";
    case "thumbsDown":
      return "thumbsUp";
    default:
      return name;
  }
}
function getPathClassNames(name: string, color?: IconColorNames) {
  return classnames(color && colors[color], {
    [styles.person]: name === "person",
    [styles.clients]: name === "clients",
    [styles.property]: name === "property",
    [styles.job]: name === "job",
    [styles.jobOnHold]: name === "jobOnHold",
    [styles.visit]: name === "visit",
    [styles.moveVisits]: name === "moveVisits",
    [styles.event]: name === "event",
    [styles.request]: name === "request",
    [styles.reminder]: name === "reminder",
    [styles.trash]: name === "trash",
    [styles.task]: name === "task",
    [styles.timer]: name === "timer",
    [styles.quote]: name === "quote",
    [styles.quoteCopy]: name === "quoteCopy",
    [styles.invoice]: name === "invoice",
    [styles.invoiceLater]: name === "invoiceLater",
    [styles.badInvoice]: name === "badInvoice",
    [styles.sendInvoice]: name === "sendInvoice",
    [styles.paidInvoice]: name === "paidInvoice",
    [styles.payment]: name === "payment",
    [styles.expense]: name === "expense",
    [styles.edit]: name === "edit",
    [styles.archive]: name === "archive",
    [styles.excel]: name === "excel",
    [styles.file]: name === "file",
    [styles.pdf]: name === "pdf",
    [styles.word]: name === "word",
    [styles.video]: name === "video",
  });
}
