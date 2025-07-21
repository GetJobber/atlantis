import { autoUpdate, flip, offset, useFloating } from "@floating-ui/react";
import { useSafeLayoutEffect } from "@jobber/hooks/useSafeLayoutEffect";
import { useCallback } from "react";
import { MenuProps } from "./Autocomplete.types";

export interface UseRepositionMenu {
  readonly menuRef: HTMLElement | null;
  readonly setMenuRef: (ref: HTMLElement | null) => void;
  readonly targetWidth: number | undefined;
  readonly styles: {
    float: React.CSSProperties;
  };
}

export function useRepositionMenu(
  attachTo: MenuProps["attachTo"],
  visible: boolean,
  cssManagedVisibility: boolean,
): UseRepositionMenu {
  const { refs, floatingStyles, update } = useFloating({
    placement: "bottom",
    middleware: [offset(8), flip({ fallbackPlacements: ["top"] })],
    elements: {
      reference: attachTo,
    },
    ...(!cssManagedVisibility
      ? {
          whileElementsMounted: autoUpdate,
        }
      : {}),
  });

  const conditionalUpdate = useCallback(() => {
    if (cssManagedVisibility && visible && attachTo && refs.floating.current) {
      const cleanup = autoUpdate(attachTo, refs.floating.current, update);

      return cleanup;
    }

    return undefined;
  }, [update, cssManagedVisibility, visible, attachTo, refs.floating.current]);

  useSafeLayoutEffect(() => {
    conditionalUpdate();
  }, [conditionalUpdate, visible]);

  const targetWidth = attachTo?.clientWidth;

  return {
    menuRef: refs.floating.current,
    setMenuRef: refs.setFloating,
    targetWidth,
    styles: {
      float: floatingStyles,
    },
  };
}
