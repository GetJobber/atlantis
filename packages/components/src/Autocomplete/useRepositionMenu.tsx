import { useSafeLayoutEffect } from "@jobber/hooks/useSafeLayoutEffect";
import { useState } from "react";
import { usePopper } from "react-popper";
import { AutocompleteMenuProps } from "./types";

export const useRepositionMenu = (
  attachTo: AutocompleteMenuProps["attachTo"],
  visible = false,
) => {
  const [menuRef, setMenuRef] = useState<HTMLElement | null>();
  const popper = usePopper(attachTo.current, menuRef, {
    modifiers: [
      { name: "offset", options: { offset: [0, 8] } },
      { name: "flip", options: { fallbackPlacements: ["top"] } },
    ],
  });

  useSafeLayoutEffect(() => {
    popper?.update?.();
  }, [visible]);

  const targetWidth = attachTo.current?.clientWidth;

  return { ...popper, menuRef, setMenuRef, targetWidth };
};
