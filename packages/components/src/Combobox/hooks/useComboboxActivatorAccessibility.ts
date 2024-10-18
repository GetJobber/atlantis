import { useContext } from "react";
import { ComboboxContext } from "../ComboboxProvider";
import { COMBOBOX_MENU_ID } from "../constants";

export function useComboboxActivatorAccessibility() {
  const { label, open } = useContext(ComboboxContext);

  return {
    htmlAttributes: {
      "aria-label": label,
      "aria-expanded": open,
      "aria-controls": COMBOBOX_MENU_ID,
      tabindex: 0,
      role: "combobox",
    },
  };
}
