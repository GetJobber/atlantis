import { MutableRefObject, useRef } from "react";

export function useFocusOnSelectedDate() {
  const ref = useRef() as MutableRefObject<HTMLDivElement>;

  function focusOnSelectedDate() {
    const selectedDateClass = ".react-datepicker__day--selected";
    const selectedDate = ref.current?.querySelector(selectedDateClass);

    if (selectedDate instanceof HTMLDivElement) {
      selectedDate.focus();
    }
  }

  return { ref, focusOnSelectedDate };
}
