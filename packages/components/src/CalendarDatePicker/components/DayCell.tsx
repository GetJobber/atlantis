import React, { useEffect, useRef } from "react";
import combineClassNames from "classnames";
import classNames from "./DayCell.css";

interface DayCellProps {
  /**
   * Flag indicating if the cell falls with in the month being viewed
   */
  readonly inMonth: boolean;
  /**
   * The date of the cell
   */
  readonly date: number;
  /**
   * Whether the date / cell is currently selected or not
   */
  readonly selected: boolean;
  /**
   * Flag indicating the cell represents the current date
   */
  readonly isCurrentDate: boolean;
  /**
   * Flag indicating the cell represents a highlighted date
   */
  readonly highlighted: boolean;
  /**
   * Flag indicating the cell represents a disabled date
   */
  readonly disabled: boolean;
  /**
   * Indicates where the cell falls in a range of dates when selecting a range
   */
  readonly range: "start" | "end" | "between" | "none";
  /**
   * Flag indicating if the cell has received focus via keyboard navigation
   */
  readonly hasFocus: boolean;
  /**
   * Callback for clicking the cell
   */
  readonly onToggle: () => void;
  /**
   * The suffix to append to the date label when the cell is highlighted.
   * Is "highlighted" by default.
   */
  readonly highlightedLabelSuffix: string | undefined;
}

export const DayCell = ({ inMonth, range, ...props }: DayCellProps) =>
  inMonth ? (
    <GridCell {...props} range={range} />
  ) : (
    <OutOfRangeCell range={range} />
  );

const OutOfRangeCell = ({ range }: Pick<DayCellProps, "range">) => (
  <div
    className={combineClassNames(
      classNames.container,
      classNames[`range-${range}`],
    )}
  >
    <div
      className={combineClassNames(classNames.cell, classNames.outOfRange)}
    />
  </div>
);

/**
 * A date cell in the calendar
 */
const GridCell = (props: Omit<DayCellProps, "inMonth">): JSX.Element => {
  const dt = new Date(props.date);

  const cell = (
    <div className={propsBasedClassNames()}>
      <span className={classNames.accessibleLabel}>{accessibleLabel()}</span>
      <span aria-hidden="true">{dt.getDate()}</span>
    </div>
  );

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      props.hasFocus &&
      document.activeElement?.getAttribute("role") === "gridcell"
    ) {
      ref.current?.focus();
    }
  }, [props.hasFocus, ref.current]);

  return (
    <div
      ref={ref}
      role="gridcell"
      tabIndex={props.hasFocus ? 0 : -1}
      aria-selected={props.selected}
      aria-disabled={props.disabled}
      data-date={`${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`}
      onClick={props.disabled ? undefined : props.onToggle}
      className={combineClassNames(
        classNames.container,
        classNames[`range-${props.range}`],
        props.hasFocus ? classNames.focus : "",
      )}
    >
      {cell}
    </div>
  );

  function accessibleLabel() {
    const formatter = new Intl.DateTimeFormat(navigator.language, {
      dateStyle: "medium",
    });

    return `${formatter.format(dt)}${
      props.highlighted
        ? `, ${props.highlightedLabelSuffix || "highlighted"}`
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
