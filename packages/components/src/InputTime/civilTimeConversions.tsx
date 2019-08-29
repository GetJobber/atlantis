import { CivilTime } from "@std-proposal/temporal";

export function civilTimeToHTMLTime(civilTime: CivilTime): string {
  const timeString = civilTime.toString();
  return timeString.slice(0, 5);
}

export function htmlTimeToCivilTime(timeString: string): CivilTime {
  return CivilTime.fromString(timeString + ":00.000000000");
}
