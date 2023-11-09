export interface PickedCalendarRange {
  frequency: string;
  interval: number;
  daysOfWeek?: Array<{ day: string; index: number } | undefined>;
  daysOfMonth?: Array<number | undefined>;
  weeksOfMonth?: Array<Array<string | undefined>>;
  typeOfMonth?: number;
  monthsOfYear?: Array<string>;
}
