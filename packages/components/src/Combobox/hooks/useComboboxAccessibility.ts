import { useContext, useEffect, useRef } from "react";
import { useRefocusOnActivator } from "@jobber/hooks/useRefocusOnActivator";
import { useFocusTrap } from "@jobber/hooks/useFocusTrap";
import { usePopper } from "react-popper";
import { useOnKeyDown } from "@jobber/hooks/useOnKeyDown";
import { ComboboxOption } from "../Combobox.types";
import { ComboboxContext } from "../ComboboxProvider";

// eslint-disable-next-line max-statements
export function useComboboxAccessibility(
  selectionCallback: (selection: ComboboxOption) => void,
  filteredOptions: ComboboxOption[],
  optionsListRef: React.RefObject<HTMLUListElement>,
  open: boolean,
  wrapperRef: React.RefObject<HTMLDivElement>,
): {
  popperRef: React.RefObject<HTMLDivElement>;
  popperStyles: { [key: string]: React.CSSProperties };
  attributes: { [key: string]: { [key: string]: string } | undefined };
} {
  const { handleClose } = useContext(ComboboxContext);
  const hasOptionsVisible = open && filteredOptions.length > 0;
  const focusedIndex = useRef<number | null>(null);

  useRefocusOnActivator(open);

  const popperRef = useFocusTrap<HTMLDivElement>(open);
  const { styles: popperStyles, attributes } = usePopper(
    wrapperRef.current,
    popperRef.current,
    {
      modifiers: [
        {
          name: "flip",
          options: {
            fallbackPlacements: ["top-start"],
          },
        },
      ],
      placement: "bottom-start",
    },
  );

  useEffect(() => {
    focusedIndex.current = null;
  }, [open, filteredOptions.length]);

  useEffect(() => {
    if (open) {
      popperRef.current?.addEventListener("keydown", handleContentKeydown);
    }

    return () => {
      popperRef.current?.removeEventListener("keydown", handleContentKeydown);
    };
  }, [open, optionsListRef, filteredOptions]);

  useOnKeyDown(() => {
    if (open) {
      handleClose();
    }
  }, "Escape");

  function handleContentKeydown(event: KeyboardEvent) {
    if (!hasOptionsVisible) return;

    if (event.key === "Enter" || event.key === " ") {
      const activeElementInList = optionsListRef.current?.contains(
        document.activeElement,
      );

      if (!activeElementInList) return;

      handleKeyboardSelection(event);
    }

    if (event.key === "ArrowDown") {
      handleKeyboardNavigation(event, 1);
    }

    if (event.key === "ArrowUp") {
      handleKeyboardNavigation(event, -1);
    }
  }

  function handleKeyboardNavigation(event: KeyboardEvent, indexChange: number) {
    const newIndex =
      focusedIndex.current === null ? 0 : focusedIndex.current + indexChange;

    if (newIndex < 0 || newIndex >= filteredOptions.length) return;

    const optionElement = optionsListRef.current?.children[
      newIndex
    ] as HTMLElement;

    optionElement?.focus();
    focusedIndex.current = newIndex;
    event.preventDefault();
    event.stopPropagation();
  }

  function handleKeyboardSelection(event: KeyboardEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (focusedIndex.current !== null) {
      selectionCallback(filteredOptions[focusedIndex.current]);
    }
  }

  return {
    popperRef,
    popperStyles,
    attributes,
  };
}
