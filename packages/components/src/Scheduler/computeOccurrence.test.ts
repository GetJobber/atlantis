import { computeOccurrence, convertToUtcDate } from "./computeOccurrence";
import { DayOfMonth, DurationPeriod, Recurrence, WeekDay } from "./types";

type expectedObject = {
  firstOccurrence: Date | string;
  lastOccurrence: Date | undefined | string;
  totalOccurrence: number;
};

type resultObject = {
  firstOccurrence: Date | string;
  lastOccurrence: Date | undefined | string;
  totalOccurrence: number;
  scheduledDates: Date[];
};

const compareExpectedToResults = (
  expected: expectedObject,
  results: resultObject,
) => {
  expect(results.firstOccurrence).toEqual(expected.firstOccurrence);
  expect(results.lastOccurrence).toEqual(expected.lastOccurrence);
  expect(results.totalOccurrence).toEqual(expected.totalOccurrence);
};

describe("computeOccurrence", () => {
  describe("schedule reccuring every n days", () => {
    let testStart: Date;
    let testEnd: Date;
    let testDailyRecurrence: Exclude<Recurrence, { recurs: false }>;

    beforeEach(() => {
      testStart = new Date(2021, 9, 4);
      testEnd = new Date(2021, 9, 10);
      testDailyRecurrence = {
        rule: {
          interval: 1,
          type: DurationPeriod.Day,
        },
        ends: {
          type: "date",
          date: testEnd,
          numOfPeriods: 1,
          durationPeriod: DurationPeriod.Week,
        },
      };
    });
    describe("when an end date is provided", () => {
      it("should be able to compute visits for every day", () => {
        const expected = {
          firstOccurrence: convertToUtcDate(testStart),
          lastOccurrence: convertToUtcDate(testEnd),
          totalOccurrence: 7,
        };

        const result = computeOccurrence(testStart, testDailyRecurrence);
        compareExpectedToResults(expected, result);
      });

      it("should compute visits for every nth day", () => {
        testDailyRecurrence.rule.interval = 3;
        const expected = {
          firstOccurrence: convertToUtcDate(testStart),
          lastOccurrence: convertToUtcDate(testEnd),
          totalOccurrence: 3,
        };

        const result = computeOccurrence(testStart, testDailyRecurrence);
        compareExpectedToResults(expected, result);
      });
    });

    describe("when a duration is provided", () => {
      it("should correctly compute a schedule that repeats daily for a duration", () => {
        testDailyRecurrence.ends = {
          type: "duration",
          date: new Date(),
          numOfPeriods: 1,
          durationPeriod: DurationPeriod.Week,
        };

        const expected = {
          firstOccurrence: convertToUtcDate(testStart),
          lastOccurrence: convertToUtcDate(new Date(2021, 9, 11)),
          totalOccurrence: 8,
        };

        const result = computeOccurrence(testStart, testDailyRecurrence);
        compareExpectedToResults(expected, result);
      });

      it("should correctly compute schedule that repeats every nth day for a duration", () => {
        testDailyRecurrence.rule.interval = 3;
        testDailyRecurrence.ends = {
          type: "duration",
          date: new Date(),
          numOfPeriods: 2,
          durationPeriod: DurationPeriod.Week,
        };

        const expected = {
          firstOccurrence: convertToUtcDate(testStart),
          lastOccurrence: convertToUtcDate(new Date(2021, 9, 16)),
          totalOccurrence: 5,
        };

        const result = computeOccurrence(testStart, testDailyRecurrence);
        compareExpectedToResults(expected, result);
      });
    });

    describe("when a number of visits is provided", () => {
      it("should correctly compute the schedule", () => {
        testDailyRecurrence.ends = {
          type: "duration",
          date: new Date(),
          numOfPeriods: 3,
          durationPeriod: DurationPeriod.Visit,
        };

        const expected = {
          firstOccurrence: convertToUtcDate(testStart),
          lastOccurrence: convertToUtcDate(new Date(2021, 9, 6)),
          totalOccurrence: 3,
        };

        const result = computeOccurrence(testStart, testDailyRecurrence);
        compareExpectedToResults(expected, result);
      });
    });
  });

  describe("schedule recurring every n weeks", () => {
    let testStart: Date;
    let testEnd: Date;
    let weekDaysSet: Set<WeekDay>;
    let testWeeklyRecurrence: Exclude<Recurrence, { recurs: false }>;

    beforeEach(() => {
      testStart = new Date(2021, 9, 1);
      testEnd = new Date(2021, 9, 31);
      weekDaysSet = new Set<WeekDay>();
      testWeeklyRecurrence = {
        rule: {
          interval: 1,
          type: DurationPeriod.Week,
          weekDays: weekDaysSet,
        },
        ends: {
          type: "date",
          date: testEnd,
          numOfPeriods: 1,
          durationPeriod: DurationPeriod.Week,
        },
      };
    });
    describe("when an end date is provided", () => {
      it("should compute Occurrences when scheduled on one weekday", () => {
        weekDaysSet.add(WeekDay.Monday);
        const expected = {
          firstOccurrence: convertToUtcDate(new Date(2021, 9, 4)),
          lastOccurrence: convertToUtcDate(new Date(2021, 9, 25)),
          totalOccurrence: 4,
        };

        const result = computeOccurrence(testStart, testWeeklyRecurrence);
        compareExpectedToResults(expected, result);
      });

      it("should compute Occurrences when scheduled on multiple weekdays", () => {
        weekDaysSet.add(WeekDay.Monday);
        weekDaysSet.add(WeekDay.Friday);
        const expected = {
          firstOccurrence: convertToUtcDate(testStart),
          lastOccurrence: convertToUtcDate(new Date(2021, 9, 29)),
          totalOccurrence: 9,
        };

        const result = computeOccurrence(testStart, testWeeklyRecurrence);
        compareExpectedToResults(expected, result);
      });

      it("should compute Occurrences for weekdays scheduled every nth week", () => {
        weekDaysSet.add(WeekDay.Tuesday);
        weekDaysSet.add(WeekDay.Thursday);
        testWeeklyRecurrence.rule.interval = 2;
        const expected = {
          firstOccurrence: convertToUtcDate(new Date(2021, 9, 12)),
          lastOccurrence: convertToUtcDate(new Date(2021, 9, 28)),
          totalOccurrence: 4,
        };

        const result = computeOccurrence(testStart, testWeeklyRecurrence);
        compareExpectedToResults(expected, result);
      });

      it("should compute occurences when no days are selected", () => {
        const expected = {
          firstOccurrence: "NO_SCHEDULED_DATE",
          lastOccurrence: "NO_SCHEDULED_DATE",
          totalOccurrence: 0,
        };

        const result = computeOccurrence(
          new Date(2021, 9, 1),
          testWeeklyRecurrence,
        );
        compareExpectedToResults(expected, result);
      });
    });

    describe("when a duration is provided", () => {
      it("should compute a schedule that repeats weekly for a duration", () => {
        weekDaysSet.add(WeekDay.Monday);
        weekDaysSet.add(WeekDay.Wednesday);
        testWeeklyRecurrence.ends = {
          type: "duration",
          date: new Date(),
          numOfPeriods: 2,
          durationPeriod: DurationPeriod.Week,
        };

        const expected = {
          firstOccurrence: convertToUtcDate(new Date(2021, 9, 4)),
          lastOccurrence: convertToUtcDate(new Date(2021, 9, 13)),
          totalOccurrence: 4,
        };

        const result = computeOccurrence(testStart, testWeeklyRecurrence);
        compareExpectedToResults(expected, result);
      });

      it("should compute a schedule that repeats every nth week for a duration", () => {
        weekDaysSet.add(WeekDay.Monday);
        weekDaysSet.add(WeekDay.Wednesday);
        weekDaysSet.add(WeekDay.Friday);
        testWeeklyRecurrence.rule.interval = 2;
        testWeeklyRecurrence.ends = {
          type: "duration",
          date: new Date(),
          numOfPeriods: 4,
          durationPeriod: DurationPeriod.Week,
        };

        const expected = {
          firstOccurrence: convertToUtcDate(new Date(2021, 9, 1)),
          lastOccurrence: convertToUtcDate(new Date(2021, 9, 29)),
          totalOccurrence: 7,
        };

        const result = computeOccurrence(testStart, testWeeklyRecurrence);
        compareExpectedToResults(expected, result);
      });
    });

    describe("when a number of visits is provided", () => {
      it("should correctly compute the schedule", () => {
        weekDaysSet.add(WeekDay.Monday);
        weekDaysSet.add(WeekDay.Wednesday);
        weekDaysSet.add(WeekDay.Friday);
        testWeeklyRecurrence.ends = {
          type: "duration",
          date: new Date(),
          numOfPeriods: 4,
          durationPeriod: DurationPeriod.Visit,
        };

        const expected = {
          firstOccurrence: convertToUtcDate(testStart),
          lastOccurrence: convertToUtcDate(new Date(2021, 9, 8)),
          totalOccurrence: 4,
        };

        const result = computeOccurrence(testStart, testWeeklyRecurrence);
        compareExpectedToResults(expected, result);
      });
    });
  });

  describe("schedule recurring monthly, on day(s) of month", () => {
    let testStart: Date;
    let testEnd: Date;
    let monthDaysSet: Set<DayOfMonth>;
    let testDayOfMonthRecurrence: Exclude<Recurrence, { recurs: false }>;

    beforeEach(() => {
      testStart = new Date(2021, 9, 1);
      testEnd = new Date(2021, 10, 30);
      monthDaysSet = new Set<DayOfMonth>();
      testDayOfMonthRecurrence = {
        rule: {
          interval: 1,
          type: DurationPeriod.DayOfMonth,
          date: monthDaysSet,
        },
        ends: {
          type: "date",
          date: testEnd,
          numOfPeriods: 4,
          durationPeriod: DurationPeriod.Week,
        },
      };
    });
    describe("when an end date is provided", () => {
      it("should compute monthly Occurrences for days of the month", () => {
        monthDaysSet.add(5);
        monthDaysSet.add(15);
        monthDaysSet.add(25);
        const expected = {
          firstOccurrence: convertToUtcDate(new Date(2021, 9, 5)),
          lastOccurrence: convertToUtcDate(new Date(2021, 10, 25)),
          totalOccurrence: 6,
        };

        const result = computeOccurrence(testStart, testDayOfMonthRecurrence);
        compareExpectedToResults(expected, result);
      });

      it("should compute monthly Occurrences for the LAST day of the month", () => {
        monthDaysSet.add("LAST");
        const expected = {
          firstOccurrence: convertToUtcDate(new Date(2021, 9, 31)),
          lastOccurrence: convertToUtcDate(new Date(2021, 10, 30)),
          totalOccurrence: 2,
        };

        const result = computeOccurrence(testStart, testDayOfMonthRecurrence);
        compareExpectedToResults(expected, result);
      });

      it("should compute monthly Occurrence with days of month and LAST day of month", () => {
        monthDaysSet.add(10);
        monthDaysSet.add(20);
        monthDaysSet.add("LAST");
        const expected = {
          firstOccurrence: convertToUtcDate(new Date(2021, 9, 10)),
          lastOccurrence: convertToUtcDate(new Date(2021, 10, 30)),
          totalOccurrence: 6,
        };

        const result = computeOccurrence(testStart, testDayOfMonthRecurrence);
        compareExpectedToResults(expected, result);
      });

      it("should compute occurences when no month days are selected", () => {
        const expected = {
          firstOccurrence: "NO_SCHEDULED_DATE",
          lastOccurrence: "NO_SCHEDULED_DATE",
          totalOccurrence: 0,
        };

        const result = computeOccurrence(
          new Date(2021, 9, 1),
          testDayOfMonthRecurrence,
        );
        compareExpectedToResults(expected, result);
      });
    });

    describe("when a duration is provided", () => {
      it("should compute monthly Occurrences for days of the month", () => {
        testEnd = new Date(2025, 9, 1);
        monthDaysSet.add(5);
        monthDaysSet.add(15);
        monthDaysSet.add(25);
        monthDaysSet.add("LAST");
        testDayOfMonthRecurrence.ends = {
          type: "duration",
          date: new Date(),
          numOfPeriods: 3,
          durationPeriod: DurationPeriod.DayOfMonth,
        };

        const expected = {
          firstOccurrence: convertToUtcDate(new Date(2021, 9, 5)),
          lastOccurrence: convertToUtcDate(new Date(2021, 11, 31)),
          totalOccurrence: 12,
        };

        const result = computeOccurrence(testStart, testDayOfMonthRecurrence);
        compareExpectedToResults(expected, result);
      });
    });

    describe("when a number of visits is provided", () => {
      it("should correctly compute the schedule", () => {
        monthDaysSet.add(5);
        monthDaysSet.add(15);
        monthDaysSet.add(25);
        monthDaysSet.add("LAST");
        testDayOfMonthRecurrence.ends = {
          type: "duration",
          date: new Date(),
          numOfPeriods: 6,
          durationPeriod: DurationPeriod.Visit,
        };

        const expected = {
          firstOccurrence: convertToUtcDate(new Date(2021, 9, 5)),
          lastOccurrence: convertToUtcDate(new Date(2021, 10, 15)),
          totalOccurrence: 6,
        };

        const result = computeOccurrence(testStart, testDayOfMonthRecurrence);
        compareExpectedToResults(expected, result);
      });
    });
  });

  describe("schedule recurring monthly, on day(s) of weeks", () => {
    let testStart: Date;
    let testEnd: Date;

    let firstWeek: Set<WeekDay>;
    let secondWeek: Set<WeekDay>;
    let thirdWeek: Set<WeekDay>;
    let fourthWeek: Set<WeekDay>;

    let testWeekDayOfMonthRecurrence: Exclude<Recurrence, { recurs: false }>;

    beforeEach(() => {
      testStart = new Date(2021, 9, 1);
      testEnd = new Date(2021, 10, 30);
      firstWeek = new Set<WeekDay>();
      secondWeek = new Set<WeekDay>();
      thirdWeek = new Set<WeekDay>();
      fourthWeek = new Set<WeekDay>();
      testWeekDayOfMonthRecurrence = {
        rule: {
          interval: 1,
          type: DurationPeriod.WeekDayOfMonth,
          dayOfWeek: [firstWeek, secondWeek, thirdWeek, fourthWeek],
        },
        ends: {
          type: "date",
          date: testEnd,
          numOfPeriods: 4,
          durationPeriod: DurationPeriod.Week,
        },
      };
    });
    describe("when an end date is provided", () => {
      it("should compute Occurrences for the weekdays of the month", () => {
        firstWeek.add(1);
        firstWeek.add(3);
        firstWeek.add(5);
        secondWeek.add(2);
        secondWeek.add(4);
        thirdWeek.add(0);
        fourthWeek.add(6);

        const expected = {
          firstOccurrence: convertToUtcDate(new Date(2021, 9, 1)),
          lastOccurrence: convertToUtcDate(new Date(2021, 10, 27)),
          totalOccurrence: 14,
        };
        const result = computeOccurrence(
          testStart,
          testWeekDayOfMonthRecurrence,
        );

        compareExpectedToResults(expected, result);
      });

      it("should compute occurences when no week days of month are selected", () => {
        const expected = {
          firstOccurrence: "NO_SCHEDULED_DATE",
          lastOccurrence: "NO_SCHEDULED_DATE",
          totalOccurrence: 0,
        };

        const result = computeOccurrence(
          new Date(2021, 9, 1),
          testWeekDayOfMonthRecurrence,
        );
        compareExpectedToResults(expected, result);
      });
    });

    describe("when a duration is provided", () => {
      it("should compute Occurrences for the weekdays of the month", () => {
        firstWeek.add(1);
        firstWeek.add(2);
        secondWeek.add(2);
        secondWeek.add(6);
        thirdWeek.add(0);
        fourthWeek.add(6);
        fourthWeek.add(5);

        testWeekDayOfMonthRecurrence.ends = {
          type: "duration",
          date: new Date(),
          numOfPeriods: 3,
          durationPeriod: DurationPeriod.WeekDayOfMonth,
        };

        const expected = {
          firstOccurrence: convertToUtcDate(new Date(2021, 9, 4)),
          lastOccurrence: convertToUtcDate(new Date(2021, 11, 25)),
          totalOccurrence: 21,
        };
        const result = computeOccurrence(
          testStart,
          testWeekDayOfMonthRecurrence,
        );

        compareExpectedToResults(expected, result);
      });
    });

    describe("when a number of visits is provided", () => {
      it("should correctly compute the schedule", () => {
        firstWeek.add(1);
        firstWeek.add(2);
        secondWeek.add(2);
        secondWeek.add(6);
        thirdWeek.add(0);
        fourthWeek.add(6);
        fourthWeek.add(5);
        testWeekDayOfMonthRecurrence.ends = {
          type: "duration",
          date: new Date(),
          numOfPeriods: 10,
          durationPeriod: DurationPeriod.Visit,
        };

        const expected = {
          firstOccurrence: convertToUtcDate(new Date(2021, 9, 4)),
          lastOccurrence: convertToUtcDate(new Date(2021, 10, 9)),
          totalOccurrence: 10,
        };

        const result = computeOccurrence(
          testStart,
          testWeekDayOfMonthRecurrence,
        );
        compareExpectedToResults(expected, result);
      });
    });
  });

  describe("schedule recurring every n years", () => {
    let testStart: Date;
    let testEnd: Date;
    let testYearlyRecurrencePattern: Exclude<Recurrence, { recurs: false }>;

    beforeEach(() => {
      testStart = new Date(2021, 9, 1);
      testEnd = new Date(2025, 9, 1);
      testYearlyRecurrencePattern = {
        rule: {
          interval: 1,
          type: DurationPeriod.Year,
        },
        ends: {
          type: "date",
          date: testEnd,
          numOfPeriods: 4,
          durationPeriod: DurationPeriod.Week,
        },
      };
    });
    describe("when an end date is provided", () => {
      it("should compute visits for every year", () => {
        const expected = {
          firstOccurrence: convertToUtcDate(testStart),
          lastOccurrence: convertToUtcDate(testEnd),
          totalOccurrence: 5,
        };
        const result = computeOccurrence(
          testStart,
          testYearlyRecurrencePattern,
        );

        compareExpectedToResults(expected, result);
      });

      it("should compute visits for every n years", () => {
        testYearlyRecurrencePattern.rule.interval = 3;

        const expected = {
          firstOccurrence: convertToUtcDate(testStart),
          lastOccurrence: convertToUtcDate(new Date(2024, 9, 1)),
          totalOccurrence: 2,
        };
        const result = computeOccurrence(
          testStart,
          testYearlyRecurrencePattern,
        );

        compareExpectedToResults(expected, result);
      });
    });

    describe("when a duration is provided", () => {
      it("should compute visits for every year", () => {
        testYearlyRecurrencePattern.ends = {
          type: "duration",
          date: new Date(),
          numOfPeriods: 8,
          durationPeriod: DurationPeriod.Year,
        };

        const expected = {
          firstOccurrence: convertToUtcDate(testStart),
          lastOccurrence: convertToUtcDate(new Date(2029, 9, 1)),
          totalOccurrence: 9,
        };
        const result = computeOccurrence(
          testStart,
          testYearlyRecurrencePattern,
        );

        compareExpectedToResults(expected, result);
      });
    });

    describe("when a number of visits is provided", () => {
      it("should correctly compute the schedule", () => {
        testYearlyRecurrencePattern.ends = {
          type: "duration",
          date: new Date(),
          numOfPeriods: 4,
          durationPeriod: DurationPeriod.Visit,
        };

        const expected = {
          firstOccurrence: convertToUtcDate(testStart),
          lastOccurrence: convertToUtcDate(new Date(2024, 9, 1)),
          totalOccurrence: 4,
        };

        const result = computeOccurrence(
          testStart,
          testYearlyRecurrencePattern,
        );
        compareExpectedToResults(expected, result);
      });
    });
  });
});
