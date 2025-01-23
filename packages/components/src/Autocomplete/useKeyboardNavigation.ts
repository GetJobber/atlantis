import { useOnKeyDown } from "@jobber/hooks/useOnKeyDown";
import { AnyOption } from "./Autocomplete.types";
import { isGroup } from "./Autocomplete.utils";

export enum KeyboardAction {
  Previous = -1,
  Next = 1,
  Select = 0,
}

export function useKeyboardNavigation({
  onRequestHighlightChange,
}: {
  onRequestHighlightChange?: (
    event: KeyboardEvent,
    direction: KeyboardAction,
  ) => void;
}) {
  useOnKeyDown((event: KeyboardEvent) => {
    onRequestHighlightChange?.(event, KeyboardAction.Next);
  }, "ArrowDown");

  useOnKeyDown((event: KeyboardEvent) => {
    onRequestHighlightChange?.(event, KeyboardAction.Previous);
  }, "ArrowUp");

  useOnKeyDown((event: KeyboardEvent) => {
    onRequestHighlightChange?.(event, KeyboardAction.Select);
  }, "Enter");
}

export function getRequestedIndexChange<T extends AnyOption>({
  event,
  options,
  direction,
  highlightedIndex,
}: {
  event: KeyboardEvent;
  direction: KeyboardAction;
  options: T[];
  highlightedIndex: number;
}) {
  event.preventDefault();
  const requestedIndex = options[highlightedIndex + direction];

  return requestedIndex && isGroup(requestedIndex)
    ? direction + direction
    : direction;
}
