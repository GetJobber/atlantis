import {
  autoUpdate,
  flip,
  offset,
  size,
  useFloating,
} from "@floating-ui/react";
import { useSafeLayoutEffect } from "@jobber/hooks/useSafeLayoutEffect";
import { MenuProps } from "./Autocomplete.types";
import { AUTOCOMPLETE_MAX_HEIGHT } from "./constants";
import { calculateMaxHeight } from "../utils/maxHeight";

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
    middleware: [
      offset(8),
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
    elements: {
      reference: attachTo,
    },
    ...(!cssManagedVisibility
      ? {
          whileElementsMounted: autoUpdate,
        }
      : {}),
  });

  // While DefaultMenu leverages conditional rendering, CustomMenu is hidden with CSS
  // We need to apply the correct update method to each case
  useSafeLayoutEffect(() => {
    if (cssManagedVisibility && visible && attachTo && refs.floating.current) {
      const cleanup = autoUpdate(attachTo, refs.floating.current, update);

      return cleanup;
    }

    return undefined;
  }, [
    cssManagedVisibility,
    visible,
    attachTo,
    refs.floating.current,
    update,
    autoUpdate,
  ]);

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
