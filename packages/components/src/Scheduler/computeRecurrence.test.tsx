import { computeRecurrence } from "./computeRecurrence";
import {
  DayOfMonth,
  DurationPeriod,
  Recurrence,
  RecurrenceOptions,
} from "./types";

describe("computeRecurrence", () => {
  it("should reset the recurrence when custom is selected", () => {
    const startDate = new Date(2021, 10, 17);
    const newDayOfMonthSet = new Set<DayOfMonth>();
    newDayOfMonthSet.add(1);
    const recurrence: Recurrence = {
      rule: {
        interval: 1,
        type: DurationPeriod.DayOfMonth,
        date: newDayOfMonthSet,
      },
      ends: {
        type: "duration",
        date: new Date(2021, 10, 17),
        durationPeriod: DurationPeriod.Week,
        numOfPeriods: 6,
      },
    };

    expect(
      computeRecurrence(startDate, recurrence, RecurrenceOptions.Custom),
    ).toStrictEqual(recurrence);
  });
  it("should reset the recurrence when does not repeat is selected", () => {
    const startDate = new Date(2021, 10, 17);
    const newDayOfMonthSet = new Set<DayOfMonth>();
    newDayOfMonthSet.add(1);
    const recurrence: Recurrence = {
      rule: {
        interval: 1,
        type: DurationPeriod.Day,
      },
      ends: {
        type: "date",
        date: new Date(2021, 10, 17),
        durationPeriod: DurationPeriod.Week,
        numOfPeriods: 6,
      },
    };

    expect(
      computeRecurrence(startDate, recurrence, RecurrenceOptions.DoesNotRepeat),
    ).toStrictEqual(recurrence);
  });

  it("should return a daily recurrence result if daily is chosen", () => {
    const startDate = new Date(2021, 10, 17);

    const expectedOutput: Recurrence = {
      rule: {
        type: DurationPeriod.Day,
        interval: 1,
      },
      ends: {
        type: "duration",
        date: new Date(),
        durationPeriod: DurationPeriod.Week,
        numOfPeriods: 6,
      },
    };

    expect(
      computeRecurrence(startDate, expectedOutput, RecurrenceOptions.Daily),
    ).toStrictEqual(expectedOutput);
  });

  it("should return a weekly recurrence result if weekly is chosen", () => {
    const startDate = new Date(2021, 10, 17);
    const endDate = new Date(2021, 10, 17);

    const expectedOutput: Recurrence = {
      rule: {
        type: DurationPeriod.Week,
        interval: 1,
        weekDays: new Set([startDate.getDay()]),
      },
      ends: {
        type: "date",
        date: endDate,
        durationPeriod: DurationPeriod.Week,
        numOfPeriods: 6,
      },
    };

    expect(
      computeRecurrence(
        startDate,
        { ...expectedOutput, rule: { ...expectedOutput.rule, interval: 10 } },
        RecurrenceOptions.Weekly,
      ),
    ).toStrictEqual(expectedOutput);
  });

  it("should return a biweekly recurrence result if biweekly is chosen", () => {
    const startDate = new Date(2021, 10, 17);

    const expectedOutput: Recurrence = {
      rule: {
        type: DurationPeriod.Week,
        interval: 2,
        weekDays: new Set([startDate.getDay()]),
      },
      ends: {
        type: "duration",
        date: new Date(2021, 10, 17),
        durationPeriod: DurationPeriod.Week,
        numOfPeriods: 6,
      },
    };

    expect(
      computeRecurrence(startDate, expectedOutput, RecurrenceOptions.BiWeekly),
    ).toStrictEqual(expectedOutput);
  });
});
