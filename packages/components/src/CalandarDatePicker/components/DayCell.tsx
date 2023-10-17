import React from "react";
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
  /**
   * Callback for pressing the cell
   */
  readonly onToggle: () => void;
}): JSX.Element => {
  const cell = props.inMonth ? (
    <div
      onClick={props.disabled ? undefined : props.onToggle}
      role="togglebutton"
      aria-disabled={props.disabled}
      aria-selected={props.selected}
      className={combineClassNames(
        classNames.cell,
        !props.disabled && props.selected ? classNames.selected : "",
        !props.disabled && !props.selected && props.highlighted
          ? classNames.highlighted
          : "",
        props.disabled ? classNames.disabled : "",
      )}
    >
      {"" + new Date(props.date).getDate()}
    </div>
  ) : (
    <div
      className={combineClassNames(classNames.cell, classNames.outOfRange)}
    />
  );

  return (
    <div
      className={combineClassNames(
        classNames.container,
        classNames[`range-${props.range}`],
      )}
    >
      {cell}
    </div>
  );
};
