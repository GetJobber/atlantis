import { useContext } from "react";
import { COMBOBOX_MENU_ID } from "../Combobox.constants";
import { ComboboxContext } from "../ComboboxProvider";

export function useComboboxActivatorAccessibility() {
  const { label, open } = useContext(ComboboxContext);

  return {
    ariaLabel: label,
    ariaExpanded: open,
    ariaControls: COMBOBOX_MENU_ID,
  };
}
