import { Dispatch, KeyboardEvent, SetStateAction, useCallback } from "react";
import { addMonths, isValidDate } from "../utils";

export function useGridKeyboardControl({
  setFocusedDate,
  onToggle,
  minDate,
  maxDate,
}: {
  setFocusedDate: Dispatch<SetStateAction<Date>>;
  onToggle: (date: Date, method: "click" | "enter" | "space") => void;
  minDate?: Date;
  maxDate?: Date;
}) {
  return useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      switch (event.key) {
        case " ":
        case "Enter": {
          const dateStr = (event.target as Element).getAttribute("data-date");

          if (dateStr) {
            const [y, m, d] = dateStr.split("-").map(Number);
            const date = new Date(y, m - 1, d);

            if (
              isValidDate(date) &&
              (!minDate || date.getTime() >= minDate.getTime()) &&
              (!maxDate || date.getTime() <= maxDate.getTime())
            ) {
              onToggle(date, event.key === " " ? "space" : "enter");
            }
          }
          break;
        }
        case "ArrowUp":
          navigateDays(-7);
          break;
        case "ArrowDown":
          navigateDays(7);
          break;
        case "ArrowLeft":
          navigateDays(-1);
          break;
        case "ArrowRight":
          navigateDays(1);
          break;
        case "PageUp":
          navigateMonths(event.shiftKey ? -12 : -1);
          break;
        case "PageDown":
          navigateMonths(event.shiftKey ? 12 : 1);
      }
    },
    [setFocusedDate, onToggle, minDate, maxDate],
  );

  function navigateDays(days: number) {
    setFocusedDate(current => {
      const next = new Date(current);
      next.setDate(next.getDate() + days);

      return next;
    });
  }

  function navigateMonths(months: number) {
    setFocusedDate(current => addMonths(current, months));
  }
}
