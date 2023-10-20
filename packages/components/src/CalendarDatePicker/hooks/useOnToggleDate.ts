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
  onChange?: (dates: Date[]) => void;
}) {
  return useCallback(
    function onToggle(date: Date, isSelected?: boolean) {
      setFocusedDate(date);

      if (isSelected === undefined) {
        isSelected = selected.some(dt => datesAreEqual(dt, date));
      }

      if (range) {
        if (selected.length === 0) {
          onChange?.([date]);
        } else if (selected.length === 1) {
          if (date < selected[0]) {
            onChange?.([date, selected[0]]);
          } else {
            onChange?.([selected[0], date]);
          }
        } else {
          onChange?.([date]);
        }
      } else if (isSelected) {
        onChange?.(selected.filter(dt => !datesAreEqual(dt, date)));
      } else {
        onChange?.([...selected, date]);
      }
    },
    [onChange, setFocusedDate, selected, range],
  );
}
