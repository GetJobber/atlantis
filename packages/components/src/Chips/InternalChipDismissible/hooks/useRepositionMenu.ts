import React from "react";
import {
  autoUpdate,
  flip,
  offset,
  size,
  useFloating,
} from "@floating-ui/react";

export interface UseRepositionMenu {
  readonly setFloatingRef: (ref: HTMLElement | null) => void;
  readonly targetWidth: number | undefined;
  readonly styles: {
    float: React.CSSProperties;
  };
  readonly update: () => void;
}

const ROUNDED_BORDER_ARROW_EDGE_OFFSET = 8;
const PREFERRED_MAX_HEIGHT = 320;

export function useRepositionMenu(
  attachTo: HTMLElement | null,
): UseRepositionMenu {
  const { refs, floatingStyles, update } = useFloating({
    placement: "bottom",
    middleware: [
      offset(ROUNDED_BORDER_ARROW_EDGE_OFFSET),
      flip({ fallbackPlacements: ["top"] }),
      size({
        apply({ availableHeight, elements }) {
          const maxHeight = Math.min(PREFERRED_MAX_HEIGHT, availableHeight);

          Object.assign(elements.floating.style, {
            maxHeight: `${maxHeight}px`,
          });
        },
      }),
    ],
    elements: {
      reference: attachTo,
    },
    whileElementsMounted: autoUpdate,
  });

  const targetWidth = attachTo?.clientWidth;

  return {
    setFloatingRef: refs.setFloating,
    targetWidth,
    styles: {
      float: floatingStyles,
    },
    update,
  };
}
