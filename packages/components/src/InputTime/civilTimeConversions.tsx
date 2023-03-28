import { Temporal } from "@js-temporal/polyfill";

export function civilTimeToHTMLTime(civilTime?: Temporal.PlainTime): string {
  if (civilTime == undefined) {
    return "";
  }

  const timeString = civilTime.toString();
  return timeString.slice(0, 5);
}

export function htmlTimeToCivilTime(
  timeString: string,
): Temporal.PlainTime | undefined {
  try {
    return Temporal.PlainTime.from(timeString + ":00.000000000");
  } catch {
    return undefined;
  }
}
