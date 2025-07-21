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
      size({
        apply({ availableHeight, elements }) {
          // Limit the height for a true maximum
          // However if we have less space than that, then reduce it to allow scrolling
          const maxHeight =
            availableHeight > AUTOCOMPLETE_MAX_HEIGHT
              ? AUTOCOMPLETE_MAX_HEIGHT
              : Math.max(0, availableHeight);

          Object.assign(elements.floating.style, {
            maxHeight: `${maxHeight}px`,
          });
        },
      }),
      flip({ fallbackPlacements: ["top"] }),
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

  useSafeLayoutEffect(() => {
    if (cssManagedVisibility && visible && attachTo && refs.floating.current) {
      const cleanup = autoUpdate(attachTo, refs.floating.current, update);

      return cleanup;
    }

    return undefined;
  }, [cssManagedVisibility, visible, attachTo, refs.floating.current]);

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
