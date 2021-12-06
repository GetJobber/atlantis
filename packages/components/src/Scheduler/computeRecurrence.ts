import {
  DurationPeriod,
  Recurrence,
  RecurrenceOptions,
  ScheduleEnd,
} from "./types";

export const computeRecurrence = (
  startDate: Date,
  from: Recurrence,
  preset: Exclude<
    RecurrenceOptions,
    RecurrenceOptions.AsNeeded // | RecurrenceOptions.DoesNotRepeat
  >,
): Recurrence => {
  const ends: ScheduleEnd = from.ends
    ? from.ends
    : {
        type: "date",
        date: new Date(),
        durationPeriod: DurationPeriod.Week,
        numOfPeriods: 6,
      };

  // tslint:disable-next-line: switch-default
  switch (preset) {
    case RecurrenceOptions.DoesNotRepeat: {
      return {
        rule: from.rule,
        ends,
      };
    }
    case RecurrenceOptions.Daily: {
      return {
        rule: {
          type: DurationPeriod.Day,
          interval: 1,
        },
        ends,
      };
    }

    case RecurrenceOptions.Weekly: {
      return {
        rule: {
          type: DurationPeriod.Week,
          interval: 1,
          weekDays: new Set([startDate.getDay()]),
        },
        ends,
      };
    }

    case RecurrenceOptions.BiWeekly: {
      return {
        rule: {
          type: DurationPeriod.Week,
          interval: 2,
          weekDays: new Set([startDate.getDay()]),
        },
        ends,
      };
    }

    case RecurrenceOptions.Custom: {
      return {
        rule: from.rule,
        ends,
      };
    }
  }
};
