import { useMemo } from "react";
import { startOfDay } from "../utils";

export function useHighlightedDatesGroupedByTimeStamp(
  hightlightedDates: Date[],
) {
  return useMemo(
    () =>
      hightlightedDates.reduce((acc, date) => {
        acc[startOfDay(date).getTime()] = true;

        return acc;
      }, {} as Record<string, boolean>),
    [hightlightedDates],
  );
}
