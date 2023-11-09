import { RRule } from "rrule";
import { PickedCalendarRange } from "./CalendarPickerTypes";

function getDayOfWeek(dayIndex: number) {
  const daysOfWeek = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

  return daysOfWeek[dayIndex];
}

const ruleFromIndexes = (dayOfWeek: number, weekOfMonth: number) => {
  switch (dayOfWeek) {
    case 1:
      return RRule.MO.nth(weekOfMonth);
    case 2:
      return RRule.TU.nth(weekOfMonth);
    case 3:
      return RRule.WE.nth(weekOfMonth);
    case 4:
      return RRule.TH.nth(weekOfMonth);
    case 5:
      return RRule.FR.nth(weekOfMonth);
    case 6:
      return RRule.SA.nth(weekOfMonth);
    case 0:
      return RRule.SU.nth(weekOfMonth);
  }
};

// eslint-disable-next-line max-statements
export const useRRuleFromPickedCalendarRange = (
  range: PickedCalendarRange | undefined,
) => {
  let rule = "";

  if (range && range.frequency === "Yearly") {
    rule = `RRULE:FREQ=YEARLY;INTERVAL=${range.interval}`;
  } else if (range && range.frequency === "Daily") {
    rule = new RRule({
      freq: RRule.DAILY,
      interval: range.interval,
    }).toString();
  } else if (range && range.frequency === "Monthly") {
    let options = {};

    if (range.typeOfMonth === 1) {
      options = {
        bymonthday: range.daysOfMonth
          ?.map((d, index) => {
            if (d === 32) {
              return -1;
            }

            return d && index + 1;
          })
          .filter(d => d),
      };
    } else if (range.typeOfMonth === 2 && range.weeksOfMonth) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const weekDays: any = [];
      range.weeksOfMonth?.forEach((d, index1) => {
        d?.forEach((b, index2) => {
          if (b) {
            weekDays.push(ruleFromIndexes(index2, index1 + 1));
          }
        });
      });
      options = { byweekday: weekDays };
    }
    console.log("MONTHLY OPTIONS!", options);
    rule = `RRULE:FREQ=MONTHLY;INTERVAL=${range.interval};`;
    rule = new RRule({
      freq: RRule.MONTHLY,
      interval: range.interval,
      ...options,
    }).toString();
  } else if (range && range.frequency === "Weekly") {
    rule = `RRULE:FREQ=WEEKLY;INTERVAL=${
      range.interval
    };BYDAY=${range.daysOfWeek
      ?.filter(d => d)
      .map(d => getDayOfWeek(d?.index))
      .join(",")}`;
  }

  return { rule };
};
