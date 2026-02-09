import { useMemo } from "react";
import { startOfDay } from "../utils";

export function useHighlightedDatesGroupedByTimeStamp(
  highlightedDates: Date[],
) {
  return useMemo(
    () =>
      highlightedDates.reduce((acc, date) => {
        acc[startOfDay(date).getTime()] = true;

        return acc;
      }, {} as Record<string, boolean>),
    [highlightedDates],
  );
}
