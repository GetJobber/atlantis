import React from "react";
import { CivilTime } from "@std-proposal/temporal";

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
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDay();
    dateObject = new Date(
      currentYear,
      currentMonth,
      currentDay,
      inputTime.hour,
      inputTime.minute,
      inputTime.second,
      inputTime.millisecond,
    );
  }

  return <>{formatCivilTime(dateObject, use24HourClock)}</>;
}

function formatCivilTime(date: Date, use24HourClock?: boolean) {
  return date.toLocaleTimeString(navigator.language, {
    hourCycle: use24HourClock ? "h23" : "h12",
    minute: "2-digit",
    hour: "numeric",
  });
}
