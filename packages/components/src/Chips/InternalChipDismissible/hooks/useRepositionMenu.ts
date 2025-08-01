import React from "react";
import { autoUpdate, flip, offset, useFloating } from "@floating-ui/react";

export interface UseRepositionMenu {
  readonly floatingElement: HTMLElement | null;
  readonly setFloatingRef: (ref: HTMLElement | null) => void;
  readonly targetWidth: number | undefined;
  readonly styles: {
    float: React.CSSProperties;
  };
  readonly update: () => void;
}

export function useRepositionMenu(
  attachTo: HTMLElement | null,
): UseRepositionMenu {
  const { refs, floatingStyles, update } = useFloating({
    placement: "bottom",
    middleware: [offset(8), flip({ fallbackPlacements: ["top"] })],
    elements: {
      reference: attachTo,
    },
    whileElementsMounted: autoUpdate,
  });

  const targetWidth = attachTo?.clientWidth;

  return {
    floatingElement: refs.floating.current,
    setFloatingRef: refs.setFloating,
    targetWidth,
    styles: {
      float: floatingStyles,
    },
    update,
  };
}
