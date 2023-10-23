import {
  Dispatch,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { addMonths } from "../utils";

export function useSyncFocusAndViewingDate({
  focusedDate,
  viewingDate,
  setFocusedDate,
  onMonthChange,
}: {
  focusedDate: Date;
  viewingDate: Date;
  setFocusedDate: Dispatch<SetStateAction<Date>>;
  onMonthChange?: (date: Date) => void;
}) {
  const ref = useRef({
    focusedDate,
    viewingDate,
    onMonthChange,
    setFocusedDate,
  });

  useLayoutEffect(() => {
    ref.current = {
      focusedDate,
      viewingDate,
      onMonthChange,
      setFocusedDate,
    };
  });

  /**
   * If th user has navigated focus using the keyboard arrows to a new month or year we need to
   * update the viewing date
   */
  useEffect(() => {
    if (
      focusedDate.getMonth() !== ref.current.viewingDate.getMonth() ||
      focusedDate.getFullYear() !== ref.current.viewingDate.getFullYear()
    ) {
      ref.current.onMonthChange?.(focusedDate);
    }
  }, [focusedDate]);

  /**
   * If the user has clicked "Previous month" or "Next month" we need to
   * update the focused date to the new month.
   */
  useEffect(() => {
    if (viewingDate.getMonth() !== ref.current.focusedDate.getMonth()) {
      ref.current.setFocusedDate(current =>
        addMonths(current, viewingDate.getMonth() - current.getMonth()),
      );
    }
  }, [viewingDate]);
}
