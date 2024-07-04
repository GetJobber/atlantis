import React, { useEffect, useRef } from "react";
import combineClassNames from "classnames";
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
   * Flag indicating the cell represents the current date
   */
  isCurrentDate: boolean;
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
    <div className={propsBasedClassNames()}>
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
      onClick={props.disabled ? undefined : props.onToggle}
      className={combineClassNames(
        classNames.container,
        isSameDay(dt, new Date()) ? classNames.today : "",
        classNames[`range-${props.range}`],
        props.tabbable ? classNames.tabbable : "",
        props.inMonth ? "" : classNames.rollover,
        props.inMonth
          ? ""
          : dt.getDate() === 1
          ? classNames.rolloverStart
          : dt.getDate() === lastDayOfTheMonth.getDate()
          ? classNames.rolloverEnd
          : "",
      )}
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

  function propsBasedClassNames() {
    return combineClassNames(
      classNames.cell,
      !props.disabled && props.selected ? classNames.selected : "",
      !props.disabled && !props.selected && props.highlighted
        ? classNames.highlighted
        : "",
      props.disabled ? classNames.disabled : "",
    );
  }
};
