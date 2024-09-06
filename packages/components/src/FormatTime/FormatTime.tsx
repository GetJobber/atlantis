import React from "react";
import { CivilTime } from "@std-proposal/temporal";
import { getTodayDateAtCivilTime } from "../utils/civilTimeConversions";

interface FormatTimeProps {
  /**
   * Civil Time of time to be displayed.
   *
   * A `string` should be an ISO 8601 format date string.
   */
  readonly time: CivilTime | Date | string;

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
  } else if (typeof inputTime === "string") {
    dateObject = new Date(inputTime);
  } else {
    dateObject = getTodayDateAtCivilTime(inputTime);
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
