import React from "react";

interface FormatRelativeDateTimeProps {
  /**
   * Date to be displayed.
   *
   * A `string` should be an ISO 8601 format date string.
   */
  readonly date: Date | string;

  /**
   * Whether to show the date and time on day rollover.
   */
  readonly showDateAndTimeOnDayRollover?: boolean;
}

export function FormatRelativeDateTime({
  date: inputDate,
  showDateAndTimeOnDayRollover = false,
}: FormatRelativeDateTimeProps) {
  let dateObject: Date;

  if (inputDate instanceof Date) {
    dateObject = inputDate;
  } else {
    dateObject = new Date(inputDate);
  }

  const now = Date.now() / 1000; //seconds
  const today = new Date();
  const date = dateObject;
  const delta = now - date.getTime() / 1000; //seconds;
  const additionalOptions: object =
    showDateAndTimeOnDayRollover && today.getDate() !== date.getDate()
      ? { weekday: "short", hour: "numeric", minute: "numeric" }
      : {};

  switch (relativeTimeRange(delta)) {
    case "less than an hour":
      return <>{showMinutes(Math.round(delta / 60))}</>;
    case "less then a day":
      return (
        <>
          {date.toLocaleTimeString(undefined, {
            hour: "numeric",
            minute: "numeric",
            ...additionalOptions,
          })}
        </>
      );
    case "less than a week":
      return (
        <>{strFormatDate(date, { weekday: "short", ...additionalOptions })}</>
      );
    case "less than a year":
      return (
        <>
          {strFormatDate(date, {
            month: "short",
            day: "numeric",
            ...additionalOptions,
          })}
        </>
      );
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
