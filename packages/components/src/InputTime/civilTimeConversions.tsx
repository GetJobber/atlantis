import { Temporal } from "@js-temporal/polyfill";
import { AtlantisTemporalPlainTime } from "../types";

export function civilTimeToHTMLTime(
  civilTime?: AtlantisTemporalPlainTime,
): string {
  if (civilTime == undefined) {
    return "";
  }

  const timeString = civilTime.toString();
  return timeString.slice(0, 5);
}

export function htmlTimeToCivilTime<T extends AtlantisTemporalPlainTime>(
  timeString: string,
) {
  try {
    return Temporal.PlainTime.from(timeString + ":00.000000000") as T;
  } catch {
    return undefined;
  }
}
