import { isSameDay } from "date-fns";
import { type Dispatch, type SetStateAction, useCallback } from "react";

export function useOnToggleDate({
  selected,
  range,
  setTabbableDate,
  onChange,
}: {
  selected: Date[];
  range: boolean | undefined;
  setTabbableDate: Dispatch<SetStateAction<Date>>;
  onChange?: (dates: Date[], method: "click" | "enter" | "space") => void;
}) {
  return useCallback(
    function onToggle(
      date: Date,
      method: "click" | "enter" | "space",
      isSelected?: boolean,
    ) {
      setTabbableDate(date);

      if (isSelected === undefined) {
        isSelected = selected.some(dt => isSameDay(dt, date));
      }

      if (range) {
        if (selected.length === 0) {
          onChange?.([date], method);
        } else if (selected.length === 1) {
          if (date < selected[0]) {
            onChange?.([date, selected[0]], method);
          } else {
            onChange?.([selected[0], date], method);
          }
        } else {
          onChange?.([date], method);
        }
      } else if (isSelected) {
        onChange?.(
          selected.filter(dt => !isSameDay(dt, date)),
          method,
        );
      } else {
        onChange?.([...selected, date], method);
      }
    },
    [onChange, setTabbableDate, selected, range],
  );
}
