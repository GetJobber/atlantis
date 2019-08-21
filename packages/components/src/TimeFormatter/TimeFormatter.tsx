import React from "react";
import { CivilTime } from "@std-proposal/temporal";

interface TimeFormatterProps {
  /**
   * Civil Time of time to be displayed.
   */
  readonly civilTime: CivilTime;

  /**
   * Decide to show 24 hour vs.
   * 12 hour display
   */
  readonly use24HourClock: boolean;
}

export function TimeFormatter(props: TimeFormatterProps) {
  const date = new Date(`August 19, 1975 ${props.civilTime}`);

  return date.toLocaleTimeString(undefined, {
    timeStyle: "short",
    hour12: !props.use24HourClock,
  });
}
