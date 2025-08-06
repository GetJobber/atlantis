import React from "react";
import classNames from "./WeekRow.css";

/**
 * Row of cells
 */
export const WeekRow = (props: {
  readonly children: React.ReactNode;
}): JSX.Element => {
  return (
    <div className={classNames.container} role="row">
      {props.children}
    </div>
  );
};
