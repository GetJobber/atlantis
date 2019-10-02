import React from "react";
import classnames from "classnames";
import styles from "./Icon.css";
import sizes from "./Sizes.css";
import colors from "./Colors.css";
import { iconObject } from "./iconObject";
import { iconNames } from "./iconNames";

export type IconNames = keyof typeof iconNames;
export type IconColorNames = keyof typeof colors;

interface IconMapping {
  [key: string]: string[];
}

const iconList = iconObject.icons.reduce(
  (result, i) => {
    result[i.properties.name] = i.icon.paths;
    return result;
  },
  {} as IconMapping,
);

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
  const iconName = getIconNames(name);

  const svgClassNames = classnames(
    styles.icon,
    sizes[size],
    name === "longArrowUp" && styles.longArrowUp,
    name === "longArrowDown" && styles.longArrowDown,
  );

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${iconObject.height} ${iconObject.height}`}
      className={svgClassNames}
    >
      {iconList[iconName] &&
        iconList[iconName].map((path: string) => (
          <path
            key={path}
            className={getPathClassNames(name, color)}
            d={path}
          />
        ))}
    </svg>
  );
}

function getIconNames(name: IconNames) {
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
  return classnames(
    color && colors[color],
    name === "person" && styles.person,
    name === "clients" && styles.clients,
    name === "property" && styles.property,
    name === "job" && styles.job,
    name === "jobOnHold" && styles.jobOnHold,
    name === "visit" && styles.visit,
    name === "moveVisits" && styles.moveVisits,
    name === "event" && styles.event,
    name === "request" && styles.request,
    name === "reminder" && styles.reminder,
    name === "trash" && styles.trash,
    name === "task" && styles.task,
    name === "timer" && styles.timer,
    name === "quote" && styles.quote,
    name === "quoteCopy" && styles.quoteCopy,
    name === "invoice" && styles.invoice,
    name === "invoiceLater" && styles.invoiceLater,
    name === "badInvoice" && styles.badInvoice,
    name === "sendInvoice" && styles.sendInvoice,
    name === "paidInvoice" && styles.paidInvoice,
    name === "payment" && styles.payment,
    name === "expense" && styles.expense,
    name === "edit" && styles.edit,
    name === "archive" && styles.archive,
    name === "excel" && styles.excel,
    name === "file" && styles.file,
    name === "pdf" && styles.pdf,
    name === "word" && styles.word,
    name === "video" && styles.video,
  );
}
