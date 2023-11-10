import { useMemo } from "react";
import { usePickedCalendarRangeFromRRule } from "./useRRule";
import { PickedCalendarRange } from "./CalendarPickerTypes";

export const useMonthlyByDay = (
  monthlyDays: Array<number | undefined>,
  weeklyInterval: number,
  maxDays = 32,
) => {
  let humanReadable = !monthlyDays.find(d => d) ? "Summary: Monthly" : "";

  if (weeklyInterval > 1 || monthlyDays.find(d => d)) {
    humanReadable =
      weeklyInterval === 1 ? "Monthly " : `Every ${weeklyInterval} months `;

    if (monthlyDays.find(d => d)) {
      humanReadable += " on the ";
      humanReadable += monthlyDays
        .filter(d => d)
        .map((d, index) => {
          let val = "";

          if (d && d < maxDays) {
            val = appendSuffix(Number(d));
          } else {
            val = "last";
          }

          if (index > 0 && index === monthlyDays.filter(e => e).length - 1) {
            val = "and " + val;
          }

          return val;
        })
        .filter(d => d)
        .join(", ");
      humanReadable += ` day${
        monthlyDays.filter(d => d).length > 1 ? "s" : ""
      } of the month`;
    }
  }

  return humanReadable;
};

export const useMonthlyByWeek = (
  weeklyDays: Array<Array<string | undefined>>,
  weeklyInterval: number,
) => {
  let found = false;
  let humanReadable =
    weeklyInterval === 1
      ? "Summary: Monthly "
      : `Every ${weeklyInterval} months`;

  if (weeklyDays?.find(d => d)?.filter(d => d)) {
    humanReadable += " on the ";

    humanReadable += weeklyDays
      .map((b, index1) => {
        return b
          ?.map((d, index2) => {
            if (d) {
              let prefix = "";

              if (found) {
                prefix = " and ";
              }
              found = true;

              return (
                prefix + appendSuffix(index1 + 1) + " " + getDayOfWeek(index2)
              );
            }
          })
          .filter(d => d)
          .join(" ");
      })
      .filter(d => d)
      .join(" ");
  }

  return humanReadable;
};

export const useHumanReadable = (range: PickedCalendarRange) => {
  return useMemo(() => {
    let response = useYearly(range.interval);

    if (range.frequency === "Daily") {
      response = useDaily(range.interval);
    } else if (range.frequency === "Weekly") {
      response = useWeekly(range.daysOfWeek || [], range.interval);
    } else if (range.frequency === "Monthly") {
      if (
        range.typeOfMonth === 2 ||
        range.weeksOfMonth?.find(d => d)?.find(d => d)
      ) {
        response = useMonthlyByWeek(range.weeksOfMonth || [], range.interval);
      } else if (range.typeOfMonth == 1 || range.daysOfMonth) {
        response = useMonthlyByDay(range.daysOfMonth || [], range.interval);
      }
    }

    return response;
  }, [range]);
};

export const useHumanReadableRRule = (rRule: string) => {
  const range = usePickedCalendarRangeFromRRule(rRule);

  return useHumanReadable(range);
};

const weeklyDaysAsList = (
  weeklyDays: Array<{ day: string; index: number } | undefined>,
) => {
  return weeklyDays
    .filter(d => d)
    .map((e, index) => {
      let ret = "";

      if (index > 0 && index === weeklyDays.filter(x => x).length - 1) {
        ret = " and " + numberToWeekDay(Number(e?.index));
      } else {
        ret = numberToWeekDay(Number(e?.index));
      }

      return ret;
    })
    .join(", ");
};

export const useWeekly = (
  weeklyDays: Array<{ day: string; index: number } | undefined>,
  weeklyInterval: number,
) => {
  let humanReadable = "Summary: Weekly";

  if (weeklyInterval > 1) {
    humanReadable =
      weeklyInterval === 1 ? "Weekly " : `Every ${weeklyInterval} weeks `;
  }

  if (weeklyInterval > 0 && weeklyDays.filter(d => d).length > 0) {
    humanReadable += " on ";
    humanReadable += weeklyDaysAsList(weeklyDays);
  }

  return humanReadable;
};

export const useShortSummary = (
  typeKey: string,
  pluralKey: string,
  interval: number,
) => {
  let humanReadable = "Summary: " + typeKey;

  if (interval > 1) {
    humanReadable = `Every ${interval} ${pluralKey}`;
  }

  return humanReadable;
};

export const useDaily = (dailyInterval: number) => {
  return useShortSummary("Daily", "days", dailyInterval);
};

export const useYearly = (yearlyInterval: number) => {
  return useShortSummary("Yearly", "years", yearlyInterval);
};

const numberToWeekDay = (num: number) => {
  switch (num) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      return "Sunday";
  }
};

function getDayOfWeek(dayNumber: number) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return daysOfWeek[dayNumber];
}

function appendSuffix(n: number) {
  const j = n % 10,
    k = n % 100;

  if (j == 1 && k != 11) {
    return n + "st";
  }

  if (j == 2 && k != 12) {
    return n + "nd";
  }

  if (j == 3 && k != 13) {
    return n + "rd";
  }

  return n + "th";
}
