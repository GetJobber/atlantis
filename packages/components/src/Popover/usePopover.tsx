import {
  arrow,
  autoPlacement,
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating,
} from "@floating-ui/react";
import { useMemo, useState } from "react";
import { useRefocusOnActivator } from "@jobber/hooks/useRefocusOnActivator";
import { PopoverProps } from "./Popover.types";

export const usePopover = ({
  preferredPlacement,
  attachTo,
  open,
}: Pick<PopoverProps, "preferredPlacement" | "attachTo" | "open">) => {
  const [arrowElement, setArrowElement] = useState<HTMLElement | null>();

  const modifiers = useMemo(() => {
    const baseModifiers = [
      offset(10),
      shift({ mainAxis: true, crossAxis: false, padding: 8 }),
    ];

    const placementMiddleware =
      preferredPlacement === "auto"
        ? autoPlacement({
            allowedPlacements: ["top", "bottom", "left", "right"],
          })
        : flip({
            fallbackPlacements: ["top", "bottom", "left", "right"],
          });

    return [
      ...baseModifiers,
      placementMiddleware,
      arrow({
        element: arrowElement || null,
        padding: 6,
      }),
    ];
  }, [arrowElement, preferredPlacement]);

  const referenceElement = isHTMLElement(attachTo)
    ? attachTo
    : attachTo.current;

  const { refs, floatingStyles, middlewareData, placement } = useFloating({
    placement: preferredPlacement === "auto" ? undefined : preferredPlacement,
    strategy: "fixed",
    middleware: modifiers,
    elements: {
      reference: referenceElement || null,
    },
    whileElementsMounted: autoUpdate,
  });

  useRefocusOnActivator(open);

  return {
    setPopperElement: refs.setFloating,
    setArrowElement,
    popperStyles: {
      popper: floatingStyles,
      arrow: middlewareData.arrow,
    },
    placement,
    attributes: { popper: {} },
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isHTMLElement(el: any): el is Element {
  return globalThis?.document && el instanceof Element;
}
