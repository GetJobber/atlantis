import { useEffect, useRef, useState } from "react";
import type {
  UseFloatingReturn,
  UseInteractionsReturn,
} from "@floating-ui/react";
import {
  autoUpdate,
  flip,
  offset,
  size,
  useDismiss,
  useFloating,
  useFocus,
  useInteractions,
  useListNavigation,
} from "@floating-ui/react";
import { tokens } from "@jobber/design";
import { calculateMaxHeight } from "../../utils/maxHeight";

const MENU_OFFSET = tokens["space-small"];
const AUTOCOMPLETE_MAX_HEIGHT = 300;

export interface UseAutocompleteListNavReturn {
  refs: UseFloatingReturn["refs"];
  floatingStyles: UseFloatingReturn["context"]["floatingStyles"];
  context: UseFloatingReturn["context"];
  getReferenceProps: UseInteractionsReturn["getReferenceProps"];
  getFloatingProps: UseInteractionsReturn["getFloatingProps"];
  getItemProps: UseInteractionsReturn["getItemProps"];
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
  listRef: React.MutableRefObject<Array<HTMLElement | null>>;
  open: boolean;
  setOpen: (open: boolean) => void;
  setReferenceElement: (el: HTMLElement | null) => void;
}

export interface UseAutocompleteListNavProps {
  openOnFocus: boolean;
  navigableCount: number;
  shouldResetActiveIndexOnClose?: () => boolean;
  onMenuClose?: (reason?: string) => void;
  selectedIndex?: number | null;
}

export function useAutocompleteListNav({
  openOnFocus,
  navigableCount,
  shouldResetActiveIndexOnClose,
  onMenuClose,
  selectedIndex,
}: UseAutocompleteListNavProps): UseAutocompleteListNavReturn {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const listRef = useRef<Array<HTMLElement | null>>([]);

  const { refs, floatingStyles, context } = useFloating({
    placement: "bottom",
    whileElementsMounted: autoUpdate,
    open,
    onOpenChange: (isOpen, _event, reason) => {
      setOpen(isOpen);

      if (isOpen === false) {
        if (shouldResetActiveIndexOnClose?.()) {
          setActiveIndex(null);
        }
        onMenuClose?.(String(reason ?? ""));
      }
    },
    middleware: [
      offset(MENU_OFFSET),
      flip({ fallbackPlacements: ["top"] }),
      size({
        apply({ availableHeight, elements }) {
          const maxHeight = calculateMaxHeight(availableHeight, {
            maxHeight: AUTOCOMPLETE_MAX_HEIGHT,
          });
          Object.assign(elements.floating.style, {
            maxHeight: `${maxHeight}px`,
          });
        },
      }),
    ],
  });

  const listNav = useListNavigation(context, {
    listRef,
    activeIndex,
    selectedIndex,
    scrollItemIntoView: {
      behavior: "smooth",
      block: "end",
    },
    loop: true,
    onNavigate: setActiveIndex,
    virtual: true,
    enabled: open,
    openOnArrowKeyDown: false,
    focusItemOnOpen: "auto",
    focusItemOnHover: false,
  });

  const dismiss = useDismiss(context, {
    outsidePress: true,
    escapeKey: true,
    outsidePressEvent: "click",
  });

  const focus = useFocus(context, {
    enabled: openOnFocus,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [listNav, dismiss, focus],
  );

  useEffect(() => {
    listRef.current.length = navigableCount;

    setActiveIndex(prev => {
      if (navigableCount <= 0) return null;
      if (prev == null) return null;

      return prev >= navigableCount ? navigableCount - 1 : prev;
    });
  }, [navigableCount, setActiveIndex, listRef]);

  return {
    refs,
    floatingStyles,
    context,
    getReferenceProps,
    getFloatingProps,
    getItemProps,
    activeIndex,
    setActiveIndex,
    listRef,
    open,
    setOpen,
    setReferenceElement: (el: HTMLElement | null) => refs.setReference(el),
  };
}
