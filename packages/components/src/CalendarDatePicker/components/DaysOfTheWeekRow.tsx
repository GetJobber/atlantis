import React from "react";
import combineClassNames from "classnames";
import classNames from "./DaysOfTheWeekRow.css";
import { Text } from "../../Text";
import { addDays } from "../utils";

const getFirstDayOfTheWeekDate = (weekStartsOnMonday: boolean) => {
  const date = new Date();
  const day = date.getDay();
  const diff = date.getDate() - day;
  const firstDay = new Date(date.setDate(diff));

  return weekStartsOnMonday ? addDays(firstDay, 1) : firstDay;
};

/**
 * Row of week day labels
 */
export const DaysOfTheWeekRow = ({
  weekStartsOnMonday,
  alternate,
}: {
  readonly weekStartsOnMonday?: boolean;
  readonly alternate?: boolean;
}): JSX.Element => {
  const formatter = new Intl.DateTimeFormat(navigator.language, {
    weekday: "short",
  });

  const firstDayOfTheWeek = getFirstDayOfTheWeekDate(!!weekStartsOnMonday);

  const row = Array.from({ length: 7 }).map((_, index) => (
    <div className={classNames.cell} key={index} role="row">
      <Text size={alternate ? "small" : "base"}>
        {formatter.format(addDays(firstDayOfTheWeek, index))}
      </Text>
    </div>
  ));

  return (
    <div
      className={combineClassNames(
        classNames.row,
        alternate ? classNames.alternate : "",
      )}
    >
      {row}
    </div>
  );
};
