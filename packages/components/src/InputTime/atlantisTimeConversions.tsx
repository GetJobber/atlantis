import { Temporal } from "@js-temporal/polyfill";
import { AtlantisTemporalPlainTime } from "./InputTimeProps";

export function atlantisTimeToHTMLTime(
  atlantisTime?: AtlantisTemporalPlainTime,
): string {
  if (atlantisTime == undefined) {
    return "";
  }

  const timeString = atlantisTime.toString();
  return timeString.slice(0, 5);
}

export function htmlTimeToAtlantisTime(
  timeString: string,
): AtlantisTemporalPlainTime | undefined {
  try {
    return Temporal.PlainTime.from(timeString + ":00.000000000");
  } catch {
    return undefined;
  }
}
