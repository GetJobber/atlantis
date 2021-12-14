export enum WeekDay {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}
export type DayOfMonth =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | "LAST";

export enum DurationPeriod {
  Day = "Day",
  Week = "Week",
  DayOfMonth = "DayOfMonth",
  WeekDayOfMonth = "WeekDayOfMonth",
  Year = "Year",
  Visit = "Visit",
}
export interface RecurrenceRuleDay {
  type: DurationPeriod.Day;
}

export interface RecurrenceRuleWeek {
  type: DurationPeriod.Week;
  weekDays: Set<WeekDay>;
}

export interface RecurrenceRuleYear {
  type: DurationPeriod.Year;
}

export interface RecurrenceRuleDayOfMonth {
  type: DurationPeriod.DayOfMonth;
  date: Set<DayOfMonth>;
}

export interface RecurrenceRuleWeekDayOfMonth {
  type: DurationPeriod.WeekDayOfMonth;
  dayOfWeek: [Set<WeekDay>, Set<WeekDay>, Set<WeekDay>, Set<WeekDay>];
}

export type RecurrenceRule = {
  interval: number;
} & (
  | RecurrenceRuleDay
  | RecurrenceRuleWeek
  | RecurrenceRuleYear
  | RecurrenceRuleDayOfMonth
  | RecurrenceRuleWeekDayOfMonth
);
export interface InitialStateMap {
  [DurationPeriod.Day]: {
    type: DurationPeriod.Day;
  };
  [DurationPeriod.Week]: {
    type: DurationPeriod.Week;
    weekDays: Set<WeekDay>;
  };
  [DurationPeriod.DayOfMonth]: {
    type: DurationPeriod.DayOfMonth;
    date: Set<DayOfMonth>;
  };
  [DurationPeriod.WeekDayOfMonth]: {
    type: DurationPeriod.WeekDayOfMonth;
    dayOfWeek: [Set<WeekDay>, Set<WeekDay>, Set<WeekDay>, Set<WeekDay>];
  };
  [DurationPeriod.Year]: {
    type: DurationPeriod.Year;
  };
}

export const typeInitialStateMap: InitialStateMap = {
  [DurationPeriod.Day]: {
    type: DurationPeriod.Day,
  },
  [DurationPeriod.Week]: {
    type: DurationPeriod.Week,
    weekDays: new Set<WeekDay>(),
  },
  [DurationPeriod.DayOfMonth]: {
    type: DurationPeriod.DayOfMonth,
    date: new Set<DayOfMonth>(),
  },
  [DurationPeriod.WeekDayOfMonth]: {
    type: DurationPeriod.WeekDayOfMonth,
    dayOfWeek: [
      new Set<WeekDay>(),
      new Set<WeekDay>(),
      new Set<WeekDay>(),
      new Set<WeekDay>(),
    ],
  },
  [DurationPeriod.Year]: {
    type: DurationPeriod.Year,
  },
};

export const isMonthly = (
  rule: RecurrenceRule,
): rule is Extract<
  RecurrenceRule,
  { type: DurationPeriod.WeekDayOfMonth | DurationPeriod.DayOfMonth }
> =>
  rule.type === DurationPeriod.WeekDayOfMonth ||
  rule.type === DurationPeriod.DayOfMonth;
