import { Temporal } from "@js-temporal/polyfill";
import { AtlantisTemporalPlainTime } from "./InputTimeProps";

export function civilTimeToHTMLTime(
  civilTime?: AtlantisTemporalPlainTime,
): string {
  if (civilTime == undefined) {
    return "";
  }

  const timeString = civilTime.toString();
  return timeString.slice(0, 5);
}

export function htmlTimeToCivilTime(
  timeString: string,
): AtlantisTemporalPlainTime | undefined {
  try {
    return Temporal.PlainTime.from(timeString + ":00.000000000");
  } catch {
    return undefined;
  }
}
