import { getTimezoneOffset } from "date-fns-tz";

export type MinutesIncrement = 15 | 30 | 60;

/**
 * Rounds up the time by increment.
 * - 15 mins - rounds to the next quarter time of `00:15`, `00:30`, `00:45`,
 *   and `01:00`
 * - 30 mins - rounds to the next half hour be it `00:30` or `01:00`
 * - 60 mins - rounds to the next hour. I.e., `02:01` gets rounded up
 *   to `03:00`.
 */
export function roundUpToNearestMinutes(
  date: Date,
  minutes: MinutesIncrement,
): Date {
  const ms = 1000 * 60 * minutes;
  return new Date(Math.ceil(date.getTime() / ms) * ms);
}

export function getTimeZoneOffsetInMinutes(
  timeZone: string,
  date?: Date,
): number {
  return getTimezoneOffset(timeZone, date) / 1000 / 60;
}
