/**
 * The exported computeOccurrence function is used to determine complex scheduling of jobs, invoicing, etc.
 * Given on object of type Recurrence, and a start date, it will return an object with the following:
 *   firstOccurrence: the date of the first occurrence
 *   lastOccurrence: the date of the last occurrence
 *   totalOccurrences: the number of dates to be scheduled
 *   scheduledDates: an array containing the dates where an occurrence is to be scheduled
 */

import RRule, { Frequency, Weekday } from "rrule";
import {
  DayOfMonth,
  DurationPeriod,
  Recurrence,
  RecurrenceRule,
  ScheduleEnd,
  WeekDay,
} from "./types";

const NO_SCHEDULED_DATE = "NO_SCHEDULED_DATE";

/**
 * RRule treats monday as the 0th day, JS treats sunday as the 0th day.
 * This array allows for easy mapping between RRule and JS.
 */
const rruleWeekDays = [
  RRule.SU,
  RRule.MO,
  RRule.TU,
  RRule.WE,
  RRule.TH,
  RRule.FR,
  RRule.SA,
];

const durationPeriodToRRuleFreq = (durationPeriod: DurationPeriod) => {
  switch (durationPeriod) {
    case DurationPeriod.Day:
      return RRule.DAILY;
    case DurationPeriod.Week:
      return RRule.WEEKLY;
    case DurationPeriod.DayOfMonth:
      return RRule.MONTHLY;
    case DurationPeriod.WeekDayOfMonth:
      return RRule.MONTHLY;
    case DurationPeriod.Year:
      return RRule.YEARLY;
    default:
      return undefined;
  }
};

// This is a weird function - let me explain. Rrule needs to take UTC dates in to work correctly.
// If we just converted to Date.UTC(year, month, day) there are cases where converting to UTC
// will change the day (and possibly month). Take for example, Nov.1, 2021 in Edmonton TZ. Converting to UTC
// will return a date of Oct.31, 2021, because we don't factor in time at all - these dates are at 00:00.
// Adding the TZ offset will give you a date in UTC that is technically +/- the actual time in UTC, however it is in UTC
// so it doesn't break rrule. This ensures our rrules don't break on edge cases such as timezone changes, different timezones, etc.
// It is essentially a UTC date (wrt year, month, day) framed from the reference of the users locale.
export const convertToUtcDate = (date: Date) => {
  return new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) +
      new Date().getTimezoneOffset() * 60 * 1000,
  );
};

const computeEndDateOrCount = (
  startDate: Date,
  recurrenceRule: RecurrenceRule,
  duration: ScheduleEnd,
  frequency: Frequency,
) => {
  if (duration.durationPeriod === DurationPeriod.Visit) {
    return { count: duration.numOfPeriods };
  }

  const startToFinishDates = new RRule({
    dtstart: startDate,
    freq: durationPeriodToRRuleFreq(duration.durationPeriod),
    count: duration.numOfPeriods + 1,
  });

  const rrule = new RRule({
    dtstart: startDate,
    freq: frequency,
    interval: recurrenceRule.interval,
    until: startToFinishDates.all()[startToFinishDates.all().length - 1],
  });

  return { until: rrule.all()[rrule.all().length - 1] };
};

const getEndDateOrCount = (
  startDate: Date,
  rule: RecurrenceRule,
  ends: ScheduleEnd,
  frequency: Frequency,
) => {
  return ends.type === "date"
    ? { until: convertToUtcDate(ends.date) }
    : computeEndDateOrCount(startDate, rule, ends, frequency);
};

const getWeekDayArray = (weekDays: Set<WeekDay>) => {
  const weekDayArray: Weekday[] = [];
  weekDays.forEach((weekDay: number) => {
    weekDayArray.push(rruleWeekDays[weekDay]);
  });

  return weekDayArray;
};

const getMonthDayArray = (daysOfMonth: Set<DayOfMonth>) => {
  const daysOfMonthArray: number[] = [];
  daysOfMonth.forEach((day: DayOfMonth) => {
    if (day === "LAST") {
      daysOfMonthArray.push(-1);
    } else {
      daysOfMonthArray.push(day);
    }
  });

  return daysOfMonthArray;
};

const getWeekDayOfMonthArray = (daysOfWeeks: Set<WeekDay>[]) => {
  const weekDayOfMonthArray: Weekday[] = [];
  daysOfWeeks.forEach((weekDaySet: Set<WeekDay>, index: number) => {
    weekDaySet.forEach((weekDay: number) => {
      weekDayOfMonthArray.push(rruleWeekDays[weekDay].nth(index + 1));
    });
  });

  return weekDayOfMonthArray;
};

const daySelectionIsEmpty = (selectedDays: number[] | Weekday[]) => {
  return selectedDays.length < 1;
};

const getOccurrenceResult = (rrule: RRule) => {
  return {
    firstOccurrence:
      rrule.all().length > 0 ? rrule.all()[0] : NO_SCHEDULED_DATE,
    lastOccurrence:
      rrule.all().length > 0
        ? rrule.all()[rrule.all().length - 1]
        : NO_SCHEDULED_DATE,
    totalOccurrence: rrule.all().length,
    scheduledDates: rrule.all(),
    summaryString: rrule.toText(),
  };
};

