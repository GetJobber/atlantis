import React from "react";
import { CivilTime } from "@std-proposal/temporal";

interface FormatTimeProps {
  /**
   * Civil Time of time to be displayed.
   */
  readonly time: CivilTime;

  /**
   * Optionally specify clock format. If `undefined` system format will be respected.
   */
  readonly use24HourClock?: boolean;
}

export function FormatTime({ time, use24HourClock }: FormatTimeProps) {
  return <>{formatCivilTime(time, use24HourClock)}</>;
}

function formatCivilTime(time: CivilTime, use24HourClock?: boolean) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDay();
  const date = new Date(
    currentYear,
    currentMonth,
    currentDay,
    time.hour,
    time.minute,
    time.second,
    time.millisecond,
  );

  return date.toLocaleTimeString(navigator.language, {
    hour12: typeof use24HourClock === "boolean" ? !use24HourClock : undefined,
    minute: "2-digit",
    hour: "numeric",
  });
}
