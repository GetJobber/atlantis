import React from "react";
import classnames from "classnames";
import styles from "./Icon.css";
import sizes from "./Sizes.css";
import colors from "./Colors.css";
import { iconMap } from "./iconMap";

export type IconNames =
  | keyof typeof iconMap.icons
  | "longArrowUp"
  | "longArrowDown"
  | "remove"
  | "truck";
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

  /**
   * Set a custom color for the icon.
   */
  readonly customColor?: string;
}

export function Icon({ name, color, customColor, size = "base" }: IconProps) {
  const iconName = mapToCorrectIcon(name);

  const svgClassNames = classnames(styles.icon, sizes[size], {
    [styles.longArrowUp]: name === "longArrowUp",
    [styles.longArrowDown]: name === "longArrowDown",
  });

  let icon;

  if (iconName === "truck") {
    icon = getTruckWithColor(customColor, color);
  } else {
    icon =
      iconMap.icons[iconName] &&
      iconMap.icons[iconName].map((path: string) => (
        <path
          key={path}
          className={getPathClassNames(name, color)}
          d={path}
          fill={customColor}
        />
      ));
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${iconMap.height} ${iconMap.height}`}
      className={svgClassNames}
    >
      {icon}
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

function getTruckWithColor(
  customColor?: string,
  color?: IconColorNames = "green",
) {
  return (
    <g
      transform="translate(234.000000, 0.000000)"
      className={getPathClassNames(name, color)}
    >
      <path
        d="M31.1515152,124.606061 C31.1515152,107.4017s02 45.0986715,93.4545455 62.3030303,93.4545455 L93.4545455,93.4545455 L93.4545455,280.363636 L62.3030303,280.363636 C45.0986715,280.363636 31.1515152,266.41648 31.1515152,249.212121 L31.1515152,124.606061 Z M31.1515152,747.636364 C31.1515152,730.431382 45.0986715,716.484848 62.3030303,716.484848 L93.4545455,716.484848 L93.4545455,903.393939 L62.3030303,903.393939 C45.0986715,903.393939 31.1515152,889.447406 31.1515152,872.242424 L31.1515152,747.636364 Z M62.3030303,965.69697 L498.424242,965.69697 L498.424242,996.848485 C498.424242,1014.05347 484.477709,1028 467.272727,1028 L93.4545455,1028 C76.2501867,1028 62.3030303,1014.05347 62.3030303,996.848485 L62.3030303,965.69697 Z M496.791903,716.503539 L465.646618,717.048691 L468.908182,903.929745 L500.053467,903.384594 C517.255333,903.085539 530.95577,888.896024 530.656715,871.694158 L528.482339,747.106788 C528.183285,729.904921 513.99377,716.204485 496.791903,716.503539 Z M498.424242,93.4545455 L467.272727,93.4545455 L467.272727,280.363636 L498.424242,280.363636 C515.629224,280.363636 529.575758,266.41648 529.575758,249.212121 L529.575758,124.606061 C529.575758,107.401702 515.629224,93.4545455 498.424242,93.4545455 Z"
        id="Shape"
        fill="#2B2B2B"
      ></path>
      <path
        d="M124.606061,0 C90.1970315,0 62.3030303,27.8940012 62.3030303,62.3030303 L62.3030303,311.515152 L31.1515152,311.515152 C13.9470006,311.515152 0,325.461685 0,342.666667 L62.3030303,342.666667 L62.3030303,996.848485 L498.424242,996.848485 L498.424242,342.666667 L560.727273,342.666667 C560.727273,325.461685 546.780739,311.515152 529.575758,311.515152 L498.424242,311.515152 L498.424242,62.3030303 C498.424242,27.8940012 470.531176,0 436.121212,0 L124.606061,0 Z"
        id="Path"
        fill={customColor}
      ></path>
      <path
        d="M467.272727,591.878788 L93.4545455,591.878788 L93.4545455,716.484848 L124.606061,716.484848 C141.810419,716.484848 155.757576,730.431382 155.757576,747.636364 L155.757576,872.242424 C155.757576,889.447406 141.810419,903.393939 124.606061,903.393939 L93.4545455,903.393939 L93.4545455,965.69697 L467.272727,965.69697 L467.272727,903.393939 L436.121212,903.393939 C418.91623,903.393939 404.969697,889.447406 404.969697,872.242424 L404.969697,747.636364 C404.969697,730.431382 418.91623,716.484848 436.121212,716.484848 L467.272727,716.484848 L467.272727,591.878788 Z"
        id="Path"
        fillOpacity="0.35"
        fill="#000000"
      ></path>
      <path
        d="M93.4545455,62.3030303 C93.4545455,45.0986715 107.401702,31.1515152 124.606061,31.1515152 L436.121212,31.1515152 C453.326194,31.1515152 467.272727,45.0986715 467.272727,62.3030303 L467.272727,591.878788 L93.4545455,591.878788 L93.4545455,62.3030303 Z M93.4545455,716.484848 L124.606061,716.484848 C141.810419,716.484848 155.757576,730.431382 155.757576,747.636364 L155.757576,872.242424 C155.757576,889.447406 141.810419,903.393939 124.606061,903.393939 L93.4545455,903.393939 L93.4545455,716.484848 Z M436.121212,716.484848 C418.91623,716.484848 404.969697,730.431382 404.969697,747.636364 L404.969697,872.242424 C404.969697,889.447406 418.91623,903.393939 436.121212,903.393939 L467.272727,903.393939 L467.272727,716.484848 L436.121212,716.484848 Z"
        id="Shape"
        fill="#FFFFFF"
        opacity="0.5"
      ></path>
      <path
        d="M93.4545455,280.363636 C114.222326,269.979902 193.139394,249.212121 280.363636,249.212121 C367.587879,249.212121 446.504012,269.979902 467.272727,280.363636 L404.969697,373.818182 C394.586897,363.435382 342.666667,342.666667 280.363636,342.666667 C218.060606,342.666667 166.14131,363.435382 155.757576,373.818182 L93.4545455,280.363636 Z M155.757576,514 L155.757576,404.969697 L93.4545455,311.515152 L93.4545455,514 L155.757576,514 Z M404.969697,514 L404.969697,404.969697 L467.272727,311.515152 L467.272727,514 L404.969697,514 Z"
        id="Shape"
        fill="#2A2A2A"
      ></path>
    </g>
  );
}
