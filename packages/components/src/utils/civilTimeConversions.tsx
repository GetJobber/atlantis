// If this is the operations, the three adapters are maybe String, Date and CivilTime
//  i.e. three "libraries" that people might use... string/date might collapse into one
//    so could just have a default for Date/String and then a manual adapter for CivilTime
//    -- so boil the civiltime operations down to the same general API/operations that we
//       would use for string / Date

// there will be a hook loading the set of utils that match the adapter
import { CivilDate, CivilDateTime, CivilTime } from "@std-proposal/temporal";

// "format" is a good name for this
// "formatCivilTime"
// timeToStr
export function civilTimeToTimeString(civilTime?: CivilTime): string {
  if (civilTime == undefined) {
    return "";
  }

  const timeString = civilTime.toString(); //e.g. 02:35:00.000000000

  //first 5 characters are the time as hours and minutes
  return timeString.slice(0, 5);
}

// "parse" is a good name for this
// "parseToCivilTime"
// strToTime
/**
 * Parse a string date in a specific format.
 * @template TDate
 * @param {string} value The string date to parse.
 * @param {string} format The format in which the string date is.
 * @returns {TDate | null} The parsed date.
 */
// parse(value: string, format: string): TDate | null;
export function timeStringToCivilTime(
  timeString: string,
): CivilTime | undefined {
  try {
    return CivilTime.fromString(timeString + ":00.000000000");
  } catch {
    return undefined;
  }
}

// toJSDate
//   toJSDateFromCivilTime
// ** look at Material adapter API to see how they are naming things
export function getTodayDateAtCivilTime(inputTime: CivilTime) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDay();

  return new Date(
    currentYear,
    currentMonth,
    currentDay,
    inputTime.hour,
    inputTime.minute,
    inputTime.second,
    inputTime.millisecond,
  );
}

// toJSDate
//  toJSDateFromCivilDate
//  (this usage is a bit unique because this function is not using the time from the civildate
export function getDateFromCivilDate(inputDate: CivilDate) {
  return new Date(inputDate.year, inputDate.month - 1, inputDate.day);
}

// toJSDate?
// toJSDateFromCivilDateTime
// between this and the one above, CivilDateTime is the only one that uses the time
export function getDateTimeFromCivilDateTime(inputDateTime: CivilDateTime) {
  return new Date(inputDateTime.toJSON());
}

/**
 * Get the hours of the given date.
 * @template TDate
 * @param {TDate} value The given date.
 * @returns {number} The hours of the given date.
 */
// getHours(value: TDate): number;
/**
 * Get the minutes of the given date.
 * @template TDate
 * @param {TDate} value The given date.
 * @returns {number} The minutes of the given date.
 */
// getMinutes(value: TDate): number;
