import { usePopper } from "react-popper";
import { useMemo, useState } from "react";
import { useRefocusOnActivator } from "@jobber/hooks/useRefocusOnActivator";
import { PopoverProps } from "./types";

export const usePopover = ({
  preferredPlacement,
  attachTo,
  open,
}: Pick<PopoverProps, "preferredPlacement" | "attachTo" | "open">) => {
  const [popperElement, setPopperElement] = useState<HTMLElement | null>();
  const [arrowElement, setArrowElement] = useState<HTMLElement | null>();

  const modifiers = useMemo(() => {
    return [
      {
        name: "arrow",
        options: { element: arrowElement, padding: 10 },
      },
      {
        name: "offset",
        options: {
          offset: [0, 10],
        },
      },
      {
        name: "flip",
        options: {
          fallbackPlacements: ["auto"],
        },
      },
    ];
  }, [arrowElement]);

  const { styles: popperStyles, attributes } = usePopper(
    isHTMLElement(attachTo) ? attachTo : attachTo.current,
    popperElement,
    {
      modifiers,
      placement: preferredPlacement,
    },
  );
  useRefocusOnActivator(open);

  return { setPopperElement, setArrowElement, popperStyles, attributes };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isHTMLElement(el: any): el is Element {
  return globalThis?.document && el instanceof Element;
}
