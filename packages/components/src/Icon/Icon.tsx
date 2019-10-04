import React from "react";
import classnames from "classnames";
import styles from "./Icon.css";
import sizes from "./Sizes.css";
import colors from "./Colors.css";
import iconMap from "./iconMap.json";

export type IconNames =
  | keyof typeof iconMap.icons
  | "longArrowUp"
  | "longArrowDown"
  | "remove";
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
   * Determines the color of the icon. Some icons have a default system colour
   * like quotes, jobs, and invoices. Others that doesn't have a system colour
   * falls back to greyBlueDark.
   */
  readonly color?: IconColorNames;
}

export function Icon({ name, color, size = "base" }: IconProps) {
  const iconName = mapToCorrectIcon(name);

  const svgClassNames = classnames(styles.icon, sizes[size], {
    [styles.longArrowUp]: name === "longArrowUp",
    [styles.longArrowDown]: name === "longArrowDown",
  });

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${iconMap.height} ${iconMap.height}`}
      className={svgClassNames}
    >
      {iconMap.icons[iconName] &&
        iconMap.icons[iconName].map((path: string) => (
          <path
            key={path}
            className={getPathClassNames(name, color)}
            d={path}
          />
        ))}
    </svg>
  );
}

function mapToCorrectIcon(name: IconNames) {
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
