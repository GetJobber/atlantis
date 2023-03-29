import { Temporal } from "@js-temporal/polyfill";
import { CivilTime } from "@std-proposal/temporal";

export function civilTimeToHTMLTime(
  civilTime?: Temporal.PlainTime | CivilTime,
): string {
  if (civilTime == undefined) {
    return "";
  }

  const timeString = civilTime.toString();
  return timeString.slice(0, 5);
}

export function htmlTimeToCivilTime(
  timeString: string,
): Temporal.PlainTime | CivilTime | undefined {
  try {
    return Temporal.PlainTime.from(timeString + ":00.000000000");
  } catch {
    return undefined;
  }
}
