import { useOnKeyDown } from "@jobber/hooks/useOnKeyDown";
import { useEffect } from "react";
import { AnyOption, IndexChange, Option, UseKeyListenersProps } from "./types";

export function useKeyListeners({
  options,
  visible,
  menuRef,
  highlightedIndex,
  setHighlightedIndex,
  onOptionSelect,
}: UseKeyListenersProps) {
  function isOptionSelected(
    selectedOption?: Option | undefined,
    option?: Option,
  ) {
    return selectedOption && selectedOption.value === option?.value;
  }

  function isGroup(option?: AnyOption) {
    if (option?.options) return true;

    return false;
  }

  function arrowKeyPress(event: KeyboardEvent, direction: number) {
    if (!visible) return;
    event.preventDefault();
    const requestedIndex = options?.[highlightedIndex + direction];

    return requestedIndex && isGroup(requestedIndex)
      ? direction + direction
      : direction;
  }
  useEffect(() => {
    menuRef?.children[highlightedIndex]?.scrollIntoView?.({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }, [highlightedIndex]);

  useOnKeyDown((event: KeyboardEvent) => {
    const indexChange = arrowKeyPress(event, IndexChange.Next);

    if (indexChange && options) {
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
    if (isGroup(options?.[highlightedIndex])) return;

    event.preventDefault();
    onOptionSelect(options?.[highlightedIndex]);
  }, "Enter");

  return { isOptionSelected, isGroup };
}
