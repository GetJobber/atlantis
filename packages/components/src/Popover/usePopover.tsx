import {
  Placement,
  arrow,
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
    return [
      offset(10),
      flip({
        fallbackPlacements: ["top", "bottom", "left", "right"],
      }),
      shift({ mainAxis: true, crossAxis: true, padding: 8 }),
      arrow({
        element: arrowElement || null,
        padding: 6,
      }),
    ];
  }, [arrowElement]);

  const referenceElement = isHTMLElement(attachTo)
    ? attachTo
    : attachTo.current;

  const { refs, floatingStyles, middlewareData, placement } = useFloating({
    placement: (preferredPlacement === "auto"
      ? "bottom"
      : preferredPlacement) as Placement,
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
