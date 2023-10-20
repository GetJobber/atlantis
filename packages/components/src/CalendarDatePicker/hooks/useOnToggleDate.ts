import { Dispatch, SetStateAction, useCallback } from "react";
import { datesAreEqual } from "../utils";

export function useOnToggleDate({
  selected,
  range,
  setFocusedDate,
  onChange,
}: {
  selected: Date[];
  range: boolean | undefined;
  setFocusedDate: Dispatch<SetStateAction<Date>>;
  onChange?: (dates: Date[], method: "click" | "enter" | "space") => void;
}) {
  return useCallback(
    function onToggle(
      date: Date,
      method: "click" | "enter" | "space",
      isSelected?: boolean,
    ) {
      setFocusedDate(date);

      if (isSelected === undefined) {
        isSelected = selected.some(dt => datesAreEqual(dt, date));
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
          selected.filter(dt => !datesAreEqual(dt, date)),
          method,
        );
      } else {
        onChange?.([...selected, date], method);
      }
    },
    [onChange, setFocusedDate, selected, range],
  );
}
