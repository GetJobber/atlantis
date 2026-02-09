import React from "react";
import { Text } from "@jobber/components/Text";
import classNames from "./DaysOfTheWeekRow.css";
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

  const row = Array.from({ length: 7 }).map((_, days) => (
    <div className={classNames.cell} key={days} role="row">
      <Text>{formatter.format(addDays(firstDayOfTheWeek, days))}</Text>
    </div>
  ));

  return <div className={classNames.row}>{row}</div>;
};
