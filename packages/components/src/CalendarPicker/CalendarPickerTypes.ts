export interface PickedCalendarRange {
  readonly frequency: string;
  readonly interval: number;
  readonly daysOfWeek?: Array<{ day: string; index: number } | undefined>;
  readonly daysOfMonth?: Array<number | undefined>;
  readonly weeksOfMonth?: Array<Array<string | undefined>>;
  readonly typeOfMonth?: number;
  readonly monthsOfYear?: Array<string>;
}
