import { CivilTime } from "@std-proposal/temporal";

export function civilTimeToHTMLTime(civilTime: CivilTime): string {
  const timeString = civilTime.toString();
  return timeString.substring(0, timeString.indexOf("."));
}

export function htmlTimeToCivilTime(timeString: string): CivilTime | undefined {
  try {
    return CivilTime.fromString(timeString + ":00.000000000");
  } catch {
    return undefined;
  }
}
