import { useSafeLayoutEffect } from "@jobber/hooks/useSafeLayoutEffect";
import { useState } from "react";
import { usePopper } from "react-popper";
import { MenuProps } from "./Autocomplete.types";

export function useRepositionMenu(
  attachTo: MenuProps["attachTo"],
  visible = false,
) {
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
}
