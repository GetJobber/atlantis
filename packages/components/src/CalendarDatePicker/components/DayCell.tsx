import React, { useEffect, useRef } from "react";
import { endOfMonth, isSameDay } from "date-fns";
import classNames from "./DayCell.css";

type DayCellProps = Readonly<{
  /**
   * Flag indicating if the cell falls with in the month being viewed
   */
  inMonth: boolean;
  /**
   * The date of the cell
   */
  date: number;
  /**
   * Whether the date / cell is currently selected or not
   */
  selected: boolean;
  /**
   * Flag indicating the cell represents a highlighted date
   */
  highlighted: boolean;
  /**
   * Flag indicating the cell represents a disabled date
   */
  disabled: boolean;
  /**
   * Indicates where the cell falls in a range of dates when selecting a range
   */
  range: "start" | "end" | "between" | "none";
  /**
   * Flag indicating if the cell can be tabbed to or from
   */
  tabbable: boolean;
  /**
   * Callback for clicking the cell
   */
  onToggle: () => void;
  /**
   * Translations for the component
   */
  translations?: Readonly<{
    highlighted?: string;
    "Choose date"?: string;
    Choose?: string;
  }>;
}>;

export const DayCell = ({ range, ...props }: DayCellProps) => (
  <GridCell {...props} range={range} />
);

/**
 * A date cell in the calendar
 */
const GridCell = (props: DayCellProps): JSX.Element => {
  const dt = new Date(props.date);
  const lastDayOfTheMonth = endOfMonth(dt);

  const cell = (
    <div className={classNames.cell}>
      <span className={classNames.accessibleLabel}>{accessibleLabel()}</span>
      <span aria-hidden="true">{dt.getDate()}</span>
    </div>
  );

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      props.tabbable &&
      document.activeElement?.getAttribute("role") === "gridcell"
    ) {
      ref.current?.focus();
    }
  }, [props.tabbable]);

  return (
    <div
      ref={ref}
      role="gridcell"
      tabIndex={props.tabbable ? 0 : -1}
      aria-selected={props.selected}
      aria-disabled={props.disabled}
      data-date={`${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`}
      data-today={isSameDay(dt, new Date())}
      data-range={props.range}
      data-selection={
        props.disabled
          ? "disabled"
          : props.selected
          ? "selected"
          : props.highlighted
          ? "highlighted"
          : "unselected"
      }
      data-rollover={
        props.inMonth
          ? "none"
          : dt.getDate() === 1
          ? "start"
          : dt.getDate() === lastDayOfTheMonth.getDate()
          ? "end"
          : "between"
      }
      onClick={props.disabled ? undefined : props.onToggle}
      className={classNames.container}
    >
      {cell}
    </div>
  );

  function accessibleLabel() {
    const formatter = new Intl.DateTimeFormat(navigator.language, {
      dateStyle: "medium",
    });

    return `${props.translations?.Choose || "Choose"} ${formatter.format(dt)}${
      props.highlighted
        ? `, ${props.translations?.highlighted || "highlighted"}`
        : ""
    }`;
  }
};
