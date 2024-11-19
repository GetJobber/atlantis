import React from "react";

interface FormatTimeProps {
  /**
   * Time (as JS Date) to be displayed.
   *
   * A `string` should be an ISO 8601 format date string.
   */
  readonly time: Date | string;

  /**
   * Optionally specify clock format. If `undefined` system format will be respected.
   */
  readonly use24HourClock?: boolean;
}

export function FormatTime({
  time: inputTime,
  use24HourClock,
}: FormatTimeProps) {
  let dateObject: Date;

  if (inputTime instanceof Date) {
    dateObject = inputTime;
  } else {
    dateObject = new Date(inputTime);
  }

  return <>{dateToLocaleTimeString(dateObject, use24HourClock)}</>;
}

function dateToLocaleTimeString(date: Date, use24HourClock?: boolean) {
  const language = globalThis?.navigator ? navigator.language : "en";

  return date.toLocaleTimeString(language, {
    hourCycle: use24HourClock ? "h23" : "h12",
    minute: "2-digit",
    hour: "numeric",
  });
}
