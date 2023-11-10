export interface PickedCalendarRange {
  frequency: string;
  interval: number;
  daysOfWeek?: Array<{ day: string; index: number } | undefined>;
  daysOfMonth?: Array<number | undefined>;
  weeksOfMonth?: Array<Array<string | undefined>>;
  typeOfMonth?: number;
  monthsOfYear?: Array<string>;
}
export interface CalendarPickerProps {
  onUpdate?: (calTime: PickedCalendarRange) => void | undefined;
  defaultPickedCalendarRange?: PickedCalendarRange;
  restrict?: boolean;
  enableRangeInteraction?: boolean;
  selectPickerId?: string;
  dailyTestId?: string;
  weeklyTestId?: string;
  monthlyTestId?: string;
  yearlyTestId?: string;
}
