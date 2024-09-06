import { CivilDate, CivilDateTime, CivilTime } from "@std-proposal/temporal";

export function civilTimeToTimeString(civilTime?: CivilTime): string {
  if (civilTime == undefined) {
    return "";
  }

  const timeString = civilTime.toString(); //e.g. 02:35:00.000000000

  //first 5 characters are the time as hours and minutes
  return timeString.slice(0, 5);
}

export function timeStringToCivilTime(
  timeString: string,
): CivilTime | undefined {
  try {
    return CivilTime.fromString(timeString + ":00.000000000");
  } catch {
    return undefined;
  }
}

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

export function getDateFromCivilDate(inputDate: CivilDate) {
  return new Date(inputDate.year, inputDate.month - 1, inputDate.day);
}

export function getDateTimeFromCivilDateTime(inputDateTime: CivilDateTime) {
  return new Date(inputDateTime.toJSON());
}
