import { RefObject, useState } from "react";
import { usePopper } from "react-popper";

export function useRepositionMenu(attachTo: RefObject<Element | null>) {
  const [positionElement, setPositionedElementRef] =
    useState<HTMLElement | null>();
  const popper = usePopper(attachTo.current, positionElement, {
    modifiers: [
      { name: "offset", options: { offset: [0, 8] } },
      { name: "flip", options: { fallbackPlacements: ["top"] } },
    ],
    placement: "bottom",
  });

  return { ...popper, setPositionedElementRef };
}