const getEmptyOccurrenceResult = () => {
  return {
    firstOccurrence: NO_SCHEDULED_DATE,
    lastOccurrence: NO_SCHEDULED_DATE,
    totalOccurrence: 0,
    scheduledDates: [],
    summaryString: "",
  };
};

const computeSingleOccurrence = (startDate: Date) => {
  return {
    firstOccurrence: startDate,
    lastOccurrence: undefined,
    totalOccurrence: 1,
    scheduledDates: [startDate],
    summaryString: undefined,
  };
};

const computeNDayRepeat = (
  startDate: Date,
  rule: RecurrenceRule,
  ends: ScheduleEnd,
) => {
  const endDateOrCount = getEndDateOrCount(startDate, rule, ends, RRule.DAILY);

  const rrule = new RRule({
    freq: RRule.DAILY,
    interval: rule.interval,
    dtstart: startDate,
    ...endDateOrCount,
  });

  return getOccurrenceResult(rrule);
};

const computeNWeekRepeat = (
  startDate: Date,
  rule: RecurrenceRule,
  ends: ScheduleEnd,
  weekDays: Set<WeekDay>,
) => {
  const endDateOrCount = getEndDateOrCount(startDate, rule, ends, RRule.WEEKLY);
  const weekDayArray = getWeekDayArray(weekDays);

  if (daySelectionIsEmpty(weekDayArray)) {
    return getEmptyOccurrenceResult();
  }

  const rrule = new RRule({
    freq: RRule.WEEKLY,
    interval: rule.interval,
    dtstart: startDate,
    byweekday: weekDayArray,
    ...endDateOrCount,
  });

  return getOccurrenceResult(rrule);
};

const computeDayOfMonthRepeat = (
  startDate: Date,
  rule: RecurrenceRule,
  ends: ScheduleEnd,
  daysOfMonth: Set<DayOfMonth>,
) => {
  const endDateOrCount = getEndDateOrCount(
    startDate,
    rule,
    ends,
    RRule.MONTHLY,
  );
  const monthDayArray = getMonthDayArray(daysOfMonth);

  if (daySelectionIsEmpty(monthDayArray)) {
    return getEmptyOccurrenceResult();
  }

  const rrule = new RRule({
    freq: RRule.MONTHLY,
    interval: rule.interval,
    dtstart: startDate,
    bymonthday: monthDayArray,
    ...endDateOrCount,
  });

  return getOccurrenceResult(rrule);
};

const computeWeekDayOfMonthRepeat = (
  startDate: Date,
  rule: RecurrenceRule,
  ends: ScheduleEnd,
  daysOfWeeks: Set<WeekDay>[],
) => {
  const endDateOrCount = getEndDateOrCount(
    startDate,
    rule,
    ends,
    RRule.MONTHLY,
  );
  const weekDayOfMonthArray = getWeekDayOfMonthArray(daysOfWeeks);

  if (daySelectionIsEmpty(weekDayOfMonthArray)) {
    return getEmptyOccurrenceResult();
  }

  const rrule = new RRule({
    freq: RRule.MONTHLY,
    interval: rule.interval,
    dtstart: startDate,
    byweekday: weekDayOfMonthArray,
    ...endDateOrCount,
  });

  return getOccurrenceResult(rrule);
};

const computeNYearRepeat = (
  startDate: Date,
  rule: RecurrenceRule,
  ends: ScheduleEnd,
) => {
  const endDateOrCount = getEndDateOrCount(startDate, rule, ends, RRule.YEARLY);

  const rrule = new RRule({
    freq: RRule.YEARLY,
    interval: rule.interval,
    dtstart: startDate,
    ...endDateOrCount,
  });

  return getOccurrenceResult(rrule);
};

const computeRecurringSchedule = (
  startDate: Date,
  recurrence: Exclude<Recurrence, { recurs: false }>,
) => {
  switch (recurrence.rule.type) {
    case DurationPeriod.Day:
      return computeNDayRepeat(startDate, recurrence.rule, recurrence.ends);
    case DurationPeriod.Week:
      return computeNWeekRepeat(
        startDate,
        recurrence.rule,
        recurrence.ends,
        recurrence.rule.weekDays,
      );
    case DurationPeriod.DayOfMonth:
      return computeDayOfMonthRepeat(
        startDate,
        recurrence.rule,
        recurrence.ends,
        recurrence.rule.date,
      );
    case DurationPeriod.WeekDayOfMonth:
      return computeWeekDayOfMonthRepeat(
        startDate,
        recurrence.rule,
        recurrence.ends,
        recurrence.rule.dayOfWeek,
      );
    case DurationPeriod.Year:
      return computeNYearRepeat(startDate, recurrence.rule, recurrence.ends);
    default:
      return computeSingleOccurrence(startDate);
  }
};

export const computeOccurrence = (startDate: Date, recurrence: Recurrence) => {
  const utcStartDate = convertToUtcDate(startDate);
  return computeRecurringSchedule(utcStartDate, recurrence);
};
