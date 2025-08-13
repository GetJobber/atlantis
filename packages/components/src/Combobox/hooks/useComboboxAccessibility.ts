import { useContext, useEffect, useRef } from "react";
import { useRefocusOnActivator } from "@jobber/hooks/useRefocusOnActivator";
import {
  UseInteractionsReturn,
  autoUpdate,
  flip,
  offset,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useInteractions,
} from "@floating-ui/react";
import { useFocusTrap } from "@jobber/hooks/useFocusTrap";
import { type ComboboxOption } from "../Combobox.types";
import { ComboboxContext } from "../ComboboxProvider";

const COMBOBOX_OFFSET = 8;

// eslint-disable-next-line max-statements
export function useComboboxAccessibility(
  selectionCallback: (selection: ComboboxOption) => void,
  filteredOptions: ComboboxOption[],
  optionsListRef: React.RefObject<HTMLUListElement>,
  open: boolean,
  wrapperRef: React.RefObject<HTMLDivElement>,
): {
  floatingRef: React.RefObject<HTMLDivElement>;
  floatingStyles: React.CSSProperties;
  floatingProps: ReturnType<UseInteractionsReturn["getFloatingProps"]>;
  nodeId?: string;
  parentNodeId: string | null;
} {
  const { handleClose } = useContext(ComboboxContext);
  const hasOptionsVisible = open && filteredOptions.length > 0;
  const focusedIndex = useRef<number | null>(null);
  const parentNodeId = useFloatingParentNodeId();
  const nodeId = useFloatingNodeId();

  useRefocusOnActivator(open);

  const floatingRef = useFocusTrap<HTMLDivElement>(open);

  const { floatingStyles, update, context } = useFloating({
    nodeId,
    elements: {
      reference: wrapperRef.current,
      floating: floatingRef.current,
    },
    open,
    onOpenChange: openState => {
      if (!openState) handleClose();
    },
    middleware: [
      offset(COMBOBOX_OFFSET),
      flip({ fallbackPlacements: ["top-start", "bottom-end", "top-end"] }),
    ],
    placement: "bottom-start",
    whileElementsMounted: autoUpdate,
  });

  const dismiss = useDismiss(context);

  const { getFloatingProps } = useInteractions([dismiss]);

  useEffect(() => {
    focusedIndex.current = null;

    if (open) {
      update?.();
    }
  }, [open, filteredOptions.length, update]);

  useEffect(() => {
    if (open) {
      floatingRef.current?.addEventListener("keydown", handleContentKeydown);
    }

    return () => {
      floatingRef.current?.removeEventListener("keydown", handleContentKeydown);
    };
  }, [open, optionsListRef, filteredOptions]);

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
    floatingRef,
    floatingStyles,
    floatingProps: getFloatingProps(),
    nodeId,
    parentNodeId,
  };
}
