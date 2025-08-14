import { useContext } from "react";
import { ComboboxContext } from "../ComboboxProvider";
import { COMBOBOX_MENU_ID } from "../constants";
import type { ComboboxActivatorAccessibility } from "../Combobox.types";

export function useComboboxActivatorAccessibility(): ComboboxActivatorAccessibility {
  const { label, open } = useContext(ComboboxContext);

  return {
    ariaLabel: label,
    ariaExpanded: open,
    ariaControls: COMBOBOX_MENU_ID,
    role: "combobox",
  };
}
