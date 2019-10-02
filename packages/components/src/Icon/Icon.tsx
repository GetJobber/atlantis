import React from "react";
import classnames from "classnames";
import styles from "./Icon.css";
import sizes from "./Sizes.css";
import colors from "./Colors.css";
import { iconNames } from "./iconNames";
// eslint-disable-next-line import/no-internal-modules
import svgIcon from "./fonts/jobbericons.svg";

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
    <svg className={svgClassNames}>
      <use
        xlinkHref={`${svgIcon}#icon--${iconName}`}
        className={getPathClassNames(name, color)}
      />
    </svg>
  );
}

function getIconNames(name: IconNames): string {
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
