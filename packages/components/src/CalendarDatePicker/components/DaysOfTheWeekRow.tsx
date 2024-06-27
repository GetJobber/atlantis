import React from "react";
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
}: {
  readonly weekStartsOnMonday?: boolean;
}): JSX.Element => {
  const formatter = new Intl.DateTimeFormat(navigator.language, {
    weekday: "short",
  });

  const firstDayOfTheWeek = getFirstDayOfTheWeekDate(!!weekStartsOnMonday);

  const row = Array.from({ length: 7 }).map((_, index) => (
    <div className={classNames.cell} key={index} role="row">
      <Text>{formatter.format(addDays(firstDayOfTheWeek, index))}</Text>
    </div>
  ));

  return <div className={classNames.row}>{row}</div>;
};
