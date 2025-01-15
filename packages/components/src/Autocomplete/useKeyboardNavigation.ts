import { useOnKeyDown } from "@jobber/hooks/useOnKeyDown";
import { useEffect, useState } from "react";
import { AnyOption, Option } from "./Autocomplete.types";
import { isGroup } from "./Autocomplete.utils";

enum IndexChange {
  Previous = -1,
  Next = 1,
}

export function useKeyboardNavigation({
  options,
  visible,
  onOptionSelect,
  onHighlightChange,
}: {
  options: AnyOption[];
  visible: boolean;
  onOptionSelect?: (option: Option) => void;
  onHighlightChange?: (index: number) => void;
}) {
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const detectGroups = (option: AnyOption) => option.options;

  const initialHighlight = options.some(detectGroups) ? 1 : 0;
  useEffect(() => setHighlightedIndex(initialHighlight), [options]);

  useEffect(() => {
    onHighlightChange?.(highlightedIndex);
  }, [highlightedIndex]);

  useOnKeyDown((event: KeyboardEvent) => {
    const indexChange = arrowKeyPress(event, IndexChange.Next);

    if (indexChange) {
      setHighlightedIndex(
        Math.min(options.length - 1, highlightedIndex + indexChange),
      );
    }
  }, "ArrowDown");

  useOnKeyDown((event: KeyboardEvent) => {
    const indexChange = arrowKeyPress(event, IndexChange.Previous);

    if (indexChange) {
      setHighlightedIndex(Math.max(0, highlightedIndex + indexChange));
    }
  }, "ArrowUp");

  useOnKeyDown((event: KeyboardEvent) => {
    if (!visible) return;
    if (isGroup(options[highlightedIndex])) return;

    event.preventDefault();
    onOptionSelect?.(options[highlightedIndex]);
  }, "Enter");

  function arrowKeyPress(event: KeyboardEvent, direction: number) {
    if (!visible) return;
    event.preventDefault();
    const requestedIndex = options[highlightedIndex + direction];

    return requestedIndex && isGroup(requestedIndex)
      ? direction + direction
      : direction;
  }

  return { highlightedIndex, setHighlightedIndex };
}
