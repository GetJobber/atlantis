import React, { useEffect, useRef } from "react";
// import formatDate from "date-fns/format";
import combineClassNames from "classnames";
import classNames from "./DayCell.css";

// const getPressStyle = ({ pressed }: { pressed: boolean }) => ({
//   // opacity: pressed ? tokens["opacity-pressed"] : 1,
// });

/**
 * A date cell in the calendar
 */
export const DayCell = (props: {
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
  readonly range: "start" | "end" | "between" | "none";
  readonly hasFocus: boolean;
  /**
   * Callback for pressing the cell
   */
  readonly onToggle: () => void;
}): JSX.Element => {
  const formatter = new Intl.DateTimeFormat(navigator.language, {
    dateStyle: "medium",
  });

  const dt = new Date(props.date);

  const cell = props.inMonth ? (
    <div
      className={combineClassNames(
        classNames.cell,
        !props.disabled && props.selected ? classNames.selected : "",
        !props.disabled && !props.selected && props.highlighted
          ? classNames.highlighted
          : "",
        props.disabled ? classNames.disabled : "",
      )}
    >
      <span
        className={classNames.accessibleLabel}
        id={`date-label-${props.date}`}
      >
        {`${formatter.format(dt)}${props.highlighted ? ", highlighted" : ""}`}
      </span>
      <span aria-hidden="true">{dt.getDate()}</span>
    </div>
  ) : (
    <div
      className={combineClassNames(classNames.cell, classNames.outOfRange)}
    />
  );

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      props.hasFocus &&
      props.inMonth &&
      document.activeElement?.getAttribute("role") === "gridcell"
    ) {
      ref.current?.focus();
    }
  }, [props.hasFocus, ref.current, props.inMonth]);

  const tabbableProps = props.inMonth
    ? {
        role: props.inMonth ? "gridcell" : undefined,
        tabIndex: props.hasFocus ? 0 : -1,
        ["aria-selected"]: props.selected,
        ["aria-disabled"]: props.disabled,
        ["data-date"]: `${dt.getFullYear()}-${
          dt.getMonth() + 1
        }-${dt.getDate()}`,
        onClick: props.disabled ? undefined : props.onToggle,
      }
    : {};

  return (
    <div
      ref={ref}
      {...tabbableProps}
      // aria-labelledby={`date-label-${props.date}`}
      className={combineClassNames(
        classNames.container,
        classNames[`range-${props.range}`],
        props.hasFocus && props.inMonth ? classNames.focus : "",
      )}
    >
      {cell}
    </div>
  );
};
