import React from "react";
import { CivilDate } from "@std-proposal/temporal";

interface FormatDateProps {
  /**
   * Date to be displayed.
   */
  readonly date: CivilDate;
}

export function FormatDate(date: FormatDateProps) {
  return <>{strFormatDate(date.date)}</>;
}

function strFormatDate(date: CivilDate) {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return monthNames[date.month - 1] + " " + date.day + ", " + date.year;
}
