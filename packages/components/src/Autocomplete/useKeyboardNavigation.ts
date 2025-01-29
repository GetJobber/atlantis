import { useOnKeyDown } from "@jobber/hooks/useOnKeyDown";
import { useCallback, useEffect, useState } from "react";
import { AnyOption, Option } from "./Autocomplete.types";
import { isGroup } from "./Autocomplete.utils";

export enum KeyboardAction {
  Previous = -1,
  Next = 1,
  Select = 0,
}

/**
 * Hook to handle custom keyboard navigation for the Autocomplete component.
 */
export function useCustomKeyboardNavigation({
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

/**
 * Hook to handle keyboard navigation for the Menu in the Autocomplete component.
 * If using components in the menu that aren't MenuOption or BaseMenuOption, you should use the `useCustomKeyboardNavigation` hook.
 */
export function useKeyboardNavigation<
  GenericOption extends AnyOption = AnyOption,
  GenericOptionValue extends Option = Option,
>({
  options,
  onOptionSelect,
  menuRef,
  visible,
}: {
  options: GenericOption[];
  visible?: boolean;
  menuRef?: HTMLElement | null;
  onOptionSelect: (option: GenericOptionValue) => void;
}) {
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const detectGroups = (option: AnyOption) => "options" in option;

  const initialHighlight = options.some(detectGroups) ? 1 : 0;
  useEffect(() => setHighlightedIndex(initialHighlight), [options]);
  useEffect(() => {
    menuRef?.children[highlightedIndex]?.scrollIntoView?.({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }, [highlightedIndex]);

  const onRequestHighlightChange = useCallback(
    (event: KeyboardEvent, direction: KeyboardAction) => {
      if (!visible) return;
      const indexChange = getRequestedIndexChange({
        event,
        options,
        direction,
        highlightedIndex,
      });

      switch (direction) {
        case KeyboardAction.Previous:
          setHighlightedIndex(prev => Math.max(0, prev + indexChange));
          break;
        case KeyboardAction.Next:
          setHighlightedIndex(prev =>
            Math.min(options.length - 1, prev + indexChange),
          );
          break;
        case KeyboardAction.Select:
          onOptionSelect(
            options[highlightedIndex] as unknown as GenericOptionValue,
          );
          break;
      }
    },
    [highlightedIndex, options, onOptionSelect, visible],
  );
  useCustomKeyboardNavigation({ onRequestHighlightChange });

  return { highlightedIndex };
}

/**
 * Function to get the requested index change based on the current highlighted index and the direction of the keyboard action.
 * Accounts for groups in the options array.
 */
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
