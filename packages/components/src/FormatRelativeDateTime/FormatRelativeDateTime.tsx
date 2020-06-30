import React from "react";
import { CivilDateTime } from "@std-proposal/temporal";

interface FormatRelativeDateTimeProps {
  /**
   * Date to be displayed.
   */
  readonly date: CivilDateTime;
}

export function FormatRelativeDateTime(
  civilDateTime: FormatRelativeDateTimeProps,
) {
  const now = Date.now() / 1000; //seconds
  const inputDate = new Date(civilDateTime.date.toJSON());
  const delta = now - inputDate.getTime() / 1000; //seconds;

  switch (relativeTimeRange(delta)) {
    case "less than an hour":
      return showMinutes(Math.round(delta / 60));
    case "less then a day":
      return inputDate.toLocaleTimeString();
    case "less than a week":
      return strFormatDate(inputDate, { weekday: "short" });
    case "less than a year":
      return strFormatDate(inputDate, { month: "short", day: "numeric" });
    default:
      return (
        <>
          {strFormatDate(inputDate, {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </>
      );
  }
}

function relativeTimeRange(delta: number) {
  delta = delta / 60;
  if (delta < 60) return "less than an hour";

  delta = delta / 60;
  if (delta < 24) return "less then a day";

  delta = delta / 24;
  if (delta < 7) return "less than a week";

  delta = delta / 365;
  if (delta < 1) return "less than a year";

  return "a year or more";
}

function strFormatDate(date: Date, options: { [key: string]: string }) {
  return date.toLocaleDateString(undefined, options);
}

function showMinutes(minutes: number) {
  if (minutes <= 1) {
    return "1 minute ago";
  } else {
    return minutes + " minutes ago";
  }
}
