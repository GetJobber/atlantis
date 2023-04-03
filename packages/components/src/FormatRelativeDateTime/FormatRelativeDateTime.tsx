import React from "react";
import { AtlantisTemporalPlainDateTime } from "../types";

interface FormatRelativeDateTimeProps<
  T extends AtlantisTemporalPlainDateTime | Date | string,
> {
  /**
   * Date to be displayed.
   *
   * A `string` should be an ISO 8601 format date string.
   */
  readonly date: T;
}

export function FormatRelativeDateTime<
  T extends AtlantisTemporalPlainDateTime | Date | string,
>({ date: inputDate }: FormatRelativeDateTimeProps<T>) {
  let dateObject: Date;

  if (inputDate instanceof Date) {
    dateObject = inputDate;
  } else if (typeof inputDate === "string") {
    dateObject = new Date(inputDate);
  } else {
    dateObject = new Date(inputDate.toJSON());
  }

  const now = Date.now() / 1000; //seconds
  const date = dateObject;
  const delta = now - date.getTime() / 1000; //seconds;

  switch (relativeTimeRange(delta)) {
    case "less than an hour":
      return <>{showMinutes(Math.round(delta / 60))}</>;
    case "less then a day":
      return (
        <>
          {date.toLocaleTimeString(undefined, {
            hour: "numeric",
            minute: "numeric",
          })}
        </>
      );
    case "less than a week":
      return <>{strFormatDate(date, { weekday: "short" })}</>;
    case "less than a year":
      return <>{strFormatDate(date, { month: "short", day: "numeric" })}</>;
    default:
      return (
        <>
          {strFormatDate(date, {
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
