import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";

export function useSyncFocusAndViewingDate({
  tabbableDate,
  viewingDate,
  setTabbableDate,
  onMonthChange,
}: {
  tabbableDate: Date;
  viewingDate: Date;
  setTabbableDate: Dispatch<SetStateAction<Date>>;
  onMonthChange?: (date: Date) => void;
}) {
  const ref = useRef({
    tabbableDate,
    viewingDate,
    onMonthChange,
    setTabbableDate,
  });

  useLayoutEffect(() => {
    ref.current = {
      tabbableDate,
      viewingDate,
      onMonthChange,
      setTabbableDate,
    };
  });

  /**
   * If th user has navigated focus using the keyboard arrows to a new month or year we need to
   * update the viewing date
   */
  useEffect(() => {
    if (
      tabbableDate.getMonth() !== ref.current.viewingDate.getMonth() ||
      tabbableDate.getFullYear() !== ref.current.viewingDate.getFullYear()
    ) {
      ref.current.onMonthChange?.(tabbableDate);
    }
  }, [tabbableDate]);

  /**
   * If the user has clicked "Previous month" or "Next month" we need to
   * update the focused date to the new month.
   */
  useEffect(() => {
    if (viewingDate.getMonth() !== ref.current.tabbableDate.getMonth()) {
      ref.current.setTabbableDate(
        current =>
          new Date(
            viewingDate.getFullYear(),
            viewingDate.getMonth(),
            current.getDate(),
          ),
      );
    }
  }, [viewingDate]);
}
