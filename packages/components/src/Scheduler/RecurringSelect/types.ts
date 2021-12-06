import { DayOfMonth, DurationPeriod, WeekDay } from "../types";

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
