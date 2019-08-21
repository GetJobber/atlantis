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
  return <>{formatCivilTime(time, !!use24HourClock)}</>;
}

function formatCivilTime(time: CivilTime, use24HourClock: boolean) {
  const date = new Date(
    0,
    1,
    1,
    time.hour,
    time.minute,
    time.second,
    time.millisecond,
  );

  return date.toLocaleTimeString(undefined, {
    hour12: !use24HourClock,
    minute: "2-digit",
    hour: "numeric",
  });
}
