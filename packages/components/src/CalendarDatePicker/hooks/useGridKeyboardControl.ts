import {
  type Dispatch,
  type KeyboardEvent,
  type SetStateAction,
  useCallback,
} from "react";
import { addMonths, isValidDate } from "../utils";

export function useGridKeyboardControl({
  setTabbableDate,
  onToggle,
  minDate,
  maxDate,
}: {
  setTabbableDate: Dispatch<SetStateAction<Date>>;
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
          event.preventDefault();
          navigateDays(-7);
          break;
        case "ArrowDown":
          event.preventDefault();
          navigateDays(7);
          break;
        case "ArrowLeft":
          event.preventDefault();
          navigateDays(-1);
          break;
        case "ArrowRight":
          event.preventDefault();
          navigateDays(1);
          break;
        case "PageUp":
          event.preventDefault();
          navigateMonths(event.shiftKey ? -12 : -1);
          break;
        case "PageDown":
          event.preventDefault();
          navigateMonths(event.shiftKey ? 12 : 1);
      }
    },
    [onToggle, minDate, maxDate],
  );

  function navigateDays(days: number) {
    setTabbableDate(current => {
      const next = new Date(current);
      next.setDate(next.getDate() + days);

      return next;
    });
  }

  function navigateMonths(months: number) {
    setTabbableDate(current => addMonths(current, months));
  }
}
