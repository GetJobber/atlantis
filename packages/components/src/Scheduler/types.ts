import { CivilTime } from "@std-proposal/temporal";

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
  AsNeeded = "AsNeeded",
}

export enum RecurrenceOptions {
  Daily,
  Weekly,
  BiWeekly,
  AsNeeded,
  Custom,
  DoesNotRepeat,
}

export interface ScheduleEnd {
  type: "duration" | "date";
  numOfPeriods: number;
  durationPeriod: DurationPeriod;
  date: Date;
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

export interface RecurrenceRuleAsNeeded {
  type: DurationPeriod.AsNeeded;
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
  | RecurrenceRuleAsNeeded
);

export interface Recurrence {
  rule: RecurrenceRule;
  ends: ScheduleEnd;
}

export interface SchedulerState {
  startDate: Date;
  startTime: CivilTime | undefined;
  endTime: CivilTime | undefined;
  recurrence: Recurrence;
}
