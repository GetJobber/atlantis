import { autoUpdate, flip, offset, useFloating } from "@floating-ui/react";
import { MenuProps } from "./Autocomplete.types";

export interface UseRepositionMenu {
  readonly menuRef: HTMLElement | null;
  readonly setMenuRef: (ref: HTMLElement | null) => void;
  readonly targetWidth: number | undefined;
  readonly styles: {
    popper: React.CSSProperties;
  };
  readonly attributes: {
    popper: Record<string, string>;
  };
}

export function useRepositionMenu(
  attachTo: MenuProps["attachTo"],
): UseRepositionMenu {
  const referenceElement = attachTo.current;

  const { refs, floatingStyles } = useFloating({
    placement: "bottom",
    middleware: [offset(8), flip({ fallbackPlacements: ["top"] })],
    elements: {
      reference: referenceElement || null,
    },
    whileElementsMounted: autoUpdate,
  });

  const targetWidth = attachTo.current?.clientWidth;

  return {
    menuRef: refs.floating.current,
    setMenuRef: refs.setFloating,
    targetWidth,
    styles: {
      popper: floatingStyles,
    },
    attributes: { popper: {} },
  };
}
