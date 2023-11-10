import { toSentenceCase } from "./CalendarPickerHelpers";
import { PickedCalendarRange } from "./CalendarPickerTypes";

function getDayOfWeek(dayIndex: number) {
  const daysOfWeek = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

  return daysOfWeek[dayIndex];
}

function getDayIndex(dayOfWeek: string) {
  const daysOfWeek = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

  return daysOfWeek.indexOf(dayOfWeek);
}

const ruleFromIndexes = (dayOfWeek: number, weekOfMonth: number) => {
  return `+${dayOfWeek}${getDayOfWeek(weekOfMonth)}`;
};

const generateSuffixForMonthDay = (
  range: PickedCalendarRange,
  maxSize: number,
) => {
  const options = range.daysOfMonth
    ?.map((d, index) => {
      if (index === maxSize + 1) {
        return -1;
      }

      return d && index + 1;
    })
    .filter(d => d);

  return "BYMONTHDAY=" + options?.join(",");
};

const generateSuffixForWeekMonth = (range: PickedCalendarRange) => {
  const weekDays: string[] = [];
  range.weeksOfMonth?.forEach((d, index1) => {
    d?.forEach((b, index2) => {
      if (b) {
        weekDays.push(ruleFromIndexes(index1 + 1, index2));
      }
    });
  });

  return "BYDAY=" + weekDays.join(",");
};

export const useRRuleFromPickedCalendarRange = (
  range: PickedCalendarRange | undefined,
  maxSize = 31,
) => {
  let rule = "";
  let suffix = "";

  if (range && range.frequency === "Yearly") {
    rule = `RRULE:FREQ=YEARLY;INTERVAL=${range.interval}`;
  } else if (range && range.frequency === "Daily") {
    rule = `RRULE:FREQ=DAILY;INTERVAL=${range.interval}`;
  } else if (range && range.frequency === "Monthly") {
    if (range.typeOfMonth === 1) {
      suffix = generateSuffixForMonthDay(range, maxSize);
    } else if (range.typeOfMonth === 2 && range.weeksOfMonth) {
      suffix = generateSuffixForWeekMonth(range);
    }
    rule = `RRULE:FREQ=MONTHLY;INTERVAL=${range.interval};${suffix}`;
  } else if (range && range.frequency === "Weekly") {
    rule = `RRULE:FREQ=WEEKLY;INTERVAL=${
      range.interval
    };BYDAY=${range.daysOfWeek
      ?.filter(d => d)
      .map(d => getDayOfWeek(d?.index || 0))
      .join(",")}`;
  }

  return { rule };
};

const generateMonthlyValues = (value: string) => {
  const values = value.split(",");
  const myArray: Array<Array<string | undefined>> = [];
  values.forEach(val => {
    const dayOfWeek = val.slice(-2);
    const week = Number(val.slice(1, 2)) - 1;

    if (!myArray[week]) {
      myArray[week] = [];
    }
    myArray[week][getDayIndex(dayOfWeek)] = dayOfWeek.slice(0, 1);
  });

  return myArray;
};

export const usePickedCalendarRangeFromRRule = (
  unParsedRRule: string,
  maxSize = 31,
) => {
  const isRRule = unParsedRRule.split(":");
  const pickedCalendarRange = {} as PickedCalendarRange;

  if (isRRule[0] === "RRULE") {
    const remainder = isRRule[1];
    const remainderSplit = remainder.split(";");
    remainderSplit.forEach(d => {
      const [key, value] = d.split("=");

      if (key === "FREQ") {
        pickedCalendarRange.frequency = toSentenceCase(value);
      } else if (key === "INTERVAL") {
        pickedCalendarRange.interval = Number(value);
      } else if (
        key === "BYDAY" &&
        pickedCalendarRange.frequency === "Monthly"
      ) {
        pickedCalendarRange.weeksOfMonth = generateMonthlyValues(value);
        pickedCalendarRange.typeOfMonth = 2;
      } else if (
        key === "BYDAY" &&
        pickedCalendarRange.frequency === "Weekly"
      ) {
        const weekDays = value.split(",");
        weekDays.forEach(day => {
          const dayOfWeek = day.slice(-2);
          const index = getDayIndex(dayOfWeek);

          if (!pickedCalendarRange.daysOfWeek) {
            pickedCalendarRange.daysOfWeek = [];
          }
          pickedCalendarRange.daysOfWeek[index] = { day: dayOfWeek, index };
        });
      } else if (key === "BYMONTHDAY") {
        const indexes = value.split(",").map(e => Number(e));
        indexes.forEach(index => {
          if (!pickedCalendarRange.daysOfMonth) {
            pickedCalendarRange.daysOfMonth = [];
          }

          if (index == -1) {
            pickedCalendarRange.daysOfMonth[maxSize] = maxSize + 1;
          } else {
            pickedCalendarRange.daysOfMonth[index - 1] = index;
          }
        });
      }
    });
  }

  return pickedCalendarRange;
};
